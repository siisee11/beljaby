import requests

api_key = "RGAPI-49e9f548-3dd6-45de-a9e7-b78166efa6b0"

print("1: 플레이어 검색")
selectnum = input("번호를 입력해주세요: ")

if selectnum == "1":
    name = input("소환사의 닉네임을 입력해주세요: ")
    URL = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+name
    res = requests.get(URL, headers={"X-Riot-Token": api_key})
    if res.status_code == 200:
        print(res.text)
    else:
        selectnum("소환사가 존재하지 않습니다")
