protegerPagina();

async function carregarRelatorios() {
  const [resumo, transacoes] = await Promise.all([
    apiRequest('/transacoes/resumo'),
    apiRequest('/transacoes')
  ]);

  buscarElemento('receitas').textContent = formatarMoeda(resumo.receitas);
  buscarElemento('despesas').textContent = formatarMoeda(resumo.despesas);
  buscarElemento('saldo').textContent = formatarMoeda(resumo.saldo);

  const categorias = {};
  transacoes
    .filter((transacao) => transacao.tipo === 'despesa')
    .forEach((transacao) => {
      categorias[transacao.categoria] = (categorias[transacao.categoria] || 0) + Number(transacao.valor);
    });

  const lista = buscarElemento('despesasPorCategoria');
  lista.innerHTML = '';

  Object.entries(categorias).forEach(([categoria, valor]) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${categoria}</td><td>${formatarMoeda(valor)}</td>`;
    lista.appendChild(tr);
  });
}

carregarRelatorios().catch(console.error);
