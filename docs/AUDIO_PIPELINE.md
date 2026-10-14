# Low-Latency Audio Streaming & Scoring Architecture

```text
[User Mic]
│ (Opus Encoded @ 16kHz Mono)
▼
[Client Buffer (Edge Streaming)]
│ WebSocket / gRPC over TLS 1.3
▼
[Ingestion Service (Fastify / Cloud Run)]
│
├──▶ [Streaming STT] ──▶ Real-time Transcript & Timestamps
└──▶ [DSP Engine]    ──▶ Decibel Envelope, Pitch Variation, Pause Durations
│
▼
[Executive Scoring Engine]
- PREP Structure Validation
- Filler Frequency Detection
- Executive Cadence Analysis (WPM Target: 140)
│
▼
[Immediate UX Scorecard] (Latency < 800ms)
```

---

## 1. Technical Pipeline Specifications

### Audio Encoding & Capture
- **Input Format:** 16kHz Mono, 16-bit PCM.
- **Client Encoding:** Compressed into 20ms Opus frames (24 kbps VBR) using WebAudio ScriptProcessor / AudioWorklet on Web, and native CoreAudio/AudioRecord on iOS and Android.
- **Transport Layer:** WebSocket (`wss://`) or gRPC bi-directional stream over TLS 1.3 with strict HSTS.

### Concurrent Dual-Engine Ingestion
As raw Opus frames hit the Fastify ingestion service on Google Cloud Run, they are split concurrently:
1. **Streaming STT Worker:** 
   - Generates partial word tokens, confidence intervals, and millisecond-level word timestamp offsets.
2. **DSP Signal Processing Engine:**
   - **Decibel Envelope:** RMS power calculation to detect voice onset and silence boundaries.
   - **Pitch Variation ($F_0$ Tracking):** Autocorrelation and harmonic analysis to detect monotonic flatness vs. dynamic executive resonance, while flagging nervous terminal uptalk ($dF_0/dt > \theta$).
   - **Pause Duration Tracker:** Identifies deliberate strategic pauses ($\ge 1.5\text{s}$ before pivotal conclusions) versus anxious hesitations punctuated by verbal crutches.

---

## 2. Executive Scoring Engine

The scoring engine aggregates linguistic tokens and acoustic DSP metrics:
- **PREP Structure Validation:** Verifies logical progression from Point $\rightarrow$ Reason $\rightarrow$ Quantified Example $\rightarrow$ Crisp Closing Takeaway. Penalizes trailing off and conversational wandering.
- **Filler Frequency Detection:** Measures fillers per 100 words (`um`, `uh`, `er`, `like`, `sort of`, `kind of`, `basically`, `actually`, `throat-clearing`).
- **Executive Cadence Analysis:** Target rate calibrated to **140 WPM** (safe executive band: 135–155 WPM). Automatically flags rushing ($> 155\text{ WPM}$) and halting fatigue ($< 135\text{ WPM}$).

---

## 3. Latency SLA (< 800ms End-to-End)

| Stage | Budget (ms) | Optimization Strategy |
| :--- | :--- | :--- |
| **Client Opus Framing & DSP** | $20 - 40\text{ ms}$ | In-memory 20ms frames, zero disk I/O |
| **Edge Transport (TLS 1.3 WSS)** | $40 - 100\text{ ms}$ | HTTP/2 multiplexing, geographic Cloud Run points of presence |
| **Streaming STT & Timestamps** | $250 - 400\text{ ms}$ | Bi-directional streaming gRPC |
| **Executive Framework Scoring** | $50 - 120\text{ ms}$ | In-memory token parsing and pattern matching |
| **Scorecard Serialization to UI** | $30 - 60\text{ ms}$ | Binary WebSocket push to client HUD |
| **Total Round-Trip Latency** | **$< 800\text{ ms}$** | Real-time immediate visual feedback to candidate |
