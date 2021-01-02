import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import { User } from './mongoData.js'

// app config
const app = express();
const port = process.env.PORT || 3003;

// middlewares
app.use(cors())
app.use(express.json())

// db config
const mongoURI = 'mongodb+srv://siisee11:nz8CORmYivSXiTpE@cluster0.6cnb5.mongodb.net/bejabiDB?retryWrites=true&w=majority'

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

    User.create(userData, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.post('/new/match', (req, res) => {
    console.log('Got new match')
    const matchData = req.body

    Match.create(matchData, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})


app.get('/get/user', (req, res) => {
    const gmail = req.query.gmail

    User.find({ gmail: gmail}, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})


//listen
app.listen(port, () => console.log(`listening on localhost on ${port}`))
