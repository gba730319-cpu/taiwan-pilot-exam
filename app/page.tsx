"use client";
import { useMemo, useState } from "react";
import questions from "../data/questions.json";
import sourceData from "../data/sources.json";
import answerData from "../data/answers.json";
import additionalAnswerData from "../data/answers-new.json";
import common091Shiphandling from "../data/answers-common-091-shiphandling.json";
import common091Pivot from "../data/answers-common-091-pivot.json";

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
type Answer = { questionId: string; modelAnswer: string; };
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
  const answers = [...(answerData as Answer[]), ...(additionalAnswerData as Answer[]), ...(common091Shiphandling as Answer[]), ...(common091Pivot as Answer[])];
  const answerByQuestionId = useMemo(() => new Map(answers.map((a) => [a.questionId, a] as const)), [answers]);
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
                  <section className="answer">
                    <h3>參考答案</h3>
                    <p>{answer.modelAnswer}</p>
                  </section>
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
