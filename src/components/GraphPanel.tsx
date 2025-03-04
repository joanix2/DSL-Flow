import { useCallback, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  MiniMap,
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

interface NodeData {
  label: string;
  [key: string]: unknown;
}

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export const GraphPanel = () => {
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
              type: "arrowclosed", // Type de flèche fermé
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

  // Callback qui crée un nouveau nœud dont le label est le nom de la fonction
  const handleFunctionClick = (fn: {
    name: string;
    attributes: Record<string, any>;
  }) => {
    const newId = (nodes.length + 1).toString();
    const newNode: Node<NodeData> = {
      id: newId,
      // Position aléatoire pour l'exemple, vous pouvez adapter la logique
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: fn.name },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // Lorsqu'un nœud termine d'être déplacé, vérifier s'il a été déposé sur la poubelle
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
      // Supprimer le nœud
      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      // Supprimer également les arêtes associées
      setEdges((eds) =>
        eds.filter((e) => e.source !== node.id && e.target !== node.id)
      );
    }
  };

  // Calculer l'objet de sortie à partir des nœuds et des arêtes
  const outputGraph = useMemo(() => ({ nodes, edges }), [nodes, edges]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div className="absolute top-4 left-4 z-10 ">
        <OutputGraphMenu title="Fonctions" alignRight={false}>
          <FunctionButtons onFunctionClick={handleFunctionClick} />
        </OutputGraphMenu>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <OutputGraphMenu title="Output">
          <h2>Données du graphe (JSON)</h2>
          <TextEditor initialValue={outputGraph} height={35} />
        </OutputGraphMenu>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
      >
        {/* <MiniMap position="top-right" /> */}
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
