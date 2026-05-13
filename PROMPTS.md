# AI personalized summary prompt

## Summary Prompt
```text
Act as a savvy Startup Finance Director. Given the following AI audit data for a company, write a ~100-word personalized recommendation. 

Audit Data:
- Tools Used: {{tools}}
- Total Current Monthly Spend: ${{total_spend}}
- Total Recommended Action: {{actions}}
- Potential Annual Savings: ${{annual_savings}}
- Primary Use Case: {{use_case}}
- Team Size: {{team_size}}

The tone should be professional, insightful, and empathetic to the "cloud sprawl" problem. Highlight the one biggest optimization opportunity and suggest the next move. Don't be generic. If they are already optimized, congratulate them.
```

## Why this prompt?
I chose a "persona-based" prompt because it ensures the AI adopts a specific value-oriented vocabulary (e.g., "fiscal hygiene," "resource reallocation"). The use of structured data context prevents the AI from making up savings that aren't in the raw audit report.

## Iterations
- **Draft 1:** "Summarize this audit." -> Result: Too short and generic.
- **Draft 2:** "Write a 200 word summary." -> Result: Too wordy; users won't read it.
- **Draft 3 (Final):** Restricted to ~100 words with a specific "Finance Director" persona. This hits the sweet spot of authority and brevity.
