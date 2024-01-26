import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Stack from "@/components/stack";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionDrawerTrigger,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Folders as FoldersIcon } from "lucide-react";
import { type Folder } from "@/types/Folder";
import { DialogTrigger } from "@/components/ui/dialog";
import NewFolderDialog from "@/components/new-folder-dialog";
import { useFolderStore } from "@/store/folder";

export default function Folders() {
  const folders = useFolderStore((state) => state.folders);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFolders();
  }, []);

  const getFolders = async () => {
    const f = await invoke("get_folders_with_notes");
    useFolderStore.setState({ folders: f as Folder[] });
    setLoading(false);
  };

  if (loading) {
    return (
      <Stack className="mt-2 gap-4 px-2 pt-1">
        <Skeleton className="h-[40px]" />
        <Skeleton className="h-[40px]" />
        <Skeleton className="h-[40px]" />
        <Skeleton className="h-[40px]" />
        <Skeleton className="h-[40px]" />
        <Skeleton className="h-[40px]" />
        <Skeleton className="h-[40px]" />
        <Skeleton className="h-[40px]" />
        <Skeleton className="h-[40px]" />
        <Skeleton className="h-[40px]" />
      </Stack>
    );
  }

  if (folders.length === 0) {
    return (
      <div className="mt-1 px-2 pt-1">
        <NewFolderDialog>
          <DialogTrigger asChild>
            <Button className="w-full border-2 border-dashed" variant="outline">
              Add Folder
            </Button>
          </DialogTrigger>
        </NewFolderDialog>
      </div>
    );
  }

  return (
    <>
      <Accordion
        type="multiple"
        className="mb-8 px-2.5 pt-1"
        defaultValue={[folders[0].folder_name]}
      >
        {folders.map((folder) => (
          <AccordionItem key={folder.folder_name} value={folder.folder_name}>
            <AccordionDrawerTrigger>
              <FoldersIcon className="mr-2.5 h-6 w-6" />
              <h4 className="leading-non text-md flex-1 text-left font-medium">
                {folder.folder_name}
              </h4>
            </AccordionDrawerTrigger>
            {folder.notes &&
              folder.notes.map((note) => (
                <AccordionContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-start italic"
                    key={note.intermediate_ext}
                  >
                    {note.name}
                  </Button>
                </AccordionContent>
              ))}
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

// return (
//  <>
//    <Accordion
//      type="multiple"
//      className="mb-8 px-2.5 pt-1"
//      defaultValue={["folders"]}
//    >
//      <AccordionItem value="folders">
//        <AccordionDrawerTrigger>
//          <FoldersIcon className="mr-2.5 h-6 w-6" />
//          <h4 className="leading-non text-md flex-1 text-left font-medium">
//            Folders
//          </h4>
//        </AccordionDrawerTrigger>
//        <AccordionContent>
//          {tags.map((tag, i) => (
//            <>
//              <Button
//                variant="ghost"
//                className="w-full justify-start"
//                key={i}
//              >
//                {tag}
//              </Button>
//            </>
//          ))}
//        </AccordionContent>
//      </AccordionItem>
//      <AccordionItem value="folders2">
//        <AccordionDrawerTrigger>
//          <FolderIcon className="mr-2.5 h-6 w-6" />
//          <h4 className="leading-non text-md flex-1 text-left font-medium">
//            Another item
//          </h4>
//        </AccordionDrawerTrigger>
//        <AccordionContent>
//          {tags.map((tag, i) => (
//            <>
//              <Button
//                variant="ghost"
//                className="w-full justify-start"
//                key={i}
//              >
//                {tag}
//              </Button>
//            </>
//          ))}
//        </AccordionContent>
//      </AccordionItem>
//    </Accordion>
//  </>
// );
