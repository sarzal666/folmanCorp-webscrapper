import { config } from 'dotenv';
import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import Page from './Page';

config();

const port = process.env.SERVER_PORT;

const app = express();

const url = 'https://www.abk.it/en/collections';

const pages = [
  {
    name: 'abk',
    url: 'https://www.abk.it/en/',
    targetUrl: 'https://www.abk.it/en/collections',
  },
];

app.get('/', (req, res) => {
  pages.forEach((scrapData) => {
    const page = new Page(scrapData.url, scrapData.targetUrl);

    axios(page.targetUrl).then((response) => {
      const htmlData = response.data;
      const $ = cheerio.load(htmlData);
    });
  });
  axios(url).then((response) => {
    const links: cheerio.Element[] = [];

    const html_data = response.data;
    const $ = cheerio.load(html_data);
    // console.log($);
    // res.send($);
    const container = $('div.containerColl.products-grid').html();
    res.send(container);
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
