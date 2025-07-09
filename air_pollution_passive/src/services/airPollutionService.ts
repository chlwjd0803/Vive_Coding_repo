import axios from 'axios';
import { KoreaAirQualityResponse, AirPollutionData } from '../types/airPollution';

const API_KEY = process.env.REACT_APP_KOREA_AIR_API_KEY;
const BASE_URL = 'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';

function parseValue(val: any): number {
  if (val === null || val === undefined || val === '-' || val === '' || isNaN(Number(val))) return -1;
  return Number(val);
}

// 시/도별 대기질 정보 가져오기
export const getKoreaAirQuality = async (sidoName: string): Promise<AirPollutionData[]> => {
  try {
    const params = {
      serviceKey: API_KEY,
      sidoName,
      returnType: 'json',
      numOfRows: 100, // 최대 100개 측정소
      ver: '1.0',
    };
    const response = await axios.get<KoreaAirQualityResponse>(BASE_URL, { params });
    const res = response.data.response;
    if (!res || res.header?.resultCode !== "00" || !res.body || !Array.isArray(res.body.items)) {
      console.error('[API 비정상 응답]', response.data);
      throw new Error('공공데이터포털 API 응답이 비정상입니다.');
    }
    const items = res.body.items;
    console.log('[API 원본 데이터]', items);
    const parsed = items
      .map(item => ({
        stationName: item.stationName,
        pm10: parseValue(item.pm10Value),
        pm25: parseValue(item.pm25Value),
        o3: parseValue(item.o3Value),
        no2: parseValue(item.no2Value),
        so2: parseValue(item.so2Value),
        co: parseValue(item.coValue),
        dataTime: item.dataTime,
      }))
      // 적어도 하나의 주요 값이 유효한 측정소만 반환
      .filter(item => item.pm10 >= 0 || item.pm25 >= 0 || item.o3 >= 0 || item.no2 >= 0 || item.so2 >= 0 || item.co >= 0);
    console.log('[파싱 후 데이터]', parsed);
    return parsed;
  } catch (error: any) {
    if (error.response) {
      console.error('API 응답 에러:', error.response.data);
    } else {
      console.error('API 호출 실패:', error.message);
    }
    throw new Error('대기질 정보를 가져올 수 없습니다.');
  }
};

// 인기 도시(시/도) 목록
export const POPULAR_CITIES = [
  '서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '세종'
]; 