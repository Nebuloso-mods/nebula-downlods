document.addEventListener("DOMContentLoaded", () => {

  // Contador de mods
  const total = 2;

  const contador = document.getElementById("contadorMods");

  if (contador) {
    contador.textContent = `🚀 ${total} mods disponíveis para download`;
  }

  console.log("⚡ Portal Nebuloso iniciado com sucesso!");

});