import { useState, useEffect, useRef, useCallback } from "react";

const T = {
  primary:"#1B6B4A", primaryLight:"#2D8F63", primaryDark:"#0F4A32",
  accent:"#F5A623",  accentLight:"#FFD88A",  bg:"#F7F3EC",
  card:"#FFFFFF",    text:"#1C2B22",         muted:"#6B7F72",
  light:"#A8BEB0",   danger:"#E05252",       info:"#4A90D9",
  success:"#3BAA6E", border:"#D8E8DC",
};

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Ic = ({n,s=24,c="currentColor"}) => ({
  home:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  game:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
  gps:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>,
  sos:     <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 7h2v6h-2zm0 8h2v2h-2z"/></svg>,
  profile: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  trophy:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16M9 22v-3M15 22v-3M12 19c-3.31 0-6-2.69-6-6V4h12v9c0 3.31-2.69 6-6 6z"/></svg>,
  back:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><polyline points="15,18 9,12 15,6"/></svg>,
  check:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>,
  edit:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  mic:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/></svg>,
  share:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  music:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  yt:      <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>,
  play:    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><polygon points="5,3 19,12 5,21"/></svg>,
  line:    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2C6.48 2 2 6 2 11c0 4.5 3.5 8.3 8.5 9.5.3.1.5-.1.5-.4v-1.5c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.8.1-.6.3-1 .6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1 .8-.2 1.7-.3 2.5-.3s1.7.1 2.5.3c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.7c0 .3.2.5.5.4C18.5 19.3 22 15.5 22 11c0-5-4.48-9-10-9z"/></svg>,
  arrow:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><polyline points="9,18 15,12 9,6"/></svg>,
  pin:     <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>,
  phone:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.69A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.09 6.09l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  id:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 10h2M16 14h2M6 10a2 2 0 104 0 2 2 0 00-4 0zM6 14s.5-2 2-2 2 2 2 2"/></svg>,
  home2:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
  refresh: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><polyline points="23,4 23,10 17,10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>,
  nav:     <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><polygon points="3,11 22,2 13,21 11,13"/></svg>,
  alert:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  save:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>,
}[n] || null);

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function fmtTime(s){return`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;}
function fmtDist(m){return m<1000?`${Math.round(m)} ม.`:`${(m/1000).toFixed(1)} กม.`;}
function calcDist(lat1,lon1,lat2,lon2){
  const R=6371000,dLat=(lat2-lat1)*Math.PI/180,dLon=(lon2-lon1)*Math.PI/180;
  const a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const DIFF={
  easy:  {label:"ง่าย 🌱",   col:"#3BAA6E",pairs:4},
  medium:{label:"กลาง 🌟",   col:"#F5A623",pairs:6},
  hard:  {label:"ยาก 🔥",    col:"#E05252",pairs:8},
};
const EMOJIS=["🌸","🐘","🦋","🌻","🐟","🌺","🦜","🍎","🌊","🐬","🦁","🍓","🌈","⭐","🎵","🏵️"];
const SEQS=[
  {topic:"🍳 ทำข้าวต้ม",steps:["ล้างข้าว","ต้มน้ำ","ใส่ข้าว","เคี่ยว"],emojis:["🚿","🔥","🍚","🥣"]},
  {topic:"🌾 ปลูกข้าว",  steps:["เตรียมดิน","หว่านเมล็ด","รดน้ำ","เก็บเกี่ยว"],emojis:["🌱","🌾","💧","🌾"]},
];
const SOUNDS=[
  {sound:"🐓 เสียงไก่ขัน",answer:"🐓 ไก่",   options:["🐓 ไก่","🦆 เป็ด","🐕 สุนัข","🐈 แมว"],emojis:["🐓","🦆","🐕","🐈"]},
  {sound:"🌧️ เสียงฝนตก", answer:"🌧️ ฝนตก",options:["🌧️ ฝนตก","🌊 คลื่น","💨 ลม","⛈️ ฟ้า"],emojis:["🌧️","🌊","💨","⛈️"]},
  {sound:"🔔 ระฆังวัด",  answer:"🔔 ระฆัง", options:["🔔 ระฆัง","🎺 แตร","⏰ นาฬิกา","🎶 เพลง"],emojis:["🔔","🎺","⏰","🎶"]},
];
const QUESTIONS=[
  {emoji:"🏫",q:"สมัยเด็กๆ ไปโรงเรียนอย่างไร?",hint:"เดิน? นั่งรถ? ขี่จักรยาน?"},
  {emoji:"🍜",q:"อาหารที่ชอบตอนเด็กคืออะไร?",hint:"กลิ่น รสชาติ แม่ทำ..."},
  {emoji:"🎮",q:"เล่นอะไรกับเพื่อนบ้านสมัยเด็ก?",hint:"เตะบอล ว่าว วิ่งเล่น..."},
  {emoji:"🎓",q:"ครูที่ชอบที่สุดชื่ออะไร?",hint:"นึกถึงคุณครูที่ดี..."},
  {emoji:"💑",q:"พบคนที่รักครั้งแรกที่ไหน?",hint:"สถานที่ บรรยากาศ..."},
];

// ─── DEFAULT PATIENT DATA ──────────────────────────────────────────────────────
const DEFAULT_PATIENT = {
  name:"นายสมชาย ใจดี", age:"72", idCard:"1-1001-00001-23-4",
  bloodType:"A", disease:"ความดัน, เบาหวาน", allergy:"แพ้ยาเพนิซิลิน",
  address:"บ้านเลขที่ 123 ซ.สุขุมวิท 50 แขวงพระโขนงเหนือ เขตวัฒนา กรุงเทพฯ 10260",
  homeLat:"13.7225", homeLng:"100.5753",
  homeRadius:"500",
  contacts:[
    {name:"นางสาวสมใจ ใจดี", relation:"ลูกสาว",   phone:"081-234-5678",emoji:"👩"},
    {name:"นายสมศักดิ์ ใจดี",relation:"ลูกชาย",   phone:"082-345-6789",emoji:"👨"},
    {name:"รพ.รามาธิบดี",    relation:"โรงพยาบาล", phone:"02-201-1000", emoji:"🏥"},
  ],
};

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css=`
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800&family=Sarabun:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Sarabun',sans-serif;background:#F7F3EC;color:#1C2B22;min-height:100vh;overflow-x:hidden;}
.app{max-width:420px;margin:0 auto;min-height:100vh;background:#F7F3EC;position:relative;}

/* HEADER */
.hdr{background:linear-gradient(135deg,#0F4A32 0%,#1B6B4A 60%,#2D8F63 100%);padding:14px 18px 22px;position:relative;overflow:hidden;}
.hdr::before{content:'';position:absolute;top:-40px;right:-40px;width:130px;height:130px;background:rgba(255,255,255,0.05);border-radius:50%;}
.hdr-row{display:flex;justify-content:space-between;align-items:flex-start;}
.app-name{font-family:'Prompt',sans-serif;font-size:13px;font-weight:700;color:#fff;letter-spacing:.8px;}
.app-dev{font-size:10px;color:rgba(255,255,255,0.48);margin-top:1px;font-style:italic;}
.streak{background:#F5A623;color:#fff;padding:5px 10px;border-radius:20px;font-size:11px;font-weight:700;display:flex;align-items:center;gap:3px;flex-shrink:0;}
.greet-row{display:flex;align-items:center;gap:8px;margin:10px 0 3px;}
.greet{font-family:'Prompt',sans-serif;font-size:19px;font-weight:700;color:#fff;flex:1;line-height:1.2;}
.edit-btn{background:rgba(255,255,255,0.14);border:none;border-radius:8px;padding:4px 8px;color:#fff;cursor:pointer;display:flex;align-items:center;gap:4px;font-size:11px;font-family:'Sarabun',sans-serif;}
.hdr-date{font-size:12px;color:rgba(255,255,255,0.58);margin-bottom:12px;}
.score-bar{background:rgba(255,255,255,0.1);border-radius:13px;padding:10px 14px;display:flex;justify-content:space-between;align-items:center;}
.sc-item{text-align:center;}
.sc-val{font-family:'Prompt',sans-serif;font-size:17px;font-weight:700;color:#fff;}
.sc-lbl{font-size:10px;color:rgba(255,255,255,0.58);margin-top:1px;}
.sc-div{width:1px;height:26px;background:rgba(255,255,255,0.2);}

/* BOTTOM NAV */
.bnav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:420px;background:#fff;border-top:1px solid #D8E8DC;display:flex;padding:6px 0 14px;z-index:100;box-shadow:0 -4px 18px rgba(0,0,0,0.08);}
.ni{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;padding:2px;}
.nl{font-size:9px;color:#6B7F72;font-weight:500;}
.ni.act .nl{color:#1B6B4A;font-weight:700;}

/* CONTENT */
.ct{padding:14px 15px 100px;}
.st{font-family:'Prompt',sans-serif;font-size:15px;font-weight:600;color:#1C2B22;margin-bottom:10px;display:flex;align-items:center;gap:7px;}
.sa{display:inline-block;width:4px;height:16px;background:#F5A623;border-radius:2px;}
.chip{display:inline-flex;align-items:center;gap:3px;background:#E8F5EE;color:#1B6B4A;font-size:10px;font-weight:600;padding:3px 8px;border-radius:20px;margin:2px;}
.ib{background:linear-gradient(135deg,#E8F0FA,#D5E5F9);border-radius:12px;padding:10px 13px;display:flex;align-items:flex-start;gap:8px;margin-bottom:12px;}
.ib-t{font-size:12px;color:#2A5298;line-height:1.5;}

/* MODAL */
.mo{position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:300;display:flex;align-items:flex-end;justify-content:center;}
.mo-box{background:#fff;border-radius:24px 24px 0 0;padding:20px 18px 32px;width:100%;max-width:420px;max-height:90vh;overflow-y:auto;}
.mo-title{font-family:'Prompt',sans-serif;font-size:16px;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.inp{width:100%;border:2px solid #D8E8DC;border-radius:11px;padding:11px 13px;font-family:'Sarabun',sans-serif;font-size:14px;outline:none;transition:border-color .2s;background:#fff;}
.inp:focus{border-color:#1B6B4A;}
.inp-lbl{font-size:12px;font-weight:600;color:#6B7F72;margin-bottom:4px;margin-top:12px;}
.inp-lbl:first-child{margin-top:0;}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.btn-p{background:#1B6B4A;color:#fff;border:none;border-radius:12px;padding:13px;font-family:'Prompt',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:opacity .2s;width:100%;margin-top:14px;}
.btn-p:hover{opacity:.9;}
.btn-s{background:#F0F0F0;color:#444;border:none;border-radius:12px;padding:13px;font-family:'Prompt',sans-serif;font-size:14px;font-weight:600;cursor:pointer;width:100%;margin-top:8px;}

/* PROFILE PAGE */
.prof-hero{background:linear-gradient(135deg,#0F4A32,#1B6B4A);border-radius:18px;padding:18px;color:#fff;margin-bottom:16px;position:relative;overflow:hidden;}
.prof-hero::after{content:'🧠';position:absolute;right:-5px;top:-5px;font-size:70px;opacity:.1;}
.prof-avatar{width:58px;height:58px;border-radius:50%;background:rgba(255,255,255,0.18);display:flex;align-items:center;justify-content:center;font-size:26px;border:3px solid rgba(255,255,255,0.35);margin-bottom:10px;}
.prof-name{font-family:'Prompt',sans-serif;font-size:19px;font-weight:700;margin-bottom:2px;}
.prof-sub{font-size:12px;opacity:.7;}
.prof-chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px;}
.prof-chip{background:rgba(255,255,255,0.15);border-radius:20px;padding:4px 10px;font-size:11px;font-weight:600;}
.section-card{background:#fff;border-radius:16px;padding:14px;margin-bottom:12px;box-shadow:0 2px 10px rgba(0,0,0,0.05);}
.sc-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.sc-head-title{font-family:'Prompt',sans-serif;font-size:13px;font-weight:700;display:flex;align-items:center;gap:7px;}
.sc-edit-btn{background:#E8F5EE;color:#1B6B4A;border:none;border-radius:9px;padding:5px 10px;font-size:11px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:4px;font-family:'Sarabun',sans-serif;}
.info-row{display:flex;gap:10px;margin-bottom:9px;align-items:flex-start;}
.info-icon{font-size:16px;flex-shrink:0;margin-top:1px;}
.info-key{font-size:11px;color:#6B7F72;margin-bottom:2px;}
.info-val{font-size:13px;font-weight:500;color:#1C2B22;line-height:1.4;}
.info-divider{height:1px;background:#F0F0F0;margin:8px 0;}
.contact-card{display:flex;align-items:center;gap:10px;padding:10px;background:#F7F3EC;border-radius:12px;margin-bottom:7px;}
.contact-av{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#1B6B4A,#2D8F63);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}
.contact-info{flex:1;}
.contact-name{font-size:13px;font-weight:600;}
.contact-rel{font-size:11px;color:#6B7F72;margin-top:1px;}
.contact-phone{font-size:12px;color:#4A90D9;font-weight:600;margin-top:1px;}
.call-btn{background:#3BAA6E;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;}

/* GPS */
.gps-screen{padding:14px 15px 100px;}
.gps-status-bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.gps-status{display:flex;align-items:center;gap:6px;}
.gps-dot{width:9px;height:9px;border-radius:50%;animation:gpspulse 2s ease-in-out infinite;}
@keyframes gpspulse{0%,100%{opacity:1}50%{opacity:.4}}
.map-wrap{border-radius:18px;overflow:hidden;margin-bottom:12px;box-shadow:0 3px 16px rgba(0,0,0,0.12);}
.map-mock{background:linear-gradient(135deg,#C8E6C0,#A5D6A7,#C8E6C0);height:220px;position:relative;display:flex;align-items:center;justify-content:center;}
.map-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.22) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.22) 1px,transparent 1px);background-size:26px 26px;}
.road-h{position:absolute;left:0;right:0;background:rgba(255,255,255,0.6);height:7px;}
.road-v{position:absolute;top:0;bottom:0;background:rgba(255,255,255,0.6);width:7px;}
.home-zone{position:absolute;border:2.5px dashed #F5A623;border-radius:50%;background:rgba(245,166,35,0.1);pointer-events:none;}
.map-home{position:absolute;font-size:22px;}
.marker-wrap{position:relative;z-index:4;display:flex;flex-direction:column;align-items:center;}
.map-pulse{position:absolute;width:52px;height:52px;border-radius:50%;animation:mpulse 2s ease-out infinite;}
@keyframes mpulse{0%{transform:scale(.8);opacity:1}100%{transform:scale(2.2);opacity:0}}
.map-dot{width:38px;height:38px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 3px 12px rgba(0,0,0,0.3);position:relative;z-index:2;display:flex;align-items:center;justify-content:center;font-size:16px;}
.map-dot-inner{transform:rotate(45deg);}
.map-addr{position:absolute;bottom:9px;left:9px;right:9px;background:rgba(255,255,255,0.93);border-radius:10px;padding:6px 10px;font-size:11px;font-weight:600;color:#1C2B22;box-shadow:0 2px 8px rgba(0,0,0,0.1);}
.map-dist{position:absolute;top:9px;right:9px;background:rgba(27,107,74,0.9);border-radius:10px;padding:4px 10px;font-size:11px;font-weight:700;color:#fff;}
.dist-card{background:#fff;border-radius:16px;padding:14px;margin-bottom:10px;box-shadow:0 2px 10px rgba(0,0,0,0.05);}
.dist-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
.dist-title{font-family:'Prompt',sans-serif;font-size:13px;font-weight:700;display:flex;align-items:center;gap:6px;}
.dist-meter{background:#F7F3EC;border-radius:10px;overflow:hidden;height:8px;flex:1;margin:0 10px;}
.dist-fill{height:100%;border-radius:10px;transition:width .6s;}
.dist-pct{font-size:11px;font-weight:700;flex-shrink:0;}
.zone-info{font-size:12px;color:#6B7F72;margin-top:6px;}
.gps-coords{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;}
.coord-box{background:#fff;border-radius:13px;padding:11px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.05);}
.coord-lbl{font-size:10px;color:#6B7F72;margin-bottom:3px;}
.coord-val{font-family:'Prompt',sans-serif;font-size:13px;font-weight:700;color:#1B6B4A;}
.alert-card{border-radius:14px;padding:13px;display:flex;gap:10px;align-items:center;margin-bottom:8px;}
.alert-card.safe{background:#E8F5EE;}
.alert-card.warn{background:#FFF3E0;}
.alert-card.danger{background:#FFEBEE;}
.refresh-btn{background:rgba(255,255,255,0.25);border:none;border-radius:10px;padding:6px 12px;color:#fff;cursor:pointer;display:flex;align-items:center;gap:5px;font-size:12px;font-weight:600;font-family:'Sarabun',sans-serif;}

/* GAMES */
.game-grid{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:18px;}
.gc{background:#fff;border-radius:16px;padding:14px;cursor:pointer;transition:all .2s;border:2px solid transparent;box-shadow:0 2px 10px rgba(0,0,0,0.06);position:relative;overflow:hidden;}
.gc:active{transform:scale(.97);}
.gc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;border-radius:16px 16px 0 0;}
.gc.gr::before{background:linear-gradient(90deg,#2D8F63,#5CC49A);}
.gc.or::before{background:linear-gradient(90deg,#F5A623,#FFD88A);}
.gc.bl::before{background:linear-gradient(90deg,#4A90D9,#87BFEE);}
.gc.pu::before{background:linear-gradient(90deg,#9B59B6,#C39BD3);}
.gi{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:8px;}
.gi.gr{background:#E8F5EE;} .gi.or{background:#FFF4E0;} .gi.bl{background:#E8F0FA;} .gi.pu{background:#F3EAF7;}
.gn{font-family:'Prompt',sans-serif;font-size:13px;font-weight:600;margin-bottom:2px;}
.gd{font-size:11px;color:#6B7F72;line-height:1.4;}
.gb{margin-top:6px;font-size:10px;color:#1B6B4A;font-weight:600;background:#E8F5EE;padding:2px 7px;border-radius:7px;display:inline-block;}

/* DAILY */
.dc{background:linear-gradient(135deg,#1B6B4A,#2D8F63);border-radius:16px;padding:15px;margin-bottom:18px;color:#fff;position:relative;overflow:hidden;}
.dc::after{content:'🌿';position:absolute;right:-8px;bottom:-14px;font-size:72px;opacity:.1;}
.dt{font-family:'Prompt',sans-serif;font-size:13px;font-weight:700;margin-bottom:9px;}
.dtask{display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.1);border-radius:9px;padding:8px 10px;margin-bottom:5px;}
.tck{width:21px;height:21px;border-radius:50%;border:2px solid rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.tck.dn{background:#F5A623;border-color:#F5A623;}

/* FEATURES */
.fr{display:flex;gap:9px;margin-bottom:18px;}
.fb{flex:1;background:#fff;border-radius:13px;padding:12px 7px;text-align:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.06);transition:all .2s;}
.fb:hover{transform:translateY(-2px);}
.fb.sos{background:#FFF0F0;}
.fb.gps{background:#E8F0FA;}
.fb.rw{background:#FFF8E0;}

/* GAME SCREEN */
.gs{min-height:100vh;background:#F7F3EC;}
.gh{background:linear-gradient(135deg,#0F4A32,#1B6B4A);padding:13px 15px 18px;color:#fff;}
.ght{display:flex;align-items:center;gap:9px;margin-bottom:9px;}
.bbtn{width:33px;height:33px;background:rgba(255,255,255,.15);border-radius:9px;display:flex;align-items:center;justify-content:center;cursor:pointer;}
.gtitle{font-family:'Prompt',sans-serif;font-size:16px;font-weight:700;}
.gsub{font-size:11px;opacity:.7;margin-top:1px;}
.pw{background:rgba(255,255,255,.2);height:7px;border-radius:4px;overflow:hidden;margin-top:8px;}
.pf{height:100%;background:#FFD88A;border-radius:4px;transition:width .4s;}

/* MATCH */
.mg4{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;padding:13px 15px;}
.mc{aspect-ratio:1;background:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s;box-shadow:0 2px 7px rgba(0,0,0,.07);border:2px solid transparent;overflow:hidden;position:relative;}
.mc.fl{background:linear-gradient(135deg,#E8F5EE,#D0ECD9);border-color:#1B6B4A;transform:scale(1.05);}
.mc.mt{background:linear-gradient(135deg,#1B6B4A,#2D8F63);}
.cb{position:absolute;inset:0;background:linear-gradient(135deg,#1B6B4A,#2D8F63);display:flex;align-items:center;justify-content:center;font-size:17px;color:rgba(255,255,255,.3);}

/* SEQUENCE */
.sqc{padding:13px 15px;}
.sqq{background:linear-gradient(135deg,#FFF8E0,#FFF0C0);border-radius:13px;padding:12px;margin-bottom:12px;border-left:4px solid #F5A623;}
.sqg{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.sqcard{background:#fff;border-radius:13px;padding:12px;text-align:center;cursor:pointer;transition:all .2s;border:2px solid transparent;box-shadow:0 2px 7px rgba(0,0,0,.06);}
.sqcard.sel{border-color:#1B6B4A;background:#E8F5EE;}

/* SOUND */
.sndc{padding:13px 15px;}
.stabs{display:flex;gap:7px;margin-bottom:12px;overflow-x:auto;padding-bottom:3px;}
.stab{background:#fff;border-radius:9px;padding:6px 11px;font-size:11px;font-weight:600;cursor:pointer;border:2px solid #D8E8DC;white-space:nowrap;flex-shrink:0;transition:all .2s;}
.stab.act{background:#1B6B4A;color:#fff;border-color:#1B6B4A;}
.spbtn{background:linear-gradient(135deg,#1B6B4A,#2D8F63);border-radius:16px;padding:16px;text-align:center;cursor:pointer;margin-bottom:14px;}
.wrow{display:flex;align-items:center;justify-content:center;gap:3px;height:42px;margin-bottom:7px;}
.wb{width:4px;background:rgba(255,255,255,.5);border-radius:2px;animation:wv 1.2s ease-in-out infinite;}
@keyframes wv{0%,100%{height:8px}50%{height:34px}}
.sopts{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.sopt{background:#fff;border-radius:12px;padding:12px;text-align:center;cursor:pointer;transition:all .2s;border:2px solid transparent;box-shadow:0 2px 7px rgba(0,0,0,.06);}
.sopt:hover{border-color:#1B6B4A;}
.sopt.ok{border-color:#3BAA6E;background:#E8F5EE;}
.sopt.ng{border-color:#E05252;background:#FFEBEB;}
.yti{flex:1;border:2px solid #D8E8DC;border-radius:10px;padding:10px 12px;font-family:'Sarabun',sans-serif;font-size:13px;outline:none;}
.yti:focus{border-color:#FF0000;}
.ytb{background:#FF0000;color:#fff;border:none;border-radius:10px;padding:10px 13px;font-size:12px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:4px;white-space:nowrap;}

/* RECORDING */
.rsec{background:#fff;border-radius:14px;padding:13px;margin-bottom:12px;box-shadow:0 2px 8px rgba(0,0,0,.06);}
.rbtn{display:flex;align-items:center;gap:7px;background:linear-gradient(135deg,#E05252,#FF6B6B);color:#fff;border:none;border-radius:11px;padding:11px 14px;cursor:pointer;font-size:13px;font-weight:600;width:100%;justify-content:center;margin-bottom:7px;}
.rbtn.rec{animation:rp 1s ease-in-out infinite;}
@keyframes rp{0%,100%{box-shadow:0 0 0 0 rgba(224,82,82,.4)}50%{box-shadow:0 0 0 8px rgba(224,82,82,0)}}
.ritem{display:flex;align-items:center;gap:9px;padding:8px;background:#F7F3EC;border-radius:9px;margin-bottom:5px;cursor:pointer;}
.rplay{width:30px;height:30px;background:#1B6B4A;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}

/* QUESTION */
.qc{padding:13px 15px;}
.qcard{background:linear-gradient(135deg,#E8F5EE,#D0ECD9);border-radius:16px;padding:16px;margin-bottom:14px;}
.qans{background:#fff;border-radius:13px;padding:13px;min-height:95px;border:2px dashed #D8E8DC;margin-bottom:13px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;text-align:center;}
.qans:hover{border-color:#1B6B4A;background:#E8F5EE;}
.abtn{background:#1B6B4A;color:#fff;border:none;border-radius:13px;padding:13px;width:100%;font-family:'Prompt',sans-serif;font-size:14px;font-weight:700;cursor:pointer;margin-bottom:7px;transition:all .2s;box-shadow:0 4px 14px rgba(27,107,74,.3);}
.abtn:hover{opacity:.9;}
.abtn.ac{background:#F5A623;box-shadow:0 4px 14px rgba(245,166,35,.3);}

/* RESULT */
.res{min-height:100vh;background:linear-gradient(160deg,#0F4A32 0%,#1B6B4A 40%,#5CC49A 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:26px 18px;text-align:center;color:#fff;}
.re{font-size:72px;animation:bncR .6s ease;}
@keyframes bncR{0%{transform:scale(0)}70%{transform:scale(1.2)}100%{transform:scale(1)}}
.rt{font-family:'Prompt',sans-serif;font-size:25px;font-weight:800;margin-top:10px;}
.rs{font-size:13px;opacity:.8;margin-top:3px;margin-bottom:22px;}
.rstats{display:flex;gap:11px;margin-bottom:18px;width:100%;}
.rstat{background:rgba(255,255,255,.14);border-radius:13px;padding:12px;flex:1;text-align:center;}
.rv{font-family:'Prompt',sans-serif;font-size:22px;font-weight:800;}
.rl{font-size:10px;opacity:.7;margin-top:2px;}
.bres{background:rgba(255,255,255,.1);border-radius:13px;padding:13px;margin-bottom:18px;width:100%;text-align:left;}
.srow{display:flex;gap:8px;width:100%;margin-bottom:9px;}
.sbtn{flex:1;border:none;border-radius:13px;padding:12px;font-family:'Prompt',sans-serif;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;}
.sline{background:#00B900;color:#fff;}
.scopy{background:rgba(255,255,255,.15);color:#fff;border:2px solid rgba(255,255,255,.3);}
.rbk{background:rgba(255,255,255,.15);color:#fff;border:2px solid rgba(255,255,255,.3);border-radius:13px;padding:12px 22px;width:100%;font-family:'Prompt',sans-serif;font-size:13px;font-weight:600;cursor:pointer;}

/* SOS */
.soss{background:linear-gradient(160deg,#1A0A0A,#3D1010);min-height:calc(100vh - 200px);display:flex;flex-direction:column;align-items:center;padding:24px 18px 40px;}
.sosbtn{width:165px;height:165px;background:linear-gradient(135deg,#FF3B30,#E05252);border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;margin:18px 0;box-shadow:0 0 0 16px rgba(224,82,82,.18),0 0 0 32px rgba(224,82,82,.09);animation:sosg 2s ease-in-out infinite;}
@keyframes sosg{0%,100%{box-shadow:0 0 0 16px rgba(224,82,82,.18),0 0 0 32px rgba(224,82,82,.09)}50%{box-shadow:0 0 0 22px rgba(224,82,82,.26),0 0 0 44px rgba(224,82,82,.13)}}
.sosbtn:active{transform:scale(.95);}
.sosct{background:rgba(255,255,255,.07);border-radius:12px;padding:11px;display:flex;align-items:center;gap:9px;margin-bottom:7px;cursor:pointer;transition:background .2s;width:100%;}
.sosct:hover{background:rgba(255,255,255,.14);}

/* REWARD */
.rws{padding:13px 15px 100px;}
.lvcard{background:linear-gradient(135deg,#F5A623,#FF9A00);border-radius:16px;padding:16px;color:#fff;margin-bottom:16px;position:relative;overflow:hidden;}
.lvcard::after{content:'🏆';position:absolute;right:-7px;top:-7px;font-size:72px;opacity:.13;}
.bgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px;}
.bitem{background:#fff;border-radius:12px;padding:10px 6px;text-align:center;box-shadow:0 2px 7px rgba(0,0,0,.05);}
.bitem.lk{opacity:.35;filter:grayscale(1);}
.hitem{display:flex;align-items:center;gap:9px;background:#fff;border-radius:12px;padding:10px 12px;margin-bottom:6px;box-shadow:0 2px 6px rgba(0,0,0,.04);}

/* TOAST */
.toast{position:fixed;top:18px;left:50%;transform:translateX(-50%);background:#1C2B22;color:#fff;padding:9px 18px;border-radius:20px;font-size:12px;font-weight:600;z-index:500;animation:tin .3s ease;white-space:nowrap;pointer-events:none;}
@keyframes tin{from{opacity:0;transform:translateX(-50%) translateY(-10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
`;

// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  // ── TABS & SCREENS ──────────────────────────────────────────────────────────
  const [tab,setTab]             = useState("home");
  const [screen,setScreen]       = useState("main");   // main | game | result
  const [gameType,setGameType]   = useState(null);
  const [toast,setToast]         = useState("");
  const showToast = (m) => {setToast(m);setTimeout(()=>setToast(""),2600);};

  // ── PATIENT DATA ────────────────────────────────────────────────────────────
  const [patient,setPatient]     = useState(DEFAULT_PATIENT);
  const [editSection,setEditSection] = useState(null); // null | "basic" | "medical" | "home" | "contacts" | "contact-edit"
  const [editForm,setEditForm]   = useState({});
  const [editContactIdx,setEditContactIdx] = useState(null);

  // open edit modal helpers
  const openEdit = (sec) => {
    if(sec==="basic")    setEditForm({name:patient.name,age:patient.age,idCard:patient.idCard});
    if(sec==="medical")  setEditForm({bloodType:patient.bloodType,disease:patient.disease,allergy:patient.allergy});
    if(sec==="home")     setEditForm({address:patient.address,homeLat:patient.homeLat,homeLng:patient.homeLng,homeRadius:patient.homeRadius});
    if(sec==="add-contact") setEditForm({name:"",relation:"",phone:"",emoji:"👤"});
    setEditSection(sec);
  };
  const openEditContact = (i) => {
    setEditForm({...patient.contacts[i]});
    setEditContactIdx(i);
    setEditSection("contact-edit");
  };
  const saveEdit = () => {
    if(editSection==="basic")   setPatient(p=>({...p,...editForm}));
    if(editSection==="medical") setPatient(p=>({...p,...editForm}));
    if(editSection==="home")    setPatient(p=>({...p,...editForm}));
    if(editSection==="add-contact") setPatient(p=>({...p,contacts:[...p.contacts,{...editForm,emoji:editForm.emoji||"👤"}]}));
    if(editSection==="contact-edit"){
      setPatient(p=>{const c=[...p.contacts];c[editContactIdx]={...editForm};return{...p,contacts:c};});
    }
    setEditSection(null);
    showToast("✅ บันทึกข้อมูลเรียบร้อย");
  };
  const deleteContact = (i) => {
    setPatient(p=>({...p,contacts:p.contacts.filter((_,idx)=>idx!==i)}));
    setEditSection(null);
    showToast("🗑 ลบผู้ติดต่อแล้ว");
  };

  // ── GPS / LOCATION ──────────────────────────────────────────────────────────
  const [gpsPos,setGpsPos]       = useState(null);   // {lat,lng,acc}
  const [gpsErr,setGpsErr]       = useState("");
  const [gpsLoading,setGpsLoading] = useState(false);
  const [gpsAddr,setGpsAddr]     = useState("กำลังระบุตำแหน่ง...");
  const [lastUpdate,setLastUpdate] = useState(null);
  const watchIdRef               = useRef(null);

  const startGPS = useCallback(() => {
    if(!navigator.geolocation){setGpsErr("เบราว์เซอร์นี้ไม่รองรับ GPS");return;}
    setGpsLoading(true); setGpsErr("");
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const {latitude:lat,longitude:lng,accuracy:acc} = pos.coords;
        setGpsPos({lat,lng,acc});
        setLastUpdate(new Date());
        setGpsLoading(false);
        // Simulate address from coordinates (production: use Geocoding API)
        setGpsAddr(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
      },
      (err) => {
        setGpsLoading(false);
        if(err.code===1) setGpsErr("ไม่ได้รับอนุญาตให้เข้าถึง GPS");
        else if(err.code===2) setGpsErr("ไม่สามารถระบุตำแหน่งได้");
        else setGpsErr("เกิดข้อผิดพลาด GPS");
      },
      {enableHighAccuracy:true,timeout:15000,maximumAge:5000}
    );
  },[]);

  useEffect(()=>{
    startGPS();
    return ()=>{ if(watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current); };
  },[startGPS]);

  // Distance from home
  const homeLat  = parseFloat(patient.homeLat) || 13.7225;
  const homeLng  = parseFloat(patient.homeLng) || 100.5753;
  const homeRadius = parseFloat(patient.homeRadius) || 500;
  const distFromHome = gpsPos ? calcDist(gpsPos.lat,gpsPos.lng,homeLat,homeLng) : null;
  const inSafeZone   = distFromHome !== null ? distFromHome <= homeRadius : null;
  const zonePct      = distFromHome !== null ? Math.min(100,(distFromHome/homeRadius)*100) : 0;

  // Capture current GPS as home
  const setHomeHere = () => {
    if(!gpsPos){showToast("⚠️ ยังไม่ได้รับสัญญาณ GPS");return;}
    setPatient(p=>({...p, homeLat:gpsPos.lat.toFixed(6), homeLng:gpsPos.lng.toFixed(6)}));
    showToast("✅ ตั้งตำแหน่งบ้านที่นี่แล้ว");
  };

  // ── GAMES ───────────────────────────────────────────────────────────────────
  const [diff,setDiff]           = useState("easy");
  const [matchCards,setMC]       = useState([]);
  const [flipped,setFlipped]     = useState([]);
  const [matched,setMatched]     = useState([]);
  const [moves,setMoves]         = useState(0);
  const [seqOrder,setSeqOrder]   = useState([]);
  const seqCards = useRef(shuffle(SEQS[0].steps.map((s,i)=>({step:s,emoji:SEQS[0].emojis[i],idx:i})))).current;
  const [sndCat,setSndCat]       = useState("preset");
  const [sndIdx,setSndIdx]       = useState(0);
  const [sndAns,setSndAns]       = useState(null);
  const [sndPlay,setSndPlay]     = useState(false);
  const [ytq,setYtq]             = useState("");
  const [fvList,setFvList]       = useState([{id:1,name:"แม่",emoji:"👩"},{id:2,name:"พ่อ",emoji:"👨"}]);
  const [newFam,setNewFam]       = useState("");
  const [isRec,setIsRec]         = useState(false);
  const [recSecs,setRecSecs]     = useState(0);
  const [recs,setRecs]           = useState([{id:1,name:"บันทึก 25 พ.ค.",dur:"2:34",date:"25 พ.ค."},{id:2,name:"เล่านิทาน",dur:"5:12",date:"24 พ.ค."}]);
  const recRef                   = useRef(null);
  const [qIdx,setQIdx]           = useState(0);
  const [qAns,setQAns]           = useState(false);
  const [xp,setXp]               = useState(320);
  const [streak]                 = useState(7);
  const [dailyDone,setDD]        = useState([true,false,false,false]);
  const [gameScore,setGS]        = useState(0);
  const [gameTime,setGT]         = useState(0);
  const timerRef                 = useRef(null);

  const initMatch = useCallback((d=diff)=>{
    const pairs = DIFF[d].pairs;
    const cards = shuffle([...EMOJIS.slice(0,pairs),...EMOJIS.slice(0,pairs)].map((e,i)=>({id:i,emoji:e,val:e})));
    setMC(cards);setFlipped([]);setMatched([]);setMoves(0);setGS(0);setGT(0);
  },[diff]);

  useEffect(()=>{if(gameType==="match")initMatch(diff);},[gameType]);
  useEffect(()=>{
    if(screen==="game"&&gameType){timerRef.current=setInterval(()=>setGT(t=>t+1),1000);return()=>clearInterval(timerRef.current);}
  },[screen,gameType]);

  const flipCard = (id) => {
    if(matched.includes(id)||flipped.includes(id)||flipped.length===2)return;
    const nf=[...flipped,id];setFlipped(nf);
    if(nf.length===2){
      setMoves(m=>m+1);const[a,b]=nf;
      if(matchCards[a].val===matchCards[b].val){
        setTimeout(()=>{
          setMatched(m=>{const nm=[...m,a,b];
            if(nm.length===matchCards.length){
              setGS(Math.max(50,100+parseInt(DIFF[diff].pairs)*10-moves*3));
              setScreen("result");clearInterval(timerRef.current);
              setXp(x=>x+50);setDD(d=>{const n=[...d];n[0]=true;return n;});
            }return nm;});
          setFlipped([]);},400);
      }else{setTimeout(()=>setFlipped([]),900);}
    }
  };

  const seqTap = (i) => {
    const no=[...seqOrder,i];setSeqOrder(no);
    if(no.length===SEQS[0].steps.length){
      setTimeout(()=>{setGS(no.every((v,idx)=>v===idx)?100:60);setScreen("result");clearInterval(timerRef.current);setXp(x=>x+40);setDD(d=>{const n=[...d];n[1]=true;return n;});},500);
    }
  };

  const sndAnswer = (opt) => {
    setSndAns(opt);
    setTimeout(()=>{
      if(sndIdx<SOUNDS.length-1){setSndIdx(i=>i+1);setSndAns(null);}
      else{setGS(85);setScreen("result");clearInterval(timerRef.current);setXp(x=>x+45);setDD(d=>{const n=[...d];n[2]=true;return n;});}
    },1200);
  };

  const toggleRec = () => {
    if(!isRec){setIsRec(true);setRecSecs(0);recRef.current=setInterval(()=>setRecSecs(t=>t+1),1000);}
    else{setIsRec(false);clearInterval(recRef.current);
      const nm=`บันทึกเสียง ${new Date().toLocaleDateString("th-TH",{day:"numeric",month:"short"})}`;
      setRecs(r=>[{id:Date.now(),name:nm,dur:fmtTime(recSecs),date:new Date().toLocaleDateString("th-TH",{day:"numeric",month:"short"})}, ...r]);
      showToast("✅ บันทึกเสียงเรียบร้อย");
    }
  };

  const goGame = (t) => {setGameType(t);setScreen("game");setSndIdx(0);setSndAns(null);setSeqOrder([]);setQIdx(0);setQAns(false);};
  const goHome = () => {setScreen("main");setGameType(null);clearInterval(timerRef.current);};

  const shareToLine = () => {
    const names={match:"เกมจับคู่ภาพ",sequence:"เกมเรียงลำดับ",sound:"เกมจำเสียง",question:"คำถามความทรงจำ"};
    const msg=`🧠 SMART MEMORY LIFE\n👤 ${patient.name}\n🎮 ${names[gameType]}\n🏆 คะแนน: ${gameScore}\n⏱ เวลา: ${fmtTime(gameTime)}\n⭐ XP: +${gameType==="match"?50:40}\n🔥 Streak: ${streak} วัน\n#SmartMemoryLife`;
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent("https://smart-memory.app")}&text=${encodeURIComponent(msg)}`,"_blank");
    showToast("📤 เปิด LINE แล้ว");
  };

  const DAYS=["อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัสบดี","ศุกร์","เสาร์"];
  const MONTHS=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
  const today=new Date();

  // ══════════════════════════════════════════════════════════════════════════
  // RESULT
  // ══════════════════════════════════════════════════════════════════════════
  if(screen==="result") return (
    <div className="app"><style>{css}</style>{toast&&<div className="toast">{toast}</div>}
      <div className="res">
        <div className="re">🎉</div>
        <div className="rt">ยอดเยี่ยมมาก!</div>
        <div className="rs">สมองแข็งแรงขึ้นทุกวัน 💪</div>
        <div className="rstats">
          <div className="rstat"><div className="rv">{gameScore}</div><div className="rl">คะแนน</div></div>
          <div className="rstat"><div className="rv">{fmtTime(gameTime)}</div><div className="rl">เวลา</div></div>
          <div className="rstat"><div className="rv">+{gameType==="match"?50:gameType==="sequence"?40:gameType==="sound"?45:35}</div><div className="rl">XP</div></div>
        </div>
        <div className="bres">
          <div style={{fontSize:12,opacity:.75,marginBottom:6}}>🧠 ผลต่อสมอง</div>
          {gameType==="match"    &&<div style={{fontSize:12,lineHeight:1.8}}>✅ ความจำระยะสั้น<br/>✅ สมาธิ<br/>✅ Hippocampus</div>}
          {gameType==="sequence" &&<div style={{fontSize:12,lineHeight:1.8}}>✅ Executive Function<br/>✅ ลำดับความคิด<br/>✅ Prefrontal Cortex</div>}
          {gameType==="sound"    &&<div style={{fontSize:12,lineHeight:1.8}}>✅ อารมณ์ความจำ<br/>✅ Hippocampus<br/>✅ Auditory Memory</div>}
          {gameType==="question" &&<div style={{fontSize:12,lineHeight:1.8}}>✅ Long-term Memory<br/>✅ อารมณ์เชิงบวก<br/>✅ ลดซึมเศร้า</div>}
        </div>
        <div className="srow">
          <button className="sbtn sline" onClick={shareToLine}><Ic n="line" s={17} c="#fff"/>แชร์ LINE</button>
          <button className="sbtn scopy" onClick={()=>{navigator.clipboard?.writeText(`SMART MEMORY LIFE | ${patient.name} | คะแนน ${gameScore}`).then(()=>showToast("📋 คัดลอกแล้ว")).catch(()=>showToast("คัดลอกไม่ได้"));}}>
            <Ic n="share" s={17} c="#fff"/>คัดลอก
          </button>
        </div>
        <button className="rbk" onClick={goHome}>🏠 กลับหน้าแรก</button>
      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // GAME SCREEN
  // ══════════════════════════════════════════════════════════════════════════
  if(screen==="game"){
    const titles={match:"เกมจับคู่ภาพ",sequence:"เกมเรียงลำดับ",sound:"เกมจำเสียง",question:"คำถามความทรงจำ"};
    const total=gameType==="match"?matchCards.length:gameType==="sequence"?SEQS[0].steps.length:gameType==="sound"?SOUNDS.length:QUESTIONS.length;
    const done =gameType==="match"?matched.length:gameType==="sequence"?seqOrder.length:gameType==="sound"?sndIdx:qIdx;
    const curSound = SOUNDS[sndIdx%SOUNDS.length];
    return (
      <div className="app"><style>{css}</style>{toast&&<div className="toast">{toast}</div>}
        <div className="gs">
          <div className="gh">
            <div className="ght">
              <div className="bbtn" onClick={goHome}><Ic n="back" s={19} c="#fff"/></div>
              <div style={{flex:1}}><div className="gtitle">{titles[gameType]}</div><div className="gsub">SMART MEMORY LIFE</div></div>
              <div style={{fontSize:12,color:"rgba(255,255,255,.8)",fontWeight:600}}>{fmtTime(gameTime)}</div>
            </div>
            {gameType==="match"&&(
              <div style={{display:"flex",gap:6,marginBottom:6}}>
                {Object.entries(DIFF).map(([k,v])=>(
                  <div key={k} onClick={()=>{setDiff(k);initMatch(k);}}
                    style={{flex:1,border:`2px solid ${diff===k?v.col:"rgba(255,255,255,.22)"}`,borderRadius:9,padding:"5px 3px",textAlign:"center",cursor:"pointer",background:diff===k?v.col:"transparent",color:"#fff",fontSize:10,fontWeight:700,transition:"all .2s"}}>
                    {v.label}
                  </div>
                ))}
              </div>
            )}
            <div className="pw"><div className="pf" style={{width:`${total?done/total*100:0}%`}}/></div>
          </div>

          {/* MATCH */}
          {gameType==="match"&&(
            <>
              <div style={{padding:"10px 15px 0",display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
                <span className="chip">🧠 ความจำ</span><span className="chip">🎯 สมาธิ</span>
                <span style={{marginLeft:"auto",fontSize:11,color:T.muted,fontWeight:600}}>{moves} ครั้ง</span>
              </div>
              <div className="mg4">
                {matchCards.map((card,i)=>{
                  const isF=flipped.includes(i)||matched.includes(i);
                  return(
                    <div key={i} className={`mc ${isF?(matched.includes(i)?"mt":"fl"):""}`} onClick={()=>flipCard(i)} style={{position:"relative"}}>
                      {isF?<span style={{fontSize:22,filter:matched.includes(i)?"brightness(10)":"none",zIndex:1}}>{card.emoji}</span>:<div className="cb">🌿</div>}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* SEQUENCE */}
          {gameType==="sequence"&&(
            <div className="sqc">
              <div className="sqq"><div style={{fontSize:14,fontWeight:600}}>{SEQS[0].topic}</div><div style={{fontSize:11,color:T.muted,marginTop:3}}>เรียงลำดับจากแรกไปสุดท้าย ({seqOrder.length}/{SEQS[0].steps.length})</div></div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10,minHeight:34}}>
                {seqOrder.map((i,p)=>(
                  <div key={p} style={{background:"#E8F5EE",borderRadius:8,padding:"4px 9px",fontSize:11,fontWeight:600,color:T.primary,display:"flex",alignItems:"center",gap:4}}>
                    <span style={{background:T.primary,color:"#fff",borderRadius:"50%",width:16,height:16,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10}}>{p+1}</span>
                    {seqCards[i].emoji} {seqCards[i].step}
                  </div>
                ))}
              </div>
              <div className="sqg">
                {seqCards.map((item,i)=>{const sel=seqOrder.indexOf(i);return(
                  <div key={i} className={`sqcard ${sel>=0?"sel":""}`} onClick={()=>!seqOrder.includes(i)&&seqTap(i)}>
                    <div style={{fontSize:34,marginBottom:5}}>{item.emoji}</div>
                    <div style={{fontSize:12,color:T.muted}}>{item.step}</div>
                    {sel>=0&&<div style={{width:23,height:23,background:T.primary,borderRadius:"50%",color:"#fff",fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",margin:"5px auto 0"}}>{sel+1}</div>}
                  </div>
                );})}
              </div>
            </div>
          )}

          {/* SOUND */}
          {gameType==="sound"&&(
            <div className="sndc">
              <div className="stabs">
                {[["preset","🔊 เสียงธรรมชาติ"],["family","👨‍👩‍👧 เสียงครอบครัว"],["youtube","🎵 ค้นหาเพลง"]].map(([k,l])=>(
                  <div key={k} className={`stab ${sndCat===k?"act":""}`} onClick={()=>setSndCat(k)}>{l}</div>
                ))}
              </div>
              {sndCat==="preset"&&(
                <>
                  <div style={{textAlign:"center",marginBottom:9,color:T.muted,fontSize:12}}>ข้อ {sndIdx+1}/{SOUNDS.length}</div>
                  <div className="spbtn" onClick={()=>setSndPlay(p=>!p)}>
                    <div className="wrow">{Array.from({length:11}).map((_,i)=><div key={i} className="wb" style={{animationDelay:`${i*.1}s`,animationPlayState:sndPlay?"running":"paused"}}/>)}</div>
                    <div style={{color:"#fff",fontSize:14,fontWeight:600}}>{curSound.sound}</div>
                    <div style={{color:"rgba(255,255,255,.7)",fontSize:11,marginTop:3}}>{sndPlay?"⏸ แตะเพื่อหยุด":"▶️ แตะเพื่อเล่น"}</div>
                  </div>
                  <div style={{textAlign:"center",marginBottom:10,fontSize:13,fontWeight:600}}>นี่คือเสียงอะไร?</div>
                  <div className="sopts">
                    {curSound.options.map((opt,i)=>(
                      <div key={i} className={`sopt ${sndAns===opt?(opt===curSound.answer?"ok":"ng"):""}`} onClick={()=>!sndAns&&sndAnswer(opt)}>
                        <div style={{fontSize:29,marginBottom:5}}>{curSound.emojis[i]}</div>
                        <div style={{fontSize:12,fontWeight:500}}>{opt.replace(/^[^ ]+ /,"")}</div>
                      </div>
                    ))}
                  </div>
                  {sndAns&&<div style={{textAlign:"center",marginTop:11,fontSize:13,fontWeight:700,color:sndAns===curSound.answer?T.success:T.danger}}>{sndAns===curSound.answer?"🎉 ถูกต้อง!":"❌ คำตอบคือ "+curSound.answer}</div>}
                </>
              )}
              {sndCat==="youtube"&&(
                <>
                  <div className="ib"><span style={{fontSize:17}}>🎵</span><span className="ib-t">พิมพ์ชื่อเพลงแล้วเปิด YouTube ฟังเพลงความทรงจำได้เลย</span></div>
                  <div style={{display:"flex",gap:8,marginBottom:12}}>
                    <input className="yti" placeholder="ชื่อเพลง เช่น สาวนา รำวง..." value={ytq} onChange={e=>setYtq(e.target.value)} onKeyDown={e=>e.key==="Enter"&&ytq.trim()&&window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(ytq)}`,"_blank")}/>
                    <button className="ytb" onClick={()=>{if(!ytq.trim()){showToast("พิมพ์ชื่อเพลงก่อน");return;}window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(ytq)}`,"_blank");}}>
                      <Ic n="yt" s={15} c="#fff"/>เปิด
                    </button>
                  </div>
                  {["เพลงรำวงเก่า","สาวนา ลูกทุ่ง","เพลงพระราชนิพนธ์","หนาวลมหนาว"].map(s=>(
                    <div key={s} onClick={()=>setYtq(s)} style={{background:"#F7F3EC",borderRadius:9,padding:"8px 11px",marginBottom:6,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:7,border:"1px solid #D8E8DC"}}>
                      <Ic n="music" s={14} c={T.primary}/>{s}
                    </div>
                  ))}
                </>
              )}
              {sndCat==="family"&&(
                <>
                  <div className="ib"><span style={{fontSize:17}}>👨‍👩‍👧</span><span className="ib-t">เพิ่มเสียงสมาชิกครอบครัว ใช้ชื่อจากข้อมูลผู้ป่วย</span></div>
                  {/* Auto-add from contacts */}
                  {patient.contacts.map((c,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:9,background:"#fff",borderRadius:12,padding:10,marginBottom:7,boxShadow:"0 2px 7px rgba(0,0,0,.05)"}}>
                      <div style={{width:38,height:38,borderRadius:"50%",background:"linear-gradient(135deg,#1B6B4A,#2D8F63)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{c.emoji}</div>
                      <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{c.name}</div><div style={{fontSize:11,color:T.muted}}>{c.relation}</div></div>
                      <div onClick={()=>showToast(`▶️ เล่นเสียง ${c.name}`)} style={{background:T.primary,color:"#fff",borderRadius:9,padding:"6px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>▶️</div>
                      <div onClick={()=>showToast(`🎤 บันทึกเสียง ${c.name}`)} style={{background:"#FFF0F0",color:T.danger,borderRadius:9,padding:"6px 10px",fontSize:11,fontWeight:700,cursor:"pointer",marginLeft:3}}>🎤</div>
                    </div>
                  ))}
                  <div className="rsec" style={{marginTop:10}}>
                    <div style={{fontFamily:"Prompt,sans-serif",fontSize:12,fontWeight:700,marginBottom:9,display:"flex",alignItems:"center",gap:6}}><Ic n="mic" s={15} c={T.danger}/>บันทึกเสียงการสนทนา</div>
                    <button className={`rbtn ${isRec?"rec":""}`} onClick={toggleRec}>
                      <Ic n="mic" s={17} c="#fff"/>{isRec?`⏹ หยุดบันทึก (${fmtTime(recSecs)})`:"🎤 เริ่มบันทึกเสียง"}
                    </button>
                    <div style={{maxHeight:160,overflowY:"auto"}}>
                      {recs.map(r=>(
                        <div key={r.id} className="ritem" onClick={()=>showToast(`▶️ เล่น: ${r.name}`)}>
                          <div className="rplay"><Ic n="play" s={13} c="#fff"/></div>
                          <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600}}>{r.name}</div><div style={{fontSize:10,color:T.muted,marginTop:1}}>{r.date} · {r.dur}</div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* QUESTION */}
          {gameType==="question"&&(
            <div className="qc">
              <div style={{display:"flex",gap:5,marginBottom:9,flexWrap:"wrap"}}>
                <span className="chip">🧠 Long-term Memory</span><span className="chip">💛 อารมณ์ความจำ</span>
              </div>
              <div className="qcard">
                <div style={{fontSize:44,textAlign:"center",marginBottom:9}}>{QUESTIONS[qIdx%QUESTIONS.length].emoji}</div>
                <div style={{fontFamily:"Prompt,sans-serif",fontSize:15,fontWeight:600,color:T.primaryDark,textAlign:"center",lineHeight:1.5}}>{QUESTIONS[qIdx%QUESTIONS.length].q}</div>
              </div>
              <div className="qans" onClick={()=>setQAns(!qAns)}>
                {qAns?<div style={{textAlign:"left",width:"100%"}}><div style={{fontSize:11,color:T.muted,marginBottom:5}}>💭 พิมพ์หรือบอกเล่า...</div><div style={{fontSize:13}}>{QUESTIONS[qIdx%QUESTIONS.length].hint}</div></div>
                     :<div><div style={{fontSize:26,marginBottom:5}}>💭</div><div style={{fontSize:12}}>แตะเพื่อบันทึกความทรงจำ</div><div style={{fontSize:11,color:T.muted,marginTop:3}}>{QUESTIONS[qIdx%QUESTIONS.length].hint}</div></div>}
              </div>
              <button className="abtn" onClick={()=>{
                if(qIdx<QUESTIONS.length-1){setQIdx(i=>i+1);setQAns(false);}
                else{setGS(90);setScreen("result");clearInterval(timerRef.current);setXp(x=>x+35);setDD(d=>{const n=[...d];n[3]=true;return n;});}
              }}>{qIdx<QUESTIONS.length-1?"คำถามต่อไป ➡️":"เสร็จสิ้น ✅"}</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // MAIN APP
  // ══════════════════════════════════════════════════════════════════════════
  const NAV=[
    {id:"home",    label:"หน้าแรก",  icon:"home"},
    {id:"games",   label:"เกม",       icon:"game"},
    {id:"gps",     label:"GPS",        icon:"gps"},
    {id:"profile", label:"ข้อมูล",    icon:"profile"},
    {id:"sos",     label:"SOS",        icon:"sos"},
  ];

  // ── PROFILE PAGE ────────────────────────────────────────────────────────────
  const ProfilePage = () => (
    <div>
      {/* Hero */}
      <div className="prof-hero">
        <div className="prof-avatar">👴</div>
        <div className="prof-name">{patient.name}</div>
        <div className="prof-sub">อายุ {patient.age} ปี</div>
        <div className="prof-chips">
          {patient.bloodType&&<span className="prof-chip">🩸 กรุ๊ปเลือด {patient.bloodType}</span>}
          {patient.disease&&<span className="prof-chip">💊 {patient.disease}</span>}
        </div>
      </div>

      {/* BASIC INFO */}
      <div className="section-card">
        <div className="sc-head">
          <div className="sc-head-title"><Ic n="id" s={16} c={T.primary}/>ข้อมูลส่วนตัว</div>
          <button className="sc-edit-btn" onClick={()=>openEdit("basic")}><Ic n="edit" s={12} c={T.primary}/>แก้ไข</button>
        </div>
        {[
          {icon:"👤",key:"ชื่อ-นามสกุล",val:patient.name},
          {icon:"🎂",key:"อายุ",val:`${patient.age} ปี`},
          {icon:"🪪",key:"เลขบัตรประชาชน",val:patient.idCard},
        ].map((r,i)=>(
          <div key={i}>
            <div className="info-row">
              <span className="info-icon">{r.icon}</span>
              <div><div className="info-key">{r.key}</div><div className="info-val">{r.val}</div></div>
            </div>
            {i<2&&<div className="info-divider"/>}
          </div>
        ))}
      </div>

      {/* MEDICAL INFO */}
      <div className="section-card">
        <div className="sc-head">
          <div className="sc-head-title"><span style={{fontSize:16}}>💊</span>ข้อมูลสุขภาพ</div>
          <button className="sc-edit-btn" onClick={()=>openEdit("medical")}><Ic n="edit" s={12} c={T.primary}/>แก้ไข</button>
        </div>
        {[
          {icon:"🩸",key:"กรุ๊ปเลือด",val:patient.bloodType},
          {icon:"🏥",key:"โรคประจำตัว",val:patient.disease||"ไม่มี"},
          {icon:"⚠️",key:"ยาที่แพ้",val:patient.allergy||"ไม่มี"},
        ].map((r,i)=>(
          <div key={i}>
            <div className="info-row">
              <span className="info-icon">{r.icon}</span>
              <div><div className="info-key">{r.key}</div><div className="info-val">{r.val}</div></div>
            </div>
            {i<2&&<div className="info-divider"/>}
          </div>
        ))}
      </div>

      {/* HOME / GPS BASE */}
      <div className="section-card">
        <div className="sc-head">
          <div className="sc-head-title"><Ic n="pin" s={16} c={T.danger}/>ที่อยู่และพิกัดบ้าน</div>
          <button className="sc-edit-btn" onClick={()=>openEdit("home")}><Ic n="edit" s={12} c={T.primary}/>แก้ไข</button>
        </div>
        <div className="info-row"><span className="info-icon">🏠</span><div><div className="info-key">ที่อยู่</div><div className="info-val">{patient.address}</div></div></div>
        <div className="info-divider"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,margin:"8px 0"}}>
          <div style={{background:"#E8F5EE",borderRadius:11,padding:10}}>
            <div style={{fontSize:10,color:T.muted,marginBottom:2}}>🌐 Latitude</div>
            <div style={{fontFamily:"Prompt,sans-serif",fontSize:13,fontWeight:700,color:T.primary}}>{patient.homeLat}</div>
          </div>
          <div style={{background:"#E8F5EE",borderRadius:11,padding:10}}>
            <div style={{fontSize:10,color:T.muted,marginBottom:2}}>🌐 Longitude</div>
            <div style={{fontFamily:"Prompt,sans-serif",fontSize:13,fontWeight:700,color:T.primary}}>{patient.homeLng}</div>
          </div>
        </div>
        <div style={{background:"#FFF8E0",borderRadius:11,padding:10,marginBottom:8,display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:14}}>📏</span>
          <div style={{flex:1}}><div style={{fontSize:10,color:T.muted,marginBottom:1}}>รัศมีเขตปลอดภัย</div><div style={{fontFamily:"Prompt,sans-serif",fontSize:13,fontWeight:700,color:T.accent}}>{patient.homeRadius} เมตร</div></div>
        </div>
        {/* Set home from current GPS */}
        <button onClick={setHomeHere} style={{width:"100%",background:gpsPos?"#E8F5EE":"#F5F5F5",color:gpsPos?T.primary:T.muted,border:`2px dashed ${gpsPos?T.primary:T.border}`,borderRadius:11,padding:"10px",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7,fontFamily:"Sarabun,sans-serif"}}>
          <Ic n="pin" s={14} c={gpsPos?T.primary:T.muted}/>
          {gpsPos?`📍 ตั้งตำแหน่งบ้านที่นี่ (${gpsPos.lat.toFixed(4)}, ${gpsPos.lng.toFixed(4)})`:"รอสัญญาณ GPS..."}
        </button>
      </div>

      {/* CONTACTS */}
      <div className="section-card">
        <div className="sc-head">
          <div className="sc-head-title"><Ic n="phone" s={16} c={T.info}/>ผู้ติดต่อฉุกเฉิน</div>
          <button className="sc-edit-btn" onClick={()=>openEdit("add-contact")} style={{background:"#E8F0FA",color:T.info}}><span style={{fontSize:12}}>➕</span>เพิ่ม</button>
        </div>
        {patient.contacts.map((c,i)=>(
          <div key={i} className="contact-card">
            <div className="contact-av">{c.emoji}</div>
            <div className="contact-info">
              <div className="contact-name">{c.name}</div>
              <div className="contact-rel">{c.relation}</div>
              <div className="contact-phone">📞 {c.phone}</div>
            </div>
            <button onClick={()=>openEditContact(i)} style={{background:"#F0F0F0",border:"none",borderRadius:9,padding:"6px 9px",cursor:"pointer",fontSize:11,marginRight:4}}>✏️</button>
            <div className="call-btn" onClick={()=>showToast(`📞 กำลังโทร ${c.name} ${c.phone}...`)}>📞</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── GPS PAGE ─────────────────────────────────────────────────────────────────
  const GpsPage = () => {
    const zoneColor = inSafeZone===null?"#6B7F72":inSafeZone?T.success:T.danger;
    const zoneLabel = inSafeZone===null?"กำลังตรวจสอบ...":inSafeZone?"อยู่ในเขตปลอดภัย ✅":"⚠️ ออกนอกเขตปลอดภัย!";
    const markerColor = inSafeZone===null?"#4A90D9":inSafeZone?T.success:T.danger;
    const fillColor = inSafeZone===null?"#4A90D9":inSafeZone?T.success:T.danger;

    return (
      <div className="gps-screen">
        {/* Status bar */}
        <div className="gps-status-bar">
          <div className="gps-status">
            <div className="gps-dot" style={{background:gpsLoading?"#F5A623":gpsPos?T.success:T.danger}}/>
            <span style={{fontSize:12,fontWeight:600,color:gpsPos?T.success:gpsLoading?"#F5A623":T.danger}}>
              {gpsLoading?"กำลังระบุตำแหน่ง...":gpsPos?"GPS เชื่อมต่อแล้ว":gpsErr||"ไม่พบสัญญาณ GPS"}
            </span>
          </div>
          <button className="refresh-btn" style={{background:T.primary}} onClick={startGPS}>
            <Ic n="refresh" s={13} c="#fff"/>รีเฟรช
          </button>
        </div>

        {/* MAP */}
        <div className="map-wrap">
          <div className="map-mock">
            <div className="map-grid"/>
            <div className="road-h" style={{top:"38%"}}/><div className="road-h" style={{top:"63%"}}/>
            <div className="road-v" style={{left:"34%"}}/><div className="road-v" style={{left:"68%"}}/>
            {/* Safe zone circle (visual) */}
            <div className="home-zone" style={{width:100,height:100,top:"50%",left:"50%",transform:"translate(-80%,-60%)"}}/>
            {/* Home marker */}
            <div className="map-home" style={{top:"calc(50% - 68px)",left:"calc(50% - 60px)",fontSize:20}}>🏠</div>
            {/* Current position */}
            <div className="marker-wrap">
              <div className="map-pulse" style={{background:markerColor+"44"}}/>
              <div className="map-dot" style={{background:markerColor}}>
                <span className="map-dot-inner">👴</span>
              </div>
            </div>
            <div className="map-addr">
              <Ic n="pin" s={12} c={T.danger}/> {gpsPos?`${gpsPos.lat.toFixed(5)}, ${gpsPos.lng.toFixed(5)}`:gpsAddr}
            </div>
            {distFromHome!==null&&<div className="map-dist">{fmtDist(distFromHome)} จากบ้าน</div>}
          </div>
        </div>

        {/* GPS Coordinates */}
        <div className="gps-coords">
          <div className="coord-box">
            <div className="coord-lbl">🌐 Latitude</div>
            <div className="coord-val">{gpsPos?gpsPos.lat.toFixed(6):patient.homeLat}</div>
            <div style={{fontSize:9,color:T.muted,marginTop:2}}>{gpsPos?"ตำแหน่งปัจจุบัน":"ตำแหน่งบ้าน"}</div>
          </div>
          <div className="coord-box">
            <div className="coord-lbl">🌐 Longitude</div>
            <div className="coord-val">{gpsPos?gpsPos.lng.toFixed(6):patient.homeLng}</div>
            <div style={{fontSize:9,color:T.muted,marginTop:2}}>{gpsPos?"ตำแหน่งปัจจุบัน":"ตำแหน่งบ้าน"}</div>
          </div>
        </div>

        {/* Distance / Safe Zone */}
        <div className="dist-card">
          <div className="dist-top">
            <div className="dist-title" style={{color:zoneColor}}><Ic n="nav" s={14} c={zoneColor}/>{zoneLabel}</div>
          </div>
          {distFromHome!==null&&(
            <>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <span style={{fontSize:11,color:T.muted,flexShrink:0}}>บ้าน</span>
                <div className="dist-meter">
                  <div className="dist-fill" style={{width:`${Math.min(100,zonePct)}%`,background:fillColor}}/>
                </div>
                <span className="dist-pct" style={{color:fillColor}}>{fmtDist(distFromHome)}</span>
              </div>
              <div className="zone-info">รัศมีปลอดภัย {patient.homeRadius} ม. | ห่างจากบ้าน {fmtDist(distFromHome)} ({Math.round(zonePct)}%)</div>
            </>
          )}
          {gpsPos&&<div style={{fontSize:10,color:T.muted,marginTop:5}}>ความแม่นยำ ±{Math.round(gpsPos.acc||0)} ม. · อัปเดต {lastUpdate?.toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}</div>}
        </div>

        {/* Zone status card */}
        <div className={`alert-card ${inSafeZone===null?"safe":inSafeZone?"safe":distFromHome>homeRadius*1.5?"danger":"warn"}`}>
          <span style={{fontSize:22}}>{inSafeZone===null?"📡":inSafeZone?"✅":distFromHome>homeRadius*1.5?"🚨":"⚠️"}</span>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:inSafeZone===null?T.muted:inSafeZone?T.success:T.danger}}>
              {inSafeZone===null?"รอสัญญาณ GPS":inSafeZone?"ผู้ป่วยอยู่ในเขตปลอดภัย":distFromHome>homeRadius*1.5?"ผู้ป่วยออกไกลมาก — แจ้งเตือนผู้ดูแล!":"ผู้ป่วยใกล้ออกนอกเขต"}
            </div>
            <div style={{fontSize:11,color:T.muted,marginTop:2}}>
              {inSafeZone===null?"กดรีเฟรชเพื่อรับตำแหน่ง":inSafeZone?`อยู่ในรัศมี ${patient.homeRadius} ม. จากบ้าน`:`ออกไป ${fmtDist(distFromHome)} จากบ้าน`}
            </div>
          </div>
        </div>

        {/* Base info */}
        <div style={{background:"#fff",borderRadius:14,padding:13,boxShadow:"0 2px 8px rgba(0,0,0,.05)"}}>
          <div style={{fontFamily:"Prompt,sans-serif",fontSize:12,fontWeight:700,marginBottom:9,display:"flex",alignItems:"center",gap:6}}>
            <Ic n="home2" s={14} c={T.primary}/>พิกัดบ้าน (ฐาน GPS)
          </div>
          <div style={{fontSize:12,color:T.muted,marginBottom:4}}>🏠 {patient.address}</div>
          <div style={{fontSize:11,color:T.primary,fontWeight:600,fontFamily:"monospace"}}>📍 {patient.homeLat}, {patient.homeLng}</div>
          <div style={{display:"flex",gap:7,marginTop:10}}>
            <button onClick={setHomeHere} style={{flex:1,background:gpsPos?"#E8F5EE":"#F5F5F5",color:gpsPos?T.primary:T.muted,border:`1.5px solid ${gpsPos?T.primary:T.border}`,borderRadius:10,padding:"9px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Sarabun,sans-serif"}}>
              {gpsPos?"📍 ตั้งที่นี่เป็นบ้าน":"รอ GPS..."}
            </button>
            <button onClick={()=>{setTab("profile");showToast("แก้ไขพิกัดในหน้าข้อมูล");}} style={{flex:1,background:"#E8F0FA",color:T.info,border:`1.5px solid ${T.info}`,borderRadius:10,padding:"9px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Sarabun,sans-serif"}}>
              ✏️ แก้ไขพิกัด
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <style>{css}</style>
      {toast&&<div className="toast">{toast}</div>}

      {/* ── EDIT MODALS ── */}
      {editSection&&(
        <div className="mo" onClick={()=>setEditSection(null)}>
          <div className="mo-box" onClick={e=>e.stopPropagation()}>

            {editSection==="basic"&&(
              <>
                <div className="mo-title">👤 แก้ไขข้อมูลส่วนตัว</div>
                <div className="inp-lbl">ชื่อ-นามสกุล</div>
                <input className="inp" value={editForm.name||""} onChange={e=>setEditForm(f=>({...f,name:e.target.value}))} placeholder="ชื่อ-นามสกุล"/>
                <div className="row2">
                  <div><div className="inp-lbl">อายุ (ปี)</div><input className="inp" type="number" value={editForm.age||""} onChange={e=>setEditForm(f=>({...f,age:e.target.value}))} placeholder="72"/></div>
                  <div><div className="inp-lbl">เลขบัตรประชาชน</div><input className="inp" value={editForm.idCard||""} onChange={e=>setEditForm(f=>({...f,idCard:e.target.value}))} placeholder="X-XXXX-XXXXX-XX-X"/></div>
                </div>
              </>
            )}

            {editSection==="medical"&&(
              <>
                <div className="mo-title">💊 แก้ไขข้อมูลสุขภาพ</div>
                <div className="inp-lbl">กรุ๊ปเลือด</div>
                <input className="inp" value={editForm.bloodType||""} onChange={e=>setEditForm(f=>({...f,bloodType:e.target.value}))} placeholder="A / B / O / AB"/>
                <div className="inp-lbl">โรคประจำตัว</div>
                <input className="inp" value={editForm.disease||""} onChange={e=>setEditForm(f=>({...f,disease:e.target.value}))} placeholder="เช่น ความดัน, เบาหวาน"/>
                <div className="inp-lbl">ยาที่แพ้</div>
                <input className="inp" value={editForm.allergy||""} onChange={e=>setEditForm(f=>({...f,allergy:e.target.value}))} placeholder="เช่น แพ้ยาเพนิซิลิน"/>
              </>
            )}

            {editSection==="home"&&(
              <>
                <div className="mo-title">🏠 แก้ไขที่อยู่และพิกัดบ้าน</div>
                <div className="inp-lbl">ที่อยู่</div>
                <textarea className="inp" rows={3} value={editForm.address||""} onChange={e=>setEditForm(f=>({...f,address:e.target.value}))} placeholder="บ้านเลขที่..." style={{resize:"vertical"}}/>
                <div className="ib" style={{marginTop:10}}><span style={{fontSize:16}}>💡</span><span className="ib-t">กรอกพิกัด Lat/Lng หรือกด "ตั้งที่นี่" ในหน้า GPS เพื่อใช้ตำแหน่งปัจจุบัน</span></div>
                <div className="row2">
                  <div><div className="inp-lbl">Latitude</div><input className="inp" value={editForm.homeLat||""} onChange={e=>setEditForm(f=>({...f,homeLat:e.target.value}))} placeholder="13.7225"/></div>
                  <div><div className="inp-lbl">Longitude</div><input className="inp" value={editForm.homeLng||""} onChange={e=>setEditForm(f=>({...f,homeLng:e.target.value}))} placeholder="100.5753"/></div>
                </div>
                <div className="inp-lbl">รัศมีเขตปลอดภัย (เมตร)</div>
                <input className="inp" type="number" value={editForm.homeRadius||""} onChange={e=>setEditForm(f=>({...f,homeRadius:e.target.value}))} placeholder="500"/>
                {gpsPos&&(
                  <button onClick={()=>{setEditForm(f=>({...f,homeLat:gpsPos.lat.toFixed(6),homeLng:gpsPos.lng.toFixed(6)}));showToast("📍 ใส่พิกัดปัจจุบันแล้ว");}}
                    style={{marginTop:10,width:"100%",background:"#E8F5EE",color:T.primary,border:`1.5px solid ${T.primary}`,borderRadius:10,padding:"9px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"Sarabun,sans-serif"}}>
                    📍 ใช้พิกัดปัจจุบัน ({gpsPos.lat.toFixed(5)}, {gpsPos.lng.toFixed(5)})
                  </button>
                )}
              </>
            )}

            {(editSection==="add-contact"||editSection==="contact-edit")&&(
              <>
                <div className="mo-title">{editSection==="add-contact"?"➕ เพิ่มผู้ติดต่อ":"✏️ แก้ไขผู้ติดต่อ"}</div>
                <div className="inp-lbl">ชื่อ</div>
                <input className="inp" value={editForm.name||""} onChange={e=>setEditForm(f=>({...f,name:e.target.value}))} placeholder="ชื่อผู้ติดต่อ"/>
                <div className="row2">
                  <div><div className="inp-lbl">ความสัมพันธ์</div><input className="inp" value={editForm.relation||""} onChange={e=>setEditForm(f=>({...f,relation:e.target.value}))} placeholder="ลูก, พยาบาล..."/></div>
                  <div><div className="inp-lbl">อีโมจิ</div><input className="inp" value={editForm.emoji||""} onChange={e=>setEditForm(f=>({...f,emoji:e.target.value}))} placeholder="👩"/></div>
                </div>
                <div className="inp-lbl">เบอร์โทรศัพท์</div>
                <input className="inp" type="tel" value={editForm.phone||""} onChange={e=>setEditForm(f=>({...f,phone:e.target.value}))} placeholder="0XX-XXX-XXXX"/>
                {editSection==="contact-edit"&&(
                  <button onClick={()=>deleteContact(editContactIdx)} style={{width:"100%",marginTop:10,background:"#FFF0F0",color:T.danger,border:`1.5px solid ${T.danger}`,borderRadius:11,padding:"11px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Sarabun,sans-serif"}}>
                    🗑 ลบผู้ติดต่อนี้
                  </button>
                )}
              </>
            )}

            <button className="btn-p" onClick={saveEdit}><Ic n="save" s={16} c="#fff"/> บันทึก</button>
            <button className="btn-s" onClick={()=>setEditSection(null)}>ยกเลิก</button>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <div className="hdr">
        <div className="hdr-row">
          <div>
            <div className="app-name">🧠 SMART MEMORY LIFE</div>
            <div className="app-dev">พัฒนาโดย นายสันชัย สังข์ทอง</div>
          </div>
          <div className="streak">🔥 {streak} วัน</div>
        </div>
        <div className="greet-row">
          <div className="greet">สวัสดี {patient.name} 👋</div>
          <button className="edit-btn" onClick={()=>openEdit("basic")}><Ic n="edit" s={11} c="#fff"/>แก้ชื่อ</button>
        </div>
        <div className="hdr-date">วัน{DAYS[today.getDay()]}ที่ {today.getDate()} {MONTHS[today.getMonth()]} {today.getFullYear()+543}</div>
        <div className="score-bar">
          <div className="sc-item"><div className="sc-val">{xp}</div><div className="sc-lbl">⭐ XP</div></div>
          <div className="sc-div"/>
          <div className="sc-item"><div className="sc-val">{dailyDone.filter(Boolean).length}/4</div><div className="sc-lbl">🎯 กิจกรรม</div></div>
          <div className="sc-div"/>
          <div className="sc-item"><div className="sc-val" style={{fontSize:13}}>{inSafeZone===null?"--":inSafeZone?"✅ ปลอดภัย":"⚠️ ออกนอก"}</div><div className="sc-lbl">📍 GPS</div></div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="ct">
        {tab==="home"&&(
          <>
            <div className="dc">
              <div className="dt">📅 กิจกรรมวันนี้ — {dailyDone.filter(Boolean).length}/4</div>
              {["เกมจับคู่ภาพ","เกมเรียงลำดับ","เกมจำเสียง","คำถามความทรงจำ"].map((n,i)=>(
                <div key={i} className="dtask">
                  <div className={`tck ${dailyDone[i]?"dn":""}`}>{dailyDone[i]&&<Ic n="check" s={12} c="#fff"/>}</div>
                  <span style={{flex:1,fontSize:13,textDecoration:dailyDone[i]?"line-through":"none",opacity:dailyDone[i]?.7:1}}>{n}</span>
                  <span style={{fontSize:11,color:"#FFD88A",fontWeight:600}}>{["+50","+40","+45","+35"][i]} XP</span>
                </div>
              ))}
            </div>

            {/* Quick alert for GPS */}
            {inSafeZone===false&&(
              <div style={{background:"#FFEBEE",border:"1.5px solid #E05252",borderRadius:13,padding:"11px 13px",marginBottom:16,display:"flex",gap:9,alignItems:"center"}}>
                <span style={{fontSize:22}}>🚨</span>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:T.danger}}>ผู้ป่วยออกนอกเขตปลอดภัย!</div>
                  <div style={{fontSize:11,color:T.muted}}>ห่างจากบ้าน {distFromHome?fmtDist(distFromHome):"..."}</div>
                </div>
                <button onClick={()=>setTab("gps")} style={{marginLeft:"auto",background:T.danger,color:"#fff",border:"none",borderRadius:9,padding:"6px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>ดูแผนที่</button>
              </div>
            )}

            <div className="fr">
              <div className="fb sos" onClick={()=>setTab("sos")}><div style={{fontSize:22,marginBottom:5}}>🆘</div><div style={{fontSize:11,fontWeight:700,color:T.danger}}>SOS ฉุกเฉิน</div></div>
              <div className="fb gps" onClick={()=>setTab("gps")}><div style={{fontSize:22,marginBottom:5}}>📍</div><div style={{fontSize:11,fontWeight:600,color:T.muted}}>GPS ติดตาม</div></div>
              <div className="fb rw"  onClick={()=>setTab("profile")}><div style={{fontSize:22,marginBottom:5}}>📋</div><div style={{fontSize:11,fontWeight:600,color:T.muted}}>ข้อมูลผู้ป่วย</div></div>
            </div>

            <div className="st"><span className="sa"/>เกมฝึกสมองวันนี้</div>
            <div className="game-grid">
              {[
                {t:"match",    n:"จับคู่ภาพ",  d:"เปิดไพ่หาคู่เหมือนกัน",     e:"🃏",cl:"gr",b:"ความจำระยะสั้น"},
                {t:"sequence", n:"เรียงลำดับ", d:"จัดขั้นตอนให้ถูกต้อง",      e:"📋",cl:"or",b:"Executive Function"},
                {t:"sound",    n:"จำเสียง",    d:"ฟัง+ค้นเพลง+เสียงครอบครัว", e:"🔊",cl:"bl",b:"Hippocampus"},
                {t:"question", n:"ความทรงจำ",  d:"เล่าเรื่องในอดีตของคุณ",    e:"💭",cl:"pu",b:"Long-term Memory"},
              ].map(g=>(
                <div key={g.t} className={`gc ${g.cl}`} onClick={()=>goGame(g.t)}>
                  <div className={`gi ${g.cl}`}>{g.e}</div>
                  <div className="gn">{g.n}</div>
                  <div className="gd">{g.d}</div>
                  <div className="gb">🧠 {g.b}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab==="games"&&(
          <>
            <div className="ib"><span style={{fontSize:17}}>🎮</span><span className="ib-t">เล่นเกมทุกวัน กระตุ้นสมองและป้องกันอัลไซเมอร์</span></div>
            {[
              {t:"match",    n:"เกม A: จับคู่ภาพ",      d:"มี 3 ระดับความยาก ฝึกความจำระยะสั้น",              e:"🃏",chips:["ความจำระยะสั้น","สมาธิ"]},
              {t:"sequence", n:"เกม B: เรียงลำดับภาพ",   d:"เรียงขั้นตอนในชีวิตประจำวัน",                      e:"📋",chips:["Executive Function","ลำดับความคิด"]},
              {t:"sound",    n:"เกม C: จำเสียง + เพลง", d:"เสียงธรรมชาติ ค้นหาเพลง YouTube เสียงครอบครัว",  e:"🔊",chips:["Hippocampus","อารมณ์ความจำ"]},
              {t:"question", n:"เกม D: คำถามอดีต",       d:"เล่าความทรงจำ ฟื้นฟู Long-term Memory",            e:"💭",chips:["Long-term Memory","ลดซึมเศร้า"]},
            ].map(g=>(
              <div key={g.t} style={{background:"#fff",borderRadius:15,padding:13,marginBottom:9,boxShadow:"0 2px 10px rgba(0,0,0,.06)",cursor:"pointer"}} onClick={()=>goGame(g.t)}>
                <div style={{display:"flex",gap:11,alignItems:"flex-start"}}>
                  <div style={{fontSize:32}}>{g.e}</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"Prompt,sans-serif",fontSize:13,fontWeight:700,marginBottom:3}}>{g.n}</div>
                    <div style={{fontSize:11,color:T.muted,lineHeight:1.5,marginBottom:6}}>{g.d}</div>
                    <div>{g.chips.map(c=><span key={c} className="chip">{c}</span>)}</div>
                  </div>
                  <Ic n="arrow" s={17} c={T.primary}/>
                </div>
              </div>
            ))}
          </>
        )}

        {tab==="gps"&&<GpsPage/>}
        {tab==="profile"&&<ProfilePage/>}

        {tab==="sos"&&(
          <div className="soss">
            <div style={{fontFamily:"Prompt,sans-serif",fontSize:19,fontWeight:800,letterSpacing:2,color:"#fff"}}>🆘 ปุ่มฉุกเฉิน</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginTop:3}}>กดปุ่มเมื่อต้องการความช่วยเหลือ</div>
            <div className="sosbtn" onClick={()=>showToast("📡 ส่งสัญญาณ SOS พร้อมพิกัดแล้ว!")}>
              <div style={{fontFamily:"Prompt,sans-serif",fontSize:28,fontWeight:800,letterSpacing:4,color:"#fff"}}>SOS</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.65)",marginTop:3}}>กดเพื่อขอความช่วยเหลือ</div>
            </div>
            {/* Show location */}
            <div style={{background:"rgba(255,255,255,.08)",borderRadius:13,padding:11,marginBottom:16,textAlign:"center",width:"100%"}}>
              <div style={{fontSize:11,color:"rgba(255,255,255,.55)"}}>📍 ตำแหน่งปัจจุบัน</div>
              <div style={{fontSize:13,fontWeight:600,color:"#fff",marginTop:3}}>{gpsPos?`${gpsPos.lat.toFixed(5)}, ${gpsPos.lng.toFixed(5)}`:"กำลังระบุตำแหน่ง..."}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.45)",marginTop:2}}>{patient.address}</div>
            </div>
            <div style={{width:"100%"}}>
              <div style={{fontSize:12,color:"rgba(255,255,255,.55)",marginBottom:8}}>📞 ผู้ติดต่อฉุกเฉิน</div>
              {patient.contacts.map((c,i)=>(
                <div key={i} className="sosct" onClick={()=>showToast(`📞 กำลังโทร ${c.name} (${c.phone})...`)}>
                  <div style={{width:38,height:38,borderRadius:"50%",background:"linear-gradient(135deg,#1B6B4A,#2D8F63)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{c.emoji}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{c.name}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.5)",marginTop:1}}>{c.relation} · {c.phone}</div>
                  </div>
                  <div style={{background:T.success,width:33,height:33,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>📞</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── BOTTOM NAV ── */}
      <div className="bnav">
        {NAV.map(item=>(
          <div key={item.id} className={`ni ${tab===item.id?"act":""}`} onClick={()=>setTab(item.id)}>
            <Ic n={item.icon} s={22} c={item.id==="sos"?T.danger:tab===item.id?T.primary:T.light}/>
            <span className="nl" style={{color:item.id==="sos"?T.danger:tab===item.id?T.primary:T.muted}}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
