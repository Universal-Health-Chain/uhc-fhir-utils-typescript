import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class BundleMessage {
    constructor();
    createPlainMessageFHIR(senderId: string, messageId: string, bundleDoc?: R4.IBundle, textMessage?: string, attachments?: R4.IAttachment[], entityTitle?: string, entityDescription?: string): R4.IBundle;
    getBundleDocumentInFhirMessage(bundleMessage: R4.IBundle): R4.IBundle;
    addCommunicationTextToMessageFHIR(fhirMessage: R4.IBundle, text: string): R4.IBundle;
    getTextInDecodedMessageFHIR(fhirMessage: R4.IBundle): string;
    addAttachmentsToDecodedMessageFHIR(fhirMessage: R4.IBundle, attachments: R4.IAttachment[]): R4.IBundle;
    getAttachmentsInDecodedMessageFHIR(fhirMessage: R4.IBundle): R4.IAttachment[];
    addAuditEventToDecodedMessageFHIR(fhirMessage: R4.IBundle, auditEvent: R4.IAuditEvent): R4.IBundle;
}
export declare function createPlainMessageFHIR(senderId: string, messageId: string, bundleDoc?: R4.IBundle, textMessage?: string, attachments?: R4.IAttachment[], entityTitle?: string, entityDescription?: string): R4.IBundle;
export declare function getBundleDocumentInFhirMessage(bundleMessage: R4.IBundle): R4.IBundle;
export declare function addCommunicationTextToMessageFHIR(fhirMessage: R4.IBundle, text: string): R4.IBundle;
export declare function getTextInDecodedMessageFHIR(fhirMessage: R4.IBundle): string;
export declare function addAttachmentsToDecodedMessageFHIR(fhirMessage: R4.IBundle, attachments: R4.IAttachment[]): R4.IBundle;
export declare function getAttachmentsInDecodedMessageFHIR(fhirMessage: R4.IBundle): R4.IAttachment[];
export declare function addAuditEventToDecodedMessageFHIR(fhirMessage: R4.IBundle, auditEvent: R4.IAuditEvent): R4.IBundle;
