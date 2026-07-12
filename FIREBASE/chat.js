import { auth, db } from "./firebase-config.js";
import { DONOS } from "./admin.js";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ================= CHAT ================= */

window.enviarMensagem = async function () {

  const input = document.getElementById("mensagemInput");
  if (!input) return;

  const texto = input.value;

  if (!texto.trim()) return;

  const user = auth.currentUser;

  if (!user) {
    alert("Faça login primeiro.");
    return;
  }

  if (user.isAnonymous) {
    alert("Visitantes não podem enviar mensagens.");
    return;
  }

  await addDoc(collection(db, "mensagens"), {
    nome: user.displayName,
    email: user.email,
    foto: user.photoURL || "https://ui-avatars.com/api/?name=User",
    texto: texto,
    data: Date.now()
  });

  input.value = "";
};

/* ================= ONSNAPSHOT CHAT ================= */

const q = query(
  collection(db, "mensagens"),
  orderBy("data", "asc")
);

onSnapshot(q, (snapshot) => {

  const chat = document.getElementById("mensagens");

  if (!chat) return;

  chat.innerHTML = "";

  const fragment = document.createDocumentFragment();

  snapshot.forEach((docSnap) => {

    const msg = docSnap.data();

    const minhaMsg =
      auth.currentUser?.email === msg.email;

    const isDono =
      DONOS.includes(msg.email);

    const div = document.createElement("div");

    div.style.cssText = `
      display:flex;
      gap:10px;
      margin-bottom:12px;
      justify-content:${minhaMsg ? "flex-end" : "flex-start"};
      align-items:flex-start;
    `;

    const donoTag = isDono
      ? `
      <span style="
        display:inline-block;
        align-self:flex-start;
        padding:1px 5px;
        border-radius:999px;
        background:rgba(255,215,0,.12);
        border:1px solid #FFD700;
        color:#FFD700;
        font-size:8px;
        font-weight:bold;
        line-height:1.1;
        white-space:nowrap;
        animation:pulseDono 1.5s ease-in-out infinite;
        box-shadow:0 0 8px #FFD700;
      ">
       DONO
      </span>
      `
      : "";

    div.innerHTML = `
      ${!minhaMsg ? `
      <img
        src="${msg.foto}"
        style="
          width:35px;
          height:35px;
          border-radius:50%;
          border:2px solid #00ffff;
          object-fit:cover;
        ">
      ` : ""}

      <div style="
        background:${minhaMsg ? "rgba(0,255,255,.18)" : "rgba(0,255,255,.08)"};
        padding:6px 10px;
        border-radius:18px;
        max-width:75%;
        word-break:break-word;
        backdrop-filter:blur(4px);
      ">

        <b style="
          display:flex;
          flex-direction:column;
          gap:2px;
        ">

          ${donoTag}

          <span style="
            font-size:11px;
            color:${isDono ? "#FFD700" : "#00ffff"};
            font-weight:${isDono ? "bold" : "normal"};
          ">
            ${msg.nome}
          </span>

        </b>

        <br>

        ${msg.texto}

      </div>
    `;

    fragment.appendChild(div);

  });

  chat.appendChild(fragment);

  chat.scrollTop = chat.scrollHeight;

});