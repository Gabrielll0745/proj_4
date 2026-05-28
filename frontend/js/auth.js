const loginForm = buscarElemento('loginForm');
const cadastroForm = buscarElemento('cadastroForm');
const mensagem = buscarElemento('mensagem');

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = buscarElemento('email').value.trim();
    const senha = buscarElemento('senha').value;

    console.log('[login] enviando formulario:', { email });

    try {
      const resposta = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, senha })
      });
      salvarSessao(resposta);
      window.location.href = 'home.html';
    } catch (error) {
      mostrarMensagem(mensagem, error.message, 'error');
    }
  });
}

if (cadastroForm) {
  cadastroForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = buscarElemento('nomeCadastro').value.trim();
    const email = buscarElemento('emailCadastro').value.trim();
    const senha = buscarElemento('senhaCadastro').value;

    console.log('[cadastro] enviando formulario:', { nome, email });

    try {
      await apiRequest('/auth/cadastro', {
        method: 'POST',
        body: JSON.stringify({ nome, email, senha })
      });
      mostrarMensagem(mensagem, 'Cadastro realizado. Redirecionando para login...', 'success');
      cadastroForm.reset();
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1200);
    } catch (error) {
      mostrarMensagem(mensagem, error.message, 'error');
    }
  });
}
