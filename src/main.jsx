import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="187048142450-aq7ufs2slfc6lejhnj8dlj690953he27.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
