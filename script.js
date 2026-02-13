EMAIL_USER: undefined
const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const brokenHeartContainer = document.querySelector(".broken-heart-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// Función para enviar la respuesta al servidor
function enviarRespuesta(opcion) {
  fetch('/guardar-respuesta', {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ opcion: opcion })
  })
  .then(response => response.text())
  .then(data => {
    console.log("Servidor dice:", data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
}

// Botón YES
yesBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  heartLoader.style.display = "inherit";

  enviarRespuesta("Sí"); // 👈 ENVÍA EL CORREO

  setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "inherit";
    gifResult.play();
  }, 3000);
});

// Botón NO
noBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  brokenHeartContainer.style.display = "inherit";

  enviarRespuesta("No"); // 👈 ENVÍA EL CORREO
});

