import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class DocumentReference {
    constructor();
    getDocumentReferenceTypeCodeAndValueOptionsLOINC(language: string): any;
    getFhirAttachmentsInDocumentReference(documentReference: R4.IDocumentReference): R4.IAttachment[];
    createDocumentReference(contents: R4.IDocumentReference_Content[], id?: string, categoryCodeLOINC?: string, identifiers?: R4.IIdentifier[]): R4.IDocumentReference;
}
export declare function createDocumentReferenceToCertificate(documentIdentifier: string, // universal ID of the document (UUID v4 format), it can have several certified / verifiable versions (VC)
masterIdentifierVC: string, // assigned by the source of the document and specific to this version of the document
certifiedBytesAsBase64: string, // the original bytes but now encoded in Base64
mimeType: string, // MIME type of the content bytes
subjectReferenceString: string, // 'Patient/universal-health-identifier'
categoryLOINC?: string, // medical history section to wich the document corresponds
documentTypeLOINC?: string, // LOINC Document Class and HITSP C80 Table 2-144 Document Class
documentLanguage?: string, documentTitle?: string, documentDescription?: string, contentTitle?: string, contentFormatURN?: string): R4.IDocumentReference;
export declare function getDocumentReferenceTypeCodeAndValueOptionsLOINC(language: string): any;
export declare function getFhirAttachmentsInDocumentReference(documentReference: R4.IDocumentReference): R4.IAttachment[];
export declare function createDocumentReference(contents: R4.IDocumentReference_Content[], categoryCodeLOINC?: string, id?: string, identifiers?: R4.IIdentifier[]): R4.IDocumentReference;
