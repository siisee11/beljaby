import axios from "../axios";

export interface BeljabiProfile {
    _id: string,
    gmail: string,
    gname: string,
    summonerId: string,
    accountId: string,
    summoner: string,
    name: string,
    tier: string,
    isAdmin: boolean,
}

export type Summoner = {
  _id: string,
  tier: string,
  elo: number,
  summonerId: string,
  accountId: string,
  summonerName: string,
}

export type Match = {
    matchId: string,
    teams: [
        {
            teamId: number,
            win: string,
            baronKills: number,
            dragonKills: number,
            towerKills: number,
            participants: [
                {
                    teamId: number,
                    win: string,
                    champion: string,
                    lane: string,
                    name: string,
                    kills: number,
                    deaths: number,
                    assists: number,
                    firstBloodKill: boolean,
                    firstTowerKill: boolean,
                    visionScore: number,
                    totalCS: number,
                }
            ],
        }   
    ],
}

export type Totto = {
  currentAvailable: boolean,
  currentGame: boolean,
  match: {
      teams: Array<object>,
      elos: Array<number>,
      wps: Array<number>,
  },
  tottos: [
      {
        title: string,
        options: [
            {
                value: string,
                participants: [
                    {
                        point: number,
                        user: string,
                    }
                ]
            }
        ]
      },
  ]
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

export async function getMatchMaking() {
    const response = await axios.post(`/get/matchMaking`)
    return response.data
}

export async function getMatchList() {
    const response = await axios.get(`/get/matchList`)
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

export async function setJoinSummoner(summoner: object) {
    const response = await axios.post(`/new/join`, summoner)
    return response.data
}

export async function getJoin() {
    const response = await axios.get(`/get/join`)
    return response.data
}