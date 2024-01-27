import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { type Folder } from '@/types/Folder';
import { CONSTANT } from '@/contants';

interface FolderState {
  folders: Array<Folder>,
  selectedNote?: number,
  getSelectedFolder: () => Folder
}

const useFolderStore = create<FolderState>()(
  devtools(persist((_set, get) => ({
    folders: [],
    selectedNote: undefined,
    getSelectedFolder: () => {
      const selectedNote = get().selectedNote;
      return selectedNote !== undefined ? 
    }
  }),
    {
      name: CONSTANT.FOLDER_STORAGE_NAME,
      storage: createJSONStorage(() => localStorage),
      partialize: ({ folders, selectedNote }) => ({ folders, selectedNote })
    })
  ));



export const init_folders = (folders: Folder[]) => {
  useFolderStore.setState((state) => ({
    folders,
    selectedNote: (folders.length > 0 && state.selectedNote === undefined) ? 0 : undefined
  }));
}

export default useFolderStore;