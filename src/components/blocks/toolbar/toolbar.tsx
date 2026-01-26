import {
  Grid3X3,
  MousePointer2,
  Move3D,
  Rotate3D,
  Scale3D,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ToolDefinition } from "./types";

const toolDefinitions: ToolDefinition[] = [
  {
    type: "toggle",
    value: "select",
    label: "Select",
    icon: <MousePointer2 className="size-6" />,
    classes:
      "data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500",
  },
  {
    type: "toggle",
    value: "move",
    label: "Move",
    icon: <Move3D className="size-6" />,
    classes:
      "data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500",
  },
  {
    type: "toggle",
    value: "rotate",
    label: "Rotate",
    icon: <Rotate3D className="size-6" />,
    classes:
      "data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500",
  },
  {
    type: "toggle",
    value: "scale",
    label: "Scale",
    icon: <Scale3D className="size-6" />,
    classes:
      "data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500",
  },
  {
    type: "separator",
    value: "separator1",
  },
];

const toolList = toolDefinitions.map((item) => {
  if (item.type === "toggle") {
    return (
      <Tooltip key={item.value}>
        <TooltipTrigger asChild>
          <span>
            <ToggleGroupItem
              // className={item.classes}
              size="lg"
              className="data-[state=on]:*:[svg]:stroke-blue-500 p-2"
              value={item.value}
              aria-label={item.label}
            >
              {item.icon}
            </ToggleGroupItem>
          </span>
        </TooltipTrigger>
        <TooltipContent side="left">{item.label}</TooltipContent>
      </Tooltip>
    );
  }

  if (item.type === "separator") {
    return <Separator key={item.value} />;
  }

  return null; // Fallback if the type is unrecognized
});

/**
 * Renders the Toolbar with tool toggles and settings button.
 */
export const Toolbar = () => {
  return (
    <aside className="flex flex-col border-r">
      <div className="flex flex-col items-center gap-4 px-2 py-5">
        <ToggleGroup
          type="single"
          variant="outline"
          spacing={2}
          className="flex flex-col"
        >
          {toolList}
        </ToggleGroup>
      </div>

      <div className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
};
