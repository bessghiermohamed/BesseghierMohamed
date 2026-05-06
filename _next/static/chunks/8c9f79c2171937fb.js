(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,68509,e=>{"use strict";var t=e.i(43476),i=e.i(71645),s=e.i(46932),a=e.i(88653),d=e.i(78583),r=e.i(40160),o=e.i(86536);let l=(0,e.i(75254).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);var n=e.i(95468),c=e.i(10980),p=e.i(69638),g=e.i(3116),x=e.i(14683),v=e.i(58377),m=e.i(32095),h=e.i(27225),b=e.i(26154),u=e.i(15288),f=e.i(19455);function y(e){return e>=92?"A+":e>=85?"A":e>=75?"B+":e>=65?"B":e>=55?"C+":e>=40?"C":e>=20?"D":"F"}function w(e){return({"A+":4,A:3.75,"B+":3.5,B:3,"C+":2.5,C:2,D:1,F:0})[e]??0}function k(e,t){let i=t.find(t=>t.subjectId===e);return i?{status:i.status,progress:i.progress}:{status:"not_started",progress:0}}let j={not_started:"لم تبدأ",in_progress:"قيد التقدم",completed:"مكتملة"},C={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.06}}},F={hidden:{opacity:0,y:12},visible:{opacity:1,y:0,transition:{duration:.4,ease:"easeOut"}}};function N(){let{progress:e,subjectNotes:N,studySessions:$}=(0,h.useAppStore)(),[B,D]=(0,i.useState)(!1),[A,z]=(0,i.useState)(!1),[S,M]=(0,i.useState)(!1),E=(0,i.useMemo)(()=>{let t=b.subjectsData.length,i=e.filter(e=>"completed"===e.status).length,s=e.filter(e=>"in_progress"===e.status).length,a=t>0?e.reduce((e,t)=>e+t.progress,0)/t:0;return{total:t,completed:i,inProgress:s,notStarted:t-i-s,overallProgress:a}},[e]),P=(0,i.useMemo)(()=>b.categories.map(t=>{let i=b.subjectsData.filter(e=>e.category===t.id),s=i.length,a=s>0?i.reduce((t,i)=>t+k(i.id,e).progress,0)/s:0;return{...t,total:s,avgProgress:Math.round(a)}}),[e]),T=(0,i.useMemo)(()=>({1:b.subjectsData.filter(e=>1===e.semester).sort((e,t)=>e.order-t.order),2:b.subjectsData.filter(e=>2===e.semester).sort((e,t)=>e.order-t.order)}),[]),O=(0,i.useMemo)(()=>{let t=t=>{let i=0,s=0;return t.forEach(t=>{let a=y(k(t.id,e).progress);i+=w(a),s++}),s>0?Math.round(i/s*100)/100:0};return{sem1:t(T[1]),sem2:t(T[2])}},[e,T]),H=(0,i.useMemo)(()=>(function(e){let t=e.filter(e=>e.completed).map(e=>new Date(e.date).toISOString().split("T")[0]).filter((e,t,i)=>i.indexOf(e)===t).sort().reverse();if(0===t.length)return{currentStreak:0,bestStreak:0};let i=new Date().toISOString().split("T")[0],s=new Date(Date.now()-864e5).toISOString().split("T")[0],a=0;if(t[0]===i||t[0]===s){a=1;for(let e=1;e<t.length;e++){let i=new Date(t[e-1]),s=new Date(t[e]);if(.5>Math.abs((i.getTime()-s.getTime())/864e5-1))a++;else break}}let d=1,r=1;for(let e=1;e<t.length;e++){let i=new Date(t[e-1]),s=new Date(t[e]);.5>Math.abs((i.getTime()-s.getTime())/864e5-1)?d=Math.max(d,++r):r=1}return{currentStreak:a,bestStreak:d}})($),[$]),_=(0,i.useCallback)(()=>{let t,i,s,a=new Date,d=a.toLocaleDateString("ar-DZ",{year:"numeric",month:"long",day:"numeric"}),r=a.toLocaleTimeString("ar-DZ",{hour:"2-digit",minute:"2-digit"}),o=t=>{let i=k(t.id,e),s=y(i.progress),a=N[t.id]||"",d=b.categories.find(e=>e.id===t.category)?.color||"#B91C1C",r="completed"===i.status?"#16A34A":"in_progress"===i.status?"#D97706":"#9CA3AF";return`
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;font-weight:500;">${t.nameAr}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;color:${d};font-size:12px;">${t.category}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">
            <span style="display:inline-block;padding:2px 10px;border-radius:12px;font-size:11px;color:white;background:${r};">${j[i.status]}</span>
          </td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">
            <div style="display:flex;align-items:center;gap:6px;justify-content:center;">
              <div style="flex:1;max-width:80px;height:6px;background:#eee;border-radius:3px;overflow:hidden;">
                <div style="width:${i.progress}%;height:100%;background:${d};border-radius:3px;"></div>
              </div>
              <span style="font-size:12px;font-weight:600;direction:ltr;">${i.progress}%</span>
            </div>
          </td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;font-weight:600;direction:ltr;">${s}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;direction:ltr;">${w(s).toFixed(2)}</td>
        </tr>
        ${a?`<tr><td colspan="6" style="padding:4px 12px 8px 36px;border-bottom:1px solid #eee;text-align:right;color:#666;font-size:11px;font-style:italic;">ملاحظات: ${a}</td></tr>`:""}
      `},l=(t=[...T[1],...T[2]],i=0,s=0,t.forEach(t=>{let a=k(t.id,e);i+=w(y(a.progress)),s++}),s>0?Math.round(i/s*100)/100:0),n=l>=3?"#16A34A":l>=2?"#D97706":"#B91C1C";return`<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <title>تقرير التقدم الدراسي - OmniSchool</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Cairo', sans-serif;
      color: #1C0A0A;
      background: white;
      direction: rtl;
      line-height: 1.6;
    }

    @media print {
      @page {
        size: A4;
        margin: 15mm;
      }
      body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .page-break { page-break-before: always; }
      .no-page-break { page-break-inside: avoid; }
    }

    .report-header {
      background: linear-gradient(135deg, #B91C1C 0%, #991B1B 50%, #7F1D1D 100%);
      color: white;
      padding: 24px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }

    .report-header::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 70% 20%, rgba(212, 168, 67, 0.15) 0%, transparent 60%);
      pointer-events: none;
    }

    .report-header h1 {
      font-size: 24px;
      font-weight: 800;
      position: relative;
    }

    .report-header .subtitle {
      font-size: 13px;
      opacity: 0.85;
      margin-top: 4px;
    }

    .report-header .logo {
      font-size: 28px;
      font-weight: 900;
      color: #D4A843;
      position: relative;
    }

    .student-info {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      padding: 16px 32px;
      background: #FFFBF5;
      border-bottom: 2px solid #E8DFD0;
    }

    .student-info .info-item {
      font-size: 13px;
    }

    .student-info .info-item .label {
      color: #8B7E6A;
      font-size: 11px;
    }

    .student-info .info-item .value {
      font-weight: 600;
      color: #1C0A0A;
    }

    .section {
      padding: 20px 32px;
    }

    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: #B91C1C;
      border-bottom: 2px solid #B91C1C;
      padding-bottom: 6px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-title .icon {
      width: 20px;
      height: 20px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    .stat-card {
      background: #FFFBF5;
      border: 1px solid #E8DFD0;
      border-radius: 8px;
      padding: 14px;
      text-align: center;
    }

    .stat-card .stat-value {
      font-size: 28px;
      font-weight: 900;
      line-height: 1.2;
    }

    .stat-card .stat-label {
      font-size: 11px;
      color: #8B7E6A;
      margin-top: 2px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    table thead th {
      background: #F5F0E8;
      padding: 8px 12px;
      text-align: center;
      font-weight: 600;
      font-size: 12px;
      color: #5C4A2A;
      border-bottom: 2px solid #E8DFD0;
    }

    table thead th:first-child {
      text-align: right;
    }

    .category-table thead th {
      background: #FEF3E2;
    }

    .gpa-section {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .gpa-card {
      flex: 1;
      min-width: 150px;
      background: #FFFBF5;
      border: 1px solid #E8DFD0;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
    }

    .gpa-card .gpa-value {
      font-size: 32px;
      font-weight: 900;
    }

    .gpa-card .gpa-label {
      font-size: 12px;
      color: #8B7E6A;
    }

    .streak-section {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .streak-card {
      flex: 1;
      min-width: 150px;
      background: #FFFBF5;
      border: 1px solid #E8DFD0;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
    }

    .streak-card .streak-value {
      font-size: 28px;
      font-weight: 900;
      color: #D97706;
    }

    .streak-card .streak-label {
      font-size: 12px;
      color: #8B7E6A;
    }

    .footer {
      padding: 16px 32px;
      text-align: center;
      font-size: 11px;
      color: #8B7E6A;
      border-top: 1px solid #E8DFD0;
      background: #FFFBF5;
    }

    .ornament {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin: 8px 0;
    }

    .ornament::before,
    .ornament::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(185,28,28,0.2), rgba(212,168,67,0.4), rgba(185,28,28,0.2), transparent);
    }

    .ornament .diamond {
      width: 6px;
      height: 6px;
      background: #D4A843;
      transform: rotate(45deg);
    }

    @media (max-width: 600px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .report-header { padding: 16px 20px; }
      .section { padding: 16px 20px; }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="report-header">
    <div>
      <h1>تقرير التقدم الدراسي</h1>
      <div class="subtitle">تقرير شامل عن المسار الأكاديمي</div>
    </div>
    <div class="logo">OmniSchool</div>
  </div>

  <!-- Student Info -->
  <div class="student-info">
    <div class="info-item">
      <div class="label">الطالب</div>
      <div class="value">طالب - فرع PEP - تخصص الأدب العربي</div>
    </div>
    <div class="info-item">
      <div class="label">تاريخ التقرير</div>
      <div class="value" dir="ltr">${d} - ${r}</div>
    </div>
    <div class="info-item">
      <div class="label">السنة الدراسية</div>
      <div class="value">السنة الأولى جامعي</div>
    </div>
    <div class="info-item">
      <div class="label">المؤسسة</div>
      <div class="value">المدرسة العليا للأساتذة - ENS</div>
    </div>
  </div>

  <!-- Overall Progress Summary -->
  <div class="section no-page-break">
    <div class="section-title">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" stroke-width="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
      ملخص التقدم العام
    </div>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value" style="color:#B91C1C;">${E.total}</div>
        <div class="stat-label">إجمالي المواد</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color:#16A34A;">${E.completed}</div>
        <div class="stat-label">مكتملة</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color:#D97706;">${E.inProgress}</div>
        <div class="stat-label">قيد التقدم</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color:#9CA3AF;">${E.notStarted}</div>
        <div class="stat-label">لم تبدأ</div>
      </div>
    </div>
    <div style="text-align:center;margin-top:16px;">
      <div style="font-size:48px;font-weight:900;color:#B91C1C;" dir="ltr">${Math.round(E.overallProgress)}%</div>
      <div style="font-size:13px;color:#8B7E6A;">نسبة التقدم الإجمالية</div>
    </div>
  </div>

  <div class="ornament"><div class="diamond"></div></div>

  <!-- Semester 1 Breakdown -->
  <div class="section no-page-break">
    <div class="section-title">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
      السداسي الأول - تفاصيل المواد
    </div>
    <table>
      <thead>
        <tr>
          <th>المادة</th>
          <th>التصنيف</th>
          <th>الحالة</th>
          <th>التقدم</th>
          <th>التقدير</th>
          <th>النقاط</th>
        </tr>
      </thead>
      <tbody>
        ${T[1].map(o).join("")}
      </tbody>
    </table>
  </div>

  <div class="page-break"></div>

  <!-- Semester 2 Breakdown -->
  <div class="section no-page-break">
    <div class="section-title">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
      السداسي الثاني - تفاصيل المواد
    </div>
    <table>
      <thead>
        <tr>
          <th>المادة</th>
          <th>التصنيف</th>
          <th>الحالة</th>
          <th>التقدم</th>
          <th>التقدير</th>
          <th>النقاط</th>
        </tr>
      </thead>
      <tbody>
        ${T[2].map(o).join("")}
      </tbody>
    </table>
  </div>

  <div class="ornament"><div class="diamond"></div></div>

  <!-- Category Breakdown -->
  <div class="section no-page-break">
    <div class="section-title">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" stroke-width="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
      تقدم المواد حسب التصنيف
    </div>
    <table class="category-table">
      <thead>
        <tr>
          <th style="text-align:right;">التصنيف</th>
          <th>عدد المواد</th>
          <th>متوسط التقدم</th>
        </tr>
      </thead>
      <tbody>
        ${P.map(e=>`
        <tr>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right;font-weight:500;color:${e.color};">${e.label}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:center;">${e.total}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:center;">
            <div style="display:flex;align-items:center;gap:6px;justify-content:center;">
              <div style="flex:1;max-width:100px;height:6px;background:#eee;border-radius:3px;overflow:hidden;">
                <div style="width:${e.avgProgress}%;height:100%;background:${e.color};border-radius:3px;"></div>
              </div>
              <span style="font-size:12px;font-weight:600;direction:ltr;">${e.avgProgress}%</span>
            </div>
          </td>
        </tr>
      `).join("")}
      </tbody>
    </table>
  </div>

  <div class="ornament"><div class="diamond"></div></div>

  <!-- GPA Summary -->
  <div class="section no-page-break">
    <div class="section-title">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
      ملخص المعدل الفصلي (GPA)
    </div>
    <div class="gpa-section">
      <div class="gpa-card">
        <div class="gpa-label">السداسي الأول</div>
        <div class="gpa-value" style="color:${O.sem1>=3?"#16A34A":O.sem1>=2?"#D97706":"#B91C1C"};" dir="ltr">${O.sem1.toFixed(2)}</div>
        <div class="gpa-label">من 4.00</div>
      </div>
      <div class="gpa-card">
        <div class="gpa-label">السداسي الثاني</div>
        <div class="gpa-value" style="color:${O.sem2>=3?"#16A34A":O.sem2>=2?"#D97706":"#B91C1C"};" dir="ltr">${O.sem2.toFixed(2)}</div>
        <div class="gpa-label">من 4.00</div>
      </div>
      <div class="gpa-card" style="border:2px solid ${n};">
        <div class="gpa-label">المعدل العام</div>
        <div class="gpa-value" style="color:${n};" dir="ltr">${l.toFixed(2)}</div>
        <div class="gpa-label">من 4.00</div>
      </div>
    </div>
    <div style="text-align:center;margin-top:12px;font-size:12px;color:#8B7E6A;">
      * المعدل محسوب تلقائياً بناءً على نسبة التقدم في كل مادة
    </div>
  </div>

  <!-- Study Streak -->
  <div class="section no-page-break">
    <div class="section-title">
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
      معلومات المواظبة على الدراسة
    </div>
    <div class="streak-section">
      <div class="streak-card">
        <div class="streak-value">${H.currentStreak}</div>
        <div class="streak-label">أيام متتالية حالياً</div>
      </div>
      <div class="streak-card">
        <div class="streak-value">${H.bestStreak}</div>
        <div class="streak-label">أفضل سجل متتالي</div>
      </div>
      <div class="streak-card">
        <div class="streak-value">${$.filter(e=>e.completed).length}</div>
        <div class="streak-label">إجمالي جلسات الدراسة</div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div style="font-weight:600;color:#B91C1C;">OmniSchool - منصة التعليم الذكي</div>
    <div style="margin-top:4px;">تم إنشاء هذا التقرير تلقائياً بتاريخ ${d} الساعة ${r}</div>
    <div style="margin-top:4px;color:#D4A843;">◆ هذا التقرير للإطلاع الشخصي فقط وليس وثيقة رسمية ◆</div>
  </div>
</body>
</html>`},[e,N,$,E,P,T,O,H]),G=(0,i.useCallback)(async()=>{D(!0);try{await new Promise(e=>setTimeout(e,600));let e=_(),t=window.open("","_blank");t&&(t.document.write(e),t.document.close(),t.onload=()=>{setTimeout(()=>{t.print()},500)}),M(!0),setTimeout(()=>M(!1),3e3)}finally{D(!1)}},[_]),I=(0,i.useCallback)(()=>{let e=_(),t=window.open("","_blank");t&&(t.document.write(e),t.document.close())},[_]),V=(0,i.useMemo)(()=>({s1Completed:T[1].filter(t=>"completed"===k(t.id,e).status).length,s2Completed:T[2].filter(t=>"completed"===k(t.id,e).status).length}),[e,T]);return(0,t.jsx)(s.motion.div,{variants:C,initial:"hidden",animate:"visible",children:(0,t.jsxs)(u.Card,{className:"glass card-ornament overflow-hidden border-border",children:[(0,t.jsx)(u.CardHeader,{className:"pb-3",children:(0,t.jsxs)(u.CardTitle,{className:"text-base font-semibold flex items-center gap-2",children:[(0,t.jsx)(d.FileText,{className:"size-5 text-omni-red"}),"تقرير التقدم الدراسي"]})}),(0,t.jsxs)(u.CardContent,{className:"space-y-4",children:[(0,t.jsx)("p",{className:"text-sm text-muted-foreground",children:"أنشئ تقريراً شاملاً لتقدمك الأكاديمي بصيغة PDF جاهز للطباعة"}),(0,t.jsx)(s.motion.div,{variants:F,children:(0,t.jsx)("button",{onClick:()=>z(!A),className:"w-full text-right",children:(0,t.jsxs)("div",{className:"rounded-xl border border-border p-4 bg-gradient-to-br from-omni-red/5 via-background to-omni-gold/5 hover:from-omni-red/10 hover:to-omni-gold/10 transition-all duration-300",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:"w-8 h-8 rounded-lg bg-omni-red/10 flex items-center justify-center",children:(0,t.jsx)(m.GraduationCap,{className:"size-4 text-omni-red"})}),(0,t.jsx)("span",{className:"text-sm font-semibold",children:"معاينة التقرير"})]}),(0,t.jsx)(o.Eye,{className:"size-4 text-muted-foreground"})]}),(0,t.jsxs)("div",{className:"grid grid-cols-4 gap-2",children:[(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("div",{className:"text-lg font-bold text-omni-red",children:E.total}),(0,t.jsx)("div",{className:"text-[10px] text-muted-foreground",children:"إجمالي"})]}),(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("div",{className:"text-lg font-bold text-green-600",children:E.completed}),(0,t.jsx)("div",{className:"text-[10px] text-muted-foreground",children:"مكتملة"})]}),(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("div",{className:"text-lg font-bold text-omni-gold",children:E.inProgress}),(0,t.jsx)("div",{className:"text-[10px] text-muted-foreground",children:"قيد التقدم"})]}),(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsxs)("div",{className:"text-lg font-bold text-foreground",dir:"ltr",children:[Math.round(E.overallProgress),"%"]}),(0,t.jsx)("div",{className:"text-[10px] text-muted-foreground",children:"التقدم"})]})]}),(0,t.jsx)("div",{className:"mt-3 h-2 w-full rounded-full bg-muted overflow-hidden",children:(0,t.jsx)(s.motion.div,{className:"h-full rounded-full",style:{background:"linear-gradient(90deg, #B91C1C, #D4A843)"},initial:{width:0},animate:{width:`${Math.round(E.overallProgress)}%`},transition:{duration:1,ease:"easeOut"}})})]})})}),(0,t.jsx)(a.AnimatePresence,{children:A&&(0,t.jsx)(s.motion.div,{initial:{opacity:0,height:0},animate:{opacity:1,height:"auto"},exit:{opacity:0,height:0},transition:{duration:.3},className:"overflow-hidden",children:(0,t.jsxs)("div",{className:"rounded-xl border border-border p-4 space-y-3 bg-background/50",children:[(0,t.jsx)("h4",{className:"text-sm font-semibold text-omni-red",children:"محتويات التقرير"}),(0,t.jsx)("div",{className:"space-y-2",children:[{icon:(0,t.jsx)(d.FileText,{className:"size-3.5"}),text:"ه OmniSchool معلومات الطالب والعنوان",done:!0},{icon:(0,t.jsx)(c.BookOpen,{className:"size-3.5"}),text:`${E.total} مادة - ملخص التقدم العام`,done:!0},{icon:(0,t.jsx)(p.CheckCircle,{className:"size-3.5"}),text:`السداسي الأول: ${V.s1Completed} من ${T[1].length} مكتملة`,done:!0},{icon:(0,t.jsx)(g.Clock,{className:"size-3.5"}),text:`السداسي الثاني: ${V.s2Completed} من ${T[2].length} مكتملة`,done:!0},{icon:(0,t.jsx)(x.Circle,{className:"size-3.5"}),text:`${b.categories.length} تصنيفات مع نسب التقدم`,done:!0},{icon:(0,t.jsx)(m.GraduationCap,{className:"size-3.5"}),text:`معدل GPA: ${O.sem1.toFixed(2)} / ${O.sem2.toFixed(2)}`,done:!0},{icon:(0,t.jsx)(v.Flame,{className:"size-3.5"}),text:`سجل المواظبة: ${H.currentStreak} أيام متتالية`,done:!0}].map((e,i)=>(0,t.jsxs)("div",{className:"flex items-center gap-2 text-xs text-muted-foreground",children:[(0,t.jsx)("span",{className:"text-omni-red",children:e.icon}),e.text]},i))})]})})}),(0,t.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:[(0,t.jsx)(s.motion.div,{whileHover:{scale:1.02},whileTap:{scale:.98},children:(0,t.jsxs)(f.Button,{onClick:I,variant:"outline",className:"w-full gap-2 btn-ripple border-omni-gold/30 text-omni-gold-dark hover:bg-omni-gold/10 hover:text-omni-gold-dark dark:text-omni-gold dark:hover:bg-omni-gold/10",children:[(0,t.jsx)(o.Eye,{className:"size-4"}),"معاينة التقرير"]})}),(0,t.jsx)(s.motion.div,{whileHover:{scale:1.02},whileTap:{scale:.98},children:(0,t.jsx)(f.Button,{onClick:G,disabled:B,className:`w-full gap-2 btn-ripple ${S?"bg-green-600 hover:bg-green-700":"btn-omni-primary"}`,children:B?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(l,{className:"size-4 animate-spin"}),"جارٍ الإنشاء..."]}):S?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.CheckCircle2,{className:"size-4"}),"تم الإنشاء ✓"]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.Download,{className:"size-4"}),"تحميل PDF"]})})})]}),(0,t.jsx)("p",{className:"text-[11px] text-muted-foreground text-center",children:'سيتم فتح التقرير في نافذة جديدة. استخدم "حفظ كـ PDF" من متصفحك للتحميل.'})]})]})})}e.s(["ProgressReport",()=>N],68509)},25416,e=>{e.n(e.i(68509))}]);