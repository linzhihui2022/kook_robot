import * as cheerio from "cheerio";
import { baseUrl, Target } from "./util";

export const getMaintenance = async (page: number = 1, after: string) => {
  const html = await fetch(`${baseUrl + Target.maintenance}/${page}`).then(
    (res) => res.text()
  );
  const $ = cheerio.load(html, { decodeEntities: false });
  const links: string[] = [];
  const $link = $(".news-item--maintenance>.text>h3>a");
  $link.each((_, el) => {
    const href = $(el).attr("href");
    href && links.push(href);
  });
  const afterIndex = links.findIndex((i) => i === after);
  const _links = links.slice(afterIndex + 1);
  for (let i = 0; i < _links.length; i++) {
    const link = _links[i];
    const detailHtml = await fetch(baseUrl + link).then((res) => res.text());
    const $ = cheerio.load(detailHtml, { decodeEntities: false });
    const $strong = $(".article-content>p");
    if (!$strong.length) continue;
    const res = {
      text: "",
      title: "",
      index: i,
      link,
      fullLink: baseUrl + link,
    };
    $strong.each((_, el) => {
      const isTimes = !!$(el)
        .text()
        .match(/Times:/);
      if (isTimes) {
        const text = $(el).next().find("strong").html()?.replace(/<br>/g, "\n");
        if (text) {
          res.title = $("h1.title").text();
          res.text = text;
          return false; //break ;
        }
      }
    });
    if (res.text) return res;
  }
};
