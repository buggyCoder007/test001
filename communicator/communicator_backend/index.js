require('dotenv').config({ path: '/.env' })

const e = require('express');
const express = require('express');
const Datastore = require('nedb-promises');
const routes = require('./routes/routes');
const cors = require('cors')


let db = new Datastore();
db = {};
db.users = Datastore.create('./database/users.db');
db.transcriptions = Datastore.create('./database/transcriptions.db');

// let datastore = Datastore.create('/path/to/db.db')


db.users.loadDatabase();
db.transcriptions.loadDatabase();

let userDoc = [{
        firstName: "James",
        lastName: "Tiberius Kirk",
        nickName: "Captain Kirk"
    },
    {
        firstName: "Christine",
        lastName: "Chapel",
    },
    {
        firstName: "Montgomery",
        lastName: "Scott",
        nickName: "Scotty"
    },
    {
        firstName: "Leornard",
        lastName: "McCoy",
        nickName: "Bones"
    },
    {
        firstName: "Janice",
        lastName: "Rand",
    }
]


let transcriptionsDoc = [{
    sampleTranscription: "incoming transmission"
}]

//bulk inserting data when start in in-memomry db nedb

db.users
    .insert(userDoc)
    .then((newDocs) => {
        console.log(`Successfully Inserted ${newDocs.length} user data...:)`);
    })
    .catch((err) => {
        console.log('Error occured while bulk loading user data', err)
    });

db.transcriptions.insert(transcriptionsDoc)
    .then((newDocs) => {
        console.log(`Successfully Inserted ${newDocs.length} transcription data...:)`);
    })
    .catch((err) => {
        console.log('Error occured while bulk loading transcription data', err)
    });


const app = express();


app.use(express.json());

app.use(cors({ credentials: true, origin: true }))

app.use('/api', routes)


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})