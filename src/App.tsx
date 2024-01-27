import { ThemeProvider } from "./theme";
import NoteScreen from "./screens/notes/note-screen";
// import { emit, listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { subscribeStateSync } from "./store/events";

function App() {
  useEffect(() => {
    const unsubscribeStateSync = subscribeStateSync();
    return () => {
      unsubscribeStateSync.then((unsubscribe) => unsubscribe());
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NoteScreen />
    </ThemeProvider>
  );
}

export default App;
