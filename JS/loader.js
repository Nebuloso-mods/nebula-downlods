const textos = [
  "Conectando ao universo...",
  "Carregando mods...",
  "Sincronizando dados...",
  "Preparando Portal Nebuloso...",
  "Quase pronto..."
];

let i = 0;

setInterval(() => {
  const t = document.getElementById("loaderStatus");
  if (!t) return;

  i = (i + 1) % textos.length;
  t.textContent = textos[i];
}, 450);