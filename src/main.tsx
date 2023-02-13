import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { QueryClientProvider, QueryClient } from "react-query";
import MainProvider from "./contexts/mainContext";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <MainProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </MainProvider>
  </ErrorBoundary>
  // </React.StrictMode>
);
