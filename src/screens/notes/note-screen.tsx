import { useState } from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Dashboard } from "@/dashboard/dashboard";
import { Check, ChevronRight } from "lucide-react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";
// import { invoke } from "@tauri-apps/api/tauri";
import { codePreview } from "@/components/preview-button";

export default function NoteScreen() {
  const { theme } = useTheme();
  const [isSaved, _setIsSaved] = useState(true);

  const [value, setValue] = useState("");
  const handleChange = (val: string | undefined) => {
    if (val !== undefined) {
      setValue(val);
    }
  };

  async function greet() {
    // const folder = await invoke("add_folder", { name: value });
    // setFolders((state) => [...state, folder as Folder]);
  }

  return (
    <Dashboard>
      <Breadcrumbs separator={<ChevronRight size={16} />}>
        <Button variant="link" className="h-auto p-0 opacity-50">
          Folders
        </Button>
        <Button variant="link" className="h-auto p-0">
          v1.2.0-beta.8
        </Button>
      </Breadcrumbs>
      <div className="space-y- mt-2 flex flex-col">
        <label className="mb-1 text-sm font-medium">
          Note Content (Markdown supported)
        </label>
        <div data-color-mode={theme}>
          <MDEditor
            preview="edit"
            value={value}
            onChange={handleChange}
            extraCommands={[codePreview, commands.fullscreen]}
            height={400}
            autoFocus
          />
        </div>
        {value === "" ? (
          <Button className="mt-3 self-end" disabled variant="outline">
            Save
          </Button>
        ) : (
          <Button
            className="mt-3 self-end"
            onClick={greet}
            disabled={isSaved}
            variant={isSaved ? "outline" : "default"}
          >
            {isSaved ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Saved
              </>
            ) : (
              "Save Note"
            )}
          </Button>
        )}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Notes</h3>
          <div className="mt-4 space-y-2">
            <details className="group">
              <summary className="cursor-pointer rounded px-4 pt-2 hover:bg-gray-700">
                <span className="text-sm font-medium">Note Title 1</span>
              </summary>
              <div className="rounded-b px-4 py-2">
                <p className="text-sm">
                  Content for note 1 goes here. It can include markdown syntax.
                </p>
              </div>
              <div className="px-4">
                <Separator />
              </div>
            </details>
            <details className="group">
              <summary className="cursor-pointer rounded px-4 pt-2 hover:bg-gray-700">
                <span className="text-sm font-medium">Note Title 2</span>
              </summary>
              <div className="rounded-b px-4 py-2">
                <p className="text-sm">
                  Content for note 2 goes here. It can include markdown syntax.
                </p>
              </div>
              <div className="px-4">
                <Separator />
              </div>
            </details>
            <details className="group">
              <summary className="cursor-pointer rounded px-4 pt-2 hover:bg-gray-700">
                <span className="text-sm font-medium">Note Title 3</span>
              </summary>
              <div className="rounded-b px-4 py-2">
                <p className="text-sm">
                  Content for note 3 goes here. It can include markdown syntax.
                </p>
              </div>
              <div className="px-4">
                <Separator />
              </div>
            </details>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}
