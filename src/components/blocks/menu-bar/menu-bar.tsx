import { Menubar } from "@/components/ui/menubar";
import { EditMenu } from "./edit-menu";
import { HelpMenu } from "./help-menu";
import { SceneMenu } from "./scene-menu";
import { ScriptControls } from "./script-controls";

/**
 * Renders the menu bar.
 */
export const MenuBar = () => {
  return (
    <Menubar className="rounded-none border-x-0">
      <div className="flex items-center justify-between flex-1">
        <div className="flex items-center gap-2">
          <SceneMenu />
          <EditMenu />
          <HelpMenu />
        </div>
        <ScriptControls />
      </div>
    </Menubar>
  );
};
