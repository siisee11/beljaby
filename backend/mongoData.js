import mongoose from 'mongoose'

const summonerSchema = new mongoose.Schema({
    summonerId : { type: String, required: true, unique: true},
    summonerName : { type: String, required: true, unique: true}, 
    accountId : { type: String, required: true },
    tier: { type: String, default: "UNRANK"},
    elo: {type : Number, default: 1000},
})

const userSchema = new mongoose.Schema({
    gmail: { type: String, required: true, unique: true },
    gname: { type: String },
    name: { type: String, required: true }, 
    summonerId : { type: String, required: true },
    summoner: {type : mongoose.Schema.Types.ObjectId, ref: 'Summoner'},
    isAdmin: { type: Boolean, default: false},
});

const matchSchema = new mongoose.Schema({
    matchId: { type: String, required: true, unique: true },
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

export const User = mongoose.model('User', userSchema);
export const Match = mongoose.model('Match', matchSchema);
export const Summoner = mongoose.model('Summoner', summonerSchema);