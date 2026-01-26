/**
 * Filter feature which is built on top of the search feature, but hides items
 * that are not the matching item itself or it's children.
 */

import type { FeatureImplementation } from "@headless-tree/core";
import {
  getAllItems,
  isChildOfFilteredItem,
  isParentOfFilteredItem,
} from "./util";

declare module "@headless-tree/core" {
  export interface TreeState<T> {
    previousExpandedItemIds: string[];
  }
  // export interface TreeConfig<T> {
  //   setVisibleIds?: SetStateFn<Record<string, boolean>>;
  // }

  // export interface TreeState<T> {
  //   myCustomState: CustomType;
  // }
  // export interface TreeConfig<T> {
  //   setMyCustomState?: SetStateFn<CustomType>;
  // }

  export interface ItemInstance<T> {
    isFilteredVisible: boolean;
    getIsFilteredVisible: () => boolean;
    setIsFilteredVisible: () => void;
    setIsFilteredHidden: () => void;
    isFiltered: () => boolean;
    applyFilter: () => boolean;
  }

  export interface TreeInstance<T> {
    isFiltering: boolean;
    applyFilterToTree: () => void;
    restoreFilteredTree: () => void;
  }
}

// const defaultCanDropForeignDragObject = () => false;
export const filterFeature: FeatureImplementation = {
  getInitialState: (initialState) => ({
    previousExpandedItemIds: [],
    // isFiltering: false,
    ...initialState,
  }),

  treeInstance: {
    // getItemsMeta: ({ tree, prev }) => {
    //   const searchQuery = tree.getState().search;
    //   const baseMeta = prev?.() ?? [];
    // //   return baseMeta.map((meta) => ({
    // //     ...meta,
    // //     isVisibleAfterSearch: matchesSearch(tree, meta.itemId, searchQuery),
    // //   }));
    // },
    /**
     * Filters the tree using the current search query.
     */
    applyFilterToTree: ({ tree }) => {
      // const items = tree.getItems();
      const items = getAllItems(tree);
      const previousExpandedItems =
        tree.getState().previousExpandedItemIds ?? [];

      // Save currently expanded item IDs if they were not saved before
      // -----------------------------------------------------------------------
      if (!previousExpandedItems.length) {
        const previousExpandedItemIds: string[] = [];

        for (const item of items) {
          if (item.isFolder() && item.isExpanded()) {
            previousExpandedItemIds.push(item.getId());
          }
        }

        tree.applySubStateUpdate("previousExpandedItemIds", previousExpandedItemIds);

        // tree.setState((prev) => {
        //   if (prev.previousExpandedItemIds.length) return prev;

        //   return {
        //     ...prev,
        //     previousExpandedItemIds: previousExpandedItemIds,
        //   };
        // });
        
        // tree.setState((prev) => {
        //   debugger;
        //   if (prev.previousExpandedItemIds.length) return prev;

        //   return {
        //     ...prev,
        //     previousExpandedItemIds: [...tree.getState().expandedItems],
        //   };
        // });
        
      }

      // Expand items so that the filter is correctly applied
      // -----------------------------------------------------------------------
      for (const item of items) {
        // if (
        //   item.isFolder() &&
        //   !item.isExpanded() &&
        //   isParentOfFilteredItem(item)
        // ) {
        item.expand();
        // }
      }
    },

    /**
     *
     */
    restoreFilteredTree: ({ tree }) => {
      if (tree.getSearchValue()) return;

      const previousExpandedItems =
        tree.getState().previousExpandedItemIds ?? [];

      if (!previousExpandedItems.length) return;

      const items = getAllItems(tree);

      // Restore previous expanded items and collapses items that were not
      // expanded before
      for (const item of items) {
        if (
          item.isFolder() &&
          item.isExpanded() &&
          previousExpandedItems.includes(item.getId())
        ) {
          item.expand();
        } else {
          item.collapse();
        }
      }

      tree.applySubStateUpdate("previousExpandedItemIds", []);

      // tree.setState((prev) => {
      //   return {
      //     ...prev,
      //     previousExpandedItemIds: [],
      //   };
      // });
    },
  },

  itemInstance: {
    getIsFilteredVisible: ({ tree, item }) => {
      item.isMatchingSearch();
      if (!tree.getSearchValue()) return true;

      if (item.isMatchingSearch() || isChildOfFilteredItem(item)) {
        return true;
      }

      return false;
      // return item.isFilteredVisible;
    },

    setIsFilteredVisible: ({ tree, item }) => {
      item.isFilteredVisible = true;
    },

    setIsFilteredHidden: ({ tree, item }) => {
      item.isFilteredVisible = false;
    },

    /**
     * Checks is an item is filtered and visible,
     *
     * @returns `true` if the item is visible, `false` otherwise.
     */
    isFiltered: ({ tree, item }) => {
      const searchQuery = tree.getState().search;

      if (!searchQuery) return true;
    },

    /**
     * Checks is an item is filtered and visible,
     *
     * @returns `true` if the item is visible, `false` otherwise.
     */
    applyFilter: ({ tree, item }) => {
      const queryString = tree.getState().search;

      if (!queryString) return true;

      if (
        item.getItemName().toLowerCase().includes(queryString.toLowerCase())
      ) {
        if (item.isFolder()) {
          item.expandAll();
        }

        return true;
      }

      return false;
    },
  },
};
