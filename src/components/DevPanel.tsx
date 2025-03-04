import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FunctionPanel } from "./FunctionPanel";
import { GraphPanel } from "./GraphPanel";

const DevPanel = () => {
  const [activeTab, setActiveTab] = useState("graph");

  return (
    <div className="flex w-full h-full p-4">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex w-full h-full"
      >
        <TabsList className="flex justify-center gap-4">
          <TabsTrigger value="function">Function</TabsTrigger>
          <TabsTrigger value="graph">Graphe</TabsTrigger>
        </TabsList>

        <Card className="h-full p-4">
          <CardContent className="flex w-full h-full p-0">
            <TabsContent className="h-full" value="function">
              <FunctionPanel />
            </TabsContent>
            <TabsContent className="h-full" value="graph">
              <GraphPanel />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default DevPanel;
