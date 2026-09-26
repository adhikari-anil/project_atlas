import { ApiError } from "../../lib/api.js";
import { selectOrganization } from "../../lib/organizations.js";
export async function useCommand(identifier) {
    try {
        const organization = await selectOrganization(identifier);
        if (!organization) {
            throw new Error("You are not logged in.\nRun: product auth login");
        }
        console.log(`✓ Using organization: ${organization.name}`);
    }
    catch (error) {
        if (error instanceof ApiError && error.status === 404) {
            throw new Error("Organization not found or access denied.");
        }
        if (error instanceof ApiError && error.status === 401) {
            throw new Error("You are not logged in.\nRun: product auth login");
        }
        throw error;
    }
}
