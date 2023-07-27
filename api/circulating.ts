import type { VercelRequest, VercelResponse } from "@vercel/node";
import NodeCache from "node-cache";
import config from "./config.json";
import circulatingsupply from "./custom/getCirculatingsupply";

const cache = new NodeCache();
const cacheKeyC: string = "circulating";
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

    const cachedCirculating: string | null = cache.get(cacheKeyC) || null;
    if (cachedCirculating != null && cachedCirculating != undefined) {
      return res.status(200).end(cachedCirculating);
    }

    const ccoins = await circulatingsupply(config.addrs, config.tokenID);

    if (ccoins == null) {
      return res.status(400).end("Something went wrong!");
    }
    cache.set(cacheKeyC, ccoins.toFixed(2), cache_limit);
    return res.status(200).end(ccoins.toFixed(2));
  } catch (_err) {
    console.error(_err);
    return res.status(500).end("Server Error!");
  }
}
