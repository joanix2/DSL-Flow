// Types de valeurs possibles pour un attribut
export type AttributeType = "text" | "number" | "color" | "boolean";

// Définition d’un attribut dans un modèle de fonction (template)
export interface FunctionAttributeTemplate {
  defaultValue?: string | number | boolean; // Valeur par défaut
  type: AttributeType;
}

// Définition d’un modèle de fonction
export interface FunctionTemplate {
  tag: string;
  attributes: Record<string, FunctionAttributeTemplate>;
}

// Définition d’une instance de fonction (avec valeurs)
export interface FunctionInstance {
  id: string;
  templateTag: string; // Référence au modèle de fonction
  values: Record<string, string | number | boolean>; // Valeurs spécifiques aux attributs
}
