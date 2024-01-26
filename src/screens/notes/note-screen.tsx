import Breadcrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Dashboard } from "@/dashboard/dashboard";
import { ChevronRight, Code, Edit2 } from "lucide-react";
import MDEditor, { EditorContext, commands } from "@uiw/react-md-editor";
import { useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";
// import { invoke } from "@tauri-apps/api/tauri";
import { Folder } from "@/types/Folder";

const PreviewButton = () => {
  const { preview, dispatch } = useContext(EditorContext);
  const click = () => {
    if (dispatch) {
      dispatch({
        preview: preview === "edit" ? "preview" : "edit",
      });
    }
  };

  if (preview === "edit") {
    return <Code onClick={click} size={16} />;
  }
  return <Edit2 onClick={click} size={12} />;
};

const codePreview = {
  name: "preview",
  keyCommand: "preview",
  value: "preview",
  icon: <PreviewButton />,
};

export default function NoteScreen() {
  const { theme } = useTheme();
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {});

  const [value, setValue] = useState("v1.2.0-beta.8");
  const handleChange = (val: string | undefined) => {
    if (val !== undefined) {
      setValue(val);
    }
  };

  async function greet() {
    // const folder = await invoke("add_folder", { name: value });
    // setFolders((state) => [...state, folder as Folder]);
  }

  async function getAll() {
    // const f = await invoke("get_folders");
    // setFolders(f as Folder[]);
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
          />
        </div>
        <Button className="mt-3 self-end" onClick={getAll}>
          Get All
        </Button>
        <Button className="mt-3 self-end" onClick={greet}>
          Save Note
        </Button>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Folders</h3>
          <div className="mt-4 space-y-2">
            {folders.map((folder) => (
              <details className="group" key={folder.uuid}>
                <summary className="cursor-pointer rounded px-4 pt-2 hover:bg-gray-700">
                  <span className="text-sm font-medium">{folder.name}</span>
                </summary>
                <div className="rounded-b px-4 py-2">
                  <p className="text-sm">
                    Content for note 1 goes here. It can include markdown
                    syntax.
                  </p>
                </div>
                <div className="px-4">
                  <Separator />
                </div>
              </details>
            ))}
          </div>
        </div>
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
