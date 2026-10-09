/* 🔐 AUTENTICAÇÃO — PORTAL NEBULOSO */

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export function configurarAuth({ auth, mostrarSite, mostrarLogin }) {
  const provider = new GoogleAuthProvider();

  /* ================= LOGIN GOOGLE ================= */

  window.loginGoogle = async function () {
    try {
      await signInWithPopup(auth, provider);
    } catch (erro) {
      console.error("Erro no login Google:", erro);
      alert("Não foi possível entrar com o Google.");
    }
  };

  /* ================= LOGIN VISITANTE ================= */

  window.loginAnonimo = async function () {
    try {
      await signInAnonymously(auth);
    } catch (erro) {
      console.error("Erro no login visitante:", erro);
      alert("Não foi possível entrar como visitante.");
    }
  };

  /* ================= SAIR ================= */

  window.logout = async function () {
    try {
      await signOut(auth);
    } catch (erro) {
      console.error("Erro ao sair:", erro);
      alert("Não foi possível sair da conta.");
    }
  };

  /* ================= ESTADO DO LOGIN ================= */

  onAuthStateChanged(auth, (user) => {
    const loader = document.getElementById("loader");
    const loading = document.getElementById("loading");
    const userInfo = document.getElementById("userInfo");
    const userName = document.getElementById("userName");
    const userPhoto = document.getElementById("userPhoto");

    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 600);
    }

    if (loading) {
      loading.style.opacity = "0";
      setTimeout(() => {
        loading.style.display = "none";
      }, 300);
    }

    if (user) {
      mostrarSite();

      if (userName) {
        userName.textContent = user.displayName || "Visitante";
      }

      if (userInfo) {
        userInfo.style.display = "flex";
      }

      const saudacao = document.getElementById("saudacao");

      if (saudacao) {
        saudacao.textContent =
          `✨ Bem-vindo, ${user.displayName || "Usuário"}`;
      }

      if (userPhoto) {
        userPhoto.src =
          user.photoURL ||
          "https://ui-avatars.com/api/?name=User";
      }
    } else {
      mostrarLogin();

      if (userInfo) {
        userInfo.style.display = "none";
      }
    }
  });
}