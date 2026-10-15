import { CheckCircle, Loader2, Circle } from "lucide-react";

interface AgentStepsProps {
  steps: string[];
  currentStep: number;
  isComplete: boolean;
}

export default function AgentSteps({ steps, currentStep, isComplete }: AgentStepsProps) {
  return (
    <div className="flex flex-col items-start mb-4">
      <div className="bg-[#12121a] border border-[#1e1e2e] rounded-2xl px-4 py-3 max-w-[80%] w-full">
        <div className="flex flex-col gap-2">
          {steps.map((step, i) => {
            const isDone = isComplete || i < currentStep;
            const isActive = !isComplete && i === currentStep;

            return (
              <div key={i} className="flex items-center gap-2">
                {isDone ? (
                  <CheckCircle size={16} className="text-[#10b981] shrink-0" />
                ) : isActive ? (
                  <Loader2 size={16} className="text-[#6c5ce7] animate-spin shrink-0" />
                ) : (
                  <Circle size={16} className="text-[#8b8b9e] shrink-0" />
                )}
                <span
                  className={`text-sm ${
                    isDone
                      ? "text-[#8b8b9e] line-through"
                      : isActive
                      ? "text-[#f0f0f5]"
                      : "text-[#8b8b9e]"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
