import type { ItemInstance, TreeInstance } from "@headless-tree/core";

/**
 * Checks whether an items is a child of a filtered item.
 *
 * @param item - The item to check.
 *
 * @returns `true` if the item is a child of a filtered item, `false` otherwise.
 */
export const isChildOfFilteredItem = <T>(item: ItemInstance<T>) => {
  let parent = item.getParent();

  while (parent) {
    if (parent.isMatchingSearch()) return true;

    parent = parent.getParent();
  }

  return false;
};

/**
 * Checks whether an item is a parent of a filtered item.
 *
 * @param item - The item to check.
 *
 * @returns `true` if the item is a parent of a filtered item, `false`
 * otherwise.
 */
export const isParentOfFilteredItem = <T>(item: ItemInstance<T>) => {
  const tree = item.getTree();

  for (const filteredItem of tree.getSearchMatchingItems()) {
    if (filteredItem.isDescendentOf(item.getId())) return true;
  }

  return false;
};

/**
 * Get's all tree items independently if they are visible or not.
 *
 * @param tree - The tree instance.
 *
 * @returns A list of all tree items.
 */
export const getAllItems = <T>(tree: TreeInstance<T>) => {
  const allItems: ItemInstance<T>[] = [];
  const stack = [tree.getRootItem()];

  while (stack.length) {
    const item = stack.pop();

    if (!item) continue; // Should never happen!

    allItems.push(item);

    stack.push(...item.getChildren());
  }

  return allItems;
};
