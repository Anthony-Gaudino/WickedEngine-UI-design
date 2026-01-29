import type { ItemInstance } from "@headless-tree/core";
import {
  ArrowDownFromLine,
  ArrowUpFromLine,
  Clapperboard,
  Copy,
  FolderIcon,
  FolderOpenIcon,
  ListChevronsDownUp,
  Pencil,
  Plus,
  Scissors,
  SquareStack,
  Trash2,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
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
        <ContextMenu>
          <ContextMenuTrigger asChild>
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
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuGroup>
              <ContextMenuItem>
                <Plus />
                Add Child Node...
                <ContextMenuShortcut>Ctrl+A</ContextMenuShortcut>
              </ContextMenuItem>

              <ContextMenuItem>
                <Clapperboard />
                Instantiate Child Scene...
                <ContextMenuShortcut>Ctrl+Shift+A</ContextMenuShortcut>
              </ContextMenuItem>

              <ContextMenuItem>
                <ListChevronsDownUp /> Expand/Collapse Branch
              </ContextMenuItem>

              <ContextMenuSeparator />

              <ContextMenuItem>
                <Scissors />
                Cut
                <ContextMenuShortcut>Ctrl+X</ContextMenuShortcut>
              </ContextMenuItem>

              <ContextMenuItem>
                <Copy />
                Copy
                <ContextMenuShortcut>Ctrl+C</ContextMenuShortcut>
              </ContextMenuItem>

              <ContextMenuSeparator />

              <ContextMenuItem>
                <Pencil />
                Rename
                <ContextMenuShortcut>F2</ContextMenuShortcut>
              </ContextMenuItem>

              <ContextMenuSeparator />

              <ContextMenuItem>
                <ArrowUpFromLine />
                Move Up
                <ContextMenuShortcut>Ctrl+↑</ContextMenuShortcut>
              </ContextMenuItem>

              <ContextMenuItem>
                <ArrowDownFromLine />
                Move Down
                <ContextMenuShortcut>Ctrl+↓</ContextMenuShortcut>
              </ContextMenuItem>

              <ContextMenuItem>
                <SquareStack />
                Duplicate
                <ContextMenuShortcut>Ctrl+D</ContextMenuShortcut>
              </ContextMenuItem>

              <ContextMenuItem>Reparent</ContextMenuItem>

              <ContextMenuItem>Selected to New Scene...</ContextMenuItem>

              <ContextMenuSeparator />

              <ContextMenuItem variant="destructive">
                <Trash2 />
                Delete
                <ContextMenuShortcut>Del</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
      </TreeItemLabel>
    </TreeItem>
  );
}
