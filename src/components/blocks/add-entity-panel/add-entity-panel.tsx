import { Spotlight, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Add entity panel.
 *
 * Lists all available entities that can be added to the scene.
 * Clicking on an entity will add it, clicking on Cancel will close the panel.
 */
export const AddEntityPanel = () => {
  return (
    <div className="flex flex-col gap-6 flex-1">
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4">
          <h5 className="leading-none uppercase text-sm">Lights</h5>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="justify-start" variant="outline">
                <Sun /> Directional light
              </Button>
            </TooltipTrigger>
            <TooltipContent>A directional light</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="justify-start" variant="outline">
                <Spotlight /> Spotlight
              </Button>
            </TooltipTrigger>
            <TooltipContent>A spotlight</TooltipContent>
          </Tooltip>
        </div>
      </ScrollArea>

      <Button variant="outline">Cancel</Button>
    </div>
  );
};
