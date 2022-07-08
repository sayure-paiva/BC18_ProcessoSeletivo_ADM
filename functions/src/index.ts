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
db.settings({ ignoreUndefinedProperties: true });

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
    const { email, password, name, type } = data;
    const dataInfo = { email, password, name, type };

    await verfication(data, context);
    const user = await auth.createUser({
      email,
      password,
      displayName: name,
    })
    await setInColletion(user, dataInfo);
});

exports.editUser = functions.https.onCall(async (data, context) => {
  const user = await auth.getUser(data.uid);
  const customClaims = {
    type: [data.type],
  };

  await admin.auth().updateUser(user.uid, {
    email: data.email,
    displayName: data.name,
  });

  await auth.setCustomUserClaims(user.uid, customClaims);
  const userToken =context.auth!.token.type;
  if (userToken.toLowerCase().includes("admin")) {
    await db
      .collection("Super-users")
      .doc(user.uid)
      .set(
        {
          uid: data.uid,
          email: data.email,
          name: data.name,
          type: data.type,
          registeredAt: Date.now(),
        },
        { merge: true }
      )
      .then(() => {
        console.log(
          `User "${user.displayName}" atualizado. Custom claim adicionado: "${customClaims.type}"`
        );
        return {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          type: data.type,
          registeredAt: Date.now(),
        };
      })
      .catch((error) => {
        throw new functions.https.HttpsError(
          "internal",
          "Erro ao editar usuário",
          error
        );
      });
  } else {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Somente admins podem editar usuarios."
    );
  }
});

exports.deleteUser = functions.https.onCall(async (data, context) => {
  const userToken = context.auth!.token.type;
  if (userToken.toLowerCase().includes("admin")) {
    const user = await admin.auth().getUser(data.uid);
    await admin.auth().deleteUser(user.uid);
    await db
      .collection("Super-users")
      .doc(user.uid)
      .delete()
      .then(async () => {
        console.log(`User "${user.displayName}" deleted.`);
        const querySnapshot = await db.collection("Super-users").get();
        const users: any[] = [];
        querySnapshot.forEach((doc) => {
          users.push({
            uid: doc.id,
            email: doc.data().email,
            name: doc.data().name,
            type: doc.data().type,
          });
        });
        return {
          "message": "Usuário criado"
        }
      })
      .catch((error) => {
        throw new functions.https.HttpsError(
          "internal",
          "Erro ao deletar usuário",
          error
        );
      });
  } else {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Somente admins podem deletar users."
    );
  }
});

async function verfication(data: any, context: any) {
  const { email, password, name, type } = data;
  const userToken = context.auth!.token.type;

  if (!userToken.toLowerCase().includes("admin")) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Somente admins podem criar users."
    );
  } 
  if (email == '' || password == '') {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Email e Password não podem ser nulos!"
    );
  }
  if (name == '' || type == '') {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Username ou Type não podem ser nulos!"
    );
  }
}

async function setInColletion(userInfo: any, dataInfo: any) {
  const user = { uid: userInfo.uid, email: dataInfo.email, name: dataInfo.name, type: dataInfo.type};
  const customClaims = {
    type: [userInfo.type],
  };
  await auth.setCustomUserClaims(user.uid, customClaims).then(() => {
    db.collection("Super-users")
    .doc(user.uid)
    .set(
      { uid: user.uid, email: user.email, name: user.name, 
        type: user.type, registeredAt: Date.now() }, 
      { merge: true })
    .then(() => {
      console.log(`User "${user.name}" criado."`);
      return {
        "message": "Usuário criado"
      }
    })
    .catch((error) => {
      throw new functions.https.HttpsError(
        "internal",
        "Erro ao criar usuário",
        error
      );
    });
  });

}