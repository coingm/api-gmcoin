import type { VercelRequest, VercelResponse } from "@vercel/node";
import NodeCache from "node-cache";
import config from "./config.json";
import totalsupply from "./custom/getTotalsupply";

const cache = new NodeCache();
const cacheKeyT: string = "totalcoins";
const cache_limit: number = config.cache_minute * 60;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!req.url) return res.status(400);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    // Handle preflight request
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    const cachedTotalcoins: string | null = cache.get(cacheKeyT) || null;
    if (cachedTotalcoins != null && cachedTotalcoins != undefined) {
      return res.status(200).end(cachedTotalcoins);
    }
    const tcoins = await totalsupply(config.tokenID);

    if (tcoins == null) {
      return res.status(400).end("Something went wrong!");
    }
    cache.set(cacheKeyT, tcoins.toFixed(2), cache_limit);
    return res.status(200).end(tcoins.toFixed(2));
  } catch (_err) {
    return res.status(500).end("Server Error!");
  }
}
