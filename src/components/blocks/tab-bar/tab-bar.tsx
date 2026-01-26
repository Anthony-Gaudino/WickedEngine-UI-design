import * as ScrollArea from "@radix-ui/react-scroll-area";
import { AppWindowIcon, Boxes, CodeIcon, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Toolbar } from "@/components/blocks/toolbar/toolbar";
import { Viewport } from "@/components/blocks/viewport/viewport";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CharacterModel } from "../viewport/character";
import { Level } from "../viewport/level";
import { WorkspacePanel } from "../workspace-panel/workspace-panel";
import { Controls } from "./controls";
import { TabItem } from "./tab-item";
import type { Tab } from "./types";

/**
 * Renders the Tab Bar with open tabs and their contents; and also the tab bar
 * controls.
 */
export const TabBar = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [activeTab, setActiveTab] = useState<string | undefined>(
    "MainScene.wiscene",
  );
  const [confirmCloseTab, setConfirmCloseTab] = useState<Tab | null>(null);
  const [showTabList, setShowTabList] = useState(false);

  /**
   * List of open tabs.
   */
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "MainScene.wiscene",
      label: "MainScene.wiscene",
      documentType: "scene",
      unsaved: true,
      content: (
        <ResizablePanelGroup>
          <ResizablePanel>
            <Level />
          </ResizablePanel>
          <ResizableHandle
            className="
              data-[separator=hover]:ring-ring
              data-[separator=hover]:ring-1
              data-[separator=hover]:ring-offset-1
              data-[separator=active]:ring-ring
              data-[separator=active]:ring-1
              data-[separator=active]:ring-offset-1
            "
            // style={{ boxShadow: "none" }}
          />
          <ResizablePanel
            className="flex flex-row"
            defaultSize={300}
            minSize={58}
            maxSize="50%"
          >
            <Toolbar />
            <WorkspacePanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      ),
    },
    {
      id: "Character_Base.obj",
      label: "Character_Base.obj",
      documentType: "model",
      unsaved: false,
      content: <CharacterModel />,
    },
  ]);

  /**
   * Scrolls to the active tab.
   */
  useEffect(() => {
    // if (activeTab) {
    //   const activeEl = document.getElementById(`tab-${activeTab}`);
    //   activeEl?.scrollIntoView({
    //     behavior: "smooth",
    //     block: "nearest",
    //     inline: "nearest",
    //   });
    // }

    if (!activeTab) return;

    tabRefs.current[activeTab]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [activeTab]);

  /**
   * Scrolls tabbar using the mouse wheel.
   */
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      // Adjust scroll speed by multiplying e.deltaY if needed
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  /**
   * Scroll the tabs container to a certain direction, +1 right, -1 left.
   *
   * @param direction
   */
  const scrollTabs = (direction: number) => {
    scrollContainerRef.current?.scrollBy({
      left: direction * 200,
      behavior: "smooth",
    });
  };

  /**
   * Adds a tab to the list of open tabs.
   */
  const addTab = () => {
    const newId = `untitled-${Date.now()}`;
    const newTab: Tab = {
      id: newId,
      label: "Untitled.wiscene",
      documentType: "scene",
      unsaved: false,
      content: <Viewport />,
    };

    setTabs([...tabs, newTab]);
    setActiveTab(newId);
  };

  /**
   * Closes a tab, removing it from the list of open tabs.
   *
   * @param tabId - The Tab ID.
   */
  const closeTab = (tabId: string) => {
    const newTabs = tabs.filter((t) => t.id !== tabId);

    setTabs(newTabs);

    if (activeTab === tabId) {
      const lastTab = newTabs.at(-1);
      setActiveTab(lastTab?.id ?? null);
    }

    setConfirmCloseTab(null);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
      <div className="flex">
        <TabsList
          ref={scrollContainerRef}
          className="rounded-none size-full justify-start overflow-x-hidden"
          onWheel={handleWheel}
        >
          {tabs.map((tab) => (
            <TabItem
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              onClose={(t) =>
                t.unsaved ? setConfirmCloseTab(t) : closeTab(t.id)
              }
            />
          ))}
          {/* <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger> */}
        </TabsList>
        <div className="h-8 flex items-center px-2 shrink-0">
          {/* <Button variant="ghost" size="icon" onClick={addTab}>
              <Plus className="size-6" />
            </Button> */}
          <Controls
            tabs={tabs}
            activeTab={activeTab}
            onSelect={setActiveTab}
            onScroll={scrollTabs}
            isOpen={showTabList}
            setIsOpen={setShowTabList}
            addTab={addTab}
          />
        </div>
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} asChild>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
