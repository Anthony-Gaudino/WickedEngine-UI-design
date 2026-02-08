import { throttle } from "es-toolkit/function";
import { useState } from "react";
import { type PanelProps, usePanelRef } from "react-resizable-panels";
import { ResizablePanel } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Tabs as TabsType } from "../types";
import { CollapseExpandButton } from "./collapse-expand-button";

interface CollapsibleTabPanelProps {
  panelProps: Omit<PanelProps, "panelRef">;
  tabs: TabsType;
}

/**
 * Renders a collapsible tab panel.
 *
 * @param panelProps - The collapsible panel props.
 * @param tabs - The {@link TabsType} list of available tabs.
 */
export const CollapsibleTabPanel = ({
  panelProps,
  tabs,
}: CollapsibleTabPanelProps) => {
  const panelRef = usePanelRef();

  const [isCollapsed, setIsCollapsed] = useState(
    Boolean(panelRef.current?.isCollapsed()),
  );

  /**
   * List of tab buttons.
   */
  const tabTriggers = tabs.map(({ id, label }) => (
    <TabsTrigger key={id} value={id}>
      {label}
    </TabsTrigger>
  ));

  /**
   * List of tab content.
   */
  const tabContents = tabs.map(({ id, Content }) => (
    <TabsContent key={id} value={id}>
      <Content />
    </TabsContent>
  ));

  /**
   * Handles clicking on the collapse/expand button.
   *
   * Updates the state to collapsed or not.
   */
  const handleCollapseButtonClick = () => {
    const currentPanelVal = panelRef.current;
    const isCollapsed = currentPanelVal?.isCollapsed();

    isCollapsed ? currentPanelVal?.expand() : currentPanelVal?.collapse();

    setIsCollapsed(Boolean(!isCollapsed));
  };

  /**
   * Handles clicking anywhere in the tabs list container.
   *
   * If the panel is collapsed then we expand it.
   */
  const handleTabListClick = () => {
    const currentPanelVal = panelRef.current;
    const isCollapsed = Boolean(currentPanelVal?.isCollapsed());

    if (isCollapsed) {
      currentPanelVal?.expand();

      setIsCollapsed(false);
    }
  };

  /**
   * Handles resizing the panel.
   *
   * Checks wether the panel is collapsed or not and update the state.
   */
  const handleResize = throttle(() => {
    const currentPanelVal = panelRef.current;
    const isCollapsed = Boolean(currentPanelVal?.isCollapsed());

    setIsCollapsed(isCollapsed);
  }, 100);

  return (
    <ResizablePanel {...panelProps} panelRef={panelRef} onResize={handleResize}>
      <Tabs className="flex-1" defaultValue="entities">
        <div className="flex">
          <CollapseExpandButton
            isCollapsed={isCollapsed}
            onClick={handleCollapseButtonClick}
          />
          <TabsList className="w-full" onClick={handleTabListClick}>
            {tabTriggers}
          </TabsList>
        </div>
        {tabContents}
      </Tabs>
    </ResizablePanel>
  );
};
