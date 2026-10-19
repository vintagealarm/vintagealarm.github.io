import test from "node:test";
import assert from "node:assert/strict";
import app from "../src/v3";
import { fourthJesterAxes, fourthJesterEvidence, fourthJesterCheck, fourthHookCheck } from "../src/fourth-jester.mjs";

const question="例えばARSAが触読の問題頻発で針を強化した可能性もあるよね？今あるモデルや社史を調べて視野を広げたい。";
const assistant="1957年特許と機械式腕時計の修理フォーラムだけを調査しました。";
const council="H1: ARSAは頻発したため針を改良した、とCouncilが仮説化した。";
const evidence={user:question,assistant,council,source:"US2915874A特許の従来の触読指針への言及。"};
const target=(overrides={})=>({
  origin:"council",speechAct:"hypothesis",
  quote:"ARSAは頻発したため針を改良した",
  critique:"それはCouncil自身の仮説。開発資料なしに改良原因を決めるな",
  retractIf:"当時の改良理由を記すメーカーの記録が見つかれば撤回",
  ...overrides,
});
const gap=(overrides={})=>({
  area:"メーカーの設計変遷",
  question:"ARSAの1994年再開発、2004年関係者証言、2014年Hi-Touchの堅牢固定、現行Standardの仕様を調べたか",
  nextSource:"既存ARSA Research Ledgerと当時のメーカー資料",
  status:"unexamined",
  ...overrides,
});
test("fourth keeps known watch-research areas and does not force all areas as findings",()=>{
  assert.equal(fourthJesterAxes("watch").length,6);
  assert.equal(fourthJesterAxes("general").length,4);
});
test("ARSA: source-anchored user exploratory question is never a settled belief",()=>{
  const result=fourthJesterCheck({
    noObjection:false,targets:[target({
      origin:"user",speechAct:"decision",quote:"針を強化した可能性もあるよね",
      critique:"陛下、昔は弱いと信じているのでしょう",
      retractIf:"ユーザー原文を確認する"
    })],blindSpots:[]
  },evidence);
  assert.equal(result.valid,false);
  assert.match(result.errors.join(" "),/example\/question/);
});
test("ARSA: cannot blame user for Council-created H1 even when quote is real",()=>{
  const result=fourthJesterCheck({
    noObjection:false,targets:[target({
      origin:"user",quote:"ARSAは頻発したため針を改良した",
      speechAct:"assertion"
    })],blindSpots:[]
  },evidence);
  assert.equal(result.valid,false);
  assert.match(result.errors.join(" "),/unanchored/);
});
test("ARSA: critiques Council-generated H1 and reveals omitted maker/product sources",()=>{
  const result=fourthJesterCheck({
    noObjection:false,targets:[target()],blindSpots:[gap()]
  },evidence);
  assert.equal(result.valid,true,JSON.stringify(result.errors));
  assert.match(result.text,/council/);
  assert.match(result.text,/1994年/);
  assert.match(result.text,/未探索/);
});
test("ARSA: unsubstantiated new search results may not be claimed as verified",()=>{
  const result=fourthJesterCheck({noObjection:false,targets:[],blindSpots:[
    gap({status:"verified"})
  ]},evidence);
  assert.equal(result.valid,false);
});
test("valid user decision may be challenged with direct evidence",()=>{
  const src="公開仕様はこれで確定する。";
  const result=fourthJesterCheck({noObjection:false,targets:[target({
    origin:"user",speechAct:"decision",quote:"公開仕様はこれで確定する",
    critique:"決定内容が既存の公開規則と矛盾している",
    retractIf:"公開規則の例外承認が原文で確認されれば撤回",
  })],blindSpots:[]},{...evidence,user:src});
  assert.equal(result.valid,true,JSON.stringify(result.errors));
});
test("site UI: critical omission produces a specific next verification",()=>{
  const result=fourthJesterCheck({noObjection:false,targets:[],blindSpots:[
    gap({area:"実機画面",question:"CSSの定義だけで実際のiOS 320px表示を確認したか",nextSource:"Playwright画面とユーザー提供Safariスクリーンショット",status:"unexamined"})
  ]},evidence);
  assert.equal(result.valid,true);
  assert.match(result.text,/Safari/);
});
test("SNS: preserves unknowns rather than inventing viewership causality",()=>{
  const result=fourthJesterCheck({noObjection:false,targets:[],blindSpots:[
    gap({area:"SNS再生の因果",question:"フォロー増が再生増の原因かは判定できない",nextSource:"投稿時系列とInstagram Insightsの複数時点",status:"incomplete"})
  ]},evidence);
  assert.equal(result.valid,true);
  assert.match(result.text,/Instagram/);
});
test("no-critique is normal when no supported challenge or blind spot remains",()=>{
  assert.equal(fourthJesterCheck({noObjection:true,targets:[],blindSpots:[]},evidence).text,"今回は異議なし🤡");
  assert.equal(fourthJesterCheck({noObjection:true,targets:[target()],blindSpots:[]},evidence).valid,false);
  assert.equal(fourthJesterCheck({noObjection:false,targets:[],blindSpots:[]},evidence).valid,false);
});
test("silent Jester can target a Council flaw but does not intervene over user exploration",()=>{
  const x={intervene:true,origin:"council",quote:"ARSAは頻発したため針を改良した",
    text:"🤡 Councilが作ったH1の裏付けを取っていない",
    unexaminedArea:"ARSA企業史",materialImpact:"原因の結論が変わる",
    alreadyChallenged:false};
  assert.equal(fourthHookCheck(x,evidence).intervene,true);
  assert.equal(fourthHookCheck({...x,origin:"user"},evidence).intervene,false);
  assert.equal(fourthHookCheck({...x,alreadyChallenged:true},evidence).intervene,false);
});
test("raw user utterance must be provided separately from composite body",()=>{
  const e=fourthJesterEvidence({body:question,jesterContext:{
    currentSessionActions:assistant,priorCouncilText:council
  }});
  assert.equal(e.user,"");
  assert.match(e.council,/Council/);
});
const fullContext={
  currentState:"mainと対象Watchの現在状態を確認済み",
  decisionAncestry:"元のARSA研究の指摘からCouncilへ進んだ経緯を復元",
  correctionsReversals:"今回の例示の帰属訂正を復元",
  rejectedHold:"勝手な機構故障認定はHOLD",
  evidenceTrail:"特許およびResearch Ledgerは別出典として照合",
  adjacentConsequences:"研究本文は今回変更しない",
  currentSessionActions:assistant,
  observationBoundary:"元のARSA研究依頼から現在まで",
  exclusionsWithReasons:"今回の対象外は製品購入と所有台帳",
  taskContract:"日本語の研究論点レビューで公開本文を変更しない",
  originalUserUtterance:question,
  priorCouncilText:council
};
test("actual /api/council explicit 7 returns fourth grounded audit, not raw model criticism",async()=>{
  const original=globalThis.fetch;
  const response={noObjection:false,targets:[target()],blindSpots:[gap()]};
  globalThis.fetch=(async()=>new Response(JSON.stringify({output_text:JSON.stringify(response)}),{status:200})) as typeof fetch;
  try{
    const req=new Request("https://council.local/api/council",{method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({title:"ARSA追加研究",body:"問いを広げる",format:"jester",domain:"watch",
        jesterContext:fullContext})});
    const res=await app.fetch(req,{OPENAI_API_KEY:"fixture-key"} as any);
    const data=await res.json() as any;
    assert.equal(res.status,200);
    assert.equal(data.version,"council-v4");
    assert.equal(data.jester.license,"GRANTED");
    assert.match(data.jester.text,/メーカーの設計変遷/);
  }finally{globalThis.fetch=original;}
});
test("actual /api/council explicit 7 suppresses invented user belief",async()=>{
  const original=globalThis.fetch;
  const response={noObjection:false,targets:[target({
    origin:"user",speechAct:"assertion",quote:"針を強化した可能性もあるよね",
    critique:"ユーザーは信じている",retractIf:"原文照合"})],blindSpots:[]};
  globalThis.fetch=(async()=>new Response(JSON.stringify({output_text:JSON.stringify(response)}),{status:200})) as typeof fetch;
  try{
    const req=new Request("https://council.local/api/council",{method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({title:"ARSA追加研究",body:"複合した背景",format:"jester",domain:"watch",
        jesterContext:fullContext})});
    const res=await app.fetch(req,{OPENAI_API_KEY:"fixture-key"} as any);
    const data=await res.json() as any;
    assert.equal(data.jester.license,"NOT_GRANTED");
    assert.equal(data.jester.mode,"attribution-hold");
    assert.doesNotMatch(data.jester.text,/ユーザーは信じている/);
  }finally{globalThis.fetch=original;}
});
