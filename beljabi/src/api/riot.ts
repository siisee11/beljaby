import axios from "axios";

export async function getUserProfile(name: string) {


    const response = await axios.get("https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/%ED%82%A4%EC%9C%84%ED%82%A4%EC%9C%841?api_key=RGAPI-be8339b0-4c5d-4634-9d51-3e5fa2391f38")
  
    return response.data; // 데이터 값을 바로 반환하도록 처리합니다.
}

export interface RiotProfile {
    "id": string,
    "accountId": string,
    "puuid": string,
    "name": string,
    "profileIconId": number,
    "revisionDate": number,
    "summonerLevel": number 
}