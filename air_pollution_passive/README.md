# 대기질 정보 앱 (Air Quality Information App)

## 📋 프로젝트 개요

애플 날씨와 유사한 디자인의 대기오염 정보를 보여주는 React TypeScript 웹 애플리케이션입니다. 실시간 대기질 데이터를 시각적으로 표현하고, 사용자 친화적인 인터페이스를 제공합니다.

## 🎯 주요 기능

### 1. 대기질 지수 (AQI) 표시
- **AQI (Air Quality Index)** 실시간 표시
- 대기질 수준별 색상 코딩 (좋음: 초록, 보통: 노랑, 나쁨: 주황, 매우 나쁨: 빨강, 위험: 보라)
- 대기질 수준별 건강 영향 정보 제공
- 업데이트 시간 표시

### 2. 위치 기반 서비스
- **도시 검색**: 전 세계 주요 도시 대기질 정보 조회
- **현재 위치**: GPS 기반 현재 위치 대기질 정보
- **인기 도시**: 빠른 접근을 위한 인기 도시 목록

### 3. 대기오염 성분 상세 분석
- **PM2.5**: 미세먼지 (2.5μm 이하)
- **PM10**: 미세먼지 (10μm 이하)
- **O₃**: 오존
- **NO₂**: 이산화질소
- **SO₂**: 이산화황
- **CO**: 일산화탄소
- 각 성분별 수치와 시각적 바 차트 제공

### 4. 사용자 인터페이스
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **애플 스타일 UI**: 깔끔하고 모던한 디자인
- **로딩 상태**: 데이터 로딩 중 스피너 표시
- **에러 처리**: 네트워크 오류 시 사용자 친화적 메시지

## 🛠 기술 스택

### Frontend
- **React 18.2.0**: 사용자 인터페이스 프레임워크
- **TypeScript 4.9.5**: 타입 안전성 및 개발 생산성
- **CSS3**: 스타일링 (애플 디자인 시스템 참고)

### HTTP 통신
- **Axios 1.6.0**: HTTP 클라이언트 라이브러리
- **RESTful API**: OpenWeatherMap API 연동

### 개발 도구
- **Create React App**: 프로젝트 부트스트래핑
- **npm**: 패키지 관리자

## 📁 프로젝트 구조

```
air_pollution/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── AirQualityCard.tsx      # 대기질 지수 카드 컴포넌트
│   │   ├── AirQualityCard.css      # 대기질 카드 스타일
│   │   ├── PollutantDetails.tsx    # 대기오염 성분 상세 컴포넌트
│   │   ├── PollutantDetails.css    # 성분 상세 스타일
│   │   ├── LocationSearch.tsx      # 위치 검색 컴포넌트
│   │   └── LocationSearch.css      # 검색 스타일
│   ├── services/
│   │   └── airPollutionService.ts  # API 서비스 로직
│   ├── types/
│   │   └── airPollution.ts         # TypeScript 타입 정의
│   ├── App.tsx                     # 메인 애플리케이션 컴포넌트
│   ├── App.css                     # 메인 스타일
│   ├── index.tsx                   # 애플리케이션 진입점
│   └── index.css                   # 글로벌 스타일
├── package.json                    # 프로젝트 설정 및 의존성
├── tsconfig.json                   # TypeScript 설정
└── README.md                       # 프로젝트 문서
```

## 🔧 컴포넌트 상세 명세

### 1. AirQualityCard 컴포넌트
**파일**: `src/components/AirQualityCard.tsx`

**기능**:
- AQI 수치를 원형 카드로 표시
- 대기질 수준별 색상 적용
- 건강 영향 정보 제공
- 업데이트 시간 표시

**Props**:
```typescript
interface AirQualityCardProps {
  data: AirPollutionData;    // 대기오염 데이터
  location: string;          // 위치 정보
}
```

### 2. PollutantDetails 컴포넌트
**파일**: `src/components/PollutantDetails.tsx`

**기능**:
- 6가지 대기오염 성분 상세 표시
- 각 성분별 수치와 단위 표시
- 시각적 바 차트로 수준 표시
- 성분별 설명 제공

**Props**:
```typescript
interface PollutantDetailsProps {
  data: AirPollutionData;    // 대기오염 데이터
}
```

### 3. LocationSearch 컴포넌트
**파일**: `src/components/LocationSearch.tsx`

**기능**:
- 도시명 검색 기능
- 인기 도시 빠른 선택
- 검색 상태 표시
- 현재 위치 버튼

**Props**:
```typescript
interface LocationSearchProps {
  onLocationSelect: (cityName: string) => void;  // 위치 선택 콜백
  currentLocation: string;                        // 현재 위치
}
```

## 🔌 API 명세

### OpenWeatherMap API
**Base URL**: `https://api.openweathermap.org/data/2.5`

#### 1. 대기오염 데이터 API
**Endpoint**: `/air_pollution`
**Method**: GET
**Parameters**:
- `lat`: 위도 (number)
- `lon`: 경도 (number)
- `appid`: API 키 (string)

**Response**:
```typescript
interface AirPollutionResponse {
  list: [{
    dt: number;              // 타임스탬프
    main: {
      aqi: number;           // AQI 값 (1-5)
    };
    components: {
      co: number;            // 일산화탄소 (μg/m³)
      no: number;            // 일산화질소 (μg/m³)
      no2: number;           // 이산화질소 (μg/m³)
      o3: number;            // 오존 (μg/m³)
      so2: number;           // 이산화황 (μg/m³)
      pm2_5: number;         // PM2.5 (μg/m³)
      pm10: number;          // PM10 (μg/m³)
      nh3: number;           // 암모니아 (μg/m³)
    };
  }];
}
```

#### 2. 위치 정보 API
**Endpoint**: `/weather`
**Method**: GET
**Parameters**:
- `q`: 도시명 (string)
- `appid`: API 키 (string)

**Response**:
```typescript
interface LocationResponse {
  name: string;              // 도시명
  coord: {
    lat: number;             // 위도
    lon: number;             // 경도
  };
  sys: {
    country: string;         // 국가 코드
    state?: string;          // 주/도 (선택사항)
  };
}
```

## 🎨 UI/UX 디자인 명세

### 색상 시스템
- **좋음 (AQI 1)**: `#00E400` (초록)
- **보통 (AQI 2)**: `#FFFF00` (노랑)
- **나쁨 (AQI 3)**: `#FF7E00` (주황)
- **매우 나쁨 (AQI 4)**: `#FF0000` (빨강)
- **위험 (AQI 5)**: `#8F3F97` (보라)

### 레이아웃
- **헤더**: 앱 제목 및 현재 위치 버튼
- **메인 컨텐츠**: 위치 검색, 대기질 카드, 성분 상세
- **푸터**: API 정보 및 면책 조항

### 반응형 브레이크포인트
- **모바일**: 768px 이하
- **태블릿**: 768px - 1024px
- **데스크톱**: 1024px 이상

## 🚀 설치 및 실행

### 필수 요구사항
- Node.js 16.0.0 이상
- npm 8.0.0 이상

### 설치 과정
```bash
# 1. 프로젝트 클론
git clone [repository-url]
cd air_pollution

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm start

# 4. 브라우저에서 확인
# http://localhost:3000
```

### 빌드 및 배포
```bash
# 프로덕션 빌드
npm run build

# 빌드 결과물 확인
npm run test
```

## ⚙️ 환경 설정

### API 키 설정
1. [OpenWeatherMap](https://openweathermap.org/) 가입
2. API 키 발급 (무료 계정: 1,000 calls/day)
3. `src/services/airPollutionService.ts` 파일 수정:

```typescript
const API_KEY = 'YOUR_ACTUAL_API_KEY'; // 발급받은 API 키 입력
```

### 환경 변수 설정 (선택사항)
```bash
# .env 파일 생성
REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
```

## 📊 데이터 흐름

1. **사용자 액션**: 도시 검색 또는 현재 위치 선택
2. **API 호출**: OpenWeatherMap API로 위치 및 대기질 데이터 요청
3. **데이터 처리**: 응답 데이터를 컴포넌트에서 사용할 형태로 변환
4. **UI 업데이트**: 처리된 데이터로 컴포넌트 렌더링
5. **사용자 피드백**: 로딩 상태, 에러 메시지 등 표시

## 🐛 에러 처리

### 네트워크 에러
- API 호출 실패 시 사용자 친화적 메시지 표시
- 재시도 버튼 제공
- 오프라인 상태 감지

### 데이터 검증
- API 응답 데이터 유효성 검사
- 누락된 데이터에 대한 기본값 처리
- 타입 안전성을 위한 TypeScript 활용

## 🔒 보안 고려사항

- API 키는 클라이언트 사이드에 노출되므로 환경 변수 사용 권장
- HTTPS 통신으로 데이터 전송 보안
- 사용자 개인정보 수집하지 않음

## 📈 성능 최적화

- **React.memo**: 불필요한 리렌더링 방지
- **CSS 최적화**: 애니메이션에 transform 사용
- **이미지 최적화**: SVG 아이콘 사용
- **번들 최적화**: Create React App 기본 설정 활용

## 🧪 테스트

```bash
# 단위 테스트 실행
npm test

# 테스트 커버리지 확인
npm test -- --coverage

# E2E 테스트 (선택사항)
npm run test:e2e
```

## 📝 라이센스

MIT License - 자유로운 사용, 수정, 배포 가능

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 지원

- **이슈 리포트**: GitHub Issues 사용
- **기능 요청**: Feature Request 라벨로 이슈 생성
- **문서 개선**: Pull Request로 README 업데이트

---

**개발자**: AI Assistant  
**최종 업데이트**: 2024년 12월  
**버전**: 1.0.0
