import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight } from "lucide-react";
import { pipeline } from "@huggingface/transformers";

export const TokenizerPlayground = () => {
  const [inputText, setInputText] = useState("");
  const [tokens, setTokens] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTokenize = async () => {
    setIsProcessing(true);
    try {
      // Initialize tokenizer
      const extractor = await pipeline(
        "feature-extraction",
        "mixedbread-ai/mxbai-embed-xsmall-v1"
      );
      
      // Simple tokenization
      const words = inputText.split(" ").filter(word => word.length > 0);
      setTokens(words);

      console.log("Embeddings processing...");
      const embeddings = await extractor(words, { 
        pooling: "mean",
        normalize: true 
      });
      console.log("Embeddings:", embeddings.tolist());
      
    } catch (error) {
      console.error("Error in tokenization:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="h-6 w-6 text-blue-400" />
          Tokenizer Playground
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Enter text to tokenize..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="bg-slate-900 border-slate-700 text-white"
          />
          <Button
            onClick={handleTokenize}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Tokenize Text"}
          </Button>
        </div>

        {tokens.length > 0 && (
          <div className="bg-slate-900 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-slate-400 mb-2">
              Tokenization Steps:
            </h3>
            <ol className="space-y-4">
              <li className="text-slate-300">
                <span className="font-semibold text-blue-400">Step 1: Text Splitting</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tokens.map((token, index) => (
                    <div key={index} className="flex items-center">
                      <span className="px-2 py-1 bg-slate-800 rounded text-blue-400 font-mono text-sm">
                        {token}
                      </span>
                      {index < tokens.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-slate-600 mx-1" />
                      )}
                    </div>
                  ))}
                </div>
              </li>
              <li className="text-slate-300">
                <span className="font-semibold text-blue-400">Step 2: Embedding Generation</span>
                <p className="mt-1 text-sm">
                  Each token is converted into a numerical vector using the transformer model.
                  These vectors capture the meaning and context of each word.
                </p>
              </li>
              <li className="text-slate-300">
                <span className="font-semibold text-blue-400">Step 3: Mathematical Process</span>
                <div className="mt-2 text-sm space-y-2">
                  <p>1. Word → Token conversion</p>
                  <p>2. Token → Vector mapping (768-dimensional space)</p>
                  <p>3. Normalization: vectors are scaled to have length 1</p>
                </div>
              </li>
            </ol>
          </div>
        )}
      </CardContent>
    </Card>
  );
};