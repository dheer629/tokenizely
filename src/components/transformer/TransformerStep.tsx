import React from "react";
import { ChevronRight } from "lucide-react";

interface TransformerStepProps {
  step: {
    id: number;
    step_name: string;
    description: string;
    formula: string;
    image_url: string | null;
    order_number: number;
  };
  currentStep: number;
  vectorValues?: number[];
}

export const TransformerStep = ({ step, currentStep, vectorValues }: TransformerStepProps) => {
  return (
    <div 
      className={`bg-gradient-to-r from-orange-50/30 to-white p-6 rounded-lg border border-orange-100 transition-all duration-300 ${
        currentStep >= step.order_number ? 'opacity-100' : 'opacity-50'
      }`}
    >
      <h3 className="text-xl font-semibold text-orange-600 flex items-center gap-2 mb-3">
        <ChevronRight className="h-5 w-5" />
        Step {step.order_number}: {step.step_name}
      </h3>
      <div className="space-y-4">
        <p className="text-gray-700">{step.description}</p>
        <div className="bg-white p-4 rounded-lg border border-orange-200">
          <p className="text-sm text-gray-500 mb-2">Mathematical Formula:</p>
          <code className="text-orange-800 block bg-orange-50/50 p-3 rounded">
            {step.formula}
          </code>
        </div>
        {vectorValues && (
          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <p className="text-sm text-gray-500 mb-2">Vector Values:</p>
            <p className="font-mono text-sm text-orange-800 bg-orange-50/50 p-3 rounded">
              [{vectorValues.map(v => v.toFixed(4)).join(', ')}]
            </p>
          </div>
        )}
      </div>
    </div>
  );
};