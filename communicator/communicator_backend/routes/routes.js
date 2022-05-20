const express = require('express');
const router = express.Router();
const Datastore = require('nedb-promises');

let db = new Datastore();
db = {};
db.users = new Datastore('./database/users.db');
db.transcriptions = new Datastore('./database/transcriptions.db');


//Post Method
router.post('/createUsers', async(req, res) => {
    try {
        console.log('Requested user data--->>>', req.body.userData);
        let userDoc = req.body.userData;
        console.log('Finding whether User exist or not..');
        let user = await db.users.find({ "firstName": userDoc.firstName })
        console.log('user---->', user);
        if (user.length <= 0) {
            let newDocs = await db.users.insert([userDoc]);
            console.log(`Successfully Inserted ${newDocs.length} user data...:)`);
            return res.status(200).send({ user: newDocs[0] })
        }
        return res.status(200).send({ user: user[0] })

    } catch (err) {
        console.log('Error occured while bulk loading user data', err);
        return res.status(500).send(err.message ? err.message : "Some Error occured while inserting user")
    }
})

//Get all Method
router.post('/postTranscriptions', (req, res) => {
    let transcriptionDoc = req.Datastore.transcription;
    return db.users
        .insert(transcriptionDoc)
        .then((newDocs) => {
            console.log(`Successfully Inserted ${newDocs.length} transcription data...:)`);
            return res.status(200).send(`Successfully Inserted ${newDocs.length} transcription data...:)`)

        })
        .catch((err) => {
            console.log('Error occured while bulk loading user data', err);
            return res.status(500).send(err.message ? err.message : "Some Error occured while inserting transcription")

        });
})

module.exports = router;