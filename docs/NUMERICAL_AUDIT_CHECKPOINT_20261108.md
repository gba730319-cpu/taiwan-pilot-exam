# 船舶操縱數值題複核工作紀錄（2026-11-08）

## 本次接續複核範圍

本次依 GitHub main 現有題目與答案檔核對，並非重做年度第一輪複核。數值均保留題目假設，不把簡化模型包裝成實船保證值。

### 1. 民國86年船舶操縱第6題：正橫潮流作用力

- 題目ID：`086-shiphandling-06`。
- **年度校正：**此題實際為民國86年，不是先前交接摘要誤記的85年；85年船舶操縱第6題是Froude數與Squat。
- 公式：`C = f × L × d × V²`；C以short tons（美制短噸力）表示，L、d採ft，V採kn。
- 壓艙吃水21 ft，水深／吃水比46/21=2.19，答案依教材級距近似採f=0.0018；精算為29.862、119.448、268.758 short tons，約30、120、270 short tons。
- 滿載吃水42 ft，水深／吃水比46/42=1.095，採f=0.0036；精算為119.448、477.792、1,075.032 short tons，約120、480、1,075 short tons。
- 流速加倍，作用力依V²增為四倍。壓艙狀態的f係數是級距近似，未取得更細緻係數曲線，不自行內插。
- **狀態維持 source_checked**；答案已列明係數級距與short ton單位限制。

### 2. 民國98年船舶操縱第1、3題：舵面積與IMO操縱標準

- 題目ID：`98-shiphandling-01`、`98-shiphandling-03`。
- 第1題依舵板位於螺槳正後方之DNV經驗式：
  `A_R = (T × LBP / 100) × [1 + 25(B/LBP)²]`。
  代入T=9m、LBP=150m、B=26m，得A_R=23.64m²。GRT不直接代入此式；題幹「設計水深」按設計吃水解讀，仍保留原文用語的待確認提醒。此式屬初步經驗估算，不是所有船型通用的法定最低舵面積。
- 第3題核對IMO Resolution MSC.137(76)：旋回進距≤4.5L、戰術直徑≤5L；10°舵角使艏向改變10°前航跡≤2.5L；Z字試驗超越角依L/V分段；全速倒車停止track reach≤15L，大型船經主管機關調整亦不得超過20L。
- 重要日期釐清：MSC.137(76)於2002-12-04通過並取代A.751(18)；1994-07-01屬早期A.751(18)歷史背景，不能寫成MSC.137(76)通過日期。
- **兩題維持 source_checked**；標準試驗的深水、平靜、滿載正浮等條件，不可誤當成各種港內風流與載況下的實船保證性能。

### 3. 民國112年船舶操縱第1題：Flare／Overhang幾何

- 題目ID：`112-shiphandling-01`。
- LOA=210m，平行船殼段=52m；在艏艉外飄段對稱分配的假設下，每端長度=(210−52)/2=79m。
- 若2°為船身與碼頭法線的夾角，橫向投影=79×sin2°=2.756m，約2.76m。
- 考選部原卷PDF第2-1頁第1題未附示意圖；目前答案已揭露角度基準及對稱分配假設，並提醒實船外飄線型應以GA／型線圖及岸橋配置圖核對。
- **狀態維持 partially_verified**：題目角度基準及個船外飄／岸橋淨空仍需個別資料，不能把2.76m當作所有船型的實際伸入距離。

## 本批結論

- 本次核對未發現上述題目現有算術需立即更正之處。
- 已修正工作交接上的年度辨識：正橫潮流力數值題是86年第6題；85年第6題為Froude／Squat。
- 不因公式重算或跨年度比對自動升級任何驗證狀態。
- 下一步：完成全題庫船舶操縱數值題索引，逐題列出已知條件、公式、單位、假設、計算結果及待查核原因；優先處理停止距離、拖力、風壓、Squat、潮流偏流角及原卷圖示題。

## 主要來源

- IMO Resolution MSC.137(76)：https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.137%2876%29.pdf
- DNV舵面積公式之學術回顧（Sixty years of research on ship rudders）：https://doi.org/10.1080/17445302.2016.1178205
- 民國112年官方原卷（船舶操縱）：https://wwwq.moex.gov.tw/exam/wHandExamQandA_File.ashx?c=503&code=112060&q=1&s=0909&t=Q


### 4. 民國85年船舶操縱第7題：半速倒俥、倒俥力及停止距離

- 題目ID：`085-shiphandling-07`。
- 現有答案代入9628 BHP、110 rpm及半速50 rpm，依題目簡化的 `P∝n³` 得904.2 BHP；再以3 kn=1.543 m/s及 `P=F×V` 換算，得約43.94 tf；以排水量17,101 t及固定制動力作功—能計算，停止距離約47.3m。
- **算術重算相符**：上述換算在題目假設下沒有發現算術錯誤。
- **關鍵限制仍須保留**：由額定／前進工況的BHP與RPM三次方比例，推估倒俥50 rpm的有效制動功率，並非通用的螺槳倒俥特性；倒俥時螺槳負荷、進速、主機反應及推力曲線可能不同。再把推力視為全程固定，也只是理想化停止距離模型。
- **狀態維持 partially_verified**；不得將47.3m當作實船靠泊或緊急停船保證距離。應以本船Manoeuvring Booklet、倒俥曲線及海試資料為準。

### 5. 民國100年船舶操縱第1題：側向附加質量及拖船制動力

- 題目ID：`100-shiphandling-01`。
- 已知排水量70,000t、船寬32.2m、吃水12.2m、側向速度1kn、制動距離30m。
- Vasco Costa側向附加質量係數：`C_m=1+2T/B=1.7578`；等效質量約123,043t。
- 由 `a=V²/(2s)` 及 `F=M_ea`，換算所需平均反向側力約55.3tf，約542.5kN。**重新核算與現有答案一致。**
- 方法適用條件須明確：底部淨空至少約0.1T，靠泊速度至少0.08m/s；本題1kn符合速度條件，但題目「水深足夠」仍應理解為實際UKC符合方法條件，而非僅憑文字宣稱深水。
- **重要模型限制**：55.3tf是船舶側向平移、附加質量及恆定反向力的理想化計算，不是拖船選型或實際最低Bollard Pull。拖纜角度、拖船建立推力時間、施力點偏心造成的偏航、流場及實際拖船可用推力均未納入。
- **狀態維持 source_checked**（公式來源及算術已核對）；答案中的55.3tf只能作題設模型結果，不可視為實務拖船保證值。

### 6. 既有題目來源交叉確認

- 民國98年第1題舵面積公式：本次另查得船舶水動力教材對DNV 1975經驗式及「舵位於螺槳正後方」的適用限制有明確說明；非位於螺槳後方時，原DNV經驗建議至少增加30%。原答案已列出此限制及23.64m²算式，算術無誤。仍須注意這是初步設計經驗式，不是法定通用最低值。
- 民國112年第1題Flare／Overhang：重新檢視原卷未附該題示意圖的限制，79×sin2°=2.756m的算術正確；不對稱外飄或角度基準不同時，不能沿用此數值。
- 民國100年第1題Vasco Costa方法的適用條件，與Trelleborg Fender Application Design Manual及日本港灣技術指引所列條件一致。

## 本次新增來源

- DNV舵面積經驗式背景教材（Ship Hydromechanics, Rudder Size）：https://home.hvl.no/ansatte/gste/ftp/MarinLab_files/Litteratur/ShipHydromechanics_Intro.pdf
- Trelleborg, Fender Application Design Manual（Vasco Costa側向附加質量及適用條件）：https://www.trelleborg.com/marine-and-infrastructure/-/media/marine-systems/resources/guides-and-design-manual/downloads/fender-application-design-manual.pdf
- 日本港灣技術研究中心，Fender Design Test Guideline（Vasco Costa公式及適用條件）：https://www.cdit.or.jp/en/FenderDesignTestGuideline.pdf
