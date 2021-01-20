import mongoose from 'mongoose'

const summonerSchema = new mongoose.Schema({
    summonerId : { type: String, required: true, unique: true},
    summonerName : { type: String, required: true, unique: true}, 
    accountId : { type: String, required: true },
    tier: { type: String, default: "UNRANK"},
    elo: {type : Number, default: 1000},
    champion: {type : String, default: "Singed"}
})

const userSchema = new mongoose.Schema({
    gmail: { type: String, required: true, unique: true },
    gname: { type: String },
    name: { type: String, required: true }, 
    summonerId : { type: String, required: true },
    summoner: {type : mongoose.Schema.Types.ObjectId, ref: 'Summoner'},
    isAdmin: { type: Boolean, default: false },
    point: { type: Number, default: 10000 }
});

const joinSchema = new mongoose.Schema({
    currentGame: Boolean,
    summoners: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Summoner'} ],
})

const matchSchema = new mongoose.Schema({
    matchId: { type: String, required: true, unique: true },
    joiners: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Summoner'} ],
    teams: [
        {
            teamId: Number,
            win: String,
            baronKills: Number,
            dragonKills: Number,
            towerKills: Number,
            participants: [
                {
                    teamId: Number,
                    win: String,
                    champion: String,
                    lane: String,
                    name: String,
                    kills: Number,
                    deaths: Number,
                    assists: Number,
                    firstBloodKill: Boolean,
                    firstTowerKill: Boolean,
                    visionScore: Number,
                    totalCS: Number,
                    summoner: {type : mongoose.Schema.Types.ObjectId, ref: 'Summoner'},
                }
            ],
        }   
    ],
    timestamp: { type: Date, default: Date.now },
});

const tottoSchema = new mongoose.Schema({
    currentGame: Boolean,
    currentAvailable : { type: Boolean, default: true },
    match : {
        teams : [ 
            [
                {
                    summonerId : { type: String, required: true, unique: true},
                    summonerName : { type: String, required: true, unique: true}, 
                    accountId : { type: String, required: true },
                    tier: { type: String, default: "UNRANK"},
                    elo: {type : Number, default: 1000},
                    _id: {type : mongoose.Schema.Types.ObjectId, ref: 'Summoner'}
                }
            ] 
        ],
        elos : [ Number ],
        wps : [ Number ],
    },
    tottos : [
        {
            title: String,
            answer: String,
            options: [
                {
                    value: String,
                    participants : [ {
                            point: Number,
                            user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
                        }
                    ],
                }
            ]
        }
    ],
})

export const User = mongoose.model('User', userSchema);
export const Match = mongoose.model('Match', matchSchema);
export const Join = mongoose.model('Join', joinSchema);
export const Summoner = mongoose.model('Summoner', summonerSchema);
export const Totto = mongoose.model('Totto', tottoSchema);