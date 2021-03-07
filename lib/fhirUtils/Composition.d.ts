import { R4 } from "@ahryman40k/ts-fhir-types";
export declare function getCodesOfSections(sections: R4.IComposition_Section[], system: string): string[];
export declare function createDefaultComposition(authorReferenceId?: string, typeDocumentCodeLOINC?: string, id?: string): R4.IComposition;
export declare function addResourcesToComposition(composition: R4.IComposition, resources: any[], sectionCode: string, sectionSystem: string): R4.IComposition;
export declare function createEmptyCompositionSection(sectionCode: string, sectionSystem: string): R4.IComposition_Section;
export declare function addReferencesToCompositionSection(section: R4.IComposition_Section, references: R4.IReference[]): R4.IComposition_Section;
export declare function getSectionByCodeInComposition(composition: R4.IComposition, sectionCode: string, sectionSystem?: string): R4.IComposition_Section;
export declare function putSectionInComposition(composition: R4.IComposition, newSection: R4.IComposition_Section): R4.IComposition;
