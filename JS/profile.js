const photo = document.getElementById("userPhoto");

if (photo) {
  photo.onclick = function () {
    const menu = document.getElementById("profileMenu");

    menu.style.display =
      menu.style.display === "block" ? "none" : "block";
  };
}

document.addEventListener("click", function (e) {
  const userInfo = document.getElementById("userInfo");
  const menu = document.getElementById("profileMenu");

  if (
    menu &&
    userInfo &&
    !userInfo.contains(e.target) &&
    !menu.contains(e.target)
  ) {
    menu.style.display = "none";
  }
});