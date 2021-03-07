import { R4 } from "@ahryman40k/ts-fhir-types";
export declare function getDocumentReferenceAdditionalCategoryCodeAndValueOptionsLOINC(language: string): any[];
export declare function getDocumentReferenceTypeCodeAndValueOptionsLOINC(language: string): any;
export declare function getFhirAttachmentsInDocumentReference(documentReference: R4.IDocumentReference): R4.IAttachment[];
export declare function createDocumentReference(contents: R4.IDocumentReference_Content[], id?: string, identifiers?: R4.IIdentifier[]): R4.IDocumentReference;
