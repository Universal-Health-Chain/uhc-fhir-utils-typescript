import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class Attachment {
    constructor();
    createFhirAttachment(mimeType: string, id?: string, url?: string, title?: string, language?: string, hashSHA1?: string, size?: number, base64Data?: string, creationDateTime?: string): R4.IAttachment;
    getBytesEmbedded(fhirAttachment: R4.IAttachment): Uint8Array;
}
export declare function createAttachmentFHIR(url: string, resourceLanguage?: string, size?: number, hash?: string, creation?: string, title?: string): R4.IAttachment;
export declare function createFhirAttachment(mimeType: string, id?: string, url?: string, title?: string, language?: string, hashSHA1?: string, size?: number, base64Data?: string, creationDateTime?: string): R4.IAttachment;
export declare function getBytesEmbedded(fhirAttachment: R4.IAttachment): Uint8Array;
