import type { ItemInstance } from "@headless-tree/core";
import { FolderIcon, FolderOpenIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TreeItem, TreeItemLabel } from "@/components/ui/tree";
import type { Item } from "./types";

interface EntitiesTreeItemProps {
  item: ItemInstance<Item>;
}

/**
 * Renders a single entity tree item.
 *
 * @param item - The tree item to render.
 */
export function EntitiesTreeItem({ item }: EntitiesTreeItemProps) {
  const itemIcon = (() => {
    const iconSize = "size-5";
    const itemData = item.getItemData();
    const Icon = itemData.icon;
    const iconColor = itemData.iconColor;

    if (Icon) return <Icon className={`${iconSize} ${iconColor}`} />;

    if (item.isFolder()) {
      return item.isExpanded() ? (
        <FolderOpenIcon className={`${iconSize} text-amber-600`} />
      ) : (
        <FolderIcon className={`${iconSize} text-amber-600`} />
      );
    }

    return null;
  })();

  return (
    <TreeItem item={item} className="data-[visible=false]:hidden">
      <TreeItemLabel className="not-in-data-[folder=true]:ps-2">
        <span className="flex items-center gap-2">
          {itemIcon}

          {item.isRenaming() ? (
            <Input
              {...item.getRenameInputProps()}
              autoFocus
              className="-my-0.5 h-6 px-1"
            />
          ) : (
            item.getItemName()
          )}
        </span>
      </TreeItemLabel>
    </TreeItem>
  );
}
