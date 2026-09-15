# Wittnauer 10WA — Deep Dive Draft

Status: DRAFT / NOT PUBLISHED

Scope: `WITTNAUER_10WA_SCOPE_LOCK_2026-09-15.md` に従い、記事価値のある3論点だけで構成する。

- Q1: Cal.10WA の時刻側ベースは Longines か、AS1200 / Wittnauer 10S 系か
- Q2: CH304088A / Marcel Bliss と Wittnauer Cal.10WA を直接結ぶ証拠はあるか
- Q3: CH304088A の slipping bridle を量産10WAが実装したか

キャッチコピー、OWNER'S NOTE、画像構成、公開設定はこのドラフトでは変更しない。

---

## Proposed Deep Dive

### 01 — ベゼルで巻く、モジュール式アラーム

Wittnauer Cal.10WAの最大の特徴は、アラームをリューズではなく**回転ベゼルで操作する**ことにある。

Horlbeckは10WAを、時刻機構とアラーム機構が機能的に独立した「真正のモジュール式キャリバー」と説明している。時刻側は通常の手巻きで、アラーム側には独立した香箱を備える。アラーム時刻を合わせるにはベゼルを反時計回りへ回す。この同じ操作でアラーム用ゼンマイも巻き上げられる。

つまり10WAでは、**「アラーム時刻を合わせる」と「アラームの動力を巻く」が一つの操作にまとめられている。** 二つのリューズを使い分ける方式が一般的だった機械式アラーム腕時計の中で、これはかなり異質な設計だった。

Horlbeckの記録では17石、18,000振動／時、2香箱、時刻側のパワーリザーブは約40時間、アラーム鳴動は約5〜7秒とされる。

**Article status:** `ADOPTED`

Sources: [1], [2]

---

### 02 — 1952年、ほとんど同じ構造が特許に現れる

10WAを調べると避けて通れないのが、スイス特許 **CH304088A** である。

この特許はMarcel Bliss名義で1952年12月4日に出願され、1954年12月31日に公開された。請求項では、通常の時計ムーブメントとは別に、文字盤側へ独立したアラーム機構を載せる構成が示されている。さらに、回転ベゼルとガラスが内歯リングを動かしてアラーム香箱を巻き、同じ回転操作をアラーム時刻設定にも使う構成まで含まれている。

**独立した文字盤側モジュール、専用プレート、ベゼルによるアラーム巻上げ、同じベゼルでの時刻設定。** 10WAの量産構造と重なる核心部分は多い。

ただし、ここで線を引く必要がある。現在確認できる特許書誌では、発明者・原出願人はMarcel Blissで、Wittnauerの名は出てこない。譲渡、ライセンス、供給契約、共同開発など、CH304088AからWittnauerへ技術が渡ったことを示す直接資料も確認できていない。

したがって現時点で言えるのは、**CH304088AとCal.10WAには非常に強い構造的一致がある**ということまでであり、「CH304088Aは10WAの特許だった」「Wittnauerがこの特許をライセンスした」とは断定できない。

**Article status:** `STRONG structural correspondence / OPEN legal-commercial bridge`

Source: [3]

---

### 03 — 特許にはあった「満巻き後の逃げ」

CH304088Aには、量産10WAとの比較でさらに興味深い一節がある。

従属請求項6では、アラーム香箱のゼンマイを **slipping bridle（滑りブライドル）** とする構成が示されている。これは、アラームゼンマイが満巻きになった後でもベゼルを回し続け、アラーム時刻の設定自由度を保つための解決策として説明されている。

ところがHorlbeckが記録した量産10WAの挙動は異なる。アラーム側はベゼル約1.5回転で満巻きになり、その時点でベゼルが止まる。さらに無理に回すと、アラーム伝達輪の歯を損傷する危険があるという。

ここには、**特許案と量産品の明確な“挙動の差”**がある。

ただし、量産10WAのアラーム香箱内部を直接確認したサービス図や分解資料はまだ得られていない。したがって「Wittnauerはslipping bridleを省いた」とは書けない。確認できているのは、特許が満巻き後の設定自由度を確保する案を持つ一方、量産10WAにはHorlbeckが記録したハードストップが存在することまでである。

**Article status:** `ADOPTED patent fact / ADOPTED production behavior / OPEN internal barrel construction`

Sources: [1], [3]

---

### 04 — ベースムーブメントはLonginesなのか、AS1200なのか

10WAの時刻側ベースについては、資料が食い違っている。

Horlbeckは10WAを「手巻きLonginesキャリバーをベースに、Wittnauerがアラームモジュールを載せたもの」と明記している。Beitlも同様に `Longines-Basiskaliber` と記載する。後世の主要専門書二冊は、揃ってLongines説を採っている。

一方、1966年の *C. & E. Marshall Handy Manual* では、Wittnauer **10S** と **10WA** が、時刻側について同じサービス部品番号を共有する。主ゼンマイ `WIT3245`、天真 `WIT679`、巻真 `WIT158L`、振り座 `WIT89`、アンクル真 `WIT573` が一致し、10WAにはそれとは別にアラーム用ゼンマイ `WIT5102` が追加されている。

さらに1969年のAmerican Watchmakers Institute Technical Bulletinは、Wittnauer **10Sを明記して `AS 1200` として扱っている。**

この二資料を組み合わせると、10WAの時刻側がWittnauer 10S / AS1200系と非常に近い、あるいは同系統であることを強く示す。ただしMarshallは「10WA = AS1200」と直接記述しているわけではないため、ここでも最後の一段は残る。

現時点の結論は、**当時に近いサービス資料はAS1200 / Wittnauer 10S系を強く指す。一方でHorlbeckとBeitlはLonginesベースと明記しており、資料衝突は未解消**、である。

これは多数決で消してよい矛盾ではない。むしろ10WA研究の現在地として、そのまま残すべきポイントである。

**Article status:** `STRONG AS1200/10S-family evidence / CONFLICT with Horlbeck-Beitl Longines attribution`

Sources: [1], [2], [4], [5]

---

### 05 — 10WAは「変な時計」ではなく、過渡期の独自解だった

Beitlは10WAをWittnauer最初のアラームモデルとして、1950年代前半に生産されたと記している。同じWittnauerの項では、AS 1475を搭載した1955年の個体を「ASキャリバーを搭載した最初期のモデルの一つ」として掲載している。

この二つを並べると、10WAは、メーカー独自のアラーム機構と、ASのような量産アラームエボーシュが近接して存在した時期に現れたことが分かる。

ただし、ここから「AS 1475が登場したから10WAが廃止された」と因果をつなぐ資料はない。10WAの故障リスク、コスト、部品供給、販売成績のどれが後継選択を決めたのかも、現時点では一次資料で確定できない。

だから10WAを「失敗作だったから消えた時計」と片付けるのは早い。

現時点で確実に言えるのは、**Wittnauerが1950年代前半、通常のリューズ操作とは別の答えとして、ベゼル一つにアラーム時刻設定と巻上げをまとめた独自のモジュール式アラームを製品化した**こと。そして、その直後のWittnauer製アラームにはAS系キャリバーが現れることまでである。

10WAは、標準解が固まる前に現れた、短命だが極めて個性的な一つの回答だった。

**Article status:** `ADOPTED chronology / HOLD causal explanation`

Source: [2]

---

## Suggested final note / unresolved box

### まだ分かっていないこと

- **時刻側ベース** — サービス資料はAS1200 / 10S系を強く示すが、Horlbeck / BeitlのLongines説と衝突している。
- **CH304088Aとの関係** — 核心構造は非常に近いが、Wittnauerへの譲渡・ライセンス・技術移転を示す直接資料は未発見。
- **slipping bridle** — 特許には存在するが、量産10WAの香箱内部で実装されたかは未確認。量産品の実際の挙動は、満巻き後にベゼルが止まる。

この3点は、解決していないから削るのではなく、現状の研究結果として明示する。

---

## Site-format candidate (`deepDive` only)

```yaml
deepDive:
  - number: "01"
    title: "ベゼルで巻く、モジュール式アラーム"
    paragraphs:
      - "Wittnauer Cal.10WAの最大の特徴は、アラームをリューズではなく回転ベゼルで操作することにある。Horlbeckは10WAを、時刻機構とアラーム機構が機能的に独立した真正のモジュール式キャリバーと説明している。時刻側は通常の手巻きで、アラーム側には独立した香箱を備える。"
      - "アラーム時刻を合わせるにはベゼルを反時計回りへ回す。この同じ操作でアラーム用ゼンマイも巻き上げられる。つまり10WAでは、『アラーム時刻を合わせる』と『アラームの動力を巻く』が一つの操作にまとめられている。"
    citationRefs:
      - "1,2"
      - "1,2"

  - number: "02"
    title: "1952年、ほとんど同じ構造が特許に現れる"
    paragraphs:
      - "スイス特許CH304088AはMarcel Bliss名義で1952年12月4日に出願され、1954年12月31日に公開された。通常の時計ムーブメントとは別に文字盤側へ独立したアラーム機構を載せ、回転ベゼルからアラーム香箱を巻き、同じ操作をアラーム時刻設定にも使う構成が示されている。"
      - "独立した文字盤側モジュール、専用プレート、ベゼルによる巻上げ、同じベゼルでの時刻設定という核心部分は量産10WAと非常によく重なる。ただし、現在確認できる特許書誌にWittnauerの名はなく、譲渡・ライセンス・技術移転を示す直接資料も確認できていない。"
    citationRefs:
      - "3"
      - "3"

  - number: "03"
    title: "特許にはあった『満巻き後の逃げ』"
    paragraphs:
      - "CH304088Aの従属請求項6では、アラーム香箱のゼンマイをslipping bridleとする構成が示されている。これは、アラームゼンマイが満巻きになった後でもアラーム時刻の設定自由度を保つための解決策として説明されている。"
      - "一方、Horlbeckが記録した量産10WAでは、アラーム側はベゼル約1.5回転で満巻きになり、その時点でベゼルが止まる。さらに無理に回すと伝達輪の歯を損傷する危険がある。特許案と量産品には、少なくとも挙動の差がある。"
      - "ただし、量産10WAのアラーム香箱内部を直接確認した資料はまだ得られていない。したがって、Wittnauerがslipping bridleを省いたとは断定できない。"
    citationRefs:
      - "3"
      - "1"
      - "1,3"

  - number: "04"
    title: "Longinesなのか、AS1200なのか"
    paragraphs:
      - "Horlbeckは10WAを手巻きLonginesキャリバーをベースにしたモジュール式アラームと明記し、BeitlもLongines-Basiskaliberと記載する。"
      - "一方、1966年のC. & E. Marshall Handy Manualでは、Wittnauer 10Sと10WAが時刻側で主ゼンマイWIT3245、天真WIT679、巻真WIT158L、振り座WIT89、アンクル真WIT573を共有し、10WAには別にアラーム用ゼンマイWIT5102が追加されている。1969年のAmerican Watchmakers Institute Technical BulletinはWittnauer 10SをAS 1200と明記する。"
      - "したがって当時に近いサービス資料はAS1200 / Wittnauer 10S系を強く指す。ただしMarshallは10WA = AS1200と直接は記しておらず、Horlbeck / BeitlのLongines説との資料衝突は残る。"
    citationRefs:
      - "1,2"
      - "4,5"
      - "1,2,4,5"

  - number: "05"
    title: "過渡期に現れた独自解"
    paragraphs:
      - "Beitlは10WAをWittnauer最初のアラームモデルとして1950年代前半に生産されたと記し、同じ項でAS 1475を搭載した1955年の個体をASキャリバー搭載の最初期モデルの一つとして掲載している。"
      - "ここから、AS 1475の登場が10WA廃止の原因だったとまでは言えない。ただ、10WAがメーカー独自のモジュール式アラームと量産アラームエボーシュが近接して存在した時期に現れたことは確認できる。"
      - "10WAは『失敗作だから消えた時計』ではなく、標準解が固まる前にWittnauerが出した、短命だが極めて個性的な一つの回答として見る方が現在の証拠に合っている。"
    citationRefs:
      - "2"
      - "2"
      - "2"
```

## Source candidates

```yaml
sourceMeta:
  - id: "1"
    type: reference
  - id: "2"
    type: reference
  - id: "3"
    type: primary
  - id: "4"
    type: reference
  - id: "5"
    type: primary

sources:
  - "Michael Philip Horlbeck, The Alarm Wristwatch (Schiffer Publishing, 2007), pp.152–153（Wittnauer Cal.10WAの構造・操作・満巻き時の停止と歯欠けリスク）"
  - "Leonhard Beitl, Alarm am Arm (2009), pp.499–500, movement table p.629（Wittnauer 10WA、Longines-Basiskaliber、1950年代前半、1955年AS1475搭載例）"
  - "Swiss Patent CH304088A, Marcel Bliss, filed 1952-12-04, published 1954-12-31（文字盤側独立アラームモジュール、回転ベゼルによる巻上げ＋設定、slipping bridle） https://patents.google.com/patent/CH304088A/en"
  - "C. & E. Marshall, Handy Manual of Watch and Clock Repairs / Name and Caliber List, 1966（Wittnauer 10S / 10WAの時刻側サービス部品番号と10WAの追加アラーム用ゼンマイ） https://www.phfactor.net/wtf/Marshall%20Handy%20Manual/Marshall%202.pdf"
  - "American Watchmakers Institute Technical Bulletin, October 1969（Wittnauer 10S = AS 1200） https://www.awci.com/wp-content/uploads/2018/01/10-1969-AWI-News.pdf"
```

## Editorial guardrails

- `CH304088A = Wittnauer patent` と書かない。
- `10WA = AS1200` を確定表現にしない。現段階は「サービス資料がAS1200 / 10S系を強く指す」。
- `slipping bridleを量産時に省略した` と書かない。量産香箱内部は未確認。
- `壊れやすかったから廃止された` と書かない。
- `AS1475登場で10WAが経済合理性を失った` と断定しない。
- 未解決3点は弱点ではなく、研究結果として明示する。
