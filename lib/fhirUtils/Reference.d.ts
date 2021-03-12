import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class Reference {
    constructor();
    getReferencesByIdentifierAndSystem(referencesFHIR: R4.IReference[], system: string): string[];
    getLiteralReferencesStrings(referencesFHIR: R4.IReference[]): string[];
    createReferenceFHIR(strReference: string, type?: string, display?: string): R4.IReference;
    createReferencesByLiteralURLs(literalReferences: string[]): R4.IReference[];
    createReferenceIdentifiers(identifiers: string[], system: string): R4.IReference[];
}
export declare function getReferencesByIdentifierAndSystem(referencesFHIR: R4.IReference[], system: string): string[];
export declare function getLiteralReferencesStrings(referencesFHIR: R4.IReference[]): string[];
export declare function createReferenceFHIR(strReference: string, type?: string, display?: string): R4.IReference;
export declare function createReferencesByLiteralURLs(literalReferences: string[]): R4.IReference[];
export declare function createReferenceIdentifiers(identifiers: string[], system: string): R4.IReference[];
