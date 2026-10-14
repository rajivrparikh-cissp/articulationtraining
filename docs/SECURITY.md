# Antigravity Security & Privacy Specification

## 1. Zero-Trust Audio Pipeline
- **Local In-Flight Encryption:** Audio clips recorded on Web (WebAudio/Opus) or Mobile (AVFoundation/AudioRecord) are encrypted in memory before streaming.
- **Data in Transit:** Enforce TLS 1.3 with strict HSTS (`max-age=63072000; includeSubDomains; preload`).
- **Data at Rest:** All transient audio chunks are stored in private Cloud Storage buckets with customer-managed encryption keys (AES-256).

## 2. Retention & Privacy Guardrails
- **Ephemeral Audio Processing:** Voice recordings are transcribed, scored against the executive metrics, and permanently purged from object storage after 48 hours unless explicitly archived by the user.
- **PII Stripping:** Voice transcripts pass through a regex/NER anonymization layer prior to executive scoring to strip names, specific company data, and financial indicators.

## 3. Authentication & API Hardening
- **Auth Standards:** FIDO2 / WebAuthn passkeys and biometric unlock (FaceID / Fingerprint) prioritized over SMS-based OTP.
- **Rate Limiting:** Sliding-window rate limiter (Fastify Redis) set to 30 requests/minute per authenticated user on audio endpoints to block denial-of-wallet vectors.
- **Content Security Policy (CSP):**
  ```http
  default-src 'self'; script-src 'self' 'nonce-...'; media-src 'self' blob:; connect-src 'self' https://api.antigravity.tech wss://api.antigravity.tech;
  ```

---

## 4. Threat Model & Zero-Trust Governance

### Attack Surface Minimization
- **Non-Root Execution:** All containerized workloads run strictly under non-root users (`USER node`).
- **Zero Third-Party Trackers:** No marketing trackers, external telemetry SDKs, or third-party behavioral scripts.
- **Ephemeral Processing Option:** Enterprise executive users may activate "Zero-Storage Mode", where audio buffers are processed entirely in memory and immediately flushed post-scoring.
- **Automated Security Scanning:** Continuous SAST, SCA, and container vulnerability scanning enforced via GitHub Actions and Snyk.
