import type { LucideIcon } from "lucide-react";

/**
 * An entity tree item.
 */
export interface Item {
  /**
   * Entity UUID.
   */
  name: string;

  /**
   * Parent UUID.
   */
  parentID: string | null;

  /**
   * Array of children IDs.
   */
  children: string[];

  /**
   * Entity icon.
   */
  icon: LucideIcon | undefined;

  /**
   * Entity icon color.
   */
  iconColor: string;

  /**
   * Whether the entity is visible or not.
   */
  isVisible: boolean;

  /**
   * Whether the entity is locked or not.
   */
  isLocked: boolean;

  /**
   * Entity tag ID.
   */
  tagID: string | null;
}
