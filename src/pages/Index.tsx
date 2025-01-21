import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenizerPlayground } from "@/components/TokenizerPlayground";
import { TransformerExplanation } from "@/components/TransformerExplanation";
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
    <div className="min-h-screen bg-[#1E293B] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white mb-8">
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

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="playground" className="text-white">
              Playground
            </TabsTrigger>
            <TabsTrigger value="learn" className="text-white">
              Learn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="playground">
            <TokenizerPlayground />
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