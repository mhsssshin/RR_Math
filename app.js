/* ==========================================================================
   로롱수학 (Lorong Math) 애플리케이션 비즈니스 로직
   ========================================================================== */

// 1. 초기 사용자 데이터 정의 (localStorage 연동)
const DEFAULT_USER_DATA = {
  hasCompletedTest: false,
  level: null,            // Stage 1 ~ 5
  acorns: 20,             // 기본 도토리 제공
  stars: 0,               // 오늘의 별 칩
  xp: 0,                  // 현재 경험치
  xpLevel: 1,             // 레벨
  currentStage: 1,        // 진행 중인 스테이지 번호
  unlockedStages: [1],    // 해금된 스테이지 목록
  inventory: [],          // 구매 완료 아이템 목록 (아이디 배열)
  equippedCostume: {},    // 착용 코스튬 { hat: id, glasses: id, clothing: id }
  equippedFurniture: [],  // 배치 가구 목록 (아이디 배열)
  completedDays: [],      // 출석일 기록
  incorrectAnswers: [],   // 오답 리스트
  costumeTransforms: {}   // 각 장신구의 커스텀 위치/크기/각도 상태 { itemId: { x, y, scale, rotate } }
};

let userData = { ...DEFAULT_USER_DATA };

const SHOP_ITEMS = [
  // 카테고리: costume (모자, 안경, 의상 등)
  { id: 'hat_straw', category: 'costume', sub: 'hat', name: '밀짚 모자 👒', emoji: '👒', price: 20, style: { svgY: 12, svgSize: 42, transform: 'rotate(-5 50 12)' } },
  { id: 'hat_wizard', category: 'costume', sub: 'hat', name: '마법사 모자 🧙', emoji: '🧙', price: 50, style: { svgY: 4, svgSize: 52, transform: 'rotate(-10 50 4)' } },
  { id: 'hat_crown', category: 'costume', sub: 'hat', name: '황금 왕관 👑', emoji: '👑', price: 70, style: { svgY: 10, svgSize: 36 } },
  { id: 'hat_pirate', category: 'costume', sub: 'hat', name: '해적 선장 모자 🏴‍☠️', emoji: '🏴‍☠️', price: 45, style: { svgY: 8, svgSize: 42, transform: 'rotate(-3 50 8)' } },
  { id: 'hat_detective', category: 'costume', sub: 'hat', name: '탐정 모자 🕵️', emoji: '🕵️', price: 60, style: { svgY: 11, svgSize: 40 } },
  { id: 'glasses_normal', category: 'costume', sub: 'glasses', name: '똘똘이 안경 👓', emoji: '👓', price: 15, style: { svgY: 33, svgSize: 32 } },
  { id: 'glasses_star', category: 'costume', sub: 'glasses', name: '별 선글라스 🕶️', emoji: '🕶️', price: 40, style: { svgY: 33, svgSize: 32, filter: 'hue-rotate(180deg)' } },
  { id: 'glasses_funny', category: 'costume', sub: 'glasses', name: '코믹 안경 🥸', emoji: '🥸', price: 30, style: { svgY: 32, svgSize: 36 } },
  { id: 'bowtie_red', category: 'costume', sub: 'clothing', name: '나비 넥타이 🎀', emoji: '🎀', price: 10, style: { svgY: 54, svgSize: 24 } },
  { id: 'costume_detective', category: 'costume', sub: 'clothing', name: '탐정 망토 🕵️', emoji: '🧥', price: 80, style: { svgY: 58, svgSize: 46 } },
  { id: 'costume_cape', category: 'costume', sub: 'clothing', name: '영웅 망토 🦸', emoji: '🦸', price: 75, style: { svgY: 56, svgSize: 46 } },
  { id: 'costume_scarf', category: 'costume', sub: 'clothing', name: '빨간 목도리 🧣', emoji: '🧣', price: 25, style: { svgY: 55, svgSize: 32 } },
  
  // 카테고리: furniture (배경 벽지 및 가구)
  { id: 'bg_forest', category: 'furniture', sub: 'wallpaper', name: '초록 숲속 벽지 🌳', emoji: '🌳', price: 30, roomClass: 'room-theme-forest', roomBg: '#D5F5E3' },
  { id: 'bg_space', category: 'furniture', sub: 'wallpaper', name: '우주 은하 벽지 🌌', emoji: '🌌', price: 60, roomClass: 'room-theme-space', roomBg: '#D6EAF8' },
  { id: 'bg_pink', category: 'furniture', sub: 'wallpaper', name: '핑키 캔디 벽지 🍭', emoji: '🍭', price: 35, roomClass: 'room-theme-pink', roomBg: '#FADBD8' },
  { id: 'bg_ocean', category: 'furniture', sub: 'wallpaper', name: '아쿠아 바다 벽지 🐳', emoji: '🐳', price: 50, roomClass: 'room-theme-ocean', roomBg: '#E8F8F5' },
  { id: 'bg_yellow', category: 'furniture', sub: 'wallpaper', name: '골드 치즈 벽지 🧀', emoji: '🧀', price: 40, roomClass: 'room-theme-yellow', roomBg: '#FCF3CF' },
  { id: 'toy_bear', category: 'furniture', sub: 'deco', name: '곰인형 친구 🧸', emoji: '🧸', price: 25, posX: '10%', posY: '65%' },
  { id: 'toy_cactus', category: 'furniture', sub: 'deco', name: '귀요미 선인장 🌵', emoji: '🌵', price: 20, posX: '80%', posY: '60%' },
  { id: 'furniture_window', category: 'furniture', sub: 'deco', name: '동그라미 창문 🖼️', emoji: '🖼️', price: 45, posX: '45%', posY: '15%' },
  { id: 'toy_dino', category: 'furniture', sub: 'deco', name: '아기 공룡 인형 🦖', emoji: '🦖', price: 35, posX: '72%', posY: '68%' },
  { id: 'toy_car', category: 'furniture', sub: 'deco', name: '미니 자동차 토이 🚗', emoji: '🚗', price: 30, posX: '38%', posY: '76%' },
  { id: 'rug_leaf', category: 'furniture', sub: 'deco', name: '나뭇잎 러그 🍃', emoji: '🍃', price: 15, posX: '20%', posY: '80%' },
  { id: 'toy_star', category: 'furniture', sub: 'deco', name: '별 무드 조명 🌟', emoji: '🌟', price: 25, posX: '80%', posY: '22%' },
  { id: 'furniture_bed', category: 'furniture', sub: 'deco', name: '푹신한 침대 🛏️', emoji: '🛏️', price: 90, posX: '5%', posY: '54%' },
  { id: 'furniture_table', category: 'furniture', sub: 'deco', name: '원목 원형 탁자 🪵', emoji: '🪵', price: 50, posX: '58%', posY: '64%' },
  { id: 'plant_flower', category: 'furniture', sub: 'deco', name: '작은 꽃 화분 🪴', emoji: '🪴', price: 22, posX: '82%', posY: '46%' }
];

// 2.5. 배열 셔플 (질문 보기 랜덤화를 위한 유틸리티)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 3. 상태 관리 변수
let isMuted = false;
let currentQuestionIndex = 0;       // 현재 0~4번 학습 문제 인덱스
let currentQuestionSet = [];        // 5문항 문제 세트 보관
let testScore = 0;                  // 레벨 테스트 맞춘 개수
let testCurrentStep = 0;            // 레벨 테스트 1~8 진행도
let testCurrentDifficulty = 2;       // 레벨 테스트 현재 난이도 (1~5)
let testAnswersHistory = [];         // 레벨 테스트 정오답 기록
let currentActiveLearningStage = 1;  // 선택하여 공부 중인 스테이지 번호
let confettiInterval = null;         // 폭죽 타이머

// 4. Web Audio API 기반 효과음 합성기
let audioCtx = null;
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playTone(freq, duration, type = 'sine', fadeOut = true) {
  if (isMuted) return;
  initAudio();
  try {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.value = freq;
    
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    if (fadeOut) {
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    }
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.error("오디오 출력 실패:", e);
  }
}

// 귀여운 효과음 구현
function playClick() { playTone(600, 0.08, 'triangle'); }
function playCoin() {
  playTone(987, 0.08, 'sine');
  setTimeout(() => playTone(1318, 0.15, 'sine'), 80);
}
function playCorrect() {
  const tones = [523, 659, 783, 1046]; // 도 미 솔 도
  tones.forEach((t, i) => {
    setTimeout(() => playTone(t, 0.12, 'sine'), i * 100);
  });
}
function playIncorrect() {
  initAudio();
  if (isMuted) return;
  try {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(150, audioCtx.currentTime + 0.3);
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } catch (e) {}
}
function playSuccess() {
  const melody = [523, 587, 659, 698, 783, 880, 987, 1046];
  melody.forEach((t, i) => {
    setTimeout(() => playTone(t, 0.15, 'triangle'), i * 120);
  });
}

// 5. TTS 기능 (한국어 음성 서비스)
function speakText(text) {
  if (isMuted) return;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // 진행 중인 낭독 취소
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.95; // 어린이가 알아듣기 쉽도록 약간 느리게
    utterance.pitch = 1.15; // 친근하고 귀여운 목소리 톤 높임
    window.speechSynthesis.speak(utterance);
  }
}

// 6. SPA 화면 전환 함수
function showScreen(screenId) {
  if (typeof deselectAdjustmentItem === 'function') {
    deselectAdjustmentItem();
  }
  document.querySelectorAll('.screen-section').forEach(s => {
    s.classList.add('hidden');
    s.classList.remove('active');
  });
  const activeScreen = document.getElementById(screenId);
  activeScreen.classList.remove('hidden');
  activeScreen.classList.add('active');

  // 홈 화면이 아니면 헤더를 표시
  const header = document.getElementById('app-header');
  if (screenId === 'screen-home') {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }

  // 화면별 추가 연출
  if (screenId === 'screen-completed') {
    startFireworks();
    playSuccess();
  } else {
    stopFireworks();
  }

  if (screenId === 'screen-room') {
    renderMyRoom();
    renderShopItems();
    
    // 첫 진입 시 미세조절기 닫고 두 화면 모두 노출
    if (typeof deselectAdjustmentItem === 'function') {
      deselectAdjustmentItem();
    }
    const roomViewer = document.getElementById('room-viewer-container');
    const roomShop = document.getElementById('room-shop-container');
    if (roomViewer) roomViewer.classList.remove('hidden');
    if (roomShop) roomShop.classList.remove('hidden');
  }

  if (screenId === 'screen-roadmap') {
    renderRoadmap();
  }
}

// 7. 데이터 세이브 및 로드
function loadUserData() {
  const data = localStorage.getItem('rorongMath_userData');
  if (data) {
    try {
      userData = JSON.parse(data);
    } catch (e) {
      userData = { ...DEFAULT_USER_DATA };
    }
  } else {
    userData = { ...DEFAULT_USER_DATA };
  }
  
  // 구버전 로컬 스토리지 호환성 보강 (널포인터 예방 안전망)
  userData = { ...DEFAULT_USER_DATA, ...userData };
  if (!userData.inventory) userData.inventory = [];
  if (!userData.equippedCostume) userData.equippedCostume = {};
  if (!userData.equippedFurniture) userData.equippedFurniture = [];
  if (!userData.costumeTransforms) userData.costumeTransforms = {};
  
  updateHeaderUI();
  updateCharacterCostumes();
}

function saveUserData() {
  localStorage.setItem('rorongMath_userData', JSON.stringify(userData));
  updateHeaderUI();
}

function updateHeaderUI() {
  document.getElementById('user-acorns').textContent = userData.acorns;
  document.getElementById('user-stars').textContent = userData.stars;
  
  const incorrectCount = userData.incorrectAnswers.length;
  document.getElementById('incorrect-badge').textContent = incorrectCount;
  
  if (userData.level) {
    document.getElementById('user-level-badge').textContent = `Stage ${userData.level}`;
    const titles = {
      1: "새싹 로롱 베이비 🌱",
      2: "깡충 로롱 토끼 🐰",
      3: "영리 로롱 다람쥐 🐿️",
      4: "튼튼 로롱 곰돌이 🐻",
      5: "지혜 로롱 여우 🦊"
    };
    document.getElementById('user-title').textContent = titles[userData.level] || "로롱 친구";
    
    // 아바타 이모지 변경
    const emojis = { 1: "🌸", 2: "🐰", 3: "🐿️", 4: "🐻", 5: "🦊" };
    document.getElementById('user-avatar-emoji').textContent = emojis[userData.level] || "🐿️";
  } else {
    document.getElementById('user-level-badge').textContent = "레벨 없음";
    document.getElementById('user-title').textContent = "꼬마 로롱이";
    document.getElementById('user-avatar-emoji').textContent = "🐿️";
  }
}

// 8. 레벨테스트 (Screen 02) 로직 및 데이터
// 8문항 난이도 기반의 절차적 수능형/적응형 테스트를 위해 문항 생성
const TEST_QUESTION_TEMPLATES = {
  1: [ // Stage 1 레벨 (만 4세 기초)
    { q: "과일이 모두 몇 개일까요? 세어보세요.", visual: { type: 'emoji', count: 3, item: '🍎' }, options: ["2", "3", "4"], ans: "3", hint: "하나, 둘, 셋... 세 개 있어요!" },
    { q: "크기가 가장 큰 동물을 골라보세요.", visual: { type: 'emoji_sizes', items: [{e:'🐹', s:1.5}, {e:'🐳', s:3.5}, {e:'🐥', s:1.8}] }, options: ["🐹", "🐳", "🐥"], ans: "🐳", hint: "가장 뚱뚱하고 덩치가 큰 친구는 고래예요." },
    { q: "모양이 다른 꽃은 무엇일까요?", visual: { type: 'emoji_diff', items: ['🌸', '🌸', '🌻', '🌸'] }, options: ["🌸", "🌻", "🌹"], ans: "🌻", hint: "노랗고 커다란 꽃 하나가 달라요." }
  ],
  2: [ // Stage 2 레벨 (만 4세 심화)
    { q: "과일을 모두 세어볼까요?", visual: { type: 'emoji', count: 7, item: '🍊' }, options: ["6", "7", "8"], ans: "7", hint: "손가락으로 짚어가며 7까지 세어봐요!" },
    { q: "규칙을 보고 빈칸에 들어갈 과일을 골라보세요. 바나나, 사과, 바나나, 사과, 다음은 무엇일까요?", visual: { type: 'pattern', items: ['🍌', '🍎', '🍌', '🍎', '?'] }, options: ["🍌", "🍎", "🍉"], ans: "🍌", hint: "바나나 다음엔 사과, 사과 다음엔 바나나예요." }
  ],
  3: [ // Stage 3 레벨 (만 5세)
    { q: "수 가르기! 6은 2와 몇으로 나눌 수 있을까요?", visual: { type: 'math', formula: "6 = 2 + ?" }, options: ["3", "4", "5"], ans: "4", hint: "사과 6개 중 2개를 주면 몇 개가 남을까요?" },
    { q: "시계가 가리키는 시각은 몇 시일까요?", visual: { type: 'clock', hour: 3, minute: 0 }, options: ["3", "6", "12"], ans: "3", hint: "짧은 바늘이 3, 긴 바늘이 12를 가리켜요." }
  ],
  4: [ // Stage 4 레벨 (초등 1학년)
    { q: "더하기 계산을 해보세요. 7 + 5는 무엇일까요?", visual: { type: 'math', formula: "7 + 5 = ?" }, options: ["11", "12", "13"], ans: "12", hint: "7에 3을 더하면 10이고, 2가 남아요." },
    { q: "더 큰 숫자를 골라볼까요?", visual: { type: 'math', formula: "45 vs 52" }, options: ["45", "52", "같아요"], ans: "52", hint: "십의 자리 숫자를 비교해 보아요. 5가 4보다 커요!" }
  ],
  5: [ // Stage 5 레벨 (초등 2~3학년)
    { q: "곱셈 구구를 해볼까요? 6 × 7 은 얼마일까요?", visual: { type: 'math', formula: "6 × 7 = ?" }, options: ["42", "45", "48"], ans: "42", hint: "여섯 개씩 일곱 묶음이에요. 육칠십이!" },
    { q: "세 자리 수의 십의 자리 숫자는 무엇일까요? [ 482 ]", visual: { type: 'math', formula: "4 8 2" }, options: ["4", "8", "2"], ans: "8", hint: "백의 자리는 4, 십의 자리는 8, 일의 자리는 2예요." }
  ]
};

function startLevelTest() {
  testScore = 0;
  testCurrentStep = 0;
  testCurrentDifficulty = 2; // 난이도 2(토끼)부터 시작하여 적응형으로 이동
  testAnswersHistory = [];
  
  loadTestQuestion();
  showScreen('screen-test');
}

function loadTestQuestion() {
  testCurrentStep++;
  
  // 8문항 종료 시 평가 판정으로 이동
  if (testCurrentStep > 8) {
    finishLevelTest();
    return;
  }
  
  document.getElementById('test-progress').style.width = `${(testCurrentStep / 8) * 100}%`;
  document.getElementById('test-progress-text').textContent = `${testCurrentStep} / 8`;
  
  // 현재 난이도에 맞는 문제 풀에서 랜덤 추출
  const pool = TEST_QUESTION_TEMPLATES[testCurrentDifficulty];
  const qData = pool[Math.floor(Math.random() * pool.length)];
  
  // 문항 데이터 복제 및 저장
  const currentTestQuestion = { ...qData };
  
  // 화면 렌더링
  document.getElementById('test-question-text').textContent = currentTestQuestion.q;
  renderVisualArea('test-visual-area', currentTestQuestion.visual);
  
  // TTS 즉시 읽기
  speakText(currentTestQuestion.q);
  
  // 오디오 리스너 연결
  document.getElementById('test-tts-btn').onclick = () => {
    playClick();
    speakText(currentTestQuestion.q);
  };
  
  // 보기 렌더링
  const optionsDiv = document.getElementById('test-options');
  optionsDiv.innerHTML = '';
  
  // 3개 보기 또는 4개 보기 대응
  optionsDiv.className = `options-grid cols-${currentTestQuestion.options.length}`;
  
  const shuffledOptions = shuffleArray(currentTestQuestion.options);
  shuffledOptions.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-card bounce-hover';
    btn.innerHTML = opt;
    btn.onclick = () => selectTestAnswer(btn, opt, currentTestQuestion.ans);
    optionsDiv.appendChild(btn);
  });
}

function renderVisualArea(containerId, visual) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  
  if (!visual) return;
  
  if (visual.type === 'emoji') {
    const div = document.createElement('div');
    div.className = 'visual-items-container';
    for (let i = 0; i < visual.count; i++) {
      const span = document.createElement('span');
      span.className = 'visual-item-emoji';
      span.textContent = visual.item;
      // 교차 지연 애니메이션
      span.style.animationDelay = `${i * 0.15}s`;
      div.appendChild(span);
    }
    container.appendChild(div);
  } 
  else if (visual.type === 'emoji_sizes') {
    const div = document.createElement('div');
    div.className = 'visual-items-container';
    visual.items.forEach(it => {
      const span = document.createElement('span');
      span.className = 'visual-item-emoji';
      span.textContent = it.e;
      span.style.fontSize = `${it.s}rem`;
      div.appendChild(span);
    });
    container.appendChild(div);
  }
  else if (visual.type === 'emoji_diff') {
    const div = document.createElement('div');
    div.className = 'visual-items-container';
    visual.items.forEach((emoji, i) => {
      const span = document.createElement('span');
      span.className = 'visual-item-emoji';
      span.textContent = emoji;
      span.style.animationDelay = `${i * 0.2}s`;
      div.appendChild(span);
    });
    container.appendChild(div);
  }
  else if (visual.type === 'pattern') {
    const div = document.createElement('div');
    div.className = 'visual-items-container';
    visual.items.forEach(emoji => {
      const block = document.createElement('div');
      block.className = 'visual-pattern-item';
      if (emoji === '?') {
        block.textContent = '?';
        block.style.backgroundColor = '#F5B041';
        block.style.color = 'white';
        block.style.fontWeight = 'bold';
      } else {
        block.textContent = emoji;
        block.style.backgroundColor = '#EAECEE';
      }
      div.appendChild(block);
    });
    container.appendChild(div);
  }
  else if (visual.type === 'clock') {
    const clock = document.createElement('div');
    clock.className = 'visual-item-clock';
    
    // 시계 중심 원 및 바늘
    const dot = document.createElement('div');
    dot.className = 'clock-center-dot';
    clock.appendChild(dot);
    
    // 시간 계산
    const hDeg = (visual.hour * 30) + (visual.minute * 0.5);
    const mDeg = visual.minute * 6;
    
    const hHand = document.createElement('div');
    hHand.className = 'clock-hand clock-hour-hand';
    hHand.style.transform = `translate(-50%, 0) rotate(${hDeg}deg)`;
    clock.appendChild(hHand);
    
    const mHand = document.createElement('div');
    mHand.className = 'clock-hand clock-minute-hand';
    mHand.style.transform = `translate(-50%, 0) rotate(${mDeg}deg)`;
    clock.appendChild(mHand);
    
    // 시계 테두리 숫자 3, 6, 9, 12 배치
    const numbers = [
      { text: '12', x: '50%', y: '15%' },
      { text: '3', x: '85%', y: '50%' },
      { text: '6', x: '50%', y: '85%' },
      { text: '9', x: '15%', y: '50%' }
    ];
    numbers.forEach(num => {
      const el = document.createElement('span');
      el.className = 'clock-number';
      el.textContent = num.text;
      el.style.left = num.x;
      el.style.top = num.y;
      clock.appendChild(el);
    });
    
    container.appendChild(clock);
  }
  else if (visual.type === 'math') {
    const mathBox = document.createElement('div');
    mathBox.style.fontFamily = 'var(--font-title)';
    mathBox.style.fontSize = '3.2rem';
    mathBox.style.color = 'var(--color-secondary)';
    mathBox.style.textShadow = '0 3px 0 white';
    mathBox.style.textAlign = 'center';
    mathBox.textContent = visual.formula;
    container.appendChild(mathBox);
  }
}

function selectTestAnswer(btn, selected, correct) {
  // 선택한 후 클릭을 막음
  const cards = document.querySelectorAll('#test-options .option-card');
  cards.forEach(c => c.style.pointerEvents = 'none');
  
  const isCorrect = (selected === correct);
  testAnswersHistory.push(isCorrect);
  
  if (isCorrect) {
    btn.style.backgroundColor = '#2ECC71';
    btn.style.color = 'white';
    btn.style.borderColor = '#27AE60';
    playCorrect();
    testScore++;
    
    // 정답 시 난이도 업 (최대 5)
    if (testCurrentDifficulty < 5) {
      testCurrentDifficulty++;
    }
  } else {
    btn.style.backgroundColor = '#E74C3C';
    btn.style.color = 'white';
    btn.style.borderColor = '#C0392B';
    playIncorrect();
    
    // 오답 시 난이도 다운 (최소 1)
    if (testCurrentDifficulty > 1) {
      testCurrentDifficulty--;
    }
  }
  
  setTimeout(() => {
    loadTestQuestion();
  }, 1000);
}

function finishLevelTest() {
  // 8문항 종료 후 최종 난이도가 최종 배정 스테이지 레벨이 됨
  let finalStage = testCurrentDifficulty;
  
  userData.hasCompletedTest = true;
  userData.level = finalStage;
  userData.currentStage = finalStage;
  
  // 스테이지 잠금 해금
  userData.unlockedStages = [];
  for (let i = 1; i <= finalStage; i++) {
    userData.unlockedStages.push(i);
  }
  
  saveUserData();
  
  showToast(`진단 완료! 스테이지 ${finalStage} 배정 완료! 🎉`);
  
  // 로드맵 화면으로 전환
  setTimeout(() => {
    showScreen('screen-roadmap');
  }, 1500);
}

// 9. 로드맵 (Screen 03) 렌더링
function renderRoadmap() {
  // 모든 스테이지 노드 잠금 여부 반영
  for (let stageNum = 1; stageNum <= 5; stageNum++) {
    const node = document.getElementById(`island-stage-${stageNum}`);
    const isUnlocked = userData.unlockedStages.includes(stageNum);
    
    if (isUnlocked) {
      node.classList.remove('locked');
      node.querySelector('.lock-status').textContent = '🔓';
      
      // 현재 진행 중인 스테이지인 경우 강조
      if (userData.currentStage === stageNum) {
        node.classList.add('active-stage');
      } else {
        node.classList.remove('active-stage');
      }
    } else {
      node.classList.add('locked');
      node.querySelector('.lock-status').textContent = '🔒';
      node.classList.remove('active-stage');
    }
  }
  
  // 버튼 라벨 상태 업데이트
  const activeStageNode = document.getElementById(`island-stage-${userData.currentStage}`);
  const stageName = activeStageNode ? activeStageNode.querySelector('.stage-title').textContent : `Stage ${userData.currentStage}`;
  document.getElementById('btn-start-learn').querySelector('span').textContent = `[${stageName}] 학습하기 (5문제)`;
}

// 10. 무한 문제 생성기 및 채점 엔진 (Screen 04)
// 현재 공부중인 스테이지와 문항 번호(1~5)에 따라 문제를 즉시 절차적/수학 난수 생성
function generateProceduralQuestion(stage, qNum) {
  let type = 'concept';
  if (qNum === 4) type = 'apply';
  if (qNum === 5) type = 'think';
  
  let qText = '';
  let visual = null;
  let options = [];
  let answer = '';
  let hint = '';
  
  // 스테이지 난이도에 따른 조합 파라미터
  if (stage === 1) { // 만 4세 코스 초입
    if (type === 'concept') {
      const subType = Math.floor(Math.random() * 3);
      if (subType === 0) {
        // 과일 세기
        const randNum = Math.floor(Math.random() * 4) + 2; // 2 ~ 5
        const fruits = ['🍎', '🍓', '🍌', '🍊', '🍇'];
        const fruit = fruits[Math.floor(Math.random() * fruits.length)];
        qText = `${fruit}는 모두 몇 개일까요?`;
        visual = { type: 'emoji', count: randNum, item: fruit };
        answer = `${randNum}`;
        options = [`${randNum - 1}`, `${randNum}`, `${randNum + 1}`];
        hint = `하나, 둘, 셋 하며 한 번에 하나씩 짚으며 세어 보아요!`;
      } else if (subType === 1) {
        // 색상/모양 차이
        qText = "모양이나 색깔이 혼자 다른 과일은 무엇일까요?";
        visual = { type: 'emoji_diff', items: ['🍎', '🍎', '🍇', '🍎'] };
        answer = "🍇";
        options = ["🍎", "🍇", "🍓"];
        hint = `빨간 사과들 속에 혼자 보라색인 포도 🍇 가 있어요.`;
      } else {
        // 크기 비교
        qText = "가장 덩치가 크고 커다란 동물은 누구일까요?";
        visual = { type: 'emoji_sizes', items: [{e:'🐹', s:1.4}, {e:'🐳', s:3.4}, {e:'🐥', s:1.7}] };
        answer = "🐳";
        options = ["🐹", "🐳", "🐥"];
        hint = `화면에서 가장 크고 푸른 고래 🐳 를 골라보세요!`;
      }
    } 
    else if (type === 'apply') {
      const subType = Math.floor(Math.random() * 2);
      if (subType === 0) {
        const randNum = Math.floor(Math.random() * 3) + 2; // 2 ~ 4
        qText = `다람쥐에게 버섯을 ${randNum}개 나누어 주려고 해요. 버섯 ${randNum}개가 있는 상자를 골라볼까요?`;
        visual = { type: 'emoji', count: randNum, item: '🍄' };
        answer = "🍄".repeat(randNum);
        options = ["🍄".repeat(randNum - 1), "🍄".repeat(randNum), "🍄".repeat(randNum + 1)];
        hint = `버섯 그림의 개수가 딱 ${randNum}개인 상자를 골라보세요.`;
      } else {
        const randNum = Math.floor(Math.random() * 2) + 3; // 3 ~ 4
        qText = `귀여운 토끼에게 당근을 ${randNum}개 먹이려고 해요. 당근이 ${randNum}개 그려진 카드를 골라주세요!`;
        visual = { type: 'emoji', count: randNum, item: '🥕' };
        answer = "🥕".repeat(randNum);
        options = ["🥕".repeat(randNum - 2), "🥕".repeat(randNum), "🥕".repeat(randNum + 1)];
        hint = `당근을 하나씩 세어 보아 ${randNum}개가 되는 카드를 고르세요.`;
      }
    } 
    else if (type === 'think') {
      const subType = Math.floor(Math.random() * 2);
      if (subType === 0) {
        // 패턴 규칙 채우기
        const pItems = Math.random() > 0.5 ? ['🌸', '🌻'] : ['🍎', '🍊'];
        qText = `어떤 그림이 빈칸 ?에 들어갈까요? [${pItems[0]}, ${pItems[1]}, ${pItems[0]}, ${pItems[1]}, ?]`;
        visual = { type: 'pattern', items: [pItems[0], pItems[1], pItems[0], pItems[1], '?'] };
        answer = pItems[0];
        options = [pItems[0], pItems[1], '🍉'];
        hint = `그림이 한 번씩 번갈아가며 반복되고 있어요!`;
      } else {
        // AAB 패턴
        qText = `어떤 그림이 빈칸 ?에 들어갈까요? [🍅, 🍅, 🥦, 🍅, 🍅, ?]`;
        visual = { type: 'pattern', items: ['🍅', '🍅', '🥦', '🍅', '🍅', '?'] };
        answer = '🥦';
        options = ['🍅', '🥦', '🌽'];
        hint = `토마토가 두 번 나오면 브로콜리가 한 번 나오고 있어요!`;
      }
    }
  } 
  else if (stage === 2) { // 만 4세 코스 심화
    if (type === 'concept') {
      const subType = Math.floor(Math.random() * 2);
      if (subType === 0) {
        const randNum = Math.floor(Math.random() * 5) + 5; // 5 ~ 9
        const animals = ['🐰', '🐱', '🐶', '🐼', '🦊'];
        const animal = animals[Math.floor(Math.random() * animals.length)];
        qText = `귀여운 ${animal}는 모두 몇 마리일까요?`;
        visual = { type: 'emoji', count: randNum, item: animal };
        answer = `${randNum}`;
        options = [`${randNum - 2}`, `${randNum - 1}`, `${randNum}`];
        hint = `다섯보다 더 큰 수예요! 하나씩 짚으며 세어 봐요.`;
      } else {
        // 사물 많고 적음 비교
        const a = Math.floor(Math.random() * 3) + 6; // 6~8
        const b = a - 2;
        qText = `빨간 상자 🔴와 파란 상자 🔵 중 어느 상자에 별이 더 많이 들어있을까요?`;
        visual = { type: 'math', formula: `🔴 ${"⭐".repeat(a)}  |  🔵 ${"⭐".repeat(b)}` };
        answer = "🔴";
        options = ["🔴", "🔵"];
        hint = `더 많은 별이 담겨있는 상자의 색깔(🔴)을 골라보세요.`;
      }
    } 
    else if (type === 'apply') {
      const subType = Math.floor(Math.random() * 2);
      if (subType === 0) {
        const total = Math.floor(Math.random() * 4) + 5; // 5~8
        const eat = Math.floor(Math.random() * 3) + 1; // 1~3
        const remain = total - eat;
        qText = `곰돌이가 쿠키 ${total}개를 구웠는데 그중 ${eat}개를 먹었어요. 남은 쿠키는 몇 개일까요?`;
        visual = { type: 'emoji', count: total, item: '🍪' };
        answer = `${remain}`;
        options = [`${remain - 1}`, `${remain}`, `${remain + 1}`];
        hint = `전체 쿠키 ${total}개 중에서 먹은 ${eat}개만큼 빼 보아요!`;
      } else {
        const a = Math.floor(Math.random() * 3) + 4; // 4~6
        const b = Math.floor(Math.random() * 3) + 2; // 2~4
        qText = `다람쥐가 도토리를 아침에 ${a}개 주웠고 점심에 ${b}개 더 주웠어요. 모두 몇 개일까요?`;
        visual = { type: 'math', formula: `${a}개 + ${b}개 = ?` };
        answer = `${a + b}`;
        options = [`${a + b - 1}`, `${a + b}`, `${a + b + 2}`];
        hint = `아침에 주운 개수와 점심에 주운 개수를 합해보세요.`;
      }
    } 
    else if (type === 'think') {
      const subType = Math.floor(Math.random() * 2);
      if (subType === 0) {
        // 3단계 패턴 [A B B A B B]
        const pItems = ['🥕', '🍅'];
        qText = `빈칸 ?에 들어갈 알맞은 채소를 맞추어 볼까요? [${pItems[0]}, ${pItems[1]}, ${pItems[1]}, ${pItems[0]}, ${pItems[1]}, ?]`;
        visual = { type: 'pattern', items: [pItems[0], pItems[1], pItems[1], pItems[0], pItems[1], '?'] };
        answer = pItems[1];
        options = [pItems[0], pItems[1], '🍇'];
        hint = `당근 다음에 토마토가 2개씩 나오고 있어요!`;
      } else {
        // 사과 많이 가진 동물 비교
        qText = `사과 🍎를 가장 많이 가지고 있는 동물 친구는 누구일까요?`;
        visual = { type: 'math', formula: `🐻 🍎  |  🐰 🍎🍎🍎  |  🐱 🍎🍎` };
        answer = '🐰';
        options = ['🐻', '🐰', '🐱'];
        hint = `동물들이 가진 사과 개수를 비교해보세요. 토끼 🐰가 3개로 가장 많아요.`;
      }
    }
  } 
  else if (stage === 3) { // 만 5세 코스
    if (type === 'concept') {
      const subType = Math.floor(Math.random() * 3);
      if (subType === 0) { // 모으기
        const a = Math.floor(Math.random() * 4) + 2; // 2~5
        const b = Math.floor(Math.random() * 4) + 2; // 2~5
        qText = `${a}와 ${b}를 모으면 얼마가 될까요?`;
        visual = { type: 'math', formula: `${a} ⊕ ${b} = ?` };
        answer = `${a + b}`;
        options = [`${a + b - 1}`, `${a + b}`, `${a + b + 1}`];
        hint = `두 숫자를 하나로 보태서 전부 세어 보는 모으기 연산이에요.`;
      } else if (subType === 1) { // 가르기
        const total = Math.floor(Math.random() * 5) + 5; // 5~9
        const a = Math.floor(Math.random() * (total - 2)) + 1; // 1 ~ total-2
        const b = total - a;
        qText = `숫자 ${total}을 ${a}와 다른 숫자로 가르기 하려고 해요. ?는 무엇일까요?`;
        visual = { type: 'math', formula: `${total} ➔ ${a} 와 ?` };
        answer = `${b}`;
        options = [`${b - 1}`, `${b}`, `${b + 1}`];
        hint = `${total}개 중에서 ${a}개를 빼면 나머지 ?는 몇 개가 될지 생각해 보세요.`;
      } else {
        // 절반 분수 조각
        qText = `피자 한 판을 똑같이 둘(2개 조각)로 나눈 절반은 어떻게 생겼을까요?`;
        visual = { type: 'math', formula: "1/2" };
        answer = "🍕";
        options = ["🍕", "🍕🍕", "🎂"];
        hint = `전체 2개 조각 중에서 내 몫인 1개 조각(반 판)을 골라보세요.`;
      }
    } 
    else if (type === 'apply') {
      const subType = Math.floor(Math.random() * 2);
      if (subType === 0) {
        // 정각 시계 읽기
        const hour = Math.floor(Math.random() * 8) + 1; // 1~8시
        qText = `시계가 가리키는 시각은 몇 시일까요?`;
        visual = { type: 'clock', hour: hour, minute: 0 };
        answer = `${hour}`;
        options = [`${hour - 1}`, `${hour}`, `${hour + 1}`];
        hint = `시계바늘 중 짧은 바늘(검은색)이 가리키는 숫자를 눈여겨보세요!`;
      } else {
        // 30분 시계 읽기
        const hour = Math.floor(Math.random() * 6) + 2; // 2~7시
        qText = `시계가 가리키는 시각은 몇 시 몇 분일까요?`;
        visual = { type: 'clock', hour: hour, minute: 30 };
        answer = `${hour}:30`;
        options = [`${hour}:30`, `${hour + 1}:30`, `${hour}:00`];
        hint = `짧은 바늘이 ${hour}와 ${hour+1}의 중간에 있고, 긴 바늘이 6을 가리켜요.`;
      }
    } 
    else if (type === 'think') {
      const subType = Math.floor(Math.random() * 2);
      if (subType === 0) {
        // 10 채우기
        const a = Math.floor(Math.random() * 3) + 2;
        const total = 10;
        const b = total - a;
        qText = `상자 안에 도토리를 채워 10개를 만들고 싶어요. 이미 도토리가 ${a}개 있다면 몇 개가 더 필요할까요?`;
        visual = { type: 'math', formula: `${a} + ? = 10` };
        answer = `${b}`;
        options = [`${b - 1}`, `${b}`, `${b + 1}`];
        hint = `${a}에서 몇 개를 더 보태야 가득 찬 10이 될까요? 10에서 빼보아요.`;
      } else {
        // 마리수 다리 세기 논리
        const birds = Math.floor(Math.random() * 2) + 2; // 2~3마리
        const legs = birds * 2;
        qText = `새가 ${birds}마리 앉아 있습니다. 새 다리의 수는 모두 몇 개일까요?`;
        visual = { type: 'emoji', count: birds, item: '🐦' };
        answer = `${legs}`;
        options = [`${legs - 2}`, `${legs}`, `${legs + 2}`];
        hint = `새 한 마리는 다리가 2개씩 있어요!`;
      }
    }
  } 
  else if (stage === 4) { // 초등 1학년
    if (type === 'concept') {
      const subType = Math.floor(Math.random() * 2);
      if (subType === 0) {
        const isAdd = Math.random() > 0.5;
        const a = Math.floor(Math.random() * 15) + 5; // 5~19
        const b = Math.floor(Math.random() * 8) + 2;  // 2~9
        if (isAdd) {
          qText = `덧셈을 계산해 보세요. ${a} + ${b} = ?`;
          visual = { type: 'math', formula: `${a} + ${b} = ?` };
          answer = `${a + b}`;
          options = [`${a + b - 1}`, `${a + b}`, `${a + b + 1}`];
        } else {
          const top = a + b;
          qText = `뺄셈을 계산해 보세요. ${top} - ${b} = ?`;
          visual = { type: 'math', formula: `${top} - ${b} = ?` };
          answer = `${a}`;
          options = [`${a - 2}`, `${a - 1}`, `${a}`];
        }
        hint = `일의 자리 숫자부터 차근차근 올림이나 내림을 해 볼까요?`;
      } else {
        // 자릿값 매핑
        const tens = Math.floor(Math.random() * 5) + 3; // 3~7
        const ones = Math.floor(Math.random() * 7) + 1; // 1~7
        const target = (tens * 10) + ones;
        qText = `십의 자리가 ${tens}이고 일의 자리가 ${ones}인 숫자는 무엇일까요?`;
        visual = { type: 'math', formula: `[십의자리: ${tens}, 일의자리: ${ones}]` };
        answer = `${target}`;
        options = [`${target}`, `${ones}${tens}`, `${tens}0${ones}`];
        hint = `십의 자리는 왼쪽, 일의 자리는 오른쪽에 써서 나란히 놓아보세요.`;
      }
    } 
    else if (type === 'apply') {
      const subType = Math.floor(Math.random() * 2);
      if (subType === 0) {
        const a = Math.floor(Math.random() * 20) + 20; // 20~39
        const b = Math.floor(Math.random() * 15) + 10; // 10~24
        qText = `하늘이에겐 초콜릿이 ${a}개 있고, 지석이에겐 ${b}개 있습니다. 누구에게 초콜릿이 더 많이 있을까요?`;
        visual = { type: 'math', formula: `${a} vs ${b}` };
        answer = `하늘이 (${a}개)`;
        options = [`하늘이 (${a}개)`, `지석이 (${b}개)`, `똑같아요`];
        hint = `두 수의 크기 비교입니다. 십의 자리가 클수록 더 커요.`;
      } else {
        // 도토리 물품 구매
        const a = Math.floor(Math.random() * 10) + 12; // 12~21
        const b = Math.floor(Math.random() * 5) + 5;   // 5~9
        qText = `로롱방을 꾸미기 위해 가구 ${a}도토리짜리와 코스튬 ${b}도토리짜리를 샀어요. 모두 몇 도토리가 필요할까요?`;
        visual = { type: 'math', formula: `${a} + ${b} = ?` };
        answer = `${a + b}개`;
        options = [`${a + b - 2}개`, `${a + b}개`, `${a + b + 1}개`];
        hint = `두 물건의 가격을 서로 더하는 연산을 해주세요.`;
      }
    } 
    else if (type === 'think') {
      const subType = Math.floor(Math.random() * 2);
      if (subType === 0) {
        const a = Math.floor(Math.random() * 5) + 4; // 4~8
        const b = Math.floor(Math.random() * 5) + 4; // 4~8
        const sum = a + b;
        qText = `빈 상자 ? 안에 들어갈 숫자는 무엇일까요? [ ? + ${a} = ${sum} ]`;
        visual = { type: 'math', formula: `? + ${a} = ${sum}` };
        answer = `${b}`;
        options = [`${b - 1}`, `${b}`, `${b + 1}`];
        hint = `답 ${sum}에서 거꾸로 ${a}를 빼 보면 물음표 상자 안을 알 수 있어요!`;
      } else {
        // 부등호 조건식 만족하는 최대 정수
        const a = Math.floor(Math.random() * 4) + 6; // 6~9
        const b = a - 4; // 2~5
        qText = `식 [ ${a} - ? > ${b} ] 가 올바른 식이 되도록 하는 물음표 안의 숫자 중 '가장 큰' 숫자는 무엇일까요?`;
        visual = { type: 'math', formula: `${a} - ? > ${b}` };
        // a - x > b  => x < a - b
        const maxVal = (a - b) - 1;
        answer = `${maxVal}`;
        options = [`${maxVal - 1}`, `${maxVal}`, `${maxVal + 1}`];
        hint = `물음표에 보기를 하나씩 대입해서 계산해 보았을 때, 빼고 남은 수가 ${b}보다 커야 해요.`;
      }
    }
  } 
  else { // Stage 5 (초등 2~3학년)
    if (type === 'concept') {
      const subType = Math.floor(Math.random() * 2);
      if (subType === 0) {
        const isMult = Math.random() > 0.5;
        if (isMult) {
          const a = Math.floor(Math.random() * 8) + 2; // 2~9
          const b = Math.floor(Math.random() * 8) + 2; // 2~9
          qText = `곱셈 계산을 해보세요. ${a} × ${b} 는 얼마일까요?`;
          visual = { type: 'math', formula: `${a} × ${b} = ?` };
          answer = `${a * b}`;
          options = [`${a * b - 3}`, `${a * b}`, `${a * b + 4}`];
          hint = `${a}를 ${b}번 더하거나 해당 단수 구구단을 외워봐요.`;
        } else {
          // 세자리수 연산
          const a = Math.floor(Math.random() * 300) + 100; // 100~399
          const b = Math.floor(Math.random() * 200) + 50;  // 50~249
          const isPlus = Math.random() > 0.5;
          if (isPlus) {
            qText = `세 자리 수의 덧셈입니다. ${a} + ${b} = ?`;
            visual = { type: 'math', formula: `${a} + ${b} = ?` };
            answer = `${a + b}`;
            options = [`${a + b - 10}`, `${a + b}`, `${a + b + 10}`];
          } else {
            qText = `세 자리 수의 뺄셈입니다. ${a + b} - ${b} = ?`;
            visual = { type: 'math', formula: `${a + b} - ${b} = ?` };
            answer = `${a}`;
            options = [`${a - 5}`, `${a}`, `${a + 5}`];
          }
          hint = `일, 십, 백의 자리 순서대로 받아올림/받아내림을 조심해서 계산하세요.`;
        }
      } else {
        // 똑같이 나누어 담기 (나눗셈 기초)
        const total = [12, 16, 20, 24][Math.floor(Math.random() * 4)];
        const divisor = 4;
        const quotient = total / divisor;
        qText = `귤 ${total}개를 4개의 바구니에 똑같이 나누어 담으려고 합니다. 한 바구니당 몇 개씩 들어가나요?`;
        visual = { type: 'math', formula: `${total} ÷ 4 = ?` };
        answer = `${quotient}개`;
        options = [`${quotient - 1}개`, `${quotient}개`, `${quotient + 1}개`];
        hint = `4에 곱했을 때 ${total}이 되는 곱셈식(4 × ? = ${total})을 찾아보세요!`;
      }
    } 
    else if (type === 'apply') {
      const subType = Math.floor(Math.random() * 2);
      if (subType === 0) {
        const baseVal = Math.floor(Math.random() * 4) + 3; // 3~6
        const count = Math.floor(Math.random() * 3) + 3;   // 3~5
        qText = `사과를 한 상자에 ${baseVal}개씩 담아 포장했습니다. 모두 ${count}상자가 있다면 사과는 전부 몇 개일까요?`;
        visual = { type: 'math', formula: `${baseVal} × ${count} = ?` };
        answer = `${baseVal * count}개`;
        options = [`${baseVal * count - count}개`, `${baseVal * count}개`, `${baseVal * count + count}개`];
        hint = `${baseVal}을 ${count}번 더하는 것이므로 곱셈 연산식으로 풀 수 있어요!`;
      } else {
        // 동전 가치 합산
        const ones = Math.floor(Math.random() * 4) + 2; // 100원짜리 2~5개
        const tens = Math.floor(Math.random() * 6) + 3; // 10원짜리 3~8개
        const sum = (ones * 100) + (tens * 10) + 500; // 500원 1개 고정
        qText = `지갑 속에 500원 동전 1개, 100원 동전 ${ones}개, 10원 동전 ${tens}개가 들어 있습니다. 모두 얼마일까요?`;
        visual = { type: 'math', formula: `500원 × 1 + 100원 × ${ones} + 10원 × ${tens}` };
        answer = `${sum}원`;
        options = [`${sum - 50}원`, `${sum}원`, `${sum + 90}원`];
        hint = `500원과 ${ones * 100}원, 그리고 ${tens * 10}원을 하나씩 더해보세요.`;
      }
    } 
    else if (type === 'think') {
      const subType = Math.floor(Math.random() * 2);
      if (subType === 0) {
        const mulVal = Math.floor(Math.random() * 4) + 3; // 3~6
        const answerNum = Math.floor(Math.random() * 5) + 3; // 3~7
        const total = mulVal * answerNum;
        qText = `어떤 수에 ${mulVal}을 곱했더니 ${total}이 되었습니다. '어떤 수'는 무엇일까요?`;
        visual = { type: 'math', formula: `? × ${mulVal} = ${total}` };
        answer = `${answerNum}`;
        options = [`${answerNum - 1}`, `${answerNum}`, `${answerNum + 1}`];
        hint = `구구단 ${mulVal}단 중에서 곱한 결과가 ${total}이 되는 숫자가 누구인지 생각해 보세요!`;
      } else {
        // 수열 규칙 찾기
        const gap = Math.floor(Math.random() * 2) + 2; // 2~3
        const isDouble = Math.random() > 0.5;
        let seq = [];
        let ansNum = 0;
        if (isDouble) {
          seq = [2, 4, 8, 16];
          ansNum = 32;
        } else {
          seq = [3, 3 + gap, 3 + gap*2, 3 + gap*3];
          ansNum = 3 + gap*4;
        }
        qText = `숫자들의 규칙을 찾고 빈칸 ?에 들어갈 알맞은 숫자를 맞추어 보세요. [ ${seq.join(', ')}, ? ]`;
        visual = { type: 'pattern', items: [...seq, '?'] };
        answer = `${ansNum}`;
        options = [`${ansNum - gap}`, `${ansNum}`, `${ansNum + gap * 2}`];
        hint = `이전 숫자에서 일정한 수를 더하고 있거나, 2배씩 늘어나고 있어요.`;
      }
    }
  }
  
  return {
    id: `q_procedural_${stage}_${qNum}_${Date.now()}`,
    stage: stage,
    qNum: qNum,
    type: type,
    questionText: qText,
    visual: visual,
    options: options,
    correctAnswer: answer,
    hint: hint
  };
}

// 문제 생성 후 학습 페이지 세션 활성화
function startLearningSet(stageLevel) {
  currentActiveLearningStage = stageLevel;
  currentQuestionIndex = 0;
  currentQuestionSet = [];
  
  // 5개 문제 생성
  for (let i = 1; i <= 5; i++) {
    currentQuestionSet.push(generateProceduralQuestion(stageLevel, i));
  }
  
  // 학습 화면 노드 초기화
  resetQNodesUI();
  loadLearningQuestion();
  showScreen('screen-learn');
}

function resetQNodesUI() {
  for (let i = 1; i <= 5; i++) {
    const node = document.getElementById(`q-node-${i}`);
    node.className = 'q-node';
  }
}

function loadLearningQuestion() {
  const currentQ = currentQuestionSet[currentQuestionIndex];
  
  // 현재 Q노드 활성화 표시
  document.getElementById(`q-node-${currentQuestionIndex + 1}`).classList.add('active');
  
  // 타입에 따른 배지 변경
  const badge = document.getElementById('question-type-badge');
  if (currentQ.type === 'concept') {
    badge.className = 'badge-concept';
    badge.textContent = '개념 탄탄 🌸';
  } else if (currentQ.type === 'apply') {
    badge.className = 'badge-apply';
    badge.textContent = '실생활 응용 🍊';
  } else {
    badge.className = 'badge-think';
    badge.textContent = '로롱 씽크 🧠';
  }
  
  document.getElementById('learn-question-text').textContent = currentQ.questionText;
  renderVisualArea('learn-visual-area', currentQ.visual);
  
  // TTS 낭독 바인딩
  speakText(currentQ.questionText);
  document.getElementById('learn-tts-btn').onclick = () => {
    playClick();
    speakText(currentQ.questionText);
  };
  
  // 보기 버튼 렌더링
  const optionsDiv = document.getElementById('learn-options');
  optionsDiv.innerHTML = '';
  
  optionsDiv.className = `options-grid cols-${currentQ.options.length}`;
  
  const shuffledOptions = shuffleArray(currentQ.options);
  shuffledOptions.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-card bounce-hover';
    btn.innerHTML = opt;
    btn.onclick = () => selectLearningAnswer(btn, opt, currentQ);
    optionsDiv.appendChild(btn);
  });
  
  // 힌트 창 숨겨두기
  document.getElementById('hint-bubble-container').classList.add('hidden');
}

function selectLearningAnswer(btn, selected, currentQ) {
  // 중복 탭 제거
  const cards = document.querySelectorAll('#learn-options .option-card');
  cards.forEach(c => c.style.pointerEvents = 'none');
  
  const isCorrect = (selected === currentQ.correctAnswer);
  const qNode = document.getElementById(`q-node-${currentQ.qNum}`);
  
  if (isCorrect) {
    btn.style.backgroundColor = '#2ECC71';
    btn.style.color = 'white';
    btn.style.borderColor = '#27AE60';
    qNode.className = 'q-node correct';
    playCorrect();
    
    // 차등 도토리 지급 연산
    // 기본 보상: 스테이지 레벨과 동일 (Stage 1: 1개, Stage 5: 5개)
    let acornsWon = currentQ.stage;
    // Q5 사고력 문제의 경우 2배 지급
    if (currentQ.type === 'think') {
      acornsWon *= 2;
    }
    
    userData.acorns += acornsWon;
    userData.stars += 1;
    showToast(`정답이에요! 도토리 +${acornsWon}개 획득! 🌰`);
    saveUserData();
    
    // 다음 문제로 1.2초 후 이동
    setTimeout(() => {
      moveToNextQuestion();
    }, 1200);
  } else {
    btn.style.backgroundColor = '#E74C3C';
    btn.style.color = 'white';
    btn.style.borderColor = '#C0392B';
    qNode.className = 'q-node incorrect';
    playIncorrect();
    
    // 오답노트에 자동 적립
    addIncorrectAnswer(currentQ);
    
    // 힌트 팝업 제공
    setTimeout(() => {
      const hintMsg = document.getElementById('hint-message');
      hintMsg.textContent = `${currentQ.hint}`;
      const hintPopup = document.getElementById('hint-bubble-container');
      hintPopup.classList.remove('hidden');
      
      // 힌트 닫고 다시 풀 수 있게 셋업
      document.getElementById('hint-close-btn').onclick = () => {
        playClick();
        hintPopup.classList.add('hidden');
        // 보기 초기화하여 다시 누를 수 있게 함
        cards.forEach(c => {
          c.style.pointerEvents = 'auto';
          c.style.backgroundColor = '';
          c.style.color = '';
          c.style.borderColor = '';
        });
      };
    }, 800);
  }
}

function moveToNextQuestion() {
  currentQuestionIndex++;
  
  if (currentQuestionIndex < 5) {
    loadLearningQuestion();
  } else {
    // 5문제 전부 완료 - 완료 화면 진입
    finishLearningSession();
  }
}

// 오답 노트 누적 함수
function addIncorrectAnswer(question) {
  // 중복 추가 방지
  const isDup = userData.incorrectAnswers.some(q => q.questionText === question.questionText);
  if (!isDup) {
    // 타임스탬프와 함께 삽입
    userData.incorrectAnswers.push({
      ...question,
      addedAt: Date.now()
    });
    saveUserData();
  }
}

// 11. 학습 완료 및 보상 처리 (Screen 05)
function finishLearningSession() {
  // 보너스 도토리 계산 (현재 스테이지 레벨 × 5)
  const completionBonus = currentActiveLearningStage * 5;
  userData.acorns += completionBonus;
  
  // 경험치 상승 (100 XP)
  const baseXP = 100;
  userData.xp += baseXP;
  
  // 레벨업 판단 로직 (100 XP마다 1레벨 상승)
  let levelUpOccurred = false;
  const xpNeeded = userData.xpLevel * 100;
  if (userData.xp >= xpNeeded) {
    userData.xp -= xpNeeded;
    userData.xpLevel++;
    levelUpOccurred = true;
  }
  
  // 출석 도장 찍기 (오늘 날짜 스탬프 쾅)
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const todayDay = days[new Date().getDay()];
  if (!userData.completedDays.includes(todayDay)) {
    userData.completedDays.push(todayDay);
  }
  
  // 만약 해당 스테이지를 첫 정주행한 경우 다음 스테이지도 언락해줌
  const nextStageNum = currentActiveLearningStage + 1;
  if (nextStageNum <= 5 && !userData.unlockedStages.includes(nextStageNum)) {
    userData.unlockedStages.push(nextStageNum);
  }
  
  saveUserData();
  
  // 완료 화면의 보상 UI 설정
  document.getElementById('reward-acorns-added').textContent = `+${completionBonus}개 (보너스)`;
  document.getElementById('reward-stars-added').textContent = `+5개`;
  document.getElementById('reward-xp-added').textContent = `+${baseXP} XP`;
  
  // 경험치 바 그리기
  const nextLimit = userData.xpLevel * 100;
  document.getElementById('current-xp-lv').textContent = `LV.${userData.xpLevel}`;
  document.getElementById('next-xp-lv').textContent = `LV.${userData.xpLevel + 1}`;
  document.getElementById('xp-text').textContent = `${userData.xp} / ${nextLimit} XP`;
  document.getElementById('xp-bar-fill').style.width = `${(userData.xp / nextLimit) * 100}%`;
  
  if (levelUpOccurred) {
    showToast(`축하합니다! 레벨업 하였습니다! LV.${userData.xpLevel} 🎉`);
  }
  
  // 캘린더 스탬프 렌더링
  renderStampsRow();
  
  showScreen('screen-completed');
}

function renderStampsRow() {
  const row = document.getElementById('calendar-stamps-row');
  const daysOrder = ['월', '화', '수', '목', '금', '토', '일'];
  
  row.innerHTML = '';
  daysOrder.forEach(day => {
    const col = document.createElement('div');
    col.className = 'stamp-day';
    col.innerHTML = `${day}`;
    
    const slot = document.createElement('div');
    slot.className = 'stamp-slot';
    
    if (userData.completedDays.includes(day)) {
      slot.classList.add('stamped');
    }
    
    col.appendChild(slot);
    row.appendChild(col);
  });
}

// 12. 도토리 상점 & 방 꾸미기 (Screen 06)
let currentShopCategory = 'costume';

function renderMyRoom() {
  const roomBg = document.getElementById('myroom-display-bg');
  const decorLayer = document.getElementById('room-decorations-layer');
  const costumeLayer = document.getElementById('avatar-costume-layer');
  
  decorLayer.innerHTML = '';
  costumeLayer.innerHTML = '';
  
  // 기본 방 배경 초기화
  roomBg.style.backgroundColor = '#FCF3CF';
  roomBg.className = 'myroom-display';
  
  // 장착 가구/벽지 그리기
  userData.equippedFurniture.forEach(itemId => {
    const item = SHOP_ITEMS.find(x => x.id === itemId);
    if (!item) return;
    
    if (item.sub === 'wallpaper') {
      roomBg.style.backgroundColor = item.roomBg;
      roomBg.classList.add(item.roomClass);
    } 
    else if (item.sub === 'deco') {
      const el = document.createElement('div');
      el.className = 'decor-furniture-item';
      el.style.left = item.posX;
      el.style.top = item.posY;
      el.textContent = item.emoji;
      
      // 방 꾸미기 가구 클릭 상호작용 (점프 애니메이션 및 뿅 효과음)
      el.onclick = () => {
        el.classList.add('jump');
        // 귀여운 뾰로롱 신디사이징음 출력
        playTone(523, 0.08, 'sine');
        setTimeout(() => playTone(784, 0.12, 'sine'), 50);
        
        setTimeout(() => {
          el.classList.remove('jump');
        }, 500);
      };
      
      decorLayer.appendChild(el);
    }
  });
  
  // 장착 의상 그리기 (전체 화면 동시 업데이트)
  updateCharacterCostumes();
}

// 코스튬 실시간 미세조정 상태 관리 및 유틸리티
let activeAdjustmentItemId = null;

function getCostumeTransform(itemId) {
  if (!userData.costumeTransforms) {
    userData.costumeTransforms = {};
  }
  if (!userData.costumeTransforms[itemId]) {
    const item = SHOP_ITEMS.find(x => x.id === itemId);
    userData.costumeTransforms[itemId] = {
      x: 50,
      y: item ? (item.style.svgY || 30) : 30,
      scale: 1.0,
      rotate: 0
    };
  }
  return userData.costumeTransforms[itemId];
}

function selectAdjustmentItem(item) {
  activeAdjustmentItemId = item.id;
  const panel = document.getElementById('costume-adjuster-panel');
  const targetName = document.getElementById('adjuster-target-name');
  if (panel && targetName) {
    panel.classList.remove('hidden');
    targetName.textContent = `🔧 ${item.name} 조절기`;
  }
}

function deselectAdjustmentItem() {
  activeAdjustmentItemId = null;
  const panel = document.getElementById('costume-adjuster-panel');
  if (panel) {
    panel.classList.add('hidden');
  }
}

function updateCharacterCostumes() {
  const homeGroup = document.getElementById('home-svg-costumes');
  const completedGroup = document.getElementById('completed-svg-costumes');
  const roomGroup = document.getElementById('room-svg-costumes');
  
  const groups = [homeGroup, completedGroup, roomGroup];
  
  groups.forEach(group => {
    if (!group) return;
    group.innerHTML = '';
    
    Object.keys(userData.equippedCostume).forEach(slot => {
      const itemId = userData.equippedCostume[slot];
      if (!itemId) return;
      
      const item = SHOP_ITEMS.find(x => x.id === itemId);
      if (!item) return;
      
      const transform = getCostumeTransform(item.id);
      
      // SVG 텍스트 노드를 만들어 캐릭터 얼굴 좌표계 상에 완벽하게 바인딩
      const textNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textNode.setAttribute('x', transform.x.toString());
      textNode.setAttribute('y', transform.y.toString());
      
      // 스케일을 적용한 폰트 크기 계산
      const baseSize = item.style.svgSize || 30;
      const scaledSize = baseSize * transform.scale;
      textNode.setAttribute('font-size', scaledSize.toString());
      textNode.setAttribute('text-anchor', 'middle');
      textNode.setAttribute('dominant-baseline', 'central');
      
      // 회전 및 스케일 변환 속성 조합
      let transformStr = `rotate(${transform.rotate} ${transform.x} ${transform.y})`;
      if (item.style.transform) {
        transformStr += ` ${item.style.transform}`;
      }
      textNode.setAttribute('transform', transformStr);
      
      if (item.style.filter) textNode.setAttribute('style', `filter: ${item.style.filter};`);
      
      textNode.textContent = item.emoji;
      
      // 드래그 앤 드롭 마우스/터치 바인딩 (마이룸 화면의 SVG에서만 작동 가능)
      if (group === roomGroup) {
        textNode.setAttribute('pointer-events', 'auto');
        textNode.style.cursor = 'move';
        
        const startDrag = (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          playClick();
          selectAdjustmentItem(item);
          
          const isTouch = e.type === 'touchstart';
          const startX = isTouch ? e.touches[0].clientX : e.clientX;
          const startY = isTouch ? e.touches[0].clientY : e.clientY;
          
          const initX = transform.x;
          const initY = transform.y;
          
          const svgElement = group.ownerSVGElement;
          const rect = svgElement.getBoundingClientRect();
          
          const onDrag = (moveEvent) => {
            const moveX = isTouch ? moveEvent.touches[0].clientX : moveEvent.clientX;
            const moveY = isTouch ? moveEvent.touches[0].clientY : moveEvent.clientY;
            
            // 화면 픽셀 변화를 SVG viewBox 100x100 비율 단위로 맵핑
            const deltaX = (moveX - startX) * (100 / rect.width);
            const deltaY = (moveY - startY) * (100 / rect.height);
            
            transform.x = initX + deltaX;
            transform.y = initY + deltaY;
            
            updateCharacterCostumes();
          };
          
          const endDrag = () => {
            document.removeEventListener(isTouch ? 'touchmove' : 'mousemove', onDrag);
            document.removeEventListener(isTouch ? 'touchend' : 'mouseup', endDrag);
            saveUserData();
          };
          
          document.addEventListener(isTouch ? 'touchmove' : 'mousemove', onDrag);
          document.addEventListener(isTouch ? 'touchend' : 'mouseup', endDrag);
        };
        
        textNode.addEventListener('mousedown', startDrag);
        textNode.addEventListener('touchstart', startDrag, { passive: false });
      } else {
        textNode.setAttribute('pointer-events', 'none');
      }
      
      group.appendChild(textNode);
    });
  });
}

function renderShopItems() {
  const grid = document.getElementById('shop-items-grid');
  grid.innerHTML = '';
  
  const filtered = SHOP_ITEMS.filter(x => x.category === currentShopCategory);
  
  filtered.forEach(item => {
    const isOwned = userData.inventory.includes(item.id);
    const isEquipped = (item.category === 'costume')
      ? (userData.equippedCostume[item.sub] === item.id)
      : userData.equippedFurniture.includes(item.id);
      
    const card = document.createElement('div');
    card.className = `item-shop-card ${isEquipped ? 'purchased-equipped' : ''}`;
    
    card.innerHTML = `
      <div class="item-shop-card-icon">${item.emoji}</div>
      <div class="item-shop-card-name">${item.name}</div>
      <div class="item-shop-card-price">${isOwned ? '소유함' : `🌰 ${item.price}개`}</div>
      <div class="item-action-area" style="width:100%;"></div>
    `;
    
    const actionArea = card.querySelector('.item-action-area');
    
    if (!isOwned) {
      const buyBtn = document.createElement('button');
      buyBtn.className = 'item-shop-card-btn btn-buy bounce-hover';
      buyBtn.textContent = '구매하기';
      buyBtn.onclick = () => buyShopItem(item);
      actionArea.appendChild(buyBtn);
    } else {
      if (isEquipped) {
        const unequipBtn = document.createElement('button');
        unequipBtn.className = 'item-shop-card-btn btn-unequip bounce-hover';
        unequipBtn.textContent = '벗기';
        unequipBtn.onclick = () => unequipItem(item);
        actionArea.appendChild(unequipBtn);
      } else {
        const equipBtn = document.createElement('button');
        equipBtn.className = 'item-shop-card-btn btn-equip bounce-hover';
        equipBtn.textContent = '장착하기';
        equipBtn.onclick = () => equipItem(item);
        actionArea.appendChild(equipBtn);
      }
    }
    
    grid.appendChild(card);
  });
}

function buyShopItem(item) {
  playClick();
  if (userData.acorns >= item.price) {
    userData.acorns -= item.price;
    userData.inventory.push(item.id);
    saveUserData();
    playCoin();
    showToast(`[${item.name}] 구매 완료! 🌰`);
    
    // 자동 장착 처리
    equipItem(item);
  } else {
    playIncorrect();
    showToast("도토리가 부족해요! 수학 문제를 더 풀어보세요! 🌰");
  }
}

function equipItem(item) {
  playClick();
  if (item.category === 'costume') {
    userData.equippedCostume[item.sub] = item.id;
    selectAdjustmentItem(item);
  } else {
    // 벽지의 경우 중복 안됨
    if (item.sub === 'wallpaper') {
      userData.equippedFurniture = userData.equippedFurniture.filter(id => {
        const x = SHOP_ITEMS.find(i => i.id === id);
        return x.sub !== 'wallpaper';
      });
    }
    userData.equippedFurniture.push(item.id);
  }
  
  saveUserData();
  renderMyRoom();
  renderShopItems();
}

function unequipItem(item) {
  playClick();
  if (item.category === 'costume') {
    delete userData.equippedCostume[item.sub];
    if (activeAdjustmentItemId === item.id) {
      deselectAdjustmentItem();
    }
  } else {
    userData.equippedFurniture = userData.equippedFurniture.filter(id => id !== item.id);
  }
  
  saveUserData();
  renderMyRoom();
  renderShopItems();
}

// 13. 오답노트 (Incorrect Answers Note) 모달 처리
function openIncorrectNoteModal() {
  playClick();
  const modal = document.getElementById('incorrect-note-modal');
  const container = document.getElementById('incorrect-list-container');
  const solveAllBtn = document.getElementById('btn-solve-incorrects');
  
  modal.classList.remove('hidden');
  container.innerHTML = '';
  
  const bads = userData.incorrectAnswers;
  
  if (bads.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p class="empty-emoji">🎉</p>
        <p>틀린 문제가 하나도 없어요! 아주 훌륭해요!</p>
      </div>
    `;
    solveAllBtn.classList.add('hidden');
  } else {
    solveAllBtn.classList.remove('hidden');
    
    bads.forEach((q, idx) => {
      const card = document.createElement('div');
      card.className = 'incorrect-item-card';
      
      const titles = { 1:"로롱 베이비 🌸", 2:"로롱 토끼 🥕", 3:"로롱 다람쥐 🐿️", 4:"로롱 곰돌이 🐻", 5:"로롱 여우 🦊" };
      
      card.innerHTML = `
        <div class="incorrect-item-header">Stage ${q.stage} (${titles[q.stage] || ''})</div>
        <div class="incorrect-item-text">${q.questionText}</div>
        <div class="incorrect-item-actions">
          <button class="btn-solve-single bounce-hover" data-idx="${idx}">다시 풀기 ✏️</button>
        </div>
      `;
      
      card.querySelector('.btn-solve-single').onclick = () => {
        playClick();
        modal.classList.add('hidden');
        startSingleIncorrectReview(q, idx);
      };
      
      container.appendChild(card);
    });
  }
}

// 오답 개별 다시 풀기 세션
function startSingleIncorrectReview(q, listIdx) {
  // 단일 오답 문제를 학습 화면에 오버레이
  resetQNodesUI();
  
  // Q1 위치에 복습 문제 노드 표시
  document.getElementById('q-node-1').className = 'q-node active';
  document.getElementById('q-node-1').textContent = '복습';
  for (let i = 2; i <= 5; i++) {
    document.getElementById(`q-node-${i}`).className = 'q-node hidden';
  }
  
  const badge = document.getElementById('question-type-badge');
  badge.className = 'badge-concept';
  badge.textContent = '오답 복습 문제 📝';
  
  document.getElementById('learn-question-text').textContent = q.questionText;
  renderVisualArea('learn-visual-area', q.visual);
  
  speakText(q.questionText);
  document.getElementById('learn-tts-btn').onclick = () => {
    playClick();
    speakText(q.questionText);
  };
  
  const optionsDiv = document.getElementById('learn-options');
  optionsDiv.innerHTML = '';
  optionsDiv.className = `options-grid cols-${q.options.length}`;
  
  const shuffledOptions = shuffleArray(q.options);
  shuffledOptions.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-card bounce-hover';
    btn.innerHTML = opt;
    btn.onclick = () => {
      const isCorrect = (opt === q.correctAnswer);
      if (isCorrect) {
        btn.style.backgroundColor = '#2ECC71';
        btn.style.color = 'white';
        btn.style.borderColor = '#27AE60';
        playCorrect();
        
        // 맞추면 오답노트 목록에서 삭제
        userData.incorrectAnswers.splice(listIdx, 1);
        userData.acorns += 2; // 복습 격려용 도토리
        showToast("맞췄어요! 오답노트에서 지우고 도토리 2개를 얻었어요! 🌰");
        saveUserData();
        
        setTimeout(() => {
          showScreen('screen-roadmap');
        }, 1200);
      } else {
        btn.style.backgroundColor = '#E74C3C';
        btn.style.color = 'white';
        btn.style.borderColor = '#C0392B';
        playIncorrect();
        
        // 힌트 팝업
        const hintPopup = document.getElementById('hint-bubble-container');
        document.getElementById('hint-message').textContent = q.hint;
        hintPopup.classList.remove('hidden');
        document.getElementById('hint-close-btn').onclick = () => {
          playClick();
          hintPopup.classList.add('hidden');
          btn.style.backgroundColor = '';
          btn.style.color = '';
          btn.style.borderColor = '';
          document.querySelectorAll('#learn-options .option-card').forEach(c => c.style.pointerEvents = 'auto');
        };
      }
    };
    optionsDiv.appendChild(btn);
  });
  
  showScreen('screen-learn');
}

// 오답 전체 풀기 흐름
function startAllIncorrectsReview() {
  playClick();
  const bads = [ ...userData.incorrectAnswers ];
  if (bads.length === 0) return;
  
  document.getElementById('incorrect-note-modal').classList.add('hidden');
  
  currentQuestionIndex = 0;
  currentQuestionSet = bads.slice(0, 5).map((q, i) => {
    return {
      ...q,
      qNum: i + 1
    };
  });
  
  resetQNodesUI();
  // 갯수만큼만 활성화
  for (let i = 1; i <= 5; i++) {
    const node = document.getElementById(`q-node-${i}`);
    if (i <= currentQuestionSet.length) {
      node.className = 'q-node';
      node.textContent = `오답${i}`;
    } else {
      node.className = 'q-node hidden';
    }
  }
  
  loadIncorrectReviewLoop();
  showScreen('screen-learn');
}

function loadIncorrectReviewLoop() {
  const currentQ = currentQuestionSet[currentQuestionIndex];
  const qNode = document.getElementById(`q-node-${currentQuestionIndex + 1}`);
  qNode.classList.add('active');
  
  const badge = document.getElementById('question-type-badge');
  badge.className = 'badge-apply';
  badge.textContent = '모아 풀기 복습';
  
  document.getElementById('learn-question-text').textContent = currentQ.questionText;
  renderVisualArea('learn-visual-area', currentQ.visual);
  
  speakText(currentQ.questionText);
  document.getElementById('learn-tts-btn').onclick = () => {
    playClick();
    speakText(currentQ.questionText);
  };
  
  const optionsDiv = document.getElementById('learn-options');
  optionsDiv.innerHTML = '';
  optionsDiv.className = `options-grid cols-${currentQ.options.length}`;
  
  const shuffledOptions = shuffleArray(currentQ.options);
  shuffledOptions.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-card bounce-hover';
    btn.innerHTML = opt;
    btn.onclick = () => {
      const isCorrect = (opt === currentQ.correctAnswer);
      if (isCorrect) {
        btn.style.backgroundColor = '#2ECC71';
        btn.style.color = 'white';
        btn.style.borderColor = '#27AE60';
        qNode.className = 'q-node correct';
        playCorrect();
        
        // 전체 리스트에서 찾아서 제거
        const fIdx = userData.incorrectAnswers.findIndex(x => x.questionText === currentQ.questionText);
        if (fIdx !== -1) {
          userData.incorrectAnswers.splice(fIdx, 1);
        }
        
        userData.acorns += 2; // 도토리 보상
        saveUserData();
        
        setTimeout(() => {
          currentQuestionIndex++;
          if (currentQuestionIndex < currentQuestionSet.length) {
            loadIncorrectReviewLoop();
          } else {
            showToast("복습 세트를 모두 풀었습니다! 참 잘했어요! 👏");
            setTimeout(() => showScreen('screen-roadmap'), 1200);
          }
        }, 1200);
      } else {
        btn.style.backgroundColor = '#E74C3C';
        btn.style.color = 'white';
        btn.style.borderColor = '#C0392B';
        qNode.className = 'q-node incorrect';
        playIncorrect();
        
        // 힌트 제공 후 풀이 재개
        const hintPopup = document.getElementById('hint-bubble-container');
        document.getElementById('hint-message').textContent = currentQ.hint;
        hintPopup.classList.remove('hidden');
        document.getElementById('hint-close-btn').onclick = () => {
          playClick();
          hintPopup.classList.add('hidden');
          btn.style.backgroundColor = '';
          btn.style.color = '';
          btn.style.borderColor = '';
          document.querySelectorAll('#learn-options .option-card').forEach(c => c.style.pointerEvents = 'auto');
        };
      }
    };
    optionsDiv.appendChild(btn);
  });
}

// 14. 파티클 불꽃놀이 (Canvas) 구현
let fireworksCanvas = null;
let fireworksCtx = null;
let fireworksParticles = [];

function startFireworks() {
  fireworksCanvas = document.getElementById('fireworks-canvas');
  if (!fireworksCanvas) return;
  
  fireworksCtx = fireworksCanvas.getContext('2d');
  resizeFireworksCanvas();
  window.addEventListener('resize', resizeFireworksCanvas);
  
  fireworksParticles = [];
  confettiInterval = setInterval(() => {
    createFireworkBunch();
  }, 700);
  
  requestAnimationFrame(updateFireworksFrame);
}

function stopFireworks() {
  if (confettiInterval) {
    clearInterval(confettiInterval);
    confettiInterval = null;
  }
  window.removeEventListener('resize', resizeFireworksCanvas);
}

function resizeFireworksCanvas() {
  if (fireworksCanvas) {
    fireworksCanvas.width = fireworksCanvas.parentElement.clientWidth;
    fireworksCanvas.height = fireworksCanvas.parentElement.clientHeight;
  }
}

function createFireworkBunch() {
  if (!fireworksCanvas) return;
  const x = Math.random() * fireworksCanvas.width;
  const y = (Math.random() * 0.4 + 0.2) * fireworksCanvas.height; // 상반부
  
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6', '#E74C3C', '#1ABC9C'];
  const bunchColor = colors[Math.floor(Math.random() * colors.length)];
  
  for (let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 2;
    fireworksParticles.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: bunchColor,
      size: Math.random() * 4 + 2,
      alpha: 1,
      decay: Math.random() * 0.015 + 0.01
    });
  }
}

function updateFireworksFrame() {
  if (!confettiInterval) {
    // 애니메이션 멈추었을 때 캔버스 지우기
    if (fireworksCtx && fireworksCanvas) {
      fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    }
    return;
  }
  
  fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  
  for (let i = fireworksParticles.length - 1; i >= 0; i--) {
    const p = fireworksParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05; // 중력 적용
    p.alpha -= p.decay;
    
    if (p.alpha <= 0) {
      fireworksParticles.splice(i, 1);
      continue;
    }
    
    fireworksCtx.save();
    fireworksCtx.globalAlpha = p.alpha;
    fireworksCtx.fillStyle = p.color;
    fireworksCtx.beginPath();
    fireworksCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    fireworksCtx.fill();
    fireworksCtx.restore();
  }
  
  requestAnimationFrame(updateFireworksFrame);
}

// 15. 유틸리티 공통 알림
function showToast(msg) {
  const toast = document.getElementById('alert-toast');
  toast.textContent = msg;
  toast.className = ''; // 팝업 노출
  
  setTimeout(() => {
    toast.className = 'toast-hidden';
  }, 2200);
}

// 16. 페이지 시작 초기화 및 이벤트 리스너 바인딩
window.addEventListener('DOMContentLoaded', () => {
  // 15.5. 화면 시뮬레이터 크기 토글 바인딩
  const btnMobile = document.getElementById('btn-toggle-mobile');
  const btnTablet = document.getElementById('btn-toggle-tablet');
  const appContainer = document.getElementById('app-container');
  
  if (btnMobile && btnTablet && appContainer) {
    btnMobile.onclick = () => {
      playClick();
      btnMobile.classList.add('active');
      btnTablet.classList.remove('active');
      appContainer.classList.add('mode-mobile');
      appContainer.classList.remove('mode-tablet');
      showToast("스마트폰 화면 크기로 변경되었습니다! 📱");
      if (typeof resizeFireworksCanvas === 'function') resizeFireworksCanvas();
    };
    
    btnTablet.onclick = () => {
      playClick();
      btnTablet.classList.add('active');
      btnMobile.classList.remove('active');
      appContainer.classList.add('mode-tablet');
      appContainer.classList.remove('mode-mobile');
      showToast("태블릿 화면 크기로 변경되었습니다! 📟");
      if (typeof resizeFireworksCanvas === 'function') resizeFireworksCanvas();
    };
  }

  // 데이터 로드
  loadUserData();

  // 도토리 13번 연속 클릭 이스터에그 바인딩
  let acornClickCount = 0;
  let lastAcornClickTime = 0;
  const acornCounterBtn = document.getElementById('header-acorn-counter');
  if (acornCounterBtn) {
    acornCounterBtn.style.cursor = 'pointer';
    acornCounterBtn.onclick = () => {
      const now = Date.now();
      if (now - lastAcornClickTime < 800) { // 0.8초 이내 연속 클릭
        acornClickCount++;
      } else {
        acornClickCount = 1;
      }
      lastAcornClickTime = now;

      // 클릭 시마다 피치 상승 음계 소리
      playTone(400 + acornClickCount * 40, 0.06, 'sine');
      
      // 약한 바운스 피드백
      acornCounterBtn.style.transform = 'scale(1.1)';
      setTimeout(() => { acornCounterBtn.style.transform = 'scale(1)'; }, 100);

      if (acornClickCount === 13) {
        acornClickCount = 0;
        userData.acorns += 100;
        saveUserData();
        playSuccess(); // 화려한 축하 멜로디
        showToast("🐿️ 비밀의 도토리 이스터에그 발견! 도토리 100개 획득! 🌰+100");
        
        // 도토리 카운터 강한 흔들림 효과
        acornCounterBtn.classList.add('animate-bounce');
        setTimeout(() => {
          acornCounterBtn.classList.remove('animate-bounce');
        }, 1500);
      }
    };
  }
  
  // 사운드 클릭 감지
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => playClick());
  });
  
  // [Screen 01] 버튼 바인딩
  document.getElementById('btn-start-test').onclick = () => {
    playClick();
    startLevelTest();
  };
  
  document.getElementById('btn-continue').onclick = () => {
    playClick();
    if (userData.hasCompletedTest && userData.level) {
      showScreen('screen-roadmap');
    } else {
      showToast("아직 진단 기록이 없어요! 레벨테스트를 시작합니다.");
      setTimeout(() => startLevelTest(), 1200);
    }
  };

  const btnGoRoomHome = document.getElementById('btn-go-room-home');
  if (btnGoRoomHome) {
    btnGoRoomHome.onclick = () => {
      playClick();
      showScreen('screen-room');
    };
  }
  
  // [Screen 03] 메인 로드맵 바인딩
  // 스테이지 클릭 시 해당 레벨로 이동
  document.querySelectorAll('.island-node').forEach(node => {
    node.onclick = () => {
      const stageNum = parseInt(node.getAttribute('data-stage'));
      playClick();
      
      if (userData.unlockedStages.includes(stageNum)) {
        userData.currentStage = stageNum;
        saveUserData();
        renderRoadmap();
        showToast(`[Stage ${stageNum}]이 선택되었습니다!`);
      } else {
        playIncorrect();
        showToast("아직 잠겨있는 스테이지입니다! 이전 스테이지를 먼저 풀어보세요.");
      }
    };
  });
  
  // 오늘 학습 시작 버튼
  document.getElementById('btn-start-learn').onclick = () => {
    playClick();
    startLearningSet(userData.currentStage);
  };
  
  // 무제한 새로운 문제 생성 버튼
  document.getElementById('btn-generate-new-set').onclick = () => {
    playClick();
    startLearningSet(userData.currentStage);
    showToast("새로운 문제 세트가 생성되었습니다!");
  };
  
  // [Screen 05] 완료 화면 바인딩
  document.getElementById('btn-go-room').onclick = () => {
    playClick();
    showScreen('screen-room');
  };
  
  document.getElementById('btn-go-roadmap').onclick = () => {
    playClick();
    showScreen('screen-roadmap');
  };
  
  // 로드맵 화면 상점 바로가기 버튼 바인딩
  const btnRoadmapGoRoom = document.getElementById('btn-roadmap-go-room');
  if (btnRoadmapGoRoom) {
    btnRoadmapGoRoom.onclick = () => {
      playClick();
      showScreen('screen-room');
    };
  }

  // [Screen 06] 요술 방 꾸미기 바인딩 (구버전 탭과의 하위 호환성 유지)
  const tabMyRoom = document.getElementById('tab-myroom');
  if (tabMyRoom) {
    tabMyRoom.onclick = () => {
      playClick();
      tabMyRoom.classList.add('active');
      const tabShop = document.getElementById('tab-shop');
      if (tabShop) tabShop.classList.remove('active');
      
      const screenRoom = document.getElementById('screen-room');
      if (screenRoom) screenRoom.classList.remove('shop-active');
      const roomViewer = document.getElementById('room-viewer-container');
      if (roomViewer) roomViewer.classList.remove('hidden');
      const roomShop = document.getElementById('room-shop-container');
      if (roomShop) roomShop.classList.add('hidden');
    };
  }
  
  const tabShop = document.getElementById('tab-shop');
  if (tabShop) {
    tabShop.onclick = () => {
      playClick();
      deselectAdjustmentItem();
      tabShop.classList.add('active');
      if (tabMyRoom) tabMyRoom.classList.remove('active');
      
      const screenRoom = document.getElementById('screen-room');
      if (screenRoom) screenRoom.classList.add('shop-active');
      const roomViewer = document.getElementById('room-viewer-container');
      if (roomViewer) roomViewer.classList.remove('hidden');
      const roomShop = document.getElementById('room-shop-container');
      if (roomShop) roomShop.classList.remove('hidden');
    };
  }
  
  // 상점 가구/의상 토글 바인딩
  document.querySelectorAll('.shop-filter-btn').forEach(btn => {
    btn.onclick = () => {
      playClick();
      document.querySelectorAll('.shop-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentShopCategory = btn.getAttribute('data-category');
      renderShopItems();
    };
  });
  
  document.getElementById('btn-room-back').onclick = () => {
    playClick();
    showScreen('screen-roadmap');
  };

  // 실시간 코스튬 미세조절기 버튼 이벤트 바인딩
  const bindAdjusterButton = (btnId, action) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.onclick = () => {
        if (!activeAdjustmentItemId) return;
        const transform = getCostumeTransform(activeAdjustmentItemId);
        action(transform);
        updateCharacterCostumes();
        saveUserData();
        
        // 버튼 클릭 피드백 틱 효과음
        playTone(500, 0.03, 'sine');
      };
    }
  };

  bindAdjusterButton('adj-up', (t) => t.y -= 2.5);
  bindAdjusterButton('adj-down', (t) => t.y += 2.5);
  bindAdjusterButton('adj-left', (t) => t.x -= 2.5);
  bindAdjusterButton('adj-right', (t) => t.x += 2.5);
  bindAdjusterButton('adj-size-up', (t) => t.scale = Math.min(3.0, t.scale + 0.08));
  bindAdjusterButton('adj-size-down', (t) => t.scale = Math.max(0.3, t.scale - 0.08));
  bindAdjusterButton('adj-rot-left', (t) => t.rotate = (t.rotate - 15) % 360);
  bindAdjusterButton('adj-rot-right', (t) => t.rotate = (t.rotate + 15) % 360);
  bindAdjusterButton('adj-reset', (t) => {
    const item = SHOP_ITEMS.find(x => x.id === activeAdjustmentItemId);
    t.x = 50;
    t.y = item ? (item.style.svgY || 30) : 30;
    t.scale = 1.0;
    t.rotate = 0;
  });
  
  // [오답노트 버튼 바인딩]
  document.getElementById('incorrect-note-btn').onclick = () => {
    openIncorrectNoteModal();
  };
  
  document.getElementById('close-modal-btn').onclick = () => {
    playClick();
    document.getElementById('incorrect-note-modal').classList.add('hidden');
  };
  
  document.getElementById('btn-close-modal').onclick = () => {
    playClick();
    document.getElementById('incorrect-note-modal').classList.add('hidden');
  };
  
  document.getElementById('btn-solve-incorrects').onclick = () => {
    startAllIncorrectsReview();
  };
  
  // 볼륨 토글 버튼 바인딩
  document.getElementById('audio-toggle-btn').onclick = () => {
    isMuted = !isMuted;
    if (isMuted) {
      document.getElementById('audio-toggle-btn').textContent = '🔇';
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } else {
      document.getElementById('audio-toggle-btn').textContent = '🔊';
      playTone(440, 0.1);
    }
  };
});
