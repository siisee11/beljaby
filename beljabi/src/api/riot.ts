import axios from "axios";

export async function getUserProfile(name: string) {

    const response = await axios({
        method: "GET",
        url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.66",
            "Accept-Language": "ko,en;q=0.9,en-US;q=0.8",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://beljabi-34d09.web.app",
            "X-Riot-Token": "RGAPI-49e9f548-3dd6-45de-a9e7-b78166efa6b0"
        },
    })

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
