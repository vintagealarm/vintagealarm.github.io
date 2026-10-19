/**
 * Fourth Court Jester / deterministic evidence-envelope gate.
 * It does NOT discover omissions, read the project, infer speech acts, or certify
 * model reasoning. The agent must do that work with sources before this gate runs.
 * This rejects fabricated speakers, unanchored attacks, and user-example strawmen.
 */
export const FOURTH_AREAS = Object.freeze({
  watch: [
    'maker and company lineage', 'demand and user needs',
    'specimen construction and observation', 'peer designs for the same purpose',
    'calibre / platform variants', 'era-specific patents and societal context'
  ],
  business: [
    'original business goal', 'actual customer demand', 'operations and constraints',
    'competing options', 'real performance evidence', 'historical decisions'
  ],
  general: [
    'original user goal', 'present state and prior decisions',
    'external or primary evidence', 'counterexamples and alternatives'
  ]
});
const exploratory = /(?:例えば|たとえば|もしかしたら|かもしれ|可能性|だろうか|でしょうか|ではないか|仮に|あり得|どうか|調べ|見ておきたい|maybe|might|could|perhaps|possibly|what if|for example|hypothetic|perhaps|vielleicht|möglich|beispielsweise)/i;
const eligibleUserAct = new Set(['assertion','decision']);
const origins = new Set(['user','assistant','council','source']);
const own = (x) => typeof x === 'string' ? x.trim() : '';
const exactQuote = (haystack, quote) => quote.length >= 8 && own(haystack).includes(quote);
export function fourthJesterAxes(domain='general') {
  return FOURTH_AREAS[domain] || FOURTH_AREAS.general;
}
export function fourthJesterEvidence(req={}, councilArtifact='') {
  const c=req.jesterContext || {};
  return {
    user: own(c.originalUserUtterance),
    assistant: own(c.currentSessionActions) + '\n' + own(c.criticizedAnswer),
    council: own(c.priorCouncilText) + '\n' + own(councilArtifact),
    source: own(c.evidenceTrail),
  };
}
export function fourthJesterCheck(input, evidence) {
  const errors = [];
  if (!input || typeof input !== 'object' || typeof input.noObjection !== 'boolean' ||
    !Array.isArray(input.targets) || !Array.isArray(input.blindSpots)) {
    return {valid:false,errors:['invalid structured response'],text:''};
  }
  if (input.targets.length > 4 || input.blindSpots.length > 5)
    errors.push('too many proposed critiques or blind spots');
  if (input.noObjection && (input.targets.length || input.blindSpots.length))
    errors.push('noObjection conflicts with findings');
  if (!input.noObjection && !(input.targets.length || input.blindSpots.length))
    errors.push('intervention has no meaningful target or blind spot');
  const parts=[];
  for(const [i,t] of input.targets.entries()) {
    if (!t || !origins.has(t.origin)) {errors.push('target '+i+': invalid origin');continue;}
    const q=own(t.quote), body=own(t.critique);
    if (!exactQuote(evidence[t.origin],q))errors.push('target '+i+': unanchored quote');
    if (!body)errors.push('target '+i+': critique absent');
    if (t.origin==='user') {
      if (!eligibleUserAct.has(t.speechAct))errors.push('target '+i+': user exploration is not an adopted belief');
      if (exploratory.test(q) || exploratory.test(evidence.user)) {
        // Mixed texts can contain both a genuine explicit decision and examples.
        // Require an independently quoted explicit-commitment span to disambiguate.
        const commitment=own(t.commitmentEvidence);
        if (!exactQuote(evidence.user,commitment) ||
          exploratory.test(commitment) ||
          !/(?:採用|確定|決定|断言|承認|そうする|これでいく|私は.*(?:考える|主張)|I (?:decide|assert|believe)|I have decided|ich entscheide)/i.test(commitment)) {
          errors.push('target '+i+': example/question cannot be converted to user conviction');
        }
      }
    }
    if (t.origin!=='user' && t.speechAct==='userDecision')errors.push('target '+i+': AI/Council claim relabeled as user decision');
    if (!own(t.retractIf))errors.push('target '+i+': no falsification condition');
    if(body)parts.push('🤡 【'+t.origin+'の'+(t.speechAct||'claim')+'】'+body+'\n根拠の引用:「'+q+'」\n撤回条件: '+own(t.retractIf));
  }
  for(const [i,g] of input.blindSpots.entries()){
    if (!g || !own(g.area)|| !own(g.question) || !own(g.nextSource)) {
      errors.push('blind spot '+i+': area/question/nextSource required');continue;
    }
    if (!['unexamined','incomplete','contradicted'].includes(g.status))
      errors.push('blind spot '+i+': uncertainty status missing');
    if (/^(?:調査済み|検証済み|verified|confirmed)$/i.test(own(g.status)))
      errors.push('blind spot '+i+': no evidence of examination');
    parts.push('🔎 【未探索: '+g.area+'】'+g.question+'\n次に確かめる資料: '+g.nextSource+'（'+g.status+'）');
  }
  const valid=errors.length===0;
  return {valid,errors,text:valid?(input.noObjection?'今回は異議なし🤡':parts.join('\n\n')):''};
}
export function fourthHookCheck(input,evidence){
  if (!input || input.intervene!==true) return {intervene:false};
  const origin=input.origin,quote=own(input.quote);
  if (!origins.has(origin)|| !exactQuote(evidence[origin],quote) || !own(input.text) ||
      !own(input.materialImpact) || !own(input.unexaminedArea) ||
      input.alreadyChallenged!==false) return {intervene:false};
  if(origin==='user' && exploratory.test(evidence.user)) return {intervene:false};
  return {intervene:true,text:input.text,origin,quote,unexaminedArea:input.unexaminedArea};
}
