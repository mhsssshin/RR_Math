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
  inventory: ['skin_base'], // 구매 완료 아이템 목록 (기본 스킨 포함)
  equippedCostume: { skin: 'skin_base' }, // 장착 캐릭터 스킨 { skin: id }
  equippedFurniture: [],  // 배치 가구 목록 (아이디 배열)
  completedDays: [],      // 출석일 기록
  incorrectAnswers: [],   // 오답 리스트
  furnitureTransforms: {} // 각 가구의 커스텀 위치/크기/각도 상태 { itemId: { x, y, scale, rotate } }
};

let userData = { ...DEFAULT_USER_DATA };

const SHOP_ITEMS = [
  // 카테고리: costume (로롱이 캐릭터 스킨)
  { id: 'skin_base', category: 'costume', sub: 'skin', name: '기본형 로롱이 🐿️', emoji: '🐿️', price: 0, style: { svgY: 30, svgSize: 30 } },
  { id: 'skin_scarf', category: 'costume', sub: 'skin', name: '빨간 목도리 로롱이 🧣', emoji: '🧣', price: 20, style: { svgY: 55, svgSize: 32 } },
  { id: 'skin_hero', category: 'costume', sub: 'skin', name: '영웅 로롱이 🦸', emoji: '🦸', price: 75, style: { svgY: 56, svgSize: 46 } },
  { id: 'skin_wizard', category: 'costume', sub: 'skin', name: '마법사 로롱이 🧙', emoji: '🧙', price: 50, style: { svgY: 4, svgSize: 52, transform: 'rotate(-10 50 4)' } },
  { id: 'skin_pirate', category: 'costume', sub: 'skin', name: '해적 선장 로롱이 🏴‍☠️', emoji: '🏴‍☠️', price: 45, style: { svgY: 8, svgSize: 42, transform: 'rotate(-3 50 8)' } },
  { id: 'skin_detective', category: 'costume', sub: 'skin', name: '탐정 로롱이 🕵️', emoji: '🕵️', price: 60, style: { svgY: 11, svgSize: 40 } },
  { id: 'skin_glasses', category: 'costume', sub: 'skin', name: '똘똘이 로롱이 👓', emoji: '👓', price: 15, style: { svgY: 33, svgSize: 32 } },
  { id: 'skin_sunglasses', category: 'costume', sub: 'skin', name: '별 선글라스 로롱이 🕶️', emoji: '🕶️', price: 40, style: { svgY: 33, svgSize: 32, filter: 'hue-rotate(180deg)' } },
  { id: 'skin_funny', category: 'costume', sub: 'skin', name: '코믹 로롱이 🥸', emoji: '🥸', price: 30, style: { svgY: 32, svgSize: 36 } },
  { id: 'skin_bowtie', category: 'costume', sub: 'skin', name: '신사 로롱이 🎀', emoji: '🎀', price: 10, style: { svgY: 54, svgSize: 24 } },
  
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

let currentPreviewSkin = 'skin_base';
let currentPreviewFurniture = [];

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
  if (typeof deselectFurnitureAdjustment === 'function') {
    deselectFurnitureAdjustment();
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
    // 진입 시 실제 장착된 아이템으로 미리보기 초기화!
    currentPreviewSkin = userData.equippedCostume.skin || 'skin_base';
    currentPreviewFurniture = [...userData.equippedFurniture];
    
    renderMyRoom();
    renderShopItems();
    
    // 첫 진입 시 미세조절기 닫고 두 화면 모두 노출
    if (typeof deselectFurnitureAdjustment === 'function') {
      deselectFurnitureAdjustment();
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
  if (!userData.inventory) userData.inventory = ['skin_base'];
  if (!userData.inventory.includes('skin_base')) {
    userData.inventory.push('skin_base');
  }
  if (!userData.equippedCostume) userData.equippedCostume = { skin: 'skin_base' };
  if (!userData.equippedCostume.skin) userData.equippedCostume.skin = 'skin_base';
  if (!userData.equippedFurniture) userData.equippedFurniture = [];
  if (!userData.furnitureTransforms) userData.furnitureTransforms = {};
  
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

let usedTestQuestionIds = new Set(); // 테스트 문제 중복 방지용

function startLevelTest() {
  testScore = 0;
  testCurrentStep = 0;
  testCurrentDifficulty = 4; // 난이도 4(5세심)부터 시작하여 적응형으로 이동
  testAnswersHistory = [];
  usedTestQuestionIds = new Set(); // 테스트 시작 시 초기화
  
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
  
  // 문제 은행에서 현재 난이도에 맞는 문제를 중복 없이 추출
  const types = ['concept', 'apply', 'think'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  
  const bankPool = QUESTION_BANK[testCurrentDifficulty]?.[randomType];
  let qData = null;
  
  if (bankPool) {
    const available = bankPool.filter(q => !usedTestQuestionIds.has(q.id));
    if (available.length > 0) {
      qData = available[Math.floor(Math.random() * available.length)];
      usedTestQuestionIds.add(qData.id);
    }
  }
  
  // 폴백: 문제 은행에서 못 찾으면 기존 TEST_QUESTION_TEMPLATES 사용
  if (!qData) {
    const pool = TEST_QUESTION_TEMPLATES[testCurrentDifficulty];
    const fallback = pool[Math.floor(Math.random() * pool.length)];
    qData = {
      questionText: fallback.q,
      visual: fallback.visual,
      options: fallback.options,
      correctAnswer: fallback.ans,
      hint: fallback.hint
    };
  }
  
  // 문항 데이터 복제 및 저장
  const currentTestQuestion = { ...qData };
  
  // 화면 렌더링
  document.getElementById('test-question-text').textContent = currentTestQuestion.questionText || currentTestQuestion.q;
  renderVisualArea('test-visual-area', currentTestQuestion.visual);
  
  // TTS 즉시 읽기
  speakText(currentTestQuestion.questionText || currentTestQuestion.q);
  
  // 오디오 리스너 연결
  document.getElementById('test-tts-btn').onclick = () => {
    playClick();
    speakText(currentTestQuestion.questionText || currentTestQuestion.q);
  };
  
  // 보기 렌더링
  const optionsDiv = document.getElementById('test-options');
  optionsDiv.innerHTML = '';
  
  // 3개 보기 또는 4개 보기 대응
  optionsDiv.className = `options-grid cols-${currentTestQuestion.options.length}`;
  
  const correctAns = currentTestQuestion.correctAnswer || currentTestQuestion.ans;
  
  const shuffledOptions = shuffleArray(currentTestQuestion.options);
  shuffledOptions.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-card bounce-hover';
    btn.innerHTML = opt;
    btn.onclick = () => selectTestAnswer(btn, opt, correctAns);
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
    
    // 정답 시 난이도 업 (최대 12)
    if (testCurrentDifficulty < 12) {
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
  for (let stageNum = 1; stageNum <= 12; stageNum++) {
    const node = document.getElementById(`island-stage-${stageNum}`);
    if (!node) continue;
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

  // 활성화된 카드를 중앙으로 가로 스크롤
  setTimeout(() => {
    if (activeStageNode) {
      activeStageNode.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    const scrollContainer = document.querySelector('.island-map-scroll');
    if (scrollContainer) {
      scrollContainer.dispatchEvent(new Event('scroll'));
    }
  }, 100);
}

// 10. 무한 문제 생성기 및 채점 엔진 (Screen 04)
// 현재 공부중인 스테이지와 문항 번호(1~5)에 따라 문제를 즉시 절차적/수학 난수 생성
function generateProceduralQuestion(stage, qNum) {
  // qNum 1~3은 concept, 4는 apply, 5는 think
  let type = 'concept';
  if (qNum === 4) type = 'apply';
  if (qNum === 5) type = 'think';
  
  // 문제 은행에서 중복 없이 추출
  const bankQuestion = pickQuestionFromBank(stage, type);
  
  if (bankQuestion) {
    return {
      id: bankQuestion.id,
      stage: stage,
      qNum: qNum,
      type: type,
      questionText: bankQuestion.questionText,
      visual: bankQuestion.visual,
      options: bankQuestion.options,
      correctAnswer: bankQuestion.correctAnswer,
      hint: bankQuestion.hint
    };
  }
  
  // 만약 문제 은행이 아직 로드되지 않았을 경우 기본 폴백
  return {
    id: `q_fallback_${stage}_${qNum}_${Date.now()}`,
    stage: stage,
    qNum: qNum,
    type: type,
    questionText: '문제를 불러오는 중이에요...',
    visual: { type: 'math', formula: '?' },
    options: ['1', '2', '3'],
    correctAnswer: '1',
    hint: '잠시 후 다시 시도해 보세요!'
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
  if (nextStageNum <= 12 && !userData.unlockedStages.includes(nextStageNum)) {
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
  
  if (decorLayer) {
    decorLayer.innerHTML = '';
  }
  
  // 기본 방 배경 초기화
  roomBg.style.backgroundColor = '#FCF3CF';
  roomBg.className = 'myroom-display';
  
  // 방 배경 클릭 시 선택 해제
  roomBg.onclick = (e) => {
    if (e.target === roomBg) {
      deselectFurnitureAdjustment();
      renderMyRoom();
    }
  };
  
  // 장착 가구/벽지 그리기 (미리보기 포함)
  currentPreviewFurniture.forEach(itemId => {
    const item = SHOP_ITEMS.find(x => x.id === itemId);
    if (!item) return;
    
    if (item.sub === 'wallpaper') {
      roomBg.style.backgroundColor = item.roomBg;
      roomBg.classList.add(item.roomClass);
    } 
    else if (item.sub === 'deco') {
      const transform = getFurnitureTransform(item.id);
      
      const el = document.createElement('div');
      el.className = 'decor-furniture-item';
      
      const isActive = (activeAdjustingFurnitureId === item.id);
      if (isActive) {
        el.classList.add('active');
      }
      
      el.style.position = 'absolute';
      el.style.left = `${transform.x}%`;
      el.style.top = `${transform.y}%`;
      el.style.transform = `scale(${transform.scale}) rotate(${transform.rotate}deg)`;
      el.style.transformOrigin = 'center center';
      
      el.innerHTML = `
        <div class="furniture-emoji" style="font-size: 3rem; line-height: 1; padding: 10px; cursor: move;">${item.emoji}</div>
        <div class="furniture-border-box"></div>
        <button class="furniture-btn-delete">×</button>
        <div class="furniture-handle-resize">🔄</div>
      `;
      
      const emojiEl = el.querySelector('.furniture-emoji');
      const deleteBtn = el.querySelector('.furniture-btn-delete');
      const resizeHandle = el.querySelector('.furniture-handle-resize');
      
      // 1. 드래그 앤 드롭 이동 바인딩 (이모지 부분 드래그 시)
      const startDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // 터치하자마자 조절 상태로 포커스 지정 및 즉시 점선 그리기!
        selectFurnitureAdjustment(item);
        renderMyRoom();
        
        const isTouch = e.type === 'touchstart';
        const startX = isTouch ? e.touches[0].clientX : e.clientX;
        const startY = isTouch ? e.touches[0].clientY : e.clientY;
        
        const initX = transform.x;
        const initY = transform.y;
        
        const rect = roomBg.getBoundingClientRect();
        let hasMoved = false;
        
        const onDrag = (moveEvent) => {
          const moveX = isTouch ? moveEvent.touches[0].clientX : moveEvent.clientX;
          const moveY = isTouch ? moveEvent.touches[0].clientY : moveEvent.clientY;
          
          const dx = moveX - startX;
          const dy = moveY - startY;
          
          // 미세 오차(3px) 이상 움직였을 때만 드래그로 판정
          if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            hasMoved = true;
          }
          
          const deltaX = dx * (100 / rect.width);
          const deltaY = dy * (100 / rect.height);
          
          transform.x = Math.max(-20, Math.min(120, initX + deltaX));
          transform.y = Math.max(-20, Math.min(120, initY + deltaY));
          
          // DOM의 left/top 실시간 갱신 (선택된 활성 요소 기준)
          const activeEl = document.querySelector('.decor-furniture-item.active');
          if (activeEl) {
            activeEl.style.left = `${transform.x}%`;
            activeEl.style.top = `${transform.y}%`;
          }
        };
        
        const endDrag = () => {
          document.removeEventListener(isTouch ? 'touchmove' : 'mousemove', onDrag);
          document.removeEventListener(isTouch ? 'touchend' : 'mouseup', endDrag);
          saveUserData();
          
          if (!hasMoved) {
            // 움직이지 않고 클릭만 한 경우: 선택 피드백음 재생
            playTone(523, 0.08, 'sine');
            setTimeout(() => playTone(784, 0.12, 'sine'), 50);
          } else {
            // 드래그해서 배치 완료한 경우: 가볍게 탭 애니메이션 실행
            const activeEl = document.querySelector('.decor-furniture-item.active');
            if (activeEl) {
              activeEl.classList.add('jump');
              setTimeout(() => activeEl.classList.remove('jump'), 500);
            }
          }
          
          renderMyRoom();
        };
        
        document.addEventListener(isTouch ? 'touchmove' : 'mousemove', onDrag);
        document.addEventListener(isTouch ? 'touchend' : 'mouseup', endDrag);
      };
      
      emojiEl.addEventListener('mousedown', startDrag);
      emojiEl.addEventListener('touchstart', startDrag, { passive: false });
      
      // 3. 삭제(❌) 버튼 바인딩
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        playClick();
        unequipItem(item);
      };
      
      // 4. 회전 및 크기 조절 핸들(🔄) 바인딩
      const handleResize = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isTouch = e.type === 'touchstart';
        const startX = isTouch ? e.touches[0].clientX : e.clientX;
        const startY = isTouch ? e.touches[0].clientY : e.clientY;
        
        // parent element(el)의 본래 중심점을 계산하기 위해 parent의 bounding rect 사용
        const parentRect = el.getBoundingClientRect();
        const centerX = parentRect.left + parentRect.width / 2;
        const centerY = parentRect.top + parentRect.height / 2;
        
        const dx = startX - centerX;
        const dy = startY - centerY;
        const initDist = Math.sqrt(dx * dx + dy * dy);
        const initAngle = Math.atan2(dy, dx);
        
        const initScale = transform.scale || 1.0;
        const initRotate = transform.rotate || 0;
        
        const onResizeDrag = (moveEvent) => {
          const curX = isTouch ? moveEvent.touches[0].clientX : moveEvent.clientX;
          const curY = isTouch ? moveEvent.touches[0].clientY : moveEvent.clientY;
          
          const curDx = curX - centerX;
          const curDy = curY - centerY;
          const curDist = Math.sqrt(curDx * curDx + curDy * curDy);
          const curAngle = Math.atan2(curDy, curDx);
          
          const scaleFactor = curDist / (initDist || 1);
          let newScale = initScale * scaleFactor;
          newScale = Math.max(0.4, Math.min(2.5, newScale));
          
          const angleDiff = curAngle - initAngle;
          const newRotate = (initRotate + angleDiff * (180 / Math.PI)) % 360;
          
          transform.scale = parseFloat(newScale.toFixed(2));
          transform.rotate = Math.round(newRotate);
          
          el.style.transform = `scale(${transform.scale}) rotate(${transform.rotate}deg)`;
        };
        
        const endResizeDrag = () => {
          document.removeEventListener(isTouch ? 'touchmove' : 'mousemove', onResizeDrag);
          document.removeEventListener(isTouch ? 'touchend' : 'mouseup', endResizeDrag);
          saveUserData();
          renderMyRoom();
        };
        
        document.addEventListener(isTouch ? 'touchmove' : 'mousemove', onResizeDrag);
        document.addEventListener(isTouch ? 'touchend' : 'mouseup', endResizeDrag);
      };
      
      resizeHandle.addEventListener('mousedown', handleResize);
      resizeHandle.addEventListener('touchstart', handleResize, { passive: false });
      
      decorLayer.appendChild(el);
    }
  });
  
  // 장착 의상(스킨) 그리기 (전체 화면 동시 업데이트)
  updateCharacterCostumes();
}

// 가구 실시간 미세조정 상태 관리 및 유틸리티
let activeAdjustingFurnitureId = null;

function getFurnitureTransform(itemId) {
  if (!userData.furnitureTransforms) {
    userData.furnitureTransforms = {};
  }
  if (!userData.furnitureTransforms[itemId]) {
    const item = SHOP_ITEMS.find(x => x.id === itemId);
    const defaultX = item ? parseFloat(item.posX || '50') : 50;
    const defaultY = item ? parseFloat(item.posY || '50') : 50;
    userData.furnitureTransforms[itemId] = {
      x: defaultX,
      y: defaultY,
      scale: 1.0,
      rotate: 0
    };
  }
  return userData.furnitureTransforms[itemId];
}

function selectFurnitureAdjustment(item) {
  activeAdjustingFurnitureId = item.id;
  const panel = document.getElementById('costume-adjuster-panel');
  const targetName = document.getElementById('adjuster-target-name');
  if (panel && targetName) {
    panel.classList.remove('hidden');
    targetName.textContent = `🔧 ${item.name} 조절기`;
  }
}

function deselectFurnitureAdjustment() {
  activeAdjustingFurnitureId = null;
  const panel = document.getElementById('costume-adjuster-panel');
  if (panel) {
    panel.classList.add('hidden');
  }
}

function getRorongSVG(skinId, isCelebrating = false) {
  // 1. Cape / Background items (rendered behind Rorong's body)
  let bgCape = '';
  if (skinId === 'skin_hero') {
    // Blue hero cape behind body
    bgCape = `<path d="M 25 55 C 10 70, 10 90, 30 95 C 50 100, 50 95, 70 95 C 90 90, 90 70, 75 55 Z" fill="#3498DB" />`;
  } else if (skinId === 'skin_detective') {
    // Brown detective capelet/coat behind body
    bgCape = `<path d="M 30 55 L 12 78 Q 50 88 88 78 L 70 55 Z" fill="#D35400" />`;
  }

  // 2. Base Rorong Body
  const tail = `<path d="M 80 50 C 95 30, 95 70, 80 80 C 75 85, 65 80, 65 70 Z" fill="#D2691E" />`;
  const body = `<circle cx="50" cy="55" r="30" fill="#E67E22" />
                <circle cx="50" cy="58" r="22" fill="#F39C12" />`;
  const ears = `<polygon points="30,20 40,5 45,22" fill="#D2691E" />
                <polygon points="30,20 37,9 41,20" fill="#F39C12" />
                <polygon points="70,20 60,5 55,22" fill="#D2691E" />
                <polygon points="70,20 63,9 59,20" fill="#F39C12" />`;
  const face = `<circle cx="50" cy="35" r="24" fill="#E67E22" />
                <circle cx="50" cy="37" r="18" fill="#F1C40F" />`;
  
  // 3. Mask / Eyepatch / Glasses (rendered on the face, under the eyes or over)
  let faceAccessories = '';
  if (skinId === 'skin_hero') {
    // Superhero blue domino mask
    faceAccessories = `<path d="M 28 30 C 32 25, 45 25, 50 28 C 55 25, 68 25, 72 30 C 76 38, 62 38, 50 33 C 38 38, 24 38, 28 30 Z" fill="#2980B9" />`;
  } else if (skinId === 'skin_pirate') {
    // Pirate black eyepatch over left eye
    faceAccessories = `<path d="M 30 24 L 60 36" stroke="#1C2833" stroke-width="2.5" />
                       <circle cx="42" cy="30" r="5" fill="#1C2833" />`;
  } else if (skinId === 'skin_glasses' || skinId === 'skin_sunglasses') {
    // Smart glasses or sunglasses
    const frameColor = skinId === 'skin_sunglasses' ? '#2C3E50' : '#E74C3C';
    const lensFill = skinId === 'skin_sunglasses' ? '#2C3E50' : 'rgba(52, 152, 219, 0.4)';
    faceAccessories = `
      <!-- Left frame & lens -->
      <circle cx="42" cy="30" r="6" stroke="${frameColor}" stroke-width="2" fill="${lensFill}" />
      <!-- Right frame & lens -->
      <circle cx="58" cy="30" r="6" stroke="${frameColor}" stroke-width="2" fill="${lensFill}" />
      <!-- Bridge -->
      <path d="M 48 30 Q 50 28 52 30" stroke="${frameColor}" stroke-width="2" fill="none" />
      <!-- Temples -->
      <path d="M 36 30 Q 30 30 28 32" stroke="${frameColor}" stroke-width="2" fill="none" />
      <path d="M 64 30 Q 70 30 72 32" stroke="${frameColor}" stroke-width="2" fill="none" />
    `;
  } else if (skinId === 'skin_funny') {
    // Comic disguise (glasses + nose + mustache)
    faceAccessories = `
      <circle cx="42" cy="30" r="6" stroke="#000000" stroke-width="2" fill="none" />
      <circle cx="58" cy="30" r="6" stroke="#000000" stroke-width="2" fill="none" />
      <path d="M 48 30 Q 50 28 52 30" stroke="#000000" stroke-width="2" fill="none" />
      <ellipse cx="50" cy="34" rx="4.5" ry="6" fill="#FF8A80" />
      <!-- Mustache -->
      <path d="M 45 42 Q 50 38 55 42 Q 60 43 62 40 M 45 42 Q 40 43 38 40" stroke="#000000" stroke-width="2.5" fill="none" />
    `;
  }

  // 4. Base Face details (Celebrating vs Normal)
  let eyes = '';
  let cheeks = '';
  let noseMouth = '';
  
  if (isCelebrating) {
    eyes = `
      <path d="M 38 31 Q 42 27 46 31" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <path d="M 54 31 Q 58 27 62 31" stroke="#2C3E50" stroke-width="2.5" stroke-linecap="round" fill="none" />
    `;
    cheeks = `
      <circle cx="36" cy="36" r="3" fill="#FF7F50" opacity="0.8" />
      <circle cx="64" cy="36" r="3" fill="#FF7F50" opacity="0.8" />
    `;
    noseMouth = `
      <polygon points="50,33 48,31 52,31" fill="#2C3E50" />
      <path d="M 44 42 Q 50 49 56 42" fill="#E74C3C" stroke="#2C3E50" stroke-width="1.5" />
    `;
  } else {
    eyes = `
      <circle cx="42" cy="30" r="3" fill="#2C3E50" />
      <circle cx="42" cy="29" r="1" fill="#FFFFFF" />
      <circle cx="58" cy="30" r="3" fill="#2C3E50" />
      <circle cx="58" cy="29" r="1" fill="#FFFFFF" />
    `;
    cheeks = `
      <circle cx="36" cy="36" r="3" fill="#FF7F50" opacity="0.7" />
      <circle cx="64" cy="36" r="3" fill="#FF7F50" opacity="0.7" />
    `;
    noseMouth = `
      <polygon points="50,33 48,31 52,31" fill="#2C3E50" />
      <path d="M 48 35 Q 50 37 52 35" stroke="#2C3E50" stroke-width="1.5" fill="none" />
      <rect x="48" y="37" width="4" height="3" fill="#FFFFFF" />
    `;
  }

  // 5. Neck/Chest Items (rendered on top of body/neck)
  let neckItem = '';
  if (skinId === 'skin_scarf') {
    // Native red scarf wrapped around the neck
    neckItem = `
      <!-- Scarf wrap -->
      <path d="M 32 50 Q 50 63 68 50 Q 72 57 65 62 Q 50 67 35 62 Z" fill="#E74C3C" />
      <!-- Scarf tail -->
      <path d="M 58 58 Q 66 75 60 80 Q 54 80 54 75 Q 54 62 58 58 Z" fill="#C0392B" />
      <!-- Fringes -->
      <rect x="53" y="79" width="8" height="2" fill="#962D22" />
    `;
  } else if (skinId === 'skin_bowtie') {
    // Red bowtie on neck
    neckItem = `
      <polygon points="50,54 40,47 40,61" fill="#E74C3C" />
      <polygon points="50,54 60,47 60,61" fill="#E74C3C" />
      <circle cx="50" cy="54" r="3.5" fill="#C0392B" />
    `;
  }

  // 6. Hats (rendered on top of Rorong's ears/head)
  let hatItem = '';
  if (skinId === 'skin_wizard') {
    // Purple Wizard Hat with a gold star
    hatItem = `
      <g transform="rotate(-6 50 10)">
        <!-- Brim -->
        <ellipse cx="50" cy="12" rx="28" ry="5.5" fill="#7D3C98" />
        <!-- Cone -->
        <path d="M 28 11 Q 50 -24 50 -24 Q 50 -24 72 11 Z" fill="#8E44AD" />
        <!-- Gold star -->
        <polygon points="50,-8 52,-3 57,-3 53,0 55,5 50,2 45,5 47,0 43,-3 48,-3" fill="#F1C40F" />
      </g>
    `;
  } else if (skinId === 'skin_pirate') {
    // Bicorn Pirate Captain Hat
    hatItem = `
      <g transform="rotate(-3 50 12)">
        <!-- Hat body -->
        <path d="M 20 18 Q 50 3 80 18 Q 85 8 50 12 Q 15 8 20 18 Z" fill="#2C3E50" />
        <!-- Gold trim -->
        <path d="M 20 18 Q 50 3 80 18" fill="none" stroke="#F1C40F" stroke-width="1.5" />
        <!-- White skull -->
        <text x="50" y="12" font-size="9" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF" font-family="Arial">💀</text>
      </g>
    `;
  } else if (skinId === 'skin_detective') {
    // Brown Detective Deerstalker Hat
    hatItem = `
      <g transform="translate(0, -1)">
        <!-- Dome -->
        <path d="M 28 18 C 28 3, 72 3, 72 18 Z" fill="#D35400" />
        <!-- Front visor -->
        <path d="M 22 18 C 22 18, 50 14, 78 18 Q 78 22 50 19 Q 22 22 22 18 Z" fill="#BA4A00" />
        <!-- Back visor -->
        <path d="M 26 18 C 26 18, 50 15, 74 18 Q 74 21 50 19 Q 26 21 26 18 Z" fill="#BA4A00" transform="scale(-1, 1) translate(-100, 0)" />
        <!-- Band -->
        <rect x="28" y="16" width="44" height="2.5" fill="#E67E22" />
      </g>
    `;
  }

  // Combine everything in correct SVG layer order!
  return `
    <svg viewBox="0 0 100 100" class="character-svg" style="overflow: visible;">
      <!-- 1. 망토 (맨 밑 레이어) -->
      ${bgCape}
      
      <!-- 2. 꼬리 -->
      ${tail}
      
      <!-- 3. 몸체 -->
      ${body}
      
      <!-- 4. 귀 -->
      ${ears}
      
      <!-- 5. 머리/얼굴 원 -->
      ${face}
      
      <!-- 6. 안경/가면 (얼굴 원 위에, 눈 밑에) -->
      ${faceAccessories}
      
      <!-- 7. 눈/볼터치/주둥이 -->
      ${eyes}
      ${cheeks}
      ${noseMouth}
      
      <!-- 8. 목도리/넥타이 (몸 위에) -->
      ${neckItem}
      
      <!-- 9. 모자 (맨 위 레이어) -->
      ${hatItem}
    </svg>
  `;
}

function updateCharacterCostumes() {
  const homeTarget = document.getElementById('home-rorong');
  const completedTarget = document.getElementById('completed-rorong');
  const roomTarget = document.getElementById('room-rorong-character');
  const roadmapTarget = document.getElementById('roadmap-rorong-character');
  
  const equippedSkinId = userData.equippedCostume.skin || 'skin_base';
  const previewSkinId = currentPreviewSkin || equippedSkinId;
  
  if (homeTarget) homeTarget.innerHTML = getRorongSVG(equippedSkinId, false);
  if (completedTarget) completedTarget.innerHTML = getRorongSVG(equippedSkinId, true);
  if (roomTarget) roomTarget.innerHTML = getRorongSVG(previewSkinId, false);
  if (roadmapTarget) roadmapTarget.innerHTML = getRorongSVG(equippedSkinId, false);
}

function renderShopItems() {
  const grid = document.getElementById('shop-items-grid');
  grid.innerHTML = '';
  
  const filtered = SHOP_ITEMS.filter(x => x.category === currentShopCategory);
  
  filtered.forEach(item => {
    // 0원인 기본 스킨은 상점 구매대상이 아니므로 노출 건너뛰기
    if (item.id === 'skin_base') return;

    const isOwned = userData.inventory.includes(item.id);
    const isEquipped = (item.category === 'costume')
      ? (userData.equippedCostume.skin === item.id)
      : userData.equippedFurniture.includes(item.id);
      
    // 현재 미리보기에 반영되어 있는지 여부
    const isPreviewActive = (item.category === 'costume')
      ? (currentPreviewSkin === item.id)
      : (currentPreviewFurniture.includes(item.id));
      
    const row = document.createElement('div');
    row.className = `item-shop-row ${isPreviewActive ? 'preview-active' : ''}`;
    
    row.innerHTML = `
      <div class="item-shop-row-left">
        <span class="item-shop-row-emoji">${item.emoji}</span>
        <div class="item-shop-row-info">
          <span class="item-shop-row-name">${item.name}</span>
          <span class="item-shop-row-price">${isOwned ? '소유함' : `🌰 ${item.price}개`}</span>
        </div>
      </div>
      <div class="item-shop-row-right"></div>
    `;
    
    // 행 클릭 시 즉시 미리보기(Try-on) 반응
    row.onclick = (e) => {
      // 만약 버튼을 클릭한 것이라면 버블링 방지
      if (e.target.tagName === 'BUTTON') return;
      
      playClick();
      
      if (item.category === 'costume') {
        currentPreviewSkin = item.id;
      } else {
        // 가구/벽지
        if (item.sub === 'wallpaper') {
          currentPreviewFurniture = currentPreviewFurniture.filter(id => {
            const x = SHOP_ITEMS.find(i => i.id === id);
            return !x || x.sub !== 'wallpaper';
          });
          currentPreviewFurniture.push(item.id);
        } else {
          // 데코 가구
          if (!currentPreviewFurniture.includes(item.id)) {
            currentPreviewFurniture.push(item.id);
          }
          // 조절 타겟 지정
          selectFurnitureAdjustment(item);
        }
      }
      
      renderMyRoom();
      renderShopItems();
    };
    
    const rightArea = row.querySelector('.item-shop-row-right');
    
    if (!isOwned) {
      const buyBtn = document.createElement('button');
      buyBtn.className = 'item-shop-row-btn btn-buy bounce-hover';
      buyBtn.textContent = '구매';
      buyBtn.onclick = (e) => {
        e.stopPropagation();
        buyShopItem(item);
      };
      rightArea.appendChild(buyBtn);
    } else {
      if (isEquipped) {
        const unequipBtn = document.createElement('button');
        unequipBtn.className = 'item-shop-row-btn btn-unequip bounce-hover';
        unequipBtn.textContent = '해제';
        unequipBtn.onclick = (e) => {
          e.stopPropagation();
          unequipItem(item);
        };
        rightArea.appendChild(unequipBtn);
      } else {
        const equipBtn = document.createElement('button');
        equipBtn.className = 'item-shop-row-btn btn-equip bounce-hover';
        equipBtn.textContent = '장착';
        equipBtn.onclick = (e) => {
          e.stopPropagation();
          equipItem(item);
        };
        rightArea.appendChild(equipBtn);
      }
    }
    
    grid.appendChild(row);
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
    userData.equippedCostume.skin = item.id;
    currentPreviewSkin = item.id; // 미리보기 동기화
    deselectFurnitureAdjustment();
  } else {
    // 벽지의 경우 중복 안됨
    if (item.sub === 'wallpaper') {
      userData.equippedFurniture = userData.equippedFurniture.filter(id => {
        const x = SHOP_ITEMS.find(i => i.id === id);
        return x.sub !== 'wallpaper';
      });
      currentPreviewFurniture = currentPreviewFurniture.filter(id => {
        const x = SHOP_ITEMS.find(i => i.id === id);
        return x.sub !== 'wallpaper';
      });
    }
    userData.equippedFurniture.push(item.id);
    if (!currentPreviewFurniture.includes(item.id)) {
      currentPreviewFurniture.push(item.id);
    }
    selectFurnitureAdjustment(item);
  }
  
  saveUserData();
  renderMyRoom();
  renderShopItems();
}

function unequipItem(item) {
  playClick();
  if (item.category === 'costume') {
    userData.equippedCostume.skin = 'skin_base';
    currentPreviewSkin = 'skin_base'; // 미리보기 동기화
  } else {
    userData.equippedFurniture = userData.equippedFurniture.filter(id => id !== item.id);
    currentPreviewFurniture = currentPreviewFurniture.filter(id => id !== item.id); // 미리보기 동기화
    if (activeAdjustingFurnitureId === item.id) {
      deselectFurnitureAdjustment();
    }
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

  // 곡선형 로드맵 가로 스크롤 이벤트 바인딩 및 커브 모사 연산
  const scrollContainer = document.querySelector('.island-map-scroll');
  const rorong = document.getElementById('roadmap-rorong-character');
  
  if (scrollContainer) {
    let isScrolling = null;
    
    const updateRoadmapCurve = () => {
      if (rorong) {
        rorong.classList.add('walking');
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          rorong.classList.remove('walking');
        }, 150);
      }
      
      const containerRect = scrollContainer.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      const nodes = scrollContainer.querySelectorAll('.island-node');
      
      nodes.forEach(node => {
        const nodeRect = node.getBoundingClientRect();
        const nodeCenter = nodeRect.left + nodeRect.width / 2;
        
        // 중심축 기준 오프셋 계산
        const distance = nodeCenter - containerCenter;
        const maxDist = containerRect.width / 1.4; // 부드러운 하강 곡률 기준값
        const ratio = Math.min(Math.max(distance / maxDist, -1), 1);
        
        // 포물선 Y 오프셋 (양쪽 끝으로 갈수록 아래로 내려감) - 최대 70px로 제한하여 클리핑 방지
        const yOffset = ratio * ratio * 70;
        
        // 자연스럽게 눕도록 하는 기울기(회전)
        const tilt = ratio * 12;
        
        // 투명도 조절: 중앙에서 멀어질수록 약간 투명해지되 주변에 다 드러나도록 설정 (최대 투명도 0.6)
        const isCurrentlyActive = node.classList.contains('active-stage');
        const minOpacity = isCurrentlyActive ? 0.85 : 0.6;
        const opacity = 1 - Math.abs(ratio) * (1 - minOpacity);
        
        node.style.transform = `translateY(${yOffset}px) rotate(${tilt}deg)`;
        node.style.opacity = opacity;
      });
    };
    
    scrollContainer.addEventListener('scroll', updateRoadmapCurve);
    window.addEventListener('resize', updateRoadmapCurve);
    
    // 🖱️ 마우스 드래그 스와이프 기능 활성화
    let isDown = false;
    let startX;
    let scrollLeft;
    
    scrollContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      scrollContainer.style.cursor = 'grabbing';
      startX = e.clientX;
      scrollLeft = scrollContainer.scrollLeft;
    });
    
    scrollContainer.addEventListener('mouseleave', () => {
      isDown = false;
      scrollContainer.style.cursor = 'grab';
    });
    
    scrollContainer.addEventListener('mouseup', () => {
      isDown = false;
      scrollContainer.style.cursor = 'grab';
    });
    
    scrollContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.clientX;
      const walk = (x - startX) * 1.5; // 스와이프 감도
      scrollContainer.scrollLeft = scrollLeft - walk;
    });
    
    // 첫 화면 렌더링 시 커브 갱신
    setTimeout(updateRoadmapCurve, 300);
  }

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
  // 스테이지 클릭 시 해당 레벨로 이동 (드래그 시 클릭 오작동 방지 처리)
  document.querySelectorAll('.island-node').forEach(node => {
    let startClickX = 0;
    let dragDist = 0;
    
    node.onmousedown = (e) => {
      startClickX = e.pageX;
    };
    node.onmouseup = (e) => {
      dragDist = Math.abs(e.pageX - startClickX);
    };
    
    node.onclick = () => {
      if (dragDist > 8) {
        // 드래그 스와이프 도중에 마우스 떼는 클릭은 무시
        return;
      }
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
      deselectFurnitureAdjustment();
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

  // 실시간 가구 미세조절기 버튼 이벤트 바인딩
  const bindAdjusterButton = (btnId, action) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.onclick = () => {
        if (!activeAdjustingFurnitureId) return;
        const transform = getFurnitureTransform(activeAdjustingFurnitureId);
        action(transform);
        renderMyRoom();
        saveUserData();
        
        // 버튼 클릭 피드백 틱 효과음
        playTone(500, 0.03, 'sine');
      };
    }
  };

  bindAdjusterButton('adj-up', (t) => t.y -= 2);
  bindAdjusterButton('adj-down', (t) => t.y += 2);
  bindAdjusterButton('adj-left', (t) => t.x -= 2);
  bindAdjusterButton('adj-right', (t) => t.x += 2);
  bindAdjusterButton('adj-size-up', (t) => t.scale = Math.min(2.5, t.scale + 0.08));
  bindAdjusterButton('adj-size-down', (t) => t.scale = Math.max(0.4, t.scale - 0.08));
  bindAdjusterButton('adj-rot-left', (t) => t.rotate = (t.rotate - 15) % 360);
  bindAdjusterButton('adj-rot-right', (t) => t.rotate = (t.rotate + 15) % 360);
  bindAdjusterButton('adj-reset', (t) => {
    const item = SHOP_ITEMS.find(x => x.id === activeAdjustingFurnitureId);
    const defaultX = item ? parseFloat(item.posX || '50') : 50;
    const defaultY = item ? parseFloat(item.posY || '50') : 50;
    t.x = defaultX;
    t.y = defaultY;
    t.scale = 1.0;
    t.rotate = 0;
    renderMyRoom();
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
