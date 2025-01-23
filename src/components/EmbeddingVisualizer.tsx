import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Calculator, Hash, Layers, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const EmbeddingVisualizer = () => {
  const [inputText, setInputText] = useState("");
  const [vectorEmbedding, setVectorEmbedding] = useState<number[]>([]);
  const [positionalEmbedding, setPositionalEmbedding] = useState<number[]>([]);
  const [contextualEmbedding, setContextualEmbedding] = useState<number[]>([]);
  const [prediction, setPrediction] = useState<string>("");

  // Simple mock embedding calculation for educational purposes
  const calculateEmbeddings = () => {
    if (!inputText) return;

    // Vector embedding (mock calculation - in reality would use a proper model)
    const mockVectorEmbedding = inputText.split('').map((char) => 
      char.charCodeAt(0) / 255
    );
    setVectorEmbedding(mockVectorEmbedding.slice(0, 5));

    // Positional embedding (using simple sine function)
    const mockPositionalEmbedding = inputText.split('').map((_, i) => 
      Math.sin(i / Math.pow(10000, 2 * (i % 2) / 64))
    );
    setPositionalEmbedding(mockPositionalEmbedding.slice(0, 5));

    // Contextual embedding (combining vector and positional)
    const mockContextualEmbedding = mockVectorEmbedding.map((vec, i) => 
      vec + mockPositionalEmbedding[i]
    );
    setContextualEmbedding(mockContextualEmbedding.slice(0, 5));

    // Generate a simple prediction based on the contextual embedding
    const avgEmbedding = mockContextualEmbedding.reduce((a, b) => a + b, 0) / mockContextualEmbedding.length;
    
    // Simple classification based on average embedding value
    let predictedCategory;
    if (avgEmbedding < 0.3) {
      predictedCategory = "Technical content";
    } else if (avgEmbedding < 0.5) {
      predictedCategory = "General description";
    } else {
      predictedCategory = "Creative writing";
    }
    
    setPrediction(predictedCategory);
  };

  return (
    <Card className="bg-slate-800 border-slate-700 mt-4">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="h-6 w-6 text-orange-400" />
          Understanding Embeddings & Transformer Architecture
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="bg-slate-900 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-orange-400 mb-3">
            Input Text
          </h3>
          <div className="space-y-4">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to see embeddings..."
              className="bg-slate-800 text-white border-slate-700"
            />
            <Button 
              onClick={calculateEmbeddings}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Calculate Embeddings
            </Button>
          </div>
        </div>

        {/* Vector Embedding Section */}
        <section className="bg-slate-900 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-orange-400 flex items-center gap-2 mb-3">
            <Hash className="h-5 w-5" />
            Vector Embedding
          </h3>
          <div className="text-white space-y-2">
            <p className="text-sm">
              Words → Numbers: Each word becomes a list of numbers (vector)
            </p>
            <div className="bg-slate-800 p-3 rounded font-mono text-sm">
              {vectorEmbedding.length > 0 ? (
                `[${vectorEmbedding.map(v => v.toFixed(4)).join(', ')}]`
              ) : (
                '"cat" → [0.2, -0.5, 0.8, ...]'
              )}
            </div>
            <p className="text-sm text-slate-300">
              Formula: E(word) = [e₁, e₂, e₃, ..., eₙ]
            </p>
          </div>
        </section>

        {/* Positional Embedding Section */}
        <section className="bg-slate-900 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-orange-400 flex items-center gap-2 mb-3">
            <Calculator className="h-5 w-5" />
            Positional Embedding
          </h3>
          <div className="text-white space-y-2">
            <p className="text-sm">
              Adding position information to each word
            </p>
            <div className="bg-slate-800 p-3 rounded font-mono text-sm">
              {positionalEmbedding.length > 0 ? (
                `[${positionalEmbedding.map(v => v.toFixed(4)).join(', ')}]`
              ) : (
                'Position(i) = sin(i/10000²ᵈ/ᵈᵐᵒᵈᵉˡ)'
              )}
            </div>
            <p className="text-sm text-slate-300">
              Where: i = position, d = dimension
            </p>
          </div>
        </section>

        {/* Contextual Embedding Section */}
        <section className="bg-slate-900 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-orange-400 flex items-center gap-2 mb-3">
            <Layers className="h-5 w-5" />
            Contextual Understanding
          </h3>
          <div className="text-white space-y-2">
            <p className="text-sm">
              Final embedding = Word Vector + Position Vector
            </p>
            <div className="bg-slate-800 p-3 rounded font-mono text-sm">
              {contextualEmbedding.length > 0 ? (
                `[${contextualEmbedding.map(v => v.toFixed(4)).join(', ')}]`
              ) : (
                'E_final = E_word + E_position'
              )}
            </div>
          </div>
        </section>

        {/* Final Prediction Section */}
        <section className="bg-slate-900 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-orange-400 flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5" />
            Final Prediction
          </h3>
          <div className="text-white space-y-2">
            <p className="text-sm">
              Using embeddings to classify the text
            </p>
            <div className="bg-slate-800 p-3 rounded font-mono text-sm">
              {prediction ? (
                `Predicted Category: ${prediction}`
              ) : (
                'Enter text and calculate embeddings to see prediction'
              )}
            </div>
            <p className="text-sm text-slate-300">
              Based on average embedding values and pattern recognition
            </p>
          </div>
        </section>

        <section className="bg-slate-900 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-orange-400 mb-3">
            Transformer Architecture
          </h3>
          <div className="space-y-4">
            {/* Encoder Section */}
            <div className="bg-slate-800 p-3 rounded">
              <h4 className="text-orange-300 font-semibold mb-2">6 Encoders</h4>
              <p className="text-sm text-white">
                Each encoder has:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-300 ml-2">
                <li>Self-Attention: Focus on important words</li>
                <li>Feed-Forward: Process information</li>
              </ul>
            </div>

            {/* Decoder Section */}
            <div className="bg-slate-800 p-3 rounded">
              <h4 className="text-orange-300 font-semibold mb-2">6 Decoders</h4>
              <p className="text-sm text-white">
                Each decoder looks at:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-300 ml-2">
                <li>Encoder output</li>
                <li>Previous predictions</li>
              </ul>
            </div>

            {/* FFN Section */}
            <div className="bg-slate-800 p-3 rounded">
              <h4 className="text-orange-300 font-semibold mb-2">Feed-Forward Network (FFN)</h4>
              <p className="text-sm text-white">
                Formula: FFN(x) = max(0, xW₁ + b₁)W₂ + b₂
              </p>
            </div>

            {/* Softmax Section */}
            <div className="bg-slate-800 p-3 rounded">
              <h4 className="text-orange-300 font-semibold mb-2">Softmax</h4>
              <p className="text-sm text-white">
                Converts scores to probabilities:
              </p>
              <div className="font-mono text-sm text-slate-300 mt-1">
                softmax(x_i) = exp(x_i) / Σ exp(x_j)
              </div>
            </div>

            {/* Final Prediction */}
            <div className="bg-slate-800 p-3 rounded">
              <h4 className="text-orange-300 font-semibold mb-2">Next Word Prediction</h4>
              <p className="text-sm text-white">
                Chooses the word with highest probability
              </p>
              <div className="mt-2 text-sm text-slate-300">
                Example: "The cat sits on the" → ["mat": 0.8, "chair": 0.15, "floor": 0.05]
              </div>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};
