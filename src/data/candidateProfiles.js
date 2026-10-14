// ==============================================================================
// ExecutiveVoice Candidate DNA & Target Role Knowledge Base
// Source: C:\Users\rajpa\OneDrive\Resume_lab\knowledge_base & my_applications
// ==============================================================================

export const RAJIV_CANDIDATE_DNA = {
  fullName: "Rajiv (Raj) Parikh",
  preferredName: "Raj Parikh",
  currentRole: "Senior Cyber Security & Service Manager",
  currentCompany: "Commonwealth Bank of Australia (CBA)",
  location: "Sydney, NSW, Australia",
  totalExperience: "25+ Years",
  credentials: [
    "CISSP – Certified Information Systems Security Professional (#481845)",
    "CISM – Certified Information Security Manager (#1948833)",
    "A|CISO – Associate Chief Information Security Officer (EC-Council)",
    "CCNP / CCNA – Cisco Certified Network Professional / Associate",
    "CCSA – Checkpoint Certified Security Administrator",
    "CEH & CEI – Certified Ethical Hacker & Certified Instructor",
    "MCT – Microsoft Certified Trainer (5-Year Milestone)",
    "ITIL Foundation (v3 & v4) – IT Service Management",
    "PRINCE2 Registered Practitioner – Project Management"
  ],
  coreMetrics: [
    "Directed and resolved 20+ high-stakes third-party cyber incidents across a critical supplier ecosystem of 200+ enterprise vendors at CBA.",
    "Managed enterprise IT operations and hybrid cloud delivery supporting 53,000 corporate users across 300+ sites, sustaining 99.95% availability at Downer EDI.",
    "Architected and deployed enterprise Zero-Trust access and secure gateway controls across 12 critical banking applications, reducing unauthorized access attempts by 40%.",
    "Governed branch and datacenter firewalls (Fortinet, Cisco ASA) and least-privilege access across 4 enterprise domains, mitigating data exfiltration risks by 35%.",
    "Served as primary risk challenger on TCAB & DCAB, assessing 120+ monthly complex infrastructure changes for operational risk and service continuity.",
    "Governed 8+ external MSPs, telecom carriers, and hardware vendors against strict contractual SLAs, unlocking $45k in annual contract optimizations."
  ],
  regulatoryAssurance: [
    "APRA CPS 234 (Information Security)",
    "APRA CPS 230 (Operational Resilience)",
    "ACSC Essential 8 (Maturity Level 3)",
    "ISO/IEC 27001 ISMS Assurance",
    "Enterprise Vulnerability Management (Qualys)",
    "End-of-Support / End-of-Life (EOS/EOL) Infrastructure Risk Mitigation"
  ],
  signatureBattleStories: [
    {
      title: "Third-Party Cyber Supply Chain Crisis Leadership",
      company: "Commonwealth Bank of Australia",
      summary: "Directed containment of high-severity third-party cyber incidents across a 200+ vendor ecosystem. Bridged strategic liaison between external vendor executives, Group Cyber, Legal, Privacy, and Board-level stakeholders while ensuring APRA CPS 234 regulatory notifications."
    },
    {
      title: "Enterprise Multi-Site Hybrid Infrastructure at Scale",
      company: "Downer EDI",
      summary: "Sustained 99.95% availability for 53,000 corporate users across 300+ sites. Hardened perimeter network security, governed 8+ MSPs, and conducted institutional multi-site disaster recovery (DRP/BCP) failover simulations."
    },
    {
      title: "Edge Security & Enterprise Cloud Proxy Resilience",
      company: "Commonwealth Bank of Australia",
      summary: "Uplifted operational resilience across high-traffic cloud proxies (SWG, Zscaler, Akamai), eliminating control gaps, automating telemetry, and delivering real-time executive risk visibility."
    }
  ],
  elevatorPitch: "I am a strategic Technology and Cyber Security Executive with over 25 years of experience leading infrastructure operations and cyber risk governance within Tier-1 financial institutions like Commonwealth Bank. My leadership centers on turning complex regulatory mandates like APRA CPS 230 and 234 into operational resilience—ensuring mission-critical systems sustain 99.95%+ availability while defending enterprise supply chains against sophisticated insider and external threats."
};

export const PRELOADED_TARGET_ROLES = [
  {
    id: "bofa_vp_security",
    company: "Bank of America",
    title: "Vice President, Information Security Threat & Insider Risk Management",
    altitude: "Vice President (VP) / Executive Risk Officer",
    badge: "VP Role",
    tagline: "Board-Level Threat Governance & Enterprise Insider Risk",
    evaluationPersona: "Wall Street / Global Tier-1 Banking Executive Hiring Panel evaluating commercial altitude, non-defensive risk ownership, and APRA/regulatory assurance.",
    rubricFocus: [
      "Executive Altitude: Focuses on business risk and systemic resilience, never getting lost in tactical engineering jargon.",
      "Regulatory & Board Polish: Direct alignment with APRA CPS 234/230, ACSC Essential 8, and executive threat reporting.",
      "Third-Party Ecosystem Defense: Proven capability to command 200+ vendor crises with calm authority.",
      "Decisive Ownership: Zero defensive hedging; speaks with measured executive cadence (135–155 WPM)."
    ],
    samplePrompts: [
      "Walk me through your executive philosophy on managing insider risk and third-party cyber threats across a global financial institution.",
      "Describe a time you detected a critical vulnerability or supplier incident that put core banking operations at risk. How did you brief executive leadership?",
      "How do you balance aggressive cyber risk controls (APRA CPS 234) with commercial agility so the business can move at velocity?",
      "Tell me about a high-stakes disagreement with an executive or internal auditor regarding risk tolerance. How did you navigate it?"
    ],
    tailoredOpeningThesis: "I specialize in protecting mission-critical financial infrastructure by transforming complex cyber threat landscapes into proactive, board-ready operational governance. Having directed third-party cyber incident response across 200+ enterprise suppliers at Commonwealth Bank under strict APRA CPS 234 and 230 mandates, my focus at Bank of America is delivering institutional resilience that protects client trust without throttling commercial execution."
  },
  {
    id: "x15_cba_senior_manager",
    company: "x15ventures (Commonwealth Bank)",
    title: "Senior Manager, IT Operations & AI Strategy",
    altitude: "Senior Technology Leader / Venture Operations Lead",
    badge: "x15 CBA",
    tagline: "Venture Resilience, SRE & Scalable Enterprise AI Delivery",
    evaluationPersona: "Venture Managing Director & Engineering Panel evaluating operational resilience, SRE maturity, and pragmatic enterprise AI delivery.",
    rubricFocus: [
      "Venture Agility vs Enterprise Governance: Balances CBA Group standards with startup venture autonomy.",
      "Incident Leadership & SRE: Transforms major incidents into sustainable architectural recoverability and observability.",
      "Enterprise AI Enablement: Pragmatic execution translating LLM/AI strategy into reliable shared platform services.",
      "Influencing Without Direct Authority: Navigating multi-stakeholder dependencies across Core Tech and Ventures."
    ],
    samplePrompts: [
      "As Senior Manager for IT Operations and AI, how will you translate enterprise AI capabilities into safe, scalable production outcomes for x15 ventures?",
      "Describe your hands-on approach to leading major incident response and post-incident reviews (PIR) to build long-term site reliability.",
      "How do you ensure shared technology platforms remain reliable and cost-effective while empowering ventures with the autonomy to build fast?",
      "Walk me through your methodology for establishing Business Continuity Management (BCM) and Disaster Recovery in a high-velocity venture environment."
    ],
    tailoredOpeningThesis: "I bridge the gap between Tier-1 enterprise stability and high-growth venture velocity. With deep operational roots across Commonwealth Bank Group Security and large-scale cloud delivery, I help ventures scale autonomously while anchoring their tech operations in world-class SRE observability, bulletproof incident recovery, and pragmatic, secure AI adoption."
  },
  {
    id: "head_of_technology",
    company: "Enterprise & Critical Infrastructure",
    title: "Head of Technology & Cloud Infrastructure Delivery",
    altitude: "Head of Technology / Infrastructure Director",
    badge: "Head of Tech",
    tagline: "Multi-Cloud Scale (53k Users), P&L Control & Modernization",
    evaluationPersona: "C-Suite & Managing Director evaluating multi-million dollar P&L stewardship, large-scale vendor governance, and technological turnaround.",
    rubricFocus: [
      "Scale & Uptime Ownership: Sustaining 99.95%+ availability across public/private cloud and national footprints.",
      "Strategic Risk Challenging: Leading TCAB/DCAB to protect enterprise stability from reckless changes.",
      "Contract & Vendor Optimization: Driving MSP and telecom partners to strict SLAs while unlocking contractual savings.",
      "Talent Enablement: Mentoring cross-functional engineering teams and standardizing delivery runbooks."
    ],
    samplePrompts: [
      "How do you manage hybrid multi-cloud infrastructure supporting 50,000+ users across hundreds of sites while ensuring 99.95% availability?",
      "Tell me about a time you challenged an aggressive deployment or project milestone at the Technical Change Advisory Board (TCAB) to protect the business.",
      "What is your playbook for conducting institutional multi-site disaster recovery drills and ensuring BCP readiness?",
      "How do you lead, inspire, and upskill an engineering organization undergoing digital transformation?"
    ],
    tailoredOpeningThesis: "I lead large-scale enterprise technology transformations where service continuity, commercial cost efficiency, and risk discipline are non-negotiable. At Downer EDI and BAI Communications, I governed multi-cloud platforms supporting over 53,000 users across 300+ sites, sustaining 99.95% uptime and optimizing vendor contracts while transforming reactive operations into modern, automated delivery engines."
  }
];

const STORAGE_KEYS = {
  ACTIVE_PROFILE_ID: 'exec_voice_active_profile_id_v1',
  CUSTOM_ROLES: 'exec_voice_custom_roles_v1'
};

export function getActiveProfileId() {
  try {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE_ID) || 'bofa_vp_security';
  } catch {
    return 'bofa_vp_security';
  }
}

export function setActiveProfileId(profileId) {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE_ID, profileId);
  } catch {}
}

export function getCustomRoles() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_ROLES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomRole(newRole) {
  try {
    const current = getCustomRoles();
    const updated = [newRole, ...current.filter((r) => r.id !== newRole.id)];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_ROLES, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function getAllProfiles() {
  const custom = getCustomRoles();
  return [...PRELOADED_TARGET_ROLES, ...custom];
}

export function getActiveProfile() {
  const all = getAllProfiles();
  const activeId = getActiveProfileId();
  return all.find((p) => p.id === activeId) || all[0];
}
