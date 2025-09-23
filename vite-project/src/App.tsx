/** @jsxImportSource @emotion/react */
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/global";
import { TasksPage } from "./pages/tasks-page.tsx";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <TasksPage />
    </ThemeProvider>
  );
};
export default App;
