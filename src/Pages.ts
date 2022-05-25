import DatasetTypes from './enums/DatasetTypes';

const pages = [
  {
    name: 'abk',
    languages: ['en'],
    url: 'https://www.abk.it',
    dataset: [
      {
        name: 'collections',
        location: '/collections',
        parentSelector: 'div.containerColl.products-grid',
        type: DatasetTypes.GROUP,
      },
    ],
  },
];

export default pages;
