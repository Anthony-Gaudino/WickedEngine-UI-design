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
import { FolderPlus, FunnelX, ListFilter, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
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
            <Button variant="ghost">
              <ListFilter />
            </Button>
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
