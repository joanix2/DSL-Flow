import React, { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  FunctionAttributeTemplate,
  FunctionTemplate,
} from "../../services/DataTypes";

interface FunctionCreationModalProps {
  open: boolean;
  editingFunction: FunctionTemplate | null;
  onClose: () => void;
  onCreate: (template: FunctionTemplate) => void;
}

const FunctionCreationModal: React.FC<FunctionCreationModalProps> = ({
  open,
  editingFunction,
  onClose,
  onCreate,
}) => {
  const [functionName, setFunctionName] = useState(editingFunction?.name || "");
  const [attributes, setAttributes] = useState<FunctionAttributeTemplate[]>(
    editingFunction?.attributes || []
  );

  // Ajouter un nouvel attribut
  const handleAddAttribute = () => {
    setAttributes([
      ...attributes,
      { id: crypto.randomUUID(), name: "", type: "text" },
    ]);
  };

  // Met à jour un attribut existant
  const handleAttributeChange = (
    id: string,
    key: keyof FunctionAttributeTemplate,
    value: unknown
  ) => {
    setAttributes((prev) =>
      prev.map((attr) => (attr.id === id ? { ...attr, [key]: value } : attr))
    );
  };

  // Supprimer un attribut
  const handleRemoveAttribute = (id: string) => {
    setAttributes((prev) => prev.filter((attr) => attr.id !== id));
  };

  // Création du modèle de fonction
  const handleCreate = () => {
    if (!functionName.trim()) return alert("Le nom de la fonction est requis.");
    onCreate({
      id: editingFunction?.id || crypto.randomUUID(),
      name: functionName,
      attributes,
    });
    onClose();
    setFunctionName("");
    setAttributes([]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une nouvelle fonction</DialogTitle>
        </DialogHeader>

        {/* Nom de la fonction */}
        <div className="mb-4">
          <Input
            placeholder="Nom de la fonction"
            value={functionName}
            onChange={(e) => setFunctionName(e.target.value)}
          />
        </div>

        {/* Liste des attributs */}
        {attributes.map((attr) => (
          <div key={attr.id} className="flex gap-2 items-center mb-3">
            {/* Sélecteur du type */}
            <div className="flex flex-row items-center w-full gap-2">
              <Select
                onValueChange={(value) =>
                  handleAttributeChange(attr.id, "type", value)
                }
                defaultValue={attr.type}
              >
                <SelectTrigger className="w-1/3">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Texte</SelectItem>
                  <SelectItem value="number">Nombre</SelectItem>
                  <SelectItem value="color">Couleur</SelectItem>
                  <SelectItem value="boolean">Booléen</SelectItem>
                </SelectContent>
              </Select>

              {/* Nom de l'attribut */}
              <Input
                placeholder="Nom de l'attribut"
                value={attr.name}
                onChange={(e) =>
                  handleAttributeChange(attr.id, "name", e.target.value)
                }
                className="w-1/3"
              />

              {/* Nom de l'attribut */}
              <Input
                placeholder="Valeur par défaut"
                value={attr.defaultValue?.toString()}
                onChange={(e) =>
                  handleAttributeChange(attr.id, "defaultValue", e.target.value)
                }
                className="w-1/3"
              />
            </div>

            {/* Bouton de suppression */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveAttribute(attr.id)}
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </Button>
          </div>
        ))}

        {/* Bouton pour ajouter un attribut */}
        <Button
          onClick={handleAddAttribute}
          variant="outline"
          className="w-full mt-2"
        >
          <PlusCircle className="mr-2" /> Ajouter un attribut
        </Button>

        {/* Actions */}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="outline" onClick={handleCreate}>
            Créer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FunctionCreationModal;
