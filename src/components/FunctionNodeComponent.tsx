import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { FunctionInstance, FunctionTemplate } from "../services/DataTypes";
import FunctionService from "@/services/FunctionService";

// Interface des props du nœud
interface FunctionNodeProps {
  data: {
    functionInstance: FunctionInstance;
    onUpdate: (
      updatedValues: Record<string, string | number | boolean>
    ) => void;
  };
}

const FunctionNodeComponent: React.FC<FunctionNodeProps> = ({ data }) => {
  const { functionInstance, onUpdate } = data;
  const [values, setValues] = useState(functionInstance.values);

  const template: FunctionTemplate | undefined =
    FunctionService.getFunctionById(functionInstance.templateId);

  if (!template) {
    throw new Error(
      `Template with ID ${functionInstance.templateId} not found`
    );
  }

  // Met à jour la valeur d'un attribut
  const handleChange = (key: string, value: string | number | boolean) => {
    if (values[key] === value) return; // Évite la mise à jour inutile

    const updatedValues = { ...values, [key]: value };
    setValues(updatedValues);
    onUpdate(updatedValues);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-md text-sm w-64">
      <h3 className="text-lg font-semibold mb-2 text-center">
        {template.name}
      </h3>

      {/* Affichage des attributs */}
      {template.attributes.map((attr) => (
        <div key={attr.id} className="flex flex-col mb-2 gap-2 items-start">
          <label className="block text-xs font-semibold">{attr.name}</label>
          {attr.type === "text" && (
            <input
              type="text"
              value={values[attr.name] as string}
              onChange={(e) => handleChange(attr.name, e.target.value)}
              className="w-full border px-2 py-1 rounded"
            />
          )}
          {attr.type === "number" && (
            <input
              type="number"
              value={values[attr.name] as number}
              onChange={(e) =>
                handleChange(attr.name, parseFloat(e.target.value))
              }
              className="w-full border px-2 py-1 rounded"
            />
          )}
          {attr.type === "color" && (
            <input
              type="color"
              value={values[attr.name] as string}
              onChange={(e) => handleChange(attr.name, e.target.value)}
              className="w-full border px-2 py-1"
            />
          )}
          {attr.type === "boolean" && (
            <input
              type="checkbox"
              checked={values[attr.name] as boolean}
              onChange={(e) => handleChange(attr.name, e.target.checked)}
              className="ml-2"
            />
          )}
        </div>
      ))}

      {/* Ports pour connecter les nœuds */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default FunctionNodeComponent;
