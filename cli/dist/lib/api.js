import { getApiBaseUrl } from "./config.js";
export class ApiError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
export async function apiRequest(path, options = {}) {
    try {
        const response = await fetch(`${getApiBaseUrl()}${path}`, {
            method: options.method || "GET",
            headers: {
                Accept: "application/json",
                ...(options.body ? { "Content-Type": "application/json" } : {}),
                ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
        });
        const payload = (await response.json().catch(() => ({})));
        if (!response.ok) {
            throw new ApiError(payload.error || "The API request failed.", response.status);
        }
        return payload;
    }
    catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new Error("Unable to connect to the API.");
    }
}
