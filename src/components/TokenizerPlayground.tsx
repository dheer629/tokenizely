import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight } from "lucide-react";
import { pipeline } from "@huggingface/transformers";
import { toast } from "sonner";

export const TokenizerPlayground = () => {
  const [inputText, setInputText] = useState("");
  const [tokens, setTokens] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTokenize = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to tokenize");
      return;
    }

    setIsProcessing(true);
    try {
      // Initialize tokenizer with a small, efficient model
      const extractor = await pipeline(
        "feature-extraction",
        "mixedbread-ai/mxbai-embed-xsmall-v1"
      );
      
      // Simple tokenization for display
      const words = inputText.split(/\s+/).filter(word => word.length > 0);
      setTokens(words);

      // Generate embeddings
      const embeddings = await extractor(words, { 
        pooling: "mean",
        normalize: true 
      });
      
      console.log("Generated embeddings:", embeddings.tolist());
      toast.success("Text tokenized successfully!");
      
    } catch (error) {
      console.error("Error in tokenization:", error);
      toast.error("Failed to process text. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="bg-white border-[#8E9196]/20">
      <CardHeader>
        <CardTitle className="text-[#222222] flex items-center gap-2">
          <Brain className="h-6 w-6 text-[#8E9196]" />
          Tokenizer Playground
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Enter text to tokenize..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="border-[#8E9196]/20 text-[#222222] focus:border-[#FEC6A1]"
          />
          <Button
            onClick={handleTokenize}
            className="bg-[#FEC6A1] hover:bg-[#F97316] text-white w-full"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Tokenize Text"}
          </Button>
        </div>

        {tokens.length > 0 && (
          <div className="bg-[#F1F0FB] p-4 rounded-lg">
            <h3 className="text-sm font-medium text-[#8E9196] mb-2">
              Tokenization Steps:
            </h3>
            <ol className="space-y-4">
              <li className="text-[#222222]">
                <span className="font-semibold text-[#8E9196]">Step 1: Text Splitting</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tokens.map((token, index) => (
                    <div key={index} className="flex items-center">
                      <span className="px-2 py-1 bg-white rounded text-[#222222] font-mono text-sm border border-[#8E9196]/20">
                        {token}
                      </span>
                      {index < tokens.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-[#8E9196] mx-1" />
                      )}
                    </div>
                  ))}
                </div>
              </li>
              <li className="text-[#222222]">
                <span className="font-semibold text-[#8E9196]">Step 2: Embedding Generation</span>
                <p className="mt-1 text-sm">
                  Each token is converted into a numerical vector using the transformer model.
                  These vectors capture the meaning and context of each word.
                </p>
              </li>
              <li className="text-[#222222]">
                <span className="font-semibold text-[#8E9196]">Step 3: Mathematical Process</span>
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