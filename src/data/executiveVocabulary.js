// ==============================================================================
// Executive Lexicon & Vocabulary Database for Senior Leadership & Boardroom Presence
// Curated for Directors, VPs, CISOs, and Heads of Technology
// ==============================================================================

export const VOCABULARY_CATEGORIES = {
  all: 'All Executive Terms',
  governance_risk: 'Governance, Risk & Fiduciary',
  boardroom_influence: 'Boardroom Influence & Alignment',
  crisis_resilience: 'Crisis, Resilience & Transformation',
  execution_capital: 'Execution, Capital & Scalability'
};

export const CORE_EXECUTIVE_VOCABULARY = [
  {
    id: 'fiduciary',
    word: 'Fiduciary',
    phonetic: '/fɪˈdjuː.ʃi.er.i/',
    partOfSpeech: 'adjective / noun',
    category: 'governance_risk',
    definition: 'Involving trust, especially regarding the relationship between an executive trustee and a beneficiary, shareholder, or regulatory body.',
    boardroomContext: 'Our fiduciary responsibility to the board requires us to proactively remediate this critical architectural vulnerability before APRA CPS 234 audit scrutiny.',
    interviewApplication: 'In my role governing 200+ vendor relationships at CBA, I treated third-party cyber risk not merely as an IT checklist, but as an active fiduciary obligation to our depositors.',
    amateurVsExecutive: {
      amateur: 'We have to be careful with the company money and follow the rules so we do not get in trouble.',
      executive: 'We maintain an unwavering fiduciary posture, ensuring every technology investment is defensible under regulatory and shareholder scrutiny.'
    },
    synonyms: ['custodial', 'trustee', 'stewardship', 'obligatory'],
    antonyms: ['unaccountable', 'negligent'],
    drillPrompt: 'Frame your approach to cybersecurity budgeting as a fiduciary protection of enterprise value rather than a technical cost center.'
  },
  {
    id: 'delineate',
    word: 'Delineate',
    phonetic: '/dɪˈlɪn.i.eɪt/',
    partOfSpeech: 'verb',
    category: 'governance_risk',
    definition: 'To describe or mark out with precision; to clearly outline boundaries, operational accountabilities, or risk thresholds.',
    boardroomContext: 'We must clearly delineate the boundary between first-line engineering delivery and second-line risk assurance to maintain structural independence.',
    interviewApplication: 'During the cloud proxy modernization at Downer, I clearly delineated RACI accountabilities across 300+ sites to eliminate change management bottlenecks.',
    amateurVsExecutive: {
      amateur: 'We need to figure out who is supposed to do what on the team.',
      executive: 'We delineated operational ownership across both engineering and risk functions to eliminate ambiguity and enforce audit accountability.'
    },
    synonyms: ['demarcate', 'outline', 'define', 'specify'],
    antonyms: ['obfuscate', 'blur', 'conflate'],
    drillPrompt: 'Delineate how your leadership distinguishes operational noise from critical systemic risk in an enterprise crisis.'
  },
  {
    id: 'commensurate',
    word: 'Commensurate',
    phonetic: '/kəˈmen.sər.ət/',
    partOfSpeech: 'adjective',
    category: 'execution_capital',
    definition: 'Corresponding in size, extent, amount, or degree; proportionate to the level of risk or business value.',
    boardroomContext: 'The recommended $14M capital expenditure for our Zero-Trust architecture is directly commensurate with the $850M revenue exposure of our digital banking channels.',
    interviewApplication: 'I ensure risk mitigation controls are strictly commensurate with asset criticality, avoiding excessive operational friction for low-impact workflows.',
    amateurVsExecutive: {
      amateur: 'We should spend a lot because this is a big risk.',
      executive: 'Our remediation allocation was rigorously commensurate with the quantified commercial exposure.'
    },
    synonyms: ['proportionate', 'equivalent', 'aligned', 'balanced'],
    antonyms: ['disproportionate', 'inadequate', 'excessive'],
    drillPrompt: 'Justify a major infrastructure modernization budget by proving the investment is commensurate with enterprise risk reduction.'
  },
  {
    id: 'fungible',
    word: 'Fungible',
    phonetic: '/ˈfʌn.dʒə.bəl/',
    partOfSpeech: 'adjective',
    category: 'execution_capital',
    definition: 'Mutually interchangeable; capable of being replaced by another identical item without loss of value or utility.',
    boardroomContext: 'Cloud security architecture skills are not fungible with general DevOps talent; substituting them during migration introduces unmeasured systemic vulnerabilities.',
    interviewApplication: 'When prioritizing delivery capacity across 53,000 corporate users, I treated commoditized infrastructure as fungible, while fiercely retaining specialized cyber talent.',
    amateurVsExecutive: {
      amateur: 'You cannot just switch engineers around like interchangeable parts.',
      executive: 'Senior cyber talent is non-fungible; deploying specialized personnel to high-assurance domains is essential to maintain regulatory resilience.'
    },
    synonyms: ['interchangeable', 'swappable', 'standardized'],
    antonyms: ['unique', 'non-fungible', 'specialized'],
    drillPrompt: 'Explain to a CFO why cybersecurity engineering resources cannot simply be treated as fungible project headcount.'
  },
  {
    id: 'bifurcation',
    word: 'Bifurcation',
    phonetic: '/ˌbaɪ.fərˈkeɪ.ʃən/',
    partOfSpeech: 'noun',
    category: 'crisis_resilience',
    definition: 'The division of something into two separate branches or parts, especially representing a critical strategic divide.',
    boardroomContext: 'The market exhibits a sharp bifurcation: organizations investing in proactive automated governance thrive, while those relying on manual audits face crippling regulatory penalties.',
    interviewApplication: 'I identified a bifurcation between legacy on-premises compliance and cloud-native velocity, establishing a dual-track migration path that safeguarded uptime.',
    amateurVsExecutive: {
      amateur: 'There are two different ways people are doing this right now.',
      executive: 'We observed a strategic bifurcation in the threat landscape, prompting us to separate perimeter defenses from identity-centric microsegmentation.'
    },
    synonyms: ['divergence', 'division', 'split', 'dichotomy'],
    antonyms: ['convergence', 'unification', 'coalescence'],
    drillPrompt: 'Discuss the bifurcation of enterprise cyber risks between internal insider threats and third-party supply-chain vectors.'
  },
  {
    id: 'galvanize',
    word: 'Galvanize',
    phonetic: '/ˈɡæl.və.naɪz/',
    partOfSpeech: 'verb',
    category: 'boardroom_influence',
    definition: 'To shock, excite, or inspire people into taking rapid, unified collective action.',
    boardroomContext: 'Our objective today is to galvanize executive support for the enterprise identity overhaul before our upcoming annual APRA supervisory review.',
    interviewApplication: 'When governing the Log4j emergency response across 200+ vendor endpoints, I galvanized cross-functional teams across engineering, legal, and communications in under 4 hours.',
    amateurVsExecutive: {
      amateur: 'I pushed everyone to work faster and get the job done.',
      executive: 'I galvanized 15 disparate cross-functional teams around a unified incident command cadence, resolving the exposure within our SLA.'
    },
    synonyms: ['mobilize', 'electrify', 'catalyze', 'energize'],
    antonyms: ['demoralize', 'dissuade', 'paralyze'],
    drillPrompt: 'Describe a time you had to galvanize skeptical stakeholders to accept a high-friction security mandate.'
  },
  {
    id: 'synthesize',
    word: 'Synthesize',
    phonetic: '/ˈsɪn.θə.saɪz/',
    partOfSpeech: 'verb',
    category: 'boardroom_influence',
    definition: 'To combine complex, disparate elements, data points, or viewpoints into a coherent, strategic narrative.',
    boardroomContext: 'Rather than drowning the audit committee in 400 pages of SIEM logs, we synthesized the findings into three strategic risk vectors with quantified dollar exposures.',
    interviewApplication: 'My executive value lies in synthesizing complex technical telemetry from 53,000 endpoints into board-level strategic roadmaps.',
    amateurVsExecutive: {
      amateur: 'I took all the data from different tools and put it together in a summary.',
      executive: 'I synthesized fragmented operational telemetry across 12 monitoring tools into an executive dashboard highlighting systemic business bottlenecks.'
    },
    synonyms: ['distill', 'integrate', 'consolidate', 'harmonize'],
    antonyms: ['fragment', 'dissect', 'disintegrate'],
    drillPrompt: 'How do you synthesize technical post-mortems into strategic board recommendations that secure capital funding?'
  },
  {
    id: 'dispassionate',
    word: 'Dispassionate',
    phonetic: '/dɪsˈpæʃ.ən.ət/',
    partOfSpeech: 'adjective',
    category: 'governance_risk',
    definition: 'Not influenced by strong emotion, panic, or bias; rationally objective, impartial, and calm under intense pressure.',
    boardroomContext: 'During an active ransomware extortion, the executive committee requires dispassionate risk analysis, not reactionary technical theater.',
    interviewApplication: 'In high-velocity TCAB/DCAB architectural governance, I maintained a dispassionate review posture, approving deployments solely on quantifiable risk and rollback readiness.',
    amateurVsExecutive: {
      amateur: 'I did not get upset and just stayed calm when everyone was arguing.',
      executive: 'I anchored the crisis conference in dispassionate, evidence-based triage, removing subjective panic from our incident remediation cadence.'
    },
    synonyms: ['objective', 'unbiased', 'impartial', 'composed'],
    antonyms: ['emotional', 'reactive', 'partisan', 'panicked'],
    drillPrompt: 'Demonstrate how a dispassionate leadership cadence stabilizes an engineering organization during a major operational breach.'
  },
  {
    id: 'inflection-point',
    word: 'Inflection Point',
    phonetic: '/ɪnˈflek.ʃən pɔɪnt/',
    partOfSpeech: 'noun phrase',
    category: 'crisis_resilience',
    definition: 'A decisive time of significant, structural change or turning point where a historical trajectory fundamentally alters.',
    boardroomContext: 'The enforcement of APRA CPS 230 marks an irreversible inflection point: operational resilience is no longer an IT operational matter, but a board-level legal liability.',
    interviewApplication: 'Leading Downer’s cloud proxy rollout during pandemic remote-work mandates was our operational inflection point, driving 99.95% uptime for 53,000 distributed staff.',
    amateurVsExecutive: {
      amateur: 'Things changed a lot and we had to do something totally different.',
      executive: 'We recognized an inflection point in our regulatory posture and pivoted from reactive ticketing to continuous automated compliance.'
    },
    synonyms: ['watershed moment', 'turning point', 'crux', 'pivot'],
    antonyms: ['plateau', 'equilibrium', 'status quo'],
    drillPrompt: 'Identify an inflection point in your enterprise technology architecture and articulate how you led the organizational pivot.'
  },
  {
    id: 'antifragile',
    word: 'Antifragile',
    phonetic: '/ˌæn.tiˈfrædʒ.aɪl/',
    partOfSpeech: 'adjective',
    category: 'crisis_resilience',
    definition: 'Benefiting and growing stronger from stress, volatility, attacks, and shocks, rather than merely resisting or surviving them.',
    boardroomContext: 'Our goal under CPS 230 is not merely robust systems, but an antifragile operational posture that leverages simulated chaos testing to fortify core banking rails.',
    interviewApplication: 'By instituting unannounced vendor compromise simulations at CBA, we transformed our third-party response into an antifragile capability that reduced dwell time by 75%.',
    amateurVsExecutive: {
      amateur: 'We made our systems strong so they do not break easily.',
      executive: 'We architected an antifragile delivery model where automated chaos drills continually reinforce our defense in depth.'
    },
    synonyms: ['resilient', 'regenerative', 'self-strengthening', 'robust'],
    antonyms: ['fragile', 'brittle', 'vulnerable'],
    drillPrompt: 'How do you design an engineering or cyber team that is antifragile when facing unexpected budget cuts or regulatory audits?'
  },
  {
    id: 'cadence',
    word: 'Cadence',
    phonetic: '/ˈkeɪ.dəns/',
    partOfSpeech: 'noun',
    category: 'boardroom_influence',
    definition: 'A rhythmic sequence or regular operational pace of reviews, governance meetings, communications, or execution cycles.',
    boardroomContext: 'We have instituted a bi-weekly governance cadence with line-of-business GMs to resolve compliance blockers before they escalate to the board.',
    interviewApplication: 'I established a predictable 14-day sprint cadence across our multi-vendor governance ecosystem, eliminating delivery surprises and aligning milestones with executive expectations.',
    amateurVsExecutive: {
      amateur: 'We meet often so we know what is happening.',
      executive: 'I instituted a structured operational cadence that heightened delivery transparency and halved cross-departmental friction.'
    },
    synonyms: ['rhythm', 'tempo', 'frequency', 'drumbeat'],
    antonyms: ['irregularity', 'sporadicity'],
    drillPrompt: 'Describe the operational cadence you deploy to maintain tight alignment between engineering squads and C-suite leadership.'
  },
  {
    id: 'operationalize',
    word: 'Operationalize',
    phonetic: '/ˌɑː.pəˈreɪ.ʃən.əl.aɪz/',
    partOfSpeech: 'verb',
    category: 'execution_capital',
    definition: 'To put a strategy, policy, or theoretical framework into everyday practical, repeatable execution and measurable operation.',
    boardroomContext: 'Our technology strategy is sound; our exclusive focus for Q3 is to operationalize zero-trust microsegmentation across all Tier-1 payments infrastructure.',
    interviewApplication: 'At CBA, I operationalized APRA CPS 234 standards by embedding automated compliance controls directly into CI/CD deployment pipelines.',
    amateurVsExecutive: {
      amateur: 'We took the policy document and started making people follow it at work.',
      executive: 'I operationalized our enterprise security standard by automating compliance checks into our daily engineering toolchain.'
    },
    synonyms: ['execute', 'institutionalize', 'implement', 'systematize'],
    antonyms: ['theorize', 'conceptualize', 'stagnate'],
    drillPrompt: 'How do you take an abstract executive strategy handed down by the board and operationalize it across 500+ engineers?'
  },
  {
    id: 'gravitas',
    word: 'Gravitas',
    phonetic: '/ˈɡræv.ɪ.tɑːs/',
    partOfSpeech: 'noun',
    category: 'boardroom_influence',
    definition: 'Dignity, seriousness, and solemnity of manner that commands respect, trust, and authority in high-stakes environments.',
    boardroomContext: 'When briefing the Risk and Audit Committee during an APRA enquiry, an executive must exhibit gravitas: unflinching accountability backed by data.',
    interviewApplication: 'Throughout my 25+ years commanding TCAB/DCAB governance, I have developed the executive gravitas needed to challenge entrenched leadership when risk thresholds are breached.',
    amateurVsExecutive: {
      amateur: 'I acted serious so they would take me seriously in the meeting.',
      executive: 'I projected executive gravitas by leading with unvarnished data, owning the organizational gaps, and delineating clear paths to remediation.'
    },
    synonyms: ['presence', 'stature', 'poise', 'authority', 'substance'],
    antonyms: ['levity', 'frivolity', 'timidity', 'hesitation'],
    drillPrompt: 'How do you maintain executive gravitas when non-technical executives publicly dispute your risk findings in the boardroom?'
  },
  {
    id: 'systemic',
    word: 'Systemic',
    phonetic: '/sɪˈstem.ɪk/',
    partOfSpeech: 'adjective',
    category: 'governance_risk',
    definition: 'Relating to an entire system as a whole rather than its individual, isolated parts; fundamental to the structural fabric.',
    boardroomContext: 'This incident is not an isolated workstation glitch; it stems from a systemic deficiency in our legacy identity lifecycle management across subsidiaries.',
    interviewApplication: 'Rather than treating recurring vendor incidents as one-off firefighting exercises, I addressed the systemic governance deficit across all 200+ third-party suppliers.',
    amateurVsExecutive: {
      amateur: 'This problem is everywhere in the whole company, not just on one computer.',
      executive: 'We conducted a root-cause audit to resolve the systemic architectural vulnerability rather than applying superficial point fixes.'
    },
    synonyms: ['structural', 'endemic', 'enterprise-wide', 'foundational'],
    antonyms: ['isolated', 'localized', 'superficial', 'peripheral'],
    drillPrompt: 'Differentiate between a localized operational hiccup and a systemic regulatory vulnerability when briefing the Board.'
  },
  {
    id: 'watershed',
    word: 'Watershed',
    phonetic: '/ˈwɔː.tər.ʃed/',
    partOfSpeech: 'noun / adjective',
    category: 'crisis_resilience',
    definition: 'An event or period that marks an important, historic turning point in a process, policy, or enterprise strategy.',
    boardroomContext: 'The 2024 Optus and Medibank regulatory enforcements were a watershed moment for Australian enterprise boards, permanently elevating cyber to personal director liability.',
    interviewApplication: 'Our cloud migration at Downer was a watershed initiative that transitioned our operations from legacy capital expenditure into an agile, highly resilient operating model.',
    amateurVsExecutive: {
      amateur: 'That big event changed everything for everybody forever.',
      executive: 'This regulatory ruling constitutes a watershed milestone, shifting corporate accountability from best-effort defense to strict fiduciary liability.'
    },
    synonyms: ['milestone', 'landmark', 'watershed moment', 'epoch'],
    antonyms: ['inconsequential event', 'routine occurrence'],
    drillPrompt: 'Discuss a watershed decision in your career where you defended enterprise resilience over short-term project deadlines.'
  }
];

// ==============================================================================
// Curated Boardroom & Senior Leadership Quizzes
// Testing: Boardroom Context, Altitude Elevation, Fill-in-the-Scenario
// ==============================================================================

export const EXECUTIVE_QUIZ_QUESTIONS = [
  {
    id: 'q1',
    category: 'boardroom_influence',
    question: 'You are addressing the Board of Directors regarding a critical APRA CPS 234 audit finding. Which opening statement demonstrates the highest executive altitude and fiduciary posture?',
    options: [
      {
        text: 'Our team worked really hard, but the auditors were very strict about our identity logs, so we need more budget to buy new software.',
        isCorrect: false,
        critique: 'Amateur & Defensive: Shifts blame to auditors, complains about workload, and begs for tools without business justification.'
      },
      {
        text: 'In fulfillment of our fiduciary stewardship, we have delineated three systemic identity vulnerabilities and committed a commensurate remediation roadmap to secure full regulatory compliance within 60 days.',
        isCorrect: true,
        critique: 'Flawless Executive Altitude: Uses "fiduciary stewardship", "delineated", "systemic", and "commensurate" to project control, ownership, and clear timelines.'
      },
      {
        text: 'We found some bugs in the Active Directory setup across our legacy servers, but our IT guys wrote scripts to patch them last night.',
        isCorrect: false,
        critique: 'Tactical Weeds: Focuses on scripts and IT server details rather than enterprise governance and board assurance.'
      },
      {
        text: 'This is not really a big deal because none of our customer accounts were actually hacked yet.',
        isCorrect: false,
        critique: 'High Liability / Disastrous: Trivializes regulatory compliance and exhibits reckless disregard for preventative governance.'
      }
    ],
    explanation: 'Senior leaders frame audit findings through fiduciary responsibility and systemic remediation rather than defensive excuses or tactical tool talk.'
  },
  {
    id: 'q2',
    category: 'execution_capital',
    question: 'The Chief Financial Officer asks: "Can we reallocate five senior cyber threat engineers to feature coding to hit our product launch date?" How does a Director/VP articulate the rebuttal?',
    options: [
      {
        text: 'Cyber threat engineering capabilities are non-fungible with general application development; redeploying them introduces unmeasured systemic risk into our primary revenue rail.',
        isCorrect: true,
        critique: 'Masterful Executive Precision: Deploys "non-fungible" accurately to protect specialized cyber assets while speaking the CFO’s language of revenue risk.'
      },
      {
        text: 'No, because my engineers hate writing frontend code and they will probably quit if you make them do that.',
        isCorrect: false,
        critique: 'Emotional & Whiny: Complains about engineer preferences rather than enterprise risk and architectural integrity.'
      },
      {
        text: 'Sure, we can do that for a couple of weeks as long as nothing gets hacked while they are gone.',
        isCorrect: false,
        critique: 'Reckless Abdication: Abandons risk ownership and gambling on good luck.'
      },
      {
        text: 'I think that is against agile principles and Scrum sprint rules.',
        isCorrect: false,
        critique: 'Junior Pedantry: Cites methodology dogma instead of strategic capital allocation and risk management.'
      }
    ],
    explanation: '"Fungible" is the decisive executive term here. Elite leaders defend domain specializations by linking them directly to enterprise risk exposure.'
  },
  {
    id: 'q3',
    category: 'crisis_resilience',
    question: 'During a high-stakes incident command conference call with the CEO, the lead engineer is panicking about an unconfirmed zero-day exploit. How should the executive intervene?',
    options: [
      {
        text: 'Everyone stay calm, let us hope it is just a false alarm or a network glitch.',
        isCorrect: false,
        critique: 'Passive Hope: Hope is not a strategy in high-stakes incident command.'
      },
      {
        text: 'We will anchor our response in dispassionate triage: isolate the affected VLAN segment immediately, delineate verified telemetry from assumption, and establish an hourly communication cadence with the executive committee.',
        isCorrect: true,
        critique: 'Commanding Crisis Leadership: Applies "dispassionate triage", "delineate telemetry", and "communication cadence" to restore organizational order and strategic control.'
      },
      {
        text: 'Who approved this change in production? We need to find out whose fault this was right now.',
        isCorrect: false,
        critique: 'Destructive Blame Game: Creates terror and paralyzes the engineering team during active crisis response.'
      },
      {
        text: 'I will write an email to our vendor and see what their support desk says in the morning.',
        isCorrect: false,
        critique: 'Paralyzed / Negligent: Lacks urgency and abdicates operational command.'
      }
    ],
    explanation: 'A dispassionate executive cadence eliminates emotional panic and anchors the team in structured, verifiable action steps.'
  },
  {
    id: 'q4',
    category: 'governance_risk',
    question: 'Which word best fills the blank in this boardroom briefing: "The Optus and Medibank regulatory enforcements served as a ________ for the Australian enterprise landscape, shifting cyber defense from an IT operational issue to personal board director liability."',
    options: [
      {
        text: 'Bifurcation',
        isCorrect: false,
        critique: 'Incorrect context: Bifurcation means splitting into two branches, not a historic turning point.'
      },
      {
        text: 'Watershed',
        isCorrect: true,
        critique: 'Perfect Context: "Watershed" signifies a historic, transformative turning point that permanently alters the landscape.'
      },
      {
        text: 'Cadence',
        isCorrect: false,
        critique: 'Incorrect meaning: Cadence refers to operational rhythm or frequency.'
      },
      {
        text: 'Gravitas',
        isCorrect: false,
        critique: 'Incorrect meaning: Gravitas refers to personal presence and dignity, not a historical event.'
      }
    ],
    explanation: 'A "watershed" moment is an industry-defining turning point where prior assumptions are permanently invalidated.'
  },
  {
    id: 'q5',
    category: 'boardroom_influence',
    question: 'In an executive interview for VP of Security & Infrastructure, the panel asks: "How do you align differing stakeholder agendas across 15 business units?" Which response demonstrates executive synthesis?',
    options: [
      {
        text: 'I go to all their meetings and take copious notes on what each department wants.',
        isCorrect: false,
        critique: 'Tactical Scribe: Describes secretarial note-taking rather than executive influence and leadership.'
      },
      {
        text: 'I force them to sign a charter or I escalate their lack of cooperation to the Managing Director.',
        isCorrect: false,
        critique: 'Heavy-Handed Bureaucracy: Signals inability to build coalitions or persuade cross-functional peers.'
      },
      {
        text: 'I synthesize disparate business unit priorities into a unified capability roadmap, showing each GM how common security and cloud controls accelerate their specific time-to-market.',
        isCorrect: true,
        critique: 'Exceptional Strategic Influence: "Synthesize" shows high-altitude distillation; connects technical controls directly to commercial business goals.'
      },
      {
        text: 'I let each business unit do whatever they want so nobody gets angry with my team.',
        isCorrect: false,
        critique: 'Complete Abdication: Destroys enterprise governance and leads to catastrophic fragmentation.'
      }
    ],
    explanation: 'Executive influence is about synthesizing fragmented agendas into a compelling commercial narrative that unites disparate business units.'
  }
];

// Helper to get daily words based on current day of 28-day roadmap
export function getDailyWordsForDay(dayNumber = 1) {
  const index = (dayNumber - 1) % CORE_EXECUTIVE_VOCABULARY.length;
  const word1 = CORE_EXECUTIVE_VOCABULARY[index];
  const word2 = CORE_EXECUTIVE_VOCABULARY[(index + 1) % CORE_EXECUTIVE_VOCABULARY.length];
  const word3 = CORE_EXECUTIVE_VOCABULARY[(index + 2) % CORE_EXECUTIVE_VOCABULARY.length];
  return [word1, word2, word3];
}
