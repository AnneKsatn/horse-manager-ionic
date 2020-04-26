import * as functions from 'firebase-functions';
import * as express from 'express';

const serviceAccount = require("./permission.json");

const app = express();
const cors = require('cors');
app.use(cors( {origin: true}));

const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://manager-fc68e.firebaseio.com"
});


const db = admin.firestore();


app.get('/hello-world', (req, res) => {
    return res.status(200).send("Hello World!");
})

app.post('/api/create', (req, res) => {
    try {
        db.collection('products').doc('/' + req.body.id + '/')
        .create({
            name: req.body.name,
                description: req.body.description,
            })
        return res.status(200).send();

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
})

app.get('/api/read/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('products').doc(1);
          //  let product = document.get();
    
            return res.status(200).send(document);
    
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })
})




exports.app = functions.https.onRequest(app);


//export const helloWorld = functions.https.onRequest((request, response) => {
  //response.send("Hello from Firebase!");
 //});