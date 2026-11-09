const form = document.querySelector("form");
const confirmacao = document.getElementById("confirmacao");

// Regras de cada campo (a chave é o id do input)
const regras = {
    nome: {
        valido: valor => valor.trim().length >= 3,
        mensagem: "Informe seu nome completo (mínimo de 3 caracteres)."
    },
    email: {
        valido: valor => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim()),
        mensagem: "Informe um e-mail válido, como nome@email.com."
    },
    telefone: {
        // Aceita (27) 90000-0000, 27 90000-0000 ou 27900000000; fixo com 8 dígitos também
        valido: valor => /^[\d\s()-]+$/.test(valor) && /^[1-9][1-9](9\d{8}|[2-5]\d{7})$/.test(valor.replace(/\D/g, "")),
        mensagem: "Informe um telefone com DDD, como (27) 90000-0000."
    },
    "botao-check": {
        valido: marcado => marcado,
        mensagem: "Para enviar, marque a autorização de uso dos dados."
    }
};

function validar(campo) {
    const regra = regras[campo.id];
    const valor = campo.type === "checkbox" ? campo.checked : campo.value;
    const ok = regra.valido(valor);

    campo.classList.toggle("invalido", !ok);
    campo.setAttribute("aria-invalid", !ok);
    document.getElementById(campo.getAttribute("aria-describedby")).textContent = ok ? "" : regra.mensagem;

    return ok;
}

// Depois do primeiro erro, o campo é revalidado enquanto a pessoa corrige
form.addEventListener("input", evento => {
    confirmacao.hidden = true;
    if (evento.target.classList.contains("invalido")) validar(evento.target);
});

form.addEventListener("submit", evento => {
    evento.preventDefault();
    confirmacao.hidden = true;

    const invalidos = [...form.querySelectorAll("input")].filter(campo => !validar(campo));

    if (invalidos.length) {
        invalidos[0].focus();
        return;
    }

    // Envio simulado: não há back-end
    form.reset();
    confirmacao.hidden = false;
});

// Menu hambúrguer (celular)
const cabecalho = document.querySelector("header");
const botaoMenu = document.querySelector(".menu");

function alternarMenu(aberto) {
    cabecalho.classList.toggle("aberto", aberto);
    botaoMenu.setAttribute("aria-expanded", aberto);
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
}

botaoMenu.addEventListener("click", () => alternarMenu(!cabecalho.classList.contains("aberto")));

// Fecha ao clicar em um link ou ao apertar Esc
document.querySelector(".menu-links").addEventListener("click", evento => {
    if (evento.target.closest("a")) alternarMenu(false);
});

document.addEventListener("keydown", evento => {
    if (evento.key === "Escape") alternarMenu(false);
});
