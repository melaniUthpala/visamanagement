"use client";

import { useState, useEffect } from "react";
import { Interview } from "@/types";
import { getAllInterviews, getUserInterviews } from "@/services/interviews.service";
import { useAuth } from "@/features/auth/AuthContext";

export function useUserInterviews() {
  const { appUser } = useAuth();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!appUser) return;
    getUserInterviews(appUser.uid)
      .then(setInterviews)
      .finally(() => setLoading(false));
  }, [appUser]);

  return { interviews, loading };
}

export function useAllInterviews() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllInterviews()
      .then(setInterviews)
      .finally(() => setLoading(false));
  }, []);

  return { interviews, loading };
}
