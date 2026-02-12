require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Permite recibir JSON
app.use(express.json());

// Permite usar archivos HTML, CSS, JS, imágenes, videos
app.use(express.static(__dirname));

// Ruta principal (abre index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta que recibe la respuesta
app.post('/guardar-respuesta', async (req, res) => {
    const opcion = req.body.opcion;

    console.log("Respuesta recibida:", opcion);

    try {
        let transporter = nodemailer.createTransport({
      service: 'gmail',
       auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


        await transporter.sendMail({
            from: '"Formulario 💌" <cristianchile973@gmail.com>',
            to: "cristianchile973@gmail.com",
            subject: "Respuesta del formulario 💘",
            text: `La persona eligió: ${opcion}`
        });

        res.send("Correo enviado correctamente ✅");
    } catch (error) {
        console.error("Error al enviar correo:", error);
        res.send("Error al enviar correo ❌");
    }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
