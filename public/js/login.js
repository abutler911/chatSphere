document.addEventListener("DOMContentLoaded", () => {
  const flashMessage = document.querySelector(".flash-message");
  if (flashMessage) {
    setTimeout(() => {
      flashMessage.style.display = "none";
    }, 5000);
  }
});
