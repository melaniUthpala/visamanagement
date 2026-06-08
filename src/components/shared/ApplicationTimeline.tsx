"use client";

import { ApplicationStatus } from "@/types";
import { APPLICATION_TIMELINE_STEPS, getTimelineStep } from "@/lib/utils";
import { Check } from "lucide-react";

interface Props {
  status: ApplicationStatus;
}

export function ApplicationTimeline({ status }: Props) {
  const currentStep = getTimelineStep(status);

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
        Application Progress
      </h3>
      <div className="relative">
        {APPLICATION_TIMELINE_STEPS.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum <= currentStep;
          const isCurrent = stepNum === currentStep + 1;

          return (
            <div key={step.key} className="flex items-start gap-3 mb-4 last:mb-0">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-all ${
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isCurrent
                      ? "border-primary text-primary bg-primary/10"
                      : "border-muted-foreground/30 text-muted-foreground/50"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                </div>
                {idx < APPLICATION_TIMELINE_STEPS.length - 1 && (
                  <div
                    className={`w-0.5 h-6 mt-1 ${
                      isCompleted ? "bg-primary" : "bg-muted-foreground/20"
                    }`}
                  />
                )}
              </div>
              <div className="pt-1">
                <p
                  className={`text-sm font-medium ${
                    isCompleted
                      ? "text-foreground"
                      : isCurrent
                      ? "text-primary"
                      : "text-muted-foreground/60"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
