import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import App from "./App";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(Provider, { store: store, children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }) }));
