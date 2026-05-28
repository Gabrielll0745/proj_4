protegerPagina();

const tabelaOrcamentos = buscarElemento('tabelaOrcamentos');
const formOrcamento = buscarElemento('formOrcamento');
const mensagem = buscarElemento('mensagem');

async function carregarOrcamentos() {
  if (!tabelaOrcamentos) return;

  const orcamentos = await apiRequest('/orcamentos');
  tabelaOrcamentos.innerHTML = '';

  orcamentos.forEach((orcamento) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${orcamento.categoria}</td>
      <td>${formatarMoeda(orcamento.valor_limite)}</td>
      <td>${String(orcamento.mes).padStart(2, '0')}/${orcamento.ano}</td>
      <td>
        <button class="button danger" type="button" data-id="${orcamento.id}">Excluir</button>
      </td>
    `;
    tabelaOrcamentos.appendChild(tr);
  });
}

if (tabelaOrcamentos) {
  tabelaOrcamentos.addEventListener('click', async (event) => {
    const botao = event.target.closest('button[data-id]');
    if (!botao) return;

    await apiRequest(`/orcamentos/${botao.dataset.id}`, { method: 'DELETE' });
    await carregarOrcamentos();
  });
}

if (formOrcamento) {
  formOrcamento.addEventListener('submit', async (event) => {
    event.preventDefault();

    const dados = {
      categoria: buscarElemento('categoria').value,
      valor_limite: buscarElemento('valorLimite').value,
      mes: buscarElemento('mes').value,
      ano: buscarElemento('ano').value
    };

    try {
      await apiRequest('/orcamentos', {
        method: 'POST',
        body: JSON.stringify(dados)
      });
      mostrarMensagem(mensagem, 'Orcamento cadastrado com sucesso.', 'success');
      formOrcamento.reset();
      await carregarOrcamentos();
    } catch (error) {
      mostrarMensagem(mensagem, error.message, 'error');
    }
  });
}

carregarOrcamentos().catch(console.error);
