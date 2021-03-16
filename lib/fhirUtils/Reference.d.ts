import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class Reference {
    constructor();
    getStringsReferencesByIdentifierAndSystem(referencesFHIR: R4.IReference[], system: string): string[];
    getStringsReferences(referencesFHIR: R4.IReference[]): string[];
    createWithStringReference(strReference: string, type?: string, display?: string): R4.IReference;
    createByStringsReferences(literalReferences: string[]): R4.IReference[];
    createByIdentifiersAndSystem(identifiers: string[], system: string): R4.IReference[];
}
export declare function getStringsReferencesByIdentifierAndSystem(referencesFHIR: R4.IReference[], system: string): string[];
export declare function getStringsReferences(referencesFHIR: R4.IReference[]): string[];
export declare function createWithStringReference(strReference: string, type?: string, display?: string): R4.IReference;
export declare function createByStringsReferences(literalReferences: string[]): R4.IReference[];
export declare function createByIdentifiersAndSystem(identifiers: string[], system: string): R4.IReference[];
