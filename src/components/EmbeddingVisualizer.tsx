import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Calculator, Hash, Layers, Sparkles, BookOpen, ChevronRight, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

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
          {/* Input Section */}
          <div className="bg-orange-50/50 p-6 rounded-lg border border-orange-100">
            <h3 className="text-xl font-semibold text-orange-600 mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Try It Yourself!
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-orange-100">
                <p className="text-gray-600 mb-3">
                  Enter any text below to see how a transformer processes it step by step!
                </p>
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Example: The cat sat on the mat..."
                  className="border-orange-200 focus:border-orange-400"
                />
              </div>
              <Button 
                onClick={calculateEmbeddings}
                className="bg-orange-500 hover:bg-orange-600 text-white w-full"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                See the Magic Happen!
              </Button>
            </div>
          </div>

          {/* Step by Step Visualization */}
          {steps.map((step) => (
            <div 
              key={step.id}
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
                {step.order_number === 1 && vectorEmbedding.length > 0 && (
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <p className="text-sm text-gray-500 mb-2">Vector Values:</p>
                    <p className="font-mono text-sm text-orange-800 bg-orange-50/50 p-3 rounded">
                      [{vectorEmbedding.map(v => v.toFixed(4)).join(', ')}]
                    </p>
                  </div>
                )}
                {step.order_number === 2 && positionalEmbedding.length > 0 && (
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <p className="text-sm text-gray-500 mb-2">Position Values:</p>
                    <p className="font-mono text-sm text-orange-800 bg-orange-50/50 p-3 rounded">
                      [{positionalEmbedding.map(v => v.toFixed(4)).join(', ')}]
                    </p>
                  </div>
                )}
                {step.order_number === 3 && contextualEmbedding.length > 0 && (
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <p className="text-sm text-gray-500 mb-2">Context Values:</p>
                    <p className="font-mono text-sm text-orange-800 bg-orange-50/50 p-3 rounded">
                      [{contextualEmbedding.map(v => v.toFixed(4)).join(', ')}]
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Final Prediction */}
          {prediction && (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};