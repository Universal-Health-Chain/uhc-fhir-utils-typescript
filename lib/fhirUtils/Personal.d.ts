import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class Personal {
    constructor();
    getSurname2: (fhirHumanName: R4.IHumanName) => string;
    getPhones: (fhir: any, use?: string | undefined) => string[];
    getEmails: (fhir: any, use?: string | undefined) => string[];
}
export declare function getSurname2(fhirHumanName: R4.IHumanName): string;
export declare function getPhones(fhir: any, use?: string): string[];
export declare function getEmails(fhir: any, use?: string): string[];
