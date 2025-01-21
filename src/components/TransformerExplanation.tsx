import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Sigma } from "lucide-react";

export const TransformerExplanation = () => {
  return (
    <Card className="bg-slate-800 border-slate-700 mt-6">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-yellow-400" />
          Understanding Transformers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <section className="bg-slate-900 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-400 flex items-center gap-2 mb-3">
              <Sigma className="h-5 w-5" />
              Key Mathematical Concepts
            </h3>
            
            <div className="space-y-4 text-slate-300">
              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">1. Attention Mechanism</h4>
                <p className="text-sm">
                  Attention score = (Query · Key) / √d
                  <br />
                  Where:
                  <br />
                  - Query (Q): What we're looking for
                  <br />
                  - Key (K): What we compare against
                  <br />
                  - d: dimension of the key vectors
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">2. Self-Attention</h4>
                <p className="text-sm">
                  For each word, we calculate attention scores with every other word:
                  <br />
                  1. Calculate similarity scores
                  <br />
                  2. Apply softmax to get probabilities
                  <br />
                  3. Multiply by values (V) to get weighted sum
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-yellow-400 mb-2">3. Feed-Forward Network</h4>
                <p className="text-sm">
                  After attention, each position goes through a simple neural network:
                  <br />
                  Output = max(0, input · W₁ + b₁) · W₂ + b₂
                  <br />
                  Where W₁, W₂ are weight matrices and b₁, b₂ are bias vectors
                </p>
              </div>
            </div>
          </section>

          <section className="bg-slate-900 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">Real-World Example</h3>
            <p className="text-sm text-slate-300">
              Think of attention like studying with friends:
              <br />
              - You (Query) want to understand a topic
              <br />
              - Your friends (Keys) have different knowledge
              <br />
              - You pay more attention to friends who know more about the specific topic
              <br />
              - The final understanding (Output) combines information from everyone, weighted by how relevant their knowledge was
            </p>
          </section>
        </div>
      </CardContent>
    </Card>
  );
};