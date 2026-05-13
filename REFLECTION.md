# Reflexion - ZenAudit AI

## 1. Hardest Bug
The hardest bug was managing the reactive state of the "Audit Engine" while allowing users to dynamically add/remove tools. I initially used a single massive object for the "Stack," but found that nested updates in React state were causing unnecessary re-renders and lost focus in input fields.
**Fix:** I refactored the state to use a flat array of 'AuditItem' objects and implemented a custom hook `useAuditState` that debounces the "Saving to LocalStorage" logic, ensuring the UI remains snappy even with 10+ tools.

## 2. Decision Reversal
Mid-week, I planned to build a "Benchmark" feature that compared users to "similar companies." However, I realized that without a massive dataset of real user audits, the benchmarks would be fake/simulated, which violates the Credex principle of "Entrepreneurial Honesty."
**Reversal:** I scrapped the Benchmarks for Week 1 and moved that effort into "Personalized AI Summaries," which provides more immediate value using the user's *own* data rather than questionable peer data.

## 3. Week 2 Plans
- **Multi-currency support:** Startups in EMEA/APAC often pay in local currency but are billed in USD; the FX conversion is a hidden cost.
- **Direct API Ingest:** Allow users to upload a CSV of their billing or paste an API key (read-only) for usage-based auditing.
- **Team-wide Invites:** Allow the CTO to invite the Finance lead to "view-only" reports.

## 4. AI Usage
- **Tools:** GitHub Copilot (for boilerplate) and Gemini API (for summaries).
- **Trust:** I didn't trust the AI with the math. I hardcoded the pricing logic because finance people need deterministic results.
- **Failure:** I asked Gemini to "estimate the cost of Claude for a 20-person team" and it hallucinated a $500/mo flat rate, which doesn't exist. I caught it by cross-referencing my `PRICING_DATA.md`.

## 5. Self-Rating
- **Discipline (10/10):** Maintained a strict 7-day cadence with deep work blocks.
- **Code Quality (9/10):** Used robust TypeScript types and clean functional components, though I'd modularize the "AuditEngine" further in production.
- **Design Sense (8/10):** Clean, minimal "Vercel-esque" aesthetic, though a bit "standard tech."
- **Problemsolving (9/10):** Effectively balanced "defensible logic" with "AI fluff."
- **Entrepreneurial Thinking (10/10):** Treated the tool as a Lead-Gen asset for Credex, not just a homework assignment.
