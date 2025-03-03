import FunctionButtons from "./FunctionButtons";
import TextEditor from "./TextEditor";

export const FunctionPanel = () => {
  const user = {
    name: "John Doe",
    age: 28,
    email: "john.doe@example.com",
  };

  return (
    <div className="flex flex-row h-full gap-4">
      <div className="flex flex-col w-1/3 gap-4">
        <h2 className="text-xl font-semibold mb-2">Liste des fonctions</h2>
        <FunctionButtons />
      </div>
      <div className="flex flex-col w-1/3 gap-4">
        <h2 className="text-xl font-semibold mb-2">
          Paramètres de la fonction
        </h2>
        <TextEditor initialValue={user} height="100px" />
        <h2 className="text-xl font-semibold mb-2">Templates</h2>
        <TextEditor initialValue={user} height="600px" />
      </div>
      <div className="flex flex-col w-1/3 gap-4">
        <h2 className="text-xl font-semibold mb-2">Données de tests</h2>
        <TextEditor initialValue={user} height="100px" />
        <h2 className="text-xl font-semibold mb-2">Résultat</h2>
        <TextEditor initialValue={user} height="600px" />
      </div>
    </div>
  );
};
