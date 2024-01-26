import { ScrollArea } from "@/components/ui/scroll-area";
import Folders from "@/screens/folders";

export function Sidebar() {
  return (
    <aside className="h-screen">
      <ScrollArea className="h-full w-[240px] border-e">
        <Folders />
      </ScrollArea>
    </aside>
  );
}
