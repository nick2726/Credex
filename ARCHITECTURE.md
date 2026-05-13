# ZenAudit AI - Engineering Decisions

## 1. Choice of Stack: React + Vite + Firebase
- **Why:** React is standard for interactive forms and dynamic dashboards. Vite provides the fastest dev experience. Firebase (Firestore) is perfect for a serverless, real-time lead capture system without managing complex infra.
- **Trade-off:** Firebase is proprietary, but for an MVP lead-gen tool, the speed to market outweighs the vendor lock-in.

## 2. Hardcoded Audit Logic vs. AI
- **Decision:** Use hardcoded business logic for the math and recommendations, and use Gemini only for the "Personalized Summary".
- **Why:** Financial audits require precision and defensibility. LLMs are non-deterministic and can hallucinate pricing. A finance person needs to trust the "why" behind the savings.

## 3. UI/UX: Single Page Wizard vs. Scroll-Down
- **Decision:** A vertical scroll-down approach with anchored transitions.
- **Why:** This feels more like a "tool" and allows the user to see the context of their inputs as they scroll to results. Staggered animations (using Motion) guide eyes effectively.

## 4. State Persistence: LocalStorage
- **Decision:** Persistent form state in LocalStorage.
- **Why:** Users often get interrupted. Losing 10 tool inputs on a refresh is a high-churn event. No-login required was a constraint, so local sync is the winner.

## 5. Shareable URLs: Hash-based / ID
- **Decision:** Audit results are saved to Firestore and identified by a short-ID.
- **Why:** Allows stripping PII (captured in a separate sub-collection or fields) from the public view while keeping the "Viral Loop" alive.

## Scalability (10k audits/day)
If this had to handle 10k audits/day:
1. **Edge Caching:** Audit results (the static parts) should be cached at the edge (CDN) since they are immutable once generated.
2. **Rate Limiting:** Move Lead Capture to a dedicated microservice with Redis-based rate limiting to prevent bot spam.
3. **Queueing:** Email sending (currently mocked/direct) should move to a worker queue (e.g., BullMQ) to handle bursts.
4. **Read/Write Splitting:** Use a read-optimized replica for the "Share" views to reduce load on the primary Firestore instance.
