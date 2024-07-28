import { useContext } from "react";
import { AppContext } from "../appContext";

export const apiUrl = "http://localhost:8000/api/";

export default function useSendRequest() {
    const { token, clearAuth, toggleNotification } = useContext(AppContext);

    return async (url, { body, options = { method: "get" }, forceToken, isJSON = true } = {}) => {
        const headers = {
            Authorization: forceToken ? `Bearer ${forceToken}` : token ? `Bearer ${token}` : "",
            ...options.headers,
        };

        if (isJSON) headers["Content-Type"] = "application/json";

        const response = await fetch(apiUrl + url, {
            body: body ? JSON.stringify(body) : undefined,
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = await response.json();

            toggleNotification({
                type: "error",
                message: error.detail ? error.detail : error.toString(),
            });

            if (response.status === 401) {
                clearAuth();
                console.log("unauthenticated");
                return { data: null, isOk: false };
            }
        }

        if (options.method !== "get" && options.method !== "GET") {
            toggleNotification({ type: "success", message: "موفقیت آمیز." });
        }

        const dataText = await response.text();

        const data = dataText.length > 0 ? JSON.parse(dataText) : null;

        return { data, isOk: true };
    };
}
