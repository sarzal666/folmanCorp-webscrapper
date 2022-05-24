class Page {
  private _url: string;
  private _targetUrl: string;

  constructor(url: string, targetUrl: string) {
    this._url = url;
    this._targetUrl = targetUrl;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get targetUrl(): string {
    return this._targetUrl;
  }

  set targetUrl(value: string) {
    this._targetUrl = value;
  }
}

export default Page;
