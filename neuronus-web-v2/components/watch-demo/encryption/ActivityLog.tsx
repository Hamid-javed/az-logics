"use client";

import { StepState } from "../../../context/CryptoContext";

interface ActivityLogProps {
  steps: StepState[];
  title: string;
}

const statusColors = {
  completed: {
    card: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-800",
    dot: "bg-green-500 text-white",
  },
  active: {
    card: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-800",
    dot: "bg-blue-500 text-white",
  },
  error: {
    card: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-800",
    dot: "bg-red-500 text-white",
  },
  pending: {
    card: "bg-gray-50 border-gray-200",
    badge: "bg-gray-100 text-gray-600",
    dot: "bg-gray-300 text-gray-600",
  },
};

const ActivityLog = ({ steps, title }: ActivityLogProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          Activity Log
        </h4>
      </div>

      <div className="px-3 py-3 space-y-4 overflow-y-auto flex-1">
        {steps.map((step, index) => {
          const colors = statusColors[step.status];
          return (
            <div
              key={step.id}
              className={`p-4 rounded-lg border-2 ${colors.card} transition-all duration-300`}
            >
              {/* Step header */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${colors.dot}`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-800 text-sm">
                    {step.title}
                  </h5>
                  <p className="text-xs text-gray-600">{step.description}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${colors.badge}`}
                >
                  {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                </span>
              </div>

              {/* Substeps */}
              <div className="ml-11 space-y-2">
                {step.substeps.map((substep, subIdx) => {
                  const isActive =
                    step.status === "active" || step.status === "completed";

                  return (
                    <div
                      key={subIdx}
                      className="flex items-center gap-2 text-sm"
                    >
                      {isActive ? (
                        substep.completed ? (
                          // Completed tick
                          <div className="relative w-5 h-5 flex-shrink-0">
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                              <span className="text-white text-[10px] font-bold">
                                ✓
                              </span>
                            </div>
                          </div>
                        ) : (
                          // Spinning loader
                          <div className="w-5 h-5 flex-shrink-0 border-[3px] border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                        )
                      ) : (
                        // Pending empty dot
                        <div className="w-5 h-5 flex-shrink-0 rounded-full bg-gray-200" />
                      )}
                      <span
                        className={`text-xs ${
                          substep.completed ? "text-green-700" : "text-gray-500"
                        }`}
                      >
                        {substep.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityLog;
