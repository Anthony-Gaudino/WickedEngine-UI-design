import type { TreeInstance } from "@headless-tree/core";
import { AssistiveTreeDescription } from "@headless-tree/react";
import { Tree, TreeDragLine } from "@/components/ui/tree";
import { EntitiesTreeItem } from "./entities-tree-item";
import { ItemIndentation } from "./item-indentation";
import type { Item } from "./types";

interface EntitiesTreeViewProps {
  tree: TreeInstance<Item>;
  indent: number;
}

/**
 * Renders the entities tree view.
 *
 * @param tree - The tree instance to render.
 * @param indent - The indentation size.
 */
export function EntitiesTreeView({ tree, indent }: EntitiesTreeViewProps) {
  return (
    <Tree tree={tree} indent={0} className="relative">
      <AssistiveTreeDescription tree={tree} />

      {tree.getItems().map((item) => {
        return (
          <div className="flex h-8" key={item.getId()}>
            <ItemIndentation item={item} />
            <EntitiesTreeItem item={item} />
          </div>
        );
      })}
      <TreeDragLine />
    </Tree>
  );
}
