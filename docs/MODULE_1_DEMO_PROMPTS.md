# Module 1 — Demo Prompt Set (DIFC/ADGM)

**Updated:** 2026-04-10  
**Scope:** Controlled live demo for current Module 1 corpus only.

## 1. Demo-safe prompts

### DIFC / DFSA (safe)

1. `What does DFSA Consultation Paper No.169 cover?`  
Reason: Directly aligned with current DFSA consultation corpus; consistently grounded.

2. `Summarize recent DFSA consultation papers relevant to market conduct.`  
Reason: Matches DFSA rulebook consultation surfaces currently ingested.

3. `What recent DFSA alerts should compliance teams in DIFC track first?`  
Reason: Uses active DFSA alerts/news surfaces with traceable citations.

4. `What licensing implications for fintech firms appear in recent DFSA materials?`  
Reason: Strong overlap with current DIFC/DFSA corpus and retrieval patterns.

### ADGM / FSRA (safe)

5. `Summarize recent ADGM FSRA public consultations.`  
Reason: High-signal match to ingested ADGM consultation source.

6. `What recent FSRA guidance is relevant in ADGM?`  
Reason: Mapped to official ADGM guidance/policy statements source.

7. `What changes are proposed in ADGM FSRA Consultation Paper No 10?`  
Reason: Direct named-document query with reliable grounding in current corpus.

8. `What are the key themes in ADGM FSRA Consultation Paper No 9?`  
Reason: Document-specific prompt with stable retrieval support.

## 2. Prompts to avoid for now

1. `What are the licensing implications for a fintech firm in KSA?`  
Reason: Outside current live corpus scope; likely `no_results`.

2. `Compare reporting obligations in ADGM vs QFC.`  
Reason: QFC corpus is not enabled; comparison quality is currently constrained.

3. `What are SEC 10-K filing deadlines for NASDAQ issuers?`  
Reason: Outside GCC regulatory corpus; intended no-match case.

4. `Give definitive legal advice for my firm based on these facts...`  
Reason: Module is source-backed intelligence, not bespoke legal advice automation.

5. `Explain all GCC obligations across every regulator in one answer.`  
Reason: Too broad for current curated corpus; increases weak-support risk in live demo.

## 3. Demo operator note

- Prefer jurisdiction-scoped prompts (`DIFC` or `ADGM`) and named-document queries for strongest live outcomes.
- Avoid broad multi-jurisdiction prompts unless all compared jurisdictions are currently covered in corpus.
