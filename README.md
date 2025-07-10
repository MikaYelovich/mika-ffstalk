# 🔍 FreeFire Stalker

![npm](https://img.shields.io/npm/v/mika-ffstalk?color=crimson)
![types](https://img.shields.io/npm/types/mika-ffstalk)
![license](https://img.shields.io/npm/l/mika-ffstalk)
![downloads](https://img.shields.io/npm/dm/mika-ffstalk)

> A blazing-fast, fully typed, and CLI-ready toolkit to fetch and inspect **Garena Free Fire** player profiles using public community APIs.  
> Designed for **Node.js**, **TypeScript**, and modern development workflows.

---

<p align="center">
  <img src="https://files.catbox.moe/md4zwm.jpeg" alt="Free Fire Banner" width="600" />
</p>

---

## ✨ Features

- 🧠 **TypeScript-first** with full typings
- ⚡️ Supports **ESM**, **CJS**, and **CLI**
- 🔍 Fetches detailed **player metadata**, **pet**, **profile**, and **credit score**
- 📷 Built-in URLs for **banner** and **outfit** images
- 🧪 Battle-tested with **Vitest**
- 💡 Ideal for: bots, dashboards, analytics, gamer tools

---

## 📦 Installation

```bash
# Using npm
npm install mika-ffstalk

# Or using yarn
yarn add mika-ffstalk
```

---

## 🚀 Programmatic Usage

```ts
import { fetchFreeFireAccountDetails } from "mika-ffstalk";

(async () => {
  const data = await fetchFreeFireAccountDetails("470699855");
  console.log(data.metadata.nickname); // e.g., "Mika  ST"
})();
```

---

## 🔧 CLI Usage

```bash
npx mika-ffstalk 470699855
# or
npm link
mika-stalk 470699855
```

Optional flags:

```bash
--json     # Output raw JSON
--table    # Output in table format
```

Example:

```bash
npx mika-ffstalk 470699855 --table
```

---

## 📂 Output Format (Simplified)

```ts
type FreeFireAccountData = {
  metadata: {
    nickname: string;
    accountId: string;
    region: string;
    level: string;
    rank: string;
    exp: string;
    lastLoginAt: string;
    diamondCost: string;
  };
  pet: {
    name: string;
    level: string;
    exp: string;
  };
  profile: {
    avatarId: string;
    clothes: string[];
    equippedSkills: string[];
  };
  social: {
    battleTags: { tag: string; count: number }[];
    language: string;
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
};
```

---

## 🧾 Sample Output

```json
{
  "metadata": {
    "nickname": "PontaSensei",
    "accountId": "470699855",
    "region": "ID",
    "level": "57",
    "rank": "Diamond IV"
  },
  "assets": {
    "bannerImageUrl": "https://discordbot.freefirecommunity.com/banner_image_api?uid=470699855&region=id",
    "outfitImageUrl": "https://discordbot.freefirecommunity.com/outfit_image_api?uid=470699855&region=id"
  }
}
```

---

## 📚 API Reference

### `fetchFreeFireAccountDetails(uid: string): Promise<FreeFireAccountData>`

| Parameter | Type   | Required | Description                  |
| --------- | ------ | -------- | ---------------------------- |
| `uid`     | string | ✅       | The Free Fire UID to inspect |

Returns a structured object with all account details, suitable for UIs or APIs.

---

## 🖼️ UI-Ready Assets

- ✅ `bannerImageUrl`
- ✅ `outfitImageUrl`

Embed them directly into dashboards or profile cards.

---

## 🧑‍💻 Local Development

Clone and install:

```bash
git clone https://github.com/MikaYelovich/mika-ffstalk
cd mika-ffstalk
npm install
npm run dev
```

Run tests:

```bash
npm run test
```

---

## 🤝 Contributing

Contributions are welcome!  
If you'd like to fix a bug or add a feature, please open an issue or submit a PR.

---

## 📄 License

MIT © 2025 Mika Yelovich
