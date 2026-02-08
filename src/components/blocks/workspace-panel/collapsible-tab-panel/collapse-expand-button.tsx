import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CollapseExpandButtonProps {
  isCollapsed: boolean;
  onClick: () => void;
}

/**
 * Renders a buttons that collapses or expands the panel.
 *
 * @param isCollapsed - Wether the panel is currently collapsed or not.
 * @param onClick - On click handler callback.
 */
export const CollapseExpandButton = ({
  isCollapsed,
  onClick,
}: CollapseExpandButtonProps) => {
  const ButtonIcon = isCollapsed ? ChevronRight : ChevronDown;
  const ButtonTooltipLabel = isCollapsed ? "Expand" : "Collapse";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button size="icon-sm" variant="ghost" onClick={onClick}>
          <ButtonIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{ButtonTooltipLabel}</TooltipContent>
    </Tooltip>
  );
};
