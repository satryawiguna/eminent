import {CountryType} from "./CountryType";

export type ProfileType = {
    title: string,
    firstName: string,
    middleName: string,
    lastName: string,
    degree: string,
    address1: string,
    address2: string,
    city: string,
    county: string,
    stateProvince: string,
    countryId?: string,
    country: CountryType | null,
    postalCode: string
}
