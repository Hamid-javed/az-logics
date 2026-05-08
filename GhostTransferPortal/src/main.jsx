import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Created from "./pages/Created.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/created", element: <Created /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
