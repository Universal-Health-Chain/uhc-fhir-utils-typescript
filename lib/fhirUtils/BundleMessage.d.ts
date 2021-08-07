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
    /** The permanent ID of a FHIR Message across any system is the ID of the MessageHeader of the content resources */
    getCleanIdOfDocumentComposition: (fhirBundle: R4.IBundle) => string;
    getTimestamp(fhirBundle: R4.IBundle): string;
    getAllResources(bundle: R4.IBundle): any[];
    getAllResourcesWithoutCompositionOrMessageHeader(bundle: R4.IBundle): any[];
    /** It returns an arry of IDs, splitting the ID by "/" and getting the last string after the slash */
    getResourceIdsInBundle(bundle: R4.IBundle): string[];
    getResourcesByTypes(bundle: R4.IBundle, resourceTypes: string[]): any[];
    getResourceByIdInBundle(resourceId: string, bundle: R4.IBundle): any;
    /** Bundle type can be "Message" but also "Document", "Collection", "Batch"... */
    getTagsInBundle(fhirBundle: R4.IBundle): string[];
    /** It replaces the given resource in the right Bundle.entry without generating Bundle.entry[].fullUrl */
    replaceResourceById(resource: any, bundle: R4.IBundle): R4.IBundle;
}
/** MessageHeader is always fhirBundle.entry[0].resource in a FHIR Message or it is not a Bundle Message */
export declare function getCleanIdOfMessageHeader(fhirBundle: R4.IBundle): string;
export declare function createBundleMessage(senderId: string, messageId: string, bundleDoc?: R4.IBundle, textMessage?: string, attachments?: R4.IAttachment[], entityTitle?: string, entityDescription?: string): R4.IBundle;
export declare function getBundleDocumentInBundleMessage(bundleMessage: R4.IBundle): R4.IBundle;
export declare function addCommunicationTextToBundleMessage(fhirMessage: R4.IBundle, text: string): R4.IBundle;
export declare function getTextInBundleMessage(fhirMessage: R4.IBundle): string;
export declare function addAttachmentsToBundleMessage(fhirMessage: R4.IBundle, attachments: R4.IAttachment[]): R4.IBundle;
export declare function getAttachmentsInBundleMessage(fhirMessage: R4.IBundle): R4.IAttachment[];
export declare function addAuditEventToBundleMessage(fhirMessage: R4.IBundle, auditEvent: R4.IAuditEvent): R4.IBundle;
