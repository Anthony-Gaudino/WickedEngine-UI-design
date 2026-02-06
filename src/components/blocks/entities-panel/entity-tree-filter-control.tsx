import {
  Axis3D,
  Circle,
  CloudSun,
  ListFilter,
  MountainSnow,
  PaintBucket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Renders a button that has a variety of filters that can be applied to the
 * entity tree.
 */
export const EntityFilterPopover = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost">
              <ListFilter />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-100" align="end">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h4 className="leading-none font-medium">Filters</h4>
                <Button variant="ghost">Reset</Button>
              </div>
              <Separator />
              <div className="grid items-center gap-6">
                <div className="flex flex-col gap-4">
                  <h5 className="leading-none uppercase text-sm">Components</h5>

                  <ToggleGroup
                    type="multiple"
                    variant="outline"
                    spacing={2}
                    size="lg"
                  >
                    <ToggleGroupItem value="weather" aria-label="Weather">
                      <CloudSun />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="terrain" aria-label="Terrain">
                      <MountainSnow />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="material" aria-label="Material">
                      <PaintBucket />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="position" aria-label="Position">
                      <Axis3D />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="grid items-center gap-4">
                  <h5 className="leading-none uppercase text-sm">Tags</h5>
                  <ToggleGroup
                    className="flex-wrap"
                    type="multiple"
                    variant="outline"
                    spacing={2}
                  >
                    <ToggleGroupItem value="gameplay" aria-label="Gameplay">
                      <Circle className="size-3" /> Gameplay
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="player-triggers"
                      aria-label="Player triggers"
                    >
                      <Circle className="size-3" /> Player triggers
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="audio-triggers"
                      aria-label="Audio triggers"
                    >
                      <Circle className="size-3" /> Audio triggers
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="player-boundaries"
                      aria-label="Player boundaries"
                    >
                      <Circle className="size-3" /> Player boundaries
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="grid items-center gap-4">
                  <h5 className="leading-none uppercase text-sm">Visibility</h5>
                  <ToggleGroup
                    className="w-full"
                    type="single"
                    variant="outline"
                  >
                    <ToggleGroupItem
                      className="flex-1"
                      value="all"
                      aria-label="All"
                    >
                      All
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      className="flex-1"
                      value="visible"
                      aria-label="Visible"
                    >
                      Visible
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      className="flex-1"
                      value="hidden"
                      aria-label="Hidden"
                    >
                      Hidden
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="grid items-center gap-4">
                  <h5 className="leading-none uppercase text-sm">Locked</h5>
                  <ToggleGroup
                    className="w-full"
                    type="single"
                    variant="outline"
                  >
                    <ToggleGroupItem
                      className="flex-1"
                      value="all"
                      aria-label="All"
                    >
                      All
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      className="flex-1"
                      value="locked"
                      aria-label="Locked"
                    >
                      Locked
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      className="flex-1"
                      value="unlocked"
                      aria-label="Unlocked"
                    >
                      Unlocked
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="grid items-center gap-4">
                  <h5 className="leading-none uppercase text-sm">Status</h5>
                  <ToggleGroup
                    className="w-full"
                    type="single"
                    variant="outline"
                  >
                    <ToggleGroupItem
                      className="flex-1"
                      value="all"
                      aria-label="All"
                    >
                      All
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      className="flex-1"
                      value="selected"
                      aria-label="Selected"
                    >
                      Selected
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      className="flex-1"
                      value="unselected"
                      aria-label="Unselected"
                    >
                      Unselected
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </TooltipTrigger>
      <TooltipContent side="bottom">Filter</TooltipContent>
    </Tooltip>
  );
};
