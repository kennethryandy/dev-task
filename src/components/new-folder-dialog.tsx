import { ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
// form
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { RHFInput } from "./hook-form";
import { invoke } from "@tauri-apps/api/tauri";
import { useFolderStore } from "@/store/folder";

interface NewFolderDialogProps {
  children: ReactElement;
  isEdit?: boolean;
  folderName?: string;
}

const folderSchema = z.object({
  folderName: z
    .string()
    .min(2, { message: "Folder must be at least 2 characters." }),
});

export default function NewFolderDialog({
  children,
  isEdit = false,
  folderName = "",
}: NewFolderDialogProps) {
  const methods = useForm<z.infer<typeof folderSchema>>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      folderName,
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: z.infer<typeof folderSchema>) => {
    const { folderName } = values;
    console.log({ folderName });
    await invoke("create_folder", { folderName });
    useFolderStore.setState((state) => ({
      folders: [...state.folders, { folder_name: folderName, notes: [] }],
      selectedNote: state.folders.length + 1,
    }));
    reset({ folderName: "" });
  };

  const handleDialogClose = () => {
    reset({ folderName: "" });
  };

  return (
    <Dialog onOpenChange={handleDialogClose}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? `Edit ${folderName}` : "New Folder"}
          </DialogTitle>
        </DialogHeader>
        <Form {...methods}>
          <form
            className="jutify-center my-2 flex items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <RHFInput name="folderName" placeholder="Folder Name" />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
