import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Calculator } from "lucide-react";
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
  const [linearOutput, setLinearOutput] = useState<number[]>([]);
  const [softmaxOutput, setSoftmaxOutput] = useState<number[]>([]);
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

  const softmax = (arr: number[]): number[] => {
    const expValues = arr.map(val => Math.exp(val));
    const sumExp = expValues.reduce((a, b) => a + b, 0);
    return expValues.map(exp => exp / sumExp);
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

    // Linear layer calculation (mock weights)
    const weights = [0.5, 0.3, 0.2, 0.4, 0.6];
    const bias = 0.1;
    const linearResult = mockContextualEmbedding.map((val, idx) => 
      val * weights[idx] + bias
    );
    setLinearOutput(linearResult);

    // Softmax calculation
    const softmaxResult = softmax(linearResult);
    setSoftmaxOutput(softmaxResult);

    // Generate prediction based on softmax output
    const maxProbability = Math.max(...softmaxResult);
    const maxIndex = softmaxResult.indexOf(maxProbability);
    
    const categories = [
      "Technical content",
      "Creative writing",
      "General description",
      "Scientific text",
      "Conversational text"
    ];
    
    setPrediction(categories[maxIndex]);
    setCurrentStep(1);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="bg-gradient-to-r from-[#F1F0FB] to-white border-[#8E9196]/20 shadow-lg">
        <CardHeader className="border-b border-[#8E9196]/10 bg-gradient-to-r from-[#F1F0FB] to-white">
          <CardTitle className="text-[#8E9196] flex items-center gap-2">
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
                step.order_number === 4 ? linearOutput :
                step.order_number === 5 ? softmaxOutput :
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