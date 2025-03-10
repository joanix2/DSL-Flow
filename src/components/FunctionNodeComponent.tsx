import React, { useEffect, useState } from "react";
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

  const [template, setTemplate] = useState<FunctionTemplate | null>(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      const fetchedTemplate = await FunctionService.getFunctionByTag(
        functionInstance.templateTag
      );
      if (!fetchedTemplate) {
        throw new Error(
          `Template with ID ${functionInstance.templateTag} not found`
        );
      }
      setTemplate(fetchedTemplate);
    };

    fetchTemplate();
  }, [functionInstance.templateTag]);

  if (!template) {
    return <div>Loading...</div>;
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
      <h3 className="text-lg font-semibold mb-2 text-center">{template.tag}</h3>

      {Object.keys(template.attributes).map((key) => {
        const attr = template.attributes[key];

        return (
          <div
            key={key as string}
            className="flex flex-col mb-2 gap-2 items-start"
          >
            <label className="block text-xs font-semibold">
              {key as string}
            </label>
            {attr?.type === "text" && (
              <input
                type="text"
                value={values[key] as string}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full border px-2 py-1 rounded"
              />
            )}
            {attr?.type === "number" && (
              <input
                type="number"
                value={values[key] as number}
                onChange={(e) => handleChange(key, parseFloat(e.target.value))}
                className="w-full border px-2 py-1 rounded"
              />
            )}
            {attr?.type === "color" && (
              <input
                type="color"
                value={values[key] as string}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full border px-2 py-1"
              />
            )}
            {attr?.type === "boolean" && (
              <input
                type="checkbox"
                checked={values[key] as boolean}
                onChange={(e) => handleChange(key, e.target.checked)}
                className="ml-2"
              />
            )}
          </div>
        );
      })}

      {/* Ports pour connecter les nœuds */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default FunctionNodeComponent;
