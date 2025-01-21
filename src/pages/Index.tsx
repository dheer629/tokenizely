import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, BookOpen, Network, Layers, ArrowRight, Lightbulb, Zap, LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { pipeline } from "@huggingface/transformers";

const Index = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [tokens, setTokens] = useState<string[]>([]);
  const [tokenCount, setTokenCount] = useState(0);
  const [embeddings, setEmbeddings] = useState<number[][]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

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
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white mb-8 flex items-center gap-2">
            <Brain className="h-8 w-8" />
            Learn About Transformers
          </h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

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
            <div className="space-y-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-yellow-400" />
                    Understanding Transformers
                  </h2>
                  
                  <div className="space-y-8">
                    <section className="space-y-4">
                      <h3 className="text-xl font-semibold text-blue-400 flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Step 1: Tokenization
                      </h3>
                      <p className="text-slate-300">
                        Imagine you're breaking down a sentence into its smallest meaningful parts. That's what tokenization does! For example, the word "playing" might be split into "play" and "ing". This helps the computer understand the structure of language better.
                      </p>
                      <div className="bg-slate-900 p-4 rounded-lg">
                        <p className="text-sm text-slate-400">Example:</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-white">"playing"</span>
                          <ArrowRight className="h-4 w-4 text-blue-400" />
                          <span className="px-2 py-1 bg-slate-700 rounded text-blue-400 font-mono text-sm">play</span>
                          <span className="px-2 py-1 bg-slate-700 rounded text-blue-400 font-mono text-sm">ing</span>
                        </div>
                      </div>
                    </section>

                    <section className="space-y-4">
                      <h3 className="text-xl font-semibold text-blue-400 flex items-center gap-2">
                        <Layers className="h-5 w-5" />
                        Step 2: Embeddings
                      </h3>
                      <p className="text-slate-300">
                        After tokenization, each token is converted into a list of numbers called an embedding. Think of it like giving each word a special code that captures its meaning. Similar words will have similar codes!
                      </p>
                      <div className="bg-slate-900 p-4 rounded-lg">
                        <p className="text-sm text-slate-400">For example, these words have similar embeddings:</p>
                        <div className="flex flex-col gap-2 mt-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-slate-700 rounded text-blue-400 font-mono text-sm">cat</span>
                            <span className="text-slate-400">→</span>
                            <span className="text-slate-300 font-mono">[0.2, -0.5, 0.1, ...]</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-slate-700 rounded text-blue-400 font-mono text-sm">kitten</span>
                            <span className="text-slate-400">→</span>
                            <span className="text-slate-300 font-mono">[0.3, -0.4, 0.2, ...]</span>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section className="space-y-4">
                      <h3 className="text-xl font-semibold text-blue-400 flex items-center gap-2">
                        <Network className="h-5 w-5" />
                        Step 3: Attention Mechanism
                      </h3>
                      <p className="text-slate-300">
                        The attention mechanism is like having a spotlight that helps the model focus on important words when processing a sentence. It looks at how each word relates to every other word in the text.
                      </p>
                      <div className="bg-slate-900 p-4 rounded-lg">
                        <p className="text-sm text-slate-400">Example sentence: "The cat sat on the mat"</p>
                        <p className="text-sm text-slate-300 mt-2">
                          When processing "cat", the model pays attention to related words like "sat" and "mat", helping it understand the context better.
                        </p>
                      </div>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
