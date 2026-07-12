/*  DONOS */
export const DONOS = [
  "bruninhoedits0@gmail.com",
  "grazielesantos643@gmail.com"
];

/* ================= APAGAR MENSAGENS ================= */

window.apagarTodasMsg = async function () {
  const user = auth.currentUser;

  if (!user || !DONOS.includes(user.email)) {
    alert("Apenas donos podem apagar mensagens ");
    return;
  }

  if (!confirm("Apagar todas as mensagens?")) return;

  const snapshot = await getDocs(collection(db, "mensagens"));

  for (const docSnap of snapshot.docs) {
    await deleteDoc(doc(db, "mensagens", docSnap.id));
  }

  alert("Mensagens apagadas!");
};