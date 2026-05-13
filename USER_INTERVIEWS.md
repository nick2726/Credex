# User Interviews - ZenAudit AI

## Interview 1: AJ, Founder of Stealth AI SaaS (Pre-seed)
**Quotes:**
- "I have no idea what my team is using. I just see 'Cursor' appearing on 8 different credit cards."
- "Visualizing the 'total' is scary. I thought it was just $20 here and there."
- "If you can show me how to bundle these for a discount, I'm in."

**Surprising Insight:** The biggest pain wasn't just the price, but the "expense reporting fatigue" of individual seats.

**Design Change:** Added the "Team vs Individual" plan comparison logic to the Audit Engine.

## Interview 2: Sarah, Engineering Manager (Series B Fintech)
**Quotes:**
- "We have GitHub Copilot, but half my devs use Cursor on the side and pay out of pocket. I want to bring them into one plan."
- "An audit that I can screenshot and send to my CFO is exactly what I need for my Q3 budget."
- "Don't just tell me it's expensive, tell me what to tell my devs to switch to."

**Surprising Insight:** She needs "Social Proof"/Reasoning that a CFO will accept.

**Design Change:** Enhanced the "Logic/Reasoning" output in the results page to be more "finance-toned."

## Interview 3: Kevin, Indie Hacker / Solopreneur
**Quotes:**
- "I'm a one-man shop. $20 for ChatGPT and $20 for Claude feels like overlap."
- "I'd use a tool that tells me if I can just use API credits for cheap via a UI."
- "Shareable link is cool, but I'd just screenshot it."

**Surprising Insight:** Even for individuals, the "Overlap" between big LLMs (Claude vs GPT) is a major frustration.

**Design Change:** Added logic to flag "Redundant General LLM seats" if both Claude and ChatGPT Pro are used.
