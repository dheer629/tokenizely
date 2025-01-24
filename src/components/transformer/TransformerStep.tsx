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
      case 4:
        return {
          title: "Linear Layer Calculation",
          explanation: "Applying weights and bias to each embedding value",
          steps: values.map((val, idx) => ({
            input: `Embedding ${idx + 1}`,
            calculation: `${val.toFixed(4)} * weight[${idx}] + bias`,
            result: val.toFixed(4)
          }))
        };
      case 5:
        return {
          title: "Softmax Calculation",
          explanation: "Converting linear outputs to probabilities that sum to 1",
          steps: values.map((val, idx) => ({
            input: `Linear output ${idx + 1}`,
            calculation: `exp(${val.toFixed(4)}) / sum(exp(all_values))`,
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
      className={`bg-gradient-to-r from-[#F1F0FB] to-white p-6 rounded-lg border border-[#8E9196]/20 transition-all duration-300 ${
        currentStep >= step.order_number ? 'opacity-100' : 'opacity-50'
      }`}
    >
      <h3 className="text-xl font-semibold text-[#8E9196] flex items-center gap-2 mb-3">
        <ChevronRight className="h-5 w-5" />
        Step {step.order_number}: {step.step_name}
      </h3>
      <div className="space-y-4">
        <p className="text-[#8E9196]">{step.description}</p>
        
        <div className="bg-white p-4 rounded-lg border border-[#8E9196]/20">
          <p className="text-sm text-[#8E9196] mb-2">Mathematical Formula:</p>
          <code className="text-[#F97316] block bg-[#F1F0FB] p-3 rounded font-mono">
            {step.formula}
          </code>
        </div>

        {calculations && (
          <div className="bg-white p-4 rounded-lg border border-[#8E9196]/20">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="h-5 w-5 text-[#FEC6A1]" />
              <h4 className="font-semibold text-[#8E9196]">{calculations.title}</h4>
            </div>
            <p className="text-[#8E9196] mb-3 text-sm">{calculations.explanation}</p>
            
            <div className="space-y-3">
              {calculations.steps.map((step, idx) => (
                <div key={idx} className="bg-[#F1F0FB] p-3 rounded">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-[#8E9196]">Input:</span>
                      <span className="ml-2 font-mono text-[#F97316]">{step.input}</span>
                    </div>
                    <div>
                      <span className="text-[#8E9196]">Calculation:</span>
                      <span className="ml-2 font-mono text-[#F97316]">{step.calculation}</span>
                    </div>
                    <div>
                      <span className="text-[#8E9196]">Result:</span>
                      <span className="ml-2 font-mono text-[#F97316]">{step.result}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {vectorValues && (
          <div className="bg-white p-4 rounded-lg border border-[#8E9196]/20">
            <p className="text-sm text-[#8E9196] mb-2">Final Vector Values:</p>
            <p className="font-mono text-sm text-[#F97316] bg-[#F1F0FB] p-3 rounded">
              [{vectorValues.map(v => v.toFixed(4)).join(', ')}]
            </p>
          </div>
        )}
      </div>
    </div>
  );
};