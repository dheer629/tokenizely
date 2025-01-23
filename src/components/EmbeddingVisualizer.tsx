import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { InputSection } from "./transformer/InputSection";
import { TransformerStep } from "./transformer/TransformerStep";
import { PredictionDisplay } from "./transformer/PredictionDisplay";

interface TransformerStep {
  id: number;
  step_name: string;
  description: string;
  formula: string;
  image_url: string | null;
  order_number: number;
}

export const EmbeddingVisualizer = () => {
  const [inputText, setInputText] = useState("");
  const [steps, setSteps] = useState<TransformerStep[]>([]);
  const [vectorEmbedding, setVectorEmbedding] = useState<number[]>([]);
  const [positionalEmbedding, setPositionalEmbedding] = useState<number[]>([]);
  const [contextualEmbedding, setContextualEmbedding] = useState<number[]>([]);
  const [prediction, setPrediction] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    fetchTransformerSteps();
  }, []);

  const fetchTransformerSteps = async () => {
    const { data, error } = await supabase
      .from('transformer_steps')
      .select('*')
      .order('order_number');
    
    if (data) {
      setSteps(data);
    }
  };

  const calculateEmbeddings = () => {
    if (!inputText) return;

    // Vector embedding calculation
    const mockVectorEmbedding = inputText.split('').map((char) => 
      char.charCodeAt(0) / 255
    );
    setVectorEmbedding(mockVectorEmbedding.slice(0, 5));

    // Positional embedding calculation
    const mockPositionalEmbedding = inputText.split('').map((_, i) => 
      Math.sin(i / Math.pow(10000, 2 * (i % 2) / 64))
    );
    setPositionalEmbedding(mockPositionalEmbedding.slice(0, 5));

    // Contextual embedding calculation
    const mockContextualEmbedding = mockVectorEmbedding.map((vec, i) => 
      vec + mockPositionalEmbedding[i]
    );
    setContextualEmbedding(mockContextualEmbedding.slice(0, 5));

    // Generate prediction
    const avgEmbedding = mockContextualEmbedding.reduce((a, b) => a + b, 0) / mockContextualEmbedding.length;
    let predictedCategory;
    if (avgEmbedding < 0.3) {
      predictedCategory = "Technical content";
    } else if (avgEmbedding < 0.5) {
      predictedCategory = "General description";
    } else {
      predictedCategory = "Creative writing";
    }
    setPrediction(predictedCategory);
    setCurrentStep(1);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-orange-200 overflow-hidden">
        <CardHeader className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
          <CardTitle className="text-orange-600 flex items-center gap-2">
            <Brain className="h-6 w-6" />
            Transformer Architecture Explorer
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <InputSection 
            inputText={inputText}
            setInputText={setInputText}
            onCalculate={calculateEmbeddings}
          />

          {steps.map((step) => (
            <TransformerStep
              key={step.id}
              step={step}
              currentStep={currentStep}
              vectorValues={
                step.order_number === 1 ? vectorEmbedding :
                step.order_number === 2 ? positionalEmbedding :
                step.order_number === 3 ? contextualEmbedding :
                undefined
              }
            />
          ))}

          <PredictionDisplay prediction={prediction} />
        </CardContent>
      </Card>
    </div>
  );
};