require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000; 

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
    })
});

const db = admin.firestore();

app.get('/api/bd', async (req, res) => {
    try {
      const actual = await db.collection('adopciones').get();
      const data = actual.docs.map(doc => doc.data());
      res.json(data);
      //console.log(data);
    } catch (error) {
      res.status(500).send('Error en el recibimiento de la informacion de la base de datos: ' + error.message);
    }
  });

app.listen(port,(err,res)=>{
    if(err){
        console.log('Error al levantar el servidor')
        return;
    }
    console.log(`Apis escuchando en http://localhost:${port}`);
});