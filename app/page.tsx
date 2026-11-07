"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

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
import common091Pilotage02 from "../data/answers-common-091-pilotage-02.json";
import common091Pilotage from "../data/answers-common-091-pilotage.json";
import common091Pilotage06 from "../data/answers-common-091-pilotage-06.json";
import common091PilotLaw from "../data/answers-common-091-pilot-law.json";
import common090PilotLaw from "../data/answers-common-090-pilot-law.json";
import common090Pilotage from "../data/answers-common-090-pilotage.json";
import common090Shiphandling from "../data/answers-common-090-shiphandling.json";
import common089PilotLaw from "../data/answers-common-089-pilot-law.json";
import common089Pilotage from "../data/answers-common-089-pilotage.json";
import common089Shiphandling from "../data/answers-common-089-shiphandling.json";
import common089English from "../data/answers-common-089-english.json";
import common083Kaohsiung from "../data/answers-common-083-kaohsiung-waterway.json";
import local083Keelung from "../data/answers-common-083-keelung-waterway.json";
import common083PilotLaw from "../data/answers-common-083-pilot-law.json";
import common083Pilotage from "../data/answers-common-083-pilotage.json";
import common083Shiphandling from "../data/answers-common-083-shiphandling.json";
import common083English from "../data/answers-common-083-english.json";
import common084PilotLaw from "../data/answers-common-084-pilot-law.json";
import common084Pilotage from "../data/answers-common-084-pilotage.json";
import common084Shiphandling from "../data/answers-common-084-shiphandling.json";
import common084English from "../data/answers-common-084-english.json";
import local084Taichung from "../data/answers-common-084-taichung-waterway.json";
import common085PilotLaw from "../data/answers-common-085-pilot-law.json";
import common085Pilotage from "../data/answers-common-085-pilotage.json";
import common085Shiphandling from "../data/answers-common-085-shiphandling.json";
import common085English from "../data/answers-common-085-english.json";
import local085Mailiao from "../data/answers-common-085-mailiao-waterway.json";
import common086Kaohsiung from "../data/answers-common-086-kaohsiung-waterway.json";
import common086PilotLaw from "../data/answers-common-086-pilot-law.json";
import common086Pilotage from "../data/answers-common-086-pilotage.json";
import common086Shiphandling from "../data/answers-common-086-shiphandling.json";
import common086English from "../data/answers-common-086-english.json";
import local086TaichungAnping from "../data/answers-local-086-taichung-anping-waterway.json";
import common087PilotLaw from "../data/answers-common-087-pilot-law.json";
import common087Pilotage from "../data/answers-common-087-pilotage.json";
import common087Shiphandling from "../data/answers-common-087-shiphandling.json";
import common087English from "../data/answers-common-087-english.json";
import common087Kaohsiung from "../data/answers-common-087-kaohsiung-waterway.json";
import local087Taichung from "../data/answers-local-087-taichung-waterway.json";
import common089Kaohsiung from "../data/answers-common-089-kaohsiung-waterway.json";
import common090English from "../data/answers-common-090-english.json";
import common091English from "../data/answers-common-091-english.json";
import common091Kaohsiung from "../data/answers-common-091-kaohsiung-waterway.json";
import common092Shiphandling from "../data/answers-common-092-shiphandling.json";
import common092PilotLaw from "../data/answers-common-092-pilot-law.json";
import common092Pilotage from "../data/answers-common-092-pilotage.json";
import common092English from "../data/answers-common-092-english.json";
import common092Kaohsiung from "../data/answers-common-092-kaohsiung-waterway.json";
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
import common094Kaohsiung from "../data/answers-common-094-kaohsiung-waterway.json";
import common096Kaohsiung from "../data/answers-common-096-kaohsiung-waterway.json";
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
import common112English01 from "../data/answers-common-112-english-01.json";
import common112English02 from "../data/answers-common-112-english-02.json";
import common112English03 from "../data/answers-common-112-english-03.json";
import common112English04 from "../data/answers-common-112-english-04.json";
import common112PilotLaw01 from "../data/answers-common-112-pilot-law-01.json";
import common112PilotLaw02 from "../data/answers-common-112-pilot-law-02.json";
import common112PilotLaw03 from "../data/answers-common-112-pilot-law-03.json";
import common112PilotLaw04 from "../data/answers-common-112-pilot-law-04.json";
import common112Pilotage01 from "../data/answers-common-112-pilotage-01.json";
import common112Pilotage02 from "../data/answers-common-112-pilotage-02.json";
import common112Pilotage03 from "../data/answers-common-112-pilotage-03.json";
import common112Pilotage04 from "../data/answers-common-112-pilotage-04.json";
import common112Shiphandling01 from "../data/answers-common-112-shiphandling-01.json";
import common112Shiphandling02 from "../data/answers-common-112-shiphandling-02.json";
import common112Shiphandling03 from "../data/answers-common-112-shiphandling-03.json";
import common112Shiphandling04 from "../data/answers-common-112-shiphandling-04.json";
import common112Shiphandling05 from "../data/answers-common-112-shiphandling-05.json";
import common112Shiphandling06 from "../data/answers-common-112-shiphandling-06.json";
import local112Kaohsiung01 from "../data/answers-local-112-kaohsiung-waterway-01.json";
import local112Kaohsiung02 from "../data/answers-local-112-kaohsiung-waterway-02.json";
import local112Kaohsiung03 from "../data/answers-local-112-kaohsiung-waterway-03.json";
import local112Kaohsiung04 from "../data/answers-local-112-kaohsiung-waterway-04.json";
import local112Kaohsiung05 from "../data/answers-local-112-kaohsiung-waterway-05.json";
import local112Kaohsiung06 from "../data/answers-local-112-kaohsiung-waterway-06.json";
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

function normalizeAnswerMarkdown(value: string) {
  // Keep display math as block math; inline delimiters remain inline.
  return value
    .replaceAll("\\[", () => "$" + "$")
    .replaceAll("\\]", () => "$" + "$")
    .replaceAll("\\(", () => "$")
    .replaceAll("\\)", () => "$");
}

function verificationStatusLabel(status: string) {
  const labels: Record<string, string> = {
    source_checked: "已完成來源核對",
    calculation_checked: "計算已複核",
    partially_verified: "部分核對，仍有項目待查",
    needs_review: "待複核",
    draft: "草稿，尚未完成查核",
  };
  return labels[status] || status;
}

const subjects = ["全部科目", "當地水道港灣詳情", "航政法規", "引港學", "船舶操縱", "專業英文", "實用英文"];
const ports = ["高雄港"];
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
  const [hasOpenAnswer, setHasOpenAnswer] = useState(false);
  const [expandedAnswers, setExpandedAnswers] = useState<Record<string, boolean>>({});
  const closeOpenAnswers = () => {
    document.querySelectorAll<HTMLDetailsElement>(".answer[open]").forEach((element) => {
      element.open = false;
    });
    setHasOpenAnswer(false);
    setExpandedAnswers({});
  };
  const items = (questions as Question[]).filter((q) => officialYears.has(q.year) && matchesPort(q.port, "高雄港"));
  const sources = sourceData as Source[];
  const answers = [...(answer104 as Answer[]), ...(answer106 as Answer[]), ...(answer108 as Answer[]), ...(answer110 as Answer[]), ...(answerData as Answer[]), ...(additionalAnswerData as Answer[]), ...(common090PilotLaw as Answer[]), ...(common090Pilotage as Answer[]), ...(common090Shiphandling as Answer[]), ...(common089PilotLaw as Answer[]), ...(common089Pilotage as Answer[]), ...(common089Shiphandling as Answer[]), ...(common089English as Answer[]), ...(common083Kaohsiung as Answer[]), ...(local083Keelung as Answer[]), ...(common083PilotLaw as Answer[]), ...(common083Pilotage as Answer[]), ...(common083Shiphandling as Answer[]), ...(common083English as Answer[]), ...(common084PilotLaw as Answer[]), ...(common084Pilotage as Answer[]), ...(common084Shiphandling as Answer[]), ...(common084English as Answer[]), ...(local084Taichung as Answer[]), ...(common085PilotLaw as Answer[]), ...(common085Pilotage as Answer[]), ...(common085Shiphandling as Answer[]), ...(common085English as Answer[]), ...(local085Mailiao as Answer[]), ...(common086Kaohsiung as Answer[]), ...(common086PilotLaw as Answer[]), ...(common086Pilotage as Answer[]), ...(common086Shiphandling as Answer[]), ...(common086English as Answer[]), ...(local086TaichungAnping as Answer[]), ...(common087PilotLaw as Answer[]), ...(common087Pilotage as Answer[]), ...(common087Shiphandling as Answer[]), ...(common087English as Answer[]), ...(common087Kaohsiung as Answer[]), ...(local087Taichung as Answer[]), ...(common089Kaohsiung as Answer[]), ...(common090English as Answer[]), ...(common091Shiphandling as Answer[]), ...(common091Shiphandling01 as Answer[]), ...(common091Pivot as Answer[]), ...(common091MassFroude as Answer[]), ...(common091WakeCurrent as Answer[]), ...(common091SideThruster as Answer[]), ...(common091Pilotage01 as Answer[]), ...(common091Pilotage02 as Answer[]), ...(common091Pilotage as Answer[]), ...(common091Pilotage06 as Answer[]), ...(common091PilotLaw as Answer[]), ...(common091English as Answer[]), ...(common091Kaohsiung as Answer[]), ...(common092Shiphandling as Answer[]), ...(common092PilotLaw as Answer[]), ...(common092Pilotage as Answer[]), ...(common092English as Answer[]), ...(common092Kaohsiung as Answer[]), ...(common094PilotLaw as Answer[]), ...(common094Pilotage as Answer[]), ...(common094Pilotage0102 as Answer[]), ...(common094Pilotage04 as Answer[]), ...(common094Pilotage05 as Answer[]), ...(common094Pilotage06 as Answer[]), ...(common094Shiphandling01 as Answer[]), ...(common094Shiphandling02 as Answer[]), ...(common094Shiphandling03 as Answer[]), ...(common094Shiphandling04 as Answer[]), ...(common094Shiphandling05 as Answer[]), ...(common094Shiphandling06 as Answer[]), ...(common094English as Answer[]), ...(common094Kaohsiung as Answer[]), ...(common096Kaohsiung as Answer[]), ...(common096PilotLaw as Answer[]), ...(common096Pilotage as Answer[]), ...(common096Shiphandling as Answer[]), ...(common096English as Answer[]), ...(common098Kaohsiung as Answer[]), ...(common098PilotLaw as Answer[]), ...(common098English as Answer[]), ...(common100PilotLaw as Answer[]), ...(common100Pilotage as Answer[]), ...(common100Shiphandling as Answer[]), ...(common100English as Answer[]), ...(common100Kaohsiung as Answer[]), ...(common102PilotLaw as Answer[]), ...(common102Pilotage as Answer[]), ...(common102Shiphandling as Answer[]), ...(common102Kaohsiung as Answer[]), ...(common102Shiphandling06 as Answer[]), ...(common102English as Answer[]), ...(common112English01 as Answer[]), ...(common112English02 as Answer[]), ...(common112English03 as Answer[]), ...(common112English04 as Answer[]), ...(common112PilotLaw01 as Answer[]), ...(common112PilotLaw02 as Answer[]), ...(common112PilotLaw03 as Answer[]), ...(common112PilotLaw04 as Answer[]), ...(common112Pilotage01 as Answer[]), ...(common112Pilotage02 as Answer[]), ...(common112Pilotage03 as Answer[]), ...(common112Pilotage04 as Answer[]), ...(common112Shiphandling01 as Answer[]), ...(common112Shiphandling02 as Answer[]), ...(common112Shiphandling03 as Answer[]), ...(common112Shiphandling04 as Answer[]), ...(common112Shiphandling05 as Answer[]), ...(common112Shiphandling06 as Answer[]), ...(local112Kaohsiung01 as Answer[]), ...(local112Kaohsiung02 as Answer[]), ...(local112Kaohsiung03 as Answer[]), ...(local112Kaohsiung04 as Answer[]), ...(local112Kaohsiung05 as Answer[]), ...(local112Kaohsiung06 as Answer[]), ...(common098Pilotage as Answer[]), ...(common098Shiphandling as Answer[]), ...(answer114English01 as Answer[]), ...(answer114English02 as Answer[]), ...(answer114English03 as Answer[]), ...(answer114English04 as Answer[]), ...(answer114Pilotlaw01 as Answer[]), ...(answer114Pilotlaw02 as Answer[]), ...(answer114Pilotlaw03 as Answer[]), ...(answer114Pilotlaw04 as Answer[]), ...(answer114Pilotage05 as Answer[]), ...(answer114Kaohsiung07 as Answer[]), ...(answer114Kaohsiung06 as Answer[]), ...(answer114Kaohsiung05 as Answer[]), ...(answer114Kaohsiung04 as Answer[]), ...(answer114Kaohsiung03 as Answer[]), ...(answer114Kaohsiung02 as Answer[]), ...(answer114Kaohsiung01 as Answer[]), ...(answer114Pilotage04 as Answer[]), ...(answer114Pilotage03 as Answer[]), ...(answer114Pilotage02 as Answer[]), ...(answer114Pilotage01 as Answer[]), ...(answer114Shiphandling01 as Answer[]), ...(answer114Shiphandling02 as Answer[]), ...(answer114Shiphandling03 as Answer[]), ...(answer114Shiphandling04 as Answer[]), ...(answer114Shiphandling05 as Answer[]), ...(answer114Shiphandling06 as Answer[])];
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
      (subject === "全部科目" || (subject === "專業英文" ? ["專業英文", "實用英文"].includes(q.subject) : q.subject === subject)) &&
      matchesPort(q.port, port) &&
      (!search || q.question.toLowerCase().includes(search.toLowerCase()))
  ).sort((a, b) =>
    b.year - a.year ||
    subjects.indexOf(a.subject) - subjects.indexOf(b.subject) ||
    a.questionNo - b.questionNo
  );

  const portItems = items.filter((q) => matchesPort(q.port, port));
  const subjectCards = [
    { title: "航海英文", sub: "MARITIME ENGLISH", count: portItems.filter((q) => ["專業英文", "實用英文"].includes(q.subject)).length, filter: "專業英文", icon: "文" },
    { title: "航政法規", sub: "MARITIME LAW", count: portItems.filter((q) => q.subject === "航政法規").length, filter: "航政法規", icon: "法" },
    { title: "引港學", sub: "PILOTAGE", count: portItems.filter((q) => q.subject === "引港學").length, filter: "引港學", icon: "引" },
    { title: "船舶操縱", sub: "SHIP HANDLING", count: portItems.filter((q) => q.subject === "船舶操縱").length, filter: "船舶操縱", icon: "舵" },
    { title: "高雄港單港", sub: "KAOHSIUNG WATERWAY", count: portItems.filter((q) => q.subject === "當地水道港灣詳情" && q.port === "高雄港").length, filter: "當地水道港灣詳情", icon: "港" },
  ];
  return (
    <main className="shell shell-premium">
      <header className="topbar topbar-premium">
        <a className="brand-lockup" href="/" aria-label="引水人備考網站首頁">
          <div className="mark">引</div>
          <div><small>TAIWAN PILOT EXAM</small><b>引水人備考學院</b></div>
        </a>
        <nav className="main-nav" aria-label="主要導覽">
          <a href="#question-bank">歷屆題庫</a>
          <a href="/mock-exam">完整模擬考</a>
        </nav>
        <span className="port"><span className="port-dot" />高雄考區</span>
      </header>
      <section className="hero hero-premium">
        <div className="hero-copy">
          <div className="hero-kicker"><span /> PILOT EXAM PREPARATION · 2027</div>
          <h1>每一道題目，<br/><em>都朝著引水人的目標前進。</em></h1>
          <p>整合歷屆試題、專業擬答與隨機模擬考。從共同科目到高雄港單港題，建立有系統的備考節奏。</p>
          <div className="hero-actions">
            <a className="hero-primary" href="/mock-exam"><span>▣</span> 開始完整模擬考 <b>→</b></a>
            <a className="hero-secondary" href="#question-bank">瀏覽歷屆題庫 <b>↓</b></a>
          </div>
          <div className="hero-proof"><span>✓</span> 原卷來源可追溯 <i /> <span>✓</span> 高雄考區專用範圍 <i /> <span>✓</span> 參考答案逐題整理</div>
        </div>
        <aside className="hero-panel">
          <div className="panel-topline"><span>STUDY OVERVIEW</span><span className="live-dot">● 系統資料</span></div>
          <div className="panel-heading">備考資料總覽</div>
          <div className="panel-total"><strong>{items.length}</strong><span>道高雄考區歷屆題目</span></div>
          <div className="panel-divider" />
          <div className="panel-stats">
            <div><b>{new Set(items.map((q) => q.year)).size}</b><span>涵蓋年度</span></div>
            <div><b>{portItems.length}</b><span>高雄可練習題目</span></div>
          </div>
          <div className="panel-foot"><span>主要考區</span><b>高雄港 KAOHSIUNG</b></div>
          <div className="compass-watermark">✳</div>
        </aside>
      </section>
      <section className="subject-overview">
        <div className="section-intro"><div><small>YOUR STUDY AREAS</small><h2>五大備考科目</h2></div><span>依高雄考區題庫統計</span></div>
        <div className="subject-grid">
          {subjectCards.map((card) => (
            <button className="subject-card" key={card.title} onClick={() => { setSubject(card.filter); document.getElementById("question-bank")?.scrollIntoView({ behavior: "smooth" }); }}>
              <span className="subject-icon">{card.icon}</span>
              <span className="subject-copy"><b>{card.title}</b><small>{card.sub}</small></span>
              <span className="subject-count"><b>{card.count}</b><small>題</small></span>
              <span className="subject-arrow">↗</span>
            </button>
          ))}
        </div>
      </section>
      <section className="bank bank-premium" id="question-bank">
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
                  <details className="answer" onToggle={(event) => {
                    const isOpen = event.currentTarget.open;
                    setExpandedAnswers((prev) => ({ ...prev, [q.id]: isOpen }));
                    setHasOpenAnswer(document.querySelector(".answer[open]") !== null);
                  }}>
                    <summary>參考答案（點擊展開／收合）</summary>
                    {expandedAnswers[q.id] ? (
                    <div className="answer-content">
                      <section className="answer-section">
                        <h3>參考擬答</h3>
                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{normalizeAnswerMarkdown(answer.modelAnswer)}</ReactMarkdown>
                      </section>
                      {answer.practicalAnalysis ? (
                        <section className="answer-section">
                          <h3>解題分析與作答策略</h3>
                          <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>{normalizeAnswerMarkdown(answer.practicalAnalysis)}</ReactMarkdown>
                        </section>
                      ) : null}
                      {Array.isArray(answer.keyPoints) && answer.keyPoints.length ? (
                        <section className="answer-section">
                          <h3>得分關鍵</h3>
                          <ol className="answer-keypoints">
                            {answer.keyPoints.map((item, index) => (
                              <li key={index}>
                                {typeof item === "string" ? (
                                  <b>{item}</b>
                                ) : (
                                  <>
                                    <b>{item.point}</b>
                                    {item.explanation ? <p>{item.explanation}</p> : null}
                                  </>
                                )}
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
                        <details className="reference-fold">
                          <summary>參考資料（點擊展開／收合）</summary>
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
                        </details>
                      ) : null}
                      {answer.verification?.status ? (
                        <div className="answer-status">資料查核狀態：{verificationStatusLabel(answer.verification.status)}</div>
                      ) : null}
                    </div>
                    ) : null}
                  </details>
                ) : (
                  <div className="answer-pending" role="status">
                    <strong>參考答案整理中</strong>
                    <span>原題與考選部試卷來源仍可查閱；本題尚未建立經核對的參考答案，請勿以其他港區或年度答案代替。</span>
                  </div>
                )}
              </article>
            );
          })}</div>
        )}
      </section>
      {hasOpenAnswer ? (
        <button type="button" className="answer-close-floating" onClick={closeOpenAnswers} aria-label="收合目前已展開的參考答案">
          <span aria-hidden="true">⌃</span> 收合參考答案
        </button>
      ) : null}
      <footer>本平台為備考整理工具；正式考題以主管機關公布之原始試卷為準。</footer>
    </main>
  );
}
