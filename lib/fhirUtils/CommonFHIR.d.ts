import { R4 } from "@ahryman40k/ts-fhir-types";
/** URNs are case insensitive
 * "UUID", "UVCI". "DVCI" or "VCID" MUST BE added when an UUID, Health Certificate, SMART Health Card or a Verifiable Credential ID (txId or version ID) exists
*/
export declare enum UrnPrefixFHIR {
    BundleDocument = "URN:FHIR:DOCUMENT:",
    DocumentComposition = "URN:FHIR:COMPOSITION:",
    Attachment = "URN:FHIR:ATTACHMENT:",
    DocumentReference = "URN:FHIR:DOCUMENTREFERENCE:",
    Immunization = "URN:FHIR:IMMUNIZATION:",
    DiagnosticReport = "URN:FHIR:DIAGNOSTICREPORT:",
    Observation = "URN:FHIR:OBSERVATION:",
    VitalSign = "URN:FHIR:VITALSIGN:"
}
export declare const BLOOD_TYPING_MAIN_CODE_TEXT = "Blood typing";
export declare const FHIR_DATE_REGEX = "([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?";
export declare const FHIR_DATETIME_REGEX = "([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(.[0-9]+)?(Z|(+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?";
export declare const FHIR_INSTANT_REGEX = "([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(.[0-9]+)?(Z|(+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))";
export declare const ANONYMIZATION: string[];
export declare class CommonFHIR {
    constructor();
    anonymizeResource(fhirResource: any): any;
    classifyBundleByResourceTypes: (fhirDocument: R4.IBundle) => Map<string, R4.IBundle_Entry[]>;
    getLabelsOfGroupedCodes(codes: string[], codeLabels: any, groupedSectionName?: string): string[];
    /** It returns empty or an ID with no URN prefix and no FHIR Reference prefix */
    cleanId: (id: string) => string;
    getCleanIdOfResource: (resource: any | undefined) => string;
    /** It returns a normalized and crypto safe predictable FHIR JSON resource or document as string (canonicalized as defined by RFC8785) */
    normalizedAndCanonicalizedFHIR: (json: any) => any;
}
/** It returns empty or an ID without URN prefix or FHIR Reference prefix */
export declare function cleanId(id: string): string;
/**
 * It gets a single ID from a FHIR reference URI or URN, among others.
 * NOTE: if empty result it should be fixed or deleted by the fronted
*/
export declare function getCleanIdOfResource(resource: any | undefined): string;
export declare function getBundleEntriesMap(fhirDocument: R4.IBundle): Map<string, R4.IBundle_Entry[]>;
/** It returns a normalized and crypto safe predictable FHIR JSON resource or document (canonicalized as defined by RFC8785) */
export declare function normalizedAndCanonicalizedFHIR(json: any): any;
export declare function anonymizeResource(fhirResource: any): any;
export declare function getLabelsOfGroupedCodes(codes: string[], hl7LanguageFile: any, targetGroupedSection?: string): string[];
