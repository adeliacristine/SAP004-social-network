import {
  createPost,
  readPosts,
  editPost,
  deletePost,
  likePost,
} from './data.js';

export const feed = () => {
  const container = document.createElement('div');
  container.className = 'container-feed';

  container.innerHTML = `
  <section class='feed-container cor-menu'>
  <div class= 'menu-inicial'>
  <input type ='checkbox' id ='check'>
  <label for ='check' class='icone img-menu'><img src = './imagens/icone.png'></label>
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

<section class='entire-container'>
 <div class='perfil-container'>
  <div class='perfil-style'>
  <img class='foto-style' src='./imagens/profile.jpg'>
  <h1 id='usuario'class='text-style'></h1>
  <p class='text-style'></p>
  </div>
</div>

<div class= 'post-and-coment'>
<section class='post-container'>
  <form class='post-area'>
  <textarea id='post-text' class='textarea-style' rows='5' cols='10'
  placeholder='Escreva uma mensagem.'></textarea>
  <div class='post-btn-area' id='bttn-post>   
  <button type='button' id='add-photo' class='feed-bttn'></button>   
  <button type='submit' id ='btn-comentar' class='feed-bttn'>Postar</button>  
  </div>
  </form>
  </section>
  <section class='newpost-container'>
  <div class='li-posted' id='comentarios'></div>
  </section>
  </div>
  </section>

  
  `;

  const post = container.querySelector('#post-text');
  const btnPost = container.querySelector('#btn-comentar');
  const postMessage = container.querySelector('#comentarios');
  const btnSair = container.querySelector('#sair');
  const postUser = container.querySelector('#usuario');

  const postTemplate = (array, nome) => {
    postUser.innerHTML = nome;
    postMessage.innerHTML = '';
    const containerDivNova = document.createElement('div');
    postMessage.innerHTML = array
      .map(
        (post) => `<section class='posted-area'>
    <div class='header-postedarea'>
    <h1>Postado por: ${post.user} ${post.date} ${post.time}</h1>
    </div>
    <textarea class='post-box' data-post='${post.idDoc}' value='Not editable' disabled='disabled' 
    contenteditable='false'>${post.text}</textarea>
    <div class='btn-area-posted'> 
    <button class='feed-bttn' id='like-btn' data-like = '${post.idDoc}'><i class='fas fa-glass-cheers'> ${post.like} </i></button> 
    <button class='feed-bttn' id='deletar' data-id ='${post.id}' data-delete='${post.idDoc}'><i class='far fa-trash-alt'></i></button>
    <button class='feed-bttn hide' id='btn-salvar' data-idsave='${post.id}' data-save='${post.idDoc}' data-edit ='${post.idDoc}'>Salvar</button>
    <button class='feed-bttn ed1 ' id='editar' data-idedit= '${post.id}' data-editar= '${post.idDoc}' data-edit = '${post.idDoc}'> <i class='fas fa-edit'></i></button></div></section><br> <section class='newpost-container'>
    </section>
    
    <section class='li-posted' id='post-coment' data-comtpost='${post.idDoc}'>
    </section>`
      )
      .join('');

    postMessage.appendChild(containerDivNova);

    const loginEvent = () => {
      const usuarioAtual = firebase.auth().currentUser.uid;
      const btnDel = container.querySelectorAll('#deletar');
      btnDel.forEach((element) => {
        if (element.dataset.id === usuarioAtual) {
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        }
      });
    };

    const loginEventEdit = () => {
      const usuarioAtual = firebase.auth().currentUser.uid;
      const btnEdit = container.querySelectorAll('#editar');
      btnEdit.forEach((element) => {
        if (element.dataset.idedit === usuarioAtual) {
          element.style.display = '';
        } else {
          element.style.display = 'none';
        }
      });
    };

    const editEvent = () => {
      const btnEdit = container.querySelectorAll('#editar');
      btnEdit.forEach((element) => {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          const postId = element.dataset.edit;
          const btnSalvar = container.querySelector(
            `button[data-save='${postId}']`
          );
          btnSalvar.classList.remove('hide');
          const texto = container.querySelector(
            `textarea[data-post='${postId}']`
          );
          texto.disabled = false;
          const btnEdit1 = container.querySelector(
            `button[data-editar='${postId}']`
          );
          btnEdit1.classList.add('hide');
        });
      });
    };
    const saveEditedEvent = () => {
      const btnSalvar = container.querySelectorAll('#btn-salvar');
      btnSalvar.forEach((element) => {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          const postId = element.dataset.save;
          const texto = container.querySelector(
            `textarea[data-post='${element.dataset.save}']`
          );
          const btnEdit = container.querySelector(
            `button[data-edit='${postId}']`
          );
          btnEdit.classList.remove('hide');
          const btnSalvar1 = container.querySelector(
            `button[data-save='${postId}']`
          );
          btnSalvar1.classList.add('hide');
          editPost(element.dataset.edit, texto.value);
        });
      });
    };
    const deletEvent = () => {
      const btnDel = container.querySelectorAll('#deletar');
      btnDel.forEach((element) => {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          const usuarioAtual = firebase.auth().currentUser.uid;
          if (element.dataset.id === usuarioAtual) {
            deletePost(element.dataset.delete);
          }
        });
      });
    };
    const likeEvent = () => {
      const likeBttn = container.querySelectorAll('#like-btn');
      likeBttn.forEach((element) => {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          likePost(element.dataset.like);
        });
      });
    };

    likeEvent();
    deletEvent();
    editEvent();
    loginEvent();
    saveEditedEvent();
    loginEventEdit();
  };

  readPosts(postTemplate);

  btnPost.addEventListener('click', (event) => {
    event.preventDefault();
    post.innerHTML = '';
    createPost(post.value);
    post.value = '';
  });

  btnSair.addEventListener('click', (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.href = '/#login';
      })
      .catch(() => { });
  });

  return container;
};
