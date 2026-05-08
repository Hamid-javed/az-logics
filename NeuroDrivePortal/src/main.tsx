import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext.tsx";
import { registerLicense } from "@syncfusion/ej2-base";
import { QueryClient, QueryClientProvider } from "react-query";
import { FileProvider } from "./FileContext.tsx";

const queryClient = new QueryClient();

registerLicense(
  "ORg4AjUWIQA/Gnt2XVhhQlJHfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTH5XdEdjWnpXdX1QQ2BbWkZ+"
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FileProvider>
          <BrowserRouter>
            <Provider store={store}>
              <App />
            </Provider>
          </BrowserRouter>
        </FileProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
