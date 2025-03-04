import { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import OutputGraphMenu from "./OutputGraphMenu";
import FunctionButtons from "./FunctionButtons";
import TextEditor from "./TextEditor";

interface NodeData {
  label: string;
}

interface Node {
  id: string;
  position: { x: number; y: number };
  data: NodeData;
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export const GraphPanel = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
    const newNode: Node = {
      id: newId,
      // Position aléatoire pour l'exemple, vous pouvez adapter la logique
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: fn.name },
    };
    setNodes((nds) => [...nds, newNode]);
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
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        {/* <MiniMap position="top-right" /> */}
        <div className="absolute top-4 right-4 z-10">
          <OutputGraphMenu title="Output">
            <h2>Données du graphe (JSON)</h2>
            <TextEditor initialValue={outputGraph} height={35} />
          </OutputGraphMenu>
        </div>

        <Controls position="bottom-right" />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};
