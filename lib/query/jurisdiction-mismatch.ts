type SupportedScopedJurisdiction = "DIFC" | "ADGM";

export interface JurisdictionMismatchResult {
  selectedJurisdiction: SupportedScopedJurisdiction;
  matchedTerms: string[];
}

const BLOCKED_TERMS_BY_JURISDICTION: Record<SupportedScopedJurisdiction, string[]> = {
  DIFC: ["ADGM", "FSRA", "KSA", "QFC"],
  ADGM: ["DIFC", "DFSA", "KSA", "QFC"]
};

function normalizeJurisdiction(value: string | null): SupportedScopedJurisdiction | null {
  if (value !== "DIFC" && value !== "ADGM") {
    return null;
  }

  return value;
}

function findMatchedTerms(query: string, candidateTerms: string[]): string[] {
  const matches: string[] = [];

  for (const term of candidateTerms) {
    const pattern = new RegExp(`\\b${term}\\b`, "i");
    if (pattern.test(query)) {
      matches.push(term);
    }
  }

  return matches;
}

export function detectJurisdictionMismatch(input: {
  query: string;
  jurisdiction: string | null;
}): JurisdictionMismatchResult | null {
  const selectedJurisdiction = normalizeJurisdiction(input.jurisdiction);
  if (!selectedJurisdiction) {
    return null;
  }

  const matchedTerms = findMatchedTerms(
    input.query,
    BLOCKED_TERMS_BY_JURISDICTION[selectedJurisdiction]
  );

  if (matchedTerms.length === 0) {
    return null;
  }

  return {
    selectedJurisdiction,
    matchedTerms
  };
}
