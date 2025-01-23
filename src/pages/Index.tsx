import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenizerPlayground } from "@/components/TokenizerPlayground";
import { TransformerExplanation } from "@/components/TransformerExplanation";
import { EmbeddingVisualizer } from "@/components/EmbeddingVisualizer";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
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
    <div className="min-h-screen bg-orange-50/30 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-orange-600 mb-8">
            Learn About Transformers
          </h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="text-orange-600 border-orange-200 hover:bg-orange-100"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="bg-white border-orange-200">
            <TabsTrigger 
              value="playground" 
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-600"
            >
              Playground
            </TabsTrigger>
            <TabsTrigger 
              value="learn"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-600"
            >
              Learn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="playground">
            <TokenizerPlayground />
            <EmbeddingVisualizer />
          </TabsContent>

          <TabsContent value="learn">
            <TransformerExplanation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;