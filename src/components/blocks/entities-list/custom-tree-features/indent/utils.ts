/**
 * @file Tree item utility functions.
 *
 * Assumes stable parent-child ordering as provided by ItemInstance.
 *
 * TODO: For large trees results from hasSelectedDescendant and
 * isAboveSelectedItem could be cached per tree item to avoid iterating the
 * tree.
 */

import type { ItemInstance } from "@headless-tree/core";

/**
 * Checks whether an item is the tree root item.
 *
 * @param item - The tree item to check.
 *
 * @return `true` if the item is the tree root item, `false` otherwise.
 */
export const isTreeRoot = <T>(item: ItemInstance<T>) => {
  return item === item.getTree().getRootItem();
};

/**
 * Returns the number of children of the parent, or 0 if no parent.
 *
 * Always returns 0 for a root element and at least 1 for any other element.
 *
 * @param item - The tree item to obtain the number of parent children.
 *
 * @returns The number of children of a tree item parent.
 */
export const getNumParentChildren = <T>(item: ItemInstance<T>) => {
  return item.getParent()?.getChildren().length ?? 0;
};

/**
 * Determines whether the given item has siblings above it.
 *
 * @param item - The tree item to test.
 *
 * @returns `true` if the item has siblings above it.
 */
export const hasSiblingsAbove = <T>(item: ItemInstance<T>) => {
  return item.getIndexInParent() > 0;
};

/**
 * Checks whether the given item is its parent’s last child and has no siblings
 * below it.
 *
 * An item is considered the "last leaf" if there is no sibling item
 * below it in the tree.
 *
 * @param item - The item to test
 *
 * @returns `true` if the item has no item below it, otherwise `false`
 */
export const isLastChild = <T>(item: ItemInstance<T>) => {
  return item.getIndexInParent() === getNumParentChildren(item) - 1;
};

/**
 * Computes the depth of an item within the tree.
 *
 * Depth is defined as the number of ancestors above the item.
 * - Root items have a depth of `0`
 * - Each parent level increases depth by `1`
 *
 * @param item - The tree item whose depth should be calculated.
 *
 * @returns The depth of the item in the tree.
 */
export const getDepth = <T>(item: ItemInstance<T>): number => {
  let depth = 0;
  let current = item.getParent();

  while (current) {
    depth++;
    current = current.getParent();
  }

  return depth;
};

/**
 * Gets a list of siblings below the given item if any.
 *
 * @param item - The item to get the siblings from.
 *
 * @return A list of siblings below the given item.
 */
export const getSiblingsBelow = <T>(item: ItemInstance<T>) => {
  const parent = item.getParent();

  if (!parent) return [];

  const startIndex = item.getIndexInParent() + 1;
  const parentChildren = parent.getChildren();

  return parentChildren.slice(startIndex);
};

/**
 * Checks if a given tree item has a selected descendant.
 *
 * Performs a Depth-First Search (stack-based) ignoring order and returns as
 * soon as a selected descendant is found.
 *
 * Leaf items always return false.
 *
 * @param item the tree item to check.
 *
 * @returns `true` if there's a selected descendant, `false` otherwise.
 */
export const hasSelectedDescendant = <T>(item: ItemInstance<T>): boolean => {
  if (!item.isFolder()) return false;

  const stack = [...item.getChildren()];

  while (stack.length > 0) {
    const current = stack.pop();

    if (!current) continue; // Should never happen!

    if (current.isSelected()) return true;

    if (current.isFolder()) stack.push(...current.getChildren());
  }

  return false;
};

/**
 * Checks whether an item is above a selected item.
 *
 * If a sibling below the item or a descendant of a sibling below the item, in
 * any depth, is selected, then the child is above a selected item in the tree.
 *
 * Note that we are not checking if the item has children here.
 *
 * @param item - The item to test.
 *
 * @return `true` if the item is above a selected item, `false` otherwise.
 */
export const isAboveSelectedItem = <T>(item: ItemInstance<T>): boolean => {
  if (isTreeRoot(item)) {
    const tree = item.getTree();

    const selected = tree.getSelectedItems();

    // If has selected then the root must be a parent of it, we don't count the
    // root if itself is selected
    return !item.isSelected() && selected.length > 0;
  }

  const siblingsBelow = getSiblingsBelow(item);

  // Check for selected items in leaf sibling and internal node sibling
  return siblingsBelow.some(
    (sibling) =>
      sibling.isSelected() ||
      (sibling.isFolder() && hasSelectedDescendant(sibling)),
  );
};
