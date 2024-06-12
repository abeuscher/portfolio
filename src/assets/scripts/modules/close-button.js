const InitCloseButton = (el) => {
  const closeButtons = el.querySelectorAll(".close-button");
  for (let button of closeButtons) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.remove("show-modal");
    });
  }
  const bg = document.querySelector(".modal");
  bg.addEventListener("click", (e) => {
    if (e.target.className.indexOf("modal") > -1) {
      document.body.classList.remove("show-modal");
    }
  });
};
module.exports = InitCloseButton;
