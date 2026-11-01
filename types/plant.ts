import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

export type Plant = {
  id: number;
  imageUri: string;
  name: string;
  instructions: string;
};

export async function addPlant(plant: { name: string; imageUri: string }) {
  const docRef = await addDoc(collection(db, "plants"), plant);
  return docRef.id;
}
