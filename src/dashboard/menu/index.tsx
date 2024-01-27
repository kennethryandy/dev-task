import { useCallback, useState } from "react";
import { Code, Globe, Mic } from "lucide-react";
// import { WindowTitlebar } from "tauri-controls";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

// import { AboutDialog } from "./about-dialog";
import { MenuModeToggle } from "./menu-mode-toggle";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { WindowsControls } from "./windows-controls";
import NewFolderDialog from "@/components/new-folder-dialog";

export function Menu() {
  const [openNewFolder, setOpenNewFolder] = useState(false);
  const closeWindow = useCallback(async () => {
    // const { appWindow } = await import("@tauri-apps/plugin-window")
    // appWindow.close()
  }, []);

  return (
    <div
      className="fixed z-50 flex h-[38px] w-full items-center justify-between border-b bg-background"
      data-tauri-drag-region
    >
      <Menubar className="rounded-none border-none p-0 pl-2 lg:pl-3">
        <MenubarMenu>
          <MenubarTrigger className="font-bold text-cyan-500">
            <Code className="mr-1 h-3.5 w-4" />
            <h4 className="text-xs font-bold">DevTask~</h4>
          </MenubarTrigger>
          {/* <Dialog modal={false}> */}
          <MenubarContent>
            {/* <DialogTrigger asChild> */}
            <MenubarItem>About App</MenubarItem>
            {/* </DialogTrigger> */}

            <MenubarSeparator />
            <MenubarItem>
              Preferences... <MenubarShortcut>⌘,</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Hide Music... <MenubarShortcut>⌘H</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Hide Others... <MenubarShortcut>⇧⌘H</MenubarShortcut>
            </MenubarItem>
            <MenubarShortcut />
            <MenubarItem onClick={closeWindow}>
              Quit Music <MenubarShortcut>⌘Q</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
          {/* <AboutDialog /> */}
          {/* </Dialog> */}
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="relative">File</MenubarTrigger>
          <Dialog open={openNewFolder} onOpenChange={setOpenNewFolder}>
            <MenubarContent>
              <DialogTrigger className="w-full">
                <MenubarItem>New Folder</MenubarItem>
              </DialogTrigger>
              <MenubarItem>
                Open Stream URL... <MenubarShortcut>⌘U</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Close Window <MenubarShortcut>⌘W</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Library</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Update Cloud Library</MenubarItem>
                  <MenubarItem>Update Genius</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Organize Library...</MenubarItem>
                  <MenubarItem>Export Library...</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Import Playlist...</MenubarItem>
                  <MenubarItem disabled>Export Playlist...</MenubarItem>
                  <MenubarItem>Show Duplicate Items</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Get Album Artwork</MenubarItem>
                  <MenubarItem disabled>Get Track Names</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem>
                Import... <MenubarShortcut>⌘O</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>Burn Playlist to Disc...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Show in Finder <MenubarShortcut>⇧⌘R</MenubarShortcut>{" "}
              </MenubarItem>
              <MenubarItem>Convert</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Page Setup...</MenubarItem>
              <MenubarItem disabled>
                Print... <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
            <NewFolderDialog setOpen={setOpenNewFolder} />
          </Dialog>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem disabled>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem disabled>
              Cut <MenubarShortcut>⌘X</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              Copy <MenubarShortcut>⌘C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              Paste <MenubarShortcut>⌘V</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Select All <MenubarShortcut>⌘A</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              Deselect All <MenubarShortcut>⇧⌘A</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Smart Dictation...{" "}
              <MenubarShortcut>
                <Mic className="h-4 w-4" />
              </MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Emoji & Symbols{" "}
              <MenubarShortcut>
                <Globe className="h-4 w-4" />
              </MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem>Show Playing Next</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>Show Lyrics</MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem inset disabled>
              Show Status Bar
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Hide Sidebar</MenubarItem>
            <MenubarItem disabled inset>
              Enter Full Screen
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Account</MenubarTrigger>
          <MenubarContent forceMount>
            <MenubarLabel inset>Switch Account</MenubarLabel>
            <MenubarSeparator />
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
              <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
              <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset>Manage Famliy...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Add Account...</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenuModeToggle />
      </Menubar>
      <WindowsControls />
    </div>
  );
}
