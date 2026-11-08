"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import questionData from "../../data/questions.json";

type Question = { id:string; year:number; subject:string; port:string; question:string; questionNo:number; status?:string };
type ExamQuestion = Question & { examSubject:string };
const years = new Set([1994,1995,1996,1997,1998,2000,2001,2002,2003,2005,2007,2009,2011,2013,2015,2017,2019,2021,2023,2025]);
function isKaohsiungPort(port:string){return port.split("、").includes("高雄港");}
const plan = [
  { subject:"航海英文", aliases:["專業英文","實用英文"], count:4 },
  { subject:"航政法規", aliases:["航政法規"], count:4 },
  { subject:"引港學", aliases:["引港學"], count:5 },
  { subject:"船舶操縱", aliases:["船舶操縱"], count:6 },
  { subject:"高雄港單港", aliases:["當地水道港灣詳情"], count:7 },
];
function shuffle<T>(items:T[]):T[] {
  const a=[...items];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}
function formatTime(seconds:number) {
  const h=Math.floor(seconds/3600),m=Math.floor((seconds%3600)/60),s=seconds%60;
  return [h,m,s].map(v=>String(v).padStart(2,"0")).join(":");
}
export default function MockExamPage(){
  const pool=(questionData as Question[]).filter(q=>years.has(q.year)&&(q.port==="共通科目"||q.port==="全港共通"||isKaohsiungPort(q.port)));
  const [exam,setExam]=useState<ExamQuestion[]>([]);
  const [answers,setAnswers]=useState<Record<string,string>>({});
  const [started,setStarted]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const [elapsed,setElapsed]=useState(0);
  const [duration,setDuration]=useState(3600);
  const [active,setActive]=useState(0);
  const [confirmSubmit,setConfirmSubmit]=useState(false);
  const [sessionRestored,setSessionRestored]=useState(false);
  useEffect(()=>{
    try {
      const raw=window.localStorage.getItem("pilot-exam-mock-session-v1");
      if(raw){
        const saved=JSON.parse(raw);
        if(Array.isArray(saved.exam)&&saved.exam.length===26)setExam(saved.exam);
        if(saved.answers&&typeof saved.answers==="object")setAnswers(saved.answers);
        if(typeof saved.started==="boolean")setStarted(saved.started);
        if(typeof saved.submitted==="boolean")setSubmitted(saved.submitted);
        if(Number.isFinite(saved.elapsed))setElapsed(Math.max(0,saved.elapsed));
        if(Number.isFinite(saved.duration))setDuration(Math.max(0,saved.duration));
        if(Number.isInteger(saved.active))setActive(Math.min(25,Math.max(0,saved.active)));
      }
    } catch(error) {
      console.warn("Unable to restore mock exam session:",error);
    } finally {
      setSessionRestored(true);
    }
  },[]);
  useEffect(()=>{
    if(!sessionRestored)return;
    try {
      window.localStorage.setItem("pilot-exam-mock-session-v1",JSON.stringify({exam,answers,started,submitted,elapsed,duration,active}));
    } catch(error) {
      console.warn("Unable to save mock exam session locally:",error);
    }
  },[sessionRestored,exam,answers,started,submitted,elapsed,duration,active]);
  useEffect(()=>{if(!started||submitted)return;const id=window.setInterval(()=>setElapsed(v=>v+1),1000);return()=>window.clearInterval(id);},[started,submitted]);
  const answered=useMemo(()=>exam.filter(q=>(answers[q.id]||"").trim().length>0).length,[exam,answers]);
  const grouped=useMemo(()=>plan.map(p=>({ ...p,questions:exam.filter(q=>q.examSubject===p.subject)})),[exam]);
  function makeExam(){
    const selected:ExamQuestion[]=[];
    for(const p of plan){
      const candidates=pool.filter(q=>p.aliases.includes(q.subject)&&(p.subject!=="高雄港單港"||isKaohsiungPort(q.port)));
      const chosen=shuffle(candidates).slice(0,p.count).map(q=>({...q,examSubject:p.subject}));
      selected.push(...chosen);
    }
    if(selected.length!==26){window.alert("目前題庫各科題數不足，無法組成完整試卷，請稍後再試。");return;}
    setExam(selected);setAnswers({});setElapsed(0);setActive(0);setSubmitted(false);setConfirmSubmit(false);setStarted(true);
  }
  function finish(){setSubmitted(true);setConfirmSubmit(false);}
  const current=exam[active];
  const left=Math.max(0,duration-elapsed);
  useEffect(()=>{if(started&&!submitted&&duration>0&&elapsed>=duration){setSubmitted(true);setConfirmSubmit(false);}},[started,submitted,duration,elapsed]);
  return <main className="mock-shell">
    <header className="mock-top"><Link href="/" className="mock-brand"><span>引</span><div><small>TAIWAN PILOT EXAM</small><b>引水人備考網站</b></div></Link><Link href="/" className="mock-back">返回題庫 ←</Link></header>
    {!started? <section className="mock-intro">
      <div className="mock-eyebrow">FULL-LENGTH RANDOM MOCK EXAM</div>
      <h1>完整模擬考</h1>
      <p>依最新完整年度試卷的科目配置，從歷屆題庫隨機抽題，組成一份高雄考區專用模擬試卷。</p>
      <div className="mock-metrics"><div><b>26</b><span>總題數</span></div><div><b>5</b><span>考科</span></div><div><b>{pool.length}</b><span>可抽題庫</span></div></div>
      <div className="mock-config">
        <h2>本次試卷配置</h2>
        {plan.map(p=><div className="mock-plan" key={p.subject}><span>{p.subject}</span><b>{p.count} 題</b></div>)}
        <label className="mock-duration">自訂作答時間
          <select value={duration} onChange={e=>setDuration(Number(e.target.value))}><option value={3600}>1 小時</option><option value={7200}>2 小時</option><option value={10800}>3 小時</option><option value={14400}>4 小時</option><option value={21600}>6 小時</option><option value={36000}>10 小時</option></select>
        </label>
        <p className="mock-note">題數配置參照民國114年完整試卷；作答時間為自訂練習設定，並非官方考試時間。時間到會自動交卷。題目保留原始申論、計算及繪圖要求，系統不會自動判定答案分數。</p>
        <button className="mock-primary" onClick={makeExam}>隨機組卷並開始考試</button>
      </div>
    </section>: <>
      <section className="mock-status">
        <div><small>{submitted?"考試已交卷":"考試進行中"}</small><h1>{submitted?"作答結果":"完整模擬考"}</h1></div>
        <div className="mock-clock"><small>{duration>0?"剩餘時間":"作答時間"}</small><b>{duration>0?formatTime(left):formatTime(elapsed)}</b></div>
      </section>
      <div className="mock-progress"><div style={{width:(answered/26*100)+"%"}}/></div>
      <div className="mock-progress-label"><span>已作答 {answered} / 26 題</span><span>{Math.round(answered/26*100)}%</span></div>
      {submitted? <section className="mock-result">
        <div className="mock-result-score"><b>{answered}/26</b><span>已填答題數</span></div>
        <h2>本次作答完成</h2><p>申論、計算與繪圖題需要依評分標準人工檢討，因此網站不會用關鍵字或字數假裝替你打分。</p>
        {grouped.map(g=><div className="mock-review-group" key={g.subject}><h3>{g.subject} <small>{g.questions.filter(q=>(answers[q.id]||"").trim()).length}/{g.count} 題已作答</small></h3>{g.questions.map((q,i)=><article key={q.id}><b>第 {i+1} 題｜民國{q.year-1911}年</b><p>{q.question}</p><div className="mock-own-answer">{answers[q.id]||"本題未作答"}</div><Link href={"/?search="+encodeURIComponent(q.question.slice(0,24))}>回題庫查看參考擬答 ↗</Link></article>)}</div>)}
        <button className="mock-primary" onClick={()=>{setStarted(false);setSubmitted(false);setExam([]);setAnswers({});setElapsed(0);setActive(0);}}>重新設定下一份試卷</button>
      </section>: <section className="mock-work">
        <aside className="mock-nav"><h3>試題索引</h3>{grouped.map(g=><div className="mock-nav-group" key={g.subject}><b>{g.subject}</b><div>{g.questions.map(q=>{const n=exam.findIndex(x=>x.id===q.id);return <button key={q.id} className={(active===n?"active ":"")+(answers[q.id]?.trim()?"done":"")} onClick={()=>setActive(n)}>{n+1}</button>;})}</div></div>)}<small>綠色代表已填答</small></aside>
        <div className="mock-paper">
          <div className="mock-qmeta">{current.examSubject}・民國{current.year-1911}年歷屆題目</div>
          <div className="mock-qcount">第 {active+1} / 26 題</div>
          <h2>{current.question}</h2>
          <label htmlFor="mock-answer">作答區</label>
          <textarea id="mock-answer" value={answers[current.id]||""} onChange={e=>setAnswers(v=>({...v,[current.id]:e.target.value}))} placeholder="請在此輸入你的完整答案；若需繪圖，可先寫出圖示要點，正式練習時建議另備紙筆。" />
          <div className="mock-paper-actions"><button className="mock-secondary" disabled={active===0} onClick={()=>setActive(v=>v-1)}>上一題</button><button className="mock-secondary" disabled={active===25} onClick={()=>setActive(v=>v+1)}>下一題</button></div>
          <div className="mock-savehint">作答會自動儲存在這台裝置；重新整理或關閉頁面後仍可接續，交卷前可自由切換題目修改。</div>
        </div>
      </section>}
      {!submitted&&<div className="mock-submitbar"><span>已填答 <b>{answered}</b> / 26 題</span><button onClick={()=>setConfirmSubmit(true)}>交卷</button></div>}
      {confirmSubmit&&!submitted&&<div className="mock-modal-backdrop"><div className="mock-modal"><h2>{left===0&&duration>0?"作答時間已到":"確定要交卷嗎？"}</h2><p>目前已填答 {answered} 題，尚有 {26-answered} 題未填答。交卷後將無法修改本次答案。</p><div><button className="mock-secondary" onClick={()=>setConfirmSubmit(false)}>返回檢查</button><button className="mock-primary" onClick={finish}>確認交卷</button></div></div></div>}
    </>}
  </main>;
}
