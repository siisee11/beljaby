import requests
from urllib import parse

def encrypt(DEVELOPMENTAPIKEY,summonerName):
    encodingSummonerName = parse.quote(summonerName)
    #print(encodingSummonerName)
    APIURL = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + encodingSummonerName
    headers = {
        "Origin": "https://developer.riotgames.com",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Riot-Token": DEVELOPMENTAPIKEY,
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"
        }
    res = requests.get(APIURL, headers=headers)
    data = res.json()
    #print(data["id"])
    return data["id"], data["accountId"]

if __name__ == "__main__":
    print(encrypt("RGAPI-49e9f548-3dd6-45de-a9e7-b78166efa6b0","Bloris"))