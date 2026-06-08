import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(9, "Invalid phone number"),
    nic: z.string().min(9, "Invalid NIC number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  dateOfBirth: z.string().min(1, "Date of birth required"),
  gender: z.enum(["male", "female", "other"]),
  address: z.string().min(5, "Address required"),
  country: z.string().min(1, "Country required"),
  jobCategory: z.string().min(1, "Job category required"),
  passportNumber: z.string().min(5, "Valid passport number required"),
});

export const interviewSchema = z.object({
  applicationId: z.string().min(1),
  userId: z.string().min(1),
  date: z.string().min(1, "Date required"),
  time: z.string().min(1, "Time required"),
  mode: z.enum(["online", "physical"]),
  notes: z.string().optional(),
});
