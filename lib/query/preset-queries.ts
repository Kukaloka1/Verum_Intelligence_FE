const ALL_JURISDICTIONS_KEY = "__all__";

export const QUERY_PLACEHOLDERS_BY_JURISDICTION: Record<string, string> = {
  [ALL_JURISDICTIONS_KEY]:
    "Compare licensing obligations for a fintech payment firm in DIFC and ADGM.",
  DIFC: "What are the licensing implications for a fintech firm in DIFC?",
  ADGM: "What are the FSRA licensing implications for a fintech firm in ADGM?",
  QFC: "What are the licensing implications for a fintech firm in QFC?",
  KSA: "What are the licensing implications for a fintech firm in KSA?"
};

export const QUERY_SUGGESTIONS_BY_JURISDICTION: Record<string, readonly string[]> = {
  [ALL_JURISDICTIONS_KEY]: [
    "Compare licensing pathways for a digital payments firm in DIFC vs ADGM.",
    "Which recent DFSA and FSRA updates most impact AML controls for fintech operators?",
    "What jurisdiction-level differences should a compliance lead evaluate before launching across DIFC and ADGM?"
  ],
  DIFC: [
    "What DFSA licensing implications apply to a fintech payments firm operating in DIFC?",
    "Summarize the most relevant recent DFSA consultation items for DIFC market entrants.",
    "Which AML and governance controls should a DIFC-regulated firm prioritize first?"
  ],
  ADGM: [
    "Summarize recent ADGM FSRA public consultations relevant to financial services firms.",
    "What licensing and prudential expectations should a payments business review in ADGM?",
    "Which recent FSRA guidance is most relevant to AML and governance obligations in ADGM?"
  ],
  QFC: [
    "What licensing implications would apply to a fintech firm in QFC?",
    "Which QFC regulatory notices should a new compliance team review first?",
    "What are the initial governance requirements for a regulated financial firm in QFC?"
  ],
  KSA: [
    "What are the licensing implications for a fintech operating in KSA?",
    "Which SAMA or CMA regulatory releases are most relevant for digital payment providers?",
    "What compliance controls are typically expected for fintech entry into KSA?"
  ]
};

export function resolveQueryPlaceholder(jurisdiction: string | null): string {
  if (!jurisdiction) {
    return QUERY_PLACEHOLDERS_BY_JURISDICTION[ALL_JURISDICTIONS_KEY];
  }

  return (
    QUERY_PLACEHOLDERS_BY_JURISDICTION[jurisdiction] ??
    QUERY_PLACEHOLDERS_BY_JURISDICTION[ALL_JURISDICTIONS_KEY]
  );
}

export function resolveQuerySuggestions(jurisdiction: string | null): readonly string[] {
  if (!jurisdiction) {
    return QUERY_SUGGESTIONS_BY_JURISDICTION[ALL_JURISDICTIONS_KEY];
  }

  return (
    QUERY_SUGGESTIONS_BY_JURISDICTION[jurisdiction] ??
    QUERY_SUGGESTIONS_BY_JURISDICTION[ALL_JURISDICTIONS_KEY]
  );
}

export const PRESET_QUERY_VALUES = new Set(Object.values(QUERY_PLACEHOLDERS_BY_JURISDICTION));
