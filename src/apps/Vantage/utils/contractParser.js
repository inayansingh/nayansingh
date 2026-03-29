// CONTRACT RED-FLAG PARSER
// Regex pre-scan before sending to LLM for context-aware deep analysis

export const RED_FLAG_PATTERNS = [
  {
    key: 'perpetuity',
    pattern: /perpetu[a-z]*/gi,
    risk_level: 'CRITICAL',
    label: 'Perpetuity Clause',
    quick_translation: 'They own your content forever. No expiration date.',
  },
  {
    key: 'exclusivity',
    pattern: /exclusiv[a-z]*/gi,
    risk_level: 'HIGH',
    label: 'Exclusivity Clause',
    quick_translation: 'You cannot work with competing brands. This limits your income.',
  },
  {
    key: 'work_for_hire',
    pattern: /work[\s-]for[\s-]hire/gi,
    risk_level: 'CRITICAL',
    label: 'Work for Hire',
    quick_translation: 'You lose ALL copyright. The brand legally created this content, not you.',
  },
  {
    key: 'usage_rights',
    pattern: /usage rights|right[sz] to use/gi,
    risk_level: 'HIGH',
    label: 'Usage Rights',
    quick_translation: 'They can reuse your content in ads and campaigns beyond the original post.',
  },
  {
    key: 'non_disparagement',
    pattern: /non[\s-]disparagement|disparage[a-z]*/gi,
    risk_level: 'MEDIUM',
    label: 'Non-Disparagement',
    quick_translation: "You can't publicly criticize this brand, even if your experience is negative.",
  },
  {
    key: 'liquidated_damages',
    pattern: /liquidated damages/gi,
    risk_level: 'CRITICAL',
    label: 'Liquidated Damages',
    quick_translation: 'They have a predetermined financial penalty they can impose if you breach any term.',
  },
  {
    key: 'ip_assignment',
    pattern: /intellectual property|IP assignment|assign[a-z]* all rights/gi,
    risk_level: 'HIGH',
    label: 'IP Assignment',
    quick_translation: 'They claim ownership over intellectual property you create.',
  },
  {
    key: 'morality_clause',
    pattern: /morality clause|moral[s]? clause|moral turpitude/gi,
    risk_level: 'MEDIUM',
    label: 'Morality Clause',
    quick_translation: 'They can cancel the contract if they deem your public behavior "immoral" — very subjective.',
  },
  {
    key: 'first_right_refusal',
    pattern: /first right of refusal|right of first/gi,
    risk_level: 'MEDIUM',
    label: 'First Right of Refusal',
    quick_translation: 'You must offer them future deals before competitors. Locks up your deal flow.',
  },
];

// Client-side pre-scan — extracts sentences containing flagged keywords
export function preScreenContract(contractText) {
  const sentences = contractText.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  const findings = [];

  for (const flag of RED_FLAG_PATTERNS) {
    for (const sentence of sentences) {
      if (flag.pattern.test(sentence)) {
        flag.pattern.lastIndex = 0; // reset regex state
        findings.push({
          risk_level: flag.risk_level,
          label: flag.label,
          clause_text: sentence,
          plain_english: flag.quick_translation,
          recommended_action: flag.risk_level === 'CRITICAL'
            ? 'Strike this clause immediately. Non-negotiable.'
            : flag.risk_level === 'HIGH'
            ? 'Negotiate hard — add a time limit and scope restriction.'
            : 'Flag for review — ensure scope is clearly defined.',
        });
        break; // Only report a pattern once per flag type
      }
    }
  }

  return findings;
}
