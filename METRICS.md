# Metrics Strategy

## North Star Metric
**Total Potential Savings Surfaced ($)**
Why: This is the primary value proposition. If we surface millions in savings, our "lead gen" gravity for Credex becomes unstoppable.

## 3 Input Metrics
1. **Audit Completion Rate (%):** The % of visitors who finish inputting their stack.
2. **Share Rate (%):** The % of audit results that result in a unique public URL being generated.
3. **Lead Quality (Avg Savings/Lead):** We want leads that have >$500/mo savings potential for Credex sales reachout.

## Implementation instrumenting
I would use **PostHog** to instrument:
- The "Add Tool" button clicks (which tools are most popular?).
- The "Email Gate" drop-off point.
- The "Book Consultation" click-through rate on the results page.

## Pivot Trigger
If the **Audit Completion Rate** is below 5%, it means the form is too complex. We would pivot to a "One-Click Billing Upload" or a much simpler "Estimate based on employee count" model.
