import { useCallback, useState } from "react";
import Breadcrumbs from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Dashboard } from "@/dashboard/dashboard";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";
// import { invoke } from "@tauri-apps/api/tauri";
import { codePreview } from "@/components/preview-button";
import { useDebounce } from "@/hooks/debounce";
import { create } from "zustand";

const useSaving = create(() => ({
  saving: false,
}));

export default function NoteScreen() {
  const { theme } = useTheme();
  const saving = useSaving((state) => state.saving);
  const [isSaved, setIsSaved] = useState(false);
  const [value, setValue] = useState("");

  const debounceSave = useCallback(
    useDebounce(async (e: string) => {
      useSaving.setState({ saving: true });
      setIsSaved(false);
      console.log(e);
      console.log({ saving, isSaved });
      await new Promise((r) => setTimeout(r, 2000));
      handleSave();
    }),
    []
  );

  const handleChange = (val: string | undefined) => {
    if (val !== undefined) {
      setValue(val);
      if (isSaved) {
        setIsSaved(false);
      }
      debounceSave(val);
    }
  };

  const handleSave = async () => {
    console.log("handleSave");
    useSaving.setState({ saving: false });
    setIsSaved(true);
  };

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
        {value === "" && !saving ? (
          <Button
            onClick={handleSave}
            className="mt-3 self-end"
            disabled
            variant="outline"
          >
            Save
          </Button>
        ) : (
          <Button
            className="mt-3 self-end"
            onClick={!saving && !isSaved ? handleSave : undefined}
            disabled={isSaved || saving}
            variant={isSaved || saving ? "outline" : "default"}
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving
              </>
            ) : isSaved ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Saved
              </>
            ) : (
              <>Save</>
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
