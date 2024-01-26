import { ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface NewFolderDialogProps {
  children: ReactElement;
  isEdit?: boolean;
  folderName?: string;
}

export default function NewFolderDialog({
  children,
  isEdit = false,
  folderName = "",
}: NewFolderDialogProps) {
  return (
    <Dialog>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? `Edit ${folderName}` : "New Folder"}
          </DialogTitle>
        </DialogHeader>
        <div className="jutify-center my-2 flex items-center">
          <Input placeholder="Folder Name" />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
