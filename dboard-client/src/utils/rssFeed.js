import Parser from "rss-parser";

let parser = new Parser();
const CORS_PROXY = "http://localhost:9123/";

export async function fetchFeed(url) {
  let feed = await parser.parseURL(CORS_PROXY + url);
  return feed.items;
}
