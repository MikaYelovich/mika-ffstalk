"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTimestamp = exports.safe = void 0;
exports.fetchFreeFireAccountDetails = fetchFreeFireAccountDetails;
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
/**
 * Safely returns a string representation of a potentially undefined or null value.
 *
 * @param value - The value to check.
 * @param fallback - The fallback string to return if the value is undefined or null.
 * @returns The original value as a string or the fallback.
 */
const safe = (value, fallback = "N/A") => (value !== undefined && value !== null ? String(value) : fallback);
exports.safe = safe;
/**
 * Converts a UNIX timestamp into a human-readable date string.
 *
 * @param timestamp - The UNIX timestamp in seconds.
 * @returns A formatted string or fallback if invalid.
 */
const formatTimestamp = (timestamp) => timestamp ? moment_1.default.unix(timestamp).format("YYYY-MM-DD HH:mm:ss") : "N/A";
exports.formatTimestamp = formatTimestamp;
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
async function fetchFreeFireAccountDetails(uid) {
    const url = `https://discordbot.freefirecommunity.com/player_info_api?uid=${uid}&region=id`;
    try {
        const response = await axios_1.default.get(url, {
            headers: {
                Origin: "https://www.freefirecommunity.com",
                Referer: "https://www.freefirecommunity.com/ff-account-info/",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; K)",
                Accept: "*/*",
                "Accept-Encoding": "gzip, deflate, br",
            },
        });
        const data = response.data.player_info ?? {};
        const b = data.basicInfo ?? {};
        const p = data.petInfo ?? {};
        const prof = data.profileInfo ?? {};
        const s = data.socialInfo ?? {};
        const c = data.creditScoreInfo ?? {};
        const tagPairs = Array.isArray(s.battleTag)
            ? s.battleTag.map((tag, i) => ({
                tag,
                count: s.battleTagCount?.[i] ?? 0,
            }))
            : [];
        return {
            metadata: {
                nickname: (0, exports.safe)(b.nickname),
                accountId: (0, exports.safe)(b.accountId),
                region: (0, exports.safe)(b.region),
                level: (0, exports.safe)(b.level),
                likes: (0, exports.safe)(b.liked),
                rank: (0, exports.safe)(b.rank),
                maxRank: (0, exports.safe)(b.maxRank),
                csRank: (0, exports.safe)(b.csRank),
                exp: (0, exports.safe)(b.exp),
                createdAt: (0, exports.formatTimestamp)(b.createAt),
                lastLoginAt: (0, exports.formatTimestamp)(b.lastLoginAt),
                rankingPoints: (0, exports.safe)(b.rankingPoints),
                releaseVersion: (0, exports.safe)(b.releaseVersion),
                seasonId: (0, exports.safe)(b.seasonId),
                primeLevel: (0, exports.safe)(b.primeLevel?.level, "-"),
                diamondCost: (0, exports.safe)(data.diamondCostRes?.diamondCost, "-"),
            },
            pet: {
                name: (0, exports.safe)(p.name, "-"),
                level: (0, exports.safe)(p.level, "-"),
                exp: (0, exports.safe)(p.exp, "-"),
                skinId: (0, exports.safe)(p.skinId, "-"),
                skillId: (0, exports.safe)(p.selectedSkillId, "-"),
            },
            profile: {
                avatarId: (0, exports.safe)(prof.avatarId),
                clothes: Array.isArray(prof.clothes) ? prof.clothes.map(String) : [],
                equippedSkills: Array.isArray(prof.equipedSkills)
                    ? prof.equipedSkills.map(String)
                    : [],
            },
            social: {
                battleTags: tagPairs,
                language: (0, exports.safe)(s.language),
                rankShow: (0, exports.safe)(s.rankShow),
                signature: (0, exports.safe)(s.signature),
            },
            credit: {
                score: (0, exports.safe)(c.creditScore),
                rewardState: (0, exports.safe)(c.rewardState),
            },
            assets: {
                bannerImageUrl: `https://discordbot.freefirecommunity.com/banner_image_api?uid=${uid}&region=id`,
                outfitImageUrl: `https://discordbot.freefirecommunity.com/outfit_image_api?uid=${uid}&region=id`,
            },
        };
    }
    catch (error) {
        throw new Error(`Failed to retrieve player data: ${error.message}`);
    }
}
