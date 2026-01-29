import type { ItemInstance } from "@headless-tree/core";
import type { IndentStyle } from "./custom-tree-features/indent/types";
import type { Item } from "./types";

interface ItemIndentationProps {
  item: ItemInstance<Item>;
}

/**
 * Gets the indentation Tailwind classes given an indentation style.
 *
 * @param style The indentation style.
 *
 * @returns The Tailwind classes to style the indentation.
 */
const getIndentationClasses = (
  style: IndentStyle,
  isFolder: boolean,
  isLast: boolean,
) => {
  const indentationWidth = (() => {
    if (!isLast) return "w-2";

    return isFolder ? "w-2" : "w-7";
  })();
  const classes: string[] = ["relative ml-4", indentationWidth];

  switch (style.kind) {
    case "empty":
      break;

    case "line": {
      classes.push(
        "border-l",
        style.isHighlighted ? "border-white" : "border-gray-500",
      );

      break;
    }

    case "node": {
      // Base node lines
      classes.push(
        "border-l",
        "border-gray-500",
        "before:content-['']",
        "before:absolute",
        "before:w-full",
        "before:border-b",
        "before:h-[calc(50%+1px)]",
      );

      if (!style.isHighlighted) {
        classes.push("before:border-gray-500");
      } else {
        switch (style.highlightMode) {
          case "full": {
            classes.push("border-white", "before:border-white");

            break;
          }

          case "topAndHorizontal": {
            classes.push(
              "after:content-['']",
              "after:absolute",
              "after:top-0",
              "after:left-[-0.75px]",
              "after:h-[calc(50%+1px)]",
              "after:bg-white",
              "after:w-[0.75px]",
            );

            break;
          }

          case "vertical": {
            classes.push("border-white");

            break;
          }
        }
      }

      break;
    }

    case "lastNode": {
      classes.push(
        "border-s",
        "border-b",
        "h-[calc(50%+1px)]",
        "ms-[calc(50%-1px)]",
        "rounded-bl",
        style.isHighlighted ? "border-white" : "border-gray-500",
      );

      break;
    }
  }

  return classes.join(" ");
};

/**
 * Renders a tree item indentation.
 *
 * Indentation is formed by consecutive DIV elements.
 *
 * @param item - The tree item to generate the indentation for.
 *
 * @returns The indentation DIV elements.
 */
export const ItemIndentation = ({ item }: ItemIndentationProps) => {
  const indentationTypeList = item.getIndentationTypeList();
  const length = indentationTypeList.length;

  return indentationTypeList.map((style, i) => (
    <div
      key={`${style.kind}-${i}`}
      className={getIndentationClasses(
        style,
        item.isFolder(),
        i === length - 1,
      )}
    />
  ));
};
