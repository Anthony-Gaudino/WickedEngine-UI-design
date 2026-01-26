/**
 * General indentation style modifiers.
 */
type IndentationOptions = {
  /**
   * Specifies if the indentation link is highlighted.
   *
   * A link is highlighted in these conditions:
   *   * Innermost indentation link of selected node
   *   * A sibling under the item is selected
   *   * A child of a sibling under the item is selected
   *   * A child of the item is selected
   */
  isHighlighted: boolean;
};

/**
 * Narrowed IndentationOptions variant where highlight is false.
 */
type NotHighlightedIndentationOptions = IndentationOptions & {
  isHighlighted: false;
};

/**
 * Narrowed IndentationOptions variant where highlight is true.
 */
type HighlightedIndentationOptions = IndentationOptions & {
  isHighlighted: true;
};

/**
 * Node link indentation style modifiers.
 *
 * ## `full`
 *
 * Highlights the whole node link.
 *
 * ## `vertical`
 *
 * Specifies if the vertical link line will be highlighted.
 *
 * A not selected node will not be highlighted, but it's vertical line, can be
 * highlighted if:
 *   * A sibling under the item is selected
 *   * A child of a sibling under the item is selected
 *   * A child of the item is selected
 *
 * ## `topAndHorizontal`
 *
 * If the item is selected, but none of these are true:
 *   * A sibling under the item is selected
 *   * A child of a sibling under the item is selected
 *   * A child of the item is selected
 *
 * Then only the top half of the node vertical line and it's horizontal line
 * are highlighted.
 */
type NodeHighlightMode =
  | { highlightMode: "full" }
  | { highlightMode: "vertical" }
  | { highlightMode: "topAndHorizontal" };

type NodeIndentationOptions =
  | NotHighlightedIndentationOptions
  | (HighlightedIndentationOptions & NodeHighlightMode);

type NodeStyle = { kind: "node" } & NodeIndentationOptions;

/**
 * Indentation styles.
 *
 * These options are available:
 *   * `empty` - No link is rendered.
 *   * `line` - A vertical line is rendered
 *   * `node` - A vertical link with a node horizontal line (`├─`) is rendered.
 *   * `lastNode` - An `L` (`└─`) shaped link is rendered.
 *
 * The `empty` and `line` styles are only used for external indentation, while
 * the `node` and `lastNode` options are used for the innermost indentations;
 * `lastNode` for when there are no siblings under the node.
 */
export type IndentStyle =
  | { kind: "empty" }
  | ({ kind: "line" } & IndentationOptions)
  | NodeStyle
  | ({ kind: "lastNode" } & IndentationOptions);

/**
 * Indentation styles helper.
 */
export const IndentStyles = {
  /**
   * Empty indentation.
   *
   * @returns Empty indentation style object.
   */
  empty(): IndentStyle {
    return { kind: "empty" };
  },

  /**
   * Line indentation.
   *
   * @param indentationOptions - The line indentation options.
   *
   * @returns Line indentation style object.
   */
  line(indentationOptions: IndentationOptions): IndentStyle {
    return { kind: "line", ...indentationOptions };
  },

  /**
   * Node indentation.
   *
   * @param indentationOptions - The node indentation options.
   *
   * @returns Node indentation style object.
   */
  node(indentationOptions: NodeIndentationOptions): IndentStyle {
    return { kind: "node", ...indentationOptions };
  },

  /**
   * Last node indentation.
   *
   * @param indentationOptions - The last node indentation options.
   *
   * @returns Last node indentation style object.
   */
  lastNode(indentationOptions: IndentationOptions): IndentStyle {
    return { kind: "lastNode", ...indentationOptions };
  },
};
