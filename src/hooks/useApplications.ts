"use client";

import { useState, useEffect } from "react";
import { VisaApplication } from "@/types";
import { getUserApplications, getAllApplications } from "@/services/applications.service";
import { useAuth } from "@/features/auth/AuthContext";

export function useUserApplications() {
  const { appUser } = useAuth();
  const [applications, setApplications] = useState<VisaApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!appUser) return;
  
  const timeout = setTimeout(() => setLoading(false), 8000);
  
  getUserApplications(appUser.uid)
    .then(setApplications)
    .catch(console.error)
    .finally(() => {
      clearTimeout(timeout);
      setLoading(false);
    });
    
  return () => clearTimeout(timeout);
}, [appUser]);

  return { applications, loading, refetch: () => getUserApplications(appUser!.uid).then(setApplications) };
}

export function useAllApplications() {
  const [applications, setApplications] = useState<VisaApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = () =>
    getAllApplications()
      .then(setApplications)
      .finally(() => setLoading(false));

  useEffect(() => { fetch(); }, []);
  return { applications, loading, refetch: fetch };
}
