import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assurez-vous que le chemin est correct selon votre configuration

const FunctionButtons = () => {
  // État initial contenant quelques fonctions (ici, simplement des noms)
  const [functions, setFunctions] = useState([
    "Fonction 1",
    "Fonction 2",
    "Fonction 3",
  ]);

  // Gérer le clic sur un bouton de fonction
  const handleFunctionClick = (fn: string) => {
    console.log("Fonction sélectionnée :", fn);
    // Vous pouvez ajouter ici la logique liée à la fonction sélectionnée
  };

  // Ajouter une nouvelle fonction via une invite de commande
  const addFunction = () => {
    const newFunctionName = prompt("Entrez le nom de la nouvelle fonction :");
    if (newFunctionName) {
      setFunctions([...functions, newFunctionName]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {functions.map((fn, index) => (
        <Button
          key={index}
          variant="default"
          onClick={() => handleFunctionClick(fn)}
          className="w-full"
        >
          {fn}
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
