import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";

export async function logActivity(
  userId: string,
  action: string,
  applicationId?: string,
  details?: string
) {
  try {
    await addDoc(collection(db, COLLECTIONS.ACTIVITY_LOGS), {
      userId,
      action,
      ...(applicationId && { applicationId }),
      ...(details && { details }),
      timestamp: serverTimestamp(),
    });
  } catch (e) {
    console.error("Activity log failed:", e);
  }
}
