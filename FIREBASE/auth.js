import {
  auth,
  provider
} from "./firebase-config.js";

import {
  signInWithPopup,
  signInAnonymously,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

function mostrarSite() {
  const login = document.getElementById("loginScreen");
  const site = document.getElementById("site");

  site.style.display = "block";

  setTimeout(() => {
    site.classList.remove("hidden");
    site.classList.add("visible");

    login.style.opacity = "0";
    login.style.transform = "scale(1.08)";
    login.style.pointerEvents = "none";
  }, 80);

  setTimeout(() => {
    login.style.display = "none";
  }, 500);
}

function mostrarLogin() {
  const login = document.getElementById("loginScreen");
  const site = document.getElementById("site");

  if (site) {
    site.classList.remove("visible");
    site.classList.add("hidden");
    site.style.display = "none";
  }

  if (login) {
    login.style.display = "flex";
    login.style.opacity = "1";
    login.style.transform = "scale(1)";
    login.style.pointerEvents = "auto";
  }
}

window.loginGoogle = async function () {
  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    console.log("Erro login:", e);
  }
};

window.loginAnonimo = async function () {
  try {
    await signInAnonymously(auth);
  } catch (e) {
    console.log("Erro:", e);
  }
};

window.logout = async function () {
  try {
    await signOut(auth);
  } catch (e) {
    console.log("Erro logout:", e);
  }
};

onAuthStateChanged(auth, (user) => {
  const loader = document.getElementById("loader");
  const loading = document.getElementById("loading");
  const userInfo = document.getElementById("userInfo");
  const userName = document.getElementById("userName");
  const userPhoto = document.getElementById("userPhoto");

  if (loader) {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.remove();
    }, 600);
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
      saudacao.textContent = ` Bem-vindo, ${user.displayName || "Usuário"}`;
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