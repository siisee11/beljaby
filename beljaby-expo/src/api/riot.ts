import axios from "axios";

export async function getChampionSplash(championName: string, skin: number) {
   const response = await axios.get(`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${skin}.jpg`) 
   return response.data;
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