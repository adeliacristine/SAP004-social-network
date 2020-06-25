export const firebaseLogin = (
  registeredEmail,
  registeredPassword,
  route,
  printError,
) => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(registeredEmail, registeredPassword)
        .then(() => {
          route();
        })
        .catch((error) => {
          const errorCode = error.code;
          printError(errorCode);
        });
    });
};
