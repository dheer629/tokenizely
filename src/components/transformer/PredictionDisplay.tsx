import React from "react";
import { Brain } from "lucide-react";

interface PredictionDisplayProps {
  prediction: string;
}

export const PredictionDisplay = ({ prediction }: PredictionDisplayProps) => {
  if (!prediction) return null;

  return (
    <div className="bg-gradient-to-r from-[#F1F0FB] to-white p-6 rounded-lg border border-[#8E9196]/20">
      <h3 className="text-xl font-semibold text-[#8E9196] flex items-center gap-2 mb-3">
        <Brain className="h-5 w-5" />
        Final Prediction
      </h3>
      <div className="bg-white p-4 rounded-lg border border-[#8E9196]/20">
        <p className="text-sm text-[#8E9196] mb-2">The transformer predicts your text is:</p>
        <p className="font-semibold text-lg text-[#FEC6A1]">
          {prediction}
        </p>
      </div>
    </div>
  );
};