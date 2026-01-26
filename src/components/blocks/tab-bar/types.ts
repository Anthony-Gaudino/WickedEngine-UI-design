import type { ReactElement } from "react";

/**
 * A WickedEngine Scene or 3D model tab.
 */
export interface Tab {
  /** The tab ID */
  id: string;

  /** The tab label displayed on the tab */
  label: string;

  /** The type of document opened, a WickedEngine wiscene or a 3D model */
  documentType: "scene" | "model";

  /** If the scene or 3D model has unsaved changes */
  unsaved: boolean;

  /** The tab content, 3D viewport, toolbar, siderbar and statusbar */
  content: ReactElement;
}
