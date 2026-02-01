import { ArrowRightFromLine, CircleX, Redo, Undo } from "lucide-react";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

/**
 * Renders the Edit menu in the menu bar.
 */
export const EditMenu = () => {
  return (
    <MenubarMenu>
      <MenubarTrigger>Edit</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <Undo /> Undo
          <MenubarShortcut>Ctrl+Z</MenubarShortcut>
        </MenubarItem>

        <MenubarItem>
          <Redo /> Redo
          <MenubarShortcut>Ctrl+Y</MenubarShortcut>
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem variant="destructive">
          <CircleX /> Delete Selected
          <MenubarShortcut>Del</MenubarShortcut>
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem>
          <ArrowRightFromLine /> Selected To New Scene
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};
