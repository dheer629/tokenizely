import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkles } from "lucide-react";

interface InputSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
  onCalculate: () => void;
}

export const InputSection = ({ inputText, setInputText, onCalculate }: InputSectionProps) => {
  return (
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
          onClick={onCalculate}
          className="bg-orange-500 hover:bg-orange-600 text-white w-full"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          See the Magic Happen!
        </Button>
      </div>
    </div>
  );
};