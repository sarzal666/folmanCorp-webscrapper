import { config } from 'dotenv';
import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import Page from './Page';
import Pages from './Pages';
import Dataset from './Dataset';
import Element = cheerio.Element;

config();
const port = process.env.SERVER_PORT;
const app = express();

app.get('/', (request, response) => {
  Pages.forEach((pageData) => {
    const datasets = pageData.dataset.map(
      (set) => new Dataset(set.name, set.location, set.parentSelector, set.type)
    );
    const page = new Page(
      pageData.name,
      pageData.languages,
      pageData.url,
      datasets
    );

    page.dataset.forEach((dataset: Dataset) => {
      const lang = page.languages[0];
      const datasetUrl = page.getUrlWithLang(lang) + dataset.location;
      const scrapped = {
        name: dataset.name,
        location: datasetUrl,
        html: '',
      };

      axios(datasetUrl)
        .then((res) => {
          const html_data = res.data;
          const $ = cheerio.load(html_data);

          const container = $(dataset.parentSelector);
          let testing: Array<Element> = [];
          /* getting data to result */
          container.each((parentIndex, parentElement) => {
            const nodes = $(parentElement).find('div > div.card__three');

            //TODO: abk page has a lot of duplicated elements in this Node, let's filter it before processing

            nodes.each((cardId, cardEl) => {
              $(cardEl)
                .children()
                .each((id, el) => {
                  // here I'm fixing Collection image url from relative to absolute
                  if ('tagName' in el && el.tagName === 'img') {
                    if ('attribs' in el) {
                      el.attribs.src = `${page.url}/${el.attribs.src}`;
                    }
                  }

                  // yeeey it's our collection name !
                  if ('tagName' in el && el.tagName === 'p') {
                    if ('attribs' in el) {
                      // console.log($(el).text());
                    }
                  }
                });
            });

            testing = Array.from(nodes).reduce((accum, node) => {
              if (
                !accum.some((value) => {
                  console.log(value);
                  return (
                    $(value).find('div p').text() ===
                    $(node).find('div p').text()
                  );
                })
              ) {
                accum.push(node);
              }

              return accum;
            }, testing);
          });

          response.send(container.html());
        })
        .catch((err) => console.log(err));
    });
  });

  // res.send(links);
});

app.listen(port, () => console.log(`app listening at port: ${port}`));
