import { create } from 'zustand';
import { type Folder } from '@/types/Folder';

interface FolderState {
 folders: Array<Folder>,
 selectedNote: null | number
}

export const useFolderStore = create<FolderState>((_set) => ({
 folders: [],
 selectedNote: null
}))