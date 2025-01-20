import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, BookOpen, Network, Layers } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pipeline } from "@huggingface/transformers";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [tokens, setTokens] = useState<string[]>([]);
  const [tokenCount, setTokenCount] = useState(0);
  const [embeddings, setEmbeddings] = useState<number[][]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTokenize = async () => {
    setIsProcessing(true);
    try {
      // Simple tokenization for now
      const simpleTokens = inputText.split(" ").filter(token => token.length > 0);
      setTokens(simpleTokens);
      setTokenCount(simpleTokens.length);

      // Initialize the feature extraction pipeline
      const extractor = await pipeline(
        "feature-extraction",
        "mixedbread-ai/mxbai-embed-xsmall-v1",
        { device: "cpu" }
      );

      // Get embeddings
      const embeddingResults = await extractor(simpleTokens, { 
        pooling: "mean", 
        normalize: true 
      });
      
      setEmbeddings(embeddingResults.tolist());
    } catch (error) {
      console.error("Error processing text:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E293B] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-white mb-8 flex items-center gap-2">
          <Brain className="h-8 w-8" />
          Learn About Transformers
        </h1>

        <Tabs defaultValue="playground" className="space-y-4">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="playground" className="text-white">
              Playground
            </TabsTrigger>
            <TabsTrigger value="learn" className="text-white">
              Learn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="playground">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  Tokenizer & Embedding Playground
                  <Tooltip>
                    <TooltipTrigger>
                      <Network className="h-4 w-4 text-blue-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Enter text to see how it's broken down into tokens and converted to embeddings
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Enter text to analyze..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                  <div className="flex justify-between items-center">
                    <Button
                      onClick={handleTokenize}
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Analyze Text"}
                    </Button>
                    <span className="text-sm text-slate-400">
                      Token count: {tokenCount}
                    </span>
                  </div>
                </div>

                {tokens.length > 0 && (
                  <div className="space-y-4">
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-slate-400 mb-2">
                        Tokens:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {tokens.map((token, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-slate-700 rounded text-blue-400 font-mono text-sm"
                          >
                            {token}
                          </span>
                        ))}
                      </div>
                    </div>

                    {embeddings.length > 0 && (
                      <div className="bg-slate-900 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-slate-400 mb-2">
                          Embedding Preview (first 5 dimensions):
                        </h3>
                        <div className="space-y-2">
                          {embeddings.map((embedding, index) => (
                            <div key={index} className="text-sm text-slate-300">
                              <span className="font-mono text-blue-400">{tokens[index]}: </span>
                              [{embedding.slice(0, 5).map(n => n.toFixed(3)).join(", ")}...]
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learn">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6 text-white space-y-4">
                <h2 className="text-2xl font-bold mb-4">Understanding Transformers</h2>
                
                <div className="space-y-4">
                  <section>
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">What are Tokens?</h3>
                    <p className="text-slate-300">
                      Tokens are the basic units that a transformer model works with. Think of them as pieces of words or symbols. For example, the word "playing" might be broken down into "play" and "ing".
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">What are Embeddings?</h3>
                    <p className="text-slate-300">
                      Embeddings are like secret codes for words - they convert words into lists of numbers that computers can understand. These numbers capture the meaning and relationships between words. Similar words will have similar number patterns!
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">How it Works</h3>
                    <ol className="list-decimal list-inside space-y-2 text-slate-300">
                      <li>First, your text is split into tokens</li>
                      <li>Each token is converted into an embedding (a list of numbers)</li>
                      <li>The transformer processes these numbers to understand the relationships between words</li>
                      <li>This helps the model understand and generate text!</li>
                    </ol>
                  </section>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;