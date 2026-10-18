/**
 * Third Jester: narrow, evidence-scoped pause decision.
 * This is not a semantic classifier. A source-backed reviewer supplies the issue kind;
 * the gate enforces minimum evidence, limited scope, and release conditions.
 */
export const JESTER_OUTCOME = Object.freeze({
  CONTINUE: 'CONTINUE_SILENT',
  HOLD: 'HOLD_TARGET',
  CONTEXT: 'HOLD_CONTEXT',
});

const MAJOR_ISSUES = new Set(['GOAL_INVERSION', 'UNAUTHORIZED_REVERSAL', 'SELF_AUDIT_EXCLUSION']);
const trim = (value) => typeof value === 'string' ? value.trim() : '';

export function thirdJesterGate({issue = 'NONE', source = {}, finding = {}, scope = {}} = {}) {
  if (issue === 'NONE') return {decision: JESTER_OUTCOME.CONTINUE, intervention: false, reason: 'No major unresolved contradiction', stoppedScope: null};
  if (!MAJOR_ISSUES.has(issue) && issue !== 'UNKNOWN') return {decision: JESTER_OUTCOME.CONTEXT, intervention: false, reason: 'Unrecognized review category', stoppedScope: null};
  const target = trim(scope.target);
  if (!target) return {decision: JESTER_OUTCOME.CONTEXT, intervention: false, reason: 'No bounded change target', stoppedScope: null};
  if (finding.resolved === true) return {decision: JESTER_OUTCOME.CONTINUE, intervention: false, reason: 'Documented correction already resolves issue', stoppedScope: null};
  if (finding.authorizedChange === true) return {decision: JESTER_OUTCOME.CONTINUE, intervention: false, reason: 'User-authorized goal change; existing reversal gate still applies', stoppedScope: null};
  if (finding.materialImpact !== true) return {decision: JESTER_OUTCOME.CONTINUE, intervention: false, reason: 'No material effect demonstrated', stoppedScope: null};
  if (issue === 'UNKNOWN' || source.verified !== true || !trim(source.path) || !trim(source.excerpt) || !trim(source.canonicalText).includes(trim(source.excerpt)) || !trim(finding.observedClaim) || !trim(finding.contradiction) || !trim(finding.repairCondition)) {
    return {decision: JESTER_OUTCOME.CONTEXT, intervention: false, reason: 'Material risk requires source-backed verification before a verdict', stoppedScope: target};
  }
  return {
    decision: JESTER_OUTCOME.HOLD,
    intervention: true,
    reason: finding.contradiction,
    stoppedScope: target,
    requiredBeforeResume: finding.repairCondition,
    source: {path: source.path, excerpt: source.excerpt},
  };
}
