# Automated Tests

The following tests cover the core Audit Engine logic.

## 1. `src/lib/auditEngine.test.ts`
- **Covers:** Correctly identifies that a 2-person Claude Team plan is better off on Pro.
- **Covers:** Correctly flags overspend on Enterprise planes with <10 seats.
- **Covers:** Sums total annual savings correctly across multiple tools.
- **Covers:** Gracefully handles missing inputs in tool configs.
- **Covers:** Validates that "Retail vs Credits" logic surfaces Credex appropriately.

## How to run
```bash
npm test
```
(Using Vitest for fast, ESM-native testing).
