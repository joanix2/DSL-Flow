import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import FunctionCreationModal from "./FunctionCreationModal";
import { FunctionTemplate } from "@/services/DataTypes";
import FunctionService from "@/services/FunctionService";
import { Edit2, Trash2 } from "lucide-react";

interface FunctionButtonsProps {
  onFunctionClick?: (fn: FunctionTemplate) => void;
}

const FunctionButtons = ({ onFunctionClick }: FunctionButtonsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [functions, setFunctions] = useState<FunctionTemplate[]>([]);
  const [editingFunction, setEditingFunction] =
    useState<FunctionTemplate | null>(null);

  // Charger les fonctions existantes
  useEffect(() => {
    setFunctions(FunctionService.getFunctions());
  }, []);

  // Ajouter ou mettre à jour une fonction
  const handleCreateOrUpdateFunction = (newFunction: FunctionTemplate) => {
    if (editingFunction) {
      FunctionService.updateFunction(newFunction); // Mettre à jour
      console.log("Fonction mise à jour :", newFunction);
    } else {
      FunctionService.addFunction(newFunction); // Ajouter
    }
    setFunctions(FunctionService.getFunctions());
    setIsModalOpen(false);
    setEditingFunction(null);
  };

  // Supprimer une fonction
  const handleDeleteFunction = (id: string) => {
    FunctionService.deleteFunction(id);
    setFunctions([...FunctionService.getFunctions()]);
  };

  // Gérer la sélection d'une fonction
  const handleFunctionClick = (fn: FunctionTemplate) => {
    console.log("Fonction sélectionnée :", fn);
    if (onFunctionClick) {
      onFunctionClick(fn);
    }
  };

  // Ouvrir le modal pour l'édition
  const handleEditFunction = (fn: FunctionTemplate | null) => {
    setEditingFunction(fn);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        {functions.map((fn) => (
          <div className="flex flex-row gap-2 items-center w-full" key={fn.id}>
            <Button
              variant="outline"
              onClick={() => handleFunctionClick(fn)}
              className="w-64"
            >
              {fn.name}
            </Button>
            <Button
              className="h-10 w-10 justify-center items-center"
              variant="ghost"
              onClick={() => handleEditFunction(fn)}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              className="h-10 w-10 justify-center items-center"
              variant="ghost"
              onClick={() => handleDeleteFunction(fn.id)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}

        <Button
          onClick={() => handleEditFunction(null)}
          variant="outline"
          className="w-full"
        >
          +
        </Button>
      </div>

      {isModalOpen && (
        <FunctionCreationModal
          open={isModalOpen}
          editingFunction={editingFunction}
          onClose={() => {
            setIsModalOpen(false);
            setEditingFunction(null);
          }}
          onCreate={handleCreateOrUpdateFunction}
        />
      )}
    </div>
  );
};

export default FunctionButtons;
