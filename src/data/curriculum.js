// 28-Day Articulation Curriculum for Leaders, Directors & VPs
// 9 Minutes a Day System

export const WEEKS_META = [
  {
    week: 1,
    title: "Week 1: Cognitive Structuring & The Executive Foundation",
    subtitle: "Stop rambling. Break free from generic manager answers and command the 90-second anchor.",
    theme: "Foundation",
    daysRange: "Days 1 - 7"
  },
  {
    week: 2,
    title: "Week 2: From Manager to Executive — Strategic Framing",
    subtitle: "Shift from in-the-weeds operations to high-altitude business impact and C-suite brevity.",
    theme: "Strategic Shift",
    daysRange: "Days 8 - 14"
  },
  {
    week: 3,
    title: "Week 3: Vision, Gravitas & High-Stakes Storytelling",
    subtitle: "Articulate vision under ambiguity, resolve cross-functional friction, and project effortless authority.",
    theme: "Executive Gravitas",
    daysRange: "Days 15 - 21"
  },
  {
    week: 4,
    title: "Week 4: The Boardroom & VP Interview Crucible",
    subtitle: "Rapid-fire handling, executive compensation poise, table-flipping questions, and the final interview.",
    theme: "Crucible & Mastery",
    daysRange: "Days 22 - 28"
  }
];

export const CURRICULUM = [
  // WEEK 1
  {
    day: 1,
    week: 1,
    title: "The 'Tell Me About Yourself' Executive Anchor",
    category: "Interview Opening",
    tagline: "Your resume got you into the room. Your voice secures the VP/Director seat.",
    objective: "Master the 90-second non-generic Executive Anchor (Past Spark → Present Strategic Multiplier → Future Trajectory) without reciting your resume chronologically.",
    coreInsight: "Managers list their job titles from 2014 to present. Executives state their specialized value proposition and the commercial problems they eliminate.",
    framework: {
      name: "The 3-Act Executive Anchor",
      steps: [
        { name: "Act 1: The Commercial Identity (20s)", desc: "Who you are as an executive multiplier (e.g. 'I specialize in transforming fragmented engineering orgs into predictable revenue engines')." },
        { name: "Act 2: The Two Milestone Multipliers (40s)", desc: "Highlight two high-stakes strategic inflection points with quantifiable business impact (not daily tasks)." },
        { name: "Act 3: The Forward Alignment (30s)", desc: "Why this Director/VP challenge is the exact strategic match for where your leadership delivers maximum ROI." }
      ]
    },
    practicePrompt: "Answer: 'Tell me about yourself.' Deliver your non-generic 90-second Executive Anchor. Time yourself strictly for 90 seconds. Keep your gaze steady and speak from your diaphragm.",
    managerVsLeader: {
      manager: "I graduated with an engineering degree in 2012, then worked at Company A as a junior dev, then got promoted to team lead, then moved to Company B where I managed 12 engineers and ran sprints...",
      leader: "I am an engineering leader specializing in turning complex, multi-market platforms into high-velocity product engines. Over the last 6 years, I've led two major transformations—most recently scaling a 45-person org to deliver $35M in ARR while halving time-to-market. What drew me to this VP role is your international expansion: scaling architectures and senior teams through rapid inflection is precisely where I generate outsized value."
    },
    keyWatchouts: [
      "Never start with 'So, as you can see on my resume...'",
      "Eliminate chronological biography; focus on strategic inflection points",
      "Do not exceed 90 seconds (longer signals inability to summarize)"
    ]
  },
  {
    day: 2,
    week: 1,
    title: "The PREP Model: Crisp Answers Without Fluff",
    category: "Thought Structuring",
    tagline: "The fastest way to look like a junior manager is to think out loud.",
    objective: "Train your brain to answer unexpected executive questions within 45 seconds using Point, Reason, Example, Point.",
    coreInsight: "When leaders are asked a question, they deliver the conclusion in the first 5 seconds. Managers wander for 60 seconds before arriving at their point.",
    framework: {
      name: "PREP Framework",
      steps: [
        { name: "P - Point", desc: "State your direct answer or stance in one sentence." },
        { name: "R - Reason", desc: "Provide the core strategic or business justification (1-2 sentences)." },
        { name: "E - Example", desc: "Cite one concrete data point, metric, or past operational win." },
        { name: "P - Point", desc: "Reiterate your headline with a forward-looking takeaway." }
      ]
    },
    practicePrompt: "Question: 'Should we prioritize entering the mid-market segment this quarter or double down on enterprise retention?' Use PREP to deliver an executive answer in 45 seconds.",
    managerVsLeader: {
      manager: "Well, that's a tough question because mid-market has a lot of competitors, but our sales team has been asking for it, and on the other hand retention is slipping slightly, so maybe we could run a pilot or check with marketing...",
      leader: "We must double down on enterprise retention this quarter. Our Net Revenue Retention currently sits at 98%, and every 1% recovery delivers $1.2M in high-margin ARR with zero acquisition cost. While mid-market is attractive long-term, launching it with a leaky bucket will drain our sales engineering bandwidth. Once retention hits 105%, we fund mid-market from expansion revenue."
    },
    keyWatchouts: [
      "Avoid conversational preambles ('That's a great question, let me think...')",
      "Stop speaking the moment you land on the final Point"
    ]
  },
  {
    day: 3,
    week: 1,
    title: "Crushing Filler Words & Verbal Hedging",
    category: "Vocal Authority",
    tagline: "Filler words are not vocal tics; they are fear of silence.",
    objective: "Eliminate verbal hedges ('kind of', 'basically', 'I think maybe', 'sort of') and filler sounds ('um', 'ah') using the replacement silence technique.",
    coreInsight: "When you replace an 'um' with silence, you sound thoughtful, deliberate, and senior. When you fill silence with 'uh', you sound anxious and defensive.",
    framework: {
      name: "The Pause-Replace Technique",
      steps: [
        { name: "Step 1: Identify the Trigger", desc: "Notice the micro-second when your brain is searching for the next phrase." },
        { name: "Step 2: Close Your Lips", desc: "Physically press your lips together to physically prevent 'um' from escaping." },
        { name: "Step 3: Exhale & Resume", desc: "Take a micro-breath and speak the next word with resonant chest voice." }
      ]
    },
    practicePrompt: "Deliver a 60-second summary of your leadership philosophy without using the words: 'um', 'uh', 'like', 'basically', or 'sort of'. Record and count your pauses.",
    managerVsLeader: {
      manager: "My leadership style is basically, um, very collaborative, you know? I kind of like to empower people and, like, make sure everyone feels heard...",
      leader: "My leadership philosophy rests on two pillars: radical context and extreme ownership. I provide my directors with clear strategic outcomes and guardrails, then grant complete operational autonomy to execute."
    },
    keyWatchouts: [
      "Watch out for the upward inflection at the end of sentences (uptalk) that turns statements into questions",
      "End every sentence on a downward or neutral tonal drop"
    ]
  },
  {
    day: 4,
    week: 1,
    title: "The 3-Beat Strategic Pause",
    category: "Executive Gravitas",
    tagline: "A junior candidate rushes to answer. A VP takes three seconds to own the room.",
    objective: "Master the 3-second deliberate pause before responding to challenging, confrontational, or complex interview questions.",
    coreInsight: "Silence feels like an eternity to the speaker, but to the listener, a 3-second pause signals emotional regulation, high status, and deep confidence.",
    framework: {
      name: "The 3-Beat Reset",
      steps: [
        { name: "Beat 1 (1 sec)", desc: "Maintain calm, unwavering eye contact with the interviewer. No nodding or fidgeting." },
        { name: "Beat 2 (2 sec)", desc: "Formulate your single headline sentence in your mind." },
        { name: "Beat 3 (3 sec)", desc: "Deliver the headline with a relaxed, grounded opening breath." }
      ]
    },
    practicePrompt: "Prompt: You are asked by a Board Member: 'Why did your division miss the Q3 delivery milestone?' Practice the 3-beat pause, then deliver an accountable, calm 45-second answer.",
    managerVsLeader: {
      manager: "[Interrupts immediately] That was because vendor X didn't ship the API on time and two of our senior engineers were on leave, so it wasn't really our fault...",
      leader: "[3-Second Calm Pause] We missed Q3 by 8% due to an over-reliance on a single third-party dependency. As VP, the risk mitigation was my responsibility. Here are the two architectural shifts we executed to ensure Q4 ships 10 days ahead of schedule."
    },
    keyWatchouts: [
      "Do not look up at the ceiling while pausing (signals struggle)",
      "Do not apologize for thinking"
    ]
  },
  {
    day: 5,
    week: 1,
    title: "What - So What - Now What: The Boardroom Standard",
    category: "Thought Structuring",
    tagline: "The fastest way to communicate complex status to CEOs and Executives.",
    objective: "Package any business crisis, milestone, or operational change into 60 seconds with zero ambiguity.",
    coreInsight: "Executives care 10% about what happened, 40% about the commercial implications, and 50% about the immediate action plan.",
    framework: {
      name: "What - So What - Now What",
      steps: [
        { name: "What (15s)", desc: "The factual event, data shift, or milestone in plain language." },
        { name: "So What (20s)", desc: "The strategic, financial, or operational impact on current business objectives." },
        { name: "Now What (25s)", desc: "The decisive next steps, owner, and timeline for resolution or exploitation." }
      ]
    },
    practicePrompt: "Scenario: A key enterprise customer threatening to churn over a security audit requirement. Deliver a What - So What - Now What briefing in 60 seconds.",
    managerVsLeader: {
      manager: "We just had a meeting with Acme Corp and they sent over a 50-page SOC2 questionnaire, and compliance says we don't have Section 4 done, and the sales rep is freaking out...",
      leader: "What: Acme Corp has placed their $800k renewal on hold pending our SOC2 Type II remediation. So What: This represents 14% of our Q4 expansion target and risks setting a precedent for other financial clients. Now What: I have reallocated two security engineers to close the 3 audit gaps by Friday, and I have scheduled an executive check-in with their CISO on Monday to sign off on the timeline."
    },
    keyWatchouts: [
      "Keep 'What' strictly factual; do not bring emotions or grievances into it",
      "Make 'Now What' time-bound and outcome-oriented"
    ]
  },
  {
    day: 6,
    week: 1,
    title: "Vocal Resonance & Diaphragmatic Grounding",
    category: "Vocal Authority",
    tagline: "People don't just evaluate your words; they evaluate your vocal frequency.",
    objective: "Learn to lower your vocal pitch by 15-20 Hz into your chest cavity, eliminating the thin, nasal pitch that signals stress or junior standing.",
    coreInsight: "When nervous, vocal cords constrict, breathing shifts to the chest/throat, and pitch rises. Executives speak from the diaphragm with full resonant warmth.",
    framework: {
      name: "The 3-Point Grounding Drill",
      steps: [
        { name: "1. The Hum Check", desc: "Place your hand on your sternum. Hum 'Mmmmm' until you physically feel your chest vibrate." },
        { name: "2. The Yawn-Sigh Release", desc: "Inhale as if initiating a quiet yawn to drop your larynx, then sigh out 'Ha'." },
        { name: "3. Grounded Delivery", desc: "Speak your opening sentence directly from that vibrating chest resonance." }
      ]
    },
    practicePrompt: "Place your hand on your chest. Recite your opening 3 sentences from Day 1. Ensure your hand feels deep, steady chest vibrations on every single word.",
    managerVsLeader: {
      manager: "[High nasal pitch, rapid breathy tempo, voice rising at the end of every sentence]",
      leader: "[Warm, grounded chest resonance, measured tempo at 135 WPM, definitive downward cadence]"
    },
    keyWatchouts: [
      "Do not artificially growl or fake deepness; relax the throat and drop into natural chest vibration",
      "Keep shoulders relaxed and posture tall"
    ]
  },
  {
    day: 7,
    week: 1,
    title: "Week 1 Executive Crucible: The 9-Minute Mastery Drill",
    category: "Simulated Crucible",
    tagline: "Put Week 1 into practice under real-time simulated pressure.",
    objective: "Integrate the Executive Anchor, PREP, Pausing, and Resonance into a 9-minute simulated interview response.",
    coreInsight: "Knowledge is useless without vocal muscle memory. Today tests your reflex to speak like an executive under simulated time pressure.",
    framework: {
      name: "The 3-Stage 9-Minute Protocol",
      steps: [
        { name: "Stage 1 (2 min)", desc: "Review prompt and outline 3 bullet points mentally (no script)." },
        { name: "Stage 2 (4 min)", desc: "Live recorded delivery of 'Tell me about yourself' + 1 PREP challenge question." },
        { name: "Stage 3 (3 min)", desc: "Listen back, score yourself on the Executive Gravitas Rubric, note filler words." }
      ]
    },
    practicePrompt: "Crucible Test: Deliver your 90-second Executive Anchor, followed immediately by answering: 'What is the biggest operational risk in our industry right now?' using PREP. Zero filler words.",
    managerVsLeader: {
      manager: "Hesitates, rushes through 180 WPM, uses 8 filler words, wanders off topic.",
      leader: "Steady 130 WPM, deliberate 2-second pauses, clear structural signposts, commands authority."
    },
    keyWatchouts: [
      "Did you pause before answering the second question?",
      "Was your pacing steady between 120-140 words per minute?"
    ]
  },

  // WEEK 2
  {
    day: 8,
    week: 2,
    title: "High Altitude vs. In-The-Weeds: The Director Filter",
    category: "Strategic Shift",
    tagline: "Managers talk about how the sausage is made. VPs talk about the business margin.",
    objective: "Stop explaining daily Jira tickets, code commits, and operational minutiae. Speak strictly in business outcomes, leverage, and organizational velocity.",
    coreInsight: "When interviewers ask a Director/VP candidate about a project, they are listening for how you think about capital allocation, cross-functional leverage, and customer lifetime value.",
    framework: {
      name: "The Altitude Elevator",
      steps: [
        { name: "Level 1: The Weeds (Eliminate)", desc: "Code, daily meetings, tickets, manual tasks, technical tools." },
        { name: "Level 2: The Bridge (Brief)", desc: "Architecture, team structures, workflow governance, risk management." },
        { name: "Level 3: High Altitude (Focus)", desc: "Revenue acceleration, margin protection, customer retention, market leadership." }
      ]
    },
    practicePrompt: "Question: 'Describe a major initiative you led over the past year.' Eliminate all operational tools/tickets. Frame entirely around business leverage and financial impact.",
    managerVsLeader: {
      manager: "We implemented Docker and Kubernetes and migrated 40 microservices from on-prem to AWS, then we set up CI/CD pipelines with GitHub Actions and reduced build times by 12 minutes...",
      leader: "I spearheaded our infrastructure modernization to unlock two business outcomes: accelerating enterprise feature delivery by 40% while shaving $1.4M in annual cloud overhead. By restructuring our deploy cycles, we removed operational friction for 80 engineers, allowing us to onboard three tier-one financial institutions 6 months ahead of schedule."
    },
    keyWatchouts: [
      "Avoid technical tool alphabet soup (unless specifically requested in a deep dive)",
      "Always connect technical or operational effort to a top-line or bottom-line dollar value"
    ]
  },
  {
    day: 9,
    week: 2,
    title: "The SCQA Model for C-Suite Briefings",
    category: "Thought Structuring",
    tagline: "How McKinsey and Fortune 500 executives structure high-stakes briefings.",
    objective: "Master Situation, Complication, Question, Answer for framing strategic initiatives to CEOs and Boards.",
    coreInsight: "Executives have zero patience for stories that build suspense. The SCQA framework establishes immediate context and resolves it with strategic clarity.",
    framework: {
      name: "SCQA Framework",
      steps: [
        { name: "S - Situation (15s)", desc: "The stable baseline reality everyone agrees on." },
        { name: "C - Complication (20s)", desc: "The critical change, friction, or threat that broke that baseline." },
        { name: "Q - Question (10s)", desc: "The central strategic question that must now be answered." },
        { name: "A - Answer (45s)", desc: "Your recommended solution, required investment, and anticipated return." }
      ]
    },
    practicePrompt: "Brief a prospective CEO on why you need to reorganize your 50-person department into autonomous pods. Deliver using SCQA in under 90 seconds.",
    managerVsLeader: {
      manager: "Our teams are unhappy because there's too many meetings, and QA is bottlenecked, and we talked to the managers and they think we should try pods...",
      leader: "S: Over the past two years, our engineering team grew from 20 to 65 to support multi-product expansion. C: However, inter-team dependencies have increased release friction, doubling our lead time from 2 weeks to 6. Q: How do we regain startup speed without sacrificing architectural compliance? A: We are transitioning to 5 autonomous, cross-functional pods with dedicated product owners, projected to cut cycle time by 45% within 90 days."
    },
    keyWatchouts: [
      "Keep the Situation brief (do not spend 1 minute stating obvious facts)",
      "Make the Answer actionable with clear metrics"
    ]
  },
  {
    day: 10,
    week: 2,
    title: "The 'Failure' Question: Executive Extreme Ownership",
    category: "Interview Mastery",
    tagline: "A manager blames others or gives a fake failure. A leader owns the catastrophe and reveals the system fix.",
    objective: "Answer 'Tell me about a time you failed' with high gravitas, zero defensiveness, and a demonstration of systemic leadership resilience.",
    coreInsight: "Hiring committees ask about failure to test two things: your emotional maturity (do you blame subordinates or vendors?) and your ability to build institutional fail-safes.",
    framework: {
      name: "The Extreme Ownership Pivot",
      steps: [
        { name: "1. The Direct Admission (15s)", desc: "State the failure plainly without softening or justifying." },
        { name: "2. The Accountability Anchor (15s)", desc: "Explicitly identify where your own leadership oversight fell short." },
        { name: "3. The Institutional Fix (45s)", desc: "Detail the systemic policy, architecture, or governance you built that permanently eliminated that vulnerability." },
        { name: "4. The Net Return (15s)", desc: "Show how that failure created a stronger, more resilient organization." }
      ]
    },
    practicePrompt: "Practice answering: 'Tell me about your biggest professional failure as a leader.' Time strictly for 90 seconds. Focus on the systemic fix.",
    managerVsLeader: {
      manager: "Well, early on I was a perfectionist and worked too hard... or, well, there was one time when our QA vendor missed a critical bug right before Christmas...",
      leader: "Three years ago, I greenlit a multi-region migration without an automated rollback protocol because we were racing a marketing launch date. The database failed to sync, resulting in a 4-hour customer outage. As the executive sponsor, the rush was entirely my failure. I gathered the team, took complete responsibility with our CEO and clients, and immediately instituted mandatory automated rollback validation as a gating check for every release. That protocol has since protected over 120 production releases without a single regression."
    },
    keyWatchouts: [
      "Never use the cliché 'I'm a perfectionist' or 'I work too hard'",
      "Never blame your team members, cross-functional partners, or vendors"
    ]
  },
  {
    day: 11,
    week: 2,
    title: "Defending Against Hostile Executive Pushback",
    category: "Executive Gravitas",
    tagline: "When an interviewer challenges your premise, your reaction reveals your seniority level.",
    objective: "Master the art of non-defensive disagreement: validating the counter-argument, re-framing with data, and standing your ground with poise.",
    coreInsight: "Junior candidates get combative or crumble and instantly agree. Executives lean into pushback with intellectual curiosity: 'That is a compelling counterpoint—here is the trade-off calculus.'",
    framework: {
      name: "The Validate-Pivot-Data Protocol",
      steps: [
        { name: "1. Validate the Counter-Perspective (10s)", desc: "'That is an entirely valid concern, particularly in high-volatility markets.'" },
        { name: "2. Surface the Hidden Trade-off (20s)", desc: "'The decision came down to a deliberate trade-off between speed-to-market versus technical debt.'" },
        { name: "3. Anchor in the Guiding Metric (30s)", desc: "'We chose speed because securing the initial 5 enterprise contracts was worth the calculated refactoring cost in Year 2.'" }
      ]
    },
    practicePrompt: "Scenario: An interviewer cuts in: 'That architecture sounds unnecessarily expensive and over-engineered for a company our size.' Defend your position with poise.",
    managerVsLeader: {
      manager: "No, actually, it's not over-engineered at all, you don't understand how many requests we get, we had to do it this way or it would crash...",
      leader: "I appreciate that challenge—and at our current transaction volume, that critique is completely fair. The reason we opted for this architecture is that our contractual pipeline commits us to a 5x volume spike by Q3. Building for today would have cost $50k less, but re-architecting under live 5x load would have incurred an estimated $400k migration risk. We made a deliberate investment in forward margin protection."
    },
    keyWatchouts: [
      "Never begin with 'No, you're wrong' or 'Actually...'",
      "Acknowledge the merit of their view before presenting your trade-off analysis"
    ]
  },
  {
    day: 12,
    week: 2,
    title: "BLUF: Bottom Line Up Front",
    category: "Thought Structuring",
    tagline: "Give the headline first. If they want the paragraph, they will ask for it.",
    objective: "Train yourself to deliver the conclusion in the first 5 seconds of any response, eliminating the suspense novel approach to communication.",
    coreInsight: "C-suite executives process information top-down. If you bury the key conclusion at the end of a 3-minute explanation, they will tune out after 30 seconds.",
    framework: {
      name: "The BLUF Inversion",
      steps: [
        { name: "1. The 5-Second Headline", desc: "State the outcome, recommendation, or number immediately." },
        { name: "2. The 3 Supporting Pillars", desc: "Provide 3 concise strategic reasons (Pillar 1, 2, 3)." },
        { name: "3. The Hand-off Question", desc: "'I can go deeper into the financial model or the operational rollout—where would you like to focus?'" }
      ]
    },
    practicePrompt: "Question: 'What is your strategy for reducing customer onboarding time from 60 days to 14 days?' Answer using BLUF in under 60 seconds.",
    managerVsLeader: {
      manager: "First we need to audit the onboarding steps, and then talk to the customer success managers, and then we might need to automate the CSV upload, and maybe hire two more onboarding specialists...",
      leader: "Our strategy is to automate data ingestion and transition to self-serve sandbox provisioning, which will compress onboarding from 60 to 14 days by Q2. This hinges on three pillars: first, pre-built ERP connectors; second, a guided in-app validation checklist; and third, tying customer CSM incentives directly to time-to-value milestones. Would you like me to unpack the engineering roadmap or the CSM compensation shift?"
    },
    keyWatchouts: [
      "Do not give all 10 sub-details; stop after the 3 pillars and invite the interviewer to choose the path",
      "Executive brevity demonstrates confidence"
    ]
  },
  {
    day: 13,
    week: 2,
    title: "Balancing Warmth & Authority (The Executive Presence Dial)",
    category: "Vocal Authority",
    tagline: "Strength without warmth is intimidating and aloof. Warmth without strength is weak and subservient.",
    objective: "Calibrate your tone so that you are perceived as both deeply competent (strength) and exceptionally collaborative (warmth).",
    coreInsight: "Boards and CEOs do not hire abrasive dictators or pleasing pushovers. They hire leaders who combine high standards with empathetic human connection.",
    framework: {
      name: "The Dual Dial Matrix",
      steps: [
        { name: "Authority Cues (The Spine)", desc: "Steady posture, grounded vocal pitch, crisp sentence endings, no nervous smiling." },
        { name: "Warmth Cues (The Eye & Smile)", desc: "Open facial expression, genuine acknowledgment of the interviewer's perspective, relaxed breathing." },
        { name: "The Synthesis", desc: "Delivering firm, uncompromising strategic decisions with a warm, inclusive delivery." }
      ]
    },
    practicePrompt: "Deliver a difficult message to an executive peer: 'We cannot support your feature request in the Q3 roadmap because it does not align with our enterprise revenue commitments.' Balance warmth and unshakeable authority.",
    managerVsLeader: {
      manager: "[Apologetic, nervous] I'm so sorry, I really wanted to do it, but product management said no, please don't be mad at us...",
      leader: "[Warm smile, grounded voice] I understand how critical this workflow is for your team, and I appreciate you bringing it to the table. Looking at our Q3 commitments, our primary focus is enterprise security compliance to close our European deals. Let's look at the Q4 capacity planning together next week to see where this fits into our modular roadmap."
    },
    keyWatchouts: [
      "Avoid nervous laughter during serious strategic trade-off discussions",
      "Do not apologize for upholding company priorities"
    ]
  },
  {
    day: 14,
    week: 2,
    title: "Week 2 Executive Crucible: Defending an Unbudgeted Strategic Initiative",
    category: "Simulated Crucible",
    tagline: "The mid-point test: Can you command the boardroom under cross-examination?",
    objective: "Execute a 9-minute simulation pitch for an unbudgeted $500,000 initiative to the CEO and CFO, defending against budget cutbacks.",
    coreInsight: "Directors and VPs are not measured by how well they execute existing budgets; they are measured by their ability to generate consensus for new strategic investments.",
    framework: {
      name: "The 3-Phase 9-Minute Protocol",
      steps: [
        { name: "Minutes 0-2 (Cognitive Setup)", desc: "Review SCQA + BLUF outline for the pitch." },
        { name: "Minutes 2-6 (Live Crucible Delivery)", desc: "Deliver 90s pitch + 90s defense against simulated CFO objection: 'We are in a hiring freeze.'" },
        { name: "Minutes 6-9 (Audit & Rubric)", desc: "Analyze filler words, vocal resonance, and strategic altitude." }
      ]
    },
    practicePrompt: "Pitch: You need $500k to build an automated AI-assisted customer triage system. CFO objects: 'We have a headcount freeze.' Deliver your pitch and your non-defensive counter-argument.",
    managerVsLeader: {
      manager: "We really need this tool because my team is burned out and working 60-hour weeks, and it's not fair to them...",
      leader: "The headcount freeze is precisely why this $500k investment is non-negotiable. Without this automated triage, sustaining our 40% customer growth requires hiring 12 support engineers at $1.8M in annualized salary. By investing $500k in automation now, we absorb the growth with zero additional headcount, saving the company $1.3M in run-rate expenses in Year 1 alone."
    },
    keyWatchouts: [
      "Never base investment requests on 'my team is working hard'",
      "Base investment requests on financial ROI, efficiency multiples, and risk mitigation"
    ]
  },

  // WEEK 3
  {
    day: 15,
    week: 3,
    title: "The 60-Second Strategic Vision Anchor",
    category: "Executive Gravitas",
    tagline: "Managers manage the present. Leaders paint a clear, compelling picture of the destination.",
    objective: "Articulate a bold, credible 3-year vision for an organization or department in 60 seconds without generic corporate buzzwords.",
    coreInsight: "When asked 'What is your vision for this department?', 90% of candidates use empty platitudes ('innovative, world-class, agile'). True leaders articulate concrete structural and commercial transformations.",
    framework: {
      name: "The 3-Year Horizon Anchor",
      steps: [
        { name: "Year 1: Foundation & Debt Removal", desc: "'In Year 1, we stabilize core reliability and automate operational friction.'" },
        { name: "Year 2: Velocity & Market Parity", desc: "'In Year 2, we double feature cycle time and match competitor capabilities.'" },
        { name: "Year 3: Market Differentiation & Margin Dominance", desc: "'In Year 3, our proprietary infrastructure becomes our moat, unlocking 35% margin expansion.'" }
      ]
    },
    practicePrompt: "Question: 'If we hire you as Director/VP, what is your 3-year vision for this organization?' Deliver your structured answer in 60 seconds.",
    managerVsLeader: {
      manager: "My vision is to make this team the best team in the industry, very agile, high morale, adopting cutting-edge technologies and using best practices across the board...",
      leader: "My 3-year vision centers on evolving this organization from a cost center into a strategic revenue accelerator. In Year 1, we eliminate technical and operational bottlenecks, cutting onboarding time in half. In Year 2, we establish continuous delivery to test and launch new products every two weeks. By Year 3, our data architecture will power autonomous client insights, positioning us as the undisputed market leader in enterprise automation."
    },
    keyWatchouts: [
      "Banish buzzwords: 'best-in-class', 'world-class', 'synergy', 'cutting-edge'",
      "Tie each year to a measurable operational or commercial milestone"
    ]
  },
  {
    day: 16,
    week: 3,
    title: "Mental Models & Executive Analogies",
    category: "Thought Structuring",
    tagline: "If an 8-year-old and a Board Member can't both grasp your analogy, it is too complicated.",
    objective: "Transform dense, complex technical or operational concepts into crystal-clear analogies that non-technical CEOs immediately understand.",
    coreInsight: "The hallmark of executive genius is not speaking with complex vocabulary; it is simplifying high-complexity systems into memorable mental models.",
    framework: {
      name: "The Bridge Analogy Framework",
      steps: [
        { name: "1. The Complex Problem", desc: "Identify the abstract friction (e.g. monolithic technical debt, data silos)." },
        { name: "2. The Physical Metaphor", desc: "Anchor in a universally understood physical domain (airports, plumbing, highways, architecture)." },
        { name: "3. The Direct Implication", desc: "Map the metaphor directly back to the business consequence." }
      ]
    },
    practicePrompt: "Explain the danger of unmanaged technical or operational debt to a non-technical Chief Commercial Officer using a powerful physical analogy in 45 seconds.",
    managerVsLeader: {
      manager: "Our codebase has too many tightly coupled dependencies in the ORM layer, so when we query the PostgreSQL database we get N+1 query performance degradation...",
      leader: "Think of our current system like an airline expanding its fleet without building a control tower. Adding 20 new planes feels like growth, but because they all share one uncoordinated runway, every new flight increases the risk of a catastrophic gridlock. We need to invest in our digital control tower so we can land 100 flights simultaneously without delays."
    },
    keyWatchouts: [
      "Ensure the analogy has a clear, intuitive conclusion",
      "Do not stretch the analogy beyond its natural breaking point"
    ]
  },
  {
    day: 17,
    week: 3,
    title: "Leading Through Ambiguity (When You Don't Have the Data)",
    category: "Executive Gravitas",
    tagline: "Anyone can make a decision with 100% of the data. Leaders are paid to make decisions with 40%.",
    objective: "Master Colin Powell's 40/70 Rule of executive decision-making when asked how you navigate ambiguous, chaotic business environments.",
    coreInsight: "When asked about incomplete information, managers say 'I would wait for more data.' Leaders say 'I establish the cost of delay, identify the reversible assumptions, and take calculated action.'",
    framework: {
      name: "The 40/70 Ambiguity Protocol",
      steps: [
        { name: "1. The Cost of Inaction (15s)", desc: "Acknowledge that waiting for 100% data is often fatal in competitive markets." },
        { name: "2. Reversible vs. Irreversible Decisions (20s)", desc: "Classify into Type 1 (two-way door) or Type 2 (one-way door) decisions." },
        { name: "3. Small-Bet Validation (25s)", desc: "Deploy lightweight, low-risk operational tests to generate empirical signal rapidly." }
      ]
    },
    practicePrompt: "Question: 'How do you make critical strategic decisions when your data is contradictory or completely missing?' Answer in 60 seconds with executive poise.",
    managerVsLeader: {
      manager: "I usually set up a task force and send out surveys, and we try to do more research until we're confident that we have enough consensus to move forward...",
      leader: "I operate on the principle that inaction carries a quantifiable cost. When data is ambiguous, I divide the decision into two categories: reversible two-way doors and permanent one-way doors. For reversible decisions, having 50-60% confidence is sufficient to launch a pilot and harvest live market signal. For irreversible capital decisions, I stress-test the single catastrophic vulnerability and set hard kill-switches. Speed with calculated guardrails beats paralysis every time."
    },
    keyWatchouts: [
      "Do not suggest decision-making by endless committee or consensus",
      "Highlight risk mitigation and speed of feedback loops"
    ]
  },
  {
    day: 18,
    week: 3,
    title: "The Cross-Functional Conflict Resolution Story",
    category: "Interview Mastery",
    tagline: "A manager complains about another silo. A VP aligns divergent incentives.",
    objective: "Deliver a compelling 90-second story of resolving high-stakes conflict between competing departments (e.g. Sales vs. Engineering, Product vs. Finance).",
    coreInsight: "Executive conflict is rarely about bad personalities; it is almost always about misaligned KPIs and organizational incentives.",
    framework: {
      name: "The Shared North Star Arc",
      steps: [
        { name: "1. The Clash of Incentives (20s)", desc: "Frame both sides as rational actors acting on their conflicting department goals." },
        { name: "2. The Interlocking Realignment (40s)", desc: "Show how you brought both parties together to discover a shared commercial metric that unified their incentives." },
        { name: "3. The Durable Business Outcome (30s)", desc: "Highlight the lasting cross-functional collaboration and commercial lift." }
      ]
    },
    practicePrompt: "Tell a story: 'Describe a time you had a major conflict with an executive peer (e.g. VP of Sales or Chief Product Officer) and how you resolved it.'",
    managerVsLeader: {
      manager: "The VP of Sales was promising custom features to clients without checking with us, so I had to tell him in a meeting that we couldn't build them and he was frustrating the engineers...",
      leader: "Our Head of Sales was incentivized on quarterly bookings, while my engineering org was measured on platform stability and uptime. He needed custom enterprise commitments to hit his quota, which was overloading our core roadmap. Instead of treating this as an interpersonal conflict, I recognized a flaw in our incentives. I partnered with him to co-design an 'Enterprise Fast-Track' tier where 15% of our sprint capacity was reserved for pre-qualified deals exceeding $200k ARR. This unlocked $1.8M in new bookings while preserving platform uptime at 99.95%."
    },
    keyWatchouts: [
      "Never paint the other executive as the villain or unreasonable",
      "Focus on the structural alignment of business incentives"
    ]
  },
  {
    day: 19,
    week: 3,
    title: "Video Telepresence & Non-Verbal Gravitas",
    category: "Vocal Authority",
    tagline: "Over Zoom or Teams, 50% of your executive authority is determined before you say a single word.",
    objective: "Master the physical dynamics of virtual executive interviews: eye-line, camera distance, micro-nodding control, and hand placement.",
    coreInsight: "Looking down at the screen breaks connection. Excessive bobble-head nodding signals junior eagerness. True presence is stillness, deliberate eye-line, and open chest posture.",
    framework: {
      name: "The Virtual Command Checklist",
      steps: [
        { name: "1. Eye-Line Alignment", desc: "Camera at exact pupil height. Look directly into the lens when delivering key punchlines, not at the screen." },
        { name: "2. Frame Proportion", desc: "Head, shoulders, and chest visible with hands appearing naturally in the lower third of the frame." },
        { name: "3. Stillness as Strength", desc: "Eliminate swivel chair rocking, pencil tapping, and continuous head-nodding. Stillness radiates authority." }
      ]
    },
    practicePrompt: "Record a 60-second video response to: 'What sets you apart from other senior candidates?' Maintain direct eye contact with the camera lens and practice deliberate physical stillness.",
    managerVsLeader: {
      manager: "[Looking down at the screen, rocking back and forth in chair, nodding continuously, hands out of frame, dimly lit]",
      leader: "[Eye level with camera, calm erect posture, still shoulders, intentional open hand gestures, calm vocal delivery]"
    },
    keyWatchouts: [
      "Stop looking at your own self-view window; minimize it or hide it",
      "Speak 5% slower on video to account for audio compression lag"
    ]
  },
  {
    day: 20,
    week: 3,
    title: "The 'Why Should We Hire You at VP/Director Level?' Power Close",
    category: "Interview Mastery",
    tagline: "Do not tell them you will work hard. Tell them you will be an organizational multiplier.",
    objective: "Deliver a 75-second closing argument that positions you not as an applicant, but as an investment that will pay a 10x dividend.",
    coreInsight: "Companies hire managers for their output. They hire Directors and VPs for their multiplier effect—their ability to attract top talent, build culture, and unlock shareholder value.",
    framework: {
      name: "The 3-Pillar Multiplier Close",
      steps: [
        { name: "1. Talent Attraction & Retention (20s)", desc: "'I build organizations that attract A-players and retain senior leadership.'" },
        { name: "2. Commercial & Operational Execution (25s)", desc: "'I bridge strategic board vision with disciplined, on-time execution.'" },
        { name: "3. Executive Reliability (30s)", desc: "'I provide the CEO and Board with radical predictability—when an outcome is in my hands, it gets delivered.'" }
      ]
    },
    practicePrompt: "Deliver your answer to: 'Why should we choose you over other candidates who have been VPs for longer?' Time for exactly 75 seconds.",
    managerVsLeader: {
      manager: "I'm a very hard worker, I always put in extra hours, I have certifications, and I really want this job because it's a great step for my career...",
      leader: "You should hire me for three specific reasons: First, my track record of building high-retention leadership benches: my senior teams average a 92% retention rate, saving millions in replacement friction. Second, my ability to translate technical capability into commercial revenue: I don't manage code; I build business engines. And third, executive reliability. In an environment of rapid growth, you need leaders who eliminate blind spots rather than create them. That is the predictable velocity I bring to this leadership team on Day 1."
    },
    keyWatchouts: [
      "Never say 'this job is a great learning opportunity for me' (that is what interns say)",
      "Focus entirely on the ROI and peace of mind you provide to the executive committee"
    ]
  },
  {
    day: 21,
    week: 3,
    title: "Week 3 Executive Crucible: The 360 Alignment Drill",
    category: "Simulated Crucible",
    tagline: "Synthesize Vision, Conflict Resolution, and High Gravitas into a 9-minute executive performance.",
    objective: "Conduct a 9-minute simulation tackling a three-sided conflict: an underperforming director, an angry CEO, and a looming deadline.",
    coreInsight: "Leadership is the ability to navigate conflicting stakeholder demands while maintaining emotional equilibrium and operational velocity.",
    framework: {
      name: "The 3-Phase 9-Minute Protocol",
      steps: [
        { name: "Minutes 0-2 (Mental Blueprint)", desc: "Structure your multi-stakeholder strategy using the Shared North Star Arc." },
        { name: "Minutes 2-6 (Simulated Delivery)", desc: "Deliver your 3-minute executive address resolving the crisis." },
        { name: "Minutes 6-9 (Rubric Scoring)", desc: "Critique posture, tone modulation, and clarity of accountability." }
      ]
    },
    practicePrompt: "Crucible Test: Address your executive board regarding a 3-week delay on an enterprise product caused by cross-department conflict. Provide vision, accountability, and the path forward.",
    managerVsLeader: {
      manager: "Defensive, passes blame to other departments, speaks with rapid nervous energy.",
      leader: "Calm, grounded, takes complete ownership of coordination, establishes clear operational milestones."
    },
    keyWatchouts: [
      "Did your voice remain grounded throughout the delivery?",
      "Did you outline clear, time-bound deliverables for the next 7 days?"
    ]
  },

  // WEEK 4
  {
    day: 22,
    week: 4,
    title: "Rapid-Fire Executive Drills (10 Questions in 5 Minutes)",
    category: "Thought Structuring",
    tagline: "When senior leaders interview you, they test your reaction speed and mental agility.",
    objective: "Condition your cognitive reflexes to answer 10 diverse leadership questions in 30 seconds each, with zero preambles or filler words.",
    coreInsight: "Senior executives often test candidates with rapid-fire questions to see if their answers are rehearsed scripts or deeply internalized leadership principles.",
    framework: {
      name: "The Bullet Stance Technique",
      steps: [
        { name: "1. No Preamble", desc: "Zero seconds spent saying 'Good question' or 'Let me see'." },
        { name: "2. The Instant Anchor", desc: "Deliver the direct thesis in sentence 1." },
        { name: "3. The Proof Metric", desc: "Deliver the evidence in sentence 2." },
        { name: "4. The Stop", desc: "Halt at sentence 3." }
      ]
    },
    practicePrompt: "Practice answering: 1) What is your #1 management metric? 2) How do you handle an underperforming leader? 3) Remote or in-office? Give 30-second responses with zero fluff.",
    managerVsLeader: {
      manager: "Spends 25 seconds qualifying their opinion and only 5 seconds answering.",
      leader: "Delivers direct, high-conviction responses in 20 seconds, pausing calmly for the next question."
    },
    keyWatchouts: [
      "Do not give paragraph answers when a bullet answer is demanded",
      "Embrace brevity as the highest form of executive respect"
    ]
  },
  {
    day: 23,
    week: 4,
    title: "Executive Compensation & Negotiation Articulation",
    category: "Interview Mastery",
    tagline: "How you negotiate your own compensation is how they believe you will negotiate for the company.",
    objective: "Articulate your executive compensation expectations with calm authority, zero apology, and alignment with commercial value creation.",
    coreInsight: "When candidates get squeamish, apologetic, or defensive about money, it signals they do not believe their own market value. Executives discuss compensation as an objective commercial formula.",
    framework: {
      name: "The Value-Anchor Negotiation Script",
      steps: [
        { name: "1. Deflect Early Inquiries Gracefully (15s)", desc: "'Right now, my priority is ensuring our strategic alignment and mutual value creation. Once we agree on that fit, I know we will land on a competitive package.'" },
        { name: "2. Frame Around Market Multipliers (30s)", desc: "'Based on the scope of scaling this $40M org and managing 60 engineers, my expectation is in the $320k-$360k base band with meaningful equity upside tied to EBITDA milestones.'" },
        { name: "3. The Confident Silence", desc: "State the number and stop speaking completely. The first person to speak loses leverage." }
      ]
    },
    practicePrompt: "Answer: 'What are your compensation expectations for this VP role?' State your desired range and strategic rationale without blinking or adding nervous qualifiers.",
    managerVsLeader: {
      manager: "Well, I currently make X, so maybe 10% more would be nice, but I'm flexible and open to whatever you think is fair...",
      leader: "For a role with this scope of organizational transformation and P&L impact, my compensation target is $350k base with a 40% performance bonus and an equity grant reflecting a top-tier executive hire. Given the $20M revenue expansion we mapped out today, that structure directly aligns my upside with the shareholder value we create."
    },
    keyWatchouts: [
      "Never disclose your past salary as a limitation; frame entirely around the forward scope",
      "Do not apologize with phrases like 'I know that's high, but...'"
    ]
  },
  {
    day: 24,
    week: 4,
    title: "Executive Inversion: The 3 Counter-Questions That Flip the Table",
    category: "Interview Mastery",
    tagline: "Junior candidates ask about vacation policy and tech stack. VPs ask questions that make the CEO sweat.",
    objective: "Master the 3 high-altitude counter-questions to ask at the end of an interview that transform you from interviewee into a prospective peer and strategic partner.",
    coreInsight: "The questions you ask reveal more about your seniority level than all the answers you gave in the previous 45 minutes.",
    framework: {
      name: "The Boardroom Inversion Trio",
      steps: [
        { name: "Question 1: The Strategic Inflection", desc: "'When you look at your 2-year market roadmap, what is the single biggest internal bottleneck that keeps you up at night?'" },
        { name: "Question 2: The Leadership Gap", desc: "'What did the previous person in this seat do well, and what was the blind spot that cost the organization momentum?'" },
        { name: "Question 3: The 12-Month Definition of Success", desc: "'Imagine it is 12 months from today and you are writing my first annual review. What specific commercial outcome makes you say this was the best hire of the year?'" }
      ]
    },
    practicePrompt: "Simulate the final 3 minutes of an interview: 'Do you have any questions for us?' Deliver the 3 Inversion Questions with conversational authority.",
    managerVsLeader: {
      manager: "Yes, what is your 401(k) match, what are the working hours, and do you use Jira or Trello?",
      leader: "I have three strategic questions regarding your forward trajectory. First, looking at your European expansion, what is the single operational vulnerability that poses the highest risk to that timeline? [Pauses and listens intently]"
    },
    keyWatchouts: [
      "Do not ask questions that can be answered by reading the company's website or press releases",
      "Listen actively to their answers and weave your insights into their response"
    ]
  },
  {
    day: 25,
    week: 4,
    title: "Navigating Hostile & Stress Interview Tactics",
    category: "Executive Gravitas",
    tagline: "When an interviewer is rude, dismissive, or interrupts you, they are testing your emotional thermostat.",
    objective: "Maintain unbroken calm, emotional regulation, and vocal control when subjected to aggressive, dismissive, or interrupting interview styles.",
    coreInsight: "Stress interviews are designed to see if you crack under boardroom tension. If you get flustered, defensive, or timid, you fail. If you maintain steady warmth and firm boundaries, you win.",
    framework: {
      name: "The Thermostat Protocol",
      steps: [
        { name: "1. The Interruption Reset", desc: "When interrupted, immediately stop speaking without facial tension or annoyance." },
        { name: "2. The 2-Second Smile", desc: "A brief, confident micro-smile signals that you are in total control." },
        { name: "3. Reclaiming the Floor", desc: "'That brings us right back to the central data point: let's address that directly.'" }
      ]
    },
    practicePrompt: "Scenario: An interviewer dismissively snaps: 'I've read your resume and frankly I don't see anything that qualifies you for a VP title.' Respond with unflappable executive dignity.",
    managerVsLeader: {
      manager: "[Blushes, stammering, defensive] I've worked in this industry for 12 years and I managed 30 people and my boss gave me great reviews...",
      leader: "[Calm 3-second pause, relaxed posture, steady voice] That skepticism is completely understandable. A title is just words on paper. What matters is commercial impact. In my last role, I was brought into an organization facing the identical scaling hurdles you face today: 35% churn and delayed roadmaps. Within 18 months, my team reversed the churn and delivered $28M in net new pipeline. That is the execution capability I deliver, regardless of title. Let's look at the numbers together."
    },
    keyWatchouts: [
      "Do not take the bait emotionally",
      "Be the thermostat that regulates the room's temperature, not the thermometer that reflects it"
    ]
  },
  {
    day: 26,
    week: 4,
    title: "Vocal Endurance & Energy Calibration for 45-Minute Interviews",
    category: "Vocal Authority",
    tagline: "Most candidates start strong and lose vocal power by Minute 30. Executives finish with peak energy.",
    objective: "Build vocal endurance to sustain diaphragmatic power, steady pacing (130 WPM), and engaged presence across back-to-back 45-minute executive interview rounds.",
    coreInsight: "Executive interview loops are physical endurance tests. When physical stamina fades, voice pitch rises, filler words spike, and posture collapses.",
    framework: {
      name: "The 3-Point Physical Reset",
      steps: [
        { name: "1. The Sip & Breath Pause", desc: "Take a sip of room-temperature water before answering long strategic questions." },
        { name: "2. Spine & Hip Alignment", desc: "Sit on the front half of your chair with feet flat on the floor to keep your diaphragm uncompressed." },
        { name: "3. Vocal Projection Check", desc: "Speak not to the computer screen, but to an imaginary person standing 6 feet behind the wall." }
      ]
    },
    practicePrompt: "Deliver a 3-minute continuous response summarizing your 90-day onboarding plan as a new Director/VP. Focus on maintaining resonant chest projection to the final second.",
    managerVsLeader: {
      manager: "Starts fine, but by minute 2 voice becomes raspy, posture slouches, sentence endings fade away into mumbles.",
      leader: "Maintains clear, resonant acoustic power and rhythmic downward cadence from the first word to the last."
    },
    keyWatchouts: [
      "Hydrate with room temperature water (avoid cold ice water which constricts vocal cords)",
      "Do not lean back into a soft chair (it collapses your diaphragm)"
    ]
  },
  {
    day: 27,
    week: 4,
    title: "The Full 9-Minute VP/Director Dress Rehearsal",
    category: "Simulated Crucible",
    tagline: "The complete dress rehearsal: 9 minutes to prove you belong in the executive suite.",
    objective: "Execute a full-scale 9-minute mock interview combining your Executive Anchor, strategic PREP framing, failure ownership, and counter-questions.",
    coreInsight: "You have spent 26 days training the neural pathways of executive articulation. Today is your game-day simulation.",
    framework: {
      name: "The 4-Part Executive Examination",
      steps: [
        { name: "Part 1 (0-2m)", desc: "The 'Tell Me About Yourself' Anchor (90s)." },
        { name: "Part 2 (2-5m)", desc: "High-Altitude Strategy & Pushback Defense (PREP + Altitude Elevator)." },
        { name: "Part 3 (5-7m)", desc: "The Failure Question & Extreme Ownership." },
        { name: "Part 4 (7-9m)", desc: "The Inversion Counter-Questions & Multiplier Power Close." }
      ]
    },
    practicePrompt: "Record your complete 9-minute continuous dress rehearsal. Treat this recording with the exact intensity of an interview with the Chairman of the Board.",
    managerVsLeader: {
      manager: "Disorganized, lapses into old habits, rambling timelines, uncertain pauses.",
      leader: "Poised, resonant, crystal-clear structure, commanding commercial framing, effortless authority."
    },
    keyWatchouts: [
      "No pausing or stopping the recording; push through any hesitation with a calm 3-beat pause",
      "Treat your camera as the CEO"
    ]
  },
  {
    day: 28,
    week: 4,
    title: "Graduation Day: The Executive Readiness Certification",
    category: "Mastery & Graduation",
    tagline: "You entered as a manager who hoped to be noticed. You emerge as a leader who commands the room.",
    objective: "Review your 28-day transformation, complete your final Articulation Benchmark Audit, and generate your personal Executive Playbook and Certificate.",
    coreInsight: "If you want to just look busy, read books. But to win leadership roles, you must train your voice and organize your thoughts under fire. You have done the work.",
    framework: {
      name: "The 5 Pillars of Executive Mastery",
      steps: [
        { name: "1. The 90-Second Executive Anchor", desc: "Mastered non-generic commercial identity." },
        { name: "2. The PREP & BLUF Reflex", desc: "Headline-first, zero-rambling thought organization." },
        { name: "3. Grounded Chest Resonance", desc: "Eliminated verbal hedging, filler sounds, and nervous uptalk." },
        { name: "4. High-Altitude Commercial Framing", desc: "Replaced Jira tickets with P&L leverage and organizational multipliers." },
        { name: "5. Boardroom Poise & Non-Defensiveness", desc: "Embraced hostile pushback with intellectual curiosity." }
      ]
    },
    practicePrompt: "Deliver your final Graduation Address: In 2 minutes, articulate who you are, the organizational impact you unlock, and why you are ready to lead at the VP/Director level.",
    managerVsLeader: {
      manager: "Still reading books and hoping things change without vocal conditioning.",
      leader: "Trained voice, disciplined mind, calibrated resonance, and ready to walk into any executive room and win."
    },
    keyWatchouts: [
      "Download your 28-Day Executive Playbook",
      "Print your Executive Readiness Certificate",
      "Go into your next interview with calm, unshakeable certainty"
    ]
  }
];

export const EXECUTIVE_VOCABULARY_DICTIONARY = [
  { weak: "I handled a lot of things", executive: "I orchestrated cross-functional execution" },
  { weak: "We fixed the bug", executive: "We remediated the root cause and instituted regression safeguards" },
  { weak: "I think maybe we should", executive: "The operational data points directly toward" },
  { weak: "My team was working really hard", executive: "We maximized engineering throughput and velocity" },
  { weak: "We did a project with Sales", executive: "We established cross-functional revenue alignment with Sales" },
  { weak: "It wasn't my fault", executive: "As the executive sponsor, the ultimate oversight was mine; here is the systemic remediation" },
  { weak: "I manage 15 people", executive: "I lead an organization of 15 high-performing engineers across 3 strategic pods" },
  { weak: "We need more budget", executive: "This $250k capital allocation yields a 3.4x return within 4 quarters" },
  { weak: "I want to learn new skills", executive: "I am ready to deploy my scaling playbook at higher organizational leverage" },
  { weak: "Basically, sort of, kind of", executive: "[Pause 2 seconds, deliver direct conclusion]" }
];

export const MOCK_INTERVIEW_QUESTIONS = [
  {
    id: 1,
    category: "Opening",
    question: "Tell me about yourself.",
    framework: "The 3-Act Executive Anchor (Past Spark → Present Multiplier → Future Alignment)",
    targetTime: "90 seconds",
    difficulty: "Essential"
  },
  {
    id: 2,
    category: "Strategic Shift",
    question: "What is the difference between how you led as a manager versus how you will lead as a Director/VP?",
    framework: "Altitude Elevator (Tactical Doing vs. Organizational Multiplier)",
    targetTime: "60 seconds",
    difficulty: "High"
  },
  {
    id: 3,
    category: "Conflict",
    question: "Tell me about a time you strongly disagreed with executive leadership. What did you do?",
    framework: "Validate - Pivot - Shared Commercial North Star",
    targetTime: "75 seconds",
    difficulty: "High"
  },
  {
    id: 4,
    category: "Accountability",
    question: "Walk me through your biggest leadership failure over the last 3 years.",
    framework: "Extreme Ownership Pivot (Direct Admission → Leadership Oversight → Systemic Fix)",
    targetTime: "90 seconds",
    difficulty: "High"
  },
  {
    id: 5,
    category: "Execution Under Pressure",
    question: "We have missed our delivery target for two consecutive quarters. You take over on Monday. What are your first 30 days?",
    framework: "What - So What - Now What (Audit → Bottleneck Remediation → 90-Day Predictability)",
    targetTime: "90 seconds",
    difficulty: "Crucial"
  },
  {
    id: 6,
    category: "Closing",
    question: "Why should we hire you over candidates with 10 more years of VP experience?",
    framework: "The 3-Pillar Multiplier Close (Talent Retention, Velocity, Predictable ROI)",
    targetTime: "75 seconds",
    difficulty: "Crucial"
  }
];
