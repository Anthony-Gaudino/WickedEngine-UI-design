import {
  Box,
  Boxes,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  SearchX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Tab } from "./types";

interface ControlsProps {
  tabs: Tab[];
  activeTab: string | undefined;
  onSelect: (id: string) => void;
  onScroll: (dir: number) => void;
  addTab: () => void;
}

/**
 * Renders tab bar controls including add tab, scroll, and tab selection menu.
 */
export const Controls = ({
  tabs,
  activeTab,
  onSelect,
  onScroll,
  addTab,
}: ControlsProps) => {
  return (
    <>
      <Button variant="ghost" size="icon" onClick={addTab}>
        <Plus className="size-6" />
      </Button>

      <ButtonGroup>
        <Button variant="ghost" size="icon-sm" onClick={() => onScroll(-1)}>
          <ChevronLeft className="size-6" />
        </Button>

        <Button variant="ghost" size="icon-sm" onClick={() => onScroll(1)}>
          <ChevronRight className="size-6" />
        </Button>
      </ButtonGroup>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <ChevronDown className="size-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command className="*:data-[slot=command-input-wrapper]:border *:data-[slot=command-input-wrapper]:m-4">
            <CommandInput placeholder="Search tabs..." className="border-b-0" />
            <CommandList>
              <CommandEmpty>
                <div className="flex flex-col items-center gap-2">
                  <SearchX className="w-8 h-8 text-gray-600 opacity-50" />
                  <span className="text-xs text-gray-500 font-medium">
                    No tabs found
                  </span>
                </div>
              </CommandEmpty>
              <CommandGroup>
                {tabs.map((tab) => (
                  <CommandItem
                    key={tab.id}
                    value={tab.id}
                    onSelect={() => onSelect(tab.id)}
                    data-selected={false}
                    className={cn(
                      "flex content-between border-l-2 border-transparent",
                      { "border-amber-500": activeTab === tab.id },
                    )}
                  >
                    <span className="flex flex-1 gap-2">
                      {tab.documentType === "scene" ? (
                        <Boxes
                          className={cn({
                            "text-amber-600": activeTab === tab.id,
                          })}
                        />
                      ) : (
                        <Box
                          className={cn({
                            "text-amber-600": activeTab === tab.id,
                          })}
                        />
                      )}
                      <span className="truncate flex-1">{tab.label}</span>
                    </span>
                    {tab.unsaved && (
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
