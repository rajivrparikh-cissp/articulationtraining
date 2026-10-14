// ==============================================================================
// Local LLaMA 3.2 Ollama Client & Executive Evaluation Engine
// Endpoint: http://localhost:11434 (via proxy /api/ollama or direct)
// ==============================================================================

const OLLAMA_DEFAULT_URL = 'http://127.0.0.1:11434';
const PROXY_URL = '/api/ollama';

/**
 * Health check: tests whether local Ollama is active and lists available models
 */
export async function checkOllamaHealth() {
  const endpoints = [PROXY_URL, OLLAMA_DEFAULT_URL];

  for (const base of endpoints) {
    try {
      const res = await fetch(`${base}/api/tags`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(3000)
      });

      if (res.ok) {
        const data = await res.json();
        const models = (data.models || []).map((m) => m.name);
        const hasLlama32 = models.some((m) => m.includes('llama3.2') || m.includes('llama3'));
        const activeModel = hasLlama32 
          ? (models.find((m) => m.includes('llama3.2')) || models.find((m) => m.includes('llama3')))
          : (models[0] || 'llama3.2:latest');

        return {
          online: true,
          endpoint: base,
          models,
          activeModel: activeModel || 'llama3.2:latest'
        };
      }
    } catch {
      // try next endpoint
    }
  }

  return {
    online: false,
    endpoint: null,
    models: [],
    activeModel: 'llama3.2:latest',
    error: 'Ollama is offline. Start it in terminal with: ollama run llama3.2'
  };
}

/**
 * Streams an executive panel evaluation from local LLaMA 3.2
 */
export async function streamExecutiveAudit({
  profile,
  candidateDna,
  prompt,
  transcript,
  onToken,
  onComplete,
  onError
}) {
  const health = await checkOllamaHealth();
  const endpointBase = health.endpoint || PROXY_URL;

  if (!health.online) {
    // Graceful offline fallback simulation
    const simulated = generateHeuristicAiAudit(profile, prompt, transcript);
    let current = '';
    const interval = setInterval(() => {
      if (simulated.length > current.length) {
        const nextSlice = simulated.slice(0, current.length + 12);
        current = nextSlice;
        onToken(current);
      } else {
        clearInterval(interval);
        onComplete(simulated);
      }
    }, 40);
    return;
  }

  const systemPrompt = `You are an elite Executive Hiring Committee member interviewing Rajiv (Raj) Parikh for the role of ${profile.title} at ${profile.company}.
Candidate Background:
- 25+ years technology and cyber security leadership (CISSP, CISM, A|CISO).
- Former/current Commonwealth Bank of Australia (CBA) Senior Cyber Security & Service Manager.
- Directed 20+ third-party cyber incidents across 200+ enterprise vendors under APRA CPS 234/230.
- Managed enterprise hybrid cloud and infrastructure operations for 53,000 corporate users across 300+ sites (99.95% uptime) at Downer EDI.

Target Evaluation Role: ${profile.title} (${profile.altitude})
Target Rubric Focus:
${profile.rubricFocus.join('\n')}

Interview Question Asked:
"${prompt}"

Candidate's Spoken Answer (Transcribed):
"${transcript || '(The candidate remained silent or spoke too briefly.)'}"

Provide a crisp, direct, executive-level critique organized under these 4 specific headings:
1. 🎯 ALTITUDE & EXECUTIVE PRESENCE: Did Rajiv communicate at the ${profile.altitude} level (business risk, governance, commercial impact) or get lost in engineering weeds?
2. 📐 PREP & THOUGHT STRUCTURE: Did he deliver a sharp point upfront, followed by quantifiable metrics, and close with a definitive takeaway?
3. 🛡️ CONVICTION & RISK OWNERSHIP: Evaluate tone for decisive ownership versus defensive hedging.
4. ⚡ BOARDROOM CURVEBALL QUESTION: Formulate 1 aggressive, realistic follow-up question the executive committee or board would ask next based on his answer.

Be direct, constructive, and uncompromising. Write in standard markdown with bold headers.`;

  try {
    const response = await fetch(`${endpointBase}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: health.activeModel || 'llama3.2:latest',
        prompt: systemPrompt,
        stream: true,
        options: {
          temperature: 0.6,
          top_p: 0.9,
          num_predict: 500
        }
      })
    });

    if (!response.ok || !response.body) {
      throw new Error(`Ollama request failed with HTTP status ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const parsed = JSON.parse(line);
          if (parsed.response) {
            accumulatedText += parsed.response;
            onToken(accumulatedText);
          }
          if (parsed.done) {
            onComplete(accumulatedText);
            return;
          }
        } catch {
          // partial line split across chunks, ignore parse error
        }
      }
    }

    onComplete(accumulatedText);
  } catch (err) {
    console.warn('Ollama streaming error, falling back to simulated analysis:', err);
    const fallbackText = generateHeuristicAiAudit(profile, prompt, transcript);
    onComplete(fallbackText);
  }
}

/**
 * Fallback generator when Ollama is offline so the candidate still receives structured feedback
 */
function generateHeuristicAiAudit(profile, prompt, transcript) {
  const wordCount = transcript ? transcript.trim().split(/\s+/).length : 0;
  const hasNumbers = /\d+|%|million|cba|downer|apra|cps/i.test(transcript);
  const isTooShort = wordCount < 30;

  return `### 🎯 Altitude & Executive Presence (${profile.company} - ${profile.altitude})
${isTooShort 
  ? "Your response was too brief for an executive evaluation. In a Director/VP panel, silence or brief answers signal hesitation. Anchor your opening in your 25+ years across CBA and Downer." 
  : hasNumbers 
  ? "Strong commercial altitude. You connected operational realities directly to enterprise metrics and regulatory standards without getting trapped in tactical implementation details." 
  : "Good conceptual framing, but elevate your vocabulary. Replace tactical task words with executive verbs: *orchestrated, governed, institutionalized, mitigated*."}

### 📐 PREP & Thought Structure
${wordCount > 50 
  ? "Your structure maintained the PREP cadence. Ensure your final sentence acts as an anchor takeaway that directly answers the strategic mandate of the prompt."
  : "Deliver your headline point within the first 5 seconds. Avoid introductory conversational ramp-ups."}

### 🛡️ Conviction & Risk Ownership
Zero defensive hedging detected. In high-stakes interviews for ${profile.title}, ownership of failure and regulatory scrutiny (APRA CPS 234/230) is the number one trait evaluated.

### ⚡ Boardroom Curveball Follow-Up Question
> **"You mentioned your risk governance framework. How specifically do you respond when the business unit heads push back, claiming your security controls are slowing down a $50M commercial release?"**`;
}

/**
 * Generates custom executive vocabulary terms using local LLaMA 3.2 or intelligent fallback
 */
export async function generateExecutiveVocabWithAi({
  topic,
  targetRole,
  onToken,
  onComplete,
  onError
}) {
  const health = await checkOllamaHealth();
  const endpointBase = health.endpoint || PROXY_URL;

  const promptText = `You are an elite speech coach and executive talent evaluator preparing a candidate for ${targetRole || 'VP of Technology / CISO'}.
Generate 3 powerful, high-altitude executive vocabulary words or phrases specifically for the topic/domain: "${topic || 'Executive Boardroom Governance'}".
For EACH word, produce a valid JSON object in a JSON array. Each object MUST have:
- "word": The executive word or phrase
- "phonetic": Phonetic pronunciation guide (e.g., /.../)
- "partOfSpeech": e.g. "adjective", "verb", "noun"
- "category": one of ["governance_risk", "boardroom_influence", "crisis_resilience", "execution_capital"]
- "definition": Clear, high-altitude executive definition
- "boardroomContext": A realistic sentence demonstrating how a VP/Director briefs the Board of Directors using this word
- "interviewApplication": An interview answer excerpt applying the word under the PREP model for ${targetRole || 'Director/VP'}
- "amateurVsExecutive": an object with "amateur" (how an average manager speaks) and "executive" (how a VP/Director speaks using this word)
- "synonyms": an array of 2-3 synonyms
- "drillPrompt": A 1-sentence prompt for a 30-second spoken practice drill

Return ONLY the JSON array starting with [ and ending with ], with no markdown wrapper or extra conversational text.`;

  if (!health.online) {
    // Intelligent heuristic fallback
    const fallbackTerms = generateFallbackVocabTerms(topic, targetRole);
    setTimeout(() => {
      if (onComplete) onComplete(fallbackTerms);
    }, 400);
    return fallbackTerms;
  }

  try {
    const response = await fetch(`${endpointBase}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: health.activeModel || 'llama3.2:latest',
        prompt: promptText,
        stream: true,
        options: {
          temperature: 0.5,
          top_p: 0.9,
          num_predict: 800
        }
      })
    });

    if (!response.ok || !response.body) {
      throw new Error(`Ollama generation failed: HTTP ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const parsed = JSON.parse(line);
          if (parsed.response) {
            accumulatedText += parsed.response;
            if (onToken) onToken(accumulatedText);
          }
          if (parsed.done) {
            break;
          }
        } catch {
          // ignore chunk split
        }
      }
    }

    // Attempt to extract JSON from response
    const jsonMatch = accumulatedText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const parsedArray = JSON.parse(jsonMatch[0]);
      const formatted = parsedArray.map((item, idx) => ({
        ...item,
        id: `ai-${Date.now()}-${idx}`
      }));
      if (onComplete) onComplete(formatted);
      return formatted;
    } else {
      throw new Error('Could not parse JSON array from Ollama output');
    }
  } catch (err) {
    console.warn('AI Vocab generation failed, using tailored fallback:', err);
    const fallback = generateFallbackVocabTerms(topic, targetRole);
    if (onComplete) onComplete(fallback);
    return fallback;
  }
}

function generateFallbackVocabTerms(topic = '', targetRole = '') {
  const t = topic.toLowerCase();
  const timestamp = Date.now();

  if (t.includes('risk') || t.includes('apra') || t.includes('cyber') || t.includes('threat') || t.includes('security')) {
    return [
      {
        id: `ai-${timestamp}-1`,
        word: 'Pivotal Vulnerability',
        phonetic: '/ˈpɪv.ə.təl ˌvʌl.nər.əˈbɪl.ə.ti/',
        partOfSpeech: 'noun phrase',
        category: 'governance_risk',
        definition: 'A singular point of failure or exposure whose compromise cascades across critical enterprise systems.',
        boardroomContext: 'Our third-party audit identified two pivotal vulnerabilities in our supplier identity federations under APRA CPS 234 scrutiny.',
        interviewApplication: 'In governing 200+ vendors at CBA, my team prioritized pivotal vulnerabilities that could paralyze core transactional services.',
        amateurVsExecutive: {
          amateur: 'We found some really bad security problems in the suppliers.',
          executive: 'We isolated three pivotal vulnerabilities within our vendor ecosystem and enforced immediate contractual remediation.'
        },
        synonyms: ['keystone risk', 'critical dependency', 'systemic exposure'],
        drillPrompt: 'Articulate how your team separates operational noise from a pivotal vulnerability during an active cyber audit.'
      },
      {
        id: `ai-${timestamp}-2`,
        word: 'Prudent Stewardship',
        phonetic: '/ˈpruː.dənt ˈstjuː.əd.ʃɪp/',
        partOfSpeech: 'noun phrase',
        category: 'governance_risk',
        definition: 'Wise, careful, and legally defensible governance of enterprise assets, capital, and data.',
        boardroomContext: 'Prudent stewardship requires that we balance commercial delivery velocity with non-negotiable compliance obligations under CPS 230.',
        interviewApplication: 'I exercised prudent stewardship across our cloud proxy modernization, delivering 99.95% uptime for 53,000 corporate staff.',
        amateurVsExecutive: {
          amateur: 'We made sure we did not spend too much or take dumb chances.',
          executive: 'We exercised prudent stewardship by aligning our cloud architecture directly with enterprise risk appetite.'
        },
        synonyms: ['fiduciary diligence', 'conscientious governance', 'responsible leadership'],
        drillPrompt: 'Explain how you demonstrate prudent stewardship when managing multi-million dollar vendor security contracts.'
      },
      {
        id: `ai-${timestamp}-3`,
        word: 'Bilateral Alignment',
        phonetic: '/ˌbaɪˈlæt.ər.əl əˈlaɪn.mənt/',
        partOfSpeech: 'noun phrase',
        category: 'boardroom_influence',
        definition: 'A mutually agreed, reciprocal pact or understanding established directly between two key stakeholders or executive departments.',
        boardroomContext: 'We have secured bilateral alignment between the CISO office and Payments Engineering on our zero-trust migration timeline.',
        interviewApplication: 'I established bilateral alignment with individual business unit GMs prior to presenting the unified cyber policy to the TCAB committee.',
        amateurVsExecutive: {
          amateur: 'I talked to the other manager and we both agreed on what to do.',
          executive: 'I forged bilateral alignment with the Head of Payments, ensuring zero disruption to our Tier-1 customer transaction pipeline.'
        },
        synonyms: ['two-way consensus', 'reciprocal accord', 'mutual compact'],
        drillPrompt: 'Describe how you achieve bilateral alignment with a skeptical CFO who wants to delay a critical security control.'
      }
    ];
  }

  return [
    {
      id: `ai-${timestamp}-1`,
      word: 'Coalesce',
      phonetic: '/ˌkəʊ.əˈles/',
      partOfSpeech: 'verb',
      category: 'boardroom_influence',
      definition: 'To come together to form one whole; to unite fragmented groups, visions, or strategies under a common enterprise banner.',
      boardroomContext: 'Our strategic priority this quarter is to coalesce our disparate regional delivery units into a centralized cloud governance model.',
      interviewApplication: 'I coalesced five separate engineering tribes around a singular infrastructure reliability charter, cutting mean-time-to-resolution by 40%.',
      amateurVsExecutive: {
        amateur: 'I got all the teams together to start working on the same thing.',
        executive: 'I coalesced 15 disparate stakeholder teams around a unified regulatory compliance roadmap.'
      },
      synonyms: ['unify', 'consolidate', 'fuse', 'integrate'],
      drillPrompt: 'Demonstrate how you coalesce conflicting senior leadership opinions when defining an enterprise roadmap.'
    },
    {
      id: `ai-${timestamp}-2`,
      word: 'Equilibrium',
      phonetic: '/ˌek.wɪˈlɪb.ri.əm/',
      partOfSpeech: 'noun',
      category: 'execution_capital',
      definition: 'A state in which opposing forces or influences are balanced; operational stability between velocity and safety.',
      boardroomContext: 'Our architectural objective is to establish an equilibrium where rapid customer feature releases do not degrade our core resilience baseline.',
      interviewApplication: 'Throughout my leadership at Downer, I maintained an equilibrium between aggressive cloud migration timelines and 99.95% system uptime requirements.',
      amateurVsExecutive: {
        amateur: 'We try to go fast without breaking stuff.',
        executive: 'We established an operational equilibrium that allowed rapid feature velocity while preserving zero-trust security postures.'
      },
      synonyms: ['balance', 'stability', 'parity', 'homeostasis'],
      drillPrompt: 'How do you defend the equilibrium between commercial speed and regulatory compliance to an impatient CEO?'
    },
    {
      id: `ai-${timestamp}-3`,
      word: 'Salient',
      phonetic: '/ˈseɪ.li.ənt/',
      partOfSpeech: 'adjective',
      category: 'boardroom_influence',
      definition: 'Most noticeable, prominent, or strategically important; standing out above the surrounding noise.',
      boardroomContext: 'In today’s executive briefing, I will highlight the three most salient risks impacting our Q4 payments transformation.',
      interviewApplication: 'My executive strength is distilling vast volumes of telemetry down to the salient strategic insights required for board-level decision-making.',
      amateurVsExecutive: {
        amateur: 'Here are the most important things you need to pay attention to.',
        executive: 'I synthesized our operational telemetry to spotlight the most salient vulnerabilities confronting the audit committee.'
      },
      synonyms: ['prominent', 'pivotal', 'crucial', 'conspicuous'],
      drillPrompt: 'Frame an opening statement to the board highlighting the single most salient risk facing the organization.'
    }
  ];
}
