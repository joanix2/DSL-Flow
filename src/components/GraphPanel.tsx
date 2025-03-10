import { useCallback, useMemo, useRef } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import OutputGraphMenu from "./text/OutputGraphMenu";
import FunctionButtons from "./functions/FunctionButtons";
import TextEditor from "./text/TextEditor";
import { Trash2 } from "lucide-react";
import { FunctionInstance, FunctionTemplate } from "../services/DataTypes";
import FunctionNodeComponent from "./FunctionNodeComponent";

// Définition des nœuds personnalisés
const nodeTypes = {
  functionNode: FunctionNodeComponent,
};

// Nœuds et arêtes initiales
const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

export const GraphPanel = () => {
  // const { screenToFlowPosition } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const trashRef = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: Edge | any) =>
      setEdges((eds: Edge[]) =>
        addEdge(
          {
            ...params,
            markerEnd: {
              type: "arrowclosed", // Type de flèche fermée
              width: 20,
              height: 20,
              color: "#000",
            },
          },
          eds
        )
      ),
    [setEdges]
  );

  // Fonction pour créer une instance de fonction en tant que nœud ReactFlow
  const createFunctionInstance = (template: FunctionTemplate) => {
    const newId = `fn-${nodes.length + 1}`;

    const newInstance: FunctionInstance = {
      id: newId,
      templateTag: template.tag,
      values: Object.fromEntries(
        Object.entries(template.attributes).map(([key, attr]) => [
          key,
          attr.defaultValue ?? (attr.type === "boolean" ? false : ""),
        ])
      ),
    };

    const { x, y } = {
      x: window.innerWidth / 2 - 200 + Math.random() * 200,
      y: window.innerHeight / 2 - 100 + Math.random() * 200,
    };

    const newNode: Node = {
      id: newId,
      type: "functionNode",
      position: { x, y },
      data: {
        functionInstance: newInstance,
        onUpdate: (
          updatedValues: Record<string, string | number | boolean>
        ) => {
          setNodes((nds) =>
            nds.map((n) =>
              n.id === newId
                ? {
                    ...n,
                    data: {
                      ...n.data,
                      functionInstance: {
                        ...(n.data.functionInstance as FunctionInstance),
                        values: updatedValues,
                      },
                    },
                  }
                : n
            )
          );
        },
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  // Gestion du clic sur une fonction pour créer une instance
  const handleFunctionClick = (fnTemplate: FunctionTemplate) => {
    createFunctionInstance(fnTemplate);
  };

  // Vérifier si un nœud est déplacé sur la poubelle et le supprimer
  const onNodeDragStop = (event: React.MouseEvent, node: Node) => {
    const trashElement = trashRef.current?.getBoundingClientRect();
    if (!trashElement) return;

    const { clientX, clientY } = event;
    if (
      clientX >= trashElement.left &&
      clientX <= trashElement.right &&
      clientY >= trashElement.top &&
      clientY <= trashElement.bottom
    ) {
      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      setEdges((eds) =>
        eds.filter((e) => e.source !== node.id && e.target !== node.id)
      );
    }
  };

  // Calculer l'objet de sortie à partir des nœuds et des arêtes
  const outputGraph = useMemo(() => ({ nodes, edges }), [nodes, edges]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Menu Fonctions */}
      <div className="absolute top-4 left-4 z-10">
        <OutputGraphMenu title="Fonctions" alignRight={false}>
          <FunctionButtons onFunctionClick={handleFunctionClick} />
        </OutputGraphMenu>
      </div>

      {/* Affichage des données du graphe */}
      <div className="absolute top-4 right-4 z-10">
        <OutputGraphMenu title="Output">
          <h2>Données du graphe (JSON)</h2>
          <TextEditor initialValue={outputGraph} height={35} />
        </OutputGraphMenu>
      </div>

      {/* ReactFlow avec les nœuds et connexions */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes} // Ajout du nœud customisé
      >
        <Controls position="bottom-right" />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>

      {/* Poubelle pour supprimer les nœuds */}
      <div
        ref={trashRef}
        className="absolute bottom-4 left-4 z-10 flex items-center justify-center w-16 h-16 bg-red-600 text-white rounded-full shadow-lg cursor-pointer"
      >
        <Trash2 className="w-8 h-8" />
      </div>
    </div>
  );
};
