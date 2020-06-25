import { firebaseRegistration } from './data.js';

export const authRegistration = () => {
  const container = document.createElement('div');
  container.className = 'container-div';
  const template = `
  <section class='logo-cad'>
  <img src='./imagens/logo2.png' />
  </section>
  <section class='register-container'>
    <h2 class='welcome'>Cadastre-se!</h2>
    <form>
    <ul>
    <li class='input-li'>
      <input class='input' type='' id='nome-usuario' placeholder='Nome do usuário'> 
    </li>
    <li class='input-li'>  
      <input class='input ' type='email' id='email-cad' placeholder='Email'> 
    </li class='input-li'>
    <li class='input-li'>
      <input class='input' type='password' id='password-cad' placeholder='Senha'>
      <label for ='password-cad'><img id='viewPassword' class='olho'src = './imagens/olho.png'></label>
      </li>
      <li class='input-li'>
      <input class='input' type='password' id='password-cad-confirm' placeholder='Confirme sua senha'> 
      <label for ='password-cad-confirm'><img id='viewPassword1' class='olho'src = './imagens/olho.png'></label>
      </li>
      </ul>
    </form>
    <div class='register-page-bttns'></br>
    <a class='margin bttn-style register-bttn' id='cadastro' href='#/login'>Cadastrar</a>
    <a class='return-bttn bttn-style' href='/#login'>Voltar</a>
    </div>
     <br><div id='teste13'>
      </div>
    </section>`;
  const templateSucess = ` 
      <section class='logo-cad'>
        <img src='./imagens/logo oficial2.png' />
      </section>
      <div class ='register-done' >
        <p id='escrita'>Você se cadastrou com sucesso <i class='fas fa-check-circle'></i></p><br>
        <div  id='irParaLogin'>
          <a href ='/#home'>Entrar <i class='fas fa-sign-in-alt'></i></a>
        </div>
      </div>
      </div>`;
  const templateFail = `        
      <div id='teste10' class='register-error'>
      <p>Ops <i class='fas fa-exclamation-circle'></i> </p>
        <p id=''> Algo deu errado, <br>verifique se os campos estão preenchidos corretamente.<br>
         </p>
      </div>`;

  container.innerHTML = template;

  const registerButton = container.querySelector('#cadastro');
  const registerEmail = container.querySelector('#email-cad');
  const registerPassword = container.querySelector('#password-cad');
  const confirmPassword = container.querySelector('#password-cad-confirm');
  const userName = container.querySelector('#nome-usuario');

  registerButton.addEventListener('click', (event) => {
    event.preventDefault();
    const sucess = () => {
      container.innerHTML = templateSucess;
    };
    const fail = (errorFirebase) => {
      container.querySelector('#teste13').innerHTML = errorFirebase;
    };
    if (
      registerPassword.value === confirmPassword.value &&
      confirmPassword.value !== '' &&
      userName.value !== ''
    ) {
      const authentication = firebaseRegistration(
        registerEmail.value,
        registerPassword.value,
        sucess,
        fail,
        userName.value
      );
      firebaseRegistration(authentication);
    } else {
      container.querySelector('#teste13').innerHTML = templateFail;
    }
  });
  const bntView = container.querySelector('#viewPassword');
  const bntView1 = container.querySelector('#viewPassword1');

  bntView.addEventListener('click', (event) => {
    event.preventDefault();
    let senha = container.querySelector('#password-cad');
    if (senha.type == 'password') {
      senha.type = 'text';
    } else {
      senha.type = 'password';
    }
  });

  bntView1.addEventListener('click', (event) => {
    event.preventDefault();
    let passwordEye = container.querySelector('#password-cad-confirm');
    if (passwordEye.type == 'password') {
      passwordEye.type = 'text';
    } else {
      passwordEye.type = 'password';
    }
  });

  return container;
};
