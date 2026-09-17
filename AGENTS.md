# AGENTS.md

## Mandatory TDD

Use red-green-refactor TDD for every behavior or flow change. Write and run the
smallest executable contract test first; it must fail for the intended reason
before implementation begins. Then implement the minimum change and make all
affected tests green. Begin every new or modified test suite with a
flow-contract comment. Never weaken a test to accept incomplete behavior.
