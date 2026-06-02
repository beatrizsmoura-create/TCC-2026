// ==========================================================================
// WAGNER OLIVEIRA MEGA HAIR - MAIN.JS (CONTROLO GERAL E BANCO DE IMAGENS)
// ==========================================================================

// O teu banco de imagens oficial com as 6 opções reais da tua lista
const listaCabelosCatalogo = [
    { nome: "Loiro Mel", imagem: "loiro-mel.avif" },
    { nome: "Castanho Escuro", imagem: "castanho-escuro.avif" },
    { nome: "Loiro Platinado", imagem: "loiro-platinado.avif" },
    { nome: "Preto Natural", imagem: "preto-natural.avif" },
    { nome: "Castanho Médio", imagem: "castanho-medio.avif" },
    { nome: "Loiro Claro", imagem: "loiro-claro.avif" }
];

// Função responsável por construir os cards na página de catálogo
function carregarPaginaCatalogo() {
    const gridCatalogo = document.getElementById("grid-produtos-catalogo");
    
    // Se não estivermos na página de catálogo, sai da função para não gerar erros
    if (!gridCatalogo) return;

    gridCatalogo.innerHTML = "";

    // Percorre a lista e cria cada um dos 6 cards com o botão Personalizar
    listaCabelosCatalogo.forEach(cabelo => {
        const card = document.createElement("div");
        card.className = "product-card";
        
        card.innerHTML = `
            <img src="${cabelo.imagem}" alt="${cabelo.nome}">
            <h3>${cabelo.nome}</h3>
            <p>Cabelo de alta qualidade, fios selecionados, perfeito para alongamento e volume.</p>
            <span class="price">A partir de R$ 350,00</span>
            <button class="btn-card" onclick="window.location.href='personalizar.html'">PERSONALIZAR</button>
        `;
        
        gridCatalogo.appendChild(card);
    });
}

// Executa funções de carregamento ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
    carregarPaginaCatalogo();
    inicializarControlesLogin(); // Ativa as configurações da página de login/cadastro
});


// ==========================================================================
// LÓGICA EXCLUSIVA PARA A PÁGINA DE LOGIN E CADASTRO (ORGANIZADA DE FORMA EXTERNA)
// ==========================================================================
function inicializarControlesLogin() {
    const cardLogin = document.getElementById('card-login');
    const cardCadastro = document.getElementById('card-cadastro');
    
    const linkIrCadastro = document.getElementById('link-ir-cadastro');
    const linkVoltarLogin = document.getElementById('link-voltar-login');
    
    const formLogin = document.getElementById('form-efetuar-login');
    const formCadastro = document.getElementById('form-criar-cadastro');

    // Se os elementos não existirem na página atual (ex: index, catalogo), interrompe para não dar erro
    if (!cardLogin || !cardCadastro) return;

    // Transição para exibir a Tela de Cadastro
    linkIrCadastro.addEventListener('click', (e) => {
        e.preventDefault();
        cardLogin.style.display = 'none';
        cardCadastro.style.display = 'block';
    });

    // Transição para retornar para a Tela de Login
    linkVoltarLogin.addEventListener('click', (e) => {
        e.preventDefault();
        cardCadastro.style.display = 'none';
        cardLogin.style.display = 'block';
    });

    // Redirecionamento ao enviar formulário de Login para a Home
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    });

    // Redirecionamento ao enviar formulário de Cadastro para a Home
    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    });
}
