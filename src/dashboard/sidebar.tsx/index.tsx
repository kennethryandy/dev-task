import {
  Accordion,
  AccordionContent,
  AccordionDrawerTrigger,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Folder, Folders } from "lucide-react";

export function Sidebar() {
  const tags = Array.from({ length: 8 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
  return (
    <aside className="h-screen">
      <ScrollArea className="h-full w-[240px] border-e">
        <Accordion
          type="multiple"
          // collapsible
          className="mb-8 px-2.5 pt-1"
          defaultValue={["folders"]}
        >
          <AccordionItem value="folders">
            <AccordionDrawerTrigger>
              <Folders className="mr-2.5 h-6 w-6" />
              <h4 className="leading-non text-md flex-1 text-left font-medium">
                Folders
              </h4>
            </AccordionDrawerTrigger>
            <AccordionContent>
              {tags.map((tag) => (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    key={tag}
                  >
                    {tag}
                  </Button>
                </>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="folders2">
            <AccordionDrawerTrigger>
              <Folder className="mr-2.5 h-6 w-6" />
              <h4 className="leading-non text-md flex-1 text-left font-medium">
                Another item
              </h4>
            </AccordionDrawerTrigger>
            <AccordionContent>
              {tags.map((tag) => (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    key={tag}
                  >
                    {tag}
                  </Button>
                </>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </aside>
  );
}
