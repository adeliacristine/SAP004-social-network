export const table = () => {
  const container = document.createElement('div');
  const template = `
  <div class='carregando'>

  <h1>Página em construção</h1>
  <button class='return-bttn'><a href='/#home'>Voltar<a/></button>
  </div>`;

  container.innerHTML = template;

  return container;
};
