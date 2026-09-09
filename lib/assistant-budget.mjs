// Actual monthly spend is enforced by Vercel AI Gateway's project budget,
// shared by every deployment and function instance using this project's OIDC.
// This variable is a release acknowledgement, NOT an in-memory dollar counter
// or an API that sets a Vercel budget. Set it only after verifying the $5/month
// project budget in Vercel. A production build fails before replacing the live
// deployment when the acknowledgement is missing.
export function productionBudgetReady(env = process.env) {
  return env.VERCEL_ENV !== "production" || env.TPK_AI_GATEWAY_BUDGET_CONFIRMED === "5_USD_MONTHLY";
}

export function assertProductionBudget(env = process.env) {
  if (env.TPK_AI_ENABLED !== "1") return;
  if (!productionBudgetReady(env)) throw new Error("Ask TPK Park release blocked: verify the Vercel AI Gateway project budget is USD 5/month, then set TPK_AI_GATEWAY_BUDGET_CONFIRMED=5_USD_MONTHLY. This flag does not create a budget.");
}
