export default function displayMessage() {
  const el = document.getElementById("card-message");

  return {
    display: function (color, msg) {
      el.style.color = color;
      el.classList.remove("hidden-visible");
      el.innerHTML = msg;

      setTimeout(() => {
        el.classList.add("hidden-visible");
      }, 300);
    },
  };
}
