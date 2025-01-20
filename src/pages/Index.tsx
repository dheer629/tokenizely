import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code2, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [tokens, setTokens] = useState<string[]>([]);
  const [tokenCount, setTokenCount] = useState(0);

  const handleTokenize = () => {
    // Placeholder tokenization - will be replaced with DeepSeek API
    const simpleTokens = inputText.split(" ").filter(token => token.length > 0);
    setTokens(simpleTokens);
    setTokenCount(simpleTokens.length);
  };

  return (
    <div className="min-h-screen bg-[#1E293B] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-white mb-8 flex items-center gap-2">
          <Code2 className="h-8 w-8" />
          Tokenizely
        </h1>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              Tokenizer Playground
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-blue-400" />
                </TooltipTrigger>
                <TooltipContent>
                  Enter text to see how it's broken down into tokens
                </TooltipContent>
              </Tooltip>
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
              <div className="flex justify-between items-center">
                <Button
                  onClick={handleTokenize}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Tokenize
                </Button>
                <span className="text-sm text-slate-400">
                  Token count: {tokenCount}
                </span>
              </div>
            </div>

            {tokens.length > 0 && (
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;