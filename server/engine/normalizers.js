// server/engine/normalizers.js
// All functions exported as named exports (ES Module)

export function normalizeCost(cost) {
  if (typeof cost === 'string') {
    // Remove currency symbols and commas
    cost = cost.replace(/[^0-9.-]+/g, '');
  }
  const num = parseFloat(cost);
  return isNaN(num) ? 0 : Math.round(num);
}

export function normalizeBudget(budget) {
  if (typeof budget === 'string') {
    budget = budget.toLowerCase().trim();
    if (budget.includes('low') || budget.includes('cheap')) return 'low';
    if (budget.includes('medium') || budget.includes('moderate')) return 'medium';
    if (budget.includes('high') || budget.includes('premium')) return 'high';
  }
  return budget || 'medium';
}

export function normalizeDate(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date.toISOString().split('T')[0];
}

export function normalizePriority(priority) {
  if (typeof priority === 'string') {
    priority = priority.toLowerCase().trim();
    if (['high', 'urgent', 'critical'].includes(priority)) return 'high';
    if (['low', 'minor'].includes(priority)) return 'low';
  }
  return 'medium';
}

export function normalizeBoolean(value) {
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    return ['true', 'yes', '1', 'on'].includes(lower);
  }
  return Boolean(value);
}

// Add any other existing normalizer functions here as named exports
// Example:
// export function normalizeCategory(cat) { ... }