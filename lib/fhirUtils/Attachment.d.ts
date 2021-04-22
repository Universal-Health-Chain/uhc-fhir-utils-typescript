import { R4 } from "@ahryman40k/ts-fhir-types";
export declare enum MimeType {
    jpeg = "image/jpeg",
    pdf = "application/pdf",
    png = "image/png",
    fhirJson = "application/fhir+json",
    fhirXml = "application/fhir+xml"
}
export declare class Attachment {
    constructor();
    fhirAttachmentFromBytes(bytesArray: Uint8Array, mimeType: string, id?: string, url?: string, title?: string, language?: string, creationDateTime?: string): R4.IAttachment;
    createFhirAttachment(mimeType?: string, id?: string, url?: string, title?: string, language?: string, hashSHA1?: string, size?: number, base64Data?: string, creationDateTime?: string): R4.IAttachment;
    getBytesEmbedded(fhirAttachment: R4.IAttachment): Uint8Array;
}
export declare function fhirAttachmentFromBytes(bytesArray: Uint8Array, mimeType: string, id?: string, url?: string, title?: string, language?: string, creationDateTime?: string): R4.IAttachment;
export declare function createFhirAttachment(mimeType?: string, id?: string, url?: string, title?: string, language?: string, hashSHA1?: string, size?: number, base64Data?: string, creationDateTime?: string): R4.IAttachment;
export declare function getBytesEmbedded(fhirAttachment: R4.IAttachment): Uint8Array;
