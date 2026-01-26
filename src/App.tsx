import { MenuBar, TabBar } from "@/components/blocks";
import { ThemeProvider } from "@/components/theme-provider";
import "./index.css";
import { useState } from "react";
// import {
//   EntitiesPanel,
//   PropertiesPanel,
//   SettingsPanel,
//   SidebarTabs,
//   StatusBar,
//   TabBar,
//   Toolbar,
//   TopHeader,
//   useSidebarResize,
//   Viewport,
// } from "@/components/ui";

export function App() {
  // const { sidebarWidth, startResizing } = useSidebarResize();
  // const [activeTab, setActiveTab] = useState("properties");

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen flex flex-col">
        <MenuBar />
        <TabBar />
        {/*<div className="flex-1 flex overflow-hidden">
        <Viewport />
        <Toolbar
          onResizeStart={startResizing}
          onOpenSettings={() => setActiveTab("settings")}
        />
        <aside
          style={{ width: sidebarWidth }}
          className="bg-white dark:bg-panel-dark flex flex-col shrink-0"
        >
          <SidebarTabs activeTab={activeTab} onTabChange={setActiveTab} /> */}
        {/* {activeTab === "properties" && <PropertiesPanel />}
          {activeTab === "entities" && <EntitiesPanel />}
          {activeTab === "settings" && <SettingsPanel />} */}
        {/* </aside>
      </div>
      <StatusBar /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
