import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class CodeableConcept {
    constructor();
    getCodings(codeableConcept: R4.ICodeableConcept, system: string): R4.ICoding[];
    getSingleCoding(codeableConcept: R4.ICodeableConcept, system: string): R4.ICoding;
    getCodingInArrayOfCodeableConcepts(codeableConcepts: R4.ICodeableConcept[], system: string): R4.ICoding;
    getCodeableConceptInArray(codeableConcepts: R4.ICodeableConcept[], system: string): R4.ICodeableConcept;
    createCoding(code: string, system: string): R4.ICoding;
    getExistingTargetCodesInCodeableConcepts(codeableConcepts: R4.ICodeableConcept[], targetCodes: string[]): string[];
    addExistingTargetCodesInCodeableConcepts(codeableConcepts: R4.ICodeableConcept[], targetCodes: string[], currentCodes: string[]): string[];
    getCodeListInCodeableConcept(codeableConcept: R4.ICodeableConcept | undefined, system?: string): string[];
    getCodeListInArrayOfCodeableConcepts(codeableConcepts: R4.ICodeableConcept[] | undefined, system?: string): string[];
    createCodeableConcept(typeCode: string, codeSystem: string, internationalDisplay: string, systemVersion?: string, userSelected?: boolean, customText?: string): R4.ICodeableConcept;
    createCodeableConceptWithOptionalLanguage(typeCode: string | undefined, codeSystem: string, customLanguageFile?: any): R4.ICodeableConcept;
    createArrayOfCodeableConceptsOfSystem(inputCodes: string[] | undefined, codeSystem: string, customLanguageFile?: any): R4.ICodeableConcept[];
    createCodingArrayOfSystem(inputCodes: string[] | undefined, codeSystem: string, englishData: object): R4.ICoding[];
}
/** Coding  */
export declare function getCodeableConceptInArray(codeableConcepts: R4.ICodeableConcept[], system: string): R4.ICodeableConcept;
export declare function getCodingInArrayOfCodeableConcepts(codeableConcepts: R4.ICodeableConcept[], system: string): R4.ICoding;
export declare function getCodingsBySystem(codeableConcept: R4.ICodeableConcept, system: string): R4.ICoding[];
export declare function getSingleCodingBySystem(codeableConcept: R4.ICodeableConcept, system: string): R4.ICoding;
export declare function createDisplayOrTextOfCodeable(code: string, system: string, customLanguageFile?: any): string;
export declare function createCoding(code: string, system: string, display?: string, systemVersion?: string, userSelected?: boolean): R4.ICoding;
/** Codeable Concepts */
export declare function getExistingTargetCodesInCodeableConcepts(codeableConcepts: R4.ICodeableConcept[], targetCodes: string[]): string[];
export declare function addExistingTargetCodesInCodeableConcepts(codeableConcepts: R4.ICodeableConcept[], targetCodes: string[], currentCodes: string[]): string[];
export declare function getCodeListInCodeableConcept(codeableConcept: R4.ICodeableConcept | undefined, system?: string): string[];
export declare function getCodeListInArrayOfCodeableConcepts(codeableConcepts: R4.ICodeableConcept[] | undefined, system?: string): string[];
export declare function createCodeableConceptWithOptionalLanguage(typeCode: string | undefined, codeSystem: string, customLanguageFile?: any, systemVersion?: string, userSelected?: boolean): R4.ICodeableConcept;
export declare function createCodeableConcept(typeCode: string, codeSystem: string, internationalDisplay: string, systemVersion?: string, userSelected?: boolean, customText?: string): R4.ICodeableConcept;
export declare function createCodeableConceptsArrayOfSystem(inputCodes: string[] | undefined, system: string, customLanguageFile?: any): R4.ICodeableConcept[];
export declare function createCodingArrayOfSystem(inputCodes: string[] | undefined, codeSystem: string, englishData: object): R4.ICoding[];
