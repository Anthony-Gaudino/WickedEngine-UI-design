import {
  Boxes,
  CircleX,
  FolderOpen,
  FolderOpenDot,
  Plus,
  RefreshCcw,
  Save,
  SaveAll,
  Trash,
} from "lucide-react";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

/**
 * Renders the Scene menu in the menu bar.
 */
export const SceneMenu = () => {
  return (
    <MenubarMenu>
      <MenubarTrigger>Scene</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <Plus /> New Scene <MenubarShortcut>Ctrl+N</MenubarShortcut>
        </MenubarItem>

        <MenubarItem>
          Open Scene <MenubarShortcut>Ctrl+O</MenubarShortcut>
        </MenubarItem>

        <MenubarSub>
          <MenubarSubTrigger>Open recent</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>
              <Boxes /> forest.wiscene
            </MenubarItem>
            <MenubarItem>
              <Boxes /> island.wiscene
            </MenubarItem>
            <MenubarItem>
              <Boxes /> swat.wiscene
            </MenubarItem>
            <MenubarItem>
              <Boxes /> house.wiscene
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Trash /> Clear recent scenes
            </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSeparator />

        <MenubarItem>
          <Save /> Save Scene <MenubarShortcut>Ctrl+S</MenubarShortcut>
        </MenubarItem>

        <MenubarItem>
          Save Scene As...<MenubarShortcut>Ctrl+Shift+S</MenubarShortcut>
        </MenubarItem>

        <MenubarItem>
          <SaveAll /> Save All Scenes
          <MenubarShortcut>Ctrl+Shift+Alt+S</MenubarShortcut>
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem>
          <FolderOpenDot /> Quick Open...
          <MenubarShortcut>Shift+Alt+O</MenubarShortcut>
        </MenubarItem>

        <MenubarItem>
          <FolderOpen /> Open...
          <MenubarShortcut>Ctrl+Shift+O</MenubarShortcut>
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem>
          <RefreshCcw />
          Reload Scene
          <MenubarShortcut>Ctrl+Y</MenubarShortcut>
        </MenubarItem>

        <MenubarItem>
          <CircleX />
          Close Scene
          <MenubarShortcut>Ctrl+Shift+W</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};
