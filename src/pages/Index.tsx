import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenizerPlayground } from "@/components/TokenizerPlayground";
import { TransformerExplanation } from "@/components/TransformerExplanation";
import { EmbeddingVisualizer } from "@/components/EmbeddingVisualizer";
import { Button } from "@/components/ui/button";
import { LogOut, Sparkles, BookOpen, Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("playground");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-orange-100">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-orange-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Learn About Transformers
            </h1>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="text-orange-600 border-orange-200 hover:bg-orange-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-orange-100 p-6">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="bg-orange-50 p-1 border border-orange-100">
              <TabsTrigger 
                value="playground" 
                className="data-[state=active]:bg-white data-[state=active]:text-orange-600 flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Interactive Playground
              </TabsTrigger>
              <TabsTrigger 
                value="learn"
                className="data-[state=active]:bg-white data-[state=active]:text-orange-600 flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Learn
              </TabsTrigger>
            </TabsList>

            <TabsContent value="playground" className="space-y-6">
              <TokenizerPlayground />
              <EmbeddingVisualizer />
            </TabsContent>

            <TabsContent value="learn">
              <TransformerExplanation />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;