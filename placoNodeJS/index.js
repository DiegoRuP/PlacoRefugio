require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');


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

const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, 
    secure: true,
    auth: {
        user: "animalesrefugio61@gmail.com",
        pass: "odffcswhvadkyycl"
    }
});

app.post('/correo', (req, res) => {
    const {to, subject, text} = req.body;

    console.log("Datos recibidos: ", req.body);

    if (!to || !subject || !text) {
        return res.status(400).send({ message: 'Todos los campos son obligatorios' });
    }

    let mail = {
        to: 'animalesrefugio61@gmail.com',
        subject: subject,
        text: text,
    };

    transporter.sendMail(mail, (error, info) => {
        if (error) {
            console.error("Error al momento de mandar el correo: ", error);
            return res.status(500).send({ message: 'Error al enviar el correo', error });
        }
        res.status(200).send({ message: 'Email enviado', info });
    });
});

app.post('/agendar-cita', (req, res) => {
  const { nombre, correo, telefono, hora, fecha, nombreMascota } = req.body;

  // Validar que todos los campos necesarios estén presentes
  if (!nombre || !correo || !telefono || !hora || !fecha || !nombreMascota) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  // Crear el cuerpo del correo
  const mailOptions = {
      from: 'animalesrefugio61@gmail.com', 
      to: correo,
      subject: 'Confirmación de cita',
      html: `
          <p>Hola ${nombre},</p>
          <p>Tu cita para conocer a ${nombreMascota} ha sido agendada con éxito.</p>
          <p>Detalles de la cita:</p>
          <ul>
              <li>Fecha: ${fecha}</li>
              <li>Hora: ${hora}:00 hrs</li>
              <li>Telefono: ${telefono}</li>
          </ul>
          <p>¡Gracias por confiar en nosotros!</p>
      `
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error al enviar el correo:', error);
          return res.status(500).json({ message: 'Error al enviar el correo.', error });
      }
      console.log('Correo enviado:', info.response);
      res.status(200).json({ message: 'Correo enviado correctamente.', info });
  });
});

app.listen(port,(err,res)=>{
    if(err){
        console.log('Error al levantar el servidor')
        return;
    }
    console.log(`Apis escuchando en http://localhost:${port}`);
});
