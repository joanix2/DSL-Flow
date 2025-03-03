import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, Text, Image, Video, Code, BarChart } from "lucide-react";

const blockTypes = [
  { label: "Text Block", icon: Text },
  { label: "Image Block", icon: Image },
  { label: "Video Block", icon: Video },
  { label: "Code Block", icon: Code },
  { label: "Chart Block", icon: BarChart },
];

export const BlockMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-2xl shadow-md px-4 py-2">
          <PlusCircle className="w-5 h-5" /> Add Block
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-2xl shadow-lg bg-white p-2 border">
        {blockTypes.map((block, index) => (
          <DropdownMenuItem
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <block.icon className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium">{block.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
