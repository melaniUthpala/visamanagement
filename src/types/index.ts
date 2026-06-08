import { Timestamp } from "firebase/firestore";

export type UserRole = "user" | "admin";

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  phone: string;
  nic: string;
  role: UserRole;
  createdAt: Timestamp;
}

export type ApplicationStatus =
  | "pending_review"
  | "approved"
  | "rejected"
  | "needs_correction"
  | "under_review"
  | "processing"
  | "waiting_payment"
  | "payment_completed"
  | "interview_scheduled"
  | "completed";

export interface VisaApplication {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  fullName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  address: string;
  country: string;
  jobCategory: string;
  passportNumber: string;
  status: ApplicationStatus;
  adminRemarks?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type DocumentType = "nic_front" | "nic_back" | "passport" | "photo" | "cv" | "certificate";

export interface AppDocument {
  id: string;
  applicationId: string;
  userId: string;
  type: DocumentType;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: Timestamp;
}

export type PaymentType = "registration" | "final";
export type PaymentStatus = "pending" | "paid" | "failed";

export interface Payment {
  id: string;
  applicationId: string;
  userId: string;
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
  stripeSessionId?: string;
  createdAt: Timestamp;
}

export type InterviewMode = "online" | "physical";

export interface Interview {
  id: string;
  applicationId: string;
  userId: string;
  date: string;
  time: string;
  mode: InterviewMode;
  notes?: string;
  createdAt: Timestamp;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Timestamp;
}

export interface ActivityLog {
  id: string;
  userId: string;
  applicationId?: string;
  action: string;
  details?: string;
  timestamp: Timestamp;
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  nic: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ApplicationFormData {
  fullName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  address: string;
  country: string;
  jobCategory: string;
  passportNumber: string;
}
