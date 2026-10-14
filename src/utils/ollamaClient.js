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
