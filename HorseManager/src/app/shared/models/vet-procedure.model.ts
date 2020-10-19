export class VetProcedure {
    constructor(
        public date: Date,
        public title: string,
        public status: string,
        public price: string,
        public vet: string,
        public vetId: string,
        public clubId: string,
        public clubTitle: string,
        public horse_id: string,
        public id: string,
        public horseName: string,
        public type: string
    ) {}
}


export interface IVetProcedure {
    date: Date,
    title: string,
    status: string,
    price: string,
    vet: string,
    vetId: string,
    clubId: string,
    clubTitle: string,
    horse_id: string,
    id: string,
    horseName: string,
    type: string
  }