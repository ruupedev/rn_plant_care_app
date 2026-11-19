import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../services/firebase";

export type Plant = {
  id: number;
  imageUri: string;
  name: string;
  scientificName: string;
  instructions: string;
};

export async function addPlant(plant: {
  name: string;
  scientificName: string;
  imageUri: string;
}) {
  const uid = auth.currentUser!.uid;
  const docRef = await addDoc(collection(db, "users", uid, "plants"), plant);
  return docRef.id;
}

export async function getPlants() {
  await auth.authStateReady();
  const uid = auth.currentUser!.uid;
  const snapshot = await getDocs(collection(db, "users", uid, "plants"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function deletePlant(id: string) {
  const uid = auth.currentUser!.uid;
  await deleteDoc(doc(db, "users", uid, "plants", id));
  return getPlants();
}
