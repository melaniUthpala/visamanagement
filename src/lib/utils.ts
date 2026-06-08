import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApplicationStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending_review: "Pending Review",
  approved: "Approved",
  rejected: "Rejected",
  needs_correction: "Needs Correction",
  under_review: "Under Review",
  processing: "Processing",
  waiting_payment: "Waiting Payment",
  payment_completed: "Payment Completed",
  interview_scheduled: "Interview Scheduled",
  completed: "Completed",
};

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  pending_review: "bg-yellow-100 text-yellow-800 border-yellow-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  needs_correction: "bg-orange-100 text-orange-800 border-orange-200",
  under_review: "bg-blue-100 text-blue-800 border-blue-200",
  processing: "bg-purple-100 text-purple-800 border-purple-200",
  waiting_payment: "bg-amber-100 text-amber-800 border-amber-200",
  payment_completed: "bg-teal-100 text-teal-800 border-teal-200",
  interview_scheduled: "bg-indigo-100 text-indigo-800 border-indigo-200",
  completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export const APPLICATION_TIMELINE_STEPS = [
  { key: "submitted", label: "Application Submitted" },
  { key: "documents", label: "Documents Uploaded" },
  { key: "approved", label: "Application Approved" },
  { key: "initial_payment", label: "Initial Payment" },
  { key: "processing", label: "Processing" },
  { key: "final_payment", label: "Final Payment" },
  { key: "interview", label: "Interview Scheduled" },
  { key: "completed", label: "Completed" },
] as const;

export function getTimelineStep(status: ApplicationStatus): number {
  const map: Record<ApplicationStatus, number> = {
    pending_review: 1,
    needs_correction: 1,
    under_review: 1,
    approved: 2,
    rejected: 1,
    waiting_payment: 3,
    payment_completed: 4,
    processing: 5,
    interview_scheduled: 6,
    completed: 8,
  };
  return map[status] ?? 0;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}
