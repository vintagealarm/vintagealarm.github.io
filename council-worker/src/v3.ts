import v2, {
  FORMAT_MENU as V2_MENU,
  formatCouncilResult,
} from "./index";
import { fourthJesterAxes, fourthJesterEvidence, fourthJesterCheck, fourthHookCheck } from "./fourth-jester.mjs";

interface Env {
  OPENAI_API_KEY: string;
  ALLOWED_ORIGIN?: string;
  COUNCIL_MODEL_FAST?: string;
  COUNCIL_MODEL_JUDGE?: string;
  COUNCIL_VECTOR_STORE_ID?: string;
  DB?: any;
}
type Evidence = "none" | "project" | "web" | "project-web" | "deep-web";
type JesterContext = {
  currentState?: string;
  decisionAncestry?: string;
  correctionsReversals?: string;
  rejectedHold?: string;
  evidenceTrail?: string;
  adjacentConsequences?: string;
  currentSessionActions?: string;
  observationBoundary?: string;
  exclusionsWithReasons?: string;
  taskContract?: string;
  // The actual user utterance is required before criticizing what the user believes.
  // Body may be a composite of user/AI/Council discussion and is NOT a user quotation.
  originalUserUtterance?: string;
  criticizedAnswer?: string;
  priorCouncilText?: string;
};
type Req = {
  title: string;
  body: string;
  format?: string;
  domain?: string;
  tone?: string;
  budget?: string;
  evidence?: Evidence;
  panelSize?: number;
  premortemStage?: string;
  mode?: string;
  engine?: string;
  useWeb?: boolean;
  jesterContext?: JesterContext;
};

export const FORMAT_MENU = [
  ...V2_MENU,
  "7. 「宮廷道化師で焼いて 🤡」→ 王＝ユーザー＋AI＋Councilの前提をノンデリに疑い、必要なら提示外の案・削除・撤退・保留・何もしないまで戻して比較。異論がなければ「今回は異議なし🤡」で帰る",
];
const H = (o: string) => ({
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": o,
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type",
    "cache-control": "no-store",
  }),
  O = (e: Env) => e.ALLOWED_ORIGIN || "*";
const clean = (s: string) =>
  s
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
function out(x: any) {
  if (typeof x?.output_text === "string") return x.output_text.trim();
  return (x?.output || [])
    .flatMap((i: any) =>
      i?.type === "message"
        ? (i.content || [])
            .filter((c: any) => c.type === "output_text")
            .map((c: any) => c.text)
        : [],
    )
    .join("\n")
    .trim();
}
function tools(a: Req, e: Env) {
  const ev = a.evidence || (a.useWeb ? "project-web" : "project"),
    t: any[] = [];
  if (["web", "project-web", "deep-web"].includes(ev))
    t.push({
      type: "web_search",
      search_context_size: ev === "deep-web" ? "high" : "medium",
    });
  if (
    ["project", "project-web", "deep-web"].includes(ev) &&
    e.COUNCIL_VECTOR_STORE_ID
  )
    t.push({
      type: "file_search",
      vector_store_ids: [e.COUNCIL_VECTOR_STORE_ID],
      max_num_results: 18,
    });
  return t;
}
async function call(e: Env, prompt: string, a: Req, judge = true) {
  const r = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${e.OPENAI_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: judge
        ? e.COUNCIL_MODEL_JUDGE || "gpt-5.6-terra"
        : e.COUNCIL_MODEL_FAST || "gpt-5.6-luna",
      input: prompt,
      tools: tools(a, e),
      reasoning: { effort: judge ? "high" : "medium" },
      max_output_tokens: 3200,
    }),
  });
  if (!r.ok) throw Error(`OpenAI ${r.status}: ${await r.text()}`);
  return r.json();
}

const LICENSE = `あなたはVINTAGE ALARM Council四代目「問いを守り、盲点を暴く道化師」🤡。王とはユーザー単独ではなく、ユーザー＋AI＋Councilが共同で作った現在の依頼・前提・仕様・判断・完成認識を指す。役目は王を侮辱することではなく、普通なら遠慮・既存投資・権威・多数派・技術ブラックボックス・過去判断への配慮で候補から落ちる異論を、道化の特権(Fool's License)で笑えるノンデリ口調のまま玉座まで運ぶこと。

必須原則:
- 逆張りを義務化しない。有意な異論がなければ明確に「今回は異議なし🤡」。
- 刺すだけで終わらない。意味がある場合は現案の外から第三案、削除、統合、撤退、保留、追加確認、何もしない、作り直しを探索空間へ戻し、現案と比較する。
- 自分の代案にも忠誠を持たない。比較して現案が強ければ「陛下の勝ち」で退く。
- 判断可能なら自分の意見を濁さない。証拠不足なら判断不能と言う。決定権はユーザーへ残す。
- ユーザー説明、AI自己申告、資料確認、Web確認、推測、未確認を混ぜない。ツール取得=主張の立証とは扱わない。
- ユーザーの可能性の例示・質問を確信に変換するな。誰が何を言ったか原文の一節を照合する。元発言がない場合はユーザーの信念を批判しない。
- 先にAI/Council自身が作った仮説・検索対象の偏り・未取得の企業史/現行製品/一次資料/利用者証言/競合機構を監査する。重要な調査領域に穴があるなら「未探索」と明示し、検索したふりをしない。
- 自分の批判にも撤回条件を付ける。根拠がなければ逆張りせず「異議なし」「要調査」と分ける。
- Council多数派・Chair・Minority Report・既存仕様・テストPASSも聖域にしない。
- ノンデリは罵倒ではない。社会的遠慮で閉じた選択肢を戻すためのUI。面白さは歓迎するが、根拠のない悪口は禁止。
- 出力件数を埋めるために論点を捏造しない。0件も正常。
- 長い監査帳票にしない。刺す価値があるものだけ。`;

const JESTER_CONTEXT_FIELDS: Array<keyof JesterContext> = [
  "currentState",
  "decisionAncestry",
  "correctionsReversals",
  "rejectedHold",
  "evidenceTrail",
  "adjacentConsequences",
  "currentSessionActions",
  "observationBoundary",
  "exclusionsWithReasons",
  "taskContract",
];

export function jesterPreflight(a: Pick<Req, "jesterContext">) {
  const context = a.jesterContext || {};
  const missing = JESTER_CONTEXT_FIELDS.filter(
    (field) => {
      const value = String(context[field] || "").trim();
      return !value || /^(?:n\/?a|unknown|tbd|todo|none|未確認|不明|なし|未取得|未読)$/i.test(value);
    },
  );
  return {
    eligible: missing.length === 0,
    missing,
    context,
  };
}

async function explicitJester(a: Req, e: Env) {
  if (!a.title || !a.body) throw Error("title and body are required");
  const preflight = jesterPreflight(a);
  if (!preflight.eligible) {
    return {
      version: "council-v4",
      format: "jester",
      formatLabel: "四代目宮廷道化師 🤡",
      title: a.title,
      body: a.body,
      jester: {
        mode: "context-hold",
        license: "NOT_GRANTED",
        missing: preflight.missing,
        text: `文脈不足のため無礼許可は未発効。復元不足: ${preflight.missing.join(", ")}`,
      },
      createdAt: new Date().toISOString(),
    };
  }
  const evidence = fourthJesterEvidence(a);
  const axes = fourthJesterAxes(a.domain);
  const prompt = [
    LICENSE,
    "これは明示召喚7。context manifestは取得先の確認を代替しない。",
    "議題: "+a.title, "背景（合成情報であり、ユーザーの直接発言とは限らない）: "+a.body,
    "10項目の文脈: "+JSON.stringify(preflight.context),
    "直接のユーザー原文（空ならユーザーの主張は攻撃禁止）: "+JSON.stringify(evidence.user),
    "AI自身の直近説明/生成物: "+JSON.stringify(evidence.assistant),
    "Councilによる仮説・議論（ユーザー原文と混同禁止）: "+JSON.stringify(evidence.council),
    "証拠の参照先（資料を読んだ保証ではない）: "+JSON.stringify(evidence.source),
    "対象domainの探索軸（全部埋める義務なし）: "+axes.join(" / "),
    "まずユーザーの依頼を質問/探索例/観察/断言/決定に分けて理解する。次にAI自身の調査範囲を監査し、追加すべき資料・会社史・現存品・利用者側の視点を探す。",
    "ユーザーを批判する場合は元原文の8文字以上の正確なquoteを取り、speechActはassertionかdecisionのみとする。『もしかしたら』『例えば』などの例示をユーザーの信念と呼ばない。",
    "assistant/council/sourceを批判する場合も、その発案元の素材に実在するquoteが必須。source列は証拠そのものではなく単なる参照なので、資料確認したと断定しない。",
    "研究の見落としにはblindSpotsを使う。statusはunexamined/incomplete/contradicted、area、question、nextSourceを持たせる。調べていない資料について調査済みと書くな。",
    "批判のretractIfにはその批判が撤回される検証条件。何も価値のある指摘がなければnoObjection=true、targetsとblindSpotsは空。",
    'JSONのみ: {"noObjection":false,"targets":[{"origin":"assistant|council|source|user","speechAct":"hypothesis|assertion|decision|observation","quote":"元資料に実在する8文字以上の原文","critique":"批判内容","retractIf":"反証・撤回条件","commitmentEvidence":"ユーザー確信の場合のみ元原文引用"}],"blindSpots":[{"area":"探索対象","question":"未調査の重要な問い","nextSource":"当たるべき具体的出典","status":"unexamined"}]}'
  ].join("\n\n");
  const y = await call(e, prompt, a, true);
  let checked;
  try { checked = fourthJesterCheck(JSON.parse(clean(out(y))), evidence); }
  catch { checked = {valid:false,errors:["model returned non-JSON"],text:""}; }
  return {
    version:"council-v4",format:"jester",formatLabel:"四代目宮廷道化師 🤡",
    title:a.title,body:a.body,
    jester: checked.valid
      ? { mode:"fourth",license:"GRANTED",text:checked.text,blindSpotAudit:true }
      : { mode:"attribution-hold",license:"NOT_GRANTED",text:"根拠・発言帰属の検証が不合格。推測による批判は表示しない。"+checked.errors.join("、"),errors:checked.errors },
    createdAt:new Date().toISOString(),
  };
}

export function hookContext(base: any) {
  return {
    format: base.format,
    board: base.board,
    crossExam: (base.posts || []).filter((post: any) =>
      ["cross", "hot-seat"].includes(post.phase),
    ),
    privateRevote: (base.posts || []).filter(
      (post: any) => post.phase === "revote",
    ),
    synthesis: base.synthesis,
    stopReason: base.stopReason,
  };
}

async function hook(a: Req, e: Env, base: any) {
  const board = JSON.stringify(hookContext(base));
  const evidence = fourthJesterEvidence(a,board);
  const y = await call(e, [
    LICENSE,
    "これはCouncil 1〜6の最終裁定直前だけ評価する無言hook。通常は黙る。",
    "介入の3条件: 未解決の重大共有前提 / 反転すれば実質的影響 / Cross ExamとMinorityでも未攻撃。すべて必要。",
    "ユーザーの探索例示に難癖をつけるな。先にCouncil自身が作った仮説や探索漏れを疑い、重要でない欠落は無視。",
    "議題: "+a.title, "背景（ユーザー原文とは限らない）: "+a.body,
    "直接ユーザー原文: "+JSON.stringify(evidence.user),
    "AI直前回答: "+JSON.stringify(evidence.assistant),
    "Board/CrossExam/再評価: "+board,
    "探索軸: "+fourthJesterAxes(a.domain).join(" / "),
    'JSONのみ。黙る: {"intervene":false}。重大な介入: {"intervene":true,"origin":"council|assistant|source|user","quote":"元記録の8文字以上の正確な一節","text":"🤡で始まる具体的な批判","materialImpact":"なぜ裁定が変わるか","unexaminedArea":"実際に残った重大な盲点","alreadyChallenged":false}。',
    "quoteが該当出典に存在しなければ介入しない。ユーザーへの帰属は元原文でのみ許す。"
  ].join("\n\n"),a,true);
  try {return fourthHookCheck(JSON.parse(clean(out(y))),evidence);}
  catch {return {intervene:false};}
}

async function readjudicate(a: Req, e: Env, base: any, jester: any) {
  const premortem = base.format === "premortem";
  const schema = premortem
    ? '{"conclusion":"","verdict":"GO|SPIKEしてからGO|作り直せ","fatal":[],"highProbability":[],"designDebt":[],"preference":[],"unverified":[],"smallestSpike":"","minorityReport":[]}'
    : '{"conclusion":"","recommended":"","consensus":[],"minorityReport":[],"unknowns":[],"nextEvidence":[]}';
  const y = await call(
    e,
    `あなたはCouncil議長。silent Jester hookが重大前提を突いたため、元の裁定をそのまま維持せず再裁定する。道化師へ迎合もせず、Board、Cross Exam、匿名再評価、元裁定、Jester乱入を比較する。結論が変わらない場合も理由を反映する。JSONのみ ${schema}\n\n議題:${a.title}\n背景:${a.body}\nCouncil全記録:${JSON.stringify(hookContext(base))}\nJester乱入:${jester.text}`,
    a,
    true,
  );
  try {
    return JSON.parse(clean(out(y)));
  } catch {
    throw Error("Jester hook後の再裁定を構造化できませんでした");
  }
}

async function runCouncil(a: Req, e: Env, req: Request) {
  if (
    a.format === "jester" ||
    a.format === "court-jester" ||
    a.mode === "jester"
  )
    return explicitJester(a, e);
  const delegated = new Request(req.url, {
      method: "POST",
      headers: req.headers,
      body: JSON.stringify(a),
    }),
    res = await v2.fetch(delegated, e as any);
  if (!res.ok) return res;
  const base = (await res.json()) as any;
  const j = await hook(a, e, base);
  if (!j.intervene)
    return { ...base, version: "council-v4", jesterHook: null };
  const originalSynthesis = base.synthesis;
  const synthesis = await readjudicate(a, e, base, j);
  return {
    ...base,
    version: "council-v4",
    originalSynthesis,
    synthesis,
    jesterHook: j,
    reAdjudicated: true,
  };
}
export function render(x: any) {
  if (x.format === "jester") return x.jester.text;
  const header = x.formatLabel
    ? `COUNCIL V3\nFORMAT:${x.formatLabel}\nSTOP:${x.stopReason || ""}`
    : "COUNCIL V3";
  if (!x.jesterHook?.text) return `${header}\n\n${formatCouncilResult(x)}`;
  const original = formatCouncilResult({
    ...x,
    synthesis: x.originalSynthesis,
  });
  return `${header}\n\n${original}\n\n---\n${x.jesterHook.text}\n\n## Jester hook後の再裁定\n${formatCouncilResult(x)}`;
}

const MCP = {
  name: "run_council",
  description: `COUNCIL V3. ユーザーが「焼いて」だけなら実行せず、必ず先にこの7択をそのまま提示:${FORMAT_MENU.join(" / ")}。7は明示的な宮廷道化師。1〜6にも重大な共有未検証前提を検出した場合だけ無言hookが一度走り、通常は表示されない。`,
  inputSchema: {
    type: "object",
    properties: {
      title: { type: "string" },
      body: { type: "string" },
      format: {
        type: "string",
        enum: [
          "thread",
          "panel",
          "council",
          "claims",
          "brainstorm",
          "premortem",
          "jester",
        ],
      },
      domain: { type: "string", enum: ["general", "watch", "business"] },
      budget: { type: "string", enum: ["quick", "standard", "deep"] },
      evidence: {
        type: "string",
        enum: ["none", "project", "web", "project-web", "deep-web"],
      },
      panelSize: { type: "integer", minimum: 4, maximum: 10 },
      premortemStage: { type: "string", enum: ["zero-code", "post-spike"] },
      jesterContext: {
        type: "object",
        description:
          "Explicit jester only. Fool's License stays inactive until every context field is restored.",
        properties: Object.fromEntries(
          [...JESTER_CONTEXT_FIELDS.map((field) => [field, { type: "string", minLength: 1 }]),
           ...["originalUserUtterance","criticizedAnswer","priorCouncilText"].map((field) => [field,{type:"string"}])],
        ),
        required: JESTER_CONTEXT_FIELDS,
        additionalProperties: false,
      },
    },
    required: ["title", "body", "format"],
    additionalProperties: false,
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
};
const MH = (e: Env) => ({
    ...H(O(e)),
    "access-control-allow-headers":
      "content-type,authorization,mcp-protocol-version,mcp-session-id",
  }),
  MR = (id: any, result: any, e: Env) =>
    new Response(JSON.stringify({ jsonrpc: "2.0", id, result }), {
      headers: MH(e),
    });
async function mcp(req: Request, e: Env) {
  if (req.method === "OPTIONS")
    return new Response(null, { status: 204, headers: MH(e) });
  if (req.method !== "POST")
    return new Response(null, { status: 405, headers: MH(e) });
  let m: any;
  try {
    m = await req.json();
  } catch {
    return MR(null, { error: "Parse error" }, e);
  }
  if (m?.id == null) return new Response(null, { status: 202, headers: MH(e) });
  if (m.method === "initialize")
    return MR(
      m.id,
      {
        protocolVersion: "2025-06-18",
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "VINTAGE ALARM Council", version: "4.0.0" },
        instructions:
          "Plain 焼いて = router. Show exact 7 choices. Explicit 7 = Court Jester. Formats 1-6 may trigger a silent high-threshold Jester hook.",
      },
      e,
    );
  if (m.method === "ping") return MR(m.id, {}, e);
  if (m.method === "tools/list") return MR(m.id, { tools: [MCP] }, e);
  if (m.method === "tools/call" && m.params?.name === "run_council") {
    try {
      const a = m.params?.arguments || {},
        x =
          a.format === "jester"
            ? await explicitJester(a, e)
            : await (async () => {
                const fake = new Request("https://council.local/api/council", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify(a),
                });
                return runCouncil(a, e, fake);
              })();
      return MR(
        m.id,
        {
          content: [{ type: "text", text: render(x) }],
          structuredContent: x,
          isError: false,
        },
        e,
      );
    } catch (z: any) {
      return MR(
        m.id,
        {
          content: [
            {
              type: "text",
              text: "Council failed: " + (z?.message || String(z)),
            },
          ],
          isError: true,
        },
        e,
      );
    }
  }
  return MR(m.id, { error: "Method not found" }, e);
}

export default {
  async fetch(req: Request, e: Env) {
    const u = new URL(req.url),
      h = H(O(e));
    if (u.pathname === "/mcp") return mcp(req, e);
    if (req.method === "OPTIONS")
      return new Response(null, { status: 204, headers: h });
    if (req.method === "GET" && u.pathname === "/health")
      return new Response(
        JSON.stringify({
          ok: true,
          version: "council-v4",
          openai: !!e.OPENAI_API_KEY,
          vectorStore: !!e.COUNCIL_VECTOR_STORE_ID,
          db: !!e.DB,
          jester: true,
          jesterHook: true,
          fourthJester: true,
        }),
        { headers: h },
      );
    if (req.method === "GET" && u.pathname === "/api/menu")
      return new Response(
        JSON.stringify({ version: "council-v4", menu: FORMAT_MENU }),
        { headers: h },
      );
    if (req.method === "POST" && u.pathname === "/api/council") {
      try {
        const a = (await req.json()) as Req;
        const x = await runCouncil(a, e, req);
        return x instanceof Response
          ? x
          : new Response(JSON.stringify(x), { headers: h });
      } catch (z: any) {
        return new Response(
          JSON.stringify({ error: z?.message || String(z) }),
          { status: 500, headers: h },
        );
      }
    }
    return v2.fetch(req, e as any);
  },
};
