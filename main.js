// BANCO DE DADOS UNIFICADO DOS PRODUTOS
const products = [
    { id: 1, name: 'Loiro Mel', length: '60 cm', weight: '120g', type: 'Liso', price: 'R$ 1.050,00', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663633013554/gZpzviUSiX9AVhM7y7JZkm/loiro-mel-texture-aZexgLVrFZLEiXn9CWSTPL.webp' },
    { id: 2, name: 'Castanho Escuro', length: '55 cm', weight: '100g', type: 'Liso', price: 'R$ 850,00', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663633013554/gZpzviUSiX9AVhM7y7JZkm/castanho-escuro-texture-EQaWQhqpzR8Z6fnd2RioNr.webp' },
    { id: 3, name: 'Loiro Platinado', length: '60 cm', weight: '120g', type: 'Ondulado', price: 'R$ 1.150,00', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663633013554/gZpzviUSiX9AVhM7y7JZkm/loiro-platinado-texture-Mnnrfcvk5rpmTunthFL6M4.webp' },
    { id: 4, name: 'Preto Natural', length: '50 cm', weight: '100g', type: 'Liso', price: 'R$ 750,00', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663633013554/gZpzviUSiX9AVhM7y7JZkm/preto-natural-texture-ZaQfAuhMopKFnTxyQYvzuc.webp' },
    { id: 5, name: 'Castanho Médio', length: '55 cm', weight: '110g', type: 'Ondulado', price: 'R$ 920,00', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663633013554/gZpzviUSiX9AVhM7y7JZkm/castanho-escuro-texture-EQaWQhqpzR8Z6fnd2RioNr.webp' },
    { id: 6, name: 'Loiro Claro', length: '60 cm', weight: '120g', type: 'Liso', price: 'R$ 1.100,00', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663633013554/gZpzviUSiX9AVhM7y7JZkm/loiro-mel-texture-aZexgLVrFZLEiXn9CWSTPL.webp' }
];

// Estado atual das escolhas do cliente no modal
let customizacaoAtual = {
    produto: '',
    textura: 'Não selecionado',
    espessura: 'Não selecionado',
    comprimento: 'Padrão do Modelo',
    cor: 'Padrão do Modelo'
};

// LÓGICA DA VITRINE DA HOME (INDEX.HTML)
function renderHomeProducts() {
    const gridHome = document.getElementById('grid-produtos');
    if (!gridHome) return;

    gridHome.innerHTML = '';
    products.slice(0, 4).forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.cursor = 'pointer';
        card.setAttribute('onclick', `handleProductClick('${p.name}')`);
        card.innerHTML = `
            <div class="product-image"><img src="${p.image}" alt="${p.name}"></div>
            <h3 class="product-name">${p.name}</h3>
            <p class="product-meta">${p.length} · ${p.weight} · ${p.type}</p>
            <p class="product-price">${p.price}</p>
        `;
        gridHome.appendChild(card);
    });
}

// LÓGICA DO CATÁLOGO COMPLETO (CATALOGO.HTML)
function renderFullCatalog() {
    const gridCatalog = document.getElementById('catalogo-produtos-grid');
    const contador = document.getElementById('contador-resultados');
    if (!gridCatalog) return;

    gridCatalog.innerHTML = '';
    const comp = document.getElementById('cat-comprimento').value;
    const cor = document.getElementById('cat-cor').value;
    const tex = document.getElementById('cat-textura').value;

    const filtrados = products.filter(p => {
        return (comp === 'Todos' || p.length === comp) &&
               (tex === 'Todos' || p.type === tex) &&
               (cor === 'Todos' || p.name.toLowerCase().includes(cor.toLowerCase()));
    });

    if (contador) contador.textContent = `${filtrados.length} resultados encontrados`;

    filtrados.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image"><img src="${p.image}" alt="${p.name}"></div>
            <h3 class="product-name">${p.name}</h3>
            <p class="product-meta">${p.length} · ${p.weight} · ${p.type}</p>
            <p class="product-price">${p.price}</p>
            <button class="btn-card-action" onclick="openModal('${p.name}')">PERSONALIZAR</button>
        `;
        gridCatalog.appendChild(card);
    });
}

window.filtrarCatalogo = function() { renderFullCatalog(); };
window.handleProductClick = function(name) { window.location.href = `catalogo.html?produto=${encodeURIComponent(name)}`; };
window.goToCatalogPage = function() { window.location.href = 'catalogo.html'; };

// GERENCIAMENTO E INTERAÇÃO DO MODAL DE PERSONALIZAÇÃO (CATÁLOGO)
window.openModal = function(name) {
    const modalTitle = document.getElementById('modal-title');
    const modal = document.getElementById('modal-personalizar');
    
    if (modal && modalTitle) {
        const pRef = products.find(p => p.name === name);
        
        customizacaoAtual.produto = name;
        customizacaoAtual.textura = 'Não selecionado';
        customizacaoAtual.espessura = 'Não selecionado';
        customizacaoAtual.cor = name; 
        customizacaoAtual.comprimento = pRef ? pRef.length : '60 cm';
        
        modalTitle.textContent = `Personalizar: ${name}`;
        
        const todosBotoes = modal.querySelectorAll('.opt-btn, .opt-row-btn');
        todosBotoes.forEach(b => b.classList.remove('active'));
        
        inserirContainerResumo(modal);
        atualizarPainelInformacoes();
        modal.classList.remove('hidden');
    }
};

window.closeModal = function() {
    const modal = document.getElementById('modal-personalizar');
    if (modal) modal.classList.add('hidden');
};

window.selectOpt = function(element) {
    Array.from(element.parentElement.children).forEach(b => b.classList.remove('active'));
    element.classList.add('active');

    let tipo = 'textura';
    let valorSelecionado = element.innerText;

    if (element.classList.contains('opt-row-btn') || element.parentElement.classList.contains('options-vertical')) {
        tipo = 'espessura';
        valorSelecionado = element.querySelector('strong') ? element.querySelector('strong').innerText : element.innerText;
    }

    customizacaoAtual[tipo] = valorSelecionado.replace(/[\n\r]+/g, ' ').trim();
    atualizarPainelInformacoes();
};

function inserirContainerResumo(modalElement) {
    const modalBody = modalElement.querySelector('.modal-body');
    let resumoBox = document.getElementById('resumo-customizacao');
    if (modalBody && !resumoBox) {
        resumoBox = document.createElement('div');
        resumoBox.id = 'resumo-customizacao';
        resumoBox.className = 'resumo-info-container';
        modalBody.appendChild(resumoBox);
    }
}

function atualizarPainelInformacoes() {
    const resumoBox = document.getElementById('resumo-customizacao');
    if (!resumoBox) return;

    resumoBox.innerHTML = `
        <div class="resumo-detalhes" style="margin-top: 25px; padding: 15px; background: #1a1a1a; border: 1px dashed var(--border); border-radius: 4px; text-align: left;">
            <h4 style="color: var(--gold); margin: 0 0 10px 0; font-size: 0.85rem; letter-spacing: 1px; text-transform: uppercase;">Especificações Escolhidas:</h4>
            <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Modelo base:</strong> <span style="color: #fff;">${customizacaoAtual.produto}</span></p>
            <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Textura do Fio:</strong> <span style="color: ${customizacaoAtual.textura !== 'Não selecionado' ? 'var(--gold)' : '#a3a3a3'};">${customizacaoAtual.textura}</span></p>
            <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Espessura:</strong> <span style="color: ${customizacaoAtual.espessura !== 'Não selecionado' ? 'var(--gold)' : '#a3a3a3'};">${customizacaoAtual.espessura}</span></p>
            <button class="btn-card-action" style="margin-top: 15px; width: 100%;" onclick="confirmarPedidoPersonalizado()">CONFIRMAR E SALVAR</button>
        </div>
    `;
}

// SALVA NO LOCALSTORAGE E LEVA PARA A PÁGINA DE PERSONALIZAÇÃO
window.confirmarPedidoPersonalizado = function() {
    if (customizacaoAtual.textura === 'Não selecionado' || customizacaoAtual.espessura === 'Não selecionado') {
        alert('Por favor, selecione todas as opções antes de confirmar!');
        return;
    }
    // Grava no "banco de dados" do navegador
    localStorage.setItem('megaHairCustomizado', JSON.stringify(customizacaoAtual));
    
    alert('Configuração salva com sucesso! Redirecionando para o seu painel de personalização...');
    window.location.href = 'personalizar.html';
};


// ==========================================
// LÓGICA EXCLUSIVA DA PÁGINA PERSONALIZAR.HTML
// ==========================================
function carregarDadosNaPaginaPersonalizar() {
    const dadosSalvos = localStorage.getItem('megaHairCustomizado');
    if (!dadosSalvos) return; // Se não houver dados, não executa

    const configuracao = JSON.parse(dadosSalvos);
    
    // Encontra o produto correspondente para pegar a imagem real
    const produtoInfos = products.find(p => p.name.toLowerCase() === configuracao.cor.toLowerCase() || p.name.toLowerCase() === configuracao.produto.toLowerCase());

    // Atualiza nome e imagem na tela
    const txtNome = document.getElementById('custom-product-name');
    const boxImagem = document.getElementById('custom-product-image');
    
    if (txtNome) txtNome.textContent = configuracao.produto;
    if (boxImagem && produtoInfos) {
        boxImagem.innerHTML = `<img src="${produtoInfos.image}" alt="${configuracao.produto}" style="width:100%; height:100%; object-fit:cover;">`;
    }

    // Preenche os seletores da direita com o que já estava escolhido
    if(document.getElementById('change-cor')) document.getElementById('change-cor').value = produtoInfos ? produtoInfos.name : configuracao.cor;
    if(document.getElementById('change-comprimento')) document.getElementById('change-comprimento').value = configuracao.comprimento;
    if(document.getElementById('change-textura')) document.getElementById('change-textura').value = configuracao.textura;
    if(document.getElementById('change-espessura')) document.getElementById('change-espessura').value = configuracao.espessura;

    // Atualiza as labels de texto do resumo
    atualizarLabelsResumo(configuracao);
}

window.atualizarEspecificacoesDaPagina = function() {
    const corSel = document.getElementById('change-cor').value;
    const compSel = document.getElementById('change-comprimento').value;
    const texSel = document.getElementById('change-textura').value;
    const espSel = document.getElementById('change-espessura').value;

    const novaConfig = {
        produto: `Mega Hair Customizado - ${corSel}`,
        cor: corSel,
        comprimento: compSel,
        textura: texSel,
        espessura: espSel
    };

    // Altera a imagem da esquerda caso ele troque de cor
    const produtoInfos = products.find(p => p.name.toLowerCase() === corSel.toLowerCase());
    const boxImagem = document.getElementById('custom-product-image');
    const txtNome = document.getElementById('custom-product-name');
    
    if (txtNome) txtNome.textContent = novaConfig.produto;
    if (boxImagem && produtoInfos) {
        boxImagem.innerHTML = `<img src="${produtoInfos.image}" alt="${corSel}" style="width:100%; height:100%; object-fit:cover;">`;
    }

    atualizarLabelsResumo(novaConfig);
};

function atualizarLabelsResumo(config) {
    if(document.getElementById('resumo-cor')) document.getElementById('resumo-cor').textContent = config.cor;
    if(document.getElementById('resumo-comprimento')) document.getElementById('resumo-comprimento').textContent = config.comprimento;
    if(document.getElementById('resumo-textura')) document.getElementById('resumo-textura').textContent = config.textura;
    if(document.getElementById('resumo-espessura')) document.getElementById('resumo-espessura').textContent = config.espessura;
}

window.salvarEAvancar = function() {
    const corSel = document.getElementById('change-cor').value;
    const compSel = document.getElementById('change-comprimento').value;
    const texSel = document.getElementById('change-textura').value;
    const espSel = document.getElementById('change-espessura').value;

    const configFinal = {
        produto: `Mega Hair Customizado - ${corSel}`,
        cor: corSel,
        comprimento: compSel,
        textura: texSel,
        espessura: espSel
    };

    localStorage.setItem('megaHairCustomizado', JSON.stringify(configFinal));
    alert('Especificações salvas com absoluto sucesso para o seu pedido premium!');
};


// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    renderHomeProducts();
    
    // Se estiver na página de catálogo
    if (document.getElementById('catalogo-produtos-grid')) {
        renderFullCatalog();
        const params = new URLSearchParams(window.location.search);
        const produtoUrl = params.get('produto');
        if (produtoUrl) {
            setTimeout(() => openModal(produtoUrl), 150);
        }
    }

    // Se estiver na nova página de personalização
    if (document.getElementById('change-cor')) {
        carregarDadosNaPaginaPersonalizar();
    }
});
