import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { User, Match, Summoner } from './mongoData.js'
import axios from 'axios'

// app config
const app = express();
const port = process.env.PORT || 3003;

// middlewares
app.use(cors())
app.use(express.json())

// db config
const mongoURI = 'mongodb+srv://siisee11:nz8CORmYivSXiTpE@cluster0.6cnb5.mongodb.net/bejabiDB?retryWrites=true&w=majority'

// riot API config
const api_key = "RGAPI-49e9f548-3dd6-45de-a9e7-b78166efa6b0";

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('DB Connected')

    const changeStream = mongoose.connection.collection('conversations').watch()

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            pusher.trigger('channels', 'newChannel', {
                'change': change
            })
        } else if (change.operationType === 'update') {
            pusher.trigger('conversation', 'newMessage', {
                'change':change
            })
        } else {
            console.log('Error triggering Pusher')
        }
    })
})

//api routes
app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});


app.post('/new/user', (req, res) => {
    const userData = req.body
    var id = ''
    var tier = 'UNRANK'
    var accountId = ''
    var summonerName = ''

    axios({
        method: "GET",
        url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(userData.name)}`,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.66",
            "Accept-Language": "ko,en;q=0.9,en-US;q=0.8",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Riot-Token": "RGAPI-49e9f548-3dd6-45de-a9e7-b78166efa6b0"
        },
    }).then( (res1) => {
        id = res1.data.id
        accountId = res1.data.accountId
        summonerName = res1.data.name

        // If summoner allready exist create User here
        Summoner.findOne({summonerId : id}, (err, data) => {
            if (data) {
                User.create(
                    {
                        gmail: userData.gmail,
                        gname: userData.gname,
                        name: userData.name,
                        summonerId: id, 
                        summoner: data._id,
                    }
                    , (err, data) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send(err)
                    } else {
                        res.status(201).send(data)
                    }
                })
            } else {
                // Not found summoner then
                axios({
                    method: "GET",
                    url: `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.66",
                        "Accept-Language": "ko,en;q=0.9,en-US;q=0.8",
                        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                        "X-Riot-Token": "RGAPI-49e9f548-3dd6-45de-a9e7-b78166efa6b0"
                    },
                }).then( (res2) => {
                    res2.data.forEach(league => {
                    if( league["queueType"] == "RANKED_SOLO_5x5") {
                            tier = league["tier"]
                    } 
                    });

                    Summoner.create(
                        {
                        summonerId : id,
                        accountId : accountId,
                        summonerName : summonerName,
                        tier: tier
                        }, (err, data) => {
                            if (err) {
                                console.log(err)
                            } else {
                                User.create(
                                    {
                                        gmail: userData.gmail,
                                        gname: userData.gname,
                                        name: userData.name,
                                        summonerId: id, 
                                        summoner: data._id,
                                    }
                                    , (err, data) => {
                                    if (err) {
                                        console.log(err)
                                        res.status(500).send(err)
                                    } else {
                                        res.status(201).send(data)
                                    }
                                })
                            }
                        }
                    )
                })
            }
        })
    })
})

app.post('/new/match', async (req, res) => {
    const matchData = req.body
    var newPlayer = []

    await Promise.all(matchData.player.map( async (player) => {
        let result = await Summoner.findOne({summonerName: player.name}).exec()
        player = { ...player, summoner:result._id }
        newPlayer.push(player)
    }))

    Match.create({ player: newPlayer }, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.post('/new/summoners', (req, res) => {
    const summoners = req.body.player
    var id = ''
    var tier = 'UNRANK'
    var accountId = ''
    var summonerName = ''
    var elo = 1200

    summoners.map((summoner) => {
        console.log(summoner)
        axios({
            method: "GET",
            url: `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summoner.name)}`,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.66",
                "Accept-Language": "ko,en;q=0.9,en-US;q=0.8",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Riot-Token": "RGAPI-49e9f548-3dd6-45de-a9e7-b78166efa6b0"
            },
        }).then( (res1) => {
            console.log("res1", res1.data)
            id = res1.data.id
            accountId = res1.data.accountId
            summonerName = res1.data.name
            axios({
                method: "GET",
                url: `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.66",
                    "Accept-Language": "ko,en;q=0.9,en-US;q=0.8",
                    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                    "X-Riot-Token": "RGAPI-49e9f548-3dd6-45de-a9e7-b78166efa6b0"
                },
            }).then( (res2) => {
                console.log("res2", res2.data)
                res2.data.forEach(league => {
                    if( league["queueType"] == "RANKED_SOLO_5x5") {
                            tier = league["tier"]
                    } 
                });

                // Tier to Elo
                if (tier == "BRONZE"){
                    elo = 1000
                } else if (tier == "SILVER") {
                    elo = 1200
                } else if (tier == "GOLD") {
                    elo = 1400
                } else if (tier == "PLATINUM") {
                    elo = 1600
                } else if (tier == "DIAMOND") {
                    elo = 1800
                } else {
                    elo = 1000
                }

                Summoner.create(
                    {
                        summonerId : id,
                        accountId : accountId,
                        summonerName : summonerName,
                        tier: tier,
                        elo: elo,
                    }, (err, data) => {
                        if (err) {
                            console.log(err)
                            res.status(500).send(err)
                        } else {
                            res.status(201).send(data)
                        }
                    }
                )
            })
        })
    })
})

app.get('/sync', async (req, res) => {

    // ELO initialize
    const summoners = await Summoner.find().exec()

    await Promise.all(summoners.map( async (summoner) => {
        let tier = summoner.tier
        let elo = 1000
        // Tier to Elo
        if (tier == "BRONZE"){
            elo = 1000
        } else if (tier == "SILVER") {
            elo = 1200
        } else if (tier == "GOLD") {
            elo = 1400
        } else if (tier == "PLATINUM") {
            elo = 1600
        } else if (tier == "DIAMOND") {
            elo = 1800
        } else {
            elo = 1000
        }

        await Summoner.updateOne({summonerId: summoner.summonerId}, {elo: elo})
    }))

    var nrMatch = 0

    let result = await Match.find().exec()
    nrMatch = result.length 
    console.log(nrMatch, result)

    for ( let i = 0 ; i < nrMatch; i++ ){
        let matches = await Match.find().populate({ path: 'player.summoner'}).exec()
        var m = matches[i]
        var winElo = 0
        var defeatElo = 0
        var winKill = 0
        var defeatKill = 0

        await Promise.all(m.player.map( async (player) => {
            if (player.team == "Win") {
                winElo += player.summoner.elo
                winKill += player.kill
            } else {
                defeatElo += player.summoner.elo
                defeatKill += player.kill
            }
        }))
        console.log("win", winElo, winKill, "defeat", defeatElo, defeatKill)
        var winE = 1 / ( 1 + Math.pow(10, (defeatElo - winElo)/400))
        var defeatE = 1 / ( 1 + Math.pow(10, (winElo - defeatElo )/400))
        console.log("winE", winE, "defeatE", defeatE)

        var winR = 200 * (1 - winE) 
        var defeatR = 200 * (0 - defeatE)
        console.log("winR", winR, "defeatR", defeatR)

        await Promise.all(m.player.map( async (player) => {
            var contribution = 0;
            var gain = 0;
            if (player.team == "Win"){
                contribution = 0.4 + (player.kill + player.assist) / winKill
                gain = winR / 5
            } else {
                contribution = 1.2 - ((player.kill + player.assist) / defeatKill)
                gain = defeatR / 5
            }
            console.log(contribution)
            var newElo = player.summoner.elo + gain * contribution - (player.death * 0.5)

            await Summoner.updateOne({summonerName: player.name }, {elo: newElo});
        }))
    }

    res.status(200).send({success: true})
});

app.get('/get/user', (req, res) => {
    const gmail = req.query.gmail

    User.findOne({ gmail: gmail}, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.get('/get/userList', (req, res) => {
    User.find().populate('summoner').exec((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            let users = []

            data.map((userData) => {
                const userInfo = {
                    name: userData.name,
                    gname: userData.gname,
                    elo: userData.summoner.elo,
                }

                users.push(userInfo)
            })

            res.status(200).send(users)
        }
    })
})

app.get('/get/summoner', (req, res) => {
    const summonerId = req.query.summonerId

    Summoner.findOne({ summonerId: summonerId}).populate('summoner').exec((err, data) => {
        console.log("findOne", data)
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.get('/get/summonerList', (req, res) => {
    Summoner.find().exec((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            let summoners = []

            data.map((userData) => {
                const summonerInfo = {
                    summonerId: userData.summonerId,
                    summonerName: userData.summonerName,
                }

                summoners.push(summonerInfo)
            })

            res.status(200).send(summoners)
        }
    })
})

app.post('/get/matchmaking', async (req, res) => {
    const summoners = req.body.names
    let teams = new Array(2)
    for (let i = 0 ; i < teams.length; i++) {
        teams[i] = []
    }
    let pair = []

    await Promise.all(summoners.map( async (summoner) => {
        let result = await Summoner.findOne({ summonerName: summoner}).exec()
        pair.push(result)
    }))

    pair.sort((a,b) => {
        return b["elo"] - a["elo"]
    })
    console.log("sorted pair", pair)

    let teamElo = [pair[0].elo, pair[1].elo]
    teams[0].push(pair[0])
    teams[1].push(pair[1])
    for ( let i = 2 ; i < pair.length; i++ ){
        let turn = teamElo[0] - teamElo[1] < 0 ? 0 : 1;
        teams[turn].push(pair[i]) 
        teamElo[turn] += pair[i].elo
    }

    console.log("teams", teams)
    console.log("teamElo", teamElo)

    res.status(200).send(teams)
})

//listen
app.listen(port, () => console.log(`listening on localhost on ${port}`))
