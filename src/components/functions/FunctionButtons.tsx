import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import FunctionCreationModal from "./FunctionCreationModal";
import { FunctionTemplate } from "@/services/DataTypes";
import FunctionService from "@/services/FunctionService";

interface FunctionButtonsProps {
  onFunctionClick?: (fn: FunctionTemplate) => void;
}

const FunctionButtons = ({ onFunctionClick }: FunctionButtonsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [functions, setFunctions] = useState<FunctionTemplate[]>([]);

  // Charger les fonctions existantes
  useEffect(() => {
    setFunctions(FunctionService.getFunctions());
  }, []);

  // Ajouter une nouvelle fonction
  const handleCreateFunction = (newFunction: FunctionTemplate) => {
    FunctionService.addFunction(newFunction);
    setFunctions([...FunctionService.getFunctions()]);
    setIsModalOpen(false);
  };

  const handleFunctionClick = (fn: FunctionTemplate) => {
    console.log("Fonction sélectionnée :", fn);
    if (onFunctionClick) {
      onFunctionClick(fn);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        {functions.map((fn) => (
          <Button
            key={fn.id}
            variant="outline"
            onClick={() => handleFunctionClick(fn)}
            className="w-full"
          >
            {fn.name}
          </Button>
        ))}

        <Button
          onClick={() => setIsModalOpen(true)}
          variant="outline"
          className="w-full"
        >
          +
        </Button>
      </div>

      {isModalOpen && (
        <FunctionCreationModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateFunction}
        />
      )}
    </div>
  );
};

export default FunctionButtons;
