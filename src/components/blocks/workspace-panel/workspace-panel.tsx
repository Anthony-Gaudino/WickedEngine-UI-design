import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EntitiesList from "../entities-list/entities-list";

// import { TabButton } from "./TabButton";

const TABS = [
  { id: "entities", label: "Entities" },
  { id: "properties", label: "Components" },
  { id: "settings", label: "Main Settings" },
] as const;

interface Props {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const WorkspacePanel = ({ activeTab, onTabChange }: Props) => {
  return (
    <aside className="flex-1">
      <Tabs defaultValue="entities">
        <TabsList className="w-full">
          <TabsTrigger value="entities">Entities</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="tool">Tool</TabsTrigger>
        </TabsList>
        <TabsContent value="entities">
          <EntitiesList />
        </TabsContent>
      </Tabs>
    </aside>
  );
};
