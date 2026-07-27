/* ==========================================================================
   로롱수학 문제 은행 (Question Bank)
   - 총 200문제 (스테이지별 40문제 × 5 스테이지)
   - 각 스테이지: concept 16문제 + apply 12문제 + think 12문제
   ========================================================================== */

const QUESTION_BANK = {
  // ═══════════════════════════════════════════════════════
  // Stage 1: 만 4세 기초 (1~5 세기, 크기비교, 모양 차이)
  // ═══════════════════════════════════════════════════════
  1: {
    concept: [
      { id:'qb_S1_C01', questionText:'🍎는 모두 몇 개일까요?', visual:{type:'emoji',count:3,item:'🍎'}, options:['2','3','4'], correctAnswer:'3', hint:'하나, 둘, 셋! 손가락으로 짚으며 세어 보아요.' },
      { id:'qb_S1_C02', questionText:'🍌는 모두 몇 개일까요?', visual:{type:'emoji',count:4,item:'🍌'}, options:['3','4','5'], correctAnswer:'4', hint:'바나나를 하나씩 짚어가며 넷까지 세어봐요!' },
      { id:'qb_S1_C03', questionText:'🍓는 모두 몇 개일까요?', visual:{type:'emoji',count:2,item:'🍓'}, options:['1','2','3'], correctAnswer:'2', hint:'딸기가 두 개 있어요. 하나, 둘!' },
      { id:'qb_S1_C04', questionText:'🍊는 모두 몇 개일까요?', visual:{type:'emoji',count:5,item:'🍊'}, options:['4','5','6'], correctAnswer:'5', hint:'다섯 개! 한 손 가득이에요.' },
      { id:'qb_S1_C05', questionText:'🐱는 모두 몇 마리일까요?', visual:{type:'emoji',count:3,item:'🐱'}, options:['2','3','4'], correctAnswer:'3', hint:'고양이를 한 마리씩 세어 보아요!' },
      { id:'qb_S1_C06', questionText:'🌸는 모두 몇 송이일까요?', visual:{type:'emoji',count:4,item:'🌸'}, options:['3','4','5'], correctAnswer:'4', hint:'예쁜 꽃을 하나씩 세어봐요. 넷이에요!' },
      { id:'qb_S1_C07', questionText:'🚗는 모두 몇 대일까요?', visual:{type:'emoji',count:2,item:'🚗'}, options:['1','2','3'], correctAnswer:'2', hint:'빨간 자동차가 두 대 있어요!' },
      { id:'qb_S1_C08', questionText:'⭐는 모두 몇 개일까요?', visual:{type:'emoji',count:5,item:'⭐'}, options:['4','5','6'], correctAnswer:'5', hint:'반짝이는 별을 다섯 개 세어봐요!' },
      { id:'qb_S1_C09', questionText:'가장 덩치가 큰 동물은 누구일까요?', visual:{type:'emoji_sizes',items:[{e:'🐹',s:1.4},{e:'🐘',s:3.5},{e:'🐥',s:1.6}]}, options:['🐹','🐘','🐥'], correctAnswer:'🐘', hint:'코끼리 🐘가 가장 크고 무거워요!' },
      { id:'qb_S1_C10', questionText:'가장 작은 동물은 누구일까요?', visual:{type:'emoji_sizes',items:[{e:'🐻',s:2.8},{e:'🐁',s:1.2},{e:'🐕',s:2.2}]}, options:['🐻','🐁','🐕'], correctAnswer:'🐁', hint:'쥐 🐁가 가장 조그맣고 귀여워요!' },
      { id:'qb_S1_C11', questionText:'모양이 혼자 다른 것은 무엇일까요?', visual:{type:'emoji_diff',items:['🍎','🍎','🍇','🍎']}, options:['🍎','🍇','🍓'], correctAnswer:'🍇', hint:'빨간 사과들 속에 보라색 포도가 숨어 있어요!' },
      { id:'qb_S1_C12', questionText:'혼자 다른 동물을 찾아보세요!', visual:{type:'emoji_diff',items:['🐶','🐶','🐱','🐶']}, options:['🐶','🐱','🐰'], correctAnswer:'🐱', hint:'강아지들 사이에 고양이 한 마리가 있어요!' },
      { id:'qb_S1_C13', questionText:'🐸는 모두 몇 마리일까요?', visual:{type:'emoji',count:3,item:'🐸'}, options:['2','3','4'], correctAnswer:'3', hint:'개굴개굴! 개구리 세 마리예요.' },
      { id:'qb_S1_C14', questionText:'혼자 다른 꽃을 찾아보세요!', visual:{type:'emoji_diff',items:['🌸','🌻','🌸','🌸']}, options:['🌸','🌻','🌹'], correctAnswer:'🌻', hint:'분홍 꽃 사이에 노란 해바라기가 하나 있어요!' },
      { id:'qb_S1_C15', questionText:'가장 큰 탈것은 무엇일까요?', visual:{type:'emoji_sizes',items:[{e:'🚲',s:1.5},{e:'🚂',s:3.5},{e:'🛴',s:1.3}]}, options:['🚲','🚂','🛴'], correctAnswer:'🚂', hint:'기차 🚂가 가장 크고 길어요!' },
      { id:'qb_S1_C16', questionText:'🦋는 모두 몇 마리일까요?', visual:{type:'emoji',count:4,item:'🦋'}, options:['3','4','5'], correctAnswer:'4', hint:'나비를 한 마리씩 세어봐요. 네 마리예요!' }
    ],
    apply: [
      { id:'qb_S1_A01', questionText:'다람쥐에게 도토리를 3개 주려고 해요. 도토리 3개가 있는 상자를 골라보세요!', visual:{type:'emoji',count:3,item:'🌰'}, options:['🌰🌰','🌰🌰🌰','🌰🌰🌰🌰'], correctAnswer:'🌰🌰🌰', hint:'도토리를 하나씩 세어 3개인 상자를 찾아보세요.' },
      { id:'qb_S1_A02', questionText:'토끼에게 당근을 2개 먹이려고 해요. 당근 2개를 골라주세요!', visual:{type:'emoji',count:2,item:'🥕'}, options:['🥕','🥕🥕','🥕🥕🥕'], correctAnswer:'🥕🥕', hint:'당근이 딱 두 개인 카드를 고르면 돼요!' },
      { id:'qb_S1_A03', questionText:'곰돌이에게 꿀 4개를 가져다주세요! 꿀 4개가 있는 상자는?', visual:{type:'emoji',count:4,item:'🍯'}, options:['🍯🍯🍯','🍯🍯🍯🍯','🍯🍯🍯🍯🍯'], correctAnswer:'🍯🍯🍯🍯', hint:'꿀단지를 하나씩 세어 네 개인 상자를 찾아봐요!' },
      { id:'qb_S1_A04', questionText:'강아지에게 뼈다귀를 5개 주려고 해요. 5개가 있는 곳은?', visual:{type:'emoji',count:5,item:'🦴'}, options:['🦴🦴🦴🦴','🦴🦴🦴🦴🦴','🦴🦴🦴🦴🦴🦴'], correctAnswer:'🦴🦴🦴🦴🦴', hint:'다섯 개를 잘 세어보세요!' },
      { id:'qb_S1_A05', questionText:'접시에 사과가 3개 있어요. 그림과 같은 개수는?', visual:{type:'emoji',count:3,item:'🍎'}, options:['2개','3개','4개'], correctAnswer:'3개', hint:'사과를 손가락으로 하나씩 세어보세요!' },
      { id:'qb_S1_A06', questionText:'꽃밭에 나비 2마리가 날고 있어요. 몇 마리일까요?', visual:{type:'emoji',count:2,item:'🦋'}, options:['1마리','2마리','3마리'], correctAnswer:'2마리', hint:'팔랑팔랑! 나비가 둘이에요.' },
      { id:'qb_S1_A07', questionText:'연못에 개구리 4마리가 있어요. 그림과 같은 수는?', visual:{type:'emoji',count:4,item:'🐸'}, options:['3','4','5'], correctAnswer:'4', hint:'개구리를 하나씩 짚어가며 세어봐요!' },
      { id:'qb_S1_A08', questionText:'바구니에 딸기를 3개 담았어요. 몇 개를 담았을까요?', visual:{type:'emoji',count:3,item:'🍓'}, options:['2개','3개','4개'], correctAnswer:'3개', hint:'맛있는 딸기가 세 개 있어요!' },
      { id:'qb_S1_A09', questionText:'고양이에게 생선 2마리를 줄까요? 2마리는?', visual:{type:'emoji',count:2,item:'🐟'}, options:['🐟','🐟🐟','🐟🐟🐟'], correctAnswer:'🐟🐟', hint:'생선 두 마리를 찾아보세요!' },
      { id:'qb_S1_A10', questionText:'새장에 새가 4마리 있어요. 몇 마리일까요?', visual:{type:'emoji',count:4,item:'🐦'}, options:['3마리','4마리','5마리'], correctAnswer:'4마리', hint:'새를 한 마리씩 세면 네 마리예요!' },
      { id:'qb_S1_A11', questionText:'펭귄에게 물고기 5마리를 가져다주세요! 5마리는?', visual:{type:'emoji',count:5,item:'🐟'}, options:['🐟🐟🐟🐟','🐟🐟🐟🐟🐟','🐟🐟🐟🐟🐟🐟'], correctAnswer:'🐟🐟🐟🐟🐟', hint:'물고기를 다섯까지 세어봐요!' },
      { id:'qb_S1_A12', questionText:'화분에 꽃이 3송이 피었어요. 몇 송이일까요?', visual:{type:'emoji',count:3,item:'🌷'}, options:['2송이','3송이','4송이'], correctAnswer:'3송이', hint:'예쁜 튤립이 세 송이 있어요!' }
    ],
    think: [
      { id:'qb_S1_T01', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🍎, 🍊, 🍎, 🍊, ?]', visual:{type:'pattern',items:['🍎','🍊','🍎','🍊','?']}, options:['🍎','🍊','🍇'], correctAnswer:'🍎', hint:'사과, 오렌지가 번갈아가며 나와요!' },
      { id:'qb_S1_T02', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🌸, 🌻, 🌸, 🌻, ?]', visual:{type:'pattern',items:['🌸','🌻','🌸','🌻','?']}, options:['🌸','🌻','🌹'], correctAnswer:'🌸', hint:'분홍꽃, 해바라기가 반복되고 있어요!' },
      { id:'qb_S1_T03', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🍅, 🍅, 🥦, 🍅, 🍅, ?]', visual:{type:'pattern',items:['🍅','🍅','🥦','🍅','🍅','?']}, options:['🍅','🥦','🌽'], correctAnswer:'🥦', hint:'토마토가 두 번 나오면 브로콜리가 나와요!' },
      { id:'qb_S1_T04', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [⭐, 🌙, ⭐, 🌙, ?]', visual:{type:'pattern',items:['⭐','🌙','⭐','🌙','?']}, options:['⭐','🌙','☀️'], correctAnswer:'⭐', hint:'별과 달이 번갈아가며 나타나요!' },
      { id:'qb_S1_T05', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🔴, 🔵, 🔴, 🔵, ?]', visual:{type:'pattern',items:['🔴','🔵','🔴','🔵','?']}, options:['🔴','🔵','🟡'], correctAnswer:'🔴', hint:'빨강, 파랑이 반복되고 있어요!' },
      { id:'qb_S1_T06', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🐱, 🐶, 🐱, 🐶, ?]', visual:{type:'pattern',items:['🐱','🐶','🐱','🐶','?']}, options:['🐱','🐶','🐰'], correctAnswer:'🐱', hint:'고양이, 강아지 순서로 반복해요!' },
      { id:'qb_S1_T07', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🍎, 🍎, 🍌, 🍎, 🍎, ?]', visual:{type:'pattern',items:['🍎','🍎','🍌','🍎','🍎','?']}, options:['🍎','🍌','🍇'], correctAnswer:'🍌', hint:'사과 두 개 다음에 바나나가 한 개씩 나와요!' },
      { id:'qb_S1_T08', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🔵, 🔴, 🔵, 🔴, ?]', visual:{type:'pattern',items:['🔵','🔴','🔵','🔴','?']}, options:['🔵','🔴','🟢'], correctAnswer:'🔵', hint:'파랑, 빨강 순서로 번갈아가며 반복해요!' },
      { id:'qb_S1_T09', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🌷, 🌻, 🌷, 🌻, ?]', visual:{type:'pattern',items:['🌷','🌻','🌷','🌻','?']}, options:['🌷','🌻','🌺'], correctAnswer:'🌷', hint:'튤립과 해바라기가 순서대로 반복돼요!' },
      { id:'qb_S1_T10', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🐟, 🐟, 🐙, 🐟, 🐟, ?]', visual:{type:'pattern',items:['🐟','🐟','🐙','🐟','🐟','?']}, options:['🐟','🐙','🦀'], correctAnswer:'🐙', hint:'물고기 두 마리 다음에 문어가 나오고 있어요!' },
      { id:'qb_S1_T11', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🚗, 🚌, 🚗, 🚌, ?]', visual:{type:'pattern',items:['🚗','🚌','🚗','🚌','?']}, options:['🚗','🚌','🚂'], correctAnswer:'🚗', hint:'자동차와 버스가 번갈아 나와요!' },
      { id:'qb_S1_T12', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🍪, 🍩, 🍪, 🍩, ?]', visual:{type:'pattern',items:['🍪','🍩','🍪','🍩','?']}, options:['🍪','🍩','🍰'], correctAnswer:'🍪', hint:'쿠키와 도넛이 차례차례 반복되고 있어요!' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // Stage 2: 만 4세 심화 (5~10 세기, 많고 적음, 간단한 덧뺄셈 개념)
  // ═══════════════════════════════════════════════════════
  2: {
    concept: [
      { id:'qb_S2_C01', questionText:'🐰는 모두 몇 마리일까요?', visual:{type:'emoji',count:7,item:'🐰'}, options:['6','7','8'], correctAnswer:'7', hint:'하나씩 짚으며 일곱까지 세어보세요!' },
      { id:'qb_S2_C02', questionText:'🍊는 모두 몇 개일까요?', visual:{type:'emoji',count:8,item:'🍊'}, options:['7','8','9'], correctAnswer:'8', hint:'오렌지를 한 개씩 여덟까지 세어봐요!' },
      { id:'qb_S2_C03', questionText:'🐼는 모두 몇 마리일까요?', visual:{type:'emoji',count:6,item:'🐼'}, options:['5','6','7'], correctAnswer:'6', hint:'판다를 천천히 세어보세요. 여섯 마리예요!' },
      { id:'qb_S2_C04', questionText:'🦊는 모두 몇 마리일까요?', visual:{type:'emoji',count:9,item:'🦊'}, options:['8','9','10'], correctAnswer:'9', hint:'여우를 끝까지 세어보면 아홉 마리예요!' },
      { id:'qb_S2_C05', questionText:'🍇는 모두 몇 송이일까요?', visual:{type:'emoji',count:5,item:'🍇'}, options:['4','5','6'], correctAnswer:'5', hint:'포도를 다섯까지 세어봐요!' },
      { id:'qb_S2_C06', questionText:'빨간 상자 🔴와 파란 상자 🔵 중 별이 더 많은 곳은?', visual:{type:'math',formula:'🔴 ⭐⭐⭐⭐⭐⭐  |  🔵 ⭐⭐⭐⭐'}, options:['🔴','🔵'], correctAnswer:'🔴', hint:'별을 각각 세어 비교해보세요. 빨간 상자가 더 많아요!' },
      { id:'qb_S2_C07', questionText:'어느 쪽에 하트가 더 많을까요?', visual:{type:'math',formula:'왼쪽 ❤️❤️❤️  |  오른쪽 ❤️❤️❤️❤️❤️'}, options:['왼쪽','오른쪽'], correctAnswer:'오른쪽', hint:'오른쪽에 하트가 다섯 개로 더 많아요!' },
      { id:'qb_S2_C08', questionText:'🌺는 모두 몇 송이일까요?', visual:{type:'emoji',count:7,item:'🌺'}, options:['6','7','8'], correctAnswer:'7', hint:'꽃을 하나씩 세어보면 일곱 송이예요!' },
      { id:'qb_S2_C09', questionText:'🐠는 모두 몇 마리일까요?', visual:{type:'emoji',count:8,item:'🐠'}, options:['7','8','9'], correctAnswer:'8', hint:'열대어를 세어보세요. 여덟 마리예요!' },
      { id:'qb_S2_C10', questionText:'어느 바구니에 사과가 더 적을까요?', visual:{type:'math',formula:'🧺A 🍎🍎🍎🍎🍎🍎🍎  |  🧺B 🍎🍎🍎🍎🍎'}, options:['🧺A','🧺B'], correctAnswer:'🧺B', hint:'B 바구니에 사과가 5개로 더 적어요!' },
      { id:'qb_S2_C11', questionText:'🎈는 모두 몇 개일까요?', visual:{type:'emoji',count:6,item:'🎈'}, options:['5','6','7'], correctAnswer:'6', hint:'풍선을 하나씩 세어보면 여섯 개예요!' },
      { id:'qb_S2_C12', questionText:'🍭는 모두 몇 개일까요?', visual:{type:'emoji',count:9,item:'🍭'}, options:['8','9','10'], correctAnswer:'9', hint:'사탕을 아홉까지 세어봐요!' },
      { id:'qb_S2_C13', questionText:'🐝는 모두 몇 마리일까요?', visual:{type:'emoji',count:5,item:'🐝'}, options:['4','5','6'], correctAnswer:'5', hint:'꿀벌을 다섯 마리까지 세어봐요!' },
      { id:'qb_S2_C14', questionText:'🎵는 모두 몇 개일까요?', visual:{type:'emoji',count:7,item:'🎵'}, options:['6','7','8'], correctAnswer:'7', hint:'음표를 일곱까지 세어보세요!' },
      { id:'qb_S2_C15', questionText:'어느 쪽에 별이 더 많을까요?', visual:{type:'math',formula:'A팀 ⭐⭐⭐⭐⭐⭐  |  B팀 ⭐⭐⭐⭐⭐⭐⭐⭐'}, options:['A팀','B팀'], correctAnswer:'B팀', hint:'B팀이 별 8개로 더 많아요!' },
      { id:'qb_S2_C16', questionText:'🍉는 모두 몇 조각일까요?', visual:{type:'emoji',count:6,item:'🍉'}, options:['5','6','7'], correctAnswer:'6', hint:'수박을 천천히 세어보면 여섯 조각이에요!' }
    ],
    apply: [
      { id:'qb_S2_A01', questionText:'곰돌이가 쿠키 6개를 구웠는데 2개를 먹었어요. 남은 쿠키는 몇 개일까요?', visual:{type:'emoji',count:6,item:'🍪'}, options:['3','4','5'], correctAnswer:'4', hint:'6개에서 먹은 2개를 빼보세요!' },
      { id:'qb_S2_A02', questionText:'다람쥐가 도토리를 아침에 4개, 점심에 3개 주웠어요. 모두 몇 개일까요?', visual:{type:'math',formula:'4 + 3 = ?'}, options:['6','7','8'], correctAnswer:'7', hint:'4와 3을 합하면 7이에요!' },
      { id:'qb_S2_A03', questionText:'접시에 사과 5개가 있었는데 1개를 친구에게 줬어요. 남은 사과는?', visual:{type:'emoji',count:5,item:'🍎'}, options:['3','4','5'], correctAnswer:'4', hint:'5에서 1을 빼면 4개가 남아요!' },
      { id:'qb_S2_A04', questionText:'토끼가 당근을 5개 갖고 있고 3개를 더 받았어요. 모두 몇 개일까요?', visual:{type:'math',formula:'5 + 3 = ?'}, options:['7','8','9'], correctAnswer:'8', hint:'5에 3을 더하면 8이에요!' },
      { id:'qb_S2_A05', questionText:'바구니에 귤 7개가 있었는데 2개를 먹었어요. 남은 귤은?', visual:{type:'emoji',count:7,item:'🍊'}, options:['4','5','6'], correctAnswer:'5', hint:'7에서 2를 빼면 5개예요!' },
      { id:'qb_S2_A06', questionText:'연못에 오리 3마리가 있었는데 4마리가 더 왔어요. 모두 몇 마리?', visual:{type:'math',formula:'3 + 4 = ?'}, options:['6','7','8'], correctAnswer:'7', hint:'3과 4를 합치면 7이에요!' },
      { id:'qb_S2_A07', questionText:'케이크 8조각 중 3조각을 먹었어요. 남은 조각은?', visual:{type:'emoji',count:8,item:'🍰'}, options:['4','5','6'], correctAnswer:'5', hint:'8에서 3을 빼면 5조각이에요!' },
      { id:'qb_S2_A08', questionText:'꽃밭에 꽃이 6송이 있고 2송이가 더 피었어요. 모두 몇 송이?', visual:{type:'math',formula:'6 + 2 = ?'}, options:['7','8','9'], correctAnswer:'8', hint:'6에 2를 더하면 8이에요!' },
      { id:'qb_S2_A09', questionText:'사탕 9개 중 4개를 먹었어요. 남은 사탕은?', visual:{type:'emoji',count:9,item:'🍬'}, options:['4','5','6'], correctAnswer:'5', hint:'9에서 4를 빼면 5개예요!' },
      { id:'qb_S2_A10', questionText:'새 5마리가 나무에 앉아있고 2마리가 더 날아왔어요. 모두 몇 마리?', visual:{type:'math',formula:'5 + 2 = ?'}, options:['6','7','8'], correctAnswer:'7', hint:'5와 2를 합하면 7이에요!' },
      { id:'qb_S2_A11', questionText:'풍선 8개 중 1개가 터졌어요. 남은 풍선은?', visual:{type:'emoji',count:8,item:'🎈'}, options:['6','7','8'], correctAnswer:'7', hint:'8에서 1을 빼면 7개예요!' },
      { id:'qb_S2_A12', questionText:'나비 4마리가 있었는데 5마리가 더 왔어요. 모두 몇 마리?', visual:{type:'math',formula:'4 + 5 = ?'}, options:['8','9','10'], correctAnswer:'9', hint:'4에 5를 더하면 9예요!' }
    ],
    think: [
      { id:'qb_S2_T01', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🥕, 🍅, 🍅, 🥕, 🍅, ?]', visual:{type:'pattern',items:['🥕','🍅','🍅','🥕','🍅','?']}, options:['🥕','🍅','🍇'], correctAnswer:'🍅', hint:'당근 하나, 토마토 둘이 반복되고 있어요!' },
      { id:'qb_S2_T02', questionText:'사과를 가장 많이 가진 동물은 누구일까요?', visual:{type:'math',formula:'🐻 🍎  |  🐰 🍎🍎🍎  |  🐱 🍎🍎'}, options:['🐻','🐰','🐱'], correctAnswer:'🐰', hint:'토끼가 사과 3개로 가장 많아요!' },
      { id:'qb_S2_T03', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🔵, 🔵, 🔴, 🔵, 🔵, ?]', visual:{type:'pattern',items:['🔵','🔵','🔴','🔵','🔵','?']}, options:['🔵','🔴','🟡'], correctAnswer:'🔴', hint:'파란 공 두 개 다음에 빨간 공이 나와요!' },
      { id:'qb_S2_T04', questionText:'별을 가장 적게 가진 친구는?', visual:{type:'math',formula:'민수 ⭐⭐⭐⭐  |  지유 ⭐⭐  |  서준 ⭐⭐⭐'}, options:['민수','지유','서준'], correctAnswer:'지유', hint:'지유가 별 2개로 가장 적어요!' },
      { id:'qb_S2_T05', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🐱, 🐶, 🐶, 🐱, 🐶, ?]', visual:{type:'pattern',items:['🐱','🐶','🐶','🐱','🐶','?']}, options:['🐱','🐶','🐰'], correctAnswer:'🐶', hint:'고양이 하나, 강아지 둘이 반복되고 있어요!' },
      { id:'qb_S2_T06', questionText:'하트를 가장 많이 가진 상자는?', visual:{type:'math',formula:'A상자 ❤️❤️❤️  |  B상자 ❤️❤️❤️❤️❤️  |  C상자 ❤️❤️'}, options:['A상자','B상자','C상자'], correctAnswer:'B상자', hint:'B상자에 하트 5개로 가장 많아요!' },
      { id:'qb_S2_T07', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🌸, 🌸, 🌻, 🌸, 🌸, ?]', visual:{type:'pattern',items:['🌸','🌸','🌻','🌸','🌸','?']}, options:['🌸','🌻','🌹'], correctAnswer:'🌻', hint:'분홍꽃 두 송이 다음에 해바라기가 나와요!' },
      { id:'qb_S2_T08', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🍌, 🍎, 🍌, 🍎, ?]', visual:{type:'pattern',items:['🍌','🍎','🍌','🍎','?']}, options:['🍌','🍎','🍊'], correctAnswer:'🍌', hint:'바나나와 사과가 번갈아 나와요!' },
      { id:'qb_S2_T09', questionText:'구슬을 가장 많이 가진 아이는?', visual:{type:'math',formula:'영희 🔵🔵🔵🔵🔵🔵  |  철수 🔵🔵🔵  |  민지 🔵🔵🔵🔵'}, options:['영희','철수','민지'], correctAnswer:'영희', hint:'영희가 구슬 6개로 가장 많아요!' },
      { id:'qb_S2_T10', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [⭐, 🌙, 🌙, ⭐, 🌙, ?]', visual:{type:'pattern',items:['⭐','🌙','🌙','⭐','🌙','?']}, options:['⭐','🌙','☀️'], correctAnswer:'🌙', hint:'별 하나, 달 둘이 반복되고 있어요!' },
      { id:'qb_S2_T11', questionText:'과일을 가장 적게 가진 바구니는?', visual:{type:'math',formula:'A 🍎🍎🍎🍎  |  B 🍎🍎🍎🍎🍎🍎  |  C 🍎🍎🍎'}, options:['A바구니','B바구니','C바구니'], correctAnswer:'C바구니', hint:'C바구니에 사과 3개로 가장 적어요!' },
      { id:'qb_S2_T12', questionText:'빈칸 ?에 들어갈 것을 골라보세요. [🚗, 🚌, 🚌, 🚗, 🚌, ?]', visual:{type:'pattern',items:['🚗','🚌','🚌','🚗','🚌','?']}, options:['🚗','🚌','🚂'], correctAnswer:'🚌', hint:'자동차 하나, 버스 둘이 반복되고 있어요!' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // Stage 3: 만 5세 (10 이내 덧뺄셈, 모으기/가르기, 시계)
  // ═══════════════════════════════════════════════════════
  3: {
    concept: [
      { id:'qb_S3_C01', questionText:'3과 4를 모으면 얼마가 될까요?', visual:{type:'math',formula:'3 ⊕ 4 = ?'}, options:['6','7','8'], correctAnswer:'7', hint:'3에 4를 더하면 7이에요!' },
      { id:'qb_S3_C02', questionText:'5와 3을 모으면 얼마가 될까요?', visual:{type:'math',formula:'5 ⊕ 3 = ?'}, options:['7','8','9'], correctAnswer:'8', hint:'5에 3을 보태면 8이에요!' },
      { id:'qb_S3_C03', questionText:'2와 6을 모으면 얼마가 될까요?', visual:{type:'math',formula:'2 ⊕ 6 = ?'}, options:['7','8','9'], correctAnswer:'8', hint:'2와 6을 합치면 8이에요!' },
      { id:'qb_S3_C04', questionText:'4와 4를 모으면 얼마가 될까요?', visual:{type:'math',formula:'4 ⊕ 4 = ?'}, options:['7','8','9'], correctAnswer:'8', hint:'4 더하기 4는 8이에요!' },
      { id:'qb_S3_C05', questionText:'숫자 7을 3과 다른 숫자로 가르면? 다른 숫자는?', visual:{type:'math',formula:'7 ➔ 3 와 ?'}, options:['3','4','5'], correctAnswer:'4', hint:'7에서 3을 빼면 4가 남아요!' },
      { id:'qb_S3_C06', questionText:'숫자 9를 5와 다른 숫자로 가르면? 다른 숫자는?', visual:{type:'math',formula:'9 ➔ 5 와 ?'}, options:['3','4','5'], correctAnswer:'4', hint:'9에서 5를 빼면 4예요!' },
      { id:'qb_S3_C07', questionText:'숫자 8을 3과 다른 숫자로 가르면? 다른 숫자는?', visual:{type:'math',formula:'8 ➔ 3 와 ?'}, options:['4','5','6'], correctAnswer:'5', hint:'8에서 3을 빼면 5가 남아요!' },
      { id:'qb_S3_C08', questionText:'숫자 6을 4와 다른 숫자로 가르면? 다른 숫자는?', visual:{type:'math',formula:'6 ➔ 4 와 ?'}, options:['1','2','3'], correctAnswer:'2', hint:'6에서 4를 빼면 2예요!' },
      { id:'qb_S3_C09', questionText:'2와 5를 모으면 얼마가 될까요?', visual:{type:'math',formula:'2 ⊕ 5 = ?'}, options:['6','7','8'], correctAnswer:'7', hint:'2에 5를 더하면 7이에요!' },
      { id:'qb_S3_C10', questionText:'숫자 10을 6과 다른 숫자로 가르면?', visual:{type:'math',formula:'10 ➔ 6 와 ?'}, options:['3','4','5'], correctAnswer:'4', hint:'10에서 6을 빼면 4예요!' },
      { id:'qb_S3_C11', questionText:'3과 5를 모으면 얼마가 될까요?', visual:{type:'math',formula:'3 ⊕ 5 = ?'}, options:['7','8','9'], correctAnswer:'8', hint:'3에 5를 보태면 8이에요!' },
      { id:'qb_S3_C12', questionText:'숫자 9를 2와 다른 숫자로 가르면?', visual:{type:'math',formula:'9 ➔ 2 와 ?'}, options:['6','7','8'], correctAnswer:'7', hint:'9에서 2를 빼면 7이에요!' },
      { id:'qb_S3_C13', questionText:'4와 5를 모으면 얼마가 될까요?', visual:{type:'math',formula:'4 ⊕ 5 = ?'}, options:['8','9','10'], correctAnswer:'9', hint:'4에 5를 더하면 9예요!' },
      { id:'qb_S3_C14', questionText:'숫자 8을 6과 다른 숫자로 가르면?', visual:{type:'math',formula:'8 ➔ 6 와 ?'}, options:['1','2','3'], correctAnswer:'2', hint:'8에서 6을 빼면 2예요!' },
      { id:'qb_S3_C15', questionText:'5와 5를 모으면 얼마가 될까요?', visual:{type:'math',formula:'5 ⊕ 5 = ?'}, options:['9','10','11'], correctAnswer:'10', hint:'5 더하기 5는 10이에요!' },
      { id:'qb_S3_C16', questionText:'숫자 7을 4와 다른 숫자로 가르면?', visual:{type:'math',formula:'7 ➔ 4 와 ?'}, options:['2','3','4'], correctAnswer:'3', hint:'7에서 4를 빼면 3이에요!' }
    ],
    apply: [
      { id:'qb_S3_A01', questionText:'시계가 가리키는 시각은 몇 시일까요?', visual:{type:'clock',hour:3,minute:0}, options:['2시','3시','4시'], correctAnswer:'3시', hint:'짧은 바늘이 3을 가리키고 있어요!' },
      { id:'qb_S3_A02', questionText:'시계가 가리키는 시각은 몇 시일까요?', visual:{type:'clock',hour:7,minute:0}, options:['6시','7시','8시'], correctAnswer:'7시', hint:'짧은 바늘이 7을 가리키고 있어요!' },
      { id:'qb_S3_A03', questionText:'시계가 가리키는 시각은 몇 시 몇 분일까요?', visual:{type:'clock',hour:4,minute:30}, options:['4시 00분','4시 30분','5시 00분'], correctAnswer:'4시 30분', hint:'짧은 바늘이 4와 5 사이, 긴 바늘이 6을 가리켜요!' },
      { id:'qb_S3_A04', questionText:'시계가 가리키는 시각은 몇 시일까요?', visual:{type:'clock',hour:12,minute:0}, options:['11시','12시','1시'], correctAnswer:'12시', hint:'짧은 바늘이 12를 가리키고 있어요!' },
      { id:'qb_S3_A05', questionText:'사과 6개 중 2개를 먹으면 남는 사과는?', visual:{type:'math',formula:'6 - 2 = ?'}, options:['3','4','5'], correctAnswer:'4', hint:'6에서 2를 빼면 4개예요!' },
      { id:'qb_S3_A06', questionText:'연필 3자루와 4자루를 합하면 몇 자루?', visual:{type:'math',formula:'3 + 4 = ?'}, options:['6','7','8'], correctAnswer:'7', hint:'3과 4를 합하면 7이에요!' },
      { id:'qb_S3_A07', questionText:'시계가 가리키는 시각은 몇 시 몇 분일까요?', visual:{type:'clock',hour:6,minute:30}, options:['6시 00분','6시 30분','7시 00분'], correctAnswer:'6시 30분', hint:'긴 바늘이 6을 가리키면 30분이에요!' },
      { id:'qb_S3_A08', questionText:'풍선 8개 중 3개가 터졌어요. 남은 풍선은?', visual:{type:'math',formula:'8 - 3 = ?'}, options:['4','5','6'], correctAnswer:'5', hint:'8에서 3을 빼면 5개예요!' },
      { id:'qb_S3_A09', questionText:'시계가 가리키는 시각은 몇 시일까요?', visual:{type:'clock',hour:9,minute:0}, options:['8시','9시','10시'], correctAnswer:'9시', hint:'짧은 바늘이 9를 가리키고 있어요!' },
      { id:'qb_S3_A10', questionText:'구슬 5개와 4개를 합하면 몇 개?', visual:{type:'math',formula:'5 + 4 = ?'}, options:['8','9','10'], correctAnswer:'9', hint:'5에 4를 더하면 9예요!' },
      { id:'qb_S3_A11', questionText:'색종이 10장 중 7장을 사용했어요. 남은 장수는?', visual:{type:'math',formula:'10 - 7 = ?'}, options:['2','3','4'], correctAnswer:'3', hint:'10에서 7을 빼면 3장이에요!' },
      { id:'qb_S3_A12', questionText:'시계가 가리키는 시각은 몇 시 몇 분일까요?', visual:{type:'clock',hour:2,minute:30}, options:['2시 00분','2시 30분','3시 00분'], correctAnswer:'2시 30분', hint:'짧은 바늘이 2와 3 사이, 긴 바늘이 6이에요!' }
    ],
    think: [
      { id:'qb_S3_T01', questionText:'도토리를 채워 10개를 만들고 싶어요. 이미 3개가 있다면 몇 개가 더 필요할까요?', visual:{type:'math',formula:'3 + ? = 10'}, options:['6','7','8'], correctAnswer:'7', hint:'10에서 3을 빼면 7이에요!' },
      { id:'qb_S3_T02', questionText:'새가 3마리 앉아있어요. 새 다리는 모두 몇 개일까요?', visual:{type:'emoji',count:3,item:'🐦'}, options:['4','6','8'], correctAnswer:'6', hint:'새 한 마리에 다리가 2개씩이에요!' },
      { id:'qb_S3_T03', questionText:'상자에 사탕을 넣어 10개를 만들려해요. 이미 6개가 있으면 몇 개 더?', visual:{type:'math',formula:'6 + ? = 10'}, options:['3','4','5'], correctAnswer:'4', hint:'10에서 6을 빼면 4예요!' },
      { id:'qb_S3_T04', questionText:'고양이가 4마리 있어요. 다리는 모두 몇 개일까요?', visual:{type:'emoji',count:4,item:'🐱'}, options:['12','16','20'], correctAnswer:'16', hint:'고양이 한 마리에 다리가 4개씩이에요!' },
      { id:'qb_S3_T05', questionText:'10개를 만들려면 8개에서 몇 개가 더 필요할까요?', visual:{type:'math',formula:'8 + ? = 10'}, options:['1','2','3'], correctAnswer:'2', hint:'10에서 8을 빼면 2예요!' },
      { id:'qb_S3_T06', questionText:'자전거가 3대 있어요. 바퀴는 모두 몇 개일까요?', visual:{type:'emoji',count:3,item:'🚲'}, options:['4','6','8'], correctAnswer:'6', hint:'자전거 한 대에 바퀴가 2개씩이에요!' },
      { id:'qb_S3_T07', questionText:'10개를 만들려면 5개에서 몇 개가 더 필요할까요?', visual:{type:'math',formula:'5 + ? = 10'}, options:['4','5','6'], correctAnswer:'5', hint:'10에서 5를 빼면 5예요!' },
      { id:'qb_S3_T08', questionText:'새가 5마리 있어요. 새 다리는 모두 몇 개일까요?', visual:{type:'emoji',count:5,item:'🐦'}, options:['8','10','12'], correctAnswer:'10', hint:'새 한 마리에 다리가 2개씩! 5×2=10!' },
      { id:'qb_S3_T09', questionText:'10개를 만들려면 2개에서 몇 개가 더 필요할까요?', visual:{type:'math',formula:'2 + ? = 10'}, options:['7','8','9'], correctAnswer:'8', hint:'10에서 2를 빼면 8이에요!' },
      { id:'qb_S3_T10', questionText:'강아지가 2마리 있어요. 다리는 모두 몇 개일까요?', visual:{type:'emoji',count:2,item:'🐶'}, options:['6','8','10'], correctAnswer:'8', hint:'강아지 한 마리에 다리가 4개씩이에요!' },
      { id:'qb_S3_T11', questionText:'10개를 만들려면 4개에서 몇 개가 더 필요할까요?', visual:{type:'math',formula:'4 + ? = 10'}, options:['5','6','7'], correctAnswer:'6', hint:'10에서 4를 빼면 6이에요!' },
      { id:'qb_S3_T12', questionText:'오토바이가 4대 있어요. 바퀴는 모두 몇 개일까요?', visual:{type:'emoji',count:4,item:'🏍️'}, options:['6','8','10'], correctAnswer:'8', hint:'오토바이 한 대에 바퀴가 2개씩! 4×2=8!' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // Stage 4: 초등 1학년 (50 이내 덧뺄셈, 자릿값, 비교)
  // ═══════════════════════════════════════════════════════
  4: {
    concept: [
      { id:'qb_S4_C01', questionText:'덧셈을 해보세요. 12 + 5 = ?', visual:{type:'math',formula:'12 + 5 = ?'}, options:['16','17','18'], correctAnswer:'17', hint:'12에 5를 더하면 17이에요!' },
      { id:'qb_S4_C02', questionText:'뺄셈을 해보세요. 18 - 6 = ?', visual:{type:'math',formula:'18 - 6 = ?'}, options:['11','12','13'], correctAnswer:'12', hint:'18에서 6을 빼면 12예요!' },
      { id:'qb_S4_C03', questionText:'덧셈을 해보세요. 7 + 8 = ?', visual:{type:'math',formula:'7 + 8 = ?'}, options:['14','15','16'], correctAnswer:'15', hint:'7에 8을 더하면 15예요!' },
      { id:'qb_S4_C04', questionText:'뺄셈을 해보세요. 15 - 7 = ?', visual:{type:'math',formula:'15 - 7 = ?'}, options:['7','8','9'], correctAnswer:'8', hint:'15에서 7을 빼면 8이에요!' },
      { id:'qb_S4_C05', questionText:'십의 자리가 3이고 일의 자리가 5인 숫자는?', visual:{type:'math',formula:'[십의자리: 3, 일의자리: 5]'}, options:['35','53','305'], correctAnswer:'35', hint:'십의 자리를 왼쪽, 일의 자리를 오른쪽에 놓아요!' },
      { id:'qb_S4_C06', questionText:'덧셈을 해보세요. 24 + 13 = ?', visual:{type:'math',formula:'24 + 13 = ?'}, options:['36','37','38'], correctAnswer:'37', hint:'24에 13을 더하면 37이에요!' },
      { id:'qb_S4_C07', questionText:'뺄셈을 해보세요. 30 - 14 = ?', visual:{type:'math',formula:'30 - 14 = ?'}, options:['15','16','17'], correctAnswer:'16', hint:'30에서 14를 빼면 16이에요!' },
      { id:'qb_S4_C08', questionText:'십의 자리가 6이고 일의 자리가 2인 숫자는?', visual:{type:'math',formula:'[십의자리: 6, 일의자리: 2]'}, options:['26','62','602'], correctAnswer:'62', hint:'6을 왼쪽(십의자리), 2를 오른쪽(일의자리)에 놓아요!' },
      { id:'qb_S4_C09', questionText:'덧셈을 해보세요. 9 + 6 = ?', visual:{type:'math',formula:'9 + 6 = ?'}, options:['14','15','16'], correctAnswer:'15', hint:'9에 1을 더하면 10, 나머지 5를 더하면 15!' },
      { id:'qb_S4_C10', questionText:'뺄셈을 해보세요. 23 - 8 = ?', visual:{type:'math',formula:'23 - 8 = ?'}, options:['14','15','16'], correctAnswer:'15', hint:'23에서 8을 빼면 15예요!' },
      { id:'qb_S4_C11', questionText:'덧셈을 해보세요. 17 + 9 = ?', visual:{type:'math',formula:'17 + 9 = ?'}, options:['25','26','27'], correctAnswer:'26', hint:'17에 3을 더하면 20, 나머지 6을 더하면 26!' },
      { id:'qb_S4_C12', questionText:'뺄셈을 해보세요. 42 - 15 = ?', visual:{type:'math',formula:'42 - 15 = ?'}, options:['26','27','28'], correctAnswer:'27', hint:'42에서 15를 빼면 27이에요!' },
      { id:'qb_S4_C13', questionText:'십의 자리가 4이고 일의 자리가 7인 숫자는?', visual:{type:'math',formula:'[십의자리: 4, 일의자리: 7]'}, options:['47','74','407'], correctAnswer:'47', hint:'4를 왼쪽, 7을 오른쪽에 놓으면 47이에요!' },
      { id:'qb_S4_C14', questionText:'덧셈을 해보세요. 35 + 8 = ?', visual:{type:'math',formula:'35 + 8 = ?'}, options:['42','43','44'], correctAnswer:'43', hint:'35에 5를 더하면 40, 나머지 3을 더하면 43!' },
      { id:'qb_S4_C15', questionText:'뺄셈을 해보세요. 31 - 12 = ?', visual:{type:'math',formula:'31 - 12 = ?'}, options:['18','19','20'], correctAnswer:'19', hint:'31에서 12를 빼면 19예요!' },
      { id:'qb_S4_C16', questionText:'덧셈을 해보세요. 28 + 14 = ?', visual:{type:'math',formula:'28 + 14 = ?'}, options:['41','42','43'], correctAnswer:'42', hint:'28에 2를 더하면 30, 나머지 12를 더하면 42!' }
    ],
    apply: [
      { id:'qb_S4_A01', questionText:'하늘이에겐 구슬이 25개, 지석이에겐 18개 있어요. 누가 더 많을까요?', visual:{type:'math',formula:'25 vs 18'}, options:['하늘이','지석이','같아요'], correctAnswer:'하늘이', hint:'25가 18보다 크니까 하늘이가 더 많아요!' },
      { id:'qb_S4_A02', questionText:'가구 15도토리짜리와 코스튬 8도토리짜리를 사면 모두 얼마?', visual:{type:'math',formula:'15 + 8 = ?'}, options:['22개','23개','24개'], correctAnswer:'23개', hint:'15에 8을 더하면 23이에요!' },
      { id:'qb_S4_A03', questionText:'빵 27개 중 13개를 친구들에게 나눠줬어요. 남은 빵은?', visual:{type:'math',formula:'27 - 13 = ?'}, options:['13개','14개','15개'], correctAnswer:'14개', hint:'27에서 13을 빼면 14예요!' },
      { id:'qb_S4_A04', questionText:'더 큰 숫자를 골라보세요.', visual:{type:'math',formula:'38 vs 45'}, options:['38','45','같아요'], correctAnswer:'45', hint:'십의 자리 4가 3보다 크니까 45가 더 커요!' },
      { id:'qb_S4_A05', questionText:'연필 16자루와 지우개 9개를 사면 물건은 모두 몇 개?', visual:{type:'math',formula:'16 + 9 = ?'}, options:['24개','25개','26개'], correctAnswer:'25개', hint:'16에 9를 더하면 25예요!' },
      { id:'qb_S4_A06', questionText:'사탕 34개에서 17개를 먹으면 남은 사탕은?', visual:{type:'math',formula:'34 - 17 = ?'}, options:['16개','17개','18개'], correctAnswer:'17개', hint:'34에서 17을 빼면 17이에요!' },
      { id:'qb_S4_A07', questionText:'더 큰 숫자를 골라보세요.', visual:{type:'math',formula:'50 vs 48'}, options:['50','48','같아요'], correctAnswer:'50', hint:'50이 48보다 2만큼 더 커요!' },
      { id:'qb_S4_A08', questionText:'도서관에 책이 23권 있었는데 11권이 더 들어왔어요. 모두 몇 권?', visual:{type:'math',formula:'23 + 11 = ?'}, options:['33권','34권','35권'], correctAnswer:'34권', hint:'23에 11을 더하면 34예요!' },
      { id:'qb_S4_A09', questionText:'색연필 40자루 중 22자루를 사용했어요. 남은 색연필은?', visual:{type:'math',formula:'40 - 22 = ?'}, options:['17자루','18자루','19자루'], correctAnswer:'18자루', hint:'40에서 22를 빼면 18이에요!' },
      { id:'qb_S4_A10', questionText:'더 큰 숫자를 골라보세요.', visual:{type:'math',formula:'29 vs 32'}, options:['29','32','같아요'], correctAnswer:'32', hint:'32가 29보다 3만큼 더 커요!' },
      { id:'qb_S4_A11', questionText:'축구공 18개와 농구공 14개가 있어요. 모두 몇 개?', visual:{type:'math',formula:'18 + 14 = ?'}, options:['31개','32개','33개'], correctAnswer:'32개', hint:'18에 14를 더하면 32예요!' },
      { id:'qb_S4_A12', questionText:'풍선 45개 중 28개가 터졌어요. 남은 풍선은?', visual:{type:'math',formula:'45 - 28 = ?'}, options:['16개','17개','18개'], correctAnswer:'17개', hint:'45에서 28을 빼면 17이에요!' }
    ],
    think: [
      { id:'qb_S4_T01', questionText:'빈 상자 ? 안에 들어갈 숫자는? [ ? + 6 = 14 ]', visual:{type:'math',formula:'? + 6 = 14'}, options:['7','8','9'], correctAnswer:'8', hint:'14에서 6을 빼면 답이 나와요!' },
      { id:'qb_S4_T02', questionText:'빈 상자 ? 안에 들어갈 숫자는? [ ? + 5 = 12 ]', visual:{type:'math',formula:'? + 5 = 12'}, options:['6','7','8'], correctAnswer:'7', hint:'12에서 5를 빼면 7이에요!' },
      { id:'qb_S4_T03', questionText:'빈 상자 ? 안에 들어갈 숫자는? [ 20 - ? = 13 ]', visual:{type:'math',formula:'20 - ? = 13'}, options:['6','7','8'], correctAnswer:'7', hint:'20에서 13을 빼면 ?를 알 수 있어요!' },
      { id:'qb_S4_T04', questionText:'식 [ 9 - ? > 3 ] 에서 물음표에 들어갈 가장 큰 수는?', visual:{type:'math',formula:'9 - ? > 3'}, options:['4','5','6'], correctAnswer:'5', hint:'9에서 빼도 3보다 커야 해요!' },
      { id:'qb_S4_T05', questionText:'빈 상자 ? 안에 들어갈 숫자는? [ ? + 9 = 17 ]', visual:{type:'math',formula:'? + 9 = 17'}, options:['7','8','9'], correctAnswer:'8', hint:'17에서 9를 빼면 8이에요!' },
      { id:'qb_S4_T06', questionText:'빈 상자 ? 안에 들어갈 숫자는? [ 25 - ? = 18 ]', visual:{type:'math',formula:'25 - ? = 18'}, options:['6','7','8'], correctAnswer:'7', hint:'25에서 18을 빼면 7이에요!' },
      { id:'qb_S4_T07', questionText:'식 [ 15 - ? > 8 ] 에서 물음표에 들어갈 가장 큰 수는?', visual:{type:'math',formula:'15 - ? > 8'}, options:['5','6','7'], correctAnswer:'6', hint:'15에서 빼도 8보다 커야 해요! 15-6=9>8!' },
      { id:'qb_S4_T08', questionText:'빈 상자 ? 안에 들어갈 숫자는? [ ? + 13 = 30 ]', visual:{type:'math',formula:'? + 13 = 30'}, options:['16','17','18'], correctAnswer:'17', hint:'30에서 13을 빼면 17이에요!' },
      { id:'qb_S4_T09', questionText:'빈 상자 ? 안에 들어갈 숫자는? [ ? - 8 = 15 ]', visual:{type:'math',formula:'? - 8 = 15'}, options:['22','23','24'], correctAnswer:'23', hint:'15에 8을 더하면 23이에요!' },
      { id:'qb_S4_T10', questionText:'빈 상자 ? 안에 들어갈 숫자는? [ 34 - ? = 19 ]', visual:{type:'math',formula:'34 - ? = 19'}, options:['14','15','16'], correctAnswer:'15', hint:'34에서 19를 빼면 15예요!' },
      { id:'qb_S4_T11', questionText:'식 [ 12 - ? > 5 ] 에서 물음표에 들어갈 가장 큰 수는?', visual:{type:'math',formula:'12 - ? > 5'}, options:['5','6','7'], correctAnswer:'6', hint:'12에서 빼도 5보다 커야 해요! 12-6=6>5!' },
      { id:'qb_S4_T12', questionText:'빈 상자 ? 안에 들어갈 숫자는? [ ? + 7 = 21 ]', visual:{type:'math',formula:'? + 7 = 21'}, options:['13','14','15'], correctAnswer:'14', hint:'21에서 7을 빼면 14예요!' }
    ]
  },

  // ═══════════════════════════════════════════════════════
  // Stage 5: 초등 2~3학년 (구구단, 나눗셈, 세자리수 연산)
  // ═══════════════════════════════════════════════════════
  5: {
    concept: [
      { id:'qb_S5_C01', questionText:'곱셈을 해보세요. 6 × 7 = ?', visual:{type:'math',formula:'6 × 7 = ?'}, options:['40','42','44'], correctAnswer:'42', hint:'6이 7번! 육칠 사십이!' },
      { id:'qb_S5_C02', questionText:'곱셈을 해보세요. 8 × 4 = ?', visual:{type:'math',formula:'8 × 4 = ?'}, options:['30','32','34'], correctAnswer:'32', hint:'8이 4번! 팔사 삼십이!' },
      { id:'qb_S5_C03', questionText:'곱셈을 해보세요. 9 × 3 = ?', visual:{type:'math',formula:'9 × 3 = ?'}, options:['25','27','29'], correctAnswer:'27', hint:'9가 3번! 구삼 이십칠!' },
      { id:'qb_S5_C04', questionText:'곱셈을 해보세요. 7 × 5 = ?', visual:{type:'math',formula:'7 × 5 = ?'}, options:['33','35','37'], correctAnswer:'35', hint:'7이 5번! 칠오 삼십오!' },
      { id:'qb_S5_C05', questionText:'귤 12개를 4바구니에 똑같이 나누면 한 바구니에 몇 개?', visual:{type:'math',formula:'12 ÷ 4 = ?'}, options:['2개','3개','4개'], correctAnswer:'3개', hint:'4 × 3 = 12이니까 3개씩이에요!' },
      { id:'qb_S5_C06', questionText:'사탕 20개를 5명이 똑같이 나누면 한 명에 몇 개?', visual:{type:'math',formula:'20 ÷ 5 = ?'}, options:['3개','4개','5개'], correctAnswer:'4개', hint:'5 × 4 = 20이니까 4개씩이에요!' },
      { id:'qb_S5_C07', questionText:'덧셈을 해보세요. 245 + 123 = ?', visual:{type:'math',formula:'245 + 123 = ?'}, options:['358','368','378'], correctAnswer:'368', hint:'일의 자리부터 차근차근 더해보세요!' },
      { id:'qb_S5_C08', questionText:'뺄셈을 해보세요. 567 - 234 = ?', visual:{type:'math',formula:'567 - 234 = ?'}, options:['323','333','343'], correctAnswer:'333', hint:'일의 자리부터 빼보세요!' },
      { id:'qb_S5_C09', questionText:'곱셈을 해보세요. 3 × 9 = ?', visual:{type:'math',formula:'3 × 9 = ?'}, options:['25','27','29'], correctAnswer:'27', hint:'3이 9번! 삼구 이십칠!' },
      { id:'qb_S5_C10', questionText:'곱셈을 해보세요. 4 × 6 = ?', visual:{type:'math',formula:'4 × 6 = ?'}, options:['22','24','26'], correctAnswer:'24', hint:'4가 6번! 사육 이십사!' },
      { id:'qb_S5_C11', questionText:'쿠키 18개를 3접시에 똑같이 나누면 한 접시에 몇 개?', visual:{type:'math',formula:'18 ÷ 3 = ?'}, options:['5개','6개','7개'], correctAnswer:'6개', hint:'3 × 6 = 18이니까 6개씩이에요!' },
      { id:'qb_S5_C12', questionText:'덧셈을 해보세요. 389 + 156 = ?', visual:{type:'math',formula:'389 + 156 = ?'}, options:['535','545','555'], correctAnswer:'545', hint:'받아올림에 주의하며 계산해보세요!' },
      { id:'qb_S5_C13', questionText:'뺄셈을 해보세요. 700 - 348 = ?', visual:{type:'math',formula:'700 - 348 = ?'}, options:['342','352','362'], correctAnswer:'352', hint:'받아내림에 주의하며 계산해보세요!' },
      { id:'qb_S5_C14', questionText:'곱셈을 해보세요. 5 × 8 = ?', visual:{type:'math',formula:'5 × 8 = ?'}, options:['38','40','42'], correctAnswer:'40', hint:'5가 8번! 오팔 사십!' },
      { id:'qb_S5_C15', questionText:'빵 24개를 6봉지에 똑같이 나누면 한 봉지에 몇 개?', visual:{type:'math',formula:'24 ÷ 6 = ?'}, options:['3개','4개','5개'], correctAnswer:'4개', hint:'6 × 4 = 24니까 4개씩이에요!' },
      { id:'qb_S5_C16', questionText:'곱셈을 해보세요. 7 × 8 = ?', visual:{type:'math',formula:'7 × 8 = ?'}, options:['54','56','58'], correctAnswer:'56', hint:'7이 8번! 칠팔 오십육!' }
    ],
    apply: [
      { id:'qb_S5_A01', questionText:'사과를 한 상자에 4개씩 담았어요. 5상자면 사과는 모두 몇 개?', visual:{type:'math',formula:'4 × 5 = ?'}, options:['18개','20개','22개'], correctAnswer:'20개', hint:'4를 5번 더하면 20이에요!' },
      { id:'qb_S5_A02', questionText:'500원 1개, 100원 3개, 10원 5개가 있어요. 모두 얼마?', visual:{type:'math',formula:'500 + 300 + 50 = ?'}, options:['800원','850원','900원'], correctAnswer:'850원', hint:'500+300=800, 800+50=850원이에요!' },
      { id:'qb_S5_A03', questionText:'연필 6자루씩 4묶음이 있어요. 연필은 모두 몇 자루?', visual:{type:'math',formula:'6 × 4 = ?'}, options:['22자루','24자루','26자루'], correctAnswer:'24자루', hint:'6을 4번 더하면 24예요!' },
      { id:'qb_S5_A04', questionText:'500원 1개, 100원 4개, 10원 7개가 있어요. 모두 얼마?', visual:{type:'math',formula:'500 + 400 + 70 = ?'}, options:['960원','970원','980원'], correctAnswer:'970원', hint:'500+400=900, 900+70=970원이에요!' },
      { id:'qb_S5_A05', questionText:'빵 3개씩 7봉지에 담았어요. 빵은 모두 몇 개?', visual:{type:'math',formula:'3 × 7 = ?'}, options:['19개','21개','23개'], correctAnswer:'21개', hint:'3이 7번! 삼칠 이십일!' },
      { id:'qb_S5_A06', questionText:'100원 5개, 10원 3개가 있어요. 모두 얼마?', visual:{type:'math',formula:'500 + 30 = ?'}, options:['520원','530원','540원'], correctAnswer:'530원', hint:'100원 5개는 500원, 10원 3개는 30원이에요!' },
      { id:'qb_S5_A07', questionText:'딸기를 한 팩에 8개씩 담았어요. 3팩이면 딸기는 모두 몇 개?', visual:{type:'math',formula:'8 × 3 = ?'}, options:['22개','24개','26개'], correctAnswer:'24개', hint:'8이 3번! 팔삼 이십사!' },
      { id:'qb_S5_A08', questionText:'도넛 5개씩 6상자가 있어요. 도넛은 모두 몇 개?', visual:{type:'math',formula:'5 × 6 = ?'}, options:['28개','30개','32개'], correctAnswer:'30개', hint:'5가 6번! 오육 삼십!' },
      { id:'qb_S5_A09', questionText:'500원 2개, 100원 3개, 10원 4개가 있어요. 모두 얼마?', visual:{type:'math',formula:'1000 + 300 + 40 = ?'}, options:['1330원','1340원','1350원'], correctAnswer:'1340원', hint:'1000+300=1300, 1300+40=1340원!' },
      { id:'qb_S5_A10', questionText:'초콜릿 9개씩 2상자가 있어요. 초콜릿은 모두 몇 개?', visual:{type:'math',formula:'9 × 2 = ?'}, options:['16개','18개','20개'], correctAnswer:'18개', hint:'9가 2번! 구이 십팔!' },
      { id:'qb_S5_A11', questionText:'귤 7개씩 4상자면 귤은 모두 몇 개?', visual:{type:'math',formula:'7 × 4 = ?'}, options:['26개','28개','30개'], correctAnswer:'28개', hint:'7이 4번! 칠사 이십팔!' },
      { id:'qb_S5_A12', questionText:'1000원 1장, 100원 2개, 10원 6개가 있어요. 모두 얼마?', visual:{type:'math',formula:'1000 + 200 + 60 = ?'}, options:['1250원','1260원','1270원'], correctAnswer:'1260원', hint:'1000+200=1200, 1200+60=1260원!' }
    ],
    think: [
      { id:'qb_S5_T01', questionText:'어떤 수에 4를 곱했더니 28이 되었어요. 어떤 수는?', visual:{type:'math',formula:'? × 4 = 28'}, options:['6','7','8'], correctAnswer:'7', hint:'구구단 4단에서 28이 되는 수를 찾아보세요!' },
      { id:'qb_S5_T02', questionText:'숫자들의 규칙을 찾아보세요. [ 2, 4, 6, 8, ? ]', visual:{type:'pattern',items:['2','4','6','8','?']}, options:['9','10','12'], correctAnswer:'10', hint:'2씩 커지고 있어요!' },
      { id:'qb_S5_T03', questionText:'어떤 수에 6을 곱했더니 42가 되었어요. 어떤 수는?', visual:{type:'math',formula:'? × 6 = 42'}, options:['6','7','8'], correctAnswer:'7', hint:'구구단 6단에서 42가 되는 수를 찾아보세요!' },
      { id:'qb_S5_T04', questionText:'숫자들의 규칙을 찾아보세요. [ 5, 10, 15, 20, ? ]', visual:{type:'pattern',items:['5','10','15','20','?']}, options:['22','25','30'], correctAnswer:'25', hint:'5씩 커지고 있어요!' },
      { id:'qb_S5_T05', questionText:'어떤 수에 3을 곱했더니 24가 되었어요. 어떤 수는?', visual:{type:'math',formula:'? × 3 = 24'}, options:['7','8','9'], correctAnswer:'8', hint:'구구단 3단에서 24가 되는 수를 찾아보세요!' },
      { id:'qb_S5_T06', questionText:'숫자들의 규칙을 찾아보세요. [ 3, 6, 12, 24, ? ]', visual:{type:'pattern',items:['3','6','12','24','?']}, options:['36','48','96'], correctAnswer:'48', hint:'이전 숫자의 2배씩 커지고 있어요!' },
      { id:'qb_S5_T07', questionText:'어떤 수에 5를 곱했더니 35가 되었어요. 어떤 수는?', visual:{type:'math',formula:'? × 5 = 35'}, options:['5','6','7'], correctAnswer:'7', hint:'구구단 5단에서 35가 되는 수를 찾아보세요!' },
      { id:'qb_S5_T08', questionText:'숫자들의 규칙을 찾아보세요. [ 10, 20, 30, 40, ? ]', visual:{type:'pattern',items:['10','20','30','40','?']}, options:['45','50','55'], correctAnswer:'50', hint:'10씩 커지고 있어요!' },
      { id:'qb_S5_T09', questionText:'어떤 수에 8을 곱했더니 48이 되었어요. 어떤 수는?', visual:{type:'math',formula:'? × 8 = 48'}, options:['5','6','7'], correctAnswer:'6', hint:'구구단 8단에서 48이 되는 수를 찾아보세요!' },
      { id:'qb_S5_T10', questionText:'숫자들의 규칙을 찾아보세요. [ 1, 2, 4, 8, ? ]', visual:{type:'pattern',items:['1','2','4','8','?']}, options:['10','12','16'], correctAnswer:'16', hint:'이전 숫자의 2배씩 커지고 있어요!' },
      { id:'qb_S5_T11', questionText:'어떤 수에 9를 곱했더니 63이 되었어요. 어떤 수는?', visual:{type:'math',formula:'? × 9 = 63'}, options:['6','7','8'], correctAnswer:'7', hint:'구구단 9단에서 63이 되는 수를 찾아보세요!' },
      { id:'qb_S5_T12', questionText:'숫자들의 규칙을 찾아보세요. [ 4, 8, 12, 16, ? ]', visual:{type:'pattern',items:['4','8','12','16','?']}, options:['18','20','24'], correctAnswer:'20', hint:'4씩 커지고 있어요!' }
    ]
  }
};

// 세션 중 이미 출제된 문제 ID를 추적하여 중복 방지
let usedQuestionIds = new Set();

/**
 * 문제 은행에서 중복 없이 문제를 뽑는 핵심 함수
 * @param {number} stage - 스테이지 번호 (1~5)
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
