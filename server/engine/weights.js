export const model = {
  intentMatch: 0.30,
  costFit: 0.25,
  benchmarkFit: 0.20,
  speedFit: 0.15,
  simplicityFit: 0.10
};

export const tool = {
  categoryMatch: 0.35,
  tagRelevance: 0.30,
  purposeAlign: 0.20,
  diversityBonus: 0.15
};

export const stack = {
  roleMatch: 0.40,
  coverageScore: 0.30,
  budgetFit: 0.30
};

export const workflow = {
  goalSimilarity: 0.50,
  stepCount: 0.30,
  toolOverlap: 0.20
};

export const prompt = {
  categoryMatch: 0.60,
  toolAlign: 0.40
};