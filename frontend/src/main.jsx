import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./Context/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  // We will get react-router-dom support on the App Component.
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);
