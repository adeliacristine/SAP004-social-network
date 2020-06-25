import { firebaseLogin } from "./data.js";

export const authLogin = () => {
  const container = document.createElement("div");
  container.className = "container-log";

  const template = `
    <section class='logo'> 
    <img class='img-logo'src='./imagens/logo oficial2.png' />
    </section>
    <section class='container-form'>
    <div class='form'>
    <form>
    <p class='welcome'>Encontre amigos para o seu happy hour e compartilhe seus bares favoritos</p>
      <ul class='align-input'>
      <li class = 'input-li center'>
      <input type='email' class='input' id='e-mail' placeholder='Email'>
      </li>
      <li class= 'input-li center'>
      <input type='password' class= 'input' id='password' placeholder='Senha'>
      <label for= 'password'>
      <img id= 'view-password' class= 'olho' src= './imagens/olho.png'>
      </label>
      </li>
      <li> 
      <a class ='login-bttn bttn-style' id='login'>Entrar<a/> 
      </li>
      </ul> 
      </form>
      <div class ='message'>
      <p class ='login-error' id ='login-error'>
      </p> 
      </div>
     <br><div class='login-cad'>
    <h3>Ou conecte-se com</h3>
    <img class='icons' id='google' src='imagens/go.png'>
    <p> Você ainda não é cadastrado?
    Cadastre-se <a href='/#cadastro'>aqui!</a></br>
    </p>
</div>
</div>
    </section>`;

  container.innerHTML = template;

  const loginButton = container.querySelector("#login");
  const registeredEmail = container.querySelector("#e-mail");
  const registeredPassword = container.querySelector("#password");

  const route = () => {
    window.location.href = "/#home";
  };
  const errorMessages = {
    "auth/user-not-found":
      'Usuário não cadastrado <i class="fas fa-exclamation-triangle"></i>',
    "auth/wrong-password":
      'Senha incorreta <i class="fas fa-exclamation-triangle"></i>',
    "auth/invalid-email":
      'E-mail inválido <i class="fas fa-exclamation-triangle"></i>',
  };
  const printError = (error) => {
    document.getElementById(
      "login-error"
    ).innerHTML = `${errorMessages[error]}`;
  };

  loginButton.addEventListener("click", () => {
    const authentication = firebaseLogin(
      registeredEmail.value,
      registeredPassword.value,
      route,
      printError
    );
    firebaseLogin(authentication);
  });

  const btnGoogle = container.querySelector("#google");
  btnGoogle.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        window.location.href = "/#home";

        const token = result.credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
      });
  });
  const bntView = container.querySelector("#view-password");
  bntView.addEventListener("click", (event) => {
    event.preventDefault();
    const senha = container.querySelector("#password");
    if (senha.type === "password") {
      senha.type = "text";
    } else {
      senha.type = "password";
    }
  });
  return container;
};
