/**
 * Structured data representation of a Free Fire account, suitable for external usage.
 */
export interface FreeFireAccountData {
    metadata: {
        nickname: string;
        accountId: string;
        region: string;
        level: string;
        likes: string;
        rank: string;
        maxRank: string;
        csRank: string;
        exp: string;
        createdAt: string;
        lastLoginAt: string;
        rankingPoints: string;
        releaseVersion: string;
        seasonId: string;
        primeLevel: string;
        diamondCost: string;
    };
    pet: {
        name: string;
        level: string;
        exp: string;
        skinId: string;
        skillId: string;
    };
    profile: {
        avatarId: string;
        clothes: string[];
        equippedSkills: string[];
    };
    social: {
        battleTags: {
            tag: string;
            count: number;
        }[];
        language: string;
        rankShow: string;
        signature: string;
    };
    credit: {
        score: string;
        rewardState: string;
    };
    assets: {
        bannerImageUrl: string;
        outfitImageUrl: string;
    };
}
/**
 * Safely returns a string representation of a potentially undefined or null value.
 *
 * @param value - The value to check.
 * @param fallback - The fallback string to return if the value is undefined or null.
 * @returns The original value as a string or the fallback.
 */
export declare const safe: <T>(value: T | undefined | null, fallback?: string) => string;
/**
 * Converts a UNIX timestamp into a human-readable date string.
 *
 * @param timestamp - The UNIX timestamp in seconds.
 * @returns A formatted string or fallback if invalid.
 */
export declare const formatTimestamp: (timestamp?: number) => string;
/**
 * Fetches and returns comprehensive Free Fire account data using the provided UID.
 * This function queries the official Free Fire community API and returns normalized,
 * structured data that can be safely consumed by user interfaces, APIs, or databases.
 *
 * @param uid - The unique player identifier (UID) in the Free Fire ecosystem.
 * @returns A Promise resolving to a structured object containing account metadata, pet information,
 * profile attributes, social identity, credit status, and image assets.
 * @throws Will throw an error if the request fails or data cannot be retrieved.
 */
export declare function fetchFreeFireAccountDetails(uid: string): Promise<FreeFireAccountData>;
