import { R4 } from "@ahryman40k/ts-fhir-types";
export declare const systemICD10 = "http://hl7.org/fhir/sid/icd-10";
export declare const systemLOINC = "http://loinc.org";
export declare const systemSNOMED = "http://snomed.info/sct";
export declare const systemUCUM = "http://unitsofmeasure.org";
export default class CodeableConcept {
    constructor();
    getCodingsBySystem(coding: R4.ICoding[], system: string): R4.ICoding[];
    getSingleCodingBySystem(coding: R4.ICoding[], system: string): R4.ICoding;
    getCodingsLOINC(coding: R4.ICoding[]): R4.ICoding[];
    getSingleCodingLOINC(coding: R4.ICoding[]): R4.ICoding;
    getCodingSNOMED(coding: R4.ICoding[]): R4.ICoding[];
    getSingleCodingSNOMED(coding: R4.ICoding[]): R4.ICoding;
    createCoding(code: string, system: string): R4.ICoding;
    getExistingTargetCodesInCodeableConcepts(codeableConcepts: R4.ICodeableConcept[], targetCodes: string[]): string[];
    addExistingTargetCodesInCodeableConcepts(codeableConcepts: R4.ICodeableConcept[], targetCodes: string[], currentCodes: string[]): string[];
    getCodeListInCodeableConcept(codeableConcept: R4.ICodeableConcept | undefined, system?: string): string[];
    getCodeListInArrayOfCodeableConcepts(codeableConcepts: R4.ICodeableConcept[] | undefined, system?: string): string[];
    createSingleCodeableConceptSNOMED(code: string, language?: string): R4.ICodeableConcept;
    createCodeableConceptsFromSNOMED(codes: string[], language?: string): R4.ICodeableConcept[];
    createCodeableConceptBySystem(code: string, system: string): R4.ICodeableConcept;
    createArrayOfCodeableConceptsOfSystem(inputCodes: string[], system: string): R4.ICodeableConcept[];
}
/** Coding  */
export declare function getCodingsBySystem(coding: R4.ICoding[], system: string): R4.ICoding[];
export declare function getSingleCodingBySystem(coding: R4.ICoding[], system: string): R4.ICoding;
export declare function getCodingsLOINC(coding: R4.ICoding[]): R4.ICoding[];
export declare function getSingleCodingLOINC(coding: R4.ICoding[]): R4.ICoding;
export declare function getCodingSNOMED(coding: R4.ICoding[]): R4.ICoding[];
export declare function getSingleCodingSNOMED(coding: R4.ICoding[]): R4.ICoding;
export declare function createCoding(code: string, system: string): R4.ICoding;
/** Codeable Concepts */
export declare function getExistingTargetCodesInCodeableConcepts(codeableConcepts: R4.ICodeableConcept[], targetCodes: string[]): string[];
export declare function addExistingTargetCodesInCodeableConcepts(codeableConcepts: R4.ICodeableConcept[], targetCodes: string[], currentCodes: string[]): string[];
export declare function getCodeListInCodeableConcept(codeableConcept: R4.ICodeableConcept | undefined, system?: string): string[];
export declare function getCodeListInArrayOfCodeableConcepts(codeableConcepts: R4.ICodeableConcept[] | undefined, system?: string): string[];
export declare function createSingleCodeableConceptSNOMED(code: string, language?: string): R4.ICodeableConcept;
export declare function createCodeableConceptsFromSNOMED(codes: string[], language?: string): R4.ICodeableConcept[];
export declare function createCodeableConceptBySystem(code: string, system: string): R4.ICodeableConcept;
export declare function createArrayOfCodeableConceptsOfSystem(inputCodes: string[], system: string): R4.ICodeableConcept[];
