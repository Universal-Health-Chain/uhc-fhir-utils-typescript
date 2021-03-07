import { R4 } from "@ahryman40k/ts-fhir-types";
export declare const systemICD10 = "http://hl7.org/fhir/sid/icd-10";
export declare const systemLOINC = "http://loinc.org";
export declare const systemSNOMED = "http://snomed.info/sct";
export declare const systemUCUM = "http://unitsofmeasure.org";
/** Coding  */
export declare function getCodingsBySystem(coding: R4.ICoding[], system: string): R4.ICoding[];
export declare function getSingleCodingFHIRBySystem(coding: R4.ICoding[], system: string): R4.ICoding;
export declare function getLOINCCoding(coding: R4.ICoding[]): R4.ICoding[];
export declare function getSingleLOINCCoding(coding: R4.ICoding[]): R4.ICoding;
export declare function getSNOMEDCoding(coding: R4.ICoding[]): R4.ICoding[];
export declare function getSingleSNOMEDCoding(coding: R4.ICoding[]): R4.ICoding;
export declare function createCoding(code: string, system: string): R4.ICoding;
/** Quantity */
export declare function createSimpleQuantityByCodeMg(number: number): R4.IQuantity;
export declare function createSimpleQuantityByCodeMl(number: number): R4.IQuantity;
export declare function createSimpleQuantity(number: number, code: string): R4.IQuantity;
/** Codeable Concepts */
export declare function getExistingTargetCodesInCodeableConcepts(codeableConcepts: R4.ICodeableConcept[], targetCodes: string[]): string[];
export declare function addExistingTargetCodesInCodeableConcepts(codeableConcepts: R4.ICodeableConcept[], targetCodes: string[], currentCodes: string[]): string[];
export declare function getCodeListInCodeableConcept(codeableConcept: R4.ICodeableConcept | undefined, system?: string): string[];
export declare function getCodeListInArrayOfCodeableConcepts(codeableConcepts: R4.ICodeableConcept[] | undefined, system?: string): string[];
export declare function getCodesOfSections(sections: R4.IComposition_Section[], system: string): string[];
export declare function createCodeableConceptsFromSNOMED(codes: string[], language?: string): R4.ICodeableConcept[];
export declare function createCodeableConceptFromSNOMED(code: string, language?: string): R4.ICodeableConcept;
export declare function createArrayOfCodeableConceptsOfSystem(inputCodes: string[], system: string): R4.ICodeableConcept[];
export declare function createCodeableConceptBySystem(code: string, system: string): R4.ICodeableConcept;
/** References */
export declare function createReferenceIdentifiers(identifiers: string[], system: string): R4.IReference[];
export declare function getReferencesByIdentifierAndSystem(referencesFHIR: R4.IReference[], system: string): string[];
export declare function createReferenceLiteralURLs(literalReferences: string[]): R4.IReference[];
export declare function getLiteralReferences(referencesFHIR: R4.IReference[]): string[];
