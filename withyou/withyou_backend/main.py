from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import requests
from fastapi.middleware.cors import CORSMiddleware
import random

load_dotenv()

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

KAKAO_API_KEY = os.getenv("KAKAO_API_KEY")

class RecommendRequest(BaseModel):
    lat: float
    lng: float
    food: str
    retryKey: Optional[float] = None

class Place(BaseModel):
    name: str
    imageUrl: str
    mapUrl: Optional[str] = None

def search_tourist_places(lat, lng, size=5):
    url = "https://dapi.kakao.com/v2/local/search/category.json"
    headers = {"Authorization": f"KakaoAK {KAKAO_API_KEY}"}
    params = {
        "category_group_code": "AT4",
        "x": lng,
        "y": lat,
        "radius": 2000,
        "size": size
    }
    resp = requests.get(url, headers=headers, params=params)
    if resp.status_code != 200:
        return []
    data = resp.json()
    results = []
    for doc in data.get("documents", []):
        results.append({
            "name": doc["place_name"],
            "imageUrl": "",
            "mapUrl": doc.get("place_url")
        })
    return results

def search_places(query, lat, lng, size=5):
    url = "https://dapi.kakao.com/v2/local/search/keyword.json"
    headers = {"Authorization": f"KakaoAK {KAKAO_API_KEY}"}
    params = {
        "query": query,
        "size": size,
        "x": lng,
        "y": lat,
        "radius": 2000
    }
    resp = requests.get(url, headers=headers, params=params)
    if resp.status_code != 200:
        return []
    data = resp.json()
    results = []
    for doc in data.get("documents", []):
        results.append({
            "name": doc["place_name"],
            "imageUrl": "",
            "mapUrl": doc.get("place_url")
        })
    return results

@app.post("/recommend-course", response_model=List[Place])
def recommend_course(req: RecommendRequest):
    if req.retryKey is not None:
        random.seed(req.retryKey)
    # 관광명소(카테고리 검색)
    tourist_places = search_tourist_places(req.lat, req.lng, size=5)
    # 음식점(키워드 검색)
    foods = search_places(req.food, req.lat, req.lng, size=5)
    # 카페(무조건 '카페' 키워드)
    cafes = search_places('카페', req.lat, req.lng, size=5)
    course = []
    if tourist_places:
        course.append(random.choice(tourist_places))
    if foods:
        course.append(random.choice(foods))
    if cafes:
        course.append(random.choice(cafes))
    return course if course else [] 