import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

interface OutputGraphMenuProps {
  title: string;
  children: React.ReactNode;
  alignRight?: boolean;
}

function OutputGraphMenu({
  title,
  children,
  alignRight = true,
}: OutputGraphMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Ferme le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={menuRef}
      className={`flex flex-col ${alignRight ? "items-end" : "items-start"}`}
    >
      <Button variant="outline" onClick={() => setIsOpen((prev) => !prev)}>
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </Button>
      {isOpen && (
        <div className="flex flex-col mt-2 w-96 rounded-lg shadow-lg bg-white border border-gray-200 p-4 gap-4">
          {children}
        </div>
      )}
    </div>
  );
}

export default OutputGraphMenu;
