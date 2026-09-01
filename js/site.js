// GDECOM — interações do site (leves, sem dependências)
(function () {
  "use strict";

  // menu mobile
  var botao = document.querySelector(".hamburguer");
  var menu = document.querySelector(".menu");
  if (botao && menu) {
    botao.addEventListener("click", function () {
      menu.classList.toggle("aberto");
      botao.setAttribute("aria-expanded", menu.classList.contains("aberto") ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") menu.classList.remove("aberto");
    });
  }

  // animação de entrada ao rolar
  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add("visivel");
        observador.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".surgir").forEach(function (el) { observador.observe(el); });

  // galeria: lightbox simples
  var luz = document.querySelector(".luz");
  if (luz) {
    var luzImg = luz.querySelector("img");
    document.querySelectorAll(".galeria figure").forEach(function (fig) {
      fig.addEventListener("click", function () {
        luzImg.src = fig.querySelector("img").src;
        luz.classList.add("aberta");
      });
    });
    luz.addEventListener("click", function () { luz.classList.remove("aberta"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") luz.classList.remove("aberta");
    });
  }

  // formulário de contato: monta um e-mail pronto (sem servidor)
  var form = document.querySelector(".form-contato");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = form.querySelector("#nome").value.trim();
      var email = form.querySelector("#email").value.trim();
      var msg = form.querySelector("#mensagem").value.trim();
      var corpo = "Nome: " + nome + "%0D%0AE-mail: " + email + "%0D%0A%0D%0A" + encodeURIComponent(msg);
      window.location.href = "mailto:gdecom@gdecom.org.br?subject=" +
        encodeURIComponent("Contato pelo site — " + nome) + "&body=" + corpo;
    });
  }

  // ano do rodapé
  document.querySelectorAll(".ano-atual").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
