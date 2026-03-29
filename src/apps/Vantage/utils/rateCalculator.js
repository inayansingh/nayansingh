// NEGOTIATION FLOOR CALCULATOR
// Formula: (Base Rate × Engagement Factor) + Niche Premium + Usage Rights Surcharge = Total

const NICHE_PREMIUMS = {
  'Technology': 0.30,
  'Finance': 0.35,
  'Health & Wellness': 0.25,
  'Fashion & Beauty': 0.20,
  'Gaming': 0.15,
  'Food & Lifestyle': 0.10,
  'Travel': 0.20,
  'Education': 0.20,
  'Fitness': 0.20,
  'Entertainment': 0.10,
  'Business': 0.30,
  'Other': 0.10,
};

const PLATFORM_BASE_RATES = {
  'Instagram': { post: 100, reel: 150, story: 50 },
  'YouTube': { video: 500, short: 100 },
  'TikTok': { video: 80 },
  'Twitter/X': { post: 50 },
  'LinkedIn': { post: 120 },
};

export function calculateNegotiationFloor({
  platform,
  followers,
  engagementRate,
  niche,
  contentType,
  usageRightsMonths,
}) {
  // Step 1: Base rate from CPM industry standard ($10 CPM baseline)
  const estimatedReach = followers * (engagementRate / 100);
  const baseRate = Math.max(
    (estimatedReach / 1000) * 10,
    PLATFORM_BASE_RATES[platform]?.[contentType] || 100
  );

  // Step 2: Engagement Factor (>6% = 1.5x, 3-6% = 1.2x, <3% = 1.0x)
  let engagementFactor = 1.0;
  if (engagementRate >= 6) engagementFactor = 1.5;
  else if (engagementRate >= 3) engagementFactor = 1.2;

  const adjustedBase = baseRate * engagementFactor;

  // Step 3: Niche Premium
  const nichePremiumRate = NICHE_PREMIUMS[niche] || 0.10;
  const nichePremium = adjustedBase * nichePremiumRate;

  // Step 4: Usage Rights Surcharge (10% per month, capped at 60%)
  const usageSurchargeRate = Math.min(usageRightsMonths * 0.10, 0.60);
  const usageSurcharge = (adjustedBase + nichePremium) * usageSurchargeRate;

  // Final total
  const total = adjustedBase + nichePremium + usageSurcharge;

  return {
    base_rate: Math.round(baseRate),
    engagement_factor: engagementFactor,
    niche_premium: Math.round(nichePremium),
    usage_surcharge: Math.round(usageSurcharge),
    total_recommended_rate: Math.round(total),
    negotiation_range: {
      floor: Math.round(total * 0.85), // Never go below 85% of calculated floor
      ceiling: Math.round(total * 1.4),  // Aim for 40% above floor
    },
    breakdown: {
      adjusted_base: Math.round(adjustedBase),
      niche_premium_rate: `${(nichePremiumRate * 100).toFixed(0)}%`,
      usage_surcharge_rate: `${(usageSurchargeRate * 100).toFixed(0)}%`,
    }
  };
}
