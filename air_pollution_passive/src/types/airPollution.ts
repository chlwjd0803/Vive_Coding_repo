// API 응답 타입 정의
export interface AirPollutionResponse {
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

export interface LocationResponse {
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

// 컴포넌트에서 사용할 데이터 타입
export interface AirPollutionData {
  stationName: string;
  pm10: number;
  pm25: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
  dataTime: string;
}

export interface LocationData {
  name: string;
  country: string;
  state?: string;
  coord: {
    lat: number;
    lon: number;
  };
}

// AQI 수준별 정보
export interface AQICategory {
  level: string;
  color: string;
  description: string;
  healthEffect: string;
}

export const AQI_CATEGORIES: Record<number, AQICategory> = {
  1: {
    level: "좋음",
    color: "#00E400",
    description: "대기질이 양호합니다",
    healthEffect: "정상적인 야외 활동이 가능합니다"
  },
  2: {
    level: "보통",
    color: "#FFFF00",
    description: "대기질이 보통입니다",
    healthEffect: "민감군은 장시간 실외활동을 줄이세요"
  },
  3: {
    level: "나쁨",
    color: "#FF7E00",
    description: "대기질이 나쁩니다",
    healthEffect: "민감군은 실외활동을 줄이고, 일반인도 주의하세요"
  },
  4: {
    level: "매우 나쁨",
    color: "#FF0000",
    description: "대기질이 매우 나쁩니다",
    healthEffect: "모든 사람이 실외활동을 줄이세요"
  },
  5: {
    level: "위험",
    color: "#8F3F97",
    description: "대기질이 위험합니다",
    healthEffect: "실외활동을 금지하세요"
  }
};

// 대기오염 성분 정보
export interface PollutantInfo {
  name: string;
  unit: string;
  description: string;
  good: number;
  moderate: number;
  unhealthy: number;
  veryUnhealthy: number;
  hazardous: number;
}

export const POLLUTANTS: Record<string, PollutantInfo> = {
  pm2_5: {
    name: "PM2.5",
    unit: "μg/m³",
    description: "미세먼지 (2.5μm 이하)",
    good: 12,
    moderate: 35.4,
    unhealthy: 55.4,
    veryUnhealthy: 150.4,
    hazardous: 250.4
  },
  pm10: {
    name: "PM10",
    unit: "μg/m³",
    description: "미세먼지 (10μm 이하)",
    good: 54,
    moderate: 154,
    unhealthy: 254,
    veryUnhealthy: 354,
    hazardous: 424
  },
  o3: {
    name: "O₃",
    unit: "μg/m³",
    description: "오존",
    good: 54,
    moderate: 70,
    unhealthy: 85,
    veryUnhealthy: 105,
    hazardous: 200
  },
  no2: {
    name: "NO₂",
    unit: "μg/m³",
    description: "이산화질소",
    good: 53,
    moderate: 100,
    unhealthy: 360,
    veryUnhealthy: 649,
    hazardous: 1249
  },
  so2: {
    name: "SO₂",
    unit: "μg/m³",
    description: "이산화황",
    good: 35,
    moderate: 75,
    unhealthy: 185,
    veryUnhealthy: 304,
    hazardous: 604
  },
  co: {
    name: "CO",
    unit: "μg/m³",
    description: "일산화탄소",
    good: 4400,
    moderate: 9400,
    unhealthy: 12400,
    veryUnhealthy: 15400,
    hazardous: 30400
  }
};

// 공공데이터포털(에어코리아) API 응답 타입 정의
export interface KoreaAirQualityItem {
  stationName: string; // 측정소명(구/군)
  pm10Value: string;   // PM10 미세먼지 농도(㎍/㎥)
  pm25Value: string;   // PM2.5 초미세먼지 농도(㎍/㎥)
  o3Value: string;     // 오존 농도(ppm)
  no2Value: string;    // 이산화질소 농도(ppm)
  so2Value: string;    // 아황산가스 농도(ppm)
  coValue: string;     // 일산화탄소 농도(ppm)
  dataTime: string;    // 측정일시
}

export interface KoreaAirQualityResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: KoreaAirQualityItem[];
    };
  };
} 