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
import { AttributeType, FunctionTemplate } from "../../services/DataTypes";

interface FunctionCreationModalProps {
  open: boolean;
  editingFunction: FunctionTemplate | null;
  onClose: () => void;
  onCreate: (template: FunctionTemplate) => void;
}

interface FunctionAttributeTemplateInput {
  name: string;
  defaultValue?: string | number | boolean; // Valeur par défaut
  type: AttributeType;
}

const FunctionCreationModal: React.FC<FunctionCreationModalProps> = ({
  open,
  editingFunction,
  onClose,
  onCreate,
}) => {
  const [functionTag, setFunctionTag] = useState(editingFunction?.tag || "");
  const [attributes, setAttributes] = useState<
    FunctionAttributeTemplateInput[]
  >(
    editingFunction
      ? Object.entries(editingFunction.attributes).map(
          ([key, attribute], index) => ({
            name: key || `attribute-${index}`,
            defaultValue:
              attribute?.defaultValue !== undefined
                ? attribute.defaultValue
                : attribute?.type === "boolean"
                ? false
                : "",
            type: attribute?.type || "text",
          })
        )
      : []
  );

  // Ajouter un nouvel attribut
  const handleAddAttribute = () => {
    setAttributes([
      ...attributes,
      {
        type: "text",
        name: "",
      },
    ]);
  };

  // Met à jour un attribut existant
  const handleAttributeChange = (
    name: string,
    key: keyof FunctionAttributeTemplateInput,
    value: unknown
  ) => {
    setAttributes((prev) =>
      prev.map((attr) =>
        attr.name === name ? { ...attr, [key]: value } : attr
      )
    );
  };

  // Supprimer un attribut
  const handleRemoveAttribute = (id: string) => {
    setAttributes((prev) => prev.filter((attr) => attr.name !== id));
  };

  // Création du modèle de fonction
  const handleCreate = () => {
    if (!functionTag.trim()) return alert("Le nom de la fonction est requis.");

    const attributesRecord: Record<
      string,
      { type: AttributeType; defaultValue?: string | number | boolean }
    > = Object.fromEntries(
      attributes.map((attr) => [
        attr.name,
        { type: attr.type, defaultValue: attr.defaultValue },
      ])
    );

    const functionTemplate: FunctionTemplate = {
      tag: functionTag,
      attributes: attributesRecord,
    };

    console.log("Nouvelle fonction :", functionTemplate);

    onCreate(functionTemplate);
    onClose();
    setFunctionTag("");
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
            value={functionTag}
            onChange={(e) => setFunctionTag(e.target.value)}
          />
        </div>

        {/* Liste des attributs */}
        {attributes.map((attr, index) => (
          <div key={index} className="flex gap-2 items-center mb-3">
            {/* Sélecteur du type */}
            <div className="flex flex-row items-center w-full gap-2">
              <Select
                onValueChange={(value) =>
                  handleAttributeChange(attr.name, "type", value)
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
                  handleAttributeChange(attr.name, "name", e.target.value)
                }
                className="w-1/3"
              />

              {/* Nom de l'attribut */}
              <Input
                placeholder="Valeur par défaut"
                value={attr.defaultValue?.toString()}
                onChange={(e) =>
                  handleAttributeChange(
                    attr.name,
                    "defaultValue",
                    e.target.value
                  )
                }
                className="w-1/3"
              />
            </div>

            {/* Bouton de suppression */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveAttribute(attr.name)}
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
