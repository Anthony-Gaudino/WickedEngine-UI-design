import { FolderPlus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AddEntityPanel } from "../add-entity-panel/add-entity-panel";
import EntitiesList from "../entities-list/entities-list";
import { EntitiesSearch } from "./entities-search";
import { EntityFilterPopover } from "./entity-tree-filter-control";

/**
 * Renders a panel that displays the entities tree with a toolbar that allows
 * adding new entities, a directory and filtering by text or by a series of
 * filters provided on a panel.
 */
export function EntityPanel() {
  const [filterQueryString, setFilterQueryString] = useState("");
  const [isDisplayingAddEntityPanel, setIsDisplayingAddEntityPanel] =
    useState(false);

  const onFilterChange = (value: string) => {
    setFilterQueryString(value);
  };

  const handleAddEntityClick = () => {
    setIsDisplayingAddEntityPanel(!isDisplayingAddEntityPanel);
  };

  return (
    <div className="flex h-full flex-col gap-2 p-2">
      <div className="flex gap-2">
        <EntitiesSearch
          value={filterQueryString}
          onChange={onFilterChange}
          onClear={() => onFilterChange("")}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" onClick={handleAddEntityClick}>
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Add entity</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
              <FolderPlus />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Add folder</TooltipContent>
        </Tooltip>

        <EntityFilterPopover />
      </div>

      {!isDisplayingAddEntityPanel ? (
        <EntitiesList filterQueryString={filterQueryString} />
      ) : (
        <AddEntityPanel />
      )}
    </div>
  );
}
