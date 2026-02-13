require("dotenv").config();
const express = require("express");
const { google } = require("googleapis");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 🔐 Configuración OAuth2
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});


console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("CLIENT_ID:", process.env.CLIENT_ID);

// 📩 Ruta que recibe la respuesta
app.post("/guardar-respuesta", async (req, res) => {
  const opcion = req.body.opcion;

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    await transporter.sendMail({
      from: `Formulario <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Respuesta del formulario 💘",
      text: `La persona eligió: ${opcion}`,
    });

    res.send("Correo enviado correctamente ✅");
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.send("Error al enviar correo ❌");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});

