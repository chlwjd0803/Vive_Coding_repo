import React, { useState, useRef } from "react";

interface TimeResult {
  source?: {
    timezone: string;
    datetime: string;
    is_dst: boolean;
  };
  target?: {
    timezone: string;
    datetime: string;
    is_dst: boolean;
  };
  time_difference?: string;
}

// 주요 선진국 도시/시간대 한글 매핑 (요청 국가만 남김)
const TIMEZONE_DICT: { [key: string]: string } = {
  "Asia/Seoul": "대한민국(서울)",
  "America/New_York": "미국(뉴욕)",
  "America/Los_Angeles": "미국(로스앤젤레스)",
  "America/Chicago": "미국(시카고)",
  "America/Sao_Paulo": "브라질(상파울루)",
  "Asia/Jerusalem": "이스라엘(예루살렘)",
  "Europe/Berlin": "독일(베를린)",
  "Europe/London": "영국(런던)",
  "Europe/Moscow": "러시아(모스크바)",
  "Asia/Hong_Kong": "홍콩",
  "Asia/Taipei": "대만(타이베이)",
  "Asia/Singapore": "싱가포르",
  "Asia/Tokyo": "일본(도쿄)",
  "Australia/Sydney": "호주(시드니)",
};

const TIMEZONES = Object.keys(TIMEZONE_DICT);

function formatKoreanDateTime(dt: string, tz: string) {
  try {
    const date = new Date(dt);
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: tz,
    }).format(date);
  } catch {
    return dt;
  }
}

function App() {
  const [sessionId, setSessionId] = useState("");
  const [sourceTz, setSourceTz] = useState("Asia/Seoul");
  const [time, setTime] = useState("");
  const [targetTzList, setTargetTzList] = useState<string[]>(["America/New_York"]);
  const [inputTz, setInputTz] = useState("");
  const [results, setResults] = useState<TimeResult[]>([]);
  const [streaming, setStreaming] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const createSession = async () => {
    const url = `http://127.0.0.1:8000/mcp?session_id=${encodeURIComponent(sessionId)}`;
    await fetch(url, { method: "POST" });
  };

  const startStream = async () => {
    setResults([]);
    setStreaming(true);
    await createSession();
    const params = new URLSearchParams({
      session_id: sessionId,
      source_tz: sourceTz,
      time: time,
    });
    targetTzList.forEach((tz) => params.append("target_tz", tz));
    const url = `http://127.0.0.1:8000/mcp?${params.toString()}`;
    const es = new EventSource(url);
    eventSourceRef.current = es;
    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setResults((prev) => [...prev, data]);
      } catch {}
    };
    es.onerror = () => {
      es.close();
      setStreaming(false);
    };
  };

  const stopStream = () => {
    eventSourceRef.current?.close();
    setStreaming(false);
  };

  const addTargetTz = () => {
    if (inputTz && !targetTzList.includes(inputTz)) {
      setTargetTzList([...targetTzList, inputTz]);
      setInputTz("");
    }
  };

  const removeTargetTz = (tz: string) => {
    setTargetTzList(targetTzList.filter((t) => t !== tz));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)",
      fontFamily: "'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', sans-serif",
      padding: 0,
      margin: 0,
    }}>
      <div style={{
        maxWidth: 520,
        margin: "48px auto",
        background: "#fff",
        borderRadius: 24,
        boxShadow: "0 8px 32px 0 rgba(31, 41, 55, 0.12)",
        padding: "40px 32px 32px 32px",
        border: "1.5px solid #e0e7ef"
      }}>
        <h2 style={{
          textAlign: "center",
          fontWeight: 800,
          fontSize: 28,
          color: "#3b82f6",
          marginBottom: 32,
          letterSpacing: "-1px"
        }}>
          🌏 다국적 시간 변환기 <span style={{fontSize:18, color:'#64748b'}}>(MCP 연동)</span>
        </h2>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600, color: "#334155" }}>
            세션 ID
            <input
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              placeholder="예: cj"
              style={{
                marginLeft: 12,
                padding: "8px 14px",
                borderRadius: 8,
                border: "1.5px solid #cbd5e1",
                fontSize: 16,
                outline: "none",
                marginTop: 4,
                background: "#f1f5f9"
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600, color: "#334155" }}>
            기준 시간대
            <select
              value={sourceTz}
              onChange={(e) => setSourceTz(e.target.value)}
              style={{
                marginLeft: 12,
                padding: "8px 14px",
                borderRadius: 8,
                border: "1.5px solid #cbd5e1",
                fontSize: 16,
                outline: "none",
                marginTop: 4,
                background: "#f1f5f9"
              }}
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>{TIMEZONE_DICT[tz]}</option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600, color: "#334155" }}>
            기준 시간
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                marginLeft: 12,
                padding: "8px 14px",
                borderRadius: 8,
                border: "1.5px solid #cbd5e1",
                fontSize: 16,
                outline: "none",
                marginTop: 4,
                background: "#f1f5f9"
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600, color: "#334155" }}>
            변환 대상 시간대
            <select
              value={inputTz}
              onChange={(e) => setInputTz(e.target.value)}
              style={{
                marginLeft: 12,
                padding: "8px 14px",
                borderRadius: 8,
                border: "1.5px solid #cbd5e1",
                fontSize: 16,
                outline: "none",
                marginTop: 4,
                background: "#f1f5f9"
              }}
            >
              <option value="">시간대 선택</option>
              {TIMEZONES.filter((tz) => tz !== sourceTz && !targetTzList.includes(tz)).map((tz) => (
                <option key={tz} value={tz}>{TIMEZONE_DICT[tz]}</option>
              ))}
            </select>
            <button
              onClick={addTargetTz}
              style={{
                marginLeft: 12,
                padding: "7px 18px",
                borderRadius: 8,
                border: "none",
                background: "#3b82f6",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                boxShadow: "0 2px 8px 0 rgba(59,130,246,0.08)"
              }}
            >
              추가
            </button>
          </label>
          <div style={{ marginTop: 10 }}>
            {targetTzList.map((tz) => (
              <span
                key={tz}
                style={{
                  display: "inline-block",
                  background: "#e0e7ff",
                  color: "#3730a3",
                  padding: "6px 14px",
                  borderRadius: 16,
                  marginRight: 10,
                  fontWeight: 600,
                  fontSize: 15,
                  boxShadow: "0 1px 4px 0 rgba(59,130,246,0.07)"
                }}
              >
                {TIMEZONE_DICT[tz]} <button onClick={() => removeTargetTz(tz)} style={{ marginLeft: 4, background: "none", border: "none", color: "#64748b", fontWeight: 700, cursor: "pointer" }}>x</button>
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          {!streaming ? (
            <button
              onClick={startStream}
              disabled={!sessionId || !sourceTz || !time || targetTzList.length === 0}
              style={{
                padding: "12px 36px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)",
                color: "#fff",
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: "-1px",
                cursor: "pointer",
                boxShadow: "0 4px 16px 0 rgba(59,130,246,0.13)",
                transition: "background 0.2s"
              }}
            >
              변환 시작
            </button>
          ) : (
            <button
              onClick={stopStream}
              style={{
                padding: "12px 36px",
                borderRadius: 12,
                border: "none",
                background: "#f87171",
                color: "#fff",
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: "-1px",
                cursor: "pointer",
                boxShadow: "0 4px 16px 0 rgba(248,113,113,0.13)",
                transition: "background 0.2s"
              }}
            >
              중단
            </button>
          )}
        </div>
        <div>
          <h3 style={{ color: "#3b82f6", fontWeight: 800, fontSize: 22, marginBottom: 18 }}>변환 결과</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {results.map((res, idx) => (
              <li key={idx} style={{
                marginBottom: 20,
                background: "#f1f5f9",
                borderRadius: 16,
                boxShadow: "0 2px 8px 0 rgba(59,130,246,0.06)",
                padding: "18px 20px"
              }}>
                {res.source && res.target ? (
                  <>
                    <div style={{ fontWeight: 700, color: "#3730a3", fontSize: 16, marginBottom: 4 }}>
                      {TIMEZONE_DICT[res.source.timezone] || res.source.timezone} 기준 {formatKoreanDateTime(res.source.datetime, res.source.timezone)}
                    </div>
                    <div style={{ fontWeight: 700, color: "#0ea5e9", fontSize: 17, marginBottom: 2 }}>
                      → {TIMEZONE_DICT[res.target.timezone] || res.target.timezone} {formatKoreanDateTime(res.target.datetime, res.target.timezone)}
                    </div>
                    <div style={{ color: "#64748b", fontWeight: 600, fontSize: 15 }}>
                      시간차: {res.time_difference} {res.target.is_dst ? "(서머타임 적용)" : ""}
                    </div>
                  </>
                ) : (
                  <div style={{ color: "#ef4444", fontWeight: 700 }}>
                    변환 결과를 표시할 수 없습니다.
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ textAlign: "center", color: "#64748b", marginTop: 32, fontSize: 15 }}>
        Made with <span style={{ color: "#3b82f6", fontWeight: 700 }}>MCP</span> & React · <span style={{ fontWeight: 600 }}>2025</span>
      </div>
    </div>
  );
}

export default App;
