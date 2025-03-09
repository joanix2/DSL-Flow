import { Viewport } from "@xyflow/react";

export const getCenteredNodePosition = (
  viewport: Viewport,
  nodeWidth: number = 150,
  nodeHeight: number = 80
) => {
  const { x: deltaX, y: deltaY, zoom } = viewport;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Calculer le centre en tenant compte du zoom et du décalage
  const centerX = (screenWidth / 2 - deltaX) / zoom;
  const centerY = (screenHeight / 2 - deltaY) / zoom;

  // Ajustement final pour centrer correctement le nœud
  return {
    x: centerX - nodeWidth / 2,
    y: centerY - nodeHeight / 2,
  };
};
