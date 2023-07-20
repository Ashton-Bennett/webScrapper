import axios from "axios";
import * as cheerio from "cheerio";

const downloadWebPage = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error downloading the web page: ${error}`);
    return null;
  }
};

const extractLinks = (html) => {
  const $ = cheerio.load(html);
  const links = [];

  $("a").each((index, element) => {
    const href = $(element).attr("href");
    if (href) {
      links.push(href);
    }
  });
  return links;
};

const extractParagraphs = (html) => {
  const $ = cheerio.load(html);
  const paragraphs = [];

  $("p").each((index, element) => {
    const href = $(element).text();
    if (href) {
      paragraphs.push(href);
    }
  });

  return paragraphs;
};

const main = async () => {
  const url = "https://pacer.uscourts.gov/";
  const html = await downloadWebPage(url);

  if (html) {
    if (process.argv[2] === "paragraphs") {
      const paragraphs = extractParagraphs(html);
      console.log("Paragraphs on the page:");
      console.log(paragraphs);
    } else {
      const links = extractLinks(html);
      console.log("Links on the page:");
      console.log(links);
    }
  }
};

main();
