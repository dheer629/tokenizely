import React from "react";
import { ChevronRight, Calculator } from "lucide-react";

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
  const getCalculationExplanation = (stepNumber: number, values?: number[]) => {
    if (!values) return null;

    switch (stepNumber) {
      case 1:
        return {
          title: "Vector Embedding Calculation",
          explanation: "Converting each character to its ASCII value and normalizing between 0 and 1",
          steps: values.map((val, idx) => ({
            input: `Character ${idx + 1}`,
            calculation: `ASCII value / 255 = ${(val * 255).toFixed(0)} / 255`,
            result: val.toFixed(4)
          }))
        };
      case 2:
        return {
          title: "Positional Encoding",
          explanation: "Using sine waves to encode position information: sin(pos / 10000^(2i/d_model))",
          steps: values.map((val, idx) => ({
            input: `Position ${idx + 1}`,
            calculation: `sin(${idx} / 10000^(2 * ${idx % 2} / 64))`,
            result: val.toFixed(4)
          }))
        };
      case 3:
        return {
          title: "Contextual Embedding",
          explanation: "Adding vector embeddings with positional encodings",
          steps: values.map((val, idx) => ({
            input: `Position ${idx + 1}`,
            calculation: `Vector[${idx}] + Position[${idx}]`,
            result: val.toFixed(4)
          }))
        };
      default:
        return null;
    }
  };

  const calculations = getCalculationExplanation(step.order_number, vectorValues);

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
          <code className="text-orange-800 block bg-orange-50/50 p-3 rounded font-mono">
            {step.formula}
          </code>
        </div>

        {calculations && (
          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="h-5 w-5 text-orange-500" />
              <h4 className="font-semibold text-orange-600">{calculations.title}</h4>
            </div>
            <p className="text-gray-600 mb-3 text-sm">{calculations.explanation}</p>
            
            <div className="space-y-3">
              {calculations.steps.map((step, idx) => (
                <div key={idx} className="bg-orange-50/50 p-3 rounded">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Input:</span>
                      <span className="ml-2 font-mono text-orange-700">{step.input}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Calculation:</span>
                      <span className="ml-2 font-mono text-orange-700">{step.calculation}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Result:</span>
                      <span className="ml-2 font-mono text-orange-700">{step.result}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {vectorValues && (
          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <p className="text-sm text-gray-500 mb-2">Final Vector Values:</p>
            <p className="font-mono text-sm text-orange-800 bg-orange-50/50 p-3 rounded">
              [{vectorValues.map(v => v.toFixed(4)).join(', ')}]
            </p>
          </div>
        )}
      </div>
    </div>
  );
};