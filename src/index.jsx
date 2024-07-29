import React from "react";
import ReactDOM from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./appContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AppContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AppContextProvider>
    </React.StrictMode>,
);
