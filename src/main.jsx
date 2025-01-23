import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { ContextProvider } from "./context/Context.jsx";
import { ConfirmProvider } from "material-ui-confirm";

createRoot(document.getElementById("root")).render(
  <ConfirmProvider>
    <ContextProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ContextProvider>
  </ConfirmProvider>
);
