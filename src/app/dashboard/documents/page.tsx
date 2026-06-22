"use client";

import { useAuth } from "@/features/auth/AuthContext";
import { useUserApplications } from "@/hooks/useApplications";
import { useState, useCallback, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/config";
import { addDoc, collection, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileCheck, AlertCircle } from "lucide-react";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { DocumentType } from "@/types";

const REQUIRED_DOCS: { type: DocumentType; label: string; desc: string }[] = [
  { type: "nic_front", label: "NIC Front", desc: "National Identity Card - Front side" },
  { type: "nic_back", label: "NIC Back", desc: "National Identity Card - Back side" },
  { type: "passport", label: "Passport Copy", desc: "Bio page of your passport" },
  { type: "photo", label: "Profile Photo", desc: "Recent passport-sized photograph" },
  { type: "cv", label: "CV / Resume", desc: "Your updated curriculum vitae" },
  { type: "certificate", label: "Certificates", desc: "Educational/professional certificates (optional)" },
];

export default function DocumentsPage() {
  const { appUser } = useAuth();
  const { applications, loading } = useUserApplications();
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({});
  const [checkingDocs, setCheckingDocs] = useState(true);

  // Fetch existing documents on load
  useEffect(() => {
    const fetchExisting = async () => {
      if (!applications[0]) {
        setCheckingDocs(false);
        return;
      }
      try {
        const q = query(
          collection(db, COLLECTIONS.DOCUMENTS),
          where("applicationId", "==", applications[0].id)
        );
        const snap = await getDocs(q);
        const existing: Record<string, boolean> = {};
        snap.docs.forEach((d) => {
          const data = d.data();
          existing[data.type] = true;
        });
        setUploaded(existing);
      } catch (err) {
        console.error("Failed to fetch existing documents:", err);
      } finally {
        setCheckingDocs(false);
      }
    };

    if (!loading) fetchExisting();
  }, [applications, loading]);

  const handleUpload = useCallback(async (type: DocumentType, file: File) => {
    if (!appUser || !applications[0]) return;
    const applicationId = applications[0].id;
    const path = `documents/${appUser.uid}/${applicationId}/${type}_${Date.now()}_${file.name}`;
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);

    task.on("state_changed",
      (snap) => {
        const pct = (snap.bytesTransferred / snap.totalBytes) * 100;
        setUploadProgress((p) => ({ ...p, [type]: pct }));
      },
      (err) => console.error(err),
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        await addDoc(collection(db, COLLECTIONS.DOCUMENTS), {
          applicationId,
          userId: appUser.uid,
          type,
          fileName: file.name,
          fileUrl: url,
          fileSize: file.size,
          uploadedAt: serverTimestamp(),
        });
        setUploaded((u) => ({ ...u, [type]: true }));
        setUploadProgress((p) => ({ ...p, [type]: 100 }));
      }
    );
  }, [appUser, applications]);

  if (loading || checkingDocs) return <LoadingSpinner />;

  if (!applications[0]) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <AlertCircle className="h-10 w-10 text-amber-500 mb-3" />
            <h3 className="font-semibold">No Application Found</h3>
            <p className="text-muted-foreground text-sm">Please submit a visa application first.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Document Upload</h1>
        <p className="text-muted-foreground">Upload all required documents for your application.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {REQUIRED_DOCS.map((doc) => (
          <Card key={doc.type} className={uploaded[doc.type] ? "border-green-200 bg-green-50/30" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center justify-between">
                {doc.label}
                {uploaded[doc.type] && <FileCheck className="h-4 w-4 text-green-600" />}
              </CardTitle>
              <CardDescription className="text-xs">{doc.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              {uploadProgress[doc.type] !== undefined && uploadProgress[doc.type] < 100 && (
                <Progress value={uploadProgress[doc.type]} className="mb-2 h-1.5" />
              )}
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(doc.type, file);
                  }}
                />
                <Button variant="outline" size="sm" asChild>
                  <span><Upload className="h-3 w-3 mr-1.5" />{uploaded[doc.type] ? "Re-upload" : "Upload"}</span>
                </Button>
              </label>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}