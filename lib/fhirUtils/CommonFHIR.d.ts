export declare const systemICD10 = "http://hl7.org/fhir/sid/icd-10";
export declare const systemLOINC = "http://loinc.org";
export declare const systemSNOMED = "http://snomed.info/sct";
export declare const systemUCUM = "http://unitsofmeasure.org";
export declare const BLOOD_TYPING_MAIN_CODE_TEXT = "Blood typing";
export declare const FHIR_DATE_REGEX = "([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?";
export declare const FHIR_DATETIME_REGEX = "([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(.[0-9]+)?(Z|(+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?";
export declare const FHIR_INSTANT_REGEX = "([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(.[0-9]+)?(Z|(+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))";
export declare const ANONYMIZATION: string[];
export declare class CommonFHIR {
    constructor();
    anonymizeResource(fhirResource: any): any;
    getLabelsOfGroupedCodes(codes: string[], codeLabels: any, groupedSectionName?: string): string[];
    getDisplayCode(code: string, englishCodeLabels: any): string;
    getLocalizedTextCode(code: string, localizedCodeLabels: any): string;
}
export declare function anonymizeResource(fhirResource: any): any;
export declare function getLabelsOfGroupedCodes(codes: string[], codeLabels: any, groupedSectionName?: string): string[];
export declare function getDisplayCode(code: string, englishCodeLabels: any): string;
export declare function getLocalizedTextCode(code: string, localizedCodeLabels: any): string;
