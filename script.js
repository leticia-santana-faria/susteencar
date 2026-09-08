// BASE DE DADOS DOS PRODUTOS
const produtos = [
    {
        id: 1,
        nome: "Susteencar CyberVision",
        modelo: "Sedan Futurista 2026",
        preco: 280000,
        cor: "Azul",
        potencia: "300hp",
        imagem: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80",
        descricaoAudio: "Carro elétrico modelo Sedan na cor azul metálico com faróis em LED neon afilados e linhas aerodinâmicas.",
        avaliacao: "★ ★ ★ ★ ★ (4.9/5)"
    },
    {
        id: 2,
        nome: "Susteencar Nebula SUV",
        modelo: "SUV Familiar Elétrico",
        preco: 195000,
        cor: "Roxo",
        potencia: "150hp",
        imagem: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80",
        descricaoAudio: "SUV espaçoso na cor roxo neon com teto solar panorâmico e rodas esportivas pretas.",
        avaliacao: "★ ★ ★ ★ ☆ (4.7/5)"
    },
    {
        id: 3,
        nome: "Susteencar Pulse GT",
        modelo: "Esportivo de Alta Performance",
        preco: 340000,
        cor: "Prata",
        potencia: "300hp",
        imagem: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80",
        descricaoAudio: "Esportivo ultrarrápido na cor prata estelar com design agressivo e rebaixado.",
        avaliacao: "★ ★ ★ ★ ★ (5.0/5)"
    }
];

let audioDescricaoAtiva = false;

// INICIALIZAR A PÁGINA
document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutos(produtos);
    configurarAcessibilidade();
});

// RENDERIZAR PRODUTOS NA TELA
function renderizarProdutos(lista) {
    const container = document.getElementById("products-grid");
    container.innerHTML = "";

    lista.forEach(p => {
        const card = document.createElement("article");
        card.className = "product-card card-glass";
        card.innerHTML = `
            <img src="${p.imagem}" alt="${p.descricaoAudio}">
            <h3>${p.nome}</h3>
            <p><strong>Modelo:</strong> ${p.modelo}</p>
            <p><strong>Cor:</strong> ${p.cor} | <strong>Motor:</strong> ${p.potencia}</p>
            <div class="rating" aria-label="Avaliação ${p.avaliacao}">${p.avaliacao}</div>
            <div class="price-tag">R$ ${p.preco.toLocaleString('pt-BR')}</div>
            <button class="btn-primary" onclick="ouvirDescricao('${p.descricaoAudio}')" aria-label="Ouvir audiodescrição do ${p.nome}">🔊 Audiodescrição</button>
            <button class="btn-primary" onclick="abrirPagamento(${p.id})">Comprar / Simular</button>
        `;
        container.appendChild(card);
    });
}

// APLICAR FILTROS
function aplicarFiltros() {
    const preco = document.getElementById("filter-price").value;
    const motor = document.getElementById("filter-engine").value;
    const cor = document.getElementById("filter-color").value;

    const filtrados = produtos.filter(p => {
        const mPreco = preco === "all" || p.preco <= parseInt(preco);
        const mMotor = motor === "all" || p.potencia === motor;
        const mCor = cor === "all" || p.cor === cor;
        return mPreco && mMotor && mCor;
    });

    renderizarProdutos(filtrados);
}

// SIMULAÇÃO DE LOJA MAIS PRÓXIMA POR CEP
function salvarUsuario() {
    const email = document.getElementById("user-email").value;
    const cep = document.getElementById("user-cep").value;
    const resultDiv = document.getElementById("near-store-result");

    if(!email || !cep) {
        alert("Por favor, preencha seu e-mail e CEP.");
        return;
    }

    resultDiv.innerHTML = `
        <p style="margin-top: 15px; color: var(--primary-blue);">
            ✅ Cadastro realizado com sucesso!<br>
            📍 <strong>Loja física Susteencar mais próxima de você:</strong> Av. das Nações Unidas, 1000 - São Paulo, SP (Aprox. 4.2 km de distância do CEP ${cep}).
        </p>
    `;
    falarTexto(`Cadastro concluído. A loja física mais próxima fica na Avenida das Nações Unidas, número 1000.`);
}

// SISTEMA DE PAGAMENTO (MODAL)
function abrirPagamento(id) {
    const prod = produtos.find(p => p.id === id);
    document.getElementById("modal-product-name").innerText = `${prod.nome} - ${prod.modelo}`;
    document.getElementById("modal-product-price").innerText = `R$ ${prod.preco.toLocaleString('pt-BR')}`;
    const modal = document.getElementById("payment-modal");
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
}

function fecharModal() {
    const modal = document.getElementById("payment-modal");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
}

function confirmarPagamento() {
    const opcao = document.querySelector('input[name="payment"]:checked').value;
    alert(`Pedido efetuado com sucesso usando a opção de pagamento: ${opcao.toUpperCase()}! Entraremos em contato via e-mail.`);
    fecharModal();
}

// RECURSOS DE ACESSIBILIDADE

function configurarAcessibilidade() {
    // Alternar Tema Escuro / Claro
    document.getElementById("toggle-theme").addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
    });

    // Aumentar / Diminuir Fonte
    let currentScale = 1.0;
    document.getElementById("font-increase").addEventListener("click", () => {
        currentScale += 0.1;
        document.documentElement.style.setProperty('--font-scale', `${currentScale}rem`);
    });
    document.getElementById("font-decrease").addEventListener("click", () => {
        if(currentScale > 0.8) {
            currentScale -= 0.1;
            document.documentElement.style.setProperty('--font-scale', `${currentScale}rem`);
        }
    });

    // Alterar Tipo de Fonte (OpenDyslexic / Monospace)
    document.getElementById("font-family-select").addEventListener("change", (e) => {
        document.documentElement.style.setProperty('--font-family', e.target.value);
    });

    // Alternar Modo Audiodescrição Geral
    document.getElementById("toggle-screen-reader").addEventListener("click", () => {
        audioDescricaoAtiva = !audioDescricaoAtiva;
        const btn = document.getElementById("toggle-screen-reader");
        btn.innerText = audioDescricaoAtiva ? "🔊 Audiodescrição: ON" : "🔊 Audiodescrição: OFF";
        if(audioDescricaoAtiva) falarTexto("Audiodescrição ativada.");
    });

    // Idiomas (Simulação de troca e leitura do leitor de tela)
    document.getElementById("language-select").addEventListener("change", (e) => {
        const lang = e.target.value;
        document.documentElement.lang = lang;
        alert(`Idioma alterado para: ${e.target.options[e.target.selectedIndex].text}. (Recurso pronto para integração com APIs de Tradução como Google Translate)`);
    });
}

// SÍNTESE DE VOZ (SPOKEN WEB - AUDIODESCRIÇÃO)
function falarTexto(texto) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = document.documentElement.lang || 'pt-BR';
        window.speechSynthesis.speak(utterance);
    }
}

function ouvirDescricao(descricao) {
    falarTexto(descricao);
}
