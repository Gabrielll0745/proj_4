protegerPagina();

const tabelaTransacoes = buscarElemento('tabelaTransacoes');
const formTransacao = buscarElemento('formTransacao');
const mensagem = buscarElemento('mensagem');

async function carregarResumo() {
  const receitasEl = buscarElemento('receitas');
  const despesasEl = buscarElemento('despesas');
  const saldoEl = buscarElemento('saldo');

  if (!receitasEl || !despesasEl || !saldoEl) return;

  const resumo = await apiRequest('/transacoes/resumo');

  receitasEl.textContent = formatarMoeda(resumo.receitas);
  despesasEl.textContent = formatarMoeda(resumo.despesas);
  saldoEl.textContent = formatarMoeda(resumo.saldo);
  saldoEl.className = resumo.saldo >= 0 ? 'positive' : 'negative';
}

async function carregarTransacoes() {
  if (!tabelaTransacoes) return;

  const transacoes = await apiRequest('/transacoes');
  tabelaTransacoes.innerHTML = '';

  transacoes.forEach((transacao) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${new Date(transacao.data).toLocaleDateString('pt-BR')}</td>
      <td>${transacao.tipo}</td>
      <td>${transacao.categoria}</td>
      <td>${transacao.descricao || '-'}</td>
      <td class="${transacao.tipo === 'receita' ? 'positive' : 'negative'}">
        ${formatarMoeda(transacao.valor)}
      </td>
      <td>
        <button class="button danger" type="button" data-id="${transacao.id}">Excluir</button>
      </td>
    `;
    tabelaTransacoes.appendChild(tr);
  });
}

if (tabelaTransacoes) {
  tabelaTransacoes.addEventListener('click', async (event) => {
    const botao = event.target.closest('button[data-id]');
    if (!botao) return;

    await apiRequest(`/transacoes/${botao.dataset.id}`, { method: 'DELETE' });
    await carregarTransacoes();
    await carregarResumo();
  });
}

if (formTransacao) {
  formTransacao.addEventListener('submit', async (event) => {
    event.preventDefault();

    const dados = {
      tipo: buscarElemento('tipo').value,
      categoria: buscarElemento('categoria').value,
      descricao: buscarElemento('descricao').value,
      valor: buscarElemento('valor').value,
      data: buscarElemento('data').value
    };

    try {
      await apiRequest('/transacoes', {
        method: 'POST',
        body: JSON.stringify(dados)
      });
      mostrarMensagem(mensagem, 'Transacao cadastrada com sucesso.', 'success');
      formTransacao.reset();
    } catch (error) {
      mostrarMensagem(mensagem, error.message, 'error');
    }
  });
}

if (buscarElemento('receitas')) carregarResumo().catch(console.error);
if (tabelaTransacoes) carregarTransacoes().catch(console.error);
