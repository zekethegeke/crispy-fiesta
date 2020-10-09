import { WekePageRef } from 'weke-plex';

export interface Address {
    id: number,
    first: string,
    last: string,
    email: string,
    gender: string,
    ip: string
}

export class Addresses {
    readonly males: Address[];
    readonly females: Address[];

    constructor(readonly all: Address[]) {
        this.males = all.filter(it => it.gender === "Male");
        this.females = all.filter(it => it.gender === "Female");
    }

    static ofJson(json: string) {
        return new Addresses(JSON.parse(json) as Address[]);
    }
}

export const addressesPage = new WekePageRef("AddressesPage");
