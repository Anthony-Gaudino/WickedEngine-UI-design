import type { ReactNode } from "react";

/**
 * Toolbar toggle button
 */
interface ToolbarToggle {
  /**
   * Type of toolbar element
   */
  type: "toggle";

  /**
   * Value of toggle and list key
   */
  value: string;

  /**
   * Aria-label and tooltip
   */
  label: string;

  /**
   * Toggle button icon
   */
  icon: ReactNode;

  /**
   * Toggle button classes
   */
  classes: string;
}

/**
 * Toolbar separator
 */
interface SeparatorItem {
  /**
   * Type of toolbar element
   */
  type: "separator";

  /**
   * List key
   */
  value: string;
}

/**
 * Toolbar elements (toggle button or separator)
 */
export type ToolDefinition = ToolbarToggle | SeparatorItem;
