import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class BundleMessage {
    constructor();
    create(senderId: string, messageId: string, bundleDoc?: R4.IBundle, textMessage?: string, attachments?: R4.IAttachment[], entityTitle?: string, entityDescription?: string): R4.IBundle;
    createBasicBundleMessage(messageId: string, textMessage?: string, attachments?: R4.IAttachment[]): R4.IBundle;
    createEmptyMessage: () => R4.IBundle;
    createMessageHeader: (messageId: string) => R4.IMessageHeader;
    getBundleDocumentInBundleMessage(bundleMessage: R4.IBundle): R4.IBundle;
    addCommunicationTextToBundleMessage(fhirMessage: R4.IBundle, text: string): R4.IBundle;
    getTextInBundleMessage(fhirMessage: R4.IBundle): string;
    addAttachmentsToBundleMessage(fhirMessage: R4.IBundle, attachments: R4.IAttachment[]): R4.IBundle;
    getAttachmentsInBundleMessage(fhirMessage: R4.IBundle): R4.IAttachment[];
    addAuditEventToBundleMessage(fhirMessage: R4.IBundle, auditEvent: R4.IAuditEvent): R4.IBundle;
}
export declare function createBundleMessage(senderId: string, messageId: string, bundleDoc?: R4.IBundle, textMessage?: string, attachments?: R4.IAttachment[], entityTitle?: string, entityDescription?: string): R4.IBundle;
export declare function getBundleDocumentInBundleMessage(bundleMessage: R4.IBundle): R4.IBundle;
export declare function addCommunicationTextToBundleMessage(fhirMessage: R4.IBundle, text: string): R4.IBundle;
export declare function getTextInBundleMessage(fhirMessage: R4.IBundle): string;
export declare function addAttachmentsToBundleMessage(fhirMessage: R4.IBundle, attachments: R4.IAttachment[]): R4.IBundle;
export declare function getAttachmentsInBundleMessage(fhirMessage: R4.IBundle): R4.IAttachment[];
export declare function addAuditEventToBundleMessage(fhirMessage: R4.IBundle, auditEvent: R4.IAuditEvent): R4.IBundle;
