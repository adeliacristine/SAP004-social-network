import {
  createPost, readPosts, editPost, deletePost, likePost, creatNewComent, deletePostComent,
  readComent
} from './data.js';

export const feed = () => {
  const container = document.createElement("div");
  container.className = "container-feed";

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
  <img class="foto-style" src="./imagens/fotodeperfil.jpg">
  <h1 id='usuario'class="text-style"></h1>
  <p class="text-style">Sou muito feliz!</p>
  </div>
</div>

<div class= 'post-and-coment'>
<section class='post-container'>
  <form class='post-area'>
  <textarea id='post-text' class="textarea-style" rows="5" cols="10"
  placeholder="Escreva uma mensagem."></textarea>
  <div class="post-btn-area" id='bttn-post>   
  <button type='button' id='add-photo' class='feed-bttn'><i class="fas fa-camera"></i></button>   
  <button type='submit' id ='btn-comentar' class='feed-bttn'>Postar</button>  
  </div>
  </form>
  </section>

  <section class='newpost-container'>
  <div class='li-posted' id='comentarios'></div>
  </section>
<button id='testar'></button>
  

  </div>
  </section>

  
  `;

  const post = container.querySelector("#post-text");
  const btnPost = container.querySelector("#btn-comentar");
  const postMessage = container.querySelector("#comentarios");
  const btnSair = container.querySelector("#sair");
  const postUser = container.querySelector("#usuario");

  const postTemplate = (array, nome) => {
    postUser.innerHTML = nome;
    postMessage.innerHTML = "";
    const containerDivNova = document.createElement("div");
    postMessage.innerHTML = array
      .map(
        (post) => `<section class='posted-area'>
    <div class='header-postedarea'>
    <h1>Postado por: ${post.user} ${post.date} ${post.time}</h1>
    </div>
    <textarea class='post-box' data-post='${post.idDoc}' value="Not editable" disabled="disabled" 
    contenteditable="false">${post.text}</textarea>
    <div class='btn-area-posted'> 
    <button class='feed-bttn' id='like-btn' data-like = '${post.idDoc}'><i class="fas fa-glass-cheers"> ${post.like} </i></button> 
    <button class='feed-bttn' id='deletar' data-id ='${post.id}' data-delete='${post.idDoc}'><i class="far fa-trash-alt"></i></button>
    <button class='feed-bttn'  id='btn-comentar' data-comentario='${post.id}' data-comentar='${post.idDoc}'>Ver Comentários</button>
    <button class='feed-bttn hide' id='btn-salvar' data-idsave='${post.id}' data-save='${post.idDoc}' data-edit ='${post.idDoc}'>Salvar</button>
    <button class='feed-bttn ed1 ' id='editar' data-idedit= '${post.id}' data-editar= '${post.idDoc}' data-edit = '${post.idDoc}'> <i class="fas fa-edit"></i></button></div></section><br> <section class='newpost-container'>
    </section>
    
    <section class='li-posted' id='post-coment' data-comtpost='${post.idDoc}'>
    </section>
    `
      )
      .join("");
    postMessage.appendChild(containerDivNova);



    const loginEvent = () => {
      const usuarioAtual = firebase.auth().currentUser.uid;
      const btnDel = container.querySelectorAll("#deletar");
      btnDel.forEach((element) => {
        if (element.dataset.id === usuarioAtual) {
          element.style.display = "block";
        } else {
          element.style.display = "none";
        }
      });
    };

    const loginEventEdit = () => {
      const usuarioAtual = firebase.auth().currentUser.uid;
      const btnEdit = container.querySelectorAll("#editar");
      // const btnSalvar = container.querySelector("#btn-salvar");
      btnEdit.forEach((element) => {
        if (element.dataset.idedit === usuarioAtual) {
          element.style.display = "";
        } else {
          console.log("não aparece");
          element.style.display = "none";
        }
      });
    };

    const editEvent = () => {
      const btnEdit = container.querySelectorAll("#editar");
      btnEdit.forEach((element) => {
        element.addEventListener("click", (event) => {
          event.preventDefault();
          const postId = element.dataset.edit;
          console.log(postId);
          const btnSalvar = container.querySelector(
            `button[data-save='${postId}']`
          );
          btnSalvar.classList.remove("hide");
          const texto = container.querySelector(
            `textarea[data-post='${postId}']`
          );
          texto.disabled = false;
          const btnEdit1 = container.querySelector(
            `button[data-editar='${postId}']`
          );
          btnEdit1.classList.add("hide");
          console.log(event.target.dataset.idedit);
          console.log(event.target.dataset.editart);

        });
      });
    };
    const saveEditedEvent = () => {
      const btnSalvar = container.querySelectorAll("#btn-salvar");
      btnSalvar.forEach((element) => {
        element.addEventListener("click", (event) => {
          event.preventDefault();
          const postId = element.dataset.save;
          const texto = container.querySelector(
            `textarea[data-post='${element.dataset.save}']`
          );
          const btnEdit = container.querySelector(
            `button[data-edit='${postId}']`
          );
          btnEdit.classList.remove("hide"); // Mostra o botão editar
          const btnSalvar1 = container.querySelector(
            `button[data-save='${postId}']`
          );
          btnSalvar1.classList.add("hide"); // Oculta o botão salvar
          editPost(element.dataset.edit, texto.value);
        });
      });
    };
    const deletEvent = () => {
      const btnDel = container.querySelectorAll("#deletar");
      btnDel.forEach((element) => {
        element.addEventListener("click", (event) => {
          event.preventDefault();
          const usuarioAtual = firebase.auth().currentUser.uid;
          if (element.dataset.id === usuarioAtual) {
            deletePost(element.dataset.delete);
          } else {
            console.log("deu ruim");
          }
        });
      });
    };
    const likeEvent = () => {
      const likeBttn = container.querySelectorAll("#like-btn");
      likeBttn.forEach((element) => {
        element.addEventListener("click", (event) => {
          event.preventDefault();
          likePost(element.dataset.like);
        });
      });
    };

   
    const comentTemplate = (array) => {
      //const postId = event.target.dataset.comentar;
    //console.log(postId);
      const postComentario = container.querySelector(`div[data-comentpost ='${post.idDoc}']`);
      postComentario.innerHTML = '';
      const containerComent = document.createElement('div');
      postComentario.innerHTML = array.map(post =>
        `<section class='posted-area-coment'>
    <h1>${post.user}</h1>
    <span>${post.date}</span>
    <span>${post.time}</span>
    <textarea class='post-box'>${post.text}</textarea>
    <div class='btn-area-posted'> 
    <button class='feed-bttn' id='like-btn-coment' data-like ='${post.idDoc}'><i class="fas fa-glass-cheers"> </i></button> 
    <p id='numbers-like-coment'>${post.like}<p>
    <button class='feed-bttn' id='deletar-coment' data-id='${post.id}' data-delcoment = '${post.idDoc}'><i class="far fa-trash-alt"></i></button>
    <button class='feed-bttn' id='editar-coment' data-edit = '${post.idDoc}'><i class="fas fa-edit"></i></button>
    </div></section><br>`).join('');
      postComentario.appendChild(containerComent);


      const deletEventComent = () => {
        const btnDel = container.querySelectorAll("#deletar-coment");

        btnDel.forEach((element) => {
          element.addEventListener("click", (event) => {
            event.preventDefault();
            const idDoPost = event.target.dataset.id;
            console.log(idDoPost);
            const usuarioAtual = firebase.auth().currentUser.uid;
            if (element.dataset.id === usuarioAtual) {
              deletePostComent(idDoPost, element.dataset.delcoment);
            } else {
              console.log("deu ruim");
              console.log(element.dataset.id);
              console.log(usuarioAtual);
            }
          });
        });
      };
      deletEventComent();
    };
    //comtpost  button[data-save='${postId}'
    const comentEvent = () => {
      const bntComent = container.querySelectorAll('#btn-comentar');
      bntComent.forEach(element => {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          const postId = event.target.dataset.comentar;
          const comentario = container.querySelector(`section[data-comtpost='${postId}']`);
          comentario.innerHTML = '';
          console.log('clicou');
          console.log(event.target.dataset.comentar);
          const containerComent = document.createElement('div');
          comentario.innerHTML = `
          <section>
    <section><textarea id='post-text-coment' class="textarea-style">Comente aqui</textarea>
    <button class='feed-bttn' id='btnn-coment'data-coment2='${post.idDoc}' >Comentar</button></section>
    
  <section class='newpost-container'>
  <div class='li-posted' id='new-coment' data-comentpost='${post.idDoc}'></div>
  </section> </section>`;
          comentario.appendChild(containerComent);


          const coment = container.querySelector("#post-text-coment");
          //const btnnComent = container.querySelector('#btnn-coment');
          const ids = event.target.dataset.comentar;

          /*  btnnComent.addEventListener("click", (event) => {
              event.preventDefault();
              console.log('eita, fuincoou o botão comentar!');
             console.log(coment.value);
              console.log(ids);
              creatNewComent(coment.value, ids);
              readComent(comentTemplate, ids);
              coment.value = "";
              coment.innerHTML = "";
            });*/


          const comentarEvent = () => {
            const btnnComent = container.querySelectorAll('#btnn-coment');
            btnnComent.forEach((element) => {
              element.addEventListener("click", (event) => {
                event.preventDefault();
                console.log(event.target.dataset.comentar);
                /*const postId = event.target.dataset.coment2;
                console.log(postId);*/
                //const postagem = container.querySelector(`div[data-comentpost='${postId}']`);
                console.log('foi aqui');
                
                creatNewComent(coment.value, ids);
                readComent(comentTemplate, ids);
                coment.value = "";
                coment.innerHTML = "";
              });

            });

          };
          comentarEvent();
        });
      });
    };

    likeEvent();
    deletEvent();
    editEvent();
    loginEvent();
    saveEditedEvent();
    loginEventEdit();
    comentEvent();
    creatNewComent();
    comentarEvent();

  };

  readPosts(postTemplate);

  btnPost.addEventListener("click", (event) => {
    event.preventDefault();
    post.innerHTML = "";
    createPost(post.value);
    post.value = "";
  });

  btnSair.addEventListener("click", (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.href = "/#login";
      })
      .catch(() => { });
  });

  return container;
};
