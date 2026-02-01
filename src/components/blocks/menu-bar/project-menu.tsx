import {
  ArrowDownFromLine,
  ArrowUpFromLine,
  Folder,
  FolderGit2,
  FolderOpen,
  GitBranchPlus,
  GitCommitVertical,
  GitGraph,
  Plus,
  Settings,
  Trash,
} from "lucide-react";
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

/**
 * Renders the Project menu in the menu bar.
 */
export const ProjectMenu = () => {
  return (
    <MenubarMenu>
      <MenubarTrigger>Project</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <Plus /> New Project
        </MenubarItem>

        <MenubarItem>
          <FolderOpen /> Open...
        </MenubarItem>

        <MenubarSub>
          <MenubarSubTrigger>Open recent</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>
              <FolderGit2 /> My Island Game
            </MenubarItem>
            <MenubarItem>
              <Folder /> My other game project
            </MenubarItem>
            <MenubarItem>
              <FolderGit2 /> Yet another project
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Trash /> Clear recent scenes
            </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>

        <MenubarSeparator />

        <MenubarItem>
          <Settings /> Project settings
        </MenubarItem>

        <MenubarSeparator />

        <MenubarSub>
          <MenubarSubTrigger className="gap-2 [&_svg:not([class*='size-'])]:size-4">
            <GitGraph className="text-muted-foreground" /> Git version control
          </MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>
              <GitBranchPlus /> Branch
            </MenubarItem>
            <MenubarItem>
              <GitCommitVertical /> Commit
            </MenubarItem>
            <MenubarItem>
              <ArrowDownFromLine /> Checkout
            </MenubarItem>
            <MenubarItem>
              <ArrowUpFromLine /> Push
            </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
      </MenubarContent>
    </MenubarMenu>
  );
};
