import { Box, Boxes, Circle, X } from "lucide-react";
import { useState } from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Tab } from "./types";

interface TabItemProps {
  tab: Tab;
  isActive: boolean;
  //   onSelect: (id: string) => void;
  ref?: React.Ref<HTMLButtonElement>
  onClose: (tab: Tab) => void;
}

/**
 * Renders a tab bar tab item.
 *
 * @param tab - The tab data.
 * @param isActive - Whether the tab is currently active.
 * @param onClose - Callback invoked to close the tab.
 */
export const TabItem: React.FC<TabItemProps> = ({
  tab,
  isActive,
  //   onSelect,
  onClose,
  ref
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const documentTypeIcon =
    tab.documentType === "scene" ? (
      <Boxes className="w-4 h-4" />
    ) : (
      <Box className="w-4 h-4" />
    );

  // Conditionally render Circle or X icon based on hover
  const closeIcon = tab.unsaved ? (
    isHovered ? (
      <X className="w-4 h-4" /> // Show X when hovered
    ) : (
      <Circle className="w-4 h-4" /> // Show Circle when not hovered
    )
  ) : (
    <X className="w-4 h-4" /> // Show X when unsaved is false
  );

  const closeTabButton = (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose(tab);
          }}
          className={cn(
            "ml-2 p-0.5 hover:bg-gray-600 rounded-full hover:text-white cursor-pointer",
            { "text-gray-400": isActive, "text-gray-600": !isActive },
          )}
          onMouseEnter={() => setIsHovered(true)} // Show X icon when hovering
          onMouseLeave={() => setIsHovered(false)} // Hide X icon when not hovering
        >
          {closeIcon}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">Close (Ctrl+W)</TooltipContent>
    </Tooltip>
  );

  return (
    <TabsTrigger
      key={tab.id}
      value={tab.id}
      asChild
      //   onClose={(t) =>
      //     t.unsaved ? setConfirmCloseTab(t) : closeTab(t.id)
      //   }
      className="max-w-3xs justify-start grow-0"
      ref={ref}
    >
      <div className="cursor-pointer">
        {documentTypeIcon} <span className="truncate">{tab.label}</span>
        {closeTabButton}
      </div>
    </TabsTrigger>
  );
};
