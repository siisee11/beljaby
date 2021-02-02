import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { User, Join, Match, Summoner, Totto } from './mongoData.js'
import axios from 'axios'
import { pusher } from "./myPusher.js"
import { mongoURI, riotApiKey } from "./secrets.js"

// app config
const app = express();
const port = process.env.PORT || 3003;

// middlewares
app.use(cors())
app.use(express.json())


mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('DB Connected')

//    const changeStream = mongoose.connection.collection('Totto').watch()
    const tottoChangeStream = Totto.watch()
    tottoChangeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            pusher.trigger('totto-channel', 'newTotto', {
                'change':change
            })
        } else if (change.operationType === 'update') {
            pusher.trigger('totto-channel', 'updateTotto', {
                'change':change
            })
        } else if (change.operationType === 'delete') {
            console.log('Delete Totto')
        } else {
            console.log('Error triggering Pusher')
        }
    })

    const joinChangeStream = Join.watch()
    joinChangeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            pusher.trigger('join-channel', 'newJoin', {
                'change':change
            })
        } else if (change.operationType === 'update') {
            pusher.trigger('join-channel', 'updateJoin', {
                'change':change
            })
        } else if (change.operationType === 'delete') {
            console.log('Delete Join')
        } else {
            console.log('Error triggering Pusher')
        }
    })

    const UserChangeStream = User.watch()
    UserChangeStream.on('change', (change) => {
        if (change.operationType === 'update') {
            pusher.trigger('user-channel', 'updateUser', {
                'change':change
            })
        } else if (change.operationType === 'delete') {
            console.log('Delete User')
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

app.get('/updateUser', (req, res) => {
    User.updateMany(
        {},
        { $set: {"point": 10000} },
    ).exec().catch( (err) => {
        console.log(err)
    })
})

app.get('/updateSummoner', (req, res) => {
    Summoner.updateMany(
        {},
        { $set: {"champion": "Singed"} },
    ).exec().catch( (err) => {
        console.log(err)
    })
})

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
            "X-Riot-Token": riotApiKey,
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
                        "X-Riot-Token": riotApiKey
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
    var newTeams = []

    await Promise.all(matchData.teams.map( async (team) => {
        var newParticipants = []
        await Promise.all(team.participants.map ( async (participant) => {
            let result = await Summoner.findOne({summonerName: participant.name}).exec()
            participant = { ...participant, summoner:result._id }
            newParticipants.push(participant)
        }))
        team = {...team, participants:newParticipants}
        newTeams.push(team)
    }))

    await Match.create({ ...matchData, teams: newTeams })

    /* Update elo */
    let m = await Match.findOne(
        {}, {}, { sort: { _id : -1 }}
    ).populate({ path: 'teams.participants.summoner'}).exec()
    var elos = [0 , 0]
    var kills = [0 , 0]

    await Promise.all(m.teams.map( async (team) => {
        var teamId = (team.win == "Win" ? 0 : 1)
        await Promise.all(team.participants.map ( async (participant) => {
            elos[teamId] += participant.summoner.elo
            kills[teamId] += participant.kills
        }));
    }))

    var expectedWinRates = [0, 0]
    expectedWinRates[0] = 1 / ( 1 + Math.pow(10, (elos[1] - elos[0])/400))
    expectedWinRates[1] = 1 / ( 1 + Math.pow(10, (elos[0] - elos[1])/400))

    var deltas = [0, 0]
    deltas[0] = 50 * (1 - expectedWinRates[0]) 
    deltas[1] = 50 * (0 - expectedWinRates[1]) 

    await Promise.all(m.teams.map( async (team) => {
        await Promise.all(team.participants.map ( async (participant) => {
            var contribution = 0;
            var gain = 0;
            if ( participant.win == "true"){
                contribution = 0.3
                     + ((participant.kills + participant.assists) / kills[0])
                     + 0.001 * participant.totalCS
                     - (participant.deaths * 0.015)
                gain = deltas[0]
            } else {
                contribution = 1.2
                    - ((participant.kills + participant.assists) / kills[1])
                    - 0.001 * participant.totalCS
                    + 0.015 * participant.deaths
                gain = deltas[1]
            }
            var newElo = participant.summoner.elo + gain * contribution
            console.log(participant.name, gain* contribution)

            await Summoner.updateOne({summonerName: participant.name }, {elo: newElo});
        }))
    }))

    console.log("Elo updated")
    res.status(200).send({success: true})
})

app.post('/new/currentTotto', async (req, res) => {
    const tottoData = req.body

    Totto.updateOne({currentGame : true}, {$push : {tottos: { $each : tottoData.tottos }}}).exec().then((data)=> {
        res.status(201).send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.post('/new/currentTotto/guess', async (req, res) => {
    const tottoData = req.body
    const title = tottoData.title
    const value = tottoData.value
    const participant = tottoData.participant
    let option = {
        value: value,
    }

    Totto.findOne(
        { currentGame : true},
    ).exec( (finderr, data) => {
        if (finderr){
            res.status(500).send(finderr)
        }
        if (data.currentAvailable) {
            Totto.updateOne(
                { currentGame: true },
                { $push: {"tottos.$[i].options.$[j].participants" : participant }},
                {
                    arrayFilters: [
                        { "i.title" : title },
                        { "j.value" : value }
                    ]
                }
            ).exec().then( data => {
                if (data.nModified == 0) {
                    /* create new option and insert participant */
                    Totto.updateOne(
                        { currentGame: true },
                        { $push: {"tottos.$[i].options" : option} },
                        {
                            "upsert": true,
                            "arrayFilters": [
                                { "i.title" : title },
                            ]
                        }
                    ).exec().then( () => {
                        Totto.updateOne(
                            { currentGame: true },
                            { $push: {"tottos.$[i].options.$[j].participants" : participant }},
                            {
                                arrayFilters: [
                                    { "i.title" : title },
                                    { "j.value" : value }
                                ]
                            }
                        ).exec().then( data1 => {
                            res.status(201).send(data1)
                        })
                    }) 
                } else {
                    /* insert participant */
                    res.status(201).send(data)
                }
            }).catch ((err) => {
                /* No option found */
                /* create new option and insert participant */
                Totto.updateOne(
                    { currentGame: true },
                    { $push: {"tottos.$[i].options" : option} },
                    {
                        "upsert": true,
                        "arrayFilters": [
                            { "i.title" : title },
                        ]
                    }
                ).exec().then( () => {
                    Totto.updateOne(
                        { currentGame: true },
                        { $push: {"tottos.$[i].options.$[j].participants" : participant }},
                        {
                            arrayFilters: [
                                { "i.title" : title },
                                { "j.value" : value }
                            ]
                        }
                    ).exec().then( data1 => {
                        res.status(201).send(data1)
                    })
                })
            }).catch ( (err1) => {
                /* real error */
                res.status(500).send(err1)
            })
        } else {
            res.status(500).send({ err: "timeout"});
        }
    })
})

app.post('/new/currentTotto/result', async (req, res) => {
    const answers = req.body.answers

    let result = await Totto.findOne(
        { currentGame: true }
    ).exec( (err, data) => {
        let tottos = data.tottos
        let new_tottos = []
        tottos.map( (totto, i) => {
            totto.answer = answers[i].answer
            new_tottos.push(totto) 
        })
        Totto.updateOne(
            { currentGame: true},
            { $set : {tottos: new_tottos}}
        ).then( data => {
            res.status(201).send(data)
        }).catch (err => {
            res.status(500).send(err)
        })
    })
})

app.post('/new/join', async (req, res) => {
    const summoner = req.body.summoner
    console.log(summoner, "Joined.")
    let ret = await Join.updateOne(
        { currentGame: true },
        { $addToSet: {summoners : summoner}},
        { upsert: true }
    ).exec()

    /* Dup */
    if (ret.upserted) {
        res.status(201).send()
        return
    }
    else if ( ret.nModified == 0) {
        res.status(500).send()
        return
    } 

    /* If update success */
    Join.findOne(
        { currentGame: true}
    ).populate('summoners').then( async (data) => {
        const summoners = data.summoners

        /* if 10 summoner joined */
        if (summoners.length == 10) {
            let teams = new Array(2)
            for (let i = 0 ; i < teams.length; i++) {
                teams[i] = []
            }
            let pair = []

            await Promise.all(summoners.map( async (summoner) => {
                let result = await Summoner.findOne({ summonerName: summoner.summonerName}).exec()
                pair.push(result)
            }))

            pair.sort((a,b) => {
                return b["elo"] - a["elo"]
            })

            let teamElo = [pair[0].elo, pair[1].elo]
            teams[0].push(pair[0])
            teams[1].push(pair[1])
            for ( let i = 2 ; i < pair.length; i++ ){
                let turn = teamElo[0] - teamElo[1] < 0 ? 0 : 1;
                teams[turn].push(pair[i]) 
                teamElo[turn] += pair[i].elo
            }

            let wps = []
            wps.push(100 * (1 / (1 + Math.pow(10, (teamElo[1]/5 - teamElo[0]/5)/400))))
            wps.push(100 * (1 / (1 + Math.pow(10, (teamElo[0]/5 - teamElo[1]/5)/400))))

            let match = { teams: teams, elos: teamElo, wps: wps}

            Totto.create({ currentGame: true, match: match }, (err, data) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    /* Delete Join */
                    res.status(201).send(data)
                }
            })
       } else {
           /* not yet */
            res.status(200).send()
       }
   })
})

app.post('/new/join/change', async (req, res) => {
    Join.findOne(
        { currentGame: true}
    ).populate('summoners').then( async (data) => {
        const summoners = data.summoners

        /* if 10 summoner joined */
        if (summoners.length == 10) {
            /* get summoner info from Summoner collection */
            let pair = summoners

            let averageElo = pair.reduce(function add(sum, currValue) {
                                return sum + currValue.elo;
                            }, 0);
            averageElo /= 2;

            console.log("team average elo", averageElo)

            function combination(source, target, n, r, count) { 
                if(r === 0) {
                    let sum = target.reduce(function add(sum, currValue) {
                        return sum + currValue.elo;
                    }, 0);
                    if (sum > averageElo - 50 && sum < averageElo + 50)
                        final.push(target);
                }
                else if(n === 0 || n < r) return; 
                else { 
                    target.push(source[count]); 
                    combination(source, Object.assign([], target), n - 1, r - 1, count + 1); 
                    target.pop(); 
                    combination(source, Object.assign([], target), n - 1, r, count + 1); 
                } 
            } 
            
            const final = [];  /* this array contains combination of summoners */
            combination(pair, [], 10, 5, 0); 

            if (final.length == 0) {
                res.status(500).send({err: "no possible match"})
                return
            }
            console.log(final[0])

            let teams = []
            let teamElo = []
            let randomTeam = final[Math.floor(Math.random() * final.length)];
            randomTeam.sort((a,b) => {
                return b["elo"] - a["elo"]
            })
            console.log("randomTeam", randomTeam)
            let oppsite = pair.filter(x => !randomTeam.includes(x))
            oppsite.sort((a,b) => {
                return b["elo"] - a["elo"]
            })
            console.log("opposite", oppsite)
            teams.push(randomTeam)
            teams.push(oppsite);
            teamElo.push(randomTeam.reduce(function add(sum, currValue) {
                return sum + currValue.elo;
            }, 0));
            teamElo.push(oppsite.reduce(function add(sum, currValue) {
                return sum + currValue.elo;
            }, 0));

            let wps = []
            wps.push(100 * (1 / (1 + Math.pow(10, (teamElo[1]/5 - teamElo[0]/5)/400))))
            wps.push(100 * (1 / (1 + Math.pow(10, (teamElo[0]/5 - teamElo[1]/5)/400))))

            console.log(teams, teamElo, wps)
            let match = { teams: teams, elos: teamElo, wps: wps}

            Totto.updateOne({ currentGame: true}, { $set : { match: match }}, (err, data) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    /* Delete Join */
                    res.status(201).send(data)
                }
            })
       } else {
           /* not yet */
            res.status(200).send()
       }
   })
})


app.post('/new/matchMaking', async (req, res) => {
    const match = req.body
    Totto.create({ currentGame: true, match: match }, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.post('/new/startMatch', async (req, res) => {
    Totto.updateOne(
        { currentGame: true },
        { currentAvailable: false },
    ).then((data) => {
        res.status(201).send(data)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

app.post('/new/finishMatch', async (req, res) => {
    Totto.findOne(
        { currentGame: true},
    ).populate({ path: 'tottos.options.participants.user'}).exec((err, data) => {
        if (data.tottos) {
            let tottos = data.tottos
            tottos.map((totto) => {
                let answer = totto.answer
                totto.options.map((option) => {
                    if (option.value === answer){
                        /* Correct */
                        option.participants.map((participant) => {
                            User.updateOne(
                                { _id : participant.user._id },
                                { $inc: {point: participant.point }}
                            ).catch( err => {
                                console.log(err)
                            })
                        })
                    } else {
                        /* Incorrect */
                        option.participants.map((participant) => {
                            User.updateOne(
                                { _id : participant.user._id },
                                { $inc: {point: -1 * participant.point }}
                            ).catch( err => {
                                console.log(err)
                            })
                        })
                    }
                })
            })
        }
    })

    Totto.updateOne(
        { currentGame: true },
        { currentGame: false },
    ).then((data) => {
        res.status(201).send(data)
    }).catch((e)=>{
        res.status(500).send(e)
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
                "X-Riot-Token": riotApiKey
            },
        }).then( (res1) => {
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
                    "X-Riot-Token": riotApiKey
                },
            }).then( (res2) => {
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

        /* 벨하사 예외 처리 */
        if (summoner.summonerName == "벨코즈하는사람")
            elo = 1800

        await Summoner.updateOne({summonerId: summoner.summonerId}, {elo: elo})
    }))

    var nrMatch = 0

    /* TODO: Count Query */
    let result = await Match.find().exec()
    nrMatch = result.length 

    for ( let i = 0 ; i < nrMatch; i++ ){
        let matches = await Match.find().populate({ path: 'teams.participants.summoner'}).exec()
        var m = matches[i]
        var elos = [0 , 0]
        var kills = [0 , 0]

        await Promise.all(m.teams.map( async (team) => {
            var teamId = (team.win == "Win" ? 0 : 1)
            await Promise.all(team.participants.map ( async (participant) => {
                elos[teamId] += participant.summoner.elo
                kills[teamId] += participant.kills
            }));
        }))

//        console.log("win", elos[0], kills[0], "defeat", elos[1], kills[1])
        var expectedWinRates = [0, 0]
        expectedWinRates[0] = 1 / ( 1 + Math.pow(10, (elos[1] - elos[0])/400))
        expectedWinRates[1] = 1 / ( 1 + Math.pow(10, (elos[0] - elos[1])/400))
//        console.log("winE", expectedWinRates[0], "defeatE", expectedWinRates[1])

        var deltas = [0, 0]
        deltas[0] = 50 * (1 - expectedWinRates[0]) 
        deltas[1] = 50 * (0 - expectedWinRates[1]) 
        console.log("winR", deltas[0], "defeatR", deltas[1])

        await Promise.all(m.teams.map( async (team) => {
            await Promise.all(team.participants.map ( async (participant) => {
                var contribution = 0;
                var gain = 0;

                if ( participant.win == "true"){
                    contribution = 0.3
                        + ((participant.kills + participant.assists) / kills[0])
                        + 0.001 * participant.totalCS
                        - (participant.deaths * 0.015)
                    gain = deltas[0]
                } else {
                    contribution = 1.2
                        - ((participant.kills + participant.assists) / kills[1])
                        - 0.001 * participant.totalCS
                        + 0.015 * participant.deaths
                    gain = deltas[1]
                }
                var newElo = participant.summoner.elo + gain * contribution
                console.log(participant.name, gain* contribution)

                await Summoner.updateOne({summonerName: participant.name }, {elo: newElo});
            }))
        }))
    }

    console.log("Elo updated")
    res.status(200).send({success: true})
});

/*-----------------------------------GET-----------------------------*/

app.get('/get/currentTotto', (req, res) => {
    Totto.findOne({ currentGame : true }).exec((err,data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.get('/get/join', (req, res) => {
    Join.findOne({currentGame: true}).populate('summoners').exec( (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.get('/get/user', (req, res) => {
    const gmail = req.query.gmail

    User.findOne({ gmail: gmail}, (err, data) => {
        console.log("User logged in ", data.name)
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
                    point: userData.point,
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

    /* get summoner info from Summoner collection */
    let pair = []
    let eloPair = []
    await Promise.all(summoners.map( async (summoner) => {
        let result = await Summoner.findOne({ summonerName: summoner}).exec()
        pair.push(result)
        eloPair.push(result.elo)
    }))

    let averageElo = eloPair.reduce(function add(sum, currValue) {
                        return sum + currValue;
                    }, 0);
    averageElo /= 2;
    console.log("team average elo", averageElo)

    function combination(source, target, n, r, count) { 
        if(r === 0) {
            let sum = target.reduce(function add(sum, currValue) {
                return sum + currValue.elo;
            }, 0);
            if (sum > averageElo - 50 && sum < averageElo + 50)
                final.push(target);
        }
        else if(n === 0 || n < r) return; 
        else { 
            target.push(source[count]); 
            combination(source, Object.assign([], target), n - 1, r - 1, count + 1); 
            target.pop(); 
            combination(source, Object.assign([], target), n - 1, r, count + 1); 
        } 
    } 
    
    const final = [];  /* this array contains combination of summoners */
    combination(pair, [], 10, 5, 0); 
//    console.log(final[0])

    let teams = []
    let teamElo = []
    let randomTeam = final[Math.floor(Math.random() * final.length)];
    randomTeam.sort((a,b) => {
        return b["elo"] - a["elo"]
    })
//    console.log("randomTeam", randomTeam)
    let oppsite = pair.filter(x => !randomTeam.includes(x))
    oppsite.sort((a,b) => {
        return b["elo"] - a["elo"]
    })
//    console.log("opposite", oppsite)
    teams.push(randomTeam)
    teams.push(oppsite);
    teamElo.push(randomTeam.reduce(function add(sum, currValue) {
        return sum + currValue.elo;
    }, 0));
    teamElo.push(oppsite.reduce(function add(sum, currValue) {
        return sum + currValue.elo;
    }, 0));

    let wps = []
    wps.push(100 * (1 / (1 + Math.pow(10, (teamElo[1]/5 - teamElo[0]/5)/400))))
    wps.push(100 * (1 / (1 + Math.pow(10, (teamElo[0]/5 - teamElo[1]/5)/400))))

//    console.log(teams, teamElo, wps)

    res.status(200).send({ teams: teams, elos: teamElo, wps: wps})
})

app.get('/get/matchList', (req, res) => {
    Match.find().sort({_id:-1}).limit(3).exec( (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.get('/get/matchById', async (req, res) => {
    const matchId = req.query.matchId
    let teamInfo = []
    let matchInfo = []

    axios.get('http://ddragon.leagueoflegends.com/cdn/11.1.1/data/ko_KR/champion.json')
    .then( (data) => {
        let ch_data = data.data

        axios({
            method: "GET",
            url: `https://kr.api.riotgames.com/lol/match/v4/matches/${matchId}`,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.66",
                "Accept-Language": "ko,en;q=0.9,en-US;q=0.8",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://developer.riotgames.com",
                "X-Riot-Token": riotApiKey
            },
        }).then( (res1) => {
            let match_data = res1.data
            for (let i = 0 ; i < 2 ; i++ ) {
                let team_data = match_data["teams"][i]
                let trim_team = {
                    teamId: team_data["teamId"],
                    win: team_data["win"],
                    baronKills: team_data["baronKills"],
                    dragonKills: team_data["dragonKills"],
                    towerKills: team_data["towerKills"],
                }

                let participants_data = []

                for (let j = 5 * i ; j < 5 * (i + 1); j++ ) {
                    let participant = match_data["participants"][j]
                    let championId = participant["championId"]
                    let trim_participant = {
                        teamId: participant["teamId"],
                        win: participant["stats"]["win"],
                        lane: participant["timeline"]["lane"],
                        kills: participant["stats"]["kills"],
                        deaths: participant["stats"]["deaths"],
                        assists: participant["stats"]["assists"],
                        firstBloodKill: participant["stats"]["firstBloodKill"],
                        firstTowerKill: participant["stats"]["firstTowerKill"],
                        visionScore: participant["stats"]["visionScore"],
                        totalCS: participant["stats"]["totalMinionsKilled"] + participant["stats"]["neutralMinionsKilled"],
                    }
                    for (let ch in ch_data["data"]) {
                        if (ch_data["data"][ch]["key"] == championId) {
                            trim_participant.champion = ch_data["data"][ch]["name"]
                        }
                    }
                    participants_data.push(trim_participant)
                }

                trim_team.participants = participants_data

                teamInfo.push(trim_team)
            }

            matchInfo = { matchId: matchId, teams: teamInfo}
            res.status(201).send(matchInfo)
        }).catch ((err) => {
            console.log(err)
        });
    }).catch ((err) => {
        console.log(err)
    })

})


//listen
app.listen(port, () => console.log(`listening on localhost on ${port}`))
