/* ==========================================================================
   로롱수학 문제 은행 (12개 스테이지)
   - 총 240문제 (스테이지별 20문제 × 12 스테이지)
   - 각 스테이지: concept 8문제 + apply 6문제 + think 6문제
   ========================================================================== */

const QUESTION_BANK = {
  // Stage 1: 4세초 (1~5 세기, 모양/크기 비교)
  1: {
    concept: [
      { id:'qb_S1_C1', questionText:'🍎는 모두 몇 개일까요?', visual:{type:'emoji',count:3,item:'🍎'}, options:['2','3','4'], correctAnswer:'3', hint:'하나, 둘, 셋! 세 개 있어요.' },
      { id:'qb_S1_C2', questionText:'🍌는 모두 몇 개일까요?', visual:{type:'emoji',count:4,item:'🍌'}, options:['3','4','5'], correctAnswer:'4', hint:'바나나를 하나씩 네 개 세어봐요!' },
      { id:'qb_S1_C3', questionText:'🍓는 모두 몇 개일까요?', visual:{type:'emoji',count:2,item:'🍓'}, options:['1','2','3'], correctAnswer:'2', hint:'딸기가 하나, 둘 두 개 있어요.' },
      { id:'qb_S1_C4', questionText:'🐱는 모두 몇 마리일까요?', visual:{type:'emoji',count:3,item:'🐱'}, options:['2','3','4'], correctAnswer:'3', hint:'야옹이 세 마리를 세어보세요.' },
      { id:'qb_S1_C5', questionText:'🚗는 모두 몇 대일까요?', visual:{type:'emoji',count:5,item:'🚗'}, options:['4','5','6'], correctAnswer:'5', hint:'자동차 다섯 대예요.' },
      { id:'qb_S1_C6', questionText:'가장 덩치가 큰 동물은 누구일까요?', visual:{type:'emoji_sizes',items:[{e:'🐹',s:1.4},{e:'🐘',s:3.5},{e:'🐥',s:1.6}]}, options:['🐹','🐘','🐥'], correctAnswer:'🐘', hint:'코끼리 🐘가 제일 크답니다!' },
      { id:'qb_S1_C7', questionText:'가장 작은 동물은 누구일까요?', visual:{type:'emoji_sizes',items:[{e:'🐻',s:2.8},{e:'🐁',s:1.2},{e:'🐕',s:2.2}]}, options:['🐻','🐁','🐕'], correctAnswer:'🐁', hint:'생쥐 🐁가 가장 작아요.' },
      { id:'qb_S1_C8', questionText:'모양이 혼자 다른 것은 무엇일까요?', visual:{type:'emoji_diff',items:['🍎','🍎','🍇','🍎']}, options:['🍎','🍇','🍓'], correctAnswer:'🍇', hint:'빨간 사과들 속에 보라색 포도가 숨어 있어요!' }
    ],
    apply: [
      { id:'qb_S1_A1', questionText:'다람쥐에게 도토리를 3개 주려고 해요. 도토리 3개가 있는 카드를 골라보세요!', visual:{type:'emoji',count:3,item:'🌰'}, options:['🌰🌰','🌰🌰🌰','🌰🌰🌰🌰'], correctAnswer:'🌰🌰🌰', hint:'도토리가 세 개 그려진 카드를 찾으세요.' },
      { id:'qb_S1_A2', questionText:'토끼에게 당근을 2개 먹이려고 해요. 당근 2개를 골라주세요!', visual:{type:'emoji',count:2,item:'🥕'}, options:['🥕','🥕🥕','🥕🥕🥕'], correctAnswer:'🥕🥕', hint:'당근 두 개를 찾아보세요.' },
      { id:'qb_S1_A3', questionText:'곰돌이에게 꿀 4개를 가져다주세요! 꿀 4개가 있는 상자는?', visual:{type:'emoji',count:4,item:'🍯'}, options:['🍯🍯🍯','🍯🍯🍯🍯','🍯🍯🍯🍯🍯'], correctAnswer:'🍯🍯🍯🍯', hint:'꿀단지를 네 개 세어보세요!' },
      { id:'qb_S1_A4', questionText:'접시에 사과가 3개 있어요. 그림과 똑같은 개수는?', visual:{type:'emoji',count:3,item:'🍎'}, options:['2개','3개','4개'], correctAnswer:'3개', hint:'사과 세 개를 골라보세요.' },
      { id:'qb_S1_A5', questionText:'꽃밭에 나비 2마리가 날아다녀요. 나비 2마리는 어느 것일까요?', visual:{type:'emoji',count:2,item:'🦋'}, options:['1마리','2마리','3마리'], correctAnswer:'2마리', hint:'나비가 두 마리 있어요.' },
      { id:'qb_S1_A6', questionText:'강아지에게 뼈다귀를 5개 주려 해요. 5개가 있는 상자는?', visual:{type:'emoji',count:5,item:'🦴'}, options:['🦴🦴🦴🦴','🦴🦴🦴🦴🦴','🦴🦴🦴🦴🦴🦴'], correctAnswer:'🦴🦴🦴🦴🦴', hint:'뼈다귀 다섯 개를 잘 세어봐요.' }
    ],
    think: [
      { id:'qb_S1_T1', questionText:'어떤 그림이 빈칸 ?에 들어갈까요? [🍎, 🍊, 🍎, 🍊, ?]', visual:{type:'pattern',items:['🍎','🍊','🍎','🍊','?']}, options:['🍎','🍊','🍇'], correctAnswer:'🍎', hint:'사과와 오렌지가 번갈아 나와요.' },
      { id:'qb_S1_T2', questionText:'어떤 그림이 빈칸 ?에 들어갈까요? [🌸, 🌻, 🌸, 🌻, ?]', visual:{type:'pattern',items:['🌸','🌻','🌸','🌻','?']}, options:['🌸','🌻','🌹'], correctAnswer:'🌸', hint:'분홍꽃과 노란 해바라기가 번갈아 나와요.' },
      { id:'qb_S1_T3', questionText:'어떤 그림이 빈칸 ?에 들어갈까요? [🍅, 🍅, 🥦, 🍅, 🍅, ?]', visual:{type:'pattern',items:['🍅','🍅','🥦','🍅','🍅','?']}, options:['🍅','🥦','🌽'], correctAnswer:'🥦', hint:'토마토 두 번 다음에 브로콜리가 나와요.' },
      { id:'qb_S1_T4', questionText:'어떤 그림이 빈칸 ?에 들어갈까요? [⭐, 🌙, ⭐, 🌙, ?]', visual:{type:'pattern',items:['⭐','🌙','⭐','🌙','?']}, options:['⭐','🌙','☀️'], correctAnswer:'⭐', hint:'별과 달이 번갈아 나타나요.' },
      { id:'qb_S1_T5', questionText:'어떤 그림이 빈칸 ?에 들어갈까요? [🔴, 🔵, 🔴, 🔵, ?]', visual:{type:'pattern',items:['🔴','🔵','🔴','🔵','?']}, options:['🔴','🔵','🟡'], correctAnswer:'🔴', hint:'빨강과 파랑이 반복되고 있어요.' },
      { id:'qb_S1_T6', questionText:'어떤 그림이 빈칸 ?에 들어갈까요? [🐱, 🐶, 🐱, 🐶, ?]', visual:{type:'pattern',items:['🐱','🐶','🐱','🐶','?']}, options:['🐱','🐶','🐰'], correctAnswer:'🐱', hint:'고양이와 강아지가 번갈아 나와요.' }
    ]
  },

  // Stage 2: 4세심 (5~10 세기, 하나 더 많은/적은 수, 많고 적음 비교)
  2: {
    concept: [
      { id:'qb_S2_C1', questionText:'🐰는 모두 몇 마리일까요?', visual:{type:'emoji',count:7,item:'🐰'}, options:['6','7','8'], correctAnswer:'7', hint:'토끼 일곱 마리를 세어보세요.' },
      { id:'qb_S2_C2', questionText:'🍊는 모두 몇 개일까요?', visual:{type:'emoji',count:8,item:'🍊'}, options:['7','8','9'], correctAnswer:'8', hint:'귤 여덟 개가 있어요.' },
      { id:'qb_S2_C3', questionText:'🐼는 모두 몇 마리일까요?', visual:{type:'emoji',count:6,item:'🐼'}, options:['5','6','7'], correctAnswer:'6', hint:'판다 여섯 마리를 세어보세요.' },
      { id:'qb_S2_C4', questionText:'🦊는 모두 몇 마리일까요?', visual:{type:'emoji',count:9,item:'🦊'}, options:['8','9','10'], correctAnswer:'9', hint:'여우 아홉 마리를 세어봐요.' },
      { id:'qb_S2_C5', questionText:'빨간 상자 🔴와 파란 상자 🔵 중 별이 더 많이 들어있는 곳은?', visual:{type:'math',formula:'🔴 ⭐⭐⭐⭐⭐⭐  |  🔵 ⭐⭐⭐⭐'}, options:['🔴','🔵'], correctAnswer:'🔴', hint:'빨간 상자는 6개, 파란 상자는 4개예요.' },
      { id:'qb_S2_C6', questionText:'어느 쪽에 구슬이 더 많을까요?', visual:{type:'math',formula:'왼쪽 🔵🔵🔵  |  오른쪽 🔵🔵🔵🔵🔵'}, options:['왼쪽','오른쪽'], correctAnswer:'오른쪽', hint:'다섯 개가 세 개보다 많아요.' },
      { id:'qb_S2_C7', questionText:'🍇는 모두 몇 송이일까요?', visual:{type:'emoji',count:7,item:'🍇'}, options:['6','7','8'], correctAnswer:'7', hint:'포도 일곱 송이예요.' },
      { id:'qb_S2_C8', questionText:'🎈는 모두 몇 개일까요?', visual:{type:'emoji',count:6,item:'🎈'}, options:['5','6','7'], correctAnswer:'6', hint:'풍선 여섯 개예요.' }
    ],
    apply: [
      { id:'qb_S2_A1', questionText:'쿠키 5개보다 1개 더 많은 개수는 몇 개일까요?', visual:{type:'emoji',count:5,item:'🍪'}, options:['4','5','6'], correctAnswer:'6', hint:'5 다음 숫자는 6이에요.' },
      { id:'qb_S2_A2', questionText:'사탕 6개보다 1개 더 적은 개수는 몇 개일까요?', visual:{type:'emoji',count:6,item:'🍭'}, options:['5','6','7'], correctAnswer:'5', hint:'6 바로 앞의 숫자는 5예요.' },
      { id:'qb_S2_A3', questionText:'바구니에 참외가 7개 들어있어요. 이 중 1개를 꺼내 먹으면 남은 참외는?', visual:{type:'emoji',count:7,item:'🍈'}, options:['6','7','8'], correctAnswer:'6', hint:'7보다 1 적은 수예요.' },
      { id:'qb_S2_A4', questionText:'꽃이 4송이 피어있었는데, 1송이가 더 피었어요. 모두 몇 송이가 되었을까요?', visual:{type:'emoji',count:4,item:'🌹'}, options:['3','4','5'], correctAnswer:'5', hint:'4보다 1 큰 수예요.' },
      { id:'qb_S2_A5', questionText:'도토리 8개보다 하나 더 적은 개수는 몇 개일까요?', visual:{type:'emoji',count:8,item:'🌰'}, options:['7','8','9'], correctAnswer:'7', hint:'8에서 1을 뺀 수예요.' },
      { id:'qb_S2_A6', questionText:'나비 6마리보다 한 마리 더 많은 개수는 몇 마리일까요?', visual:{type:'emoji',count:6,item:'🦋'}, options:['5마리','6마리','7마리'], correctAnswer:'7마리', hint:'6보다 1 큰 수예요.' }
    ],
    think: [
      { id:'qb_S2_T1', questionText:'빈칸 ?에 들어갈 야채는 무엇일까요? [🥕, 🍅, 🍅, 🥕, 🍅, ?]', visual:{type:'pattern',items:['🥕','🍅','🍅','🥕','🍅','?']}, options:['🥕','🍅','🥦'], correctAnswer:'🍅', hint:'당근 하나, 토마토 둘이 반복돼요.' },
      { id:'qb_S2_T2', questionText:'사과를 가장 많이 가진 동물을 골라보세요.', visual:{type:'math',formula:'🐻 🍎  |  🐰 🍎🍎🍎  |  🐱 🍎🍎'}, options:['🐻','🐰','🐱'], correctAnswer:'🐰', hint:'토끼 🐰가 사과 3개로 제일 많아요.' },
      { id:'qb_S2_T3', questionText:'빈칸 ?에 들어갈 것은 무엇일까요? [🔵, 🔵, 🔴, 🔵, 🔵, ?]', visual:{type:'pattern',items:['🔵','🔵','🔴','🔵','🔵','?']}, options:['🔵','🔴','🟡'], correctAnswer:'🔴', hint:'파란 구슬 둘 다음에 빨간 구슬이 나와요.' },
      { id:'qb_S2_T4', questionText:'별을 가장 적게 모은 친구는 누구일까요?', visual:{type:'math',formula:'민수 ⭐⭐⭐⭐  |  지유 ⭐⭐  |  서준 ⭐⭐⭐'}, options:['민수','지유','서준'], correctAnswer:'지유', hint:'지유가 별 2개로 제일 적어요.' },
      { id:'qb_S2_T5', questionText:'빈칸 ?에 들어갈 과일은 무엇일까요? [🍌, 🍎, 🍎, 🍌, 🍎, ?]', visual:{type:'pattern',items:['🍌','🍎','🍎','🍌','🍎','?']}, options:['🍌','🍎','🍉'], correctAnswer:'🍎', hint:'바나나 하나, 사과 둘이 반복돼요.' },
      { id:'qb_S2_T6', questionText:'가장 많은 잎새를 가진 나무는 무엇일까요?', visual:{type:'math',formula:'나무A 🍃🍃🍃🍃  |  나무B 🍃🍃🍃  |  나무C 🍃🍃🍃🍃🍃'}, options:['나무A','나무B','나무C'], correctAnswer:'나무C', hint:'나무C가 5개로 제일 많아요.' }
    ]
  },

  // Stage 3: 5세초 (10 이내 모으기, 가르기)
  3: {
    concept: [
      { id:'qb_S3_C1', questionText:'3과 4를 모으면 얼마가 될까요?', visual:{type:'math',formula:'3 ⊕ 4 = ?'}, options:['6','7','8'], correctAnswer:'7', hint:'3 더하기 4와 같아요.' },
      { id:'qb_S3_C2', questionText:'5와 3을 모으면 얼마가 될까요?', visual:{type:'math',formula:'5 ⊕ 3 = ?'}, options:['7','8','9'], correctAnswer:'8', hint:'5에 3을 더해보세요.' },
      { id:'qb_S3_C3', questionText:'2와 6을 모으면 얼마가 될까요?', visual:{type:'math',formula:'2 ⊕ 6 = ?'}, options:['7','8','9'], correctAnswer:'8', hint:'2에 6을 보태면 8이 돼요.' },
      { id:'qb_S3_C4', questionText:'4와 4를 모으면 얼마가 될까요?', visual:{type:'math',formula:'4 ⊕ 4 = ?'}, options:['7','8','9'], correctAnswer:'8', hint:'네 개씩 두 번 모아요.' },
      { id:'qb_S3_C5', questionText:'숫자 7을 3과 다른 숫자로 가르면, 다른 숫자는 무엇일까요?', visual:{type:'math',formula:'7 ➔ 3 와 ?'}, options:['3','4','5'], correctAnswer:'4', hint:'7은 3과 4로 나눌 수 있어요.' },
      { id:'qb_S3_C6', questionText:'숫자 9를 5와 다른 숫자로 가르면, 다른 숫자는 무엇일까요?', visual:{type:'math',formula:'9 ➔ 5 와 ?'}, options:['3','4','5'], correctAnswer:'4', hint:'9에서 5를 뺀 수예요.' },
      { id:'qb_S3_C7', questionText:'숫자 8을 3과 다른 숫자로 가르면, 다른 숫자는 무엇일까요?', visual:{type:'math',formula:'8 ➔ 3 와 ?'}, options:['4','5','6'], correctAnswer:'5', hint:'8은 3과 5로 갈라져요.' },
      { id:'qb_S3_C8', questionText:'숫자 6을 4와 다른 숫자로 가르면, 다른 숫자는 무엇일까요?', visual:{type:'math',formula:'6 ➔ 4 와 ?'}, options:['1','2','3'], correctAnswer:'2', hint:'6에서 4를 빼면 남는 수예요.' }
    ],
    apply: [
      { id:'qb_S3_A1', questionText:'사과 4개와 오렌지 3개를 한 바구니에 모으면 모두 몇 개일까요?', visual:{type:'math',formula:'4 + 3 = ?'}, options:['6개','7개','8개'], correctAnswer:'7개', hint:'4와 3을 더해요.' },
      { id:'qb_S3_A2', questionText:'놀이터에 어린이 5명이 놀고 있었는데, 2명이 더 왔어요. 모으면 모두 몇 명일까요?', visual:{type:'math',formula:'5 + 2 = ?'}, options:['6명','7명','8명'], correctAnswer:'7명', hint:'5에 2를 더해보세요.' },
      { id:'qb_S3_A3', questionText:'다람쥐가 도토리 8개를 가지고 있다가 3개와 나머지로 갈라 친구에게 주려 해요. 나머지는 몇 개일까요?', visual:{type:'math',formula:'8 ➔ 3 와 ?'}, options:['4개','5개','6개'], correctAnswer:'5개', hint:'8에서 3을 빼 보아요.' },
      { id:'qb_S3_A4', questionText:'초코칩 쿠키 6개를 동생에게 2개 주고 나머지는 내가 먹으려 해요. 내 몫은 몇 개일까요?', visual:{type:'math',formula:'6 ➔ 2 와 ?'}, options:['3개','4개','5개'], correctAnswer:'4개', hint:'6은 2와 4로 가를 수 있어요.' },
      { id:'qb_S3_A5', questionText:'나비 3마리와 잠자리 5마리를 모으면 곤충은 모두 몇 마리일까요?', visual:{type:'math',formula:'3 + 5 = ?'}, options:['7마리','8마리','9마리'], correctAnswer:'8마리', hint:'3과 5를 합하면 얼마일까요?' },
      { id:'qb_S3_A6', questionText:'꽃 9송이를 빨간 화분에 4송이 꽂고 나머지는 파란 화분에 꽂았어요. 파란 화분에는 몇 송이가 있을까요?', visual:{type:'math',formula:'9 ➔ 4 와 ?'}, options:['4송이','5송이','6송이'], correctAnswer:'5송이', hint:'9에서 4를 뺀 수예요.' }
    ],
    think: [
      { id:'qb_S3_T1', questionText:'숫자 10을 만들기 위해 7에 모아야 할 숫자는 무엇일까요?', visual:{type:'math',formula:'7 + ? = 10'}, options:['2','3','4'], correctAnswer:'3', hint:'7과 3을 모으면 10이 돼요.' },
      { id:'qb_S3_T2', questionText:'숫자 10을 4와 가르기 하면, 다른 숫자는 무엇일까요?', visual:{type:'math',formula:'10 ➔ 4 와 ?'}, options:['5','6','7'], correctAnswer:'6', hint:'10에서 4를 빼보세요.' },
      { id:'qb_S3_T3', questionText:'도토리 10개 중 8개를 다람쥐가 먹었어요. 남은 도토리는 몇 개일까요?', visual:{type:'math',formula:'10 - 8 = ?'}, options:['2개','3개','4개'], correctAnswer:'2개', hint:'10을 8과 2로 가를 수 있어요.' },
      { id:'qb_S3_T4', questionText:'숫자 10을 만들기 위해 5에 모아야 할 숫자는 무엇일까요?', visual:{type:'math',formula:'5 + ? = 10'}, options:['4','5','6'], correctAnswer:'5', hint:'5에 5를 더하면 10이 돼요.' },
      { id:'qb_S3_T5', questionText:'숫자 10을 2와 가르기 하면, 다른 숫자는 무엇일까요?', visual:{type:'math',formula:'10 ➔ 2 와 ?'}, options:['7','8','9'], correctAnswer:'8', hint:'10에서 2를 빼면 얼마일까요?' },
      { id:'qb_S3_T6', questionText:'숫자 10을 만들기 위해 1에 모아야 할 숫자는 무엇일까요?', visual:{type:'math',formula:'1 + ? = 10'}, options:['8','9','10'], correctAnswer:'9', hint:'1에 9를 더하면 10이 완성돼요.' }
    ]
  },

  // Stage 4: 5세심 (10 이내 뺄셈, 시계 읽기)
  4: {
    concept: [
      { id:'qb_S4_C1', questionText:'뺄셈을 해보세요. 6 - 2 = ?', visual:{type:'math',formula:'6 - 2 = ?'}, options:['3','4','5'], correctAnswer:'4', hint:'6에서 2를 빼보세요.' },
      { id:'qb_S4_C2', questionText:'뺄셈을 해보세요. 8 - 3 = ?', visual:{type:'math',formula:'8 - 3 = ?'}, options:['4','5','6'], correctAnswer:'5', hint:'8에서 3을 빼면 얼마일까요?' },
      { id:'qb_S4_C3', questionText:'뺄셈을 해보세요. 5 - 4 = ?', visual:{type:'math',formula:'5 - 4 = ?'}, options:['1','2','3'], correctAnswer:'1', hint:'5개 중에 4개를 지워보세요.' },
      { id:'qb_S4_C4', questionText:'뺄셈을 해보세요. 7 - 5 = ?', visual:{type:'math',formula:'7 - 5 = ?'}, options:['2','3','4'], correctAnswer:'2', hint:'7에서 5를 빼보아요.' },
      { id:'qb_S4_C5', questionText:'뺄셈을 해보세요. 9 - 4 = ?', visual:{type:'math',formula:'9 - 4 = ?'}, options:['4','5','6'], correctAnswer:'5', hint:'9에서 4를 빼면 5가 남아요.' },
      { id:'qb_S4_C6', questionText:'뺄셈을 해보세요. 10 - 3 = ?', visual:{type:'math',formula:'10 - 3 = ?'}, options:['6','7','8'], correctAnswer:'7', hint:'10에서 3을 뺀 수예요.' },
      { id:'qb_S4_C7', questionText:'뺄셈을 해보세요. 8 - 5 = ?', visual:{type:'math',formula:'8 - 5 = ?'}, options:['2','3','4'], correctAnswer:'3', hint:'8에서 5를 빼 보세요.' },
      { id:'qb_S4_C8', questionText:'뺄셈을 해보세요. 9 - 7 = ?', visual:{type:'math',formula:'9 - 7 = ?'}, options:['2','3','4'], correctAnswer:'2', hint:'9에서 7을 빼면 2가 남아요.' }
    ],
    apply: [
      { id:'qb_S4_A1', questionText:'시계가 가리키는 시각은 몇 시일까요?', visual:{type:'clock',hour:3,minute:0}, options:['2시','3시','4시'], correctAnswer:'3시', hint:'짧은 바늘이 3을 가리키고 있어요.' },
      { id:'qb_S4_A2', questionText:'시계가 가리키는 시각은 몇 시일까요?', visual:{type:'clock',hour:7,minute:0}, options:['6시','7시','8시'], correctAnswer:'7시', hint:'짧은 바늘이 7을 가리켜요.' },
      { id:'qb_S4_A3', questionText:'시계가 가리키는 시각은 몇 시 몇 분일까요?', visual:{type:'clock',hour:4,minute:30}, options:['4시','4시 반(30분)','5시'], correctAnswer:'4시 반(30분)', hint:'긴 바늘이 6을 가리키면 30분이에요.' },
      { id:'qb_S4_A4', questionText:'시계가 가리키는 시각은 몇 시일까요?', visual:{type:'clock',hour:10,minute:0}, options:['9시','10시','11시'], correctAnswer:'10시', hint:'짧은 바늘이 10을 가리켜요.' },
      { id:'qb_S4_A5', questionText:'시계가 가리키는 시각은 몇 시 몇 분일까요?', visual:{type:'clock',hour:1,minute:30}, options:['1시','1시 반(30분)','2시 반(30분)'], correctAnswer:'1시 반(30분)', hint:'짧은 바늘이 1과 2 사이에 있어요.' },
      { id:'qb_S4_A6', questionText:'시계가 가리키는 시각은 몇 시일까요?', visual:{type:'clock',hour:5,minute:0}, options:['4시','5시','6시'], correctAnswer:'5시', hint:'짧은 바늘이 5, 긴 바늘이 12예요.' }
    ],
    think: [
      { id:'qb_S4_T1', questionText:'다람쥐가 도토리를 10개 가지고 있다가 4개를 먹었어요. 남은 도토리는 몇 개일까요?', visual:{type:'math',formula:'10 - 4 = ?'}, options:['5','6','7'], correctAnswer:'6', hint:'10에서 4를 빼 보아요.' },
      { id:'qb_S4_T2', questionText:'새가 3마리 나뭇가지에 앉아 있어요. 새 다리는 모두 몇 개일까요?', visual:{type:'emoji',count:3,item:'🐦'}, options:['4개','6개','8개'], correctAnswer:'6개', hint:'새 한 마리당 다리가 2개씩이에요.' },
      { id:'qb_S4_T3', questionText:'고양이가 2마리 걸어가고 있어요. 고양이 다리는 모두 몇 개일까요?', visual:{type:'emoji',count:2,item:'🐱'}, options:['6개','8개','10개'], correctAnswer:'8개', hint:'고양이 한 마리당 다리가 4개씩이에요.' },
      { id:'qb_S4_T4', questionText:'쿠키 9개 중 5개를 지연이가 먹었어요. 남은 쿠키는 몇 개일까요?', visual:{type:'math',formula:'9 - 5 = ?'}, options:['3개','4개','5개'], correctAnswer:'4개', hint:'9에서 5를 뺀 수예요.' },
      { id:'qb_S4_T5', questionText:'자전거가 3대 있어요. 자전거 바퀴는 모두 몇 개일까요?', visual:{type:'emoji',count:3,item:'🚲'}, options:['4개','6개','8개'], correctAnswer:'6개', hint:'자전거 바퀴는 한 대당 2개씩 있어요.' },
      { id:'qb_S4_T6', questionText:'어항에 물고기가 10마리 있었는데 7마리를 다른 어항으로 옮겼어요. 남은 물고기는?', visual:{type:'math',formula:'10 - 7 = ?'}, options:['2마리','3마리','4마리'], correctAnswer:'3마리', hint:'10에서 7을 빼면 얼마일까요?' }
    ]
  },

  // Stage 5: 6세초 (20 이내 덧셈, 10을 가르는 수 연계)
  5: {
    concept: [
      { id:'qb_S5_C1', questionText:'덧셈을 계산해 보세요. 8 + 4 = ?', visual:{type:'math',formula:'8 + 4 = ?'}, options:['11','12','13'], correctAnswer:'12', hint:'8에 2를 더해 10을 만들고 나머지 2를 더해요.' },
      { id:'qb_S5_C2', questionText:'덧셈을 계산해 보세요. 9 + 3 = ?', visual:{type:'math',formula:'9 + 3 = ?'}, options:['11','12','13'], correctAnswer:'12', hint:'9에 1을 더해 10을 만들고 2를 더해요.' },
      { id:'qb_S5_C3', questionText:'덧셈을 계산해 보세요. 7 + 5 = ?', visual:{type:'math',formula:'7 + 5 = ?'}, options:['11','12','13'], correctAnswer:'12', hint:'7과 3을 모아 10을 만들고 2를 보태요.' },
      { id:'qb_S5_C4', questionText:'덧셈을 계산해 보세요. 8 + 6 = ?', visual:{type:'math',formula:'8 + 6 = ?'}, options:['13','14','15'], correctAnswer:'14', hint:'8에 2를 채워 10이 되고 4를 더해요.' },
      { id:'qb_S5_C5', questionText:'덧셈을 계산해 보세요. 9 + 5 = ?', visual:{type:'math',formula:'9 + 5 = ?'}, options:['13','14','15'], correctAnswer:'14', hint:'9에 1을 줘서 10이 되면 4가 남아 14가 돼요.' },
      { id:'qb_S5_C6', questionText:'덧셈을 계산해 보세요. 6 + 5 = ?', visual:{type:'math',formula:'6 + 5 = ?'}, options:['10','11','12'], correctAnswer:'11', hint:'6에 4를 채워 10을 만들고 1을 더해요.' },
      { id:'qb_S5_C7', questionText:'덧셈을 계산해 보세요. 7 + 7 = ?', visual:{type:'math',formula:'7 + 7 = ?'}, options:['13','14','15'], correctAnswer:'14', hint:'7에 3을 빌려 10을 만들고 4를 더해요.' },
      { id:'qb_S5_C8', questionText:'덧셈을 계산해 보세요. 8 + 7 = ?', visual:{type:'math',formula:'8 + 7 = ?'}, options:['14','15','16'], correctAnswer:'15', hint:'8에 2를 빌려 10을 만들고 5를 더해요.' }
    ],
    apply: [
      { id:'qb_S5_A1', questionText:'빨간 사과가 9개, 초록 사과가 4개 있습니다. 사과는 모두 몇 개일까요?', visual:{type:'math',formula:'9 + 4 = ?'}, options:['12개','13개','14개'], correctAnswer:'13개', hint:'9 더하기 4를 계산해 보세요.' },
      { id:'qb_S5_A2', questionText:'하늘이가 쿠키를 아침에 8개 먹었고 점심에 5개 더 먹었어요. 모두 몇 개를 먹었을까요?', visual:{type:'math',formula:'8 + 5 = ?'}, options:['12개','13개','14개'], correctAnswer:'13개', hint:'8에 5를 더해요.' },
      { id:'qb_S5_A3', questionText:'화단에 튤립이 7송이 피어 있었는데 장미 6송이를 더 심었어요. 꽃은 모두 몇 송이가 될까요?', visual:{type:'math',formula:'7 + 6 = ?'}, options:['12송이','13송이','14송이'], correctAnswer:'13송이', hint:'7과 6을 더해보세요.' },
      { id:'qb_S5_A4', questionText:'다람쥐가 도토리를 왼손에 9개, 오른손에 6개 쥐고 있어요. 모두 몇 개일까요?', visual:{type:'math',formula:'9 + 6 = ?'}, options:['14개','15개','16개'], correctAnswer:'15개', hint:'9와 6을 더해보세요.' },
      { id:'qb_S5_A5', questionText:'버스에 손님이 8명 타고 있었는데 다음 정류장에서 5명이 더 탔어요. 지금 버스에는 몇 명이 있을까요?', visual:{type:'math',formula:'8 + 5 = ?'}, options:['12명','13명','14명'], correctAnswer:'13명', hint:'8 더하기 5는 얼마일까요?' },
      { id:'qb_S5_A6', questionText:'놀이터에 비둘기가 9마리 모여 있다가 7마리가 더 날아왔어요. 모두 몇 마리가 되었을까요?', visual:{type:'math',formula:'9 + 7 = ?'}, options:['15마리','16마리','17마리'], correctAnswer:'16마리', hint:'9에 7을 더해 보아요.' }
    ],
    think: [
      { id:'qb_S5_T1', questionText:'어떤 수에 8을 더하면 13이 될까요?', visual:{type:'math',formula:'? + 8 = 13'}, options:['4','5','6'], correctAnswer:'5', hint:'13에서 8을 거꾸로 빼 보아요.' },
      { id:'qb_S5_T2', questionText:'어떤 수에 9를 더하면 15가 될까요?', visual:{type:'math',formula:'? + 9 = 15'}, options:['5','6','7'], correctAnswer:'6', hint:'15에서 9를 빼 보세요.' },
      { id:'qb_S5_T3', questionText:'상자 두 개가 있어요. 두 상자에 든 공을 모두 합치면 12개가 되는 조합을 고르세요.', visual:{type:'math',formula:'A상자(7개), B상자(4개), C상자(5개)'}, options:['A와 B','A와 C','B와 C'], correctAnswer:'A와 C', hint:'7 더하기 5가 12가 되는지 확인해 보세요.' },
      { id:'qb_S5_T4', questionText:'어떤 수에 7을 더하면 11이 될까요?', visual:{type:'math',formula:'? + 7 = 11'}, options:['3','4','5'], correctAnswer:'4', hint:'11에서 7을 빼면 4예요.' },
      { id:'qb_S5_T5', questionText:'합이 가장 큰 덧셈식을 골라보세요.', visual:{type:'math',formula:'① 8+5  |  ② 9+3  |  ③ 7+7'}, options:['① 8+5','② 9+3','③ 7+7'], correctAnswer:'③ 7+7', hint:'각각 더해보면 ①은 13, ②는 12, ③은 14예요.' },
      { id:'qb_S5_T6', questionText:'어떤 수에 6을 더하면 14가 될까요?', visual:{type:'math',formula:'? + 6 = 14'}, options:['7','8','9'], correctAnswer:'8', hint:'14에서 6을 빼면 8이 돼요.' }
    ]
  },

  // Stage 6: 6세심 (20 이내 뺄셈, 받아내림 활용)
  6: {
    concept: [
      { id:'qb_S6_C1', questionText:'뺄셈을 계산해 보세요. 12 - 4 = ?', visual:{type:'math',formula:'12 - 4 = ?'}, options:['7','8','9'], correctAnswer:'8', hint:'10에서 4를 빼고 남은 6에 2를 더해요.' },
      { id:'qb_S6_C2', questionText:'뺄셈을 계산해 보세요. 11 - 5 = ?', visual:{type:'math',formula:'11 - 5 = ?'}, options:['5','6','7'], correctAnswer:'6', hint:'10에서 5를 빼고 1을 더해요.' },
      { id:'qb_S6_C3', questionText:'뺄셈을 계산해 보세요. 13 - 6 = ?', visual:{type:'math',formula:'13 - 6 = ?'}, options:['6','7','8'], correctAnswer:'7', hint:'10에서 6을 빼고 3을 더해요.' },
      { id:'qb_S6_C4', questionText:'뺄셈을 계산해 보세요. 14 - 7 = ?', visual:{type:'math',formula:'14 - 7 = ?'}, options:['6','7','8'], correctAnswer:'7', hint:'14에서 4를 먼저 빼고 3을 더 빼요.' },
      { id:'qb_S6_C5', questionText:'뺄셈을 계산해 보세요. 15 - 8 = ?', visual:{type:'math',formula:'15 - 8 = ?'}, options:['6','7','8'], correctAnswer:'7', hint:'10에서 8을 빼면 2이고, 5를 더해요.' },
      { id:'qb_S6_C6', questionText:'뺄셈을 계산해 보세요. 16 - 9 = ?', visual:{type:'math',formula:'16 - 9 = ?'}, options:['6','7','8'], correctAnswer:'7', hint:'10에서 9를 빼면 1이고, 6을 더해요.' },
      { id:'qb_S6_C7', questionText:'뺄셈을 계산해 보세요. 17 - 8 = ?', visual:{type:'math',formula:'17 - 8 = ?'}, options:['8','9','10'], correctAnswer:'9', hint:'17에서 7을 빼면 10이고, 1을 더 빼요.' },
      { id:'qb_S6_C8', questionText:'뺄셈을 계산해 보세요. 15 - 6 = ?', visual:{type:'math',formula:'15 - 6 = ?'}, options:['8','9','10'], correctAnswer:'9', hint:'10에서 6을 빼면 4이고, 5를 더해요.' }
    ],
    apply: [
      { id:'qb_S6_A1', questionText:'도넛이 13개 있었는데 5개를 먹어 치웠어요. 남은 도넛은 몇 개일까요?', visual:{type:'math',formula:'13 - 5 = ?'}, options:['7개','8개','9개'], correctAnswer:'8개', hint:'13에서 5를 빼 보세요.' },
      { id:'qb_S6_A2', questionText:'철수는 풍선을 11개 샀는데 그중 4개가 하늘로 날아갔어요. 철수에게 남은 풍선은 몇 개일까요?', visual:{type:'math',formula:'11 - 4 = ?'}, options:['6개','7개','8개'], correctAnswer:'7개', hint:'11에서 4를 빼요.' },
      { id:'qb_S6_A3', questionText:'바구니에 귤이 15개 들어있었어요. 이 중 상한 귤 7개를 버렸다면 먹을 수 있는 좋은 귤은 몇 개일까요?', visual:{type:'math',formula:'15 - 7 = ?'}, options:['7개','8개','9개'], correctAnswer:'8개', hint:'15에서 7을 빼주세요.' },
      { id:'qb_S6_A4', questionText:'학용품점에 지우개가 14개 있었는데 친구들이 6개를 사 갔어요. 남은 지우개는 몇 개일까요?', visual:{type:'math',formula:'14 - 6 = ?'}, options:['7개','8개','9개'], correctAnswer:'8개', hint:'14에서 6을 빼 보아요.' },
      { id:'qb_S6_A5', questionText:'새가 나뭇가지에 12마리 앉아 있었는데 8마리가 날아갔어요. 나뭇가지에 남은 새는 몇 마리일까요?', visual:{type:'math',formula:'12 - 8 = ?'}, options:['3마리','4마리','5마리'], correctAnswer:'4마리', hint:'12에서 8을 뺍니다.' },
      { id:'qb_S6_A6', questionText:'주차장에 자동차가 16대 주차되어 있었는데 7대가 나갔어요. 지금 주차장에는 몇 대가 남아 있을까요?', visual:{type:'math',formula:'16 - 7 = ?'}, options:['8대','9대','10대'], correctAnswer:'9대', hint:'16에서 7을 뺀 수예요.' }
    ],
    think: [
      { id:'qb_S6_T1', questionText:'어떤 수에서 6을 빼면 7이 남을까요?', visual:{type:'math',formula:'? - 6 = 7'}, options:['11','12','13'], correctAnswer:'13', hint:'거꾸로 7과 6을 더해 보세요.' },
      { id:'qb_S6_T2', questionText:'어떤 수에서 8을 빼면 5가 남을까요?', visual:{type:'math',formula:'? - 8 = 5'}, options:['12','13','14'], correctAnswer:'13', hint:'5에 8을 더하면 처음의 수가 돼요.' },
      { id:'qb_S6_T3', questionText:'식이 바른 계산을 하고 있는 것을 골라보세요.', visual:{type:'math',formula:'① 12-5=8  |  ② 15-9=6  |  ③ 14-8=5'}, options:['①','②','③'], correctAnswer:'②', hint:'각 식을 계산하면 15-9=6이 올바릅니다.' },
      { id:'qb_S6_T4', questionText:'어떤 수에서 7을 빼면 9가 남을까요?', visual:{type:'math',formula:'? - 7 = 9'}, options:['15','16','17'], correctAnswer:'16', hint:'9와 7을 더해 보세요.' },
      { id:'qb_S6_T5', questionText:'계산 결과가 가장 작은 식을 고르세요.', visual:{type:'math',formula:'① 13-5  |  ② 14-7  |  ③ 11-3'}, options:['① 13-5','② 14-7','③ 11-3'], correctAnswer:'② 14-7', hint:'①은 8, ②는 7, ③은 8이에요.' },
      { id:'qb_S6_T6', questionText:'어떤 수에서 9를 빼면 4가 남을까요?', visual:{type:'math',formula:'? - 9 = 4'}, options:['12','13','14'], correctAnswer:'13', hint:'4와 9를 더해 보세요.' }
    ]
  },

  // Stage 7: 7세초 (50 이내 덧뺄셈, 시계 분 단위)
  7: {
    concept: [
      { id:'qb_S7_C1', questionText:'덧셈을 계산해 보세요. 22 + 15 = ?', visual:{type:'math',formula:'22 + 15 = ?'}, options:['35','37','39'], correctAnswer:'37', hint:'십의 자리는 20+10=30, 일의 자리는 2+5=7이에요.' },
      { id:'qb_S7_C2', questionText:'뺄셈을 계산해 보세요. 35 - 12 = ?', visual:{type:'math',formula:'35 - 12 = ?'}, options:['21','23','25'], correctAnswer:'23', hint:'십의 자리 30-10=20, 일의 자리 5-2=3이에요.' },
      { id:'qb_S7_C3', questionText:'덧셈을 계산해 보세요. 18 + 24 = ?', visual:{type:'math',formula:'18 + 24 = ?'}, options:['40','42','44'], correctAnswer:'42', hint:'일의 자리 8+4=12에서 받아올림을 해요.' },
      { id:'qb_S7_C4', questionText:'뺄셈을 계산해 보세요. 42 - 18 = ?', visual:{type:'math',formula:'42 - 18 = ?'}, options:['22','24','26'], correctAnswer:'24', hint:'일의 자리 2에서 8을 뺄 수 없어 받아내림을 해요.' },
      { id:'qb_S7_C5', questionText:'덧셈을 계산해 보세요. 36 + 8 = ?', visual:{type:'math',formula:'36 + 8 = ?'}, options:['42','44','46'], correctAnswer:'44', hint:'36에 8을 더하면 44가 돼요.' },
      { id:'qb_S7_C6', questionText:'뺄셈을 계산해 보세요. 40 - 15 = ?', visual:{type:'math',formula:'40 - 15 = ?'}, options:['23','25','27'], correctAnswer:'25', hint:'40에서 15를 빼 보세요.' },
      { id:'qb_S7_C7', questionText:'십의 자리가 4이고 일의 자리가 9인 숫자는?', visual:{type:'math',formula:'[십의자리: 4, 일의자리: 9]'}, options:['49','94','409'], correctAnswer:'49', hint:'4를 십의 자리에, 9를 일의 자리에 놓아요.' },
      { id:'qb_S7_C8', questionText:'십의 자리가 3이고 일의 자리가 2인 숫자는 무엇일까요?', visual:{type:'math',formula:'[십의자리: 3, 일의자리: 2]'}, options:['23','32','302'], correctAnswer:'32', hint:'32는 삼십이를 말해요.' }
    ],
    apply: [
      { id:'qb_S7_A1', questionText:'동화책이 24권 있고 위인전이 18권 있습니다. 책은 모두 몇 권일까요?', visual:{type:'math',formula:'24 + 18 = ?'}, options:['40권','42권','44권'], correctAnswer:'42권', hint:'24와 18을 합해 보세요.' },
      { id:'qb_S7_A2', questionText:'도토리 가게에서 가구 35도토리짜리를 사려고 하는데, 지금 22도토리가 있어요. 몇 도토리가 더 필요할까요?', visual:{type:'math',formula:'35 - 22 = ?'}, options:['11개','13개','15개'], correctAnswer:'13개', hint:'35에서 22를 뺀 차이를 구해요.' },
      { id:'qb_S7_A3', questionText:'바구니에 참외가 45개 있었는데 17개를 가족들과 나누어 먹었습니다. 남은 참외는 몇 개일까요?', visual:{type:'math',formula:'45 - 17 = ?'}, options:['26개','28개','30개'], correctAnswer:'28개', hint:'45에서 17을 빼 보세요.' },
      { id:'qb_S7_A4', questionText:'시계가 가리키는 시각은 몇 시 몇 분일까요?', visual:{type:'clock',hour:5,minute:30}, options:['5시','5시 30분','6시 30분'], correctAnswer:'5시 30분', hint:'짧은 바늘이 5와 6 사이를 지났고 긴 바늘이 6을 가리켜요.' },
      { id:'qb_S7_A5', questionText:'시계가 가리키는 시각은 몇 시 몇 분일까요?', visual:{type:'clock',hour:8,minute:30}, options:['8시','8시 30분','9시 30분'], correctAnswer:'8시 30분', hint:'짧은 바늘이 8과 9 사이를 지나고 있어요.' },
      { id:'qb_S7_A6', questionText:'수첩 28권과 스티커 15개를 사려고 합니다. 모두 몇 개를 사야 하나요?', visual:{type:'math',formula:'28 + 15 = ?'}, options:['41개','43개','45개'], correctAnswer:'43개', hint:'28과 15를 더해보세요.' }
    ],
    think: [
      { id:'qb_S7_T1', questionText:'빈칸 ?에 들어갈 숫자는 무엇일까요? [ ? + 14 = 32 ]', visual:{type:'math',formula:'? + 14 = 32'}, options:['16','18','20'], correctAnswer:'18', hint:'32에서 14를 빼면 18이 돼요.' },
      { id:'qb_S7_T2', questionText:'식 [ 35 - ? > 28 ] 이 참이 되도록 하는 ? 자리의 정수 중 가장 큰 수는?', visual:{type:'math',formula:'35 - ? > 28'}, options:['5','6','7'], correctAnswer:'6', hint:'35에서 6을 빼면 29로 28보다 큽니다. 7을 빼면 28과 같아져요.' },
      { id:'qb_S7_T3', questionText:'빈칸 ?에 들어갈 숫자는 무엇일까요? [ 45 - ? = 27 ]', visual:{type:'math',formula:'45 - ? = 27'}, options:['16','18','20'], correctAnswer:'18', hint:'45에서 27을 빼 보세요.' },
      { id:'qb_S7_T4', questionText:'어떤 수에 19를 더하면 41이 됩니다. 어떤 수는 무엇일까요?', visual:{type:'math',formula:'? + 19 = 41'}, options:['20','22','24'], correctAnswer:'22', hint:'41에서 19를 빼면 됩니다.' },
      { id:'qb_S7_T5', questionText:'식 [ 25 + ? < 33 ] 이 참이 되도록 하는 ? 자리 중 가장 큰 수는?', visual:{type:'math',formula:'25 + ? < 33'}, options:['6','7','8'], correctAnswer:'7', hint:'25에 7을 더하면 32이고 33보다 작아요. 8을 더하면 33과 같아져요.' },
      { id:'qb_S7_T6', questionText:'두 수 48과 35 중 10에 더 가까운 수는 무엇일까요?', visual:{type:'math',formula:'48 vs 35'}, options:['48','35','거리가 같아요'], correctAnswer:'35', hint:'35가 48보다 훨씬 작아서 10에 더 가깝습니다.' }
    ]
  },

  // Stage 8: 7세심 (100 이내 덧뺄셈, 수 배열 규칙)
  8: {
    concept: [
      { id:'qb_S8_C1', questionText:'덧셈을 계산해 보세요. 45 + 38 = ?', visual:{type:'math',formula:'45 + 38 = ?'}, options:['73','83','93'], correctAnswer:'83', hint:'일의 자리 5+8=13에서 받아올림을 해서 83이 돼요.' },
      { id:'qb_S8_C2', questionText:'뺄셈을 계산해 보세요. 72 - 45 = ?', visual:{type:'math',formula:'72 - 45 = ?'}, options:['25','27','29'], correctAnswer:'27', hint:'72에서 45를 빼 보세요.' },
      { id:'qb_S8_C3', questionText:'덧셈을 계산해 보세요. 58 + 27 = ?', visual:{type:'math',formula:'58 + 27 = ?'}, options:['75','85','95'], correctAnswer:'85', hint:'58에 27을 더하면 85예요.' },
      { id:'qb_S8_C4', questionText:'뺄셈을 계산해 보세요. 90 - 36 = ?', visual:{type:'math',formula:'90 - 36 = ?'}, options:['52','54','56'], correctAnswer:'54', hint:'90에서 36을 빼 보세요.' },
      { id:'qb_S8_C5', questionText:'덧셈을 계산해 보세요. 64 + 29 = ?', visual:{type:'math',formula:'64 + 29 = ?'}, options:['83','93','95'], correctAnswer:'93', hint:'64 더하기 29는 93이에요.' },
      { id:'qb_S8_C6', questionText:'뺄셈을 계산해 보세요. 83 - 57 = ?', visual:{type:'math',formula:'83 - 57 = ?'}, options:['24','26','28'], correctAnswer:'26', hint:'83에서 57을 뺀 차는 26이에요.' },
      { id:'qb_S8_C7', questionText:'십의 자리가 8이고 일의 자리가 5인 숫자는 무엇일까요?', visual:{type:'math',formula:'[십의자리: 8, 일의자리: 5]'}, options:['58','85','805'], correctAnswer:'85', hint:'85는 여든다섯이에요.' },
      { id:'qb_S8_C8', questionText:'십의 자리가 9이고 일의 자리가 0인 숫자는 무엇일까요?', visual:{type:'math',formula:'[십의자리: 9, 일의자리: 0]'}, options:['9','90','900'], correctAnswer:'90', hint:'아흔을 나타내는 숫자예요.' }
    ],
    apply: [
      { id:'qb_S8_A1', questionText:'우체국에 엽서가 68장 있었는데 사람들이 29장을 사 갔어요. 남은 엽서는 몇 장일까요?', visual:{type:'math',formula:'68 - 29 = ?'}, options:['37장','39장','41장'], correctAnswer:'39장', hint:'68에서 29를 빼 보세요.' },
      { id:'qb_S8_A2', questionText:'바구니에 빨간 구슬이 47개, 파란 구슬이 36개 들어있습니다. 구슬은 모두 몇 개일까요?', visual:{type:'math',formula:'47 + 36 = ?'}, options:['73개','83개','93개'], correctAnswer:'83개', hint:'47과 36을 더해 보세요.' },
      { id:'qb_S8_A3', questionText:'꽃 가게에 장미 55송이가 있었는데 손님이 28송이를 사 가고 새로 15송이를 들여왔어요. 지금 장미는 몇 송이일까요?', visual:{type:'math',formula:'55 - 28 + 15 = ?'}, options:['32송이','42송이','52송이'], correctAnswer:'42송이', hint:'55에서 28을 빼고 나서 15를 더하세요.' },
      { id:'qb_S8_A4', questionText:'민수 키는 92cm이고 지유 키는 76cm입니다. 민수가 지유보다 얼마나 더 클까요?', visual:{type:'math',formula:'92 - 76 = ?'}, options:['14cm','16cm','18cm'], correctAnswer:'16cm', hint:'92에서 76을 빼 보세요.' },
      { id:'qb_S8_A5', questionText:'다람쥐가 도토리를 첫날에 35개, 둘째 날에 48개 모았습니다. 이틀 동안 모은 도토리는 모두 몇 개일까요?', visual:{type:'math',formula:'35 + 48 = ?'}, options:['73개','83개','93개'], correctAnswer:'83개', hint:'35에 48을 합산해 보세요.' },
      { id:'qb_S8_A6', questionText:'어항에 금붕어 54마리가 있었는데 26마리를 친구에게 선물했습니다. 남은 금붕어는 몇 마리일까요?', visual:{type:'math',formula:'54 - 26 = ?'}, options:['26마리','28마리','30마리'], correctAnswer:'28마리', hint:'54에서 26을 빼주세요.' }
    ],
    think: [
      { id:'qb_S8_T1', questionText:'규칙에 따라 빈칸 ?에 들어갈 숫자는 무엇일까요? [ 2, 5, 8, 11, ? ]', visual:{type:'pattern',items:['2','5','8','11','?']}, options:['13','14','15'], correctAnswer:'14', hint:'이전 숫자에서 3씩 일정하게 더해지고 있어요.' },
      { id:'qb_S8_T2', questionText:'규칙에 따라 빈칸 ?에 들어갈 숫자는 무엇일까요? [ 10, 20, 30, 40, ? ]', visual:{type:'pattern',items:['10','20','30','40','?']}, options:['45','50','60'], correctAnswer:'50', hint:'10씩 일정하게 늘어나고 있어요.' },
      { id:'qb_S8_T3', questionText:'규칙에 따라 빈칸 ?에 들어갈 숫자는 무엇일까요? [ 30, 27, 24, 21, ? ]', visual:{type:'pattern',items:['30','27','24','21','?']}, options:['17','18','19'], correctAnswer:'18', hint:'이전 숫자에서 3씩 줄어들고 있어요.' },
      { id:'qb_S8_T4', questionText:'규칙에 따라 빈칸 ?에 들어갈 숫자는 무엇일까요? [ 1, 3, 5, 7, ? ]', visual:{type:'pattern',items:['1','3','5','7','?']}, options:['8','9','10'], correctAnswer:'9', hint:'홀수들이 차례대로 늘어납니다. 2씩 더해보세요.' },
      { id:'qb_S8_T5', questionText:'어떤 수에 38을 더했더니 72가 되었습니다. 이 어떤 수는 무엇일까요?', visual:{type:'math',formula:'? + 38 = 72'}, options:['32','34','36'], correctAnswer:'34', hint:'72에서 38을 빼 보세요.' },
      { id:'qb_S8_T6', questionText:'어떤 수에서 25를 뺐더니 48이 남았습니다. 처음 어떤 수는 얼마였을까요?', visual:{type:'math',formula:'? - 25 = 48'}, options:['63','73','83'], correctAnswer:'73', hint:'48과 25를 더해보세요.' }
    ]
  },

  // Stage 9: 8세초 (곱셈구구 기초 - 2~5단)
  9: {
    concept: [
      { id:'qb_S9_C1', questionText:'곱셈을 해보세요. 2 × 6 = ?', visual:{type:'math',formula:'2 × 6 = ?'}, options:['10','12','14'], correctAnswer:'12', hint:'2의 6배예요. 이육 십이!' },
      { id:'qb_S9_C2', questionText:'곱셈을 해보세요. 3 × 5 = ?', visual:{type:'math',formula:'3 × 5 = ?'}, options:['12','15','18'], correctAnswer:'15', hint:'3의 5배예요. 삼오 십오!' },
      { id:'qb_S9_C3', questionText:'곱셈을 해보세요. 4 × 4 = ?', visual:{type:'math',formula:'4 × 4 = ?'}, options:['12','16','20'], correctAnswer:'16', hint:'4를 네 번 더한 수예요. 사사 십육!' },
      { id:'qb_S9_C4', questionText:'곱셈을 해보세요. 5 × 7 = ?', visual:{type:'math',formula:'5 × 7 = ?'}, options:['30','35','40'], correctAnswer:'35', hint:'오단 구구단에서 오칠 삼십오!' },
      { id:'qb_S9_C5', questionText:'곱셈을 해보세요. 3 × 8 = ?', visual:{type:'math',formula:'3 × 8 = ?'}, options:['21','24','27'], correctAnswer:'24', hint:'3이 여덟 번! 삼팔 이십사!' },
      { id:'qb_S9_C6', questionText:'곱셈을 해보세요. 4 × 7 = ?', visual:{type:'math',formula:'4 × 7 = ?'}, options:['24','28','32'], correctAnswer:'28', hint:'사칠 이십팔!' },
      { id:'qb_S9_C7', questionText:'곱셈을 해보세요. 5 × 9 = ?', visual:{type:'math',formula:'5 × 9 = ?'}, options:['40','45','50'], correctAnswer:'45', hint:'오구 사십오!' },
      { id:'qb_S9_C8', questionText:'곱셈을 해보세요. 2 × 9 = ?', visual:{type:'math',formula:'2 × 9 = ?'}, options:['16','18','20'], correctAnswer:'18', hint:'이구 십팔!' }
    ],
    apply: [
      { id:'qb_S9_A1', questionText:'한 묶음에 풍선이 3개씩 들어있습니다. 4묶음이 있다면 풍선은 모두 몇 개일까요?', visual:{type:'math',formula:'3 × 4 = ?'}, options:['10개','12개','14개'], correctAnswer:'12개', hint:'3을 네 번 더한 3×4=12입니다.' },
      { id:'qb_S9_A2', questionText:'사과를 한 바구니에 5개씩 담았습니다. 모두 6바구니가 있다면 사과는 전부 몇 개일까요?', visual:{type:'math',formula:'5 × 6 = ?'}, options:['25개','30개','35개'], correctAnswer:'30개', hint:'오육 삼십!' },
      { id:'qb_S9_A3', questionText:'과자 한 상자에 4개씩 들어있습니다. 모두 5상자가 있다면 과자는 모두 몇 개일까요?', visual:{type:'math',formula:'4 × 5 = ?'}, options:['18개','20개','22개'], correctAnswer:'20개', hint:'사오 이십!' },
      { id:'qb_S9_A4', questionText:'자전거 5대의 바퀴는 모두 몇 개일까요?', visual:{type:'math',formula:'2 × 5 = ?'}, options:['8개','10개','12개'], correctAnswer:'10개', hint:'자전거 한 대당 바퀴는 2개예요.' },
      { id:'qb_S9_A5', questionText:'지우개 4개씩 6 묶음이 있습니다. 지우개는 모두 몇 개일까요?', visual:{type:'math',formula:'4 × 6 = ?'}, options:['20개','24개','28개'], correctAnswer:'24개', hint:'사육 이십사!' },
      { id:'qb_S9_A6', questionText:'지석이가 도토리를 3개씩 7 묶음으로 포장했습니다. 도토리는 모두 몇 개일까요?', visual:{type:'math',formula:'3 × 7 = ?'}, options:['18개','21개','24개'], correctAnswer:'21개', hint:'삼칠 이십일!' }
    ],
    think: [
      { id:'qb_S9_T1', questionText:'어떤 수에 3을 곱했더니 18이 되었습니다. 이 어떤 수는 무엇일까요?', visual:{type:'math',formula:'? × 3 = 18'}, options:['5','6','7'], correctAnswer:'6', hint:'3단 구구단에서 곱해서 18이 되는 수예요.' },
      { id:'qb_S9_T2', questionText:'어떤 수에 4를 곱했더니 32가 되었습니다. 이 어떤 수는 무엇일까요?', visual:{type:'math',formula:'? × 4 = 32'}, options:['7','8','9'], correctAnswer:'8', hint:'사팔 삼십이!' },
      { id:'qb_S9_T3', questionText:'어떤 수에 5를 곱했더니 45가 되었습니다. 이 어떤 수는 무엇일까요?', visual:{type:'math',formula:'? × 5 = 45'}, options:['7','8','9'], correctAnswer:'9', hint:'오구 사십오!' },
      { id:'qb_S9_T4', questionText:'곱한 결과가 가장 큰 식은 무엇일까요?', visual:{type:'math',formula:'① 3 × 7  |  ② 4 × 5  |  ③ 5 × 4'}, options:['①','②','③'], correctAnswer:'①', hint:'①은 21, ②는 20, ③은 20이에요.' },
      { id:'qb_S9_T5', questionText:'어떤 수에 2를 곱했더니 16이 되었습니다. 이 어떤 수는 무엇일까요?', visual:{type:'math',formula:'? × 2 = 16'}, options:['6','7','8'], correctAnswer:'8', hint:'이팔 십육!' },
      { id:'qb_S9_T6', questionText:'규칙에 따라 빈칸 ?에 들어갈 숫자는 무엇일까요? [ 4, 8, 12, 16, ? ]', visual:{type:'pattern',items:['4','8','12','16','?']}, options:['18','20','22'], correctAnswer:'20', hint:'4의 곱셈구구 순서대로 늘어나고 있어요. 4×5는?' }
    ]
  },

  // Stage 10: 8세심 (곱셈구구 심화 - 6~9단)
  10: {
    concept: [
      { id:'qb_S10_C1', questionText:'곱셈을 해보세요. 6 × 7 = ?', visual:{type:'math',formula:'6 × 7 = ?'}, options:['40','42','44'], correctAnswer:'42', hint:'육칠 사십이!' },
      { id:'qb_S10_C2', questionText:'곱셈을 해보세요. 7 × 8 = ?', visual:{type:'math',formula:'7 × 8 = ?'}, options:['54','56','58'], correctAnswer:'56', hint:'칠팔 오십육!' },
      { id:'qb_S10_C3', questionText:'곱셈을 해보세요. 8 × 6 = ?', visual:{type:'math',formula:'8 × 6 = ?'}, options:['44','48','52'], correctAnswer:'48', hint:'팔육 사십팔!' },
      { id:'qb_S10_C4', questionText:'곱셈을 해보세요. 9 × 7 = ?', visual:{type:'math',formula:'9 × 7 = ?'}, options:['61','63','65'], correctAnswer:'63', hint:'구칠 육십삼!' },
      { id:'qb_S10_C5', questionText:'곱셈을 해보세요. 8 × 8 = ?', visual:{type:'math',formula:'8 × 8 = ?'}, options:['56','64','72'], correctAnswer:'64', hint:'팔팔 육십사!' },
      { id:'qb_S10_C6', questionText:'곱셈을 해보세요. 7 × 9 = ?', visual:{type:'math',formula:'7 × 9 = ?'}, options:['61','63','65'], correctAnswer:'63', hint:'칠구 육십삼!' },
      { id:'qb_S10_C7', questionText:'곱셈을 해보세요. 9 × 9 = ?', visual:{type:'math',formula:'9 × 9 = ?'}, options:['72','81','90'], correctAnswer:'81', hint:'구구 팔십일!' },
      { id:'qb_S10_C8', questionText:'곱셈을 해보세요. 6 × 9 = ?', visual:{type:'math',formula:'6 × 9 = ?'}, options:['48','54','60'], correctAnswer:'54', hint:'육구 오십사!' }
    ],
    apply: [
      { id:'qb_S10_A1', questionText:'한 묶음에 사과가 6개씩 들어있습니다. 8묶음이 있다면 사과는 모두 몇 개일까요?', visual:{type:'math',formula:'6 × 8 = ?'}, options:['42개','48개','54개'], correctAnswer:'48개', hint:'육팔 사십팔!' },
      { id:'qb_S10_A2', questionText:'초코칩 쿠키가 한 상자에 7개씩 들어있습니다. 모두 7상자가 있다면 쿠키는 모두 몇 개일까요?', visual:{type:'math',formula:'7 × 7 = ?'}, options:['42개','49개','56개'], correctAnswer:'49개', hint:'칠칠 사십구!' },
      { id:'qb_S10_A3', questionText:'문구점에서 공책 8권(한 권당 9도토리)을 샀습니다. 모두 몇 도토리가 필요할까요?', visual:{type:'math',formula:'9 × 8 = ?'}, options:['64개','72개','80개'], correctAnswer:'72개', hint:'구팔 칠십이!' },
      { id:'qb_S10_A4', questionText:'연필이 6자루씩 6상자 있습니다. 연필은 모두 몇 자루일까요?', visual:{type:'math',formula:'6 × 6 = ?'}, options:['30자루','36자루','42자루'], correctAnswer:'36자루', hint:'육육 삼십육!' },
      { id:'qb_S10_A5', questionText:'어항 하나에 금붕어가 8마리씩 살고 있습니다. 어항 7개에 살고 있는 금붕어는 모두 몇 마리일까요?', visual:{type:'math',formula:'8 × 7 = ?'}, options:['48마리','56마리','64마리'], correctAnswer:'56마리', hint:'팔칠 오십육!' },
      { id:'qb_S10_A6', questionText:'지우개 한 통에 9개씩 들어있습니다. 6통이 있다면 지우개는 모두 몇 개일까요?', visual:{type:'math',formula:'9 × 6 = ?'}, options:['45개','54개','63개'], correctAnswer:'54개', hint:'구육 오십사!' }
    ],
    think: [
      { id:'qb_S10_T1', questionText:'어떤 수에 6을 곱했더니 48이 되었습니다. 이 어떤 수는 무엇일까요?', visual:{type:'math',formula:'? × 6 = 48'}, options:['7','8','9'], correctAnswer:'8', hint:'구구단 6단에서 곱해서 48이 되는 수예요.' },
      { id:'qb_S10_T2', questionText:'어떤 수에 7을 곱했더니 63이 되었습니다. 이 어떤 수는 무엇일까요?', visual:{type:'math',formula:'? × 7 = 63'}, options:['8','9','10'], correctAnswer:'9', hint:'칠구 육십삼!' },
      { id:'qb_S10_T3', questionText:'어떤 수에 8을 곱했더니 64가 되었습니다. 이 어떤 수는 무엇일까요?', visual:{type:'math',formula:'? × 8 = 64'}, options:['7','8','9'], correctAnswer:'8', hint:'팔팔 육십사!' },
      { id:'qb_S10_T4', questionText:'곱한 결과가 가장 큰 식은 무엇일까요?', visual:{type:'math',formula:'① 6 × 9  |  ② 7 × 8  |  ③ 8 × 7'}, options:['①','②','③'], correctAnswer:'②', hint:'①은 54, ②와 ③은 56이에요.' },
      { id:'qb_S10_T5', questionText:'어떤 수에 9를 곱했더니 72가 되었습니다. 이 어떤 수는 무엇일까요?', visual:{type:'math',formula:'? × 9 = 72'}, options:['7','8','9'], correctAnswer:'8', hint:'구팔 칠십이!' },
      { id:'qb_S10_T6', questionText:'규칙에 따라 빈칸 ?에 들어갈 숫자는 무엇일까요? [ 9, 18, 27, 36, ? ]', visual:{type:'pattern',items:['9','18','27','36','?']}, options:['40','45','54'], correctAnswer:'45', hint:'9의 곱셈구구 순서대로 9씩 커지고 있어요.' }
    ]
  },

  // Stage 11: 9세초 (세자리수 덧뺄셈, 나눗셈 기초)
  11: {
    concept: [
      { id:'qb_S11_C1', questionText:'덧셈을 계산해 보세요. 245 + 132 = ?', visual:{type:'math',formula:'245 + 132 = ?'}, options:['367','377','387'], correctAnswer:'377', hint:'일, 십, 백의 자리 순서대로 더해요.' },
      { id:'qb_S11_C2', questionText:'뺄셈을 계산해 보세요. 568 - 243 = ?', visual:{type:'math',formula:'568 - 243 = ?'}, options:['315','325','335'], correctAnswer:'325', hint:'일의 자리 8-3, 십의 자리 6-4, 백의 자리 5-2예요.' },
      { id:'qb_S11_C3', questionText:'덧셈을 계산해 보세요. 378 + 145 = ?', visual:{type:'math',formula:'378 + 145 = ?'}, options:['513','523','533'], correctAnswer:'523', hint:'받아올림을 조심해서 두 번 더해요.' },
      { id:'qb_S11_C4', questionText:'뺄셈을 계산해 보세요. 631 - 258 = ?', visual:{type:'math',formula:'631 - 258 = ?'}, options:['363','373','383'], correctAnswer:'373', hint:'받아내림을 아래 자리부터 차근차근 진행해요.' },
      { id:'qb_S11_C5', questionText:'귤 15개를 3개의 바구니에 똑같이 나누어 담으려고 합니다. 한 바구니에 몇 개씩 담아야 할까요?', visual:{type:'math',formula:'15 ÷ 3 = ?'}, options:['4개','5개','6개'], correctAnswer:'5개', hint:'3에 곱해서 15가 되는 수(3 × ? = 15)를 구해요.' },
      { id:'qb_S11_C6', questionText:'사탕 24개를 4명에게 똑같이 나누어 주려고 합니다. 한 사람이 몇 개씩 가질 수 있을까요?', visual:{type:'math',formula:'24 ÷ 4 = ?'}, options:['5개','6개','7개'], correctAnswer:'6개', hint:'4 × 6 = 24예요.' },
      { id:'qb_S11_C7', questionText:'초콜릿 32개를 8상자에 똑같이 나누어 담았습니다. 한 상자에 몇 개씩 들어있을까요?', visual:{type:'math',formula:'32 ÷ 8 = ?'}, options:['3개','4개','5개'], correctAnswer:'4개', hint:'8 × 4 = 32예요.' },
      { id:'qb_S11_C8', questionText:'연필 18자루를 2명에게 똑같이 나누어 주면 한 사람이 몇 자루씩 가질까요?', visual:{type:'math',formula:'18 ÷ 2 = ?'}, options:['8자루','9자루','10자루'], correctAnswer:'9자루', hint:'2 × 9 = 18이에요.' }
    ],
    apply: [
      { id:'qb_S11_A1', questionText:'지갑 속에 500원짜리 동전 1개, 100원짜리 동전 3개, 10원짜리 동전 4개가 들어있습니다. 모두 얼마일까요?', visual:{type:'math',formula:'500 × 1 + 100 × 3 + 10 × 4'}, options:['800원','840원','940원'], correctAnswer:'840원', hint:'500원과 300원, 그리고 40원을 모두 더해요.' },
      { id:'qb_S11_A2', questionText:'도서관에 책이 345권 있었는데 새로 128권이 더 들어왔습니다. 도서관에는 책이 모두 몇 권 있을까요?', visual:{type:'math',formula:'345 + 128 = ?'}, options:['463권','473권','483권'], correctAnswer:'473권', hint:'345에 128을 더해요.' },
      { id:'qb_S11_A3', questionText:'지민이 저금통에 750원이 있었는데 장난감을 사는 데 380원을 썼습니다. 남은 돈은 얼마일까요?', visual:{type:'math',formula:'750 - 380 = ?'}, options:['350원','370원','390원'], correctAnswer:'370원', hint:'750에서 380을 빼 보세요.' },
      { id:'qb_S11_A4', questionText:'빵집에 단팥빵이 아침에 120개 구워졌고 오후에 85개 더 구워졌습니다. 그중 140개가 팔렸다면 남은 빵은 몇 개일까요?', visual:{type:'math',formula:'120 + 85 - 140 = ?'}, options:['55개','65개','75개'], correctAnswer:'65개', hint:'120에 85를 먼저 더하고 140을 뺍니다.' },
      { id:'qb_S11_A5', questionText:'색종이가 40장 있습니다. 이것을 5명의 친구에게 똑같이 나누어 준다면 한 사람은 몇 장씩 받을까요?', visual:{type:'math',formula:'40 ÷ 5 = ?'}, options:['7장','8장','9장'], correctAnswer:'8장', hint:'5 × 8 = 40이에요.' },
      { id:'qb_S11_A6', questionText:'동전 500원짜리 2개와 100원짜리 4개가 있습니다. 모두 합하면 얼마일까요?', visual:{type:'math',formula:'500 × 2 + 100 × 4'}, options:['1200원','1300원','1400원'], correctAnswer:'1400원', hint:'500원짜리 2개는 1000원이에요.' }
    ],
    think: [
      { id:'qb_S11_T1', questionText:'어떤 수에 6을 곱했더니 36이 되었습니다. 이 어떤 수를 2로 나누면 얼마가 될까요?', visual:{type:'math',formula:'(? × 6 = 36) ➔ ? ÷ 2 = ?'}, options:['3','4','6'], correctAnswer:'3', hint:'먼저 어떤 수 ?를 구하면 6이에요. 6을 2로 나누면 3이 됩니다.' },
      { id:'qb_S11_T2', questionText:'빈칸 ?에 들어갈 숫자는 무엇일까요? [ 120, 150, 180, 210, ? ]', visual:{type:'pattern',items:['120','150','180','210','?']}, options:['230','240','250'], correctAnswer:'240', hint:'30씩 일정하게 커지고 있어요.' },
      { id:'qb_S11_T3', questionText:'어떤 수에서 150을 뺐더니 280이 되었습니다. 이 어떤 수는 얼마였을까요?', visual:{type:'math',formula:'? - 150 = 280'}, options:['410','430','450'], correctAnswer:'430', hint:'280과 150을 합해 보세요.' },
      { id:'qb_S11_T4', questionText:'계산 결과가 가장 큰 식은 무엇일까요?', visual:{type:'math',formula:'① 350+120  |  ② 680-230  |  ③ 120 × 4'}, options:['①','②','③'], correctAnswer:'③', hint:'①은 470, ②는 450, ③은 480이에요.' },
      { id:'qb_S11_T5', questionText:'어떤 수에 5를 곱했더니 40이 되었습니다. 이 어떤 수에 120을 더하면 얼마가 될까요?', visual:{type:'math',formula:'(? × 5 = 40) ➔ ? + 120 = ?'}, options:['124','128','132'], correctAnswer:'128', hint:'어떤 수는 8이에요. 120에 8을 더해보세요.' },
      { id:'qb_S11_T6', questionText:'빈칸 ?에 들어갈 숫자는 무엇일까요? [ 500, 450, 400, 350, ? ]', visual:{type:'pattern',items:['500','450','400','350','?']}, options:['280','300','320'], correctAnswer:'300', hint:'50씩 일정하게 작아지고 있어요.' }
    ]
  },

  // Stage 12: 9세심 (분수/도형/나눗셈 응용)
  12: {
    concept: [
      { id:'qb_S12_C1', questionText:'나눗셈을 해보세요. 48 ÷ 8 = ?', visual:{type:'math',formula:'48 ÷ 8 = ?'}, options:['5','6','7'], correctAnswer:'6', hint:'8 × 6 = 48이에요.' },
      { id:'qb_S12_C2', questionText:'나눗셈을 해보세요. 63 ÷ 9 = ?', visual:{type:'math',formula:'63 ÷ 9 = ?'}, options:['6','7','8'], correctAnswer:'7', hint:'9 × 7 = 63이에요.' },
      { id:'qb_S12_C3', questionText:'나눗셈을 해보세요. 54 ÷ 6 = ?', visual:{type:'math',formula:'54 ÷ 6 = ?'}, options:['8','9','10'], correctAnswer:'9', hint:'6 × 9 = 54예요.' },
      { id:'qb_S12_C4', questionText:'나눗셈을 해보세요. 72 ÷ 9 = ?', visual:{type:'math',formula:'72 ÷ 9 = ?'}, options:['7','8','9'], correctAnswer:'8', hint:'9 × 8 = 72예요.' },
      { id:'qb_S12_C5', questionText:'피자 한 판을 똑같이 4조각으로 나누었습니다. 그중 1조각은 분수로 어떻게 표현할까요?', visual:{type:'math',formula:'4조각 중 1조각'}, options:['1/2','1/3','1/4'], correctAnswer:'1/4', hint:'전체 4개 중에 1개 조각이에요. 사분의 일!' },
      { id:'qb_S12_C6', questionText:'케이크를 똑같이 3조각으로 나누어 그중 1조각을 먹었습니다. 남은 케이크는 분수로 얼마일까요?', visual:{type:'math',formula:'3조각 중 남은 2조각'}, options:['1/3','2/3','3/3'], correctAnswer:'2/3', hint:'전체 3개 중에 남은 2개 조각이에요. 삼분의 이!' },
      { id:'qb_S12_C7', questionText:'도형 사각형은 변(테두리 선)이 모두 변이 모두 몇 개 있을까요?', visual:{type:'math',formula:'사각형의 변의 개수'}, options:['3개','4개','5개'], correctAnswer:'4개', hint:'네모 모양의 사각형은 변이 4개예요.' },
      { id:'qb_S12_C8', questionText:'도형 삼각형은 꼭짓점이 모두 몇 개 있을까요?', visual:{type:'math',formula:'삼각형 꼭짓점 개수'}, options:['3개','4개','5개'], correctAnswer:'3개', hint:'뾰족한 삼각형은 꼭짓점이 3개예요.' }
    ],
    apply: [
      { id:'qb_S12_A1', questionText:'사과 45개를 한 상자에 9개씩 담아 포장하려고 합니다. 포장 상자는 모두 몇 개가 필요할까요?', visual:{type:'math',formula:'45 ÷ 9 = ?'}, options:['4개','5개','6개'], correctAnswer:'5개', hint:'45를 9로 나누어 보세요.' },
      { id:'qb_S12_A2', questionText:'지우개 36개를 한 통에 6개씩 담았습니다. 모두 몇 통이 생길까요?', visual:{type:'math',formula:'36 ÷ 6 = ?'}, options:['5통','6통','7통'], correctAnswer:'6통', hint:'36을 6으로 나눈 몫을 구해요.' },
      { id:'qb_S12_A3', questionText:'공책 40권을 8명의 어린이에게 똑같이 나누어 주려고 합니다. 한 사람당 몇 권씩 받을까요?', visual:{type:'math',formula:'40 ÷ 8 = ?'}, options:['4권','5권','6권'], correctAnswer:'5권', hint:'40 나누기 8을 계산해요.' },
      { id:'qb_S12_A4', questionText:'피자 한 판의 4분의 1(1/4)조각을 하늘이가 먹고, 4분의 2(2/4)조각을 민수가 먹었습니다. 남은 피자는 전체의 얼마일까요?', visual:{type:'math',formula:'1 - 1/4 - 2/4 = ?'}, options:['1/4','2/4','3/4'], correctAnswer:'1/4', hint:'전체 4조각 중 하늘이가 1조각, 민수가 2조각을 먹었으므로 남은 조각은 1조각이에요.' },
      { id:'qb_S12_A5', questionText:'길이가 24cm인 끈을 똑같이 4토막으로 자르면 한 토막의 길이는 몇 cm가 될까요?', visual:{type:'math',formula:'24 ÷ 4 = ?'}, options:['5cm','6cm','7cm'], correctAnswer:'6cm', hint:'24를 4로 나누어 보세요.' },
      { id:'qb_S12_A6', questionText:'귤 56개를 7명에게 똑같이 나누어 준다면 한 사람이 몇 개씩 받을 수 있을까요?', visual:{type:'math',formula:'56 ÷ 7 = ?'}, options:['7개','8개','9개'], correctAnswer:'8개', hint:'7 × 8 = 56이에요.' }
    ],
    think: [
      { id:'qb_S12_T1', questionText:'어떤 수에 8을 곱해야 할 것을 잘못하여 더했더니 17이 되었습니다. 바르게 계산한 곱은 얼마일까요?', visual:{type:'math',formula:'(? + 8 = 17) ➔ ? × 8 = ?'}, options:['64','72','80'], correctAnswer:'72', hint:'어떤 수는 9예요. 9에 8을 곱해보세요.' },
      { id:'qb_S12_T2', questionText:'규칙에 따라 빈칸 ?에 들어갈 숫자는 무엇일까요? [ 2, 4, 8, 16, ? ]', visual:{type:'pattern',items:['2','4','8','16','?']}, options:['24','32','40'], correctAnswer:'32', hint:'앞의 숫자에 2배씩 늘어나고 있어요.' },
      { id:'qb_S12_T3', questionText:'어떤 수에서 9를 나누었더니 8이 되었습니다. 이 어떤 수에 10을 더하면 얼마가 될까요?', visual:{type:'math',formula:'(? ÷ 9 = 8) ➔ ? + 10 = ?'}, options:['72','82','92'], correctAnswer:'82', hint:'어떤 수는 9 × 8 = 72예요. 72에 10을 더해보세요.' },
      { id:'qb_S12_T4', questionText:'사각형 3개와 삼각형 2개의 모든 변의 개수를 더하면 모두 몇 개일까요?', visual:{type:'math',formula:'사각형 3개 변 + 삼각형 2개 변'}, options:['16개','18개','20개'], correctAnswer:'18개', hint:'사각형 변은 4개씩 3개(12개), 삼각형 변은 3개씩 2개(6개)예요.' },
      { id:'qb_S12_T5', questionText:'어떤 수에 6을 곱해야 할 것을 잘못하여 나누었더니 8이 되었습니다. 바르게 계산한 곱은 얼마일까요?', visual:{type:'math',formula:'(? ÷ 6 = 8) ➔ ? × 6 = ?'}, options:['268','278','288'], correctAnswer:'288', hint:'어떤 수는 48이에요. 48 × 6 = 288입니다.' },
      { id:'qb_S12_T6', questionText:'규칙에 따라 빈칸 ?에 들어갈 숫자는 무엇일까요? [ 1, 3, 6, 10, ? ]', visual:{type:'pattern',items:['1','3','6','10','?']}, options:['13','15','17'], correctAnswer:'15', hint:'더해지는 숫자가 2, 3, 4로 1씩 늘어나고 있어요. 이번엔 5를 더해야 해요.' }
    ]
  }
};

// 세션 중 이미 출제된 문제 ID를 추적하여 중복 방지
let usedQuestionIds = new Set();

/**
 * 문제 은행에서 중복 없이 문제를 뽑는 핵심 함수
 * @param {number} stage - 스테이지 번호 (1~12)
 * @param {string} type - 문제 유형 ('concept', 'apply', 'think')
 * @returns {object|null} - 문제 객체 또는 모두 소진 시 null
 */
function pickQuestionFromBank(stage, type) {
  const pool = QUESTION_BANK[stage]?.[type];
  if (!pool || pool.length === 0) return null;
  
  // 아직 사용되지 않은 문제들만 필터링
  const available = pool.filter(q => !usedQuestionIds.has(q.id));
  
  // 모든 문제가 소진되었으면 세션 기록을 리셋하고 다시 전체 풀 사용
  if (available.length === 0) {
    pool.forEach(q => usedQuestionIds.delete(q.id));
    return pickQuestionFromBank(stage, type); // 재귀 호출로 깨끗한 풀에서 추출
  }
  
  // 랜덤 추출
  const picked = available[Math.floor(Math.random() * available.length)];
  usedQuestionIds.add(picked.id);
  
  return picked;
}

/**
 * 세션의 사용된 문제 기록을 완전히 초기화
 */
function resetUsedQuestions() {
  usedQuestionIds = new Set();
}
