import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Calculator, Hash, Layers } from "lucide-react";

export const EmbeddingVisualizer = () => {
  return (
    <Card className="bg-slate-800 border-slate-700 mt-4">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="h-6 w-6 text-orange-400" />
          Understanding Embeddings & Transformer Architecture
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
              "cat" → [0.2, -0.5, 0.8, ...]
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
              Position(i) = sin(i/10000²ᵈ/ᵈᵐᵒᵈᵉˡ)
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
              E_final = E_word + E_position
            </div>
          </div>
        </section>

        {/* Transformer Architecture */}
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