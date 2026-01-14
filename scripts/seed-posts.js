// scripts/seed-posts.js
// 모든 카테고리에 샘플 포스트 생성

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cxpwlbwhacelukvpllxa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4cHdsYndoYWNlbHVrdnBsbHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzU5NTksImV4cCI6MjA4MDI1MTk1OX0.gtok46jJqAoQ3JU1Snc4m00bsmkNEuhsw3xnq6Y4yTo';

const supabase = createClient(supabaseUrl, supabaseKey);

const posts = [
  // ===== 일본여행 (travel) =====
  {
    title: '오사카 3박4일 여행 코스 완벽 가이드',
    slug: 'osaka-3night-4day-travel-guide',
    category: 'travel',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    meta_description: '도톤보리, 유니버설 스튜디오, 교토까지! 오사카 3박4일 완벽 여행 코스를 소개합니다.',
    keywords: '오사카여행, 오사카3박4일, 도톤보리, 유니버셜스튜디오, 교토여행',
    hashtags: '오사카여행,일본여행,도톤보리,유니버셜스튜디오,교토',
    content: `<h2>오사카 3박4일 완벽 여행 코스</h2>
<p>일본 여행의 시작점, 오사카! 맛있는 음식과 다양한 볼거리로 가득한 오사카 3박4일 여행 코스를 소개합니다.</p>

<h3>Day 1: 도톤보리 & 신사이바시</h3>
<p>오사카의 상징적인 관광지인 도톤보리에서 여행을 시작하세요. 글리코 사인 앞에서 인증샷을 찍고, 다코야키와 오코노미야키를 맛보세요.</p>
<ul>
<li><strong>점심:</strong> 이치란 라멘 도톤보리점</li>
<li><strong>오후:</strong> 신사이바시 쇼핑거리</li>
<li><strong>저녁:</strong> 구로몬 시장 해산물</li>
</ul>

<h3>Day 2: 유니버셜 스튜디오 재팬</h3>
<p>해리포터 위저딩 월드, 슈퍼 닌텐도 월드 등 다양한 어트랙션을 즐기세요. 입장권은 미리 예매하는 것이 좋습니다.</p>
<ul>
<li><strong>팁:</strong> 익스프레스 패스로 대기시간 단축</li>
<li><strong>추천:</strong> 해리포터 버터맥주 필수!</li>
</ul>

<h3>Day 3: 교토 당일치기</h3>
<p>JR 패스로 30분이면 교토 도착! 후시미 이나리 신사, 기요미즈데라, 아라시야마를 방문하세요.</p>

<h3>Day 4: 오사카성 & 귀국</h3>
<p>마지막 날은 여유롭게 오사카성을 방문하고, 우메다 스카이빌딩 전망대에서 오사카 전경을 감상하세요.</p>

<h3>예상 비용</h3>
<table>
<tr><th>항목</th><th>예상 비용</th></tr>
<tr><td>항공권</td><td>30~50만원</td></tr>
<tr><td>숙박 (3박)</td><td>20~40만원</td></tr>
<tr><td>USJ 입장권</td><td>8~12만원</td></tr>
<tr><td>식비 & 교통</td><td>20~30만원</td></tr>
<tr><td><strong>총 예상</strong></td><td><strong>80~130만원</strong></td></tr>
</table>`,
    view_count: 1250
  },
  {
    title: '도쿄 5대 라멘 맛집 추천',
    slug: 'tokyo-top-5-ramen-restaurants',
    category: 'travel',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
    meta_description: '현지인이 추천하는 도쿄 5대 라멘 맛집! 이치란, 후쿠오카 라멘부터 숨겨진 명소까지.',
    keywords: '도쿄라멘, 일본라멘, 이치란, 맛집, 도쿄맛집',
    hashtags: '도쿄라멘,일본라멘,이치란,맛집,도쿄맛집',
    content: `<h2>도쿄에서 꼭 가봐야 할 라멘 맛집 TOP 5</h2>
<p>일본 여행의 필수 코스, 라멘! 도쿄에서 현지인들이 줄 서서 먹는 라멘집 5곳을 소개합니다.</p>

<h3>1. 이치란 라멘 (一蘭)</h3>
<p>돈코츠 라멘의 대명사. 1인 부스에서 집중해서 라멘을 즐길 수 있습니다.</p>
<ul>
<li><strong>위치:</strong> 시부야, 신주쿠, 우에노 등 전역</li>
<li><strong>가격:</strong> 980엔~</li>
<li><strong>추천:</strong> 면 굵기 '보통', 국물 농도 '진하게'</li>
</ul>

<h3>2. 후쿠오 풍룡 (風龍)</h3>
<p>하카타 스타일의 진한 돈코츠 라멘. 무한리필 면이 특징!</p>

<h3>3. 아후리 (AFURI)</h3>
<p>유자시오 라멘으로 유명한 힙한 라멘집. 깔끔한 맛을 원한다면 추천!</p>

<h3>4. 츠케멘 야스베에</h3>
<p>츠케멘 전문점. 면을 진한 국물에 찍어 먹는 스타일.</p>

<h3>5. 라멘 지로 (ラーメン二郎)</h3>
<p>야채, 마늘, 기름을 듬뿍! 양이 어마어마한 전설의 라멘.</p>`,
    view_count: 890
  },

  // ===== 환율정보 (exchange) =====
  {
    title: '엔화 환전 타이밍, 언제가 가장 좋을까?',
    slug: 'best-time-yen-exchange',
    category: 'exchange',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80',
    meta_description: '엔화 환전 최적의 타이밍을 알아보세요. 환율 저점에 환전하는 방법과 팁을 공유합니다.',
    keywords: '엔화환전, 환율, 일본여행, 환전팁, 엔화',
    hashtags: '엔화환전,환율,일본여행,환전팁,엔화',
    content: `<h2>엔화 환전, 언제 하는 게 가장 이득일까?</h2>
<p>일본 여행을 계획 중이라면 환전 타이밍이 고민되실 겁니다. 현명하게 환전하는 방법을 알려드릴게요.</p>

<h3>환율 확인하기</h3>
<p>현재 엔화 환율은 100엔당 약 900원대입니다. 역사적으로 봤을 때 꽤 좋은 환율이에요!</p>

<h3>환전 타이밍 팁</h3>
<ul>
<li><strong>평일 오전:</strong> 은행 환율이 가장 좋은 시간</li>
<li><strong>월초보다 월말:</strong> 기업 결제 수요로 환율 변동</li>
<li><strong>환율 알림 설정:</strong> 목표 환율 도달 시 알림 받기</li>
</ul>

<h3>어디서 환전할까?</h3>
<table>
<tr><th>방법</th><th>장점</th><th>단점</th></tr>
<tr><td>시중은행</td><td>안전, 다양한 지점</td><td>수수료 높음</td></tr>
<tr><td>인터넷뱅킹</td><td>90% 우대환율</td><td>공항 수령 필요</td></tr>
<tr><td>사설환전소</td><td>최저 환율</td><td>명동/강남만 가능</td></tr>
<tr><td>일본 현지 ATM</td><td>편리함</td><td>수수료 발생</td></tr>
</table>

<h3>추천 환전 전략</h3>
<ol>
<li>여행 1~2주 전부터 환율 모니터링</li>
<li>70%는 미리 환전, 30%는 현지에서</li>
<li>인터넷뱅킹으로 우대환율 적용</li>
<li>남은 엔화는 다음 여행용으로 보관</li>
</ol>`,
    view_count: 2100
  },
  {
    title: '2024 엔화 환율 전망과 투자 전략',
    slug: '2024-yen-exchange-rate-forecast',
    category: 'exchange',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    meta_description: '2024년 엔화 환율 전망과 일본 여행, 투자에 대한 전략을 분석합니다.',
    keywords: '엔화전망, 2024환율, 엔화투자, 환율전망, 일본경제',
    hashtags: '엔화전망,환율,일본경제,투자,2024',
    content: `<h2>2024 엔화 환율 전망</h2>
<p>일본은행의 금리 정책 변화와 글로벌 경제 상황에 따른 엔화 환율 전망을 분석합니다.</p>

<h3>현재 상황</h3>
<p>엔화는 2024년 들어 역사적 약세를 기록하고 있습니다. 100엔당 850~950원대를 오가며 일본 여행객에게는 호재로 작용하고 있습니다.</p>

<h3>전문가 전망</h3>
<ul>
<li><strong>낙관론:</strong> 일본은행 금리 인상 시 엔화 강세 전환 예상</li>
<li><strong>비관론:</strong> 미국 금리 고공행진 지속 시 약세 유지</li>
<li><strong>중립:</strong> 현 수준 유지 가능성</li>
</ul>

<h3>여행자를 위한 조언</h3>
<p>현재 환율이 역사적으로 유리한 시점이므로, 일본 여행을 계획 중이라면 지금이 좋은 타이밍입니다.</p>`,
    view_count: 1560
  },

  // ===== 구매대행 (proxy) =====
  {
    title: '야후옥션 입찰 가이드: 처음 시작하는 일본 경매',
    slug: 'yahoo-auction-bidding-guide-beginners',
    category: 'proxy',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    meta_description: '야후옥션 입찰 방법을 처음부터 끝까지 알려드립니다. 회원가입, 입찰, 결제까지 완벽 가이드.',
    keywords: '야후옥션, 일본경매, 구매대행, 일본직구, 입찰',
    hashtags: '야후옥션,일본경매,구매대행,일본직구,입찰',
    content: `<h2>야후옥션 입찰 완벽 가이드</h2>
<p>일본 야후옥션에서 저렴하게 물건을 구매하는 방법! 처음 시작하는 분들을 위한 상세 가이드입니다.</p>

<h3>야후옥션이란?</h3>
<p>일본 최대의 온라인 경매 사이트로, 중고 명품, 피규어, 전자기기 등 다양한 상품을 경매로 구매할 수 있습니다.</p>

<h3>시작하기: 구매대행 업체 선택</h3>
<p>한국에서 직접 야후옥션 계정을 만들기 어렵기 때문에, 구매대행 업체를 통해 진행합니다.</p>
<ul>
<li><strong>FromJapan:</strong> 가장 유명한 대행업체</li>
<li><strong>Buyee:</strong> 야후재팬 공식 제휴</li>
<li><strong>비드바이:</strong> 한국어 지원 우수</li>
</ul>

<h3>입찰 방법</h3>
<ol>
<li>원하는 상품 URL 복사</li>
<li>구매대행 사이트에서 URL 입력</li>
<li>최대 입찰가 설정 (자동입찰)</li>
<li>낙찰 시 결제 & 배송 신청</li>
</ol>

<h3>입찰 팁</h3>
<ul>
<li><strong>스나이프 입찰:</strong> 종료 직전에 입찰하면 유리</li>
<li><strong>판매자 평가 확인:</strong> 별점 4.5 이상 추천</li>
<li><strong>상품 상태 꼼꼼히:</strong> 일본어 번역기 활용</li>
<li><strong>배송비 확인:</strong> 무거운 상품은 배송비 비쌈</li>
</ul>`,
    view_count: 3200
  },
  {
    title: '메루카리 직구 방법: 일본 중고거래 앱 완전정복',
    slug: 'mercari-japan-shopping-guide',
    category: 'proxy',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
    meta_description: '메루카리에서 일본 중고 명품, 한정판 굿즈를 저렴하게 구매하는 방법을 알려드립니다.',
    keywords: '메루카리, 일본직구, 중고거래, 일본쇼핑, 구매대행',
    hashtags: '메루카리,일본직구,중고거래,일본쇼핑,구매대행',
    content: `<h2>메루카리 직구 완전정복</h2>
<p>일본판 당근마켓, 메루카리! 한정판 굿즈부터 중고 명품까지 저렴하게 구매하는 방법을 알아보세요.</p>

<h3>메루카리란?</h3>
<p>일본 최대 중고거래 앱으로, 개인 간 거래로 저렴한 가격에 상품을 구매할 수 있습니다.</p>

<h3>인기 카테고리</h3>
<ul>
<li><strong>애니메이션 굿즈:</strong> 한정판 피규어, 포토카드</li>
<li><strong>브랜드 의류:</strong> 유니클로, 무인양품 등</li>
<li><strong>전자기기:</strong> 카메라, 게임기</li>
<li><strong>중고 명품:</strong> 가방, 지갑, 시계</li>
</ul>

<h3>구매 팁</h3>
<ol>
<li>상품 상태 사진 꼼꼼히 확인</li>
<li>판매자에게 추가 사진 요청 가능</li>
<li>"値下げ" (네사게 = 가격인하) 요청해보기</li>
<li>평가 좋은 판매자 선택</li>
</ol>`,
    view_count: 2800
  },

  // ===== 일본쇼핑 (shopping) =====
  {
    title: '일본 면세 쇼핑 완벽 가이드 2024',
    slug: 'japan-tax-free-shopping-guide-2024',
    category: 'shopping',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80',
    meta_description: '일본 면세 쇼핑 방법, 면세 조건, 인기 면세점 추천까지 한 번에 알아보세요.',
    keywords: '일본면세, 택스프리, 면세쇼핑, 일본여행, 쇼핑',
    hashtags: '일본면세,면세쇼핑,일본여행,쇼핑,택스프리',
    content: `<h2>일본 면세 쇼핑, 이렇게 하세요!</h2>
<p>일본 여행 시 면세 혜택을 최대한 활용하는 방법을 알려드립니다.</p>

<h3>면세 조건</h3>
<ul>
<li><strong>일반물품:</strong> 5,000엔 이상 구매 시 소비세 10% 면제</li>
<li><strong>소모품:</strong> 5,000엔~50만엔 사이 구매 시</li>
<li><strong>여권 필수:</strong> 단기체류 비자 소지자만 가능</li>
</ul>

<h3>면세 쇼핑 방법</h3>
<ol>
<li>Tax Free 표시 매장 확인</li>
<li>계산 시 여권 제시</li>
<li>면세 서류 작성 (전자화 진행 중)</li>
<li>상품은 밀봉 상태로 출국</li>
</ol>

<h3>인기 면세 쇼핑 장소</h3>
<ul>
<li><strong>돈키호테:</strong> 24시간 운영, 다양한 상품</li>
<li><strong>빅카메라:</strong> 전자제품 최강</li>
<li><strong>다이소:</strong> 100엔샵도 면세 가능!</li>
<li><strong>마츠모토키요시:</strong> 드럭스토어 1위</li>
</ul>`,
    view_count: 4500
  },
  {
    title: '일본 드럭스토어 필수 쇼핑템 TOP 20',
    slug: 'japan-drugstore-must-buy-items',
    category: 'shopping',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
    meta_description: '마츠모토키요시, 돈키호테에서 꼭 사야 할 일본 드럭스토어 필수템을 소개합니다.',
    keywords: '일본드럭스토어, 마츠키요, 돈키호테, 일본쇼핑, 일본화장품',
    hashtags: '드럭스토어,마츠키요,돈키호테,일본쇼핑,화장품',
    content: `<h2>일본 드럭스토어 필수 쇼핑템</h2>
<p>일본 여행의 필수 코스, 드럭스토어 털기! 현지인도 인정한 필수템을 소개합니다.</p>

<h3>스킨케어</h3>
<ul>
<li><strong>하다라보 고쿠쥰:</strong> 히알루론산 로션의 정석</li>
<li><strong>멜라노CC:</strong> 비타민C 미백 에센스</li>
<li><strong>케시민:</strong> 기미 잡티 케어</li>
</ul>

<h3>의약품</h3>
<ul>
<li><strong>사론파스:</strong> 파스의 명가</li>
<li><strong>이브 퀵:</strong> 두통약</li>
<li><strong>카베진:</strong> 위장약</li>
<li><strong>안약:</strong> 로토 시리즈</li>
</ul>

<h3>생활용품</h3>
<ul>
<li><strong>휴족시간:</strong> 발 피로 해소</li>
<li><strong>메구리즘:</strong> 눈 찜질팩</li>
<li><strong>호카론:</strong> 핫팩</li>
</ul>`,
    view_count: 3800
  },

  // ===== 일본문화 (culture) =====
  {
    title: '일본 애니메이션 성지순례 가이드',
    slug: 'japan-anime-pilgrimage-guide',
    category: 'culture',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    meta_description: '너의 이름은, 슬램덩크, 귀멸의 칼날 등 인기 애니메이션 배경지를 방문해보세요.',
    keywords: '애니메이션, 성지순례, 너의이름은, 슬램덩크, 일본',
    hashtags: '애니메이션,성지순례,너의이름은,슬램덩크,일본여행',
    content: `<h2>애니메이션 성지순례 가이드</h2>
<p>좋아하는 애니메이션의 배경이 된 실제 장소를 방문해보세요!</p>

<h3>슬램덩크 - 가마쿠라</h3>
<p>전설의 건널목! 에노덴 가마쿠라코코마에역 앞 건널목은 슬램덩크 팬들의 필수 방문지입니다.</p>
<ul>
<li><strong>위치:</strong> 가나가와현 가마쿠라시</li>
<li><strong>교통:</strong> 에노시마전철 가마쿠라코코마에역</li>
</ul>

<h3>너의 이름은 - 도쿄</h3>
<ul>
<li><strong>스가 신사:</strong> 명장면 계단</li>
<li><strong>요츠야역:</strong> 타키와 미츠하가 만난 곳</li>
<li><strong>신주쿠:</strong> 카페 라 보엠</li>
</ul>

<h3>귀멸의 칼날 - 후쿠오카</h3>
<p>가마도 신사, 호만구 등 작품의 모티브가 된 장소들이 있습니다.</p>

<h3>방문 에티켓</h3>
<ul>
<li>주민에게 피해 주지 않기</li>
<li>교통 방해하지 않기</li>
<li>쓰레기 되가져가기</li>
</ul>`,
    view_count: 2400
  },
  {
    title: '일본 온천 에티켓과 추천 료칸 TOP 5',
    slug: 'japan-onsen-etiquette-ryokan-guide',
    category: 'culture',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
    meta_description: '일본 온천 입욕 에티켓과 꼭 가봐야 할 료칸을 소개합니다. 처음 가는 분들 필독!',
    keywords: '일본온천, 료칸, 온천에티켓, 일본여행, 온천여행',
    hashtags: '온천,료칸,일본여행,온천에티켓,힐링',
    content: `<h2>일본 온천 에티켓 완벽 가이드</h2>
<p>일본 온천 문화를 제대로 즐기기 위한 에티켓과 추천 료칸을 소개합니다.</p>

<h3>입욕 전 에티켓</h3>
<ol>
<li>탈의실에서 옷을 벗고 수건 하나만 가지고 입장</li>
<li>온천에 들어가기 전 몸을 깨끗이 씻기</li>
<li>작은 수건은 머리 위에 올리거나 물 밖에 두기</li>
<li>긴 머리는 반드시 묶기</li>
</ol>

<h3>온천에서 하면 안 되는 것</h3>
<ul>
<li>수건을 온천물에 담그기</li>
<li>온천 안에서 수영하거나 뛰기</li>
<li>큰 소리로 떠들기</li>
<li>문신이 있으면 입장 불가한 곳도 있음</li>
</ul>

<h3>추천 온천 지역</h3>
<ul>
<li><strong>하코네:</strong> 도쿄 근교 최고의 온천 지역</li>
<li><strong>벳푸:</strong> 일본 최대 온천 도시</li>
<li><strong>쿠사츠:</strong> 일본 3대 명탕</li>
<li><strong>유후인:</strong> 아기자기한 온천 마을</li>
</ul>`,
    view_count: 1900
  },

  // ===== 일본뉴스 (news) =====
  {
    title: '2024 일본 여행 트렌드: 달라진 점 총정리',
    slug: 'japan-travel-trends-2024',
    category: 'news',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80',
    meta_description: '2024년 일본 여행, 뭐가 달라졌을까? 최신 트렌드와 변경사항을 총정리했습니다.',
    keywords: '일본여행, 2024트렌드, 일본뉴스, 여행정보, 일본',
    hashtags: '일본여행,2024트렌드,일본뉴스,여행정보,일본',
    content: `<h2>2024 일본 여행, 이것만 알면 끝!</h2>
<p>코로나 이후 달라진 일본 여행 트렌드를 정리했습니다.</p>

<h3>달라진 점</h3>
<ul>
<li><strong>비자:</strong> 무비자 입국 가능 (90일)</li>
<li><strong>Visit Japan Web:</strong> 입국 시 필수 등록</li>
<li><strong>면세 제도:</strong> 전자화 진행 중</li>
</ul>

<h3>2024 인기 여행지</h3>
<ol>
<li>오사카 - 여전한 인기</li>
<li>후쿠오카 - 가까운 일본</li>
<li>삿포로 - 겨울 여행 1위</li>
<li>오키나와 - 휴양지 수요 증가</li>
</ol>

<h3>물가 동향</h3>
<p>엔저로 인해 한국 관광객에게 유리한 환율이 지속되고 있습니다.</p>`,
    view_count: 5200
  },
  {
    title: 'Visit Japan Web 등록 방법 완벽 가이드',
    slug: 'visit-japan-web-registration-guide',
    category: 'news',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    meta_description: 'Visit Japan Web 등록 방법을 스크린샷과 함께 상세히 안내합니다. 일본 입국 필수!',
    keywords: 'VisitJapanWeb, 일본입국, 일본여행, 입국심사, QR코드',
    hashtags: 'VisitJapanWeb,일본입국,일본여행,입국심사,QR코드',
    content: `<h2>Visit Japan Web 등록 완벽 가이드</h2>
<p>일본 입국 시 필수인 Visit Japan Web 등록 방법을 알려드립니다.</p>

<h3>Visit Japan Web이란?</h3>
<p>일본 정부에서 운영하는 입국 절차 간소화 서비스입니다. 검역, 입국심사, 세관신고를 미리 등록하면 QR코드로 빠르게 통과할 수 있습니다.</p>

<h3>등록 순서</h3>
<ol>
<li>Visit Japan Web 사이트 접속</li>
<li>계정 생성 (이메일 인증)</li>
<li>여권 정보 등록</li>
<li>여행 일정 등록</li>
<li>검역 정보 입력</li>
<li>입국심사 정보 입력</li>
<li>세관신고 작성</li>
<li>QR코드 저장</li>
</ol>

<h3>주의사항</h3>
<ul>
<li>출발 최소 6시간 전까지 등록 완료</li>
<li>동행자도 각각 등록 필요</li>
<li>QR코드 스크린샷 저장 권장</li>
</ul>`,
    view_count: 8900
  },

  // ===== 꿀팁 (tips) =====
  {
    title: '일본 편의점 꿀팁 모음: 꼭 먹어봐야 할 음식 TOP 10',
    slug: 'japan-convenience-store-must-try-food',
    category: 'tips',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    meta_description: '세븐일레븐, 패밀리마트, 로손에서 꼭 먹어봐야 할 일본 편의점 음식을 추천합니다.',
    keywords: '일본편의점, 편의점음식, 세븐일레븐, 로손, 일본여행',
    hashtags: '일본편의점,편의점음식,세븐일레븐,로손,일본여행',
    content: `<h2>일본 편의점 꼭 먹어봐야 할 음식 TOP 10</h2>
<p>일본 여행의 숨은 재미, 편의점 털기! 현지인도 인정한 맛있는 편의점 음식을 소개합니다.</p>

<h3>세븐일레븐</h3>
<ul>
<li><strong>금의 식빵:</strong> 부드러운 식감의 고급 식빵</li>
<li><strong>삼각김밥:</strong> 참치마요, 연어, 명란 추천</li>
<li><strong>냉동 볶음밥:</strong> 전자레인지 2분, 맛집 수준</li>
</ul>

<h3>로손</h3>
<ul>
<li><strong>가라아게군:</strong> 바삭한 치킨, 맥주 안주로 최고</li>
<li><strong>롤케이크:</strong> 크림 듬뿍, 가성비 디저트</li>
<li><strong>악마의 주먹밥:</strong> 중독성 있는 양념 밥</li>
</ul>

<h3>패밀리마트</h3>
<ul>
<li><strong>파미치키:</strong> 일본판 교촌치킨</li>
<li><strong>크림빵:</strong> 진한 커스터드 크림</li>
</ul>

<h3>편의점 꿀팁</h3>
<ul>
<li>밤 8시 이후 도시락 할인</li>
<li>포인트 카드 활용 (T포인트, Ponta)</li>
<li>전자레인지, 온수 무료 이용 가능</li>
</ul>`,
    view_count: 6700
  },
  {
    title: '일본 대중교통 완전정복: IC카드부터 JR패스까지',
    slug: 'japan-transportation-guide-ic-card-jr-pass',
    category: 'tips',
    status: 'published',
    thumbnail_url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    meta_description: '일본 여행 필수! 스이카, 파스모, JR패스 등 일본 대중교통 이용법을 총정리했습니다.',
    keywords: '일본교통, JR패스, 스이카, 일본여행, 교통카드',
    hashtags: '일본교통,JR패스,스이카,파스모,대중교통',
    content: `<h2>일본 대중교통 완전정복</h2>
<p>복잡한 일본 대중교통, 이 글 하나로 완벽 정리!</p>

<h3>IC 교통카드</h3>
<p>한국의 티머니처럼 충전해서 사용하는 교통카드입니다.</p>
<ul>
<li><strong>Suica (스이카):</strong> JR동일본 발행</li>
<li><strong>PASMO (파스모):</strong> 도쿄 지하철/버스</li>
<li><strong>ICOCA (이코카):</strong> JR서일본 (오사카)</li>
</ul>
<p><strong>팁:</strong> 어떤 카드든 전국 호환 가능!</p>

<h3>JR 패스</h3>
<p>신칸센 포함 JR 전 노선 무제한 이용 가능한 외국인 전용 패스</p>
<table>
<tr><th>종류</th><th>가격</th><th>추천 대상</th></tr>
<tr><td>7일권</td><td>50,000엔</td><td>도쿄-오사카-교토</td></tr>
<tr><td>14일권</td><td>80,000엔</td><td>전국 일주</td></tr>
<tr><td>지역패스</td><td>다양</td><td>특정 지역만</td></tr>
</table>

<h3>구글맵 활용법</h3>
<ol>
<li>출발지/도착지 검색</li>
<li>경로 옵션에서 '전철' 선택</li>
<li>요금, 소요시간, 환승 정보 확인</li>
<li>실시간 운행 정보도 표시</li>
</ol>`,
    view_count: 4300
  }
];

async function seedPosts() {
  console.log('='.repeat(50));
  console.log('샘플 포스트 생성 시작...');
  console.log('='.repeat(50));

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const post of posts) {
    // 중복 체크
    const { data: existing } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', post.slug)
      .single();

    if (existing) {
      console.log(`[SKIP] 이미 존재: ${post.title}`);
      skipCount++;
      continue;
    }

    const postData = {
      ...post,
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('posts')
      .insert(postData)
      .select()
      .single();

    if (error) {
      console.error(`[ERROR] ${post.title}:`, error.message);
      errorCount++;
    } else {
      console.log(`[OK] 생성 완료: ${post.title}`);
      successCount++;
    }
  }

  console.log('='.repeat(50));
  console.log(`완료! 성공: ${successCount}, 스킵: ${skipCount}, 오류: ${errorCount}`);
  console.log('='.repeat(50));
}

seedPosts().catch(console.error);
