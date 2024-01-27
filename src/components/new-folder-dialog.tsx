import React from "react";
import {
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
import useFolderStore from "@/store/folder";

interface NewFolderDialogProps {
  isEdit?: boolean;
  folderName?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const folderSchema = z.object({
  folderName: z
    .string()
    .min(2, { message: "Folder must be at least 2 characters." }),
});

const NewFolderDialog: React.FC<NewFolderDialogProps> = ({
  isEdit = false,
  folderName = "",
  setOpen,
}) => {
  const methods = useForm<z.infer<typeof folderSchema>>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      folderName,
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: z.infer<typeof folderSchema>) => {
    const { folderName } = values;
    await invoke("create_folder", { folderName });
    useFolderStore.setState((state) => ({
      folders: [...state.folders, { folder_name: folderName, notes: [] }],
      selectedNote: state.folders.length + 1,
    }));
    reset({ folderName: "" });
    setOpen(false);
  };

  return (
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
  );
};

export default NewFolderDialog;
