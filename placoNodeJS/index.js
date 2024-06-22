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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
