import {
  createOnDropHandler,
  dragAndDropFeature,
  expandAllFeature,
  hotkeysCoreFeature,
  keyboardDragAndDropFeature,
  renamingFeature,
  searchFeature,
  selectionFeature,
  syncDataLoaderFeature,
  type TreeInstance,
} from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { FunnelX } from "lucide-react";
import { useState } from "react";
import { filterFeature } from "./custom-tree-features/filter/feature";
import { indentFeature } from "./custom-tree-features/indent/feature";
import { EntitiesSearch } from "./entities-search";
import { EntitiesTreeView } from "./entities-tree-view";
import { indent, initialExpandedItems, initialItems } from "./tree-config";
import type { Item } from "./types";

/**
 * Renders the scene entities list tree along with the search input.
 */
export default function EntitiesList() {
  const [items, setItems] = useState(initialItems);
  const tree = useTree({
    rootItemId: "root",
    indent,
    dataLoader: {
      getItem: (id) => items[id],
      getChildren: (id) => items[id]?.children ?? [],
    },
    features: [
      dragAndDropFeature,
      expandAllFeature,
      hotkeysCoreFeature,
      keyboardDragAndDropFeature,
      renamingFeature,
      searchFeature,
      selectionFeature,
      syncDataLoaderFeature,
      indentFeature,
      filterFeature,
    ],
    initialState: {
      expandedItems: initialExpandedItems,
      selectedItems: ["weather"],
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
    },
    onDrop: createOnDropHandler((parent, children) => {
      const parentID = parent.getId();

      setItems((s) => {
        const item = s[parentID];

        if (!item) return s;

        return { ...s, [parentID]: { ...item, children } };
      });
    }),
  }) as TreeInstance<Item>;

  const onFilterChange = (value: string) => {
    tree.setSearch(value);

    if (value) {
      tree.applyFilterToTree();
    } else {
      tree.restoreFilteredTree();
    }
  };

  const currentFilterValue = tree.getSearchValue();
  const hasFilterMatches = tree.getSearchMatchingItems().length > 0;
  const hasNoFilterResults = currentFilterValue && !hasFilterMatches;

  return (
    <div className="flex h-full flex-col gap-2">
      <EntitiesSearch
        value={currentFilterValue}
        onChange={onFilterChange}
        onClear={() => onFilterChange("")}
      />

      {hasNoFilterResults ? (
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
