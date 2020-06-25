export const firebaseRegistration = (
  registeredEmail,
  registeredPassword,
  route,
  printError,
  userName,
) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(registeredEmail, registeredPassword)
    .then(() => {
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: `${userName}`,
        })
        .then(() => {})
        .catch(() => {});
      route();
    })
    .catch((error) => {
      const errorCode = error.message;
      printError(errorCode);
    });
};
