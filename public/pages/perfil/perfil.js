export const profile = () => {
  const container = document.createElement('div');

  container.innerHTML = `
<section class='feed-container cor-menu'>
<div class= 'menu-inicial'>
<input type ='checkbox' id ='check'>
<label for ='check' class='icone'><img src = './imagens/icone.png'></label>
<nav class='nav'>
<a href='/#home'><div class='link'>Home</div></a>
<a href='/#perfil'><div class='link'>Perfil</div></a>
<a href='/#bares'><div class='link'>Bares</div></a>
<a href='/#mesas'><div class='link'>Mesas</div></a>
<a id='sair'><div class='link'>Sair</div></a>
</nav>
</div>
<div class='title'>
<h1>Happy Hour Home</h1>
</div>
</section>
  
  
<section class='perfil-style'>
<img class='foto-style' src='./imagens/profile.jpg'>
</section>

<section class='post-container'>
<form class='post-area'>
<div class='bio-infos'>
<h1 class='text-style'> </h1>
</div>
<textarea id='post-text'  class='textarea-style' rows='5' cols='10'
>Página em construção</textarea>
<div class='post-btn-area'>    
<button class='btn-style feed-bttn'><a href='/#home'>Voltar<a/></button>  
</div>
</form>
</section>
  
<section class='newpost-container'>
<form >
<ul>
<li id='comentarios'></li>
</ul>
</form>
</section>
`;

  return container;
};
