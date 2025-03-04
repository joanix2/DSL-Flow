import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import des modes et thèmes d'Ace
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

interface TextEditorProps {
  initialValue: string | object;
  height?: number;
}

function TextEditor({ initialValue, height = 300 }: TextEditorProps) {
  const [value, setValue] = useState(
    typeof initialValue === "object"
      ? JSON.stringify(initialValue, null, 2)
      : initialValue
  );

  // Mettre à jour l'état quand initialValue change
  useEffect(() => {
    setValue(
      typeof initialValue === "object"
        ? JSON.stringify(initialValue, null, 2)
        : initialValue
    );
  }, [initialValue]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        alert("Contenu copié dans le presse-papier !");
      })
      .catch((err) => {
        console.error("Erreur lors de la copie : ", err);
      });
  };

  return (
    <div className="relative border border-gray-300 rounded text-left">
      {/* Bouton de copie en haut à droite avec l'icône */}
      <Button
        onClick={copyToClipboard}
        variant="outline"
        className="absolute top-2 right-2 z-10 p-2"
      >
        <Copy className="h-5 w-5" />
      </Button>

      {/* Éditeur Ace */}
      <AceEditor
        mode="json"
        theme="monokai"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        name="text_editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          useWorker: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
        width="100%"
        minLines={height ?? value.split("\n").length}
        maxLines={height ?? value.split("\n").length}
      />
    </div>
  );
}

export default TextEditor;
