import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assurez-vous que le chemin est correct

// Définition du type pour représenter une fonction
export interface MyFunction {
  name: string;
  attributes: Record<string, any>;
}

// Props du composant incluant le callback optionnel
interface FunctionButtonsProps {
  onFunctionClick?: (fn: MyFunction) => void;
}

const FunctionButtons = ({ onFunctionClick }: FunctionButtonsProps) => {
  // État initial contenant quelques fonctions avec un nom et un dictionnaire d'attributs
  const [functions, setFunctions] = useState<MyFunction[]>([
    {
      name: "Fonction 1",
      attributes: { description: "Description de la fonction 1" },
    },
    {
      name: "Fonction 2",
      attributes: { description: "Description de la fonction 2" },
    },
    {
      name: "Fonction 3",
      attributes: { description: "Description de la fonction 3" },
    },
  ]);

  // Gérer le clic sur un bouton de fonction
  const handleFunctionClick = (fn: MyFunction) => {
    console.log("Fonction sélectionnée :", fn);
    // Si un callback a été passé en prop, on le déclenche
    if (onFunctionClick) {
      onFunctionClick(fn);
    }
  };

  // Ajouter une nouvelle fonction via une invite de commande
  const addFunction = () => {
    const newFunctionName = prompt("Entrez le nom de la nouvelle fonction :");
    if (newFunctionName) {
      // Pour simplifier, on initialise les attributs à un objet vide
      const newFunction: MyFunction = { name: newFunctionName, attributes: {} };
      setFunctions([...functions, newFunction]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {functions.map((fn, index) => (
        <Button
          key={index}
          variant="outline"
          onClick={() => handleFunctionClick(fn)}
          className="w-full"
        >
          {fn.name}
        </Button>
      ))}
      {/* Bouton pour ajouter une nouvelle fonction */}
      <Button onClick={addFunction} variant="outline" className="w-full">
        +
      </Button>
    </div>
  );
};

export default FunctionButtons;
