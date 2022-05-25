import DatasetTypes from './enums/DatasetTypes';

class Dataset {
  private _name: string;
  private _location: string;
  private _parentSelector: string;
  private _type: DatasetTypes;

  constructor(
    name: string,
    location: string,
    parentSelector: string,
    type: DatasetTypes
  ) {
    this._name = name;
    this._location = location;
    this._parentSelector = parentSelector;
    this._type = type;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get location(): string {
    return this._location;
  }

  set location(value: string) {
    this._location = value;
  }

  get parentSelector(): string {
    return this._parentSelector;
  }

  set parentSelector(value: string) {
    this._parentSelector = value;
  }

  get type(): DatasetTypes {
    return this._type;
  }

  set type(value: DatasetTypes) {
    this._type = value;
  }
}

export default Dataset;
