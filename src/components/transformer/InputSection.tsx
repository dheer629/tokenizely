import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lightbulb, Calculator } from "lucide-react";

interface InputSectionProps {
  inputText: string;
  setInputText: (text: string) => void;
  onCalculate: () => void;
}

export const InputSection = ({ inputText, setInputText, onCalculate }: InputSectionProps) => {
  return (
    <div className="bg-[#F1F0FB] p-6 rounded-lg border border-[#8E9196]/20">
      <h3 className="text-xl font-semibold text-[#8E9196] mb-3 flex items-center gap-2">
        <Lightbulb className="h-5 w-5" />
        Try It Yourself!
      </h3>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border border-[#8E9196]/20">
          <p className="text-[#8E9196] mb-3">
            Enter any text below to see how a transformer processes it step by step!
          </p>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Example: The cat sat on the mat..."
            className="border-[#8E9196]/20 focus:border-[#FEC6A1]"
          />
        </div>
        <Button 
          onClick={onCalculate}
          className="bg-[#FEC6A1] hover:bg-[#F97316] text-white w-full"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Embeddings
        </Button>
      </div>
    </div>
  );
};