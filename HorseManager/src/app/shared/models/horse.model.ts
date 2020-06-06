import { Moment } from 'moment';
import { Gender } from './enumerations/gender.model';

export interface IHorse {
  id?: number;
  name?: string;
  gender?: Gender;
  birth?: Moment;
  color?: number;
  ownerID?: number;
}

export class Horse implements IHorse {
  constructor(public id?: number, public name?: string, public gender?: Gender, public birth?: Moment, public color?: number, public ownerID?: number) {}
}