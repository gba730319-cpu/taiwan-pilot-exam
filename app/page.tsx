"use client";

import answer104 from "../data/answers-104.json";

import answer106 from "../data/answers-106.json";

import answer108 from "../data/answers-108.json";
import answer110 from "../data/answers-110.json";
import answer114Kaohsiung07 from "../data/answers-common-114-kaohsiung-waterway-07.json";
import answer114Kaohsiung06 from "../data/answers-common-114-kaohsiung-waterway-06.json";
import answer114Kaohsiung05 from "../data/answers-common-114-kaohsiung-waterway-05.json";
import answer114Kaohsiung04 from "../data/answers-common-114-kaohsiung-waterway-04.json";
import answer114Kaohsiung03 from "../data/answers-common-114-kaohsiung-waterway-03.json";
import answer114Kaohsiung02 from "../data/answers-common-114-kaohsiung-waterway-02.json";
import answer114Kaohsiung01 from "../data/answers-common-114-kaohsiung-waterway-01.json";
import answer114Pilotage05 from "../data/answers-common-114-pilotage-05.json";
import answer114Pilotage04 from "../data/answers-common-114-pilotage-04.json";
import answer114Pilotage03 from "../data/answers-common-114-pilotage-03.json";
import answer114Pilotage02 from "../data/answers-common-114-pilotage-02.json";
import answer114Pilotage01 from "../data/answers-common-114-pilotage-01.json";

import { useMemo, useState } from "react";
import questions from "../data/questions.json";
import sourceData from "../data/sources.json";
import answerData from "../data/answers.json";
import additionalAnswerData from "../data/answers-new.json";
import common091Shiphandling from "../data/answers-common-091-shiphandling.json";
import common091Shiphandling01 from "../data/answers-common-091-shiphandling-01.json";
import common091Pivot from "../data/answers-common-091-pivot.json";
import common091MassFroude from "../data/answers-common-091-mass-froude.json";
import common091WakeCurrent from "../data/answers-common-091-wake-current.json";
import common091SideThruster from "../data/answers-common-091-side-thruster.json";
import common091Pilotage01 from "../data/answers-common-091-pilotage-01.json";
import common091Pilotage from "../data/answers-common-091-pilotage.json";
import common091Pilotage06 from "../data/answers-common-091-pilotage-06.json";
import common091PilotLaw from "../data/answers-common-091-pilot-law.json";
import common091English from "../data/answers-common-091-english.json";
import common092Shiphandling from "../data/answers-common-092-shiphandling.json";
import common092PilotLaw from "../data/answers-common-092-pilot-law.json";
import common092Pilotage from "../data/answers-common-092-pilotage.json";
import common092English from "../data/answers-common-092-english.json";
import common094PilotLaw from "../data/answers-common-094-pilot-law.json";
import common094Pilotage from "../data/answers-common-094-pilotage.json";
import common094Pilotage0102 from "../data/answers-common-094-pilotage-01-02.json";
import common094Pilotage04 from "../data/answers-common-094-pilotage-04.json";
import common094Pilotage05 from "../data/answers-common-094-pilotage-05.json";
import common094Pilotage06 from "../data/answers-common-094-pilotage-06.json";
import common094Shiphandling01 from "../data/answers-common-094-shiphandling-01.json";
import common094Shiphandling02 from "../data/answers-common-094-shiphandling-02.json";
import common094Shiphandling03 from "../data/answers-common-094-shiphandling-03.json";
import common094Shiphandling04 from "../data/answers-common-094-shiphandling-04.json";
import common094Shiphandling05 from "../data/answers-common-094-shiphandling-05.json";
import common094Shiphandling06 from "../data/answers-common-094-shiphandling-06.json";
import common094English from "../data/answers-common-094-english.json";
import common096PilotLaw from "../data/answers-common-096-pilot-law.json";
import common096Pilotage from "../data/answers-common-096-pilotage.json";
import common096Shiphandling from "../data/answers-common-096-shiphandling.json";
import common096English from "../data/answers-common-096-english.json";
import common098Kaohsiung from "../data/answers-common-098-kaohsiung-waterway.json";
import common098PilotLaw from "../data/answers-common-098-pilot-law.json";
import common098English from "../data/answers-common-098-english.json";
import common100PilotLaw from "../data/answers-common-100-pilot-law.json";
import common100Pilotage from "../data/answers-common-100-pilotage.json";
import common100Shiphandling from "../data/answers-common-100-shiphandling.json";
import common100English from "../data/answers-common-100-english.json";
import common100Kaohsiung from "../data/answers-common-100-kaohsiung-waterway.json";
import common102PilotLaw from "../data/answers-common-102-pilot-law.json";
import common102Pilotage from "../data/answers-common-102-pilotage.json";
import common102Shiphandling from "../data/answers-common-102-shiphandling.json";
import common102Kaohsiung from "../data/answers-common-102-kaohsiung-waterway.json";
import common102Shiphandling06 from "../data/answers-common-102-shiphandling-06.json";
import common102English from "../data/answers-common-102-english.json";
import common098Pilotage from "../data/answers-common-098-pilotage.json";
import common098Shiphandling from "../data/answers-common-098-shiphandling.json";
import answer114English01 from "../data/answers-common-114-english-01.json";
import answer114English02 from "../data/answers-common-114-english-02.json";
import answer114English03 from "../data/answers-common-114-english-03.json";
import answer114English04 from "../data/answers-common-114-english-04.json";
import answer114Pilotlaw01 from "../data/answers-common-114-pilot-law-01.json";
import answer114Pilotlaw02 from "../data/answers-common-114-pilot-law-02.json";
import answer114Pilotlaw03 from "../data/answers-common-114-pilot-law-03.json";
import answer114Pilotlaw04 from "../data/answers-common-114-pilot-law-04.json";
import answer114Shiphandling01 from "../data/answers-common-114-shiphandling-01.json";
import answer114Shiphandling02 from "../data/answers-common-114-shiphandling-02.json";
import answer114Shiphandling03 from "../data/answers-common-114-shiphandling-03.json";
import answer114Shiphandling04 from "../data/answers-common-114-shiphandling-04.json";
import answer114Shiphandling05 from "../data/answers-common-114-shiphandling-05.json";
import answer114Shiphandling06 from "../data/answers-common-114-shiphandling-06.json";


type Question = {
  id: string;
  year: number;
  subject: string;
  port: string;
  question: string;
  sourceId: string;
  status: string;
  questionNo: number;
};
type AnswerKeyPoint = { point: string; importance?: string; explanation?: string; };
type AnswerReferenceObject = {
  title?: string;
  url?: string;
  sourceType?: string;
  issuer?: string;
  pageOrSection?: string;
  supports?: string;
  accessedAt?: string;
};
type AnswerReference = string | AnswerReferenceObject;
type Answer = {
  questionId: string;
  modelAnswer: string;
  practicalAnalysis?: string;
  keyPoints?: Array<AnswerKeyPoint | string>;
  references?: AnswerReference[];
  assumptions?: Array<string | AnswerReferenceObject>;
  limitations?: Array<string | AnswerReferenceObject> | string;
  verification?: { status?: string };
};
type Source = {
  id: string;
  exam: string;
  category: string;
  subject: string;
  issuer: string;
  url: string;
};

const subjects = ["全部科目", "當地水道港灣詳情", "航政法規", "引港學", "船舶操縱", "專業英文", "實用英文"];
const ports = ["全部港區", "高雄港", "基隆港", "臺中港", "臺北港", "和平港", "麥寮港", "麥寮工業專用港", "安平港", "蘇澳港", "花蓮港"];
// 正式備考範圍：民國83、84、85、86、87、89、90、91、92、94、96、98、100、102、104、106、108、110、112、114年。
const officialYears = new Set([1994, 1995, 1996, 1997, 1998, 2000, 2001, 2002, 2003, 2005, 2007, 2009, 2011, 2013, 2015, 2017, 2019, 2021, 2023, 2025]);

function rocYear(year: number) {
  return year - 1911;
}

function matchesPort(questionPort: string, selectedPort: string) {
  if (selectedPort === "全部港區") return true;
  if (questionPort === "全港共通" || questionPort === "共通科目") return true;
  const aliases: Record<string, string[]> = {
    "麥寮港": ["麥寮工業專用港"],
    "麥寮工業專用港": ["麥寮港"],
  };
  return questionPort.split("、").some((p) => p === selectedPort || (aliases[selectedPort] || []).includes(p));
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("全部年度");
  const [subject, setSubject] = useState("全部科目");
  const [port, setPort] = useState("高雄港");
  const items = (questions as Question[]).filter((q) => officialYears.has(q.year));
  const sources = sourceData as Source[];
  const answers = [...(answer104 as Answer[]), ...(answer106 as Answer[]), ...(answer108 as Answer[]), ...(answer110 as Answer[]), ...(answerData as Answer[]), ...(additionalAnswerData as Answer[]), ...(common091Shiphandling as Answer[]), ...(common091Shiphandling01 as Answer[]), ...(common091Pivot as Answer[]), ...(common091MassFroude as Answer[]), ...(common091WakeCurrent as Answer[]), ...(common091SideThruster as Answer[]), ...(common091Pilotage01 as Answer[]), ...(common091Pilotage as Answer[]), ...(common091Pilotage06 as Answer[]), ...(common091PilotLaw as Answer[]), ...(common091English as Answer[]), ...(common092Shiphandling as Answer[]), ...(common092PilotLaw as Answer[]), ...(common092Pilotage as Answer[]), ...(common092English as Answer[]), ...(common094PilotLaw as Answer[]), ...(common094Pilotage as Answer[]), ...(common094Pilotage0102 as Answer[]), ...(common094Pilotage04 as Answer[]), ...(common094Pilotage05 as Answer[]), ...(common094Pilotage06 as Answer[]), ...(common094Shiphandling01 as Answer[]), ...(common094Shiphandling02 as Answer[]), ...(common094Shiphandling03 as Answer[]), ...(common094Shiphandling04 as Answer[]), ...(common094Shiphandling05 as Answer[]), ...(common094Shiphandling06 as Answer[]), ...(common094English as Answer[]), ...(common096PilotLaw as Answer[]), ...(common096Pilotage as Answer[]), ...(common096Shiphandling as Answer[]), ...(common096English as Answer[]), ...(common098Kaohsiung as Answer[]), ...(common098PilotLaw as Answer[]), ...(common098English as Answer[]), ...(common100PilotLaw as Answer[]), ...(common100Pilotage as Answer[]), ...(common100Shiphandling as Answer[]), ...(common100English as Answer[]), ...(common100Kaohsiung as Answer[]), ...(common102PilotLaw as Answer[]), ...(common102Pilotage as Answer[]), ...(common102Shiphandling as Answer[]), ...(common102Kaohsiung as Answer[]), ...(common102Shiphandling06 as Answer[]), ...(common102English as Answer[]), ...(common098Pilotage as Answer[]), ...(common098Shiphandling as Answer[]), ...(answer114English01 as Answer[]), ...(answer114English02 as Answer[]), ...(answer114English03 as Answer[]), ...(answer114English04 as Answer[]), ...(answer114Pilotlaw01 as Answer[]), ...(answer114Pilotlaw02 as Answer[]), ...(answer114Pilotlaw03 as Answer[]), ...(answer114Pilotlaw04 as Answer[]), ...(answer114Pilotage05 as Answer[]), ...(answer114Kaohsiung07 as Answer[]), ...(answer114Kaohsiung06 as Answer[]), ...(answer114Kaohsiung05 as Answer[]), ...(answer114Kaohsiung04 as Answer[]), ...(answer114Kaohsiung03 as Answer[]), ...(answer114Kaohsiung02 as Answer[]), ...(answer114Kaohsiung01 as Answer[]), ...(answer114Pilotage04 as Answer[]), ...(answer114Pilotage03 as Answer[]), ...(answer114Pilotage02 as Answer[]), ...(answer114Pilotage01 as Answer[]), ...(answer114Shiphandling01 as Answer[]), ...(answer114Shiphandling02 as Answer[]), ...(answer114Shiphandling03 as Answer[]), ...(answer114Shiphandling04 as Answer[]), ...(answer114Shiphandling05 as Answer[]), ...(answer114Shiphandling06 as Answer[])];
  const normalizedAnswers = answers.map((answer) => {
    const legacyRefs = [
      ...(Array.isArray(answer.assumptions) ? answer.assumptions : []),
      ...(Array.isArray(answer.limitations) ? answer.limitations : []),
    ].filter((item): item is AnswerReferenceObject => typeof item === "object" && item !== null);
    const assumptions = Array.isArray(answer.assumptions)
      ? answer.assumptions.filter((item): item is string => typeof item === "string")
      : [];
    const limitations = Array.isArray(answer.limitations)
      ? answer.limitations.filter((item): item is string => typeof item === "string")
      : typeof answer.limitations === "string" ? [answer.limitations] : [];
    return {
      ...answer,
      keyPoints: Array.isArray(answer.keyPoints) ? answer.keyPoints.map((item) => typeof item === "string" ? { point: item } : item) : [],
      assumptions,
      limitations,
      references: [
        ...(Array.isArray(answer.references) ? answer.references : []),
        ...legacyRefs,
      ],
    };
  });
  const answerByQuestionId = useMemo(() => new Map(normalizedAnswers.map((a) => [a.questionId, a] as const)), [normalizedAnswers]);
  const sourceById = useMemo(() => new Map(sources.map((s) => [s.id, s] as const)), [sources]);
  const years = useMemo(
    () => ["全部年度", ...Array.from(new Set(items.map((q) => String(q.year)))).sort((a, b) => Number(b) - Number(a))],
    [items]
  );
  const filtered = items.filter(
    (q) =>
      (year === "全部年度" || String(q.year) === year) &&
      (subject === "全部科目" || q.subject === subject) &&
      matchesPort(q.port, port) &&
      (!search || q.question.toLowerCase().includes(search.toLowerCase()))
  ).sort((a, b) =>
    b.year - a.year ||
    subjects.indexOf(a.subject) - subjects.indexOf(b.subject) ||
    a.questionNo - b.questionNo
  );

  return (
    <main className="shell">
      <header className="topbar">
        <div className="mark">引</div>
        <div><small>TAIWAN PILOT EXAM</small><b>引水人備考題庫</b></div>
        <span className="port">主港區・高雄港</span>
      </header>
      <section className="hero">
        <small>PILOT EXAM QUESTION BANK</small>
        <h1>把歷屆考題，<br/><em>整理成真正能備考的資料庫。</em></h1>
        <p>依年度、考科與港區查找題目。每道正式歷屆題目都附可追溯的原始來源，可直接開啟考選部原卷核對。</p>
        <div className="stats">
          <div><b>{items.length}</b><span>已匯入題目</span></div>
          <div><b>{new Set(items.map((q) => q.year)).size}</b><span>涵蓋年度</span></div>
          <div><b>高雄港</b><span>主要港區</span></div>
        </div>
      </section>
      <section className="bank">
        <div className="heading">
          <div><small>QUESTION BANK</small><h2>歷屆試題</h2></div>
          <span>{filtered.length} 題</span>
        </div>
        <div className="filters">
          <input placeholder="搜尋題目關鍵字…" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={port} onChange={(e) => setPort(e.target.value)}>
            {ports.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {years.map((y) => <option key={y} value={y}>{y === "全部年度" ? y : `民國${rocYear(Number(y))}年`}</option>)}
          </select>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        {filtered.length === 0 ? (
          <div className="empty">
            <div className="symbol">⌕</div><h3>目前沒有符合條件的題目</h3>
            <p>這個港區與年度尚無已匯入的原卷題目。共通科目會依官方試卷適用港區顯示。</p>
            <small>取得官方試卷 → 核對題目 → 建檔 → 匯入網站</small>
          </div>
        ) : (
          <div>{filtered.map((q) => {
            const source = sourceById.get(q.sourceId);
            const answer = answerByQuestionId.get(q.id);
            return (
              <article className="question" key={q.id}>
                <small className="question-meta">民國{rocYear(q.year)}年・{q.subject}・{q.port}・第 {q.questionNo} 題</small>
                <p>{q.question}</p>
                {source?.url ? (
                  <div className="source-link">
                    <a href={source.url} target="_blank" rel="noreferrer">查看考選部原卷 PDF ↗</a>
                    <span>{source.exam}</span>
                  </div>
                ) : (
                  <div className="source-link missing">原卷來源待補登</div>
                )}
                {answer ? (
                  <details className="answer">
                    <summary>參考答案（點擊展開／收合）</summary>
                    <div className="answer-content">
                      <section className="answer-section">
                        <h3>參考擬答</h3>
                        <p>{answer.modelAnswer}</p>
                      </section>
                      {answer.practicalAnalysis ? (
                        <section className="answer-section">
                          <h3>解題分析與作答策略</h3>
                          <p>{answer.practicalAnalysis}</p>
                        </section>
                      ) : null}
                      {Array.isArray(answer.keyPoints) && answer.keyPoints.length ? (
                        <section className="answer-section">
                          <h3>得分關鍵</h3>
                          <ol className="answer-keypoints">
                            {answer.keyPoints.map((item, index) => (
                              <li key={index}>
                                <b>{item.point}</b>
                                {item.explanation ? <p>{item.explanation}</p> : null}
                              </li>
                            ))}
                          </ol>
                        </section>
                      ) : null}
                      {Array.isArray(answer.assumptions) && answer.assumptions.length ? (
                        <section className="answer-section">
                          <h3>計算假設</h3>
                          <ul>{answer.assumptions.map((item, index) => <li key={index}>{item}</li>)}</ul>
                        </section>
                      ) : null}
                      {Array.isArray(answer.limitations) && answer.limitations.length ? (
                        <section className="answer-section">
                          <h3>適用限制與注意事項</h3>
                          <ul>{answer.limitations.map((item, index) => <li key={index}>{item}</li>)}</ul>
                        </section>
                      ) : null}
                      {Array.isArray(answer.references) && answer.references.length ? (
                        <section className="answer-section">
                          <h3>參考資料</h3>
                          <ol className="answer-references">
                            {answer.references.map((item, index) => (
                              <li key={index}>
                                {typeof item === "string" ? item : (
                                  <>
                                    {item.url ? <a href={item.url} target="_blank" rel="noreferrer">{item.title || item.url}</a> : item.title}
                                    {item.issuer ? `｜${item.issuer}` : ""}
                                    {item.pageOrSection ? `（${item.pageOrSection}）` : ""}
                                    {item.supports ? <span> — {item.supports}</span> : null}
                                  </>
                                )}
                              </li>
                            ))}
                          </ol>
                        </section>
                      ) : null}
                      {answer.verification?.status ? (
                        <div className="answer-status">資料查核狀態：{answer.verification.status === "source_checked" ? "已完成來源核對" : answer.verification.status}</div>
                      ) : null}
                    </div>
                  </details>
                ) : null}
              </article>
            );
          })}</div>
        )}
      </section>
      <footer>本平台為備考整理工具；正式考題以主管機關公布之原始試卷為準。</footer>
    </main>
  );
}
