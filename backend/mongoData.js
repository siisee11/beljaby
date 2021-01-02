import mongoose from 'mongoose'

const answerSchema = mongoose.Schema({
    className: { type: String, required: true },
    classCode: { type: String, required: true },
    semester: { type: String, required: true },
    studentId: { type: String, required: true},
    test: [
        {
            name: String,
            answer: Object,
            warning: Object,
            score: Object,
            totalScore: Number,
            timestamp: { type: Date, default: Date.now },
        }
    ],
})

const userSchema = new mongoose.Schema({
    summonerId : { type: String, required: true, unique: true},
    gmail: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true }, 
    isAdmin: { type: Boolean, default: false},
});

const matchSchema = new mongoose.Schema({
    player: [
        {
            team: String,
            position: String,
            name: String,
            kill: Number,
            deawth: Number,
            assist: Number,
        }
    ],
    timestamp: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema);
export const Match = mongoose.model('Match', matchSchema);