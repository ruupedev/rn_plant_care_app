import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../services/firebase";

export type Plant = {
  id: string;
  imageUri: string;
  name: string;
  scientificName: string;
  watering: string;
  sunlight: string;
};

export async function addPlant(plant: {
  name: string;
  scientificName: string;
  imageUri: string;
  watering: string;
  sunlight: string;
}) {
  const uid = auth.currentUser!.uid;
  const docRef = await addDoc(collection(db, "users", uid, "plants"), plant);
  return docRef.id;
}

export async function getPlants() {
  await auth.authStateReady();
  const uid = auth.currentUser!.uid;
  const snapshot = await getDocs(collection(db, "users", uid, "plants"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Plant, "id">),
  }));
}

export async function getPlant(id: string) {
  await auth.authStateReady();
  const uid = auth.currentUser!.uid;
  const snapshot = await getDoc(doc(db, "users", uid, "plants", id));
  return { id: snapshot.id, ...(snapshot.data() as Omit<Plant, "id">) };
}

export async function deletePlant(id: string) {
  const uid = auth.currentUser!.uid;
  await deleteDoc(doc(db, "users", uid, "plants", id));
  return getPlants();
}
