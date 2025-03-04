import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assurez-vous que le chemin est correct
import { FunctionTemplate } from "../DataTypes";
import FunctionCreationModal from "./FunctionCreationModal";

interface FunctionButtonsProps {
  onFunctionClick?: (fn: FunctionTemplate) => void;
}

const FunctionButtons = ({ onFunctionClick }: FunctionButtonsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [functions, setFunctions] = useState<FunctionTemplate[]>([]);

  // Gérer la création d'une nouvelle fonction
  const handleCreateFunction = (newFunction: FunctionTemplate) => {
    setFunctions((prev) => [...prev, newFunction]);
    setIsModalOpen(false); // Ferme la modale seulement si la création réussit
    console.log("Nouvelle fonction ajoutée :", newFunction);
  };

  // Gérer le clic sur un bouton de fonction
  const handleFunctionClick = (fn: FunctionTemplate) => {
    console.log("Fonction sélectionnée :", fn);
    if (onFunctionClick) {
      onFunctionClick(fn);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Boutons pour les fonctions existantes */}
      {functions.map((fn) => (
        <Button
          key={fn.id} // Utilisation correcte de la clé unique
          variant="outline"
          onClick={() => handleFunctionClick(fn)}
          className="w-full"
        >
          {fn.name}
        </Button>
      ))}

      {/* Bouton pour ajouter une nouvelle fonction */}
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="outline"
        className="w-full"
      >
        +
      </Button>

      {/* Modale de création */}
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
