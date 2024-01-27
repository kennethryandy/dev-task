import EVENTS from "@/contants/events";
import { emit as emitTauri, listen } from "@tauri-apps/api/event";
import type GlobalAppStore from '@/types/GlobalAppStore';
import { create } from "zustand";
import { init_folders } from './folder';
import { type Folder } from "@/types/Folder";

const useGlobalAppStore = create<GlobalAppStore>(() => ({
 sidebar_loading: false,
}));

export const app_sidebar_load = () => useGlobalAppStore.setState({ sidebar_loading: true });
export const app_sidebar_loaded = () => useGlobalAppStore.setState({ sidebar_loading: false });

const subscribeStateSync = async () => {
 app_sidebar_load();
 emitTauri(EVENTS.ON_CLIENT_READY, { ready: true });
 const unsubscribe = await listen(EVENTS.EMIT_FOLDERS, (event) => {
  if (event.payload) {
   init_folders(event.payload as Folder[]);
  }
 });
 app_sidebar_loaded();
 return async () => {
  unsubscribe();
 };
};

export default useGlobalAppStore;
export { subscribeStateSync };
