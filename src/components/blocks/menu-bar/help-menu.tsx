import {
  BookOpenText,
  CircleQuestionMark,
  LifeBuoy,
  MessageCircleQuestion,
  Speech,
} from "lucide-react";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

/**
 * Renders the Help menu in the menu bar.
 */
export const HelpMenu = () => {
  return (
    <MenubarMenu>
      <MenubarTrigger>Help</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <LifeBuoy />
          Search help... <MenubarShortcut>F1</MenubarShortcut>
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem>
          <BookOpenText />
          Online Documentation
        </MenubarItem>

        <MenubarItem>
          <MessageCircleQuestion /> Forum
        </MenubarItem>

        <MenubarItem>
          <Speech /> Community
        </MenubarItem>

        <MenubarSeparator />

        <MenubarItem>
          <CircleQuestionMark />
          About WickedEngine
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
};
