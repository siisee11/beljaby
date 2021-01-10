import axios from "../axios";

export interface BeljabiProfile {
    _id: string,
    gmail: string,
    gname: string,
    summonerId: string | null,
    accountId: string | null,
    name: string,
    tier: string | null,
}


export type Summoner = {
  _id: string,
  tier: string,
  elo: number,
  summonerId: string,
  accountId: string,
  summonerName: string,
}

export type RiotMatchMakingInfoProps = {
  teams: Array<Array<Summoner>> | null;
  elos: Array<Array<number>> | null;
  wps: Array<Array<number>> | null;
};

export async function getUser(email: string) {
    const response = await axios.get(`/get/user?gmail=${email}`)
    return response.data
}

export async function setUser(user: BeljabiProfile) {
    const response = await axios.post(`/new/user`, user)
    return response.data
}

export async function getUserList() {
    const response = await axios.get(`/get/userList`)
    return response.data
}

export async function getSummoner(summonerId: string) {
    const response = await axios.get(`/get/summoner?summonerId=${summonerId}`)
    return response.data
}

export async function getSummonerList() {
    const response = await axios.get(`/get/summonerList`)
    return response.data
}

export async function syncElo() {
    const response = await axios.get(`/sync`)
    return response.data
}

export async function setMatchMaking(match: RiotMatchMakingInfoProps ) {
    const response = await axios.post(`/new/matchMaking`, match)
    return response.data
}

export async function getCurrentTotto() {
    const response = await axios.get(`/get/currentTotto`)
    return response.data
}

export async function setCurrentTotto(totto) {
    const response = await axios.post(`/new/currentTotto`, totto)
    return response.data
}

export async function setCurrentTottoResult(totto) {
    const response = await axios.post(`/new/currentTotto/result`, totto)
    return response.data
}

export async function setCurrentTottoGuess(totto) {
    const response = await axios.post(`/new/currentTotto/guess`, totto)
    return response.data
}

export async function startMatch() {
    const response = await axios.post(`/new/startMatch`);
    return response.data
}

export async function finishMatch() {
    const response = await axios.post(`/new/finishMatch`);
    return response.data
}