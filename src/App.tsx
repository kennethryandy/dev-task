import { ThemeProvider } from "./theme";
import NoteScreen from "./screens/notes/note-screen";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NoteScreen />
    </ThemeProvider>
  );
}

export default App;
