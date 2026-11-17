export const assistantQuestionGroups = [
  {
    "id": "about",
    "label": "About",
    "questions": [
      "Who is QingPeng?",
      "When will QingPeng graduate?",
      "What is his GPA?",
      "Where is he based?",
      "Where can I download the resume?",
      "What is his email address?",
      "Where is his source code?"
    ]
  },
  {
    "id": "experience",
    "label": "Experience",
    "questions": [
      "Show me experience relevant to this role.",
      "What did he do at USAA?",
      "What did he do at ISR?",
      "Tell me about SI 539 teaching",
      "Tell me about Hillel",
      "How did QingPeng take ownership of an unfamiliar search project?",
      "How did QingPeng make AI-assisted development easier to hand off?",
      "What led QingPeng to build the HRS publication pipeline?"
    ]
  },
  {
    "id": "projects",
    "label": "Projects",
    "questions": [
      "What are QingPeng’s strongest software engineering projects?",
      "What backend systems has QingPeng built?",
      "What technologies does QingPeng use most?",
      "Tell me about DevDoctor",
      "How does Immich search work?",
      "What did he build for Zelda?",
      "What are the P2 weapon upgrades?",
      "How does the HRS publication pipeline work?",
      "HRS uses which database?",
      "Which Unity games did he build?"
    ]
  },
  {
    "id": "growth",
    "label": "Problem solving & growth",
    "questions": [
      "Which projects demonstrate production reliability?",
      "How is DevDoctor tested?",
      "Is HRS AI screening already deployed?",
      "How has feedback changed the way QingPeng uses AI?",
      "How did QingPeng improve the HRS email workflow?",
      "How did QingPeng investigate missing publication records?"
    ]
  }
] as const

export const suggestedAssistantQuestions: readonly string[] = assistantQuestionGroups.flatMap(group => [...group.questions])
