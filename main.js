// ==========================================================================
// BANCO DE DADOS EXATO DOS PRODUTOS DA SUA LANDING PAGE
// ==========================================================================
const products = [
    {
        id: 1,
        name: 'Loiro Mel',
        length: '60 cm',
        weight: '120g',
        type: 'Liso',
        price: 'R$ 1.050,00',
        image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663633013554/gZpzviUSiX9AVhM7y7JZkm/loiro-mel-texture-aZexgLVrFZLEiXn9CWSTPL.webp'
    },
    {
        id: 2,
        name: 'Castanho Escuro',
        length: '55 cm',
        weight: '100g',
        type: 'Liso',
        price: 'R$ 850,00',
        image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663633013554/gZpzviUSiX9AVhM7y7JZkm/castanho-escuro-texture-EQaWQhqpzR8Z6fnd2RioNr.webp'
    },
    {
        id: 3,
        name: 'Loiro Platinado',
        length: '60 cm',
        weight: '120g',
        type: 'Ondulado',
        price: 'R$ 1.150,00',
        image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663633013554/gZpzviUSiX9AVhM7y7JZkm/loiro-platinado-texture-Mnnrfcvk5rpmTunthFL6M4.webp'
    },
    {
        id: 4,
        name: 'Preto Natural',
        length: '50 cm',
        weight: '100g',
        type: 'Liso',
        price: 'R$ 750,00',
        image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663633013554/gZpzviUSiX9AVhM7y7JZkm/preto-natural-texture-ZaQfAuhMopKFnTxyQYvzuc.webp'
    }
];

// Captura dos elementos do DOM
const selComprimento = document.getElementById('f-comprimento');
const selCor = document.getElementById('f-cor');
const selTextura = document.getElementById('f-textura');
const gridProdutos = document.getElementById('grid-produtos');
const modal = document.getElementById('modal-personalizar');
const modalTitle = document.getElementById('modal-title');

// ==========================================================================
// RENDERIZADOR DO CATÁLOGO DE FOTOS CLICÁVEIS (SEM BOTÃO TEXTUAL)
// ==========================================================================
function updateCatalog() {
    gridProdutos.innerHTML = '';
    
    const fComp = selComprimento.value;
    const fCor = selCor.value;
    const fTextura = selTextura.value;

    const filtered = products.filter(p => {
        const matchComp = fComp === 'Todos' || p.length === fComp;
        const matchTextura = fTextura === 'Todos' || p.type === fTextura;
        const matchCor = fCor === 'Todos' || p.name.toLowerCase().includes(fCor.toLowerCase());
        return matchComp && matchTextura && matchCor;
    });

    filtered.forEach(p => {
        // Criamos o card e adicionamos a ação de clique diretamente nele
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.cursor = 'pointer'; // Mostra a mãozinha indicando que a foto inteira é para escolher
        card.setAttribute('onclick', `openModal('${p.name}')`);
        
        // Estrutura limpa, mostrando apenas a Imagem e os Detalhes exatamente como na foto do site
        card.innerHTML = `
            <div class="product-image">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <h3 class="product-name">${p.name}</h3>
            <p class="product-meta">${p.length} · ${p.weight} · ${p.type}</p>
            <p class="product-price">${p.price}</p>
        `;
        gridProdutos.appendChild(card);
    });
}

// Rolar suavemente até o catálogo ao clicar no topo
function scrollToCatalog() {
    document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
}

// Abrir a janela flutuante de escolha ao clicar na foto
window.openModal = function(name) {
    modalTitle.textContent = `Escolher: ${name}`;
    modal.classList.remove('hidden');
}

window.closeModal = function() {
    modal.classList.add('hidden');
}

// Mapear seleção das opções de personalização internas do modal
window.selectOpt = function(element, type) {
    const parent = element.parentElement;
    parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    element.classList.add('active');
}

// Ouvintes de mudanças nos filtros do topo
selComprimento.addEventListener('change', updateCatalog);
selCor.addEventListener('change', updateCatalog);
selTextura.addEventListener('change', updateCatalog);

// Inicializa o sistema ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateCatalog();
    lucide.createIcons();
});