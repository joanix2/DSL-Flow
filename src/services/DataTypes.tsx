// Types de valeurs possibles pour un attribut
type AttributeType = "text" | "number" | "color" | "boolean";

// Définition d’un attribut dans un modèle de fonction (template)
export interface FunctionAttributeTemplate {
  id: string; // Un identifiant unique pour l'attribut
  name: string;
  defaultValue?: string | number | boolean; // Valeur par défaut
  type: AttributeType;
}

// Définition d’un modèle de fonction
export interface FunctionTemplate {
  id: string;
  name: string;
  attributes: FunctionAttributeTemplate[];
}

// Définition d’une instance de fonction (avec valeurs)
export interface FunctionInstance {
  id: string;
  templateId: string; // Référence au modèle de fonction
  values: Record<string, string | number | boolean>; // Valeurs spécifiques aux attributs
}
