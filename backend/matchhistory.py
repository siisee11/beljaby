import encryptId
import requests
import json
import urllib.request
from matplotlib import pyplot as plt

def getCustomMatch(DEVELOPMENTAPIKEY,gameId,player_list):
    #encryptedId_li, accountId_li = [],[]
    #for p in player_list:
        #ei,ai = encryptId.encrypt(DEVELOPMENTAPIKEY,p)
        #encryptedId_li.append(ei)
        #accountId_li.append(ai)
    url = 'http://ddragon.leagueoflegends.com/cdn/11.1.1/data/ko_KR/champion.json'
    #jsonurl = urllib.request.urlopen(url)
    text_data = urllib.request.urlopen(url).read().decode('utf-8')
    ch_data = json.loads(text_data)

    key_ch = {}

    for i in ch_data['data'].values():
        key_ch[int(i['key'])] = i['id']
        
    headers = {
        "Origin": "https://developer.riotgames.com",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Riot-Token": DEVELOPMENTAPIKEY,
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
        }
    APIURL = "https://kr.api.riotgames.com/lol/match/v4/matches/" + str(gameId)
    res = requests.get(APIURL, headers=headers)
    data = res.json()

    print(data['gameType'],data['gameMode'])

    ch,k,d,a = [],[],[],[]
    for i in range(10):
        ch.append(data['participants'][i]['championId'])
        k.append(data['participants'][i]['stats']['kills'])
        d.append(data['participants'][i]['stats']['deaths'])
        a.append(data['participants'][i]['stats']['assists'])

    print('Team 1 : %s' %data["teams"][0]["win"])
    print('Team1 Score : %d' %(data["teams"][0]["towerKills"]+data["teams"][0]["riftHeraldKills"]*2+data["teams"][0]["dragonKills"]*2+data["teams"][0]["baronKills"]*3))
    for i in range(0,5):
        print('name : %s champion : %s Kill : %d Death : %d Assist : %d' %(player_list[i], ch_data['data'][key_ch[ch[i]]]['name'], k[i],d[i],a[i]))

    print()
    print('타워 : %d' %data["teams"][0]["towerKills"])
    print('전령 : %d' %data["teams"][0]["riftHeraldKills"])
    print('용   : %d' %data["teams"][0]["dragonKills"])
    print('바론 : %d' %data["teams"][0]["baronKills"])
    print()

    print('Team 2 : %s' %data["teams"][1]["win"])
    print('Team2 Score : %d' %(data["teams"][1]["towerKills"]+data["teams"][1]["riftHeraldKills"]*2+data["teams"][1]["dragonKills"]*2+data["teams"][1]["baronKills"]*3))

    for i in range(5,10):
        print('name : %s champion : %s Kill : %d Death : %d Assist : %d' %(player_list[i], ch_data['data'][key_ch[ch[i]]]['name'], k[i],d[i],a[i]))

    print()
    print('타워 : %d' %data["teams"][1]["towerKills"])
    print('전령 : %d' %data["teams"][1]["riftHeraldKills"])
    print('용   : %d' %data["teams"][1]["dragonKills"])
    print('바론 : %d' %data["teams"][1]["baronKills"])
    print()

if __name__ == "__main__":
    DEVELOPMENTAPIKEY = "RGAPI-49e9f548-3dd6-45de-a9e7-b78166efa6b0"
    gameId = 4898156665
    player = ['벨코즈하는사람', '키위키위1', '원추링', 'ByeongKeon Lee', 'Bloris', '배수행님', '선혈포식자누르기', 'K Rimi', '장뚝봬기', '홍태하']
    getCustomMatch(DEVELOPMENTAPIKEY,gameId,player)
