"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { applicationSchema } from "@/features/auth/validation";
import { createApplication } from "@/services/applications.service";
import { useAuth } from "@/features/auth/AuthContext";
import { ApplicationFormData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const COUNTRIES = ["Qatar", "Saudi Arabia", "UAE", "Kuwait", "Bahrain", "Oman", "Malaysia", "South Korea", "Japan"];
const JOB_CATEGORIES = ["Construction", "Manufacturing", "Healthcare", "IT", "Hospitality", "Retail", "Transport", "Domestic Work", "Other"];

export function ApplicationForm() {
  const router = useRouter();
  const { appUser } = useAuth();
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationFormData) => {
    if (!appUser) return;
    try {
      setServerError("");
      await createApplication(appUser.uid, appUser.name, appUser.email, data);
      router.push("/dashboard");
    } catch (e: any) {
      setServerError(e.message || "Submission failed. Please try again.");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Visa Application Form</CardTitle>
        <CardDescription>Fill in all required details accurately. All fields are mandatory unless marked optional.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="fullName">Full Name (as in passport)</Label>
                <Input id="fullName" {...register("fullName")} placeholder="John Bandara Silva" />
                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
                {errors.dateOfBirth && <p className="text-xs text-red-500 mt-1">{errors.dateOfBirth.message}</p>}
              </div>
              <div>
                <Label>Gender</Label>
                <Select onValueChange={(v) => setValue("gender", v as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>}
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Permanent Address</Label>
                <Textarea id="address" {...register("address")} placeholder="No. 123, Main Street, Colombo 01" rows={2} />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Travel & Job Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Destination Country</Label>
                <Select onValueChange={(v) => setValue("country", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>}
              </div>
              <div>
                <Label>Job Category</Label>
                <Select onValueChange={(v) => setValue("jobCategory", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_CATEGORIES.map((j) => <SelectItem key={j} value={j}>{j}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.jobCategory && <p className="text-xs text-red-500 mt-1">{errors.jobCategory.message}</p>}
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="passportNumber">Passport Number</Label>
                <Input id="passportNumber" {...register("passportNumber")} placeholder="N1234567" className="font-mono" />
                {errors.passportNumber && <p className="text-xs text-red-500 mt-1">{errors.passportNumber.message}</p>}
              </div>
            </div>
          </div>

          {serverError && (
            <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-600">{serverError}</div>
          )}
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Submitting Application..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
