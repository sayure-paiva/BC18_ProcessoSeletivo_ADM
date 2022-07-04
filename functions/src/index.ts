import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

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
