var totalCarrinho = 0;
var quantidadesNoCarrinho = {};

function abrirModal(nomeProduto, precoProduto, idModal, tipoProduto) {
    var modal = document.getElementById(idModal + "-modal");

    modal.innerHTML = `
        <h3>${nomeProduto}</h3>
        <p>Preço: R$${precoProduto.toFixed(2)}</p>
        <label for="${idModal}-quantidade">Quantidade:</label>
        <input type="number" id="${idModal}-quantidade" value="1">
        <button onclick="adicionarAoCarrinho('${nomeProduto}', ${precoProduto}, '${idModal}')">Adicionar ao Carrinho</button>
        <button onclick="fecharModal('${idModal}')">Fechar</button>
    `;

    modal.style.display = "block";
}

function adicionarAoCarrinho(nomeProduto, precoProduto, idModal) {
    var quantidade = parseInt(document.getElementById(`${idModal}-quantidade`).value);

    if (quantidadesNoCarrinho[idModal]) {
        quantidadesNoCarrinho[idModal] += quantidade;
    } else {
        quantidadesNoCarrinho[idModal] = quantidade;
    }

    var precoTotal = precoProduto * quantidade;

    var carrinhoContainer = document.getElementById("carrinho-container");

    // Cria um novo elemento para o item do carrinho
    var carrinhoItem = document.createElement("div");
    carrinhoItem.id = `${idModal}-carrinho-item`;
    carrinhoItem.innerHTML = `
        <p>${quantidade}x ${nomeProduto} - R$${precoTotal.toFixed(2)}</p>
        <button onclick="removerDoCarrinho('${nomeProduto}', ${precoTotal}, '${idModal}')">Remover do Carrinho</button>
    `;

    // Adiciona o novo elemento ao contêiner do carrinho
    carrinhoContainer.insertBefore(carrinhoItem, carrinhoContainer.firstChild);

    totalCarrinho += precoTotal;
    document.getElementById("total-carrinho").innerText = `Total do Carrinho: R$${totalCarrinho.toFixed(2)}`;

    fecharModal(idModal);

    alert("Item adicionado ao carrinho, carrinho está no final da página."); // Adiciona o alerta aqui

    // Adiciona um evento ao botão de Finalizar Compra
    var finalizarCompraButton = document.getElementById("finalizar-compra-button");
    if (!finalizarCompraButton.hasAttribute("data-event-added")) {
        finalizarCompraButton.setAttribute("data-event-added", "true");
        finalizarCompraButton.addEventListener("click", finalizarCompra);
    }
}

function removerDoCarrinho(nomeProduto, precoTotal, idModal) {
    var quantidadeRemovida = quantidadesNoCarrinho[idModal];
    totalCarrinho -= precoTotal;
    delete quantidadesNoCarrinho[idModal];

    var carrinhoContainer = document.getElementById("carrinho-container");
    var carrinhoItem = document.getElementById(`${idModal}-carrinho-item`);
    carrinhoContainer.removeChild(carrinhoItem);

    document.getElementById("total-carrinho").innerText = `Total do Carrinho: R$${totalCarrinho.toFixed(2)}`;
}

function finalizarCompra() {
    var mensagem = "Pedido Cantinho do Sabor:\n";
    for (var idModal in quantidadesNoCarrinho) {
        var quantidade = quantidadesNoCarrinho[idModal];
        var nomeProduto = document.getElementById(idModal).querySelector('h3').innerText; // Obtém o nome do produto pelo ID
        mensagem += `${quantidade}x ${nomeProduto}\n`;
    }
    mensagem += `\nTotal: R$${totalCarrinho.toFixed(2)}`;

    var numeroWhatsapp = '4197893785';
    var linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
    window.open(linkWhatsapp, '_blank');
}

function fecharModal(idModal) {
    document.getElementById(idModal + "-modal").style.display = "none";
}
