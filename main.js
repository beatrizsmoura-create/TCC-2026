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

// Navegação simples para o botão principal do Hero (se aplicável)
function goToCatalogPage() {
    window.location.href = "catalogo.html";
}

// Inicializa o catálogo assim que o navegador terminar de carregar o HTML
document.addEventListener("DOMContentLoaded", carregarPaginaCatalogo);
