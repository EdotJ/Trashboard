import Parser from "rss-parser";

let parser = new Parser();
const CORS_PROXY = process.env.REACT_APP_BASE_PROXY_URL;

export async function fetchFeed(url) {
  let feed = await parser.parseURL(CORS_PROXY + url);
  return feed.items;
}
