/* eslint-disable */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as serviceAccount from "./service-account.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://devsoulcode-default-rtdb.firebaseio.com",
});

const auth = admin.auth();
const db = admin.firestore();
const storage = admin.storage();


export const getEnrollmentId = functions.https.onCall(async (data) => {
  if (data.email === undefined || data.course === undefined) return;

  const querySnapshot = await admin
    .firestore()
    .collection("Inscricao")
    .where("curso", "==", data.course)
    .where("email", "==", data.email.toLowerCase())
    .orderBy("dataInscricao", "desc")
    .limit(1)
    .get();
  return querySnapshot.empty ? undefined : querySnapshot.docs[0].id;
});

exports.createUserWithEmailAndPassword = functions.https.onCall(async (data, context) => {

  const { email, password, displayName, type, photoURL } = data;
  const dataInfo = { email, password, displayName, type, photoURL };

  await validateAuthorization(context)

  await validateFields(data);

  await createAccountInAuthentication(dataInfo);

});

exports.editUser = functions.https.onCall(async (data, context) => {

  await validateAuthorization(context);

  await validateFields(data);

  try {

    await auth.getUser(data.uid);

  } catch (err) {

    throw new functions.https.HttpsError(
      "not-found",
      "Não foi possível encontrar o usuário pelo uid.",
      err
    );

  }

  const customClaims = { type: [data.type] };

  const updatedUser = {
    uid: data.uid,
    email: data.email,
    displayName: data.displayName,
    photoURL: data.photoURL,
    type: data.type,
  };

  await updadeUserInAuthentication(data);

  await auth.setCustomUserClaims(data.uid, customClaims);

  await updateDoc(updatedUser);

});

exports.deleteUser = functions.https.onCall(async (data, context) => {

  await validateAuthorization(context);

  await deleteDoc(data);

});


// Valida se o token tem o type "Admin"
async function validateAuthorization(context: any) {

  try {

    const token = context.auth!.token.type;

    if (!token.includes("Admin")) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Usuário não é adimistrador, somente administrador podem fazer essa solicitação!"
      );

    }
  }
  catch (err) {

    throw new functions.https.HttpsError(
      "permission-denied",
      "Token inválido!",
      err
    );
  }

}

// Valida se existe dados nulos
async function validateFields(data: any) {

  const { email, password, displayName, type } = data;

  if (email == "" || password == "") {

    throw new functions.https.HttpsError(
      "invalid-argument",
      "Email/password indefinidos!",
    );

  }

  if (displayName == "" || type == "") {

    throw new functions.https.HttpsError(
      "invalid-argument",
      "Name/type indefinidos!",
    );

  }

}

// Cria nova login apartir do email e senha do recebidos
async function createAccountInAuthentication(user: any) {

  try {

    const userRecord = await auth.createUser({
      email: user.email,
      password: user.password,
      displayName: user.name,
  })

  await setInColletion(userRecord, user);

  } catch (err) {

    throw new functions.https.HttpsError(
      "internal",
      "Email já cadastrado",
      err
    )

  }

}

// Cria um novo doc no firestore database com info do user dentro da colletion
async function setInColletion(userRecord: any, data: any) {

  const user = {
    uid: userRecord.uid,
    email: data.email,
    displayName: data.displayName,
    type: data.type,
    photoURL: data.photoURL,
    registeredAt: data.createdAt
  };

  const customClaims = {
    type: [userRecord.type],
  };


  await auth.setCustomUserClaims(user.uid!, customClaims);

  try {

    await db
    .collection("Super-users")
    .doc(user.uid!)
    .set(
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        type: user.type,
        photoURL: user.photoURL,
        registeredAt: Date.now()
      },
      { merge: true});

      return {
        message: "Novo usuário criado com sucesso"
      };


  } catch(err) {

    await auth.deleteUser(user.uid);

    throw new functions.https.HttpsError(
      "unimplemented",
      "Não possível criar documento para o usuário, uid já cadastrado.",
      err
    );

  }

}

// Atualiza as informações de login no Authentication do Firebase
async function updadeUserInAuthentication(data: any) {

  try {

    await auth.updateUser(data.uid, {
        email: data.email,
        displayName: data.displayName,
    })

  } catch(err) {

    throw new functions.https.HttpsError(
        "invalid-argument",
        "Erro ao tentar atualizar o usuário pelo uid.",
        err
    );

  }
}

// Atualiza o doc do user com novas dados
async function updateDoc(user: any) {

  try {

    await db.collection("Super-users").doc(user.uid).set(
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        type: user.type,
        photoURL: user.photoURL,
      },
      { merge: true }
      );

      console.log(`Usuario atualizado com sucesso,
      Nome: ${user.displayName},
      Type: ${user.type}`
      );

      return "Usuário atualizado com sucesso."

  } catch (err) {

    throw new functions.https.HttpsError(
      "invalid-argument",
      "Um erro aconteceu ao tentar atualizar os dados do usuário!",
      err
    );
  }
}

// Deleta o user do Authentication e o doc do firestore database
async function deleteDoc(data: any) {

  try {

    await auth.deleteUser(data.uid);

    await db.collection("Super-users").doc(data.uid).delete();

    return {
      status: 200,
      success: true,
      message: "Usuário deletado com sucesso."
    }

  } catch (err) {

    throw new functions.https.HttpsError(
      "invalid-argument",
      "Não foi possível encontrar o usuário. O uid não corresponde a nenhum usuário cadastrado!",
      err
    );

  }
}
