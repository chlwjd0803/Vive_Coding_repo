# API 키 설정 방법

## OpenWeatherMap API 키 발급

1. [OpenWeatherMap](https://openweathermap.org/) 웹사이트에 접속
2. 회원가입 또는 로그인
3. "API keys" 섹션에서 무료 API 키 발급
4. 발급받은 API 키를 복사

## API 키 설정

### 방법 1: 환경 변수 사용 (권장)

1. 프로젝트 루트에 `.env` 파일 생성:
```
REACT_APP_OPENWEATHER_API_KEY=your_actual_api_key_here
```

2. `src/services/airPollutionService.ts` 파일에서 API 키 설정 부분 수정:
```typescript
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY || 'YOUR_ACTUAL_API_KEY';
```

### 방법 2: 직접 코드에 입력

`src/services/airPollutionService.ts` 파일의 6번째 줄을 수정:
```typescript
const API_KEY = 'your_actual_api_key_here'; // 발급받은 API 키로 교체
```

## 주의사항

- API 키는 민감한 정보이므로 Git에 커밋하지 마세요
- 무료 계정의 경우 하루 1,000회 API 호출 제한이 있습니다
- 프로덕션 환경에서는 환경 변수를 사용하는 것을 권장합니다

## API 키 확인

API 키가 올바르게 설정되었는지 확인하려면:
1. 애플리케이션을 실행
2. 도시명을 검색하거나 현재 위치 버튼 클릭
3. 데이터가 정상적으로 로드되는지 확인 