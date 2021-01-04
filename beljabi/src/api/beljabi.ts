import axios from "../axios";

export interface BeljabiProfile {
    gmail: string,
    gname: string,
    summonerId: string | null,
    accountId: string | null,
    name: string,
    tier: string | null,
}

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