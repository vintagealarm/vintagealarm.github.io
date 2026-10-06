import assert from "node:assert/strict";
import test from "node:test";
import { hookContext, jesterPreflight, render } from "../src/v3";

const board = {
  items: [
    {
      id: "C1",
      title: "本文保持",
      statement: "MCP本文が残る",
      support: ["fixture"],
      challenge: [],
      unknowns: [],
    },
  ],
};
const posts = [
  { resident: "editor", phase: "silent", text: "独立初手" },
  {
    resident: "devil",
    phase: "cross",
    target: "C1",
    text: "Cross Exam固有情報",
  },
  {
    resident: "editor",
    phase: "revote",
    target: "C1",
    text: "匿名再評価",
  },
];

function fixture(format: string) {
  const labels: Record<string, string> = {
    thread: "2chスレ",
    panel: "ひな壇",
    council: "評議会",
    claims: "Claim Board",
    brainstorm: "Brainstorming Board",
    premortem: "PRE-MORTEM / 地雷探知",
  };
  return {
    version: "council-v3",
    format,
    formatLabel: labels[format],
    premortemStage: "zero-code",
    board,
    posts,
    synthesis: {
      conclusion: `本文-${format}`,
      recommended: "採用",
      minorityReport: ["少数意見"],
      unknowns: ["未確認"],
      verdict: "GO",
    },
    stopReason: "test stop",
  };
}

for (const format of [
  "thread",
  "panel",
  "council",
  "claims",
  "brainstorm",
  "premortem",
]) {
  test(`${format}: MCP text preserves the V2 body`, () => {
    const text = render(fixture(format));
    assert.match(text, /COUNCIL V3/);
    assert.match(text, new RegExp(`本文-${format}`));
    assert.doesNotMatch(text, /^COUNCIL V3\nFORMAT:[^\n]+\nSTOP:[^\n]+$/);
  });
}

test("silent hook receives Cross Exam and private re-vote evidence", () => {
  const context = hookContext(fixture("claims"));
  assert.equal(context.crossExam[0].text, "Cross Exam固有情報");
  assert.equal(context.privateRevote[0].text, "匿名再評価");
});

test("an intervention is followed by a visible re-adjudication", () => {
  const result = fixture("council");
  result.originalSynthesis = result.synthesis;
  result.synthesis = { ...result.synthesis, conclusion: "再裁定後" };
  result.jesterHook = { intervene: true, text: "🤡 前提が閉じています" };
  result.reAdjudicated = true;
  const text = render(result);
  assert.ok(text.indexOf("🤡") < text.indexOf("Jester hook後の再裁定"));
  assert.match(text, /再裁定後/);
});

const completeJesterContext = {
  currentState: "mainと公開状態を確認",
  decisionAncestry: "ユーザー起点から現判断まで復元",
  correctionsReversals: "ユーザー訂正とAI自己訂正を復元",
  rejectedHold: "棄却・HOLDと再検討条件を復元",
  evidenceTrail: "PR・commit・CI・liveを確認",
  adjacentConsequences: "サイト・運用・他ルールへの影響を確認",
  currentSessionActions: "直前のAI提案とPR実装を監査対象へ含めた",
  observationBoundary: "今回の連続作業の開始点から現在まで",
  exclusionsWithReasons: "除外なし",
};

test("Fool's License stays inactive when current-session self-audit is missing", () => {
  const { currentSessionActions: _omitted, ...context } = completeJesterContext;
  const preflight = jesterPreflight({ jesterContext: context });
  assert.equal(preflight.eligible, false);
  assert.deepEqual(preflight.missing, ["currentSessionActions"]);
});

test("Fool's License requires an observation boundary and justified exclusions", () => {
  const preflight = jesterPreflight({
    jesterContext: {
      ...completeJesterContext,
      observationBoundary: " ",
      exclusionsWithReasons: "",
    },
  });
  assert.equal(preflight.eligible, false);
  assert.deepEqual(preflight.missing, ["observationBoundary", "exclusionsWithReasons"]);
});

test("Fool's License activates only after the complete context manifest", () => {
  const preflight = jesterPreflight({ jesterContext: completeJesterContext });
  assert.equal(preflight.eligible, true);
  assert.deepEqual(preflight.missing, []);
});
