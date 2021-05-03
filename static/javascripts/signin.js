const sign_in_btn = document.getElementById('sign-in-btn');
const sign_up_btn = document.getElementById('sign-up-btn');
const container = document.querySelector(".container-id01");

sign_in_btn.addEventListener("click", () => {
  container.classList.add("sign-in-mode");
});

sign_up_btn.addEventListener("click", () => {
  container.classList.remove("sign-in-mode");
});
