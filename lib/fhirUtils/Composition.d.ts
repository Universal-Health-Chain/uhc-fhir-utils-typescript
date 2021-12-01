import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class Composition {
    constructor();
    /** First it checks if there is a valid 'Composition' resource (with title, type, date and status)
     * as first resource in the FHIR Bundle document, then return the type code if any or undefined */
    getTypeOfBundleDocumentComposition(fhirBundleDocument: R4.IBundle): string | undefined;
    getCodesOfSections(sections: R4.IComposition_Section[], system: string): string[];
    createDefaultComposition(authorReferenceId: string, typeDocumentCodeLOINC?: string, id?: string): R4.IComposition;
    /** deprecated: create the empty IPS document and then add resources by section
    createEmptyCompositionIPS(authorReferenceId:string): R4.IComposition {
        return createEmptyCompositionIPS(authorReferenceId)
    } */
    addResourcesToComposition(composition: R4.IComposition, resources: any[], sectionCode: string, sectionSystem: string): R4.IComposition;
    createEmptyCompositionSection(loincSectionCode: string): R4.IComposition_Section;
    addReferencesToCompositionSection(section: R4.IComposition_Section, references: R4.IReference[]): R4.IComposition_Section;
    getReferencesOfResources(resources: any[]): R4.IReference[];
    getSectionByCodeInComposition(composition: R4.IComposition, loincSectionCode: string): R4.IComposition_Section | undefined;
    putSectionInComposition(composition: R4.IComposition, newSection: R4.IComposition_Section): R4.IComposition;
}
/** First it checks if there is a valid 'Composition' resource (with title, type, date and status)
 * as first resource in the FHIR Bundle document, then return the type code if any or undefined */
export declare function getTypeOfBundleDocumentComposition(fhirBundleDocument: R4.IBundle): string | undefined;
export declare function getCodesOfSections(sections: R4.IComposition_Section[], system: string): string[];
/** TODO: create title translating the LOINC document type code.
 * The default 'typeDocumentCodeLOINC' is set to '11503-0' (generic 'Medical records') if not provided.
 * The 'id' is autogenerated as UUIDv4 if not provided.
 * The default 'status' is set to 'preliminary' if not provided (draft).
 * Date is the timestamp (ISO string).
*/
export declare function createDefaultComposition(authorReferenceURN: string, typeDocumentCodeLOINC?: string, typeDocumentDisplay?: string, idOrURN?: string, status?: R4.CompositionStatusKind, language?: string): R4.IComposition;
/** Create composition with mandatory properties and with URN as ID. Title is mandatory, it is not automatically generated */
export declare function createCompositionWithId(idOrURN: string, authorReferenceURN: string, date: string, title: string, status: R4.CompositionStatusKind, typeDocumentCode: string, typeDocumentSystem: string, typeDocumentDisplay?: string, language?: string): R4.IComposition;
export declare function addResourcesToComposition(composition: R4.IComposition, resources: any[], sectionCode: string): R4.IComposition;
export declare function createEmptyCompositionSection(sectionCode: string): R4.IComposition_Section;
export declare function addReferencesToCompositionSection(section: R4.IComposition_Section, references: R4.IReference[]): R4.IComposition_Section;
/** getSectionByCodeInComposition returns undefined if no section found */
export declare function getSectionByCodeInComposition(composition: R4.IComposition, loincSectionCode: string): R4.IComposition_Section | undefined;
export declare function putSectionInComposition(composition: R4.IComposition, newSection: R4.IComposition_Section): R4.IComposition;
