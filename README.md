# ExecutiveVoice: 28-Day Articulation Training Lab
### *“Resume and certificates get you in the room. Your voice and articulation get you the job.”*

ExecutiveVoice is an enterprise-grade monorepo engineered to coach managers into high-paying Director, Vice President, and C-Suite leadership roles. 

🚀 **Live Production Deployment (Google Cloud Run):**  
👉 **[https://articulation-training-135378541186.us-central1.run.app](https://articulation-training-135378541186.us-central1.run.app)**  
*(Hosted on Google Cloud Platform • Project: `passiveincome01` • Region: `us-central1`)*

> **Core Insight:**  
> The way we speak is how interviewers and executive boards evaluate how we think. 
> Most candidates rely on scripted or generic answers, or recite their resumes chronologically. 
> **ExecutiveVoice trains you to organize your thoughts before you speak**, eliminating manager filler words and communicating commercial leverage in just **9 minutes a day for 28 days**.

---

## 1. System Architecture & Folder Topology

```
C:\Antigravity\Articulation Training Practise 28 days 9 minutes a day
├── .github/
│   ├── workflows/
│   │   ├── ci-cd.yml                   # Lint, test, audit, and container build
│   │   └── snyk-security-scan.yml      # Automated SAST, SCA, and container security scans
│   └── CODEOWNERS
├── docs/                               # Developer and security architecture documentation
│   ├── ARCHITECTURE.md
│   ├── SECURITY.md
│   ├── AUDIO_PIPELINE.md
│   └── COMPLIANCE.md
├── apps/
│   ├── web/                            # Next.js 15+ (App Router, Tailwind CSS, SSR/PWA)
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── app/                    # Routing, layouts, dynamic assessment pages
│   │   │   │   ├── (auth)/             # Login, 2FA, biometric webauthn registration
│   │   │   │   ├── (dashboard)/        # Daily 9-min routine, 28-day roadmaps, analytics
│   │   │   │   └── api/                # Edge runtime audio ingestion & auth endpoints
│   │   │   └── styles/
│   │   ├── package.json
│   │   └── next.config.mjs
│   │
│   ├── mobile/                         # React Native / Expo (iOS & Android)
│   │   ├── assets/
│   │   ├── src/
│   │   │   ├── navigation/
│   │   │   ├── screens/                # Large-touch target daily prompt screens
│   │   │   ├── components/             # Native low-latency audio capture & waveforms
│   │   │   └── hooks/                  # Background upload & local audio caching
│   │   ├── app.json
│   │   └── package.json
│   │
│   └── backend/                        # Node.js / Fastify / Cloud Run Microservices
│       ├── src/
│       │   ├── api/                    # REST / gRPC / WebSocket audio streaming
│       │   ├── services/
│       │   │   ├── stt/                # Speech-to-Text streaming engine
│       │   │   ├── evaluation/         # Executive frameworks (PREP, STAR, Executive Tone)
│       │   │   └── security/           # Token validation, audio encryption at rest
│       │   └── db/                     # Prisma / Cloud SQL migrations & schemas
│       └── Dockerfile
│
├── packages/
│   ├── ui/                             # Shared accessible design system (WCAG AAA)
│   │   ├── src/
│   │   │   ├── components/             # Buttons, AudioPlayer, Waveform, ProgressMeter
│   │   │   └── theme/                  # High-contrast palettes, large typography scales
│   ├── audio-core/                     # Shared WebAudio / Native Opus recording & DSP
│   ├── shared-types/                   # Shared TypeScript models (Dormant vs Active, PREP)
│   └── eslint-config/
│
├── security/                           # Infrastructure security configs
│   ├── cors.config.json
│   └── content-security-policy.json
├── .env.example
├── docker-compose.yml
├── turbo.json
└── README.md
```

---

## 2. The 9-Minute Daily Protocol
Every day is divided into a strict 3-stage neuromuscular conditioning cycle:
1. **Phase 1 (0:00 – 2:00) Cognitive Structuring:** Framework breakdown and 3-bullet mental outlining (no reading from scripts).
2. **Phase 2 (2:00 – 6:00) Vocal Articulation Drill:** Live microphone recording, Web Audio frequency waveform visualizer, continuous speech transcription, and real-time filler-word telemetry.
3. **Phase 3 (6:00 – 9:00) Executive Gravitas Audit:** 4-pillar self-scoring rubric (Headline/BLUF first, Pacing at 120–150 WPM, Chest Resonance, Strategic Altitude vs. Weeds), personal reflection notes, and day completion checkmarks.

---

## 3. The 4-Week Curriculum (28 Days)
- **Week 1 (Days 1–7): Executive Foundation & Cognitive Structuring**
  - Day 1: The "Tell Me About Yourself" 90-Second Executive Anchor
  - Day 2: PREP Framework (Point, Reason, Example, Point)
  - Day 3: Eliminating Manager Filler Words & Verbal Hedging
  - Day 4: The 3-Beat Strategic Pause
  - Day 5: What - So What - Now What (The Boardroom Standard)
  - Day 6: Vocal Resonance & Diaphragmatic Grounding
  - Day 7: Week 1 Executive Milestone Mock Drill
- **Week 2 (Days 8–14): From Manager to Leader — Strategic Framing**
  - Day 8: High Altitude vs. In-The-Weeds (The Director Filter)
  - Day 9: The SCQA Model for C-Suite Briefings
  - Day 10: "Tell Me About a Failure" (Extreme Ownership)
  - Day 11: Defending Against Hostile Executive Pushback
  - Day 12: BLUF (Bottom Line Up Front) Technique
  - Day 13: Balancing Warmth & Unshakeable Authority
  - Day 14: Week 2 Executive Milestone Mock
- **Week 3 (Days 15–21): Vision, Gravitas & High-Stakes Storytelling**
  - Day 15: The 60-Second Strategic Vision Anchor
  - Day 16: Mental Models & Executive Physical Analogies
  - Day 17: Leading Through Ambiguity (The 40/70 Rule)
  - Day 18: Cross-Functional Conflict Resolution Story
  - Day 19: Video Telepresence & Non-Verbal Gravitas
  - Day 20: The "Why Hire You as Director/VP?" Power Close
  - Day 21: Week 3 Executive Milestone Mock
- **Week 4 (Days 22–28): Boardroom Crucible & VP Interview Polish**
  - Day 22: Rapid-Fire Executive Drills (10 questions in 5 minutes)
  - Day 23: Senior Compensation & Negotiation Articulation
  - Day 24: Executive Inversion: 3 Counter-Questions That Flip the Table
  - Day 25: Navigating Hostile & Stress Interviews
  - Day 26: Vocal Endurance & Energy Calibration for 45-Minute Loops
  - Day 27: Full 9-Minute Director/VP Interview Dress Rehearsal
  - Day 28: Graduation Day: Executive Readiness Certification

---

## 4. Local Quickstart

### Prerequisites
- Node.js 20.x or 22.x
- Docker & Docker Compose (optional for full stack with PostgreSQL)

### Running Locally with Turborepo
```bash
# 1. Install workspace dependencies
npm install

# 2. Run Turborepo development pipeline (Next.js web + Fastify backend)
npm run dev

# 3. Open Web App
open http://localhost:3000
```
