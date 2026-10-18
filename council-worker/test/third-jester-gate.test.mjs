import test from 'node:test';
import assert from 'node:assert/strict';
import {thirdJesterGate, JESTER_OUTCOME} from '../src/third-jester-gate.mjs';

// Reviewer judgments and verified canonical excerpts are fixtures, not a model-semantic benchmark.
// Source-excerpt containment and narrow stop/release behavior are what these tests prove.
const goalQuote = 'It is a research site, but research itself is not the final purpose.';
const purpose = {path:'public/llms.txt', excerpt:goalQuote, canonicalText:goalQuote, verified:true};
const goal = (claim, contradiction, target, repairCondition) => ({
  issue:'GOAL_INVERSION', source:purpose, scope:{target},
  finding:{observedClaim:claim, contradiction, materialImpact:true, repairCondition}
});

const cases = [
  ['1. research as final purpose', goal('Research output is the final purpose', 'Means displaced mission', 'VA presentation conclusion', 'Rebuild around discover-understand-experience'), JESTER_OUTCOME.HOLD],
  ['2. selling request silently changes site mission', goal('A Basis DM proves VA should sell watches', 'Unapproved business goal change', 'Site strategy proposal', 'Separate reader interest from retail goal'), JESTER_OUTCOME.HOLD],
  ['3. beginner appeal removes deep research', goal('Discard all specialist research', 'False binary: accessible entry and expert depth can coexist', 'Site editorial proposal', 'Retain research with approachable entry'), JESTER_OUTCOME.HOLD],
  ['4. unapproved reversal', {issue:'UNAUTHORIZED_REVERSAL',source:{path:'PROJECT_STATE.md',excerpt:'ARSA Blind Alarmは published: false がユーザー意図のCURRENT',canonicalText:'ARSA Blind Alarmは published: false がユーザー意図のCURRENT',verified:true},scope:{target:'ARSA publish flag'},finding:{observedClaim:'publish ARSA',contradiction:'Reverses user-confirmed unpublished state',materialImpact:true,repairCondition:'Restore false or obtain new explicit instruction'}}, JESTER_OUTCOME.HOLD],
  ['5. omit own recent audit work', {issue:'SELF_AUDIT_EXCLUSION',source:{path:'council-worker/V3.md',excerpt:'自分の仕事を監査母数から外さない',canonicalText:'自分の仕事を監査母数から外さない',verified:true},scope:{target:'Jester audit verdict'},finding:{observedClaim:'Exclude previous assistant actions from evaluation',contradiction:'The excluded current-session AI activity remains in scope',materialImpact:true,repairCondition:'Re-evaluate with prior actions and dated boundary'}}, JESTER_OUTCOME.HOLD],
  ['6. legitimate primary-source research', {issue:'NONE',scope:{target:'CYMA study'}}, JESTER_OUTCOME.CONTINUE],
  ['7. minor typo fix', {issue:'NONE',scope:{target:'Watch typo'}}, JESTER_OUTCOME.CONTINUE],
  ['8. unavailable canonical source', {issue:'UNKNOWN',source:{path:'public/llms.txt',verified:false},scope:{target:'Purpose-bearing conclusion'},finding:{observedClaim:'Change VA purpose',materialImpact:true}}, JESTER_OUTCOME.CONTEXT],
];
for (const [name,input,expected] of cases) test(name, ()=>{
  const actual=thirdJesterGate(input);
  assert.equal(actual.decision,expected);
  if(expected===JESTER_OUTCOME.HOLD){assert.equal(actual.stoppedScope,input.scope.target);assert.ok(actual.requiredBeforeResume);assert.equal(actual.intervention,true);}
});

test('no broad halt without a bounded target',()=>assert.equal(thirdJesterGate({...cases[0][1], scope:{}}).decision,JESTER_OUTCOME.CONTEXT));
test('weak impact does not trigger an intervention',()=>assert.equal(thirdJesterGate({...cases[0][1], finding:{...cases[0][1].finding, materialImpact:false}}).decision,JESTER_OUTCOME.CONTINUE));
test('already corrected result is silent',()=>assert.equal(thirdJesterGate({...cases[0][1], finding:{...cases[0][1].finding, resolved:true}}).decision,JESTER_OUTCOME.CONTINUE));
test('missing repair condition denies a confident verdict',()=>assert.equal(thirdJesterGate({...cases[0][1], finding:{...cases[0][1].finding,repairCondition:''}}).decision,JESTER_OUTCOME.CONTEXT));
test('fabricated canonical excerpt cannot authorize stopping',()=>assert.equal(thirdJesterGate({...cases[0][1], source:{...purpose,excerpt:'fabricated quote'}}).decision,JESTER_OUTCOME.CONTEXT));
