/* 👑 ADMINISTRAÇÃO PORTAL NEBULOSO */

export const DONOS = [
"bruninhoedits0@gmail.com",
"grazielesantos643@gmail.com"
];

/* ================= APAGAR MENSAGENS ================= */

export function configurarAdmin({ auth, db, firestore }) {
const { collection, getDocs, deleteDoc, doc } = firestore;

window.apagarTodasMsg = async function () {
const user = auth.currentUser;

if (!user || user.isAnonymous || !DONOS.includes(user.email)) {
  alert("Apenas donos podem apagar mensagens 👑");
  return;
}

if (!confirm("Apagar todas as mensagens?")) return;

try {
  const snapshot = await getDocs(collection(db, "mensagens"));

  for (const docSnap of snapshot.docs) {
    await deleteDoc(doc(db, "mensagens", docSnap.id));
  }

  alert("Mensagens apagadas!");
} catch (erro) {
  console.error("Erro ao apagar mensagens:", erro);
  alert("Não foi possível apagar as mensagens.");
}

};
}
