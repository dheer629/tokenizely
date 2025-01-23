import React from "react";
import { Sparkles } from "lucide-react";

interface PredictionDisplayProps {
  prediction: string;
}

export const PredictionDisplay = ({ prediction }: PredictionDisplayProps) => {
  if (!prediction) return null;

  return (
    <div className="bg-gradient-to-r from-orange-100/50 to-white p-6 rounded-lg border border-orange-200">
      <h3 className="text-xl font-semibold text-orange-600 flex items-center gap-2 mb-3">
        <Sparkles className="h-5 w-5" />
        Final Prediction
      </h3>
      <div className="bg-white p-4 rounded-lg border border-orange-200">
        <p className="text-sm text-gray-500 mb-2">The transformer thinks your text is:</p>
        <p className="font-semibold text-lg text-orange-600">
          {prediction}
        </p>
      </div>
    </div>
  );
};