import { config } from 'dotenv';
import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import Page from './Page';
import Pages from './Pages';
import Dataset from './Dataset';

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

          /* here I'm fixing Collection image url from relative to absolute and getting data to result */
          container.each((parentIndex, parentElement) => {
            $(parentElement)
              .find('div > div.card__three')
              .each((cardId, cardEl) => {
                $(cardEl)
                  .children()
                  .each((id, el) => {
                    if (id === 0) {
                      // first element is our image to fix
                      if ('attribs' in el) {
                        el.attribs.src = `${page.url}/${el.attribs.src}`;
                      }
                    }
                  });
              });
          });

          response.send(container.html());
        })
        .catch((err) => console.log(err));
    });
    // axios(url).then((response) => {
    //   const links: cheerio.Element[] = [];
    //
    //   const html_data = response.data;
    //   const $ = cheerio.load(html_data);
    //   // console.log($);
    //   // res.send($);
    //   const container = $('div.containerColl.products-grid').html();
    //   res.send(container);
    // $('div.containerColl.products-grid').each((parentIndex, parentElement) => {
    //   $(parentElement)
    //     .children()
    //     .each((childId, childEl) => {
    //       links.push(childEl);
    //     });
    // });
    //
    // // @ts-ignore
    // const a = links[0].cloneNode(true);
    // console.log(a.attribs.href);
    // console.log(a.html());
    // res.send('text');
  });

  // res.send(links);
});

app.listen(port, () => console.log(`app listening at port: ${port}`));
