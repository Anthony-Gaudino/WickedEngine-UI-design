import type { FeatureImplementation } from "@headless-tree/core";
import { type IndentStyle, IndentStyles } from "./types";
import {
  getDepth,
  hasSelectedDescendant,
  isAboveSelectedItem,
  isLastChild,
  isTreeRoot,
} from "./utils";

declare module "@headless-tree/core" {
  export interface ItemInstance<T> {
    getIndentationTypeList: () => IndentStyle[];
  }

  export interface TreeInstance<T> {
    getVisibleTree: () => void;
  }
}

// const defaultCanDropForeignDragObject = () => false;
export const indentFeature: FeatureImplementation = {
  key: "indent",

  treeInstance: {
    /**
     * Gets the currently visible tree structure, taking into account if the
     * tree is filtered.
     *
     * @returns
     */
    getVisibleTree: ({ tree }) => {
      if (!tree.getState().search) {
        return tree;
      }

      tree.getItems();
      tree.loadItemData
    },
  },

  itemInstance: {
    /**
     * Obtains a list of indentations that will be applied to an item.
     *
     * @param item - The item generate the indentations for.
     *
     * @returns an array with the indentations.
     */
    getIndentationTypeList: ({ item }) => {
      const depth = getDepth(item);

      if (depth === 0) return []; // Root has no indentation

      const indentationList: IndentStyle[] = [];

      // Innermost indentation: the item itself
      // -----------------------------------------------------------------------
      if (isLastChild(item)) {
        indentationList.push(
          IndentStyles.lastNode({
            isHighlighted: item.isSelected() || hasSelectedDescendant(item),
          }),
        );
      } else {
        if (item.isSelected()) {
          indentationList.push(
            IndentStyles.node({
              isHighlighted: true,
              highlightMode: isAboveSelectedItem(item)
                ? "full"
                : "topAndHorizontal",
            }),
          );
        } else {
          const itemHasSelectedDescendant = hasSelectedDescendant(item);
          const itemIsAboveSelectedItem = isAboveSelectedItem(item);

          if (itemIsAboveSelectedItem && itemHasSelectedDescendant) {
            indentationList.push(
              IndentStyles.node({ isHighlighted: true, highlightMode: "full" }),
            );
          } else if (itemIsAboveSelectedItem) {
            indentationList.push(
              IndentStyles.node({
                isHighlighted: true,
                highlightMode: "vertical",
              }),
            );
          } else if (itemHasSelectedDescendant) {
            indentationList.push(
              IndentStyles.node({
                isHighlighted: true,
                highlightMode: "topAndHorizontal",
              }),
            );
          } else {
            indentationList.push(IndentStyles.node({ isHighlighted: false }));
          }
        }
      }

      // Outer indentations: parent nodes
      // -----------------------------------------------------------------------
      let parent = item.getParent();

      while (parent && !isTreeRoot(parent)) {
        if (isLastChild(parent)) {
          indentationList.push(IndentStyles.empty());
        } else {
          indentationList.push(
            IndentStyles.line({ isHighlighted: isAboveSelectedItem(parent) }),
          );
        }

        parent = parent.getParent();
      }

      return indentationList.reverse();
    },
  },
};
