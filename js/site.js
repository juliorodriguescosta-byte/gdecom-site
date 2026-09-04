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

  // submenu do menu principal (toque no mobile; hover já funciona via CSS)
  document.querySelectorAll(".submenu-toggle").forEach(function (toggle) {
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var submenu = toggle.closest(".menu-dropdown").querySelector(".submenu");
      var aberto = submenu.classList.toggle("aberto");
      toggle.setAttribute("aria-expanded", aberto ? "true" : "false");
    });
  });

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

  // galeria: lightbox acessível (mouse, toque, teclado e leitor de tela)
  var luz = document.querySelector(".luz");
  if (luz) {
    var luzImg = luz.querySelector("img");
    var luzFechar = luz.querySelector(".luz-fechar");
    var luzUltimoFoco = null;

    var abrirLuz = function (fig) {
      var imgOriginal = fig.querySelector("img");
      luzUltimoFoco = fig;
      luzImg.src = imgOriginal.src;
      luzImg.alt = imgOriginal.alt || "Imagem ampliada da galeria";
      luz.classList.add("aberta");
      if (luzFechar) luzFechar.focus();
    };
    var fecharLuz = function () {
      if (!luz.classList.contains("aberta")) return;
      luz.classList.remove("aberta");
      if (luzUltimoFoco) { luzUltimoFoco.focus(); luzUltimoFoco = null; }
    };

    document.querySelectorAll(".galeria figure").forEach(function (fig) {
      fig.setAttribute("tabindex", "0");
      fig.setAttribute("role", "button");
      var legenda = fig.querySelector("figcaption");
      fig.setAttribute("aria-label", "Ampliar imagem" + (legenda ? ": " + legenda.textContent.trim() : ""));
      fig.addEventListener("click", function () { abrirLuz(fig); });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
          e.preventDefault();
          abrirLuz(fig);
        }
      });
    });

    // clique em qualquer ponto do overlay (incluindo a imagem e o botão fechar) fecha — comportamento original preservado
    luz.addEventListener("click", fecharLuz);
    // mantém o foco dentro do diálogo enquanto ele está aberto (só há um controle focável: fechar)
    luz.addEventListener("keydown", function (e) {
      if (e.key === "Tab") { e.preventDefault(); if (luzFechar) luzFechar.focus(); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") fecharLuz();
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
