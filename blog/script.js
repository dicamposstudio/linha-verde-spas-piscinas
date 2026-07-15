const grid = document.querySelector("[data-artigos]");
const destaqueBox = document.querySelector("[data-destaque]");
const busca = document.querySelector("[data-busca]");
const filtros = document.querySelectorAll("[data-categoria]");
const contador = document.querySelector("[data-contador]");
const vazio = document.querySelector("[data-vazio]");

let categoriaAtual = "Todos";

function formatarData(data) {
  return new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function criarCard(artigo) {
  const linkValido = artigo.url && artigo.url !== "#";
  return `
    <article class="post-card">
      <a class="post-image" href="${artigo.url}" ${linkValido ? "" : "aria-disabled='true'"}>
        <img src="${artigo.imagem}" alt="${artigo.titulo}" loading="lazy">
      </a>
      <div class="post-content">
        <div class="post-meta">
          <span>${artigo.categoria}</span>
          <small>${artigo.leitura}</small>
        </div>
        <h3>${artigo.titulo}</h3>
        <p>${artigo.descricao}</p>
        <div class="post-footer">
          <small>${formatarData(artigo.data)}</small>
          <a href="${artigo.url}" class="read-link">${linkValido ? "Ler artigo" : "Em breve"}</a>
        </div>
      </div>
    </article>
  `;
}

function renderizar(lista) {
  grid.innerHTML = lista.map(criarCard).join("");
  contador.textContent = lista.length;
  vazio.hidden = lista.length !== 0;
}

function renderizarDestaque() {
  const artigo = artigos.find(item => item.destaque) || artigos[0];
  if (!artigo || !destaqueBox) return;

  destaqueBox.innerHTML = `
    <div class="featured-image">
      <img src="${artigo.imagem}" alt="${artigo.titulo}" loading="lazy">
    </div>
    <div class="featured-content">
      <span>${artigo.categoria}</span>
      <h2>${artigo.titulo}</h2>
      <p>${artigo.descricao}</p>
      <div class="featured-info">
        <small>${artigo.leitura} de leitura</small>
        <small>${formatarData(artigo.data)}</small>
      </div>
      <a class="btn primary" href="${artigo.url}">Ler artigo destaque</a>
    </div>
  `;
}

function aplicarFiltros() {
  const termo = (busca?.value || "").toLowerCase().trim();

  const resultado = artigos.filter(artigo => {
    const passaCategoria = categoriaAtual === "Todos" || artigo.categoria === categoriaAtual;
    const texto = `${artigo.titulo} ${artigo.descricao} ${artigo.categoria} ${(artigo.tags || []).join(" ")}`.toLowerCase();
    const passaBusca = !termo || texto.includes(termo);
    return passaCategoria && passaBusca;
  });

  renderizar(resultado);
}

busca?.addEventListener("input", aplicarFiltros);

filtros.forEach(botao => {
  botao.addEventListener("click", () => {
    filtros.forEach(item => item.classList.remove("active"));
    botao.classList.add("active");
    categoriaAtual = botao.dataset.categoria;
    aplicarFiltros();
  });
});

renderizarDestaque();
renderizar(artigos);
