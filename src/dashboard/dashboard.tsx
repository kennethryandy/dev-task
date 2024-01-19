import { type ReactNode } from "react";
import { Menu } from "./menu";
import { Sidebar } from "./sidebar.tsx";
import { ScrollArea } from "@radix-ui/react-scroll-area";
export function Dashboard({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen">
      <Menu />
      {/* nav spacer */}
      <div className="h-[38px]" />
      <div className="flex">
        <Sidebar />
        <main className={"w-full px-4 py-2"}>
          <ScrollArea className="h-full w-full">{children}</ScrollArea>
        </main>
      </div>
    </div>
  );
}
