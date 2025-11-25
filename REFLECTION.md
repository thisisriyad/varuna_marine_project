# Reflection on AI Agent Usage

## What I learned using AI agents
Using an AI agent (Antigravity) for this project significantly accelerated the boilerplate and architectural setup. The agent was able to understand the high-level requirement of "Hexagonal Architecture" and immediately scaffold the correct folder structure (`core`, `adapters`, `ports`) without needing manual correction. This allowed me to focus on the business logic (Compliance Balance formulas) rather than directory management.

## Efficiency gains vs manual coding
-   **Setup Time**: Reduced from ~1 hour to ~10 minutes.
-   **Boilerplate**: The agent generated all the Express/Cors setup, Tailwind configuration, and basic React components instantly.
-   **Context Switching**: I could define the data model in one prompt and have the agent implement it across the database, API, and frontend types simultaneously, ensuring consistency.

## Improvements I'd make next time
-   **Iterative Testing**: I would ask the agent to write tests *before* implementation (TDD) to ensure the generated code is robust from the start.
-   **More Granular Prompts**: For complex logic like "Pooling", breaking it down into smaller steps would yield more sophisticated algorithms than the greedy approach used here.
