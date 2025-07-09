# With You: 커플 데이트 코스 추천 웹앱

## 프로젝트 소개
- **With You**는 커플을 위한 맞춤형 데이트 코스(장소+식당+카페)를 추천해주는 웹앱입니다.
- 프론트엔드는 React(Typescript), 백엔드는 FastAPI(Python)로 구성되어 있습니다.
- 카카오맵 API를 활용하여 실제 위치 기반 추천이 가능합니다.

---

## 디렉토리 구조

```
withyou/
  ├── withyou_frontend/   # React 프론트엔드
  └── withyou_backend/    # FastAPI 백엔드
```

---

## 프론트엔드 실행 방법 (withyou_frontend)

1. **의존성 설치**
   ```bash
   cd withyou/withyou_frontend
   npm install
   # 또는
   yarn install
   ```

2. **개발 서버 실행**
   ```bash
   npm start
   # 또는
   yarn start
   ```

3. **접속**
   - 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 백엔드 실행 방법 (withyou_backend)

### 1. Python 환경 준비

#### (1) Homebrew Python 3.13 환경에서 겪은 문제
- Homebrew로 설치한 Python 3.13은 venv+pip 사용이 매우 불편합니다.
- 가상환경을 만들어도 pip가 동작하지 않거나, externally-managed-environment 오류가 발생합니다.

#### (2) **해결법: Python 3.11로 다운그레이드**

1. **Python 3.11 설치**
   ```bash
   brew install python@3.11
   ```
2. **기존 venv 삭제(필요시)**
   ```bash
   cd withyou/withyou_backend
   rm -rf venv
   ```
3. **새 venv 생성 및 활성화**
   ```bash
   python3.11 -m venv venv
   source venv/bin/activate
   ```
4. **pip 정상 동작 확인**
   ```bash
   which pip
   # → .../withyou_backend/venv/bin/pip
   ```

### 2. 의존성 설치

```bash
pip install -r requirements.txt
# requirements.txt가 없다면 아래 명령어로 직접 설치
pip install fastapi uvicorn python-dotenv requests
```

### 3. 환경변수(.env) 설정
- 카카오맵 API 키 등 필요한 환경변수를 `.env` 파일에 작성하세요.

### 4. 서버 실행

```bash
uvicorn main:app --reload
# 또는 main.py 위치에 따라
uvicorn withyou_backend.main:app --reload
```

- 기본 포트: 8000 ([http://localhost:8000/docs](http://localhost:8000/docs)에서 Swagger 문서 확인 가능)

---

## Mac(Homebrew Python) 환경에서 주의사항
- Homebrew Python 3.13은 venv+pip 사용이 매우 불편하니, 반드시 3.11 또는 3.10을 사용하세요.
- 가상환경 활성화 후 `which pip`로 경로를 꼭 확인하세요.
- `pip install` 시 externally-managed-environment 오류가 나면, venv를 새로 만들고 Python 버전을 확인하세요.
- 임시방편으로 `--break-system-packages` 옵션을 쓸 수 있지만, 권장하지 않습니다.

---

## 기타
- 프론트엔드와 백엔드 모두 실행해야 정상적으로 서비스가 동작합니다.
- 추가 문의/에러 발생 시, 터미널 메시지와 함께 질문해 주세요!