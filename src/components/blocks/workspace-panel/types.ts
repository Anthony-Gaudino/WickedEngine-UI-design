import type { ComponentType } from "react";

/**
 * A single tab panel tab.
 */
export interface Tab {
  /**
   * The tab ID (value).
   */
  id: string;

  /**
   * The tab UI label.
   */
  label: string;

  /**
   * The tab content.
   */
  Content: ComponentType;
}

/**
 * A list of {@link Tab}.
 */
export type Tabs = Tab[];
