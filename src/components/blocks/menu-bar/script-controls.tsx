import { Pause, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Renders the Script Controls in the menu bar.
 */
export function ScriptControls() {
  return (
    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="hover:text-green-700"
            variant="outline"
            size="icon-sm"
          >
            <Play />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Play Script</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="hover:text-yellow-700"
            variant="outline"
            size="icon-sm"
          >
            <Pause />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Pause Script</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="hover:text-red-700"
            variant="outline"
            size="icon-sm"
          >
            <Square />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Stop Script</TooltipContent>
      </Tooltip>
    </ButtonGroup>
  );
}
