import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle2, HelpCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  id: number;
  title: string;
  description: string;
  difficulty_level: string;
  category: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

const QuestionsAnswers = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const { data: questions, isLoading } = useQuery({
    queryKey: ['transformer-questions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transformer_questions')
        .select('*')
        .order('id');
      
      if (error) throw error;
      return data as Question[];
    }
  });

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-slate-600">Loading questions...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#F1F0FB] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 bg-white p-6 rounded-lg shadow-sm">
          <Brain className="h-8 w-8 text-[#8E9196]" />
          <h1 className="text-3xl font-bold text-[#222222]">
            Test Your Knowledge
          </h1>
        </div>

        {questions?.map((q) => (
          <Card key={q.id} className="bg-white shadow-sm border-[#8E9196]/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#222222] flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-[#8E9196]" />
                  {q.title}
                </CardTitle>
                <span className="px-3 py-1 rounded-full text-sm bg-[#F1F0FB] text-[#8E9196]">
                  {q.difficulty_level}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#222222]">{q.question}</p>
              
              <div className="grid gap-3">
                {q.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`justify-start text-left h-auto p-4 ${
                      selectedAnswer === index
                        ? index === q.correct_answer
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-[#8E9196]/20 hover:bg-[#F1F0FB]'
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <span className="text-[#222222]">{option}</span>
                  </Button>
                ))}
              </div>

              {showExplanation && (
                <div className="mt-4 p-4 bg-[#F1F0FB] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-[#8E9196]" />
                    <h3 className="font-semibold text-[#222222]">Explanation</h3>
                  </div>
                  <p className="text-[#222222]">{q.explanation}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuestionsAnswers;