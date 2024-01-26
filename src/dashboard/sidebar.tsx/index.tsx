import { ScrollArea } from "@/components/ui/scroll-area";
import Folders from "./folders";

export function Sidebar() {
  return (
    <aside className="h-auto">
      <ScrollArea className="h-full w-[240px] flex-1 border-e">
        <Folders />
      </ScrollArea>
    </aside>
  );
}
