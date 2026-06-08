import {
  addDoc, collection, getDocs, query, where,
  updateDoc, doc, serverTimestamp, orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { Interview, InterviewMode } from "@/types";

export async function scheduleInterview(
  applicationId: string,
  userId: string,
  date: string,
  time: string,
  mode: InterviewMode,
  notes?: string
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTIONS.INTERVIEWS), {
    applicationId,
    userId,
    date,
    time,
    mode,
    ...(notes && { notes }),
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getUserInterviews(userId: string): Promise<Interview[]> {
  const q = query(collection(db, COLLECTIONS.INTERVIEWS), where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Interview));
}

export async function getAllInterviews(): Promise<Interview[]> {
  const q = query(collection(db, COLLECTIONS.INTERVIEWS), orderBy("date", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Interview));
}
