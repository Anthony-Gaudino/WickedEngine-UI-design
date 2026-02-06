import {
  createOnDropHandler,
  dragAndDropFeature,
  expandAllFeature,
  hotkeysCoreFeature,
  keyboardDragAndDropFeature,
  renamingFeature,
  selectionFeature,
  syncDataLoaderFeature,
  type TreeInstance,
} from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import {
  Axis3D,
  Circle,
  CloudSun,
  FolderPlus,
  FunnelX,
  ListFilter,
  MountainSnow,
  PaintBucket,
  Plus,
} from "lucide-react";
import { useMemo, useState } from "react";
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
import { indentFeature } from "./custom-tree-features/indent/feature";
import { EntitiesSearch } from "./entities-search";
import { EntitiesTreeView } from "./entities-tree-view";
import {
  indent,
  initialExpandedItems,
  initialItems,
  initialSelectedItems,
  rootItemId,
} from "./tree-config";
import type { Item } from "./types";

/**
 * Renders the scene entities list tree along with the filter input.
 */
export default function EntitiesList() {
  const [items, setItems] = useState(initialItems);
  const [filterQueryString, setFilterQueryString] = useState("");

  /**
   * Filters the items based on the provided filter string.
   * If an item that matches the filter has children, those children are
   * included.
   *
   * @param queryString The filter string to apply.
   *
   * @returns The filtered items.
   */
  const filteredItems = useMemo(() => {
    if (!filterQueryString) return items;

    const query = filterQueryString.toLowerCase();
    const result: Record<string, Item> = {};

    // Root is always present as a container
    const rootItem: Item = { ...items[rootItemId], children: [] } as Item;
    result[rootItemId] = rootItem;

    /**
     * Returns IDs of matching nodes that should be attached to the nearest
     * matching ancestor (or root).
     *
     * @param id The current item ID.
     *
     * @returns The IDs of matching descendant items.
     */
    const dfs = (id: string): string[] => {
      const item = items[id];

      if (!item) return [];

      const matchedDescendants: string[] = [];

      for (const childId of item.children) {
        matchedDescendants.push(...dfs(childId));
      }

      const selfMatches = item.name.toLowerCase().includes(query);

      if (selfMatches) {
        // This node becomes a parent for all matched descendants
        result[id] = { ...item, children: matchedDescendants };

        return [id];
      }

      // Parent doesn't match → bubble matches upward
      return matchedDescendants;
    };

    const topLevelMatches = dfs(rootItemId);
    rootItem.children = topLevelMatches;

    return result;
  }, [items, filterQueryString]);

  /**
   * Indicates whether there are any results for the current filter.
   */
  const hasFilterResults = (() => {
    const rootItem = filteredItems[rootItemId];

    if (!rootItem) return false;

    return rootItem.children.length > 0;
  })();

  const tree = useTree({
    rootItemId: rootItemId,
    indent,
    dataLoader: {
      getItem: (id) => filteredItems[id],
      getChildren: (id) => filteredItems[id]?.children ?? [],
    },
    features: [
      dragAndDropFeature,
      expandAllFeature,
      hotkeysCoreFeature,
      keyboardDragAndDropFeature,
      renamingFeature,
      selectionFeature,
      syncDataLoaderFeature,
      indentFeature,
    ],
    initialState: {
      expandedItems: initialExpandedItems,
      selectedItems: initialSelectedItems,
    },
    isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
    getItemName: (item) => item.getItemData()?.name ?? "",
    onRename: (item, name) => {
      const itemID = item.getId();

      setItems((s) => {
        const item = s[itemID];

        if (!item) return s;

        return { ...s, [itemID]: { ...item, name } };
      });

      tree.scheduleRebuildTree();
    },
    onDrop: createOnDropHandler((parent, children) => {
      const parentID = parent.getId();

      setItems((s) => {
        const item = s[parentID];

        if (!item) return s;

        return { ...s, [parentID]: { ...item, children } };
      });

      tree.scheduleRebuildTree();
    }),
    canDrag() {
      return filterQueryString.length === 0;
    },
  }) as TreeInstance<Item>;

  const onFilterChange = (value: string) => {
    setFilterQueryString(value);

    tree.scheduleRebuildTree();
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex gap-2">
        <EntitiesSearch
          value={filterQueryString}
          onChange={onFilterChange}
          onClear={() => onFilterChange("")}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">
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
                      <h5 className="leading-none uppercase text-sm">
                        Components
                      </h5>

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
                      <h5 className="leading-none uppercase text-sm">
                        Visibility
                      </h5>
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
      </div>

      {!hasFilterResults ? (
        <div className="flex flex-col items-center gap-2 py-10">
          <FunnelX className="w-8 h-8 text-gray-600 opacity-50" />
          <span className="text-xs text-gray-500 font-medium">
            No entities found
          </span>
        </div>
      ) : (
        <EntitiesTreeView tree={tree} indent={indent} />
      )}
    </div>
  );
}
