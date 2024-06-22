const express = require('express');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
        to: to,
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

  
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });