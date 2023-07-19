import axios from "axios";
import * as cheerio from "cheerio";

async function downloadWebPage(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error downloading the web page: ${error}`);
    return null;
  }
}

function extractLinks(html) {
  const $ = cheerio.load(html);
  const links = [];

  $("a").each((index, element) => {
    const href = $(element).attr("href");
    if (href) {
      links.push(href);
    }
  });
  return links;
}

async function main() {
  const url = "https://pacer.uscourts.gov/";

  const html = await downloadWebPage(url);
  if (html) {
    const links = extractLinks(html);
    console.log("Links on the page:");
    console.log(links[0]);
  }
}

main();
