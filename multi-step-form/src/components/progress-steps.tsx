/* This code snippet is a React component called `ProgressSteps` that renders a progress bar with
steps. Here's a breakdown of what the code is doing: */
import type { Step } from "@/types";
import { Check } from "lucide-react";

const ProgressSteps = ({
  currentSteps,
  step,
}: {
  currentSteps: number;
  step: Step[];
}) => {
  /* This part of the code is a JSX expression that is rendering a list of progress steps based on the
  `step` array provided as a prop to the `ProgressSteps` component. Here's a breakdown of what it's
  doing: */
  return (
    <div className="flex justify-between pt-4">
      {step.map((s, index) => {
        const Icon = s.icon;
        const isCompleted = index < currentSteps;
        const isCurrent = index === currentSteps;

        /* This part of the code snippet is responsible for rendering each individual step in the
        progress bar. Let's break it down: */
        return (
          <div key={s.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              <span className="text-xs mt-2 font-medium">{s.name}</span>
            </div>

            {/* This part of the code is conditionally rendering a `<div>` element that represents a
            line connecting the progress steps. */}
            {index < step.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 transition-colors ${
                  isCompleted ? "bg-primary" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressSteps;
