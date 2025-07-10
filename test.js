// Load compiled JS from dist
const { fetchFreeFireAccountDetails } = require("./dist/index.js");

(async () => {
  try {
    const data = await fetchFreeFireAccountDetails("470699855");
    console.log(data);
  } catch (err) {
    console.error("❌ Error during fetch:", err.message);
  }
})();
