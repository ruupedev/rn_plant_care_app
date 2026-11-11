import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../services/firebase";

export type Plant = {
  id: number;
  imageUri: string;
  name: string;
  instructions: string;
};

export async function addPlant(plant: { name: string; imageUri: string }) {
  const uid = auth.currentUser!.uid;
  const docRef = await addDoc(collection(db, "users", uid, "plants"), plant);
  return docRef.id;
}
