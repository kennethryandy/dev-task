import {
  Accordion,
  AccordionContent,
  AccordionDrawerTrigger,
  AccordionItem,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Folder, Folders } from "lucide-react";

export function Dashboard() {
  const tags = Array.from({ length: 8 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
  return (
    <ScrollArea className="h-full w-[240px] border-e">
      <Accordion
        type="multiple"
        // collapsible
        className="mb-8 px-2.5 py-4"
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
            {tags.map((tag, i) => (
              <>
                <div key={tag} className="px-4 text-sm">
                  {tag}
                </div>
                {i !== tags.length - 1 && <Separator className="my-2" />}
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
                <div key={tag} className="px-4 text-sm">
                  {tag}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ScrollArea>
  );
}
