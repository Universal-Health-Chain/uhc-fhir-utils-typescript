import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class Immunization {
    constructor();
    systemVaccineATC: () => string;
    systemVaccineCPT: () => string;
    systemVaccineCVX: () => string;
    systemVaccineSNOMED: () => string;
    systemImmunizationFunding: () => string;
    systemImmunizationEligibilty: () => string;
    systemImmunizationOrigin: () => string;
    systemNotAdministeredReason: () => string;
    systemAdministrationSite: () => string;
    systemRouteOfAdministration: () => string;
    systemImmunizationSubpotent: () => string;
}
export declare function createCovid19BundleDocumentWithImmunizationAndAttachmentsByGroupATC(attachments: R4.IAttachment[]): R4.IBundle;
export declare function createBundleDocumentWithImmunizationAndAttachmentsByGroupATC(atcCode: string, attachments: R4.IAttachment[]): R4.IBundle;
