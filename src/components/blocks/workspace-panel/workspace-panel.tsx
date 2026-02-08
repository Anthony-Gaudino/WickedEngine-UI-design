import { useGroupRef } from "react-resizable-panels";
import { EntityPanel } from "@/components/blocks/entities-panel/entity-panel";
import {
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CollapsibleTabPanel } from "./collapsible-tab-panel/collapsible-tab-panel";
import type { Tabs } from "./types";

const TOP_PANEL_TABS: Tabs = [
  { id: "entities", label: "Entities", Content: EntityPanel },
  { id: "components", label: "Components", Content: EntityPanel },
  { id: "settings", label: "Settings", Content: EntityPanel },
] as const;

const BOTTOM_PANEL_TABS: Tabs = [
  { id: "file-system", label: "File system", Content: EntityPanel },
  { id: "components", label: "Components", Content: EntityPanel },
  { id: "settings", label: "Settings", Content: EntityPanel },
] as const;

interface WorkspacePanelProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const WorkspacePanel = ({
  /*activeTab, onTabChange*/
}: WorkspacePanelProps) => {
  const panelGroupRef = useGroupRef();

  /**
   * Handles double click on the resize handle.
   *
   * When the resize handle is double clicked we divide the panels in the
   * middle (50% height for each).
   */
  const handleHandleDoubleClick = () => {
    panelGroupRef.current?.setLayout({ topPanel: 50, bottomPanel: 50 });
  };

  const handleLayoutChanged = () => {};

  return (
    <aside className="flex flex-col flex-1">
      <ResizablePanelGroup
        groupRef={panelGroupRef}
        orientation="vertical"
        onLayoutChange={handleLayoutChanged}
      >
        <CollapsibleTabPanel
          panelProps={{
            id: "topPanel",
            defaultSize: "50%",
            minSize: 35,
            collapsible: true,
            collapsedSize: 35,
          }}
          tabs={TOP_PANEL_TABS}
        />
        <ResizableHandle withHandle onDoubleClick={handleHandleDoubleClick} />
        <CollapsibleTabPanel
          panelProps={{
            id: "bottomPanel",
            defaultSize: "50%",
            minSize: 35,
            collapsible: true,
            collapsedSize: 35,
          }}
          tabs={BOTTOM_PANEL_TABS}
        />
      </ResizablePanelGroup>
    </aside>
  );
};
