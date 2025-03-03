export const FunctionPanel = () => {
  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col w-1/3">
        <h2 className="text-xl font-semibold mb-2">Liste des fonctions</h2>
        <p>Ajoutez ici vos fonctionnalités spécifiques.</p>
      </div>
      <div className="flex flex-col w-1/3">
        <h2 className="text-xl font-semibold mb-2">Template</h2>
        <p>Zone pour définir les inputs de la fonction</p>
        <p>Zone de text pour écrire le template</p>
      </div>
      <div className="flex flex-col w-1/3">
        <h2 className="text-xl font-semibold mb-2">Output</h2>
        <p>données de tests</p>
        <p>résultat</p>
      </div>
    </div>
  );
};
