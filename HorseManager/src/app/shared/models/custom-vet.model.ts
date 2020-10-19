// export class CustomVet {
//     constructor(
//         public date: Date,
//         public title: string,
//         public status: string,
//         public price: string,
//         public doctor: string,
//         public horse_id: string,
//         public id: string,
//         public horseName: string,
//     ) {}
// }

import { Moment } from 'moment';


export interface ICustomVet {
    date?: Date,
    title?: string,
    status?: string,
    price?: number,
    doctor?: string,
    horseId?: number,
    id?: string,
    horseName?: string,
}

export class CustomVet implements ICustomVet {
    constructor(
        public date?: Date,
        public title?: string,
        public status?: string,
        public price?: number,
        public doctor?: string,
        public horseId?: number,
        public id?: string,
        public horseName?: string,
    ) { }
}