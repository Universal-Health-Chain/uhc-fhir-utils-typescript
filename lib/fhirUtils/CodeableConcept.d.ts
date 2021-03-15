import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class CodeableConcept {
    constructor();
    getCodingsBySystem(codeableConcept: R4.ICodeableConcept, system: string): R4.ICoding[];
    getSingleCodingBySystem(codeableConcept: R4.ICodeableConcept, system: string): R4.ICoding;
    getCodingsLOINC(codeableConcept: R4.ICodeableConcept): R4.ICoding[];
    getSingleCodingLOINC(codeableConcept: R4.ICodeableConcept): R4.ICoding;
    getCodingsSNOMED(codeableConcept: R4.ICodeableConcept): R4.ICoding[];
    getSingleCodingSNOMED(codeableConcept: R4.ICodeableConcept): R4.ICoding;
    createCoding(code: string, system: string): R4.ICoding;
    getExistingTargetCodesInCodeableConcepts(codeableConcepts: R4.ICodeableConcept[], targetCodes: string[]): string[];
    addExistingTargetCodesInCodeableConcepts(codeableConcepts: R4.ICodeableConcept[], targetCodes: string[], currentCodes: string[]): string[];
    getCodeListInCodeableConcept(codeableConcept: R4.ICodeableConcept | undefined, system?: string): string[];
    getCodeListInArrayOfCodeableConcepts(codeableConcepts: R4.ICodeableConcept[] | undefined, system?: string): string[];
    createCodeableConceptBySystem(code: string, system: string): R4.ICodeableConcept;
    createArrayOfCodeableConceptsOfSystem(inputCodes: string[], system: string): R4.ICodeableConcept[];
}
/** Coding  */
export declare function getCodingsBySystem(codeableConcept: R4.ICodeableConcept, system: string): R4.ICoding[];
export declare function getSingleCodingBySystem(codeableConcept: R4.ICodeableConcept, system: string): R4.ICoding;
export declare function getCodingsLOINC(codeableConcept: R4.ICodeableConcept): R4.ICoding[];
export declare function getSingleCodingLOINC(codeableConcept: R4.ICodeableConcept): R4.ICoding;
export declare function getCodingsSNOMED(codeableConcept: R4.ICodeableConcept): R4.ICoding[];
export declare function getSingleCodingSNOMED(codeableConcept: R4.ICodeableConcept): R4.ICoding;
export declare function createDisplayOrTextOfCodeable(code: string, system: string, customLanguageFile?: any): string;
export declare function createCoding(code: string, system: string, display?: string): R4.ICoding;
/** Codeable Concepts */
export declare function getExistingTargetCodesInCodeableConcepts(codeableConcepts: R4.ICodeableConcept[], targetCodes: string[]): string[];
export declare function addExistingTargetCodesInCodeableConcepts(codeableConcepts: R4.ICodeableConcept[], targetCodes: string[], currentCodes: string[]): string[];
export declare function getCodeListInCodeableConcept(codeableConcept: R4.ICodeableConcept | undefined, system?: string): string[];
export declare function getCodeListInArrayOfCodeableConcepts(codeableConcepts: R4.ICodeableConcept[] | undefined, system?: string): string[];
export declare function createCodeableConceptBySystem(code: string, system: string, customLanguageFile?: any): R4.ICodeableConcept;
export declare function createArrayOfCodeableConceptsOfSystem(inputCodes: string[], system: string, customLanguageFile?: any): R4.ICodeableConcept[];
