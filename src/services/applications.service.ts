import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { VisaApplication, ApplicationFormData, ApplicationStatus } from "@/types";
import { logActivity } from "./activity.service";

export async function createApplication(
  userId: string,
  userName: string,
  userEmail: string,
  data: ApplicationFormData
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTIONS.APPLICATIONS), {
    userId,
    userName,
    userEmail,
    ...data,
    status: "pending_review" as ApplicationStatus,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await logActivity(userId, "application_submitted", ref.id, "New visa application submitted");
  return ref.id;
}

// orderBy ඉවත් කළා — composite index නොමැතිව works
export async function getUserApplications(userId: string): Promise<VisaApplication[]> {
  const q = query(
    collection(db, COLLECTIONS.APPLICATIONS),
    where("userId", "==", userId)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as VisaApplication));
}

export async function getAllApplications(): Promise<VisaApplication[]> {
  const q = query(
    collection(db, COLLECTIONS.APPLICATIONS),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as VisaApplication));
}

export async function getApplication(id: string): Promise<VisaApplication | null> {
  const snap = await getDoc(doc(db, COLLECTIONS.APPLICATIONS, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as VisaApplication;
}

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus,
  adminId: string,
  remarks?: string
): Promise<void> {
  await updateDoc(doc(db, COLLECTIONS.APPLICATIONS, applicationId), {
    status,
    ...(remarks && { adminRemarks: remarks }),
    updatedAt: serverTimestamp(),
  });
  await logActivity(adminId, "status_updated", applicationId, `Status changed to ${status}`);
}