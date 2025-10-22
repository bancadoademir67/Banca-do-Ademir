(function() {
    // =======================================================
    // 1. DADOS DOS PRODUTOS
    // =======================================================
    const products = [
      {id:1,name:'Abóbora cabotiá',price:'R$10,00 / kg',img:'imagens/cabotia.jpg'},
      {id:2,name:'Abóbora Moranga',price:'R$6,00 / kg',img:'imagens/abobora moranga.jpg'},
      {id:3,name:'Alho',price:'R$8,00 (100 g)',img:'imagens/alho.jpg'},
      {id:4,name:'Açafrão',price:'R$25,00 / kg',img:'imagens/acafrao.jpg'},
      {id:5,name:'Amendoim com casca',price:'R$10,00 (350 g)',img:'imagens/amendoim com casca.jpg'},
      {id:6,name:'Arroz Branco',price:'R$14,00',img:'imagens/arroz branco.jpg'},
      {id:7,name:'Banana prata',price:'R$11,00 / kg',img:'imagens/banana prata.jpg'},
      {id:8,name:'Banana maçã',price:'R$11,00 / kg',img:'imagens/banana maca.jpg'},
      {id:9,name:'Banana nanica',price:'R$8,00 / kg',img:'imagens/banana nanica.jpg'},
      {id:10,name:'Batata doce',price:'R$6,00 (pacote)',img:'imagens/batata doce.jpg'},
      {id:11,name:'Berinjela',price:'R$12,00 / kg',img:'imagens/berinjela.jpg'},
      {id:12,name:'Berinjela rajada',price:'R$12,00 / kg',img:'imagens/berinjela rajada.jpg'},
      {id:13,name:'Batata inglesa',price:'R$12,00 / kg',img:'imagens/batata inglesa.jpg'},
      {id:14,name:'Cebola',price:'R$6,00 (pacote)',img:'imagens/cebola.jpg'},
      {id:15,name:'Cebola roxa',price:'R$14,00 / kg',img:'imagens/cebola roxa.jpg'},
      {id:16,name:'Cenoura',price:'R$6,00 (pacote)',img:'imagens/cenoura.jpg'},
      {id:17,name:'Cogumelo Paris',price:'R$14,00 (bandeja)',img:'imagens/cogumelo paris.jpg'},
      {id:18,name:'Feijão carioca',price:'R$18,00 / kg',img:'imagens/feijao carioca.jpg'},
      {id:19,name:'Feijão preto',price:'R$18,00 / kg',img:'imagens/feijao preto.jpg'},
      {id:20,name:'Gengibre',price:'R$25,00 / kg',img:'imagens/gengibre.jpg'},
      {id:21,name:'Grão de bico',price:'R$36,00 / kg',img:'imagens/grao de bico.jpg'},
      {id:22,name:'Limão Tahiti',price:'R$6,00 (pacote)',img:'imagens/limao tahiti.jpg'},
      {id:23,name:'Maçã Fuji',price:'R$25,00 / kg',img:'imagens/maca fuji.jpg'},
      {id:24,name:'Maçã gala pequena',price:'R$22,00 / kg',img:'imagens/maca gala pequena.png'},
      {id:25,name:'Maçã crispink',price:'R$22,00 / kg',img:'imagens/maca crispink.jpg'},
      {id:26,name:'Manga Tommy',price:'R$15,00 / kg',img:'imagens/manga tommy.jpg'},
      {id:27,name:'Maracujá',price:'R$20,00 / kg',img:'imagens/maracuja.jpg'},
      {id:28,name:'Molho de tomate 500g (pote)',price:'R$22,00',img:'imagens/molho de tomate.jpg'},
      {id:29,name:'Mel silvestre 800g',price:'R$40,00',img:'imagens/mel silvestre.png'},
      {id:30,name:'Mel eucalipto 800g',price:'R$40,00',img:'imagens/mel eucalipto.png'},
      {id:31,name:'Mel laranjeira 800g',price:'R$45,00',img:'imagens/mel laranjeira.png'},
      {id:32,name:'Milho de pipoca',price:'R$25,00 / kg',img:'imagens/milho de pipoca.jpg'},
      {id:33,name:'Pepino japonês',price:'R$6,00 (unidade)',img:'imagens/pepino japones.jpg'},
      {id:34,name:'Pimentão verde',price:'R$6,00 (pacote)',img:'imagens/pimentao verde.png'},
      {id:35,name:'Própolis 30ml',price:'R$20,00',img:'imagens/propolis.png'},
      {id:36,name:'Própolis spray 30ml',price:'R$14,00',img:'imagens/propolis spray.png'},
      {id:37,name:'Tomate grape',price:'R$25,00 / kg',img:'imagens/tomate grape.jpg'},
      {id:38,name:'Tomate salada',price:'R$12,00 / kg ou R$10,00 (pacote)',img:'imagens/tomate salada.jpg'},
      {id:39,name:'Tomate molho',price:'R$10,00 / kg',img:'imagens/tomate molho.png'},
      {id:40,name:'Vagem',price:'R$6,00 (pacote)',img:'imagens/vagem.jpg'}
    ];

    // =======================================================
    // 2. ELEMENTOS DO DOM E ESTADO INICIAL
    // =======================================================
    const productList = document.getElementById('productList');
    const cartItemsEl = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const searchInput = document.getElementById('search');
    const resetButton = document.getElementById('reset');
    const clearCartButton = document.getElementById('clearCart');
    const sendOrderButton = document.getElementById('sendOrder');
    const whatsCtaTop = document.getElementById('cta-whats');
    const whatsPhone = '5512996446183';

    // O carrinho agora armazena { id: quantidade }
    let cart = JSON.parse(localStorage.getItem('bancaAdemirCart')) || {}; // { id: { qty, note } }

    // =======================================================
    // 3. FUNÇÕES DE RENDERIZAÇÃO
    // =======================================================

    /**
     * Renderiza a lista de produtos com base no filtro de busca.
     * @param {string} filter - Termo de busca.
     */
    function renderProducts(filter = '') {
      productList.innerHTML = '';
      const q = filter.trim().toLowerCase();
      const filtered = products.filter(p => p.name.toLowerCase().includes(q));

      if (filtered.length === 0) {
        productList.innerHTML = '<li class="no-results">Nenhum produto encontrado. Tente um termo diferente.</li>';
        return;
      }

      filtered.forEach(p => {
        const li = document.createElement('li');
        li.className = 'product';
        li.setAttribute('role', 'listitem');
        
        // Uso de Template Literal para HTML mais limpo
        li.innerHTML = `
          <div class="thumb">
            <img src="${p.img}" alt="Imagem de ${p.name}" width="120" height="120" loading="lazy">
          </div>
          <div class="pinfo">
            <div class="pname">${p.name}</div>
            <div class="pmeta">${p.price}</div>
          </div>
          <div style="text-align:right">
            <button class="add" data-id="${p.id}" aria-label="Adicionar 1 unidade de ${p.name}">Adicionar</button>
          </div>
        `;
        productList.appendChild(li);
      });
    }

    /**
     * Renderiza o carrinho de compras.
     */
    function renderCart() {
      // Salvar estado do carrinho no Local Storage
      localStorage.setItem('bancaAdemirCart', JSON.stringify(cart));

      cartItemsEl.innerHTML = '';
      const ids = Object.keys(cart).filter(id => cart[id].qty > 0); // Filtra itens com quantidade > 0

      if (ids.length === 0) {
        cartItemsEl.innerHTML = '<div style="color:var(--highlight); text-align:center; padding:20px;">Carrinho vazio. Comece a adicionar!</div>';
        cartTotal.innerText = 'Itens: 0';
        clearCartButton.style.backgroundColor = '#ccc';
        clearCartButton.disabled = true;
        sendOrderButton.disabled = true;
        return;
      }

      ids.forEach(id => {
        const item = products.find(p => p.id == id);
        const qty = cart[id];
        const div = document.createElement('div');
        div.className = 'line';
        // HTML para o item do carrinho com botões de controle
        div.innerHTML = `
  <div class="cart-item-info">
    <div><strong>${item.name}</strong></div>
    <input type="text" class="cart-note" data-id="${id}" placeholder="Ex: quero 1 dúzia, 500g, 1kg..." value="${qty.note || ''}">
  </div>
`;
        cartItemsEl.appendChild(div);
      });

      const totalItems = ids.length;
      cartTotal.innerText = `Itens no Pedido: ${totalItems}`;
      clearCartButton.style.backgroundColor = '#d9583b';
      clearCartButton.disabled = false;
      sendOrderButton.disabled = false;
    }

    // =======================================================
    // 4. MANIPULAÇÃO DO CARRINHO
    // =======================================================

    /**
     * Adiciona ou remove itens do carrinho.
     * @param {number} id - ID do produto.
     * @param {number} change - Quantidade a adicionar (1 ou -1).
     */
    function updateCart(id, change) {
      id = String(id);
      cart[id] = cart[id] || { qty: 0, note: '' };
      cart[id].qty += change;
      if (cart[id].qty <= 0) delete cart[id];
      renderCart();
    }

    // Eventos na lista de produtos
    productList.addEventListener('click', e => {
      const id = e.target.getAttribute('data-id');
      if (id) {
        updateCart(id, 1);
      }
    });

    // Eventos de controle no carrinho
    cartItemsEl.addEventListener('input', e => {
      if (e.target.classList.contains('cart-note')) {
        const id = e.target.getAttribute('data-id');
        if (cart[id]) {
          cart[id].note = e.target.value;
          localStorage.setItem('bancaAdemirCart', JSON.stringify(cart));
        }
      }
    });

    
    // Limpar carrinho
    clearCartButton.addEventListener('click', () => {
      if (Object.keys(cart).length === 0) {
        alert('O carrinho já está vazio.');
        return;
      }
      if (confirm('Tem certeza que deseja limpar o pedido completo?')) {
        cart = {};
        renderCart();
      }
    });

    // =======================================================
    // 5. BUSCA E CONTROLES
    // =======================================================

    // Busca (debounce simples para melhor performance)
    let searchTimeout;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        renderProducts(searchInput.value);
      }, 300); // Espera 300ms após a digitação
    });

    // Limpar busca
    resetButton.addEventListener('click', () => {
      searchInput.value = '';
      renderProducts('');
      searchInput.focus(); // Retorna o foco para o campo de busca
    });

    // =======================================================
    // 6. FINALIZAR PEDIDO (WHATSAPP)
    // =======================================================
    sendOrderButton.addEventListener('click', () => {
      const ids = Object.keys(cart).filter(id => cart[id].qty > 0);
      
      if (ids.length === 0) {
        alert('Por favor, adicione pelo menos um item para enviar o pedido.');
        return;
      }
      
      // Montagem da mensagem robusta para o WhatsApp
      let text = `Olá Ademir, bom dia!%0A%0ASeguem os itens do meu pedido para a feira deste sábado:%0A`;

      ids.forEach(id => {
        const p = products.find(x => x.id == id);
        const note = cart[id].note ? ` (${cart[id].note})` : ''; text += `- ${p.name}${note}%0A`; // Ex: - 2 x Banana prata
      });

      text += `%0A--------------------------------%0A%0A*Retirada:* Sábado na feira (Praça Sinésio Martins).%0A%0AObrigado!`;
      
      // Criação da URL final
      const url = `https://api.whatsapp.com/send?phone=${whatsPhone}&text=${text}`;
      window.open(url, '_blank');
    });

    // =======================================================
    // 7. INICIALIZAÇÃO E AÇÕES DE NAVEGAÇÃO
    // =======================================================
    
    // Inicializar renderização
    renderProducts(); 
    renderCart();

    // Ação do CTA "Pedir por WhatsApp" no header: rolar até o carrinho.
    whatsCtaTop.addEventListener('click', (e) => {
      e.preventDefault();
      // Rola a tela até o carrinho de forma suave
      document.querySelector('.cart').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

})();