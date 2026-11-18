(() => {
  const main = document.querySelector('#main');
  let session = null, ticker = null, advance = null;
  let filter = 'all';
  const now = () => performance.now();
  function clearTimers() { clearInterval(ticker); clearTimeout(advance); ticker = advance = null; }
  function focusMain() { main.focus({preventScroll:true}); window.scrollTo(0,0); }
  function focusQuestion() { document.querySelector('#specimen-name').focus({preventScroll:true}); }
  const scene = `<div class="landscape" aria-hidden="true"><span class="landscape-label">OUR LITTLE ECOSYSTEM</span><svg viewBox="0 0 440 285" xmlns="http://www.w3.org/2000/svg"><circle cx="330" cy="78" r="31" fill="#f1c75b"/><path d="M0 206Q90 151 207 206T440 192V285H0Z" fill="#b4ca8c"/><path d="M0 246Q116 190 238 240T440 227V285H0Z" fill="#7eaa72"/><path d="M282 285Q263 254 338 229" fill="none" stroke="#c5ddca" stroke-width="30"/><path d="M113 220V119" stroke="#766b48" stroke-width="12"/><ellipse cx="113" cy="122" rx="57" ry="65" fill="#3e7150"/><ellipse cx="85" cy="136" rx="30" ry="37" fill="#3e7150"/><ellipse cx="144" cy="144" rx="35" ry="41" fill="#3e7150"/><path d="M113 175L86 143M113 153L139 120" stroke="#85a47b" stroke-width="3" fill="none"/><path d="M361 222V139" stroke="#766b48" stroke-width="7"/><path d="M361 82L318 160H337L309 196H412L383 160H403Z" fill="#527c53"/><ellipse cx="201" cy="228" rx="23" ry="15" fill="#fff9e8"/><ellipse cx="218" cy="215" rx="12" ry="13" fill="#fff9e8"/><ellipse cx="214" cy="193" rx="5" ry="17" fill="#fff9e8" transform="rotate(-14 214 193)"/><ellipse cx="225" cy="194" rx="5" ry="16" fill="#fff9e8" transform="rotate(12 225 194)"/><circle cx="223" cy="214" r="2" fill="#34533d"/><circle cx="179" cy="226" r="7" fill="#fff9e8"/><path d="M70 261V244M88 264V253" stroke="#f6e8c5" stroke-width="5"/><path d="M56 245Q70 225 84 245Z" fill="#b65c41"/><path d="M77 254Q88 239 99 254Z" fill="#d28551"/><circle cx="69" cy="240" r="2" fill="#fff2d7"/><path d="M263 141Q248 118 250 140Q260 154 263 141M263 141Q280 117 276 140Q267 154 263 141" fill="#edbd68"/><path d="M147 265l4-14 4 14M164 270l4-15 4 15M29 238l4-14 4 14" fill="none" stroke="#3d6e43" stroke-width="2"/></svg><span class="field-stamp"><strong>70</strong>가지 발견의 시작</span></div>`;
  function home() {
    clearTimers(); session = null; filter = 'all';
    main.innerHTML = `<section class="hero"><div><div class="eyebrow">NATURE FIELD NOTES · 01</div><h1>자연 속 친구들,<br><em>어떤 역할을 할까?</em></h1><p class="intro">풀 한 포기부터 따스한 햇빛까지.<br>70가지 구성요소를 만나며 생태계의 비밀을 찾아보세요.</p><div class="pills"><span class="pill">🌿 생물과 비생물</span><span class="pill">🔎 생산자 · 소비자 · 분해자</span></div></div>${scene}</section>
    <div class="section-title"><h2>오늘의 탐험을 선택하세요</h2><small>나만의 속도로, 즐겁게!</small></div>
    <section class="mode-grid" aria-label="학습 모드"><article class="mode-card"><div class="mode-top"><span class="mode-icon" aria-hidden="true">📖</span><span class="mode-number">EXPLORE 01</span></div><h3>혼자 학습하기</h3><p>시간 걱정 없이 차근차근 알아봐요.<br>틀려도 다시 선택하고, 이전 문제도 돌아볼 수 있어요.</p><button class="btn" data-action="study">학습 시작하기 <span aria-hidden="true">↗</span></button></article><article class="mode-card game"><div class="mode-top"><span class="mode-icon" aria-hidden="true">⏱️</span><span class="mode-number">CHALLENGE 02</span></div><h3>2분 타임어택</h3><p>120초 동안 얼마나 많이 맞힐 수 있을까요?<br>정답은 +10점! 틀리면 바로 다음 문제로 넘어가요.</p><button class="btn light" data-action="game">게임하기 <span aria-hidden="true">↗</span></button></article></section>
    <div class="section-title"><h2>출발 전, 이것만 기억해요</h2><small>생태계 관찰 노트</small></div>
    <section class="concepts" aria-label="핵심 개념"><div class="concept"><strong>🌱 생산자</strong><p>햇빛을 이용해 스스로 양분을 만들어요.<br>예: 나무, 토끼풀</p></div><div class="concept"><strong>🐇 소비자</strong><p>다른 생물이나 유기물을 먹고 양분을 얻어요.<br>예: 토끼, 참매</p></div><div class="concept"><strong>🍄 분해자</strong><p>죽은 생물이나 배설물을 분해해 양분을 얻어요.<br>예: 분해하는 세균·균류</p></div><div class="concept"><strong>☀️ 비생물요소</strong><p>생물이 살아가는 데 영향을 주는 물질과 환경 조건이에요.<br>예: 물, 공기, 햇빛</p></div></section>
    <p class="note">생산자·소비자·분해자는 모두 <strong>생물요소</strong>예요. 이 활동의 세균·곰팡이·버섯은 분해 역할을 하는 예를 뜻해요. 흙 속에는 생물도 살지만, 여기서는 흙 자체를 비생물요소로 분류해요.</p>
    <details class="collection"><summary>70가지 구성요소 도감 펼쳐보기</summary><div class="collection-tools" role="group" aria-label="도감 분류">${[['all','전체 70'],['producer','생산자 20'],['consumer','소비자 30'],['decomposer','분해자 10'],['abiotic','비생물 10']].map(([value,label])=>`<button class="filter ${value==='all'?'active':''}" data-filter="${value}" aria-pressed="${value==='all'}">${label}</button>`).join('')}</div><label class="sr-label" for="search">구성요소 이름 검색</label><input class="search" id="search" type="search" placeholder="예: 토끼, 햇빛, 버섯"><div class="species-grid" id="species"></div></details>`;
    drawCollection(); focusMain();
  }
  function drawCollection() {
    const query = document.querySelector('#search').value.trim();
    const items = Eco.items.filter(x=>(filter==='all'||x.role===filter||x.kind===filter)&&x.name.includes(query));
    document.querySelector('#species').innerHTML = items.length ? items.map(x=>`<article class="species"><strong><span aria-hidden="true">${x.emoji}</span> ${x.name}</strong><small>${Eco.classification(x)}</small><p>${x.explanation}</p></article>`).join('') : '<p class="empty">검색 결과가 없어요. 다른 이름으로 찾아보세요.</p>';
  }
  function start(mode) {
    clearTimers(); session = new Eco.Session(mode,Eco.items,now()); drawQuiz(); window.scrollTo(0,0); focusQuestion();
    if (mode === 'game') ticker = setInterval(tick,100);
  }
  function tick() {
    if (!session || session.mode !== 'game') return;
    if (session.expire(now())) { showResult(); return; }
    const remaining = session.remaining(now());
    document.querySelector('#timer').textContent = formatTime(remaining);
    document.querySelector('#time-stat').classList.toggle('urgent',remaining<=20);
    document.querySelector('#progress-fill').style.width = `${remaining/120*100}%`;
  }
  function formatTime(seconds) { return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`; }
  function choices() {
    const roles = session.stage === 'role';
    const values = roles ? [['producer','스스로 양분 만들기'],['consumer','먹어서 양분 얻기'],['decomposer','분해해 양분 얻기']] : [['biotic','살아 있는 구성요소'],['abiotic','물질과 환경 조건']];
    return `<div class="choices ${roles?'roles':''}" role="group" aria-labelledby="specimen-name question">${values.map(([value,desc])=>`<button class="choice" data-answer="${value}">${Eco.labels[value]}<small>${desc}</small></button>`).join('')}</div>`;
  }
  function drawQuiz(message='',tone='') {
    const s = session, item = s.current, game = s.mode==='game', done = s.stage==='done';
    main.innerHTML = `<div class="quiz-layout"><button class="btn text exit" data-action="home">← 처음으로</button><div class="quiz-heading"><div><div class="mode-badge">${game?'CHALLENGE · 120 SECONDS':'EXPLORE · AT YOUR PACE'}</div><h1>${game?'2분 타임어택':'혼자 학습하기'}</h1></div>${game?`<div class="stats"><div class="stat"><span>나의 점수</span><strong id="score">${s.score}</strong></div><div class="stat ${s.remaining(now())<=20?'urgent':''}" id="time-stat"><span>남은 시간</span><strong id="timer" role="timer" aria-label="남은 시간">${formatTime(s.remaining(now()))}</strong></div></div>`:''}</div>
    <div class="progress-info"><span>${game?`${s.attempted+ (done?0:1)}번째 도전`:`${s.index+1} / ${s.deck.length}번째 구성요소`}</span><span>${game?'완벽하게 분류하면 +10점':`${s.completed.size}개 탐구 완료`}</span></div><div class="progress" aria-hidden="true"><div id="progress-fill" style="width:${game?s.remaining(now())/120*100:s.completed.size/s.deck.length*100}%"></div></div>
    <section class="quiz-card" aria-label="분류 문제"><div class="steps"><span class="step ${s.stage==='kind'?'active':''}">01 생물 · 비생물</span><span aria-hidden="true">→</span><span class="step ${s.stage==='role'?'active':''}">02 생물의 역할</span></div><div class="specimen" aria-hidden="true">${item.emoji}</div><h2 class="quiz-name" id="specimen-name" tabindex="-1" ${done?'':'aria-describedby="question"'}>${item.name}</h2>
    ${done?`<span class="answer-tag">${Eco.classification(item)}</span><p class="answer-explanation">${item.explanation}</p>`:`<p class="question" id="question">${s.stage==='kind'?'생물요소일까요, 비생물요소일까요?':'생물요소가 맞아요! 어떤 역할을 할까요?'}</p>${choices()}`}
    <div id="feedback" class="feedback ${tone}" role="status" aria-live="polite">${message || (done?'잘했어요! 이 구성요소의 역할을 기억해 두세요.':'이름을 잘 살펴보고 알맞은 답을 선택해 보세요.')}</div></section>
    <div class="quiz-nav">${game?'<span class="quiz-hint">정답 +10점 · 오답 0점 · 자동으로 다음 문제</span>':`<button class="btn secondary" data-action="previous" ${s.index===0?'disabled':''}>← 이전 문제로 돌아가기</button>${done?`<button class="btn" data-action="next">${s.index===s.deck.length-1?'학습 마치기':'다음 문제'} →</button>`:'<span class="quiz-hint">정답을 고르면 다음으로!</span>'}`}</div><p class="quiz-hint">${game?'생물요소는 역할까지 맞혀야 점수를 얻어요. 화면을 떠나도 시간은 계속 흘러요.':'틀려도 괜찮아요. 천천히 관찰하고 다시 생각해 보세요.'}</p></div>`;
  }
  function answer(value) {
    const result = session.answer(value,now());
    if (result.status==='expired') { showResult(); return; }
    if (result.status==='ignored') return;
    if (result.status==='retry') {
      const feedback = document.querySelector('#feedback');
      feedback.className='feedback wrong';
      feedback.textContent='다시 선택해 보세요.';
      return;
    }
    if (result.status==='role') {
      drawQuiz('첫 단계 성공! 생산자·소비자·분해자 중 골라 보세요.','correct');
      focusQuestion();
      return;
    }
    const game = session.mode==='game';
    drawQuiz(result.status==='correct'?(game?'정답이에요! +10점 · 다음 문제로 이동해요.':'정답이에요! 설명을 읽고 다음 문제로 가 보세요.'):'아쉬워요! 정답을 확인하세요. 다음 문제로 이동해요.',result.status==='correct'?'correct':'wrong');
    if (game) {
      const active = session;
      advance=setTimeout(()=>{
        if (session!==active) return;
        session.next(now());
        if (session.finished) showResult();
        else { drawQuiz(); focusQuestion(); }
      },850);
    } else document.querySelector('[data-action="next"]').focus({preventScroll:true});
  }
  function showResult() {
    clearTimers();
    const s = session, game = s.mode==='game';
    const mistakes = [...new Map(s.mistakes.map(x=>[x.name,x])).values()];
    main.innerHTML=`<section class="result"><div class="result-symbol" aria-hidden="true">${game?'🏅':'🌳'}</div><div class="eyebrow" style="justify-content:center">EXPLORATION COMPLETE</div><h1>${game?'2분 탐험을 마쳤어요!':'70가지 탐구를 모두 마쳤어요!'}</h1><p class="result-lead">${game?'멋진 도전이었어요. 배운 내용을 떠올리며 다시 도전해 보세요.':'생물과 비생물, 그리고 생물의 역할을 알아봤어요.<br>이제 2분 타임어택에도 도전해 볼까요?'}</p><div class="big-score">${game?s.score:'70'}<small>${game?' 점':' / 70'}</small></div>${game?`<div class="result-stats"><span>푼 문제 <strong>${s.attempted}</strong></span><span>정답 <strong>${s.correct}</strong></span><span>정답률 <strong>${s.attempted?Math.round(s.correct/s.attempted*100):0}%</strong></span></div>`:''}<div class="result-actions"><button class="btn" data-action="${game?'game':'study'}">${game?'한 번 더 도전하기':'다시 학습하기'}</button><button class="btn secondary" data-action="${game?'study':'game'}">${game?'혼자 학습하기':'게임하기'}</button><button class="btn secondary" data-action="home">처음으로</button></div>${game&&mistakes.length?`<div class="review"><h2>한 번 더 살펴봐요 · ${mistakes.length}가지</h2>${mistakes.map(x=>`<article class="review-item"><strong>${x.emoji} ${x.name}</strong><small>${Eco.classification(x)}</small><p>${x.explanation}</p></article>`).join('')}</div>`:''}</section>`;
    focusMain();
  }
  document.addEventListener('click',event=>{
    const button = event.target.closest('button');
    if (!button || button.disabled) return;
    if (button.dataset.answer) { answer(button.dataset.answer); return; }
    if (button.dataset.filter) {
      filter=button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(x=>{ x.classList.toggle('active',x.dataset.filter===filter); x.setAttribute('aria-pressed',String(x.dataset.filter===filter)); });
      drawCollection(); return;
    }
    switch(button.dataset.action) {
      case 'home': home(); break;
      case 'study': start('study'); break;
      case 'game': start('game'); break;
      case 'previous': session.previous(); drawQuiz(); focusQuestion(); break;
      case 'next': session.next(now()); if(session.finished) showResult(); else {drawQuiz(); focusQuestion();} break;
    }
  });
  document.addEventListener('input',event=>{if(event.target.id==='search')drawCollection();});
  document.addEventListener('visibilitychange',()=>{if(session&&session.mode==='game')tick();});
  home();
})();
