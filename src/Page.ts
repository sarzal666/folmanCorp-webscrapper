import Dataset from './Dataset';

class Page {
  private _name: string;
  private _languages: Array<string>;
  private _url: string;
  private _dataset: Array<Dataset>;

  constructor(
    name: string,
    languages: Array<string>,
    url: string,
    dataset: Array<Dataset>
  ) {
    this._name = name;
    this._languages = languages;
    this._url = url;
    this._dataset = dataset;
  }

  /* creates url with specified lang */
  getUrlWithLang(lang: string): string {
    return `${this._url}/${lang}`;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get languages(): Array<string> {
    return this._languages;
  }

  set languages(value: Array<string>) {
    this._languages = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get dataset(): Array<Dataset> {
    return this._dataset;
  }

  set dataset(value: Array<Dataset>) {
    this._dataset = value;
  }
}

export default Page;
