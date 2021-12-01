"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAuditEventToBundleMessage = exports.getAttachmentsInBundleMessage = exports.addAttachmentsToBundleMessage = exports.getTextInBundleMessage = exports.addCommunicationTextToBundleMessage = exports.getBundleDocumentInBundleMessage = exports.createBundleMessage = exports.getCleanIdOfMessageHeader = exports.BundleMessage = void 0;
const ts_fhir_types_1 = require("@ahryman40k/ts-fhir-types");
const uuid_1 = require("uuid");
const CommonFHIR_1 = require("./CommonFHIR");
const Bundle_1 = require("./Bundle");
const uhc_common_utils_typescript_1 = require("@universal-health-chain/uhc-common-utils-typescript");
const uuidUtils = new uhc_common_utils_typescript_1.Uuid();
class BundleMessage {
    constructor() {
        this.createEmptyMessage = () => createEmptyMessage();
        // It creates the mandatory MessageHeader with id equal to the messageId (which is like a document ID in CouchDB / PouchDB)
        this.createMessageHeader = (messageId) => createMessageHeader(messageId);
        /** The permanent ID of a FHIR Message across any system is the ID of the MessageHeader of the content resources */
        this.getCleanIdOfDocumentComposition = (fhirBundle) => getCleanIdOfMessageHeader(fhirBundle);
    }
    create(senderId, messageId, bundleDoc, textMessage, attachments, entityTitle, entityDescription) {
        return createBundleMessage(senderId, messageId, bundleDoc, textMessage, attachments, entityTitle, entityDescription);
    }
    createBasicBundleMessage(messageId, textMessage, attachments) {
        return createBasicBundleMessage(messageId, textMessage, attachments);
    }
    getBundleDocumentInBundleMessage(bundleMessage) {
        return getBundleDocumentInBundleMessage(bundleMessage);
    }
    addCommunicationTextToBundleMessage(fhirMessage, text) {
        return addCommunicationTextToBundleMessage(fhirMessage, text);
    }
    getTextInBundleMessage(fhirMessage) {
        return getTextInBundleMessage(fhirMessage);
    }
    addAttachmentsToBundleMessage(fhirMessage, attachments) {
        return addAttachmentsToBundleMessage(fhirMessage, attachments);
    }
    getAttachmentsInBundleMessage(fhirMessage) {
        return getAttachmentsInBundleMessage(fhirMessage);
    }
    addAuditEventToBundleMessage(fhirMessage, auditEvent) {
        return addAuditEventToBundleMessage(fhirMessage, auditEvent);
    }
    getTimestamp(fhirBundle) {
        return Bundle_1.getTimestamp(fhirBundle);
    }
    getAllResources(bundle) {
        // return getAllResourcesInBundle(bundle)
        return Bundle_1.getResourcesWithFilters(bundle, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    }
    getAllResourcesWithoutCompositionOrMessageHeader(bundle) {
        // return getAllResourcesWithoutCompositionOrMessageHeader(bundle)
        const excludedResources = ['Composition', 'MessageHeader'];
        return Bundle_1.getResourcesWithFilters(bundle, undefined, undefined, excludedResources, undefined, undefined, undefined, undefined);
    }
    getResourcesByTypes(bundle, resourceTypes) {
        // return getResourcesByTypes(bundle, resourceTypes)
        return Bundle_1.getResourcesWithFilters(bundle, undefined, undefined, undefined, resourceTypes, undefined, undefined, undefined);
    }
    /** It returns an arry of IDs, splitting the ID by "/" and getting the last string after the slash */
    getResourceIdsInBundle(bundle) {
        return Bundle_1.getResourceIdsInBundle(bundle);
    }
    getResourceByIdInBundle(resourceId, bundle) {
        return Bundle_1.getResourceByIdInBundle(resourceId, bundle);
    }
    /** It replaces the given resource in the right Bundle.entry without generating Bundle.entry[].fullUrl */
    replaceResourceById(resource, bundle) {
        return Bundle_1.replaceResourceById(resource, bundle);
    }
}
exports.BundleMessage = BundleMessage;
/** MessageHeader is always fhirBundle.entry[0].resource in a FHIR Message or it is not a Bundle Message */
function getCleanIdOfMessageHeader(fhirBundle) {
    if (!fhirBundle || !fhirBundle.entry || !fhirBundle.entry.length || fhirBundle.entry.length < 1 ||
        !fhirBundle.entry[0].resource || !fhirBundle.entry[0].resource.resourceType ||
        fhirBundle.entry[0].resource.resourceType !== "MessageHeader" || !!fhirBundle.entry[0].resource.id) {
        return ""; // instead of error
    }
    else {
        return CommonFHIR_1.getCleanIdByFhirResource(fhirBundle.entry[0].resource.id);
    }
}
exports.getCleanIdOfMessageHeader = getCleanIdOfMessageHeader;
// export function createBundleMessage(resources?:any[]): R4.IBundle { return createEmptyBundleOfType(R4.BundleTypeKind._message, resources)}
function createEmptyMessage() {
    let bundle = {
        resourceType: "Bundle",
        type: ts_fhir_types_1.R4.BundleTypeKind._message,
        id: uuid_1.v4()
    };
    return bundle;
}
function createMessageHeader(messageId) {
    let messageHeader = {
        resourceType: "MessageHeader",
        id: messageId,
        source: {
            endpoint: messageId
        }
    };
    return messageHeader;
}
function createBasicBundleMessage(messageId, textMessage, attachments) {
    let messageBundle = createEmptyMessage();
    // It creates the mandatory MessageHeader with id equal to the messageId (which is a document in pouchDB)
    let messageHeader = createMessageHeader(messageId);
    messageBundle = Bundle_1.addResourcesToBundle(messageBundle, [messageHeader]);
    // it adds a text sended by the user (if any)
    if (textMessage)
        addCommunicationTextToBundleMessage(messageBundle, textMessage);
    // it adds attachments like additional PDFs or photos if the user attached them
    if (attachments)
        addAttachmentsToBundleMessage(messageBundle, attachments);
    return messageBundle;
}
function createBundleMessage(senderId, messageId, bundleDoc, textMessage, attachments, entityTitle, entityDescription) {
    if (!messageId || !uuidUtils.validateUUIDv4(messageId))
        throw new Error("Message ID must be a valid UUIDv4");
    let BundleMessage = createBasicBundleMessage(messageId, textMessage, attachments);
    // it adds a bundle document as payload into a Patient Record Audit Event (if a biograhy entry is present)
    if (bundleDoc) {
        // TODO: create or add to a "Communication" resource with 'contentReference' for a Patient Record Audit Event
        let patientRecordAudit = createPatientRecordAuditEvent(senderId, entityTitle, entityDescription);
        BundleMessage = Bundle_1.addResourcesToBundle(BundleMessage, [patientRecordAudit, bundleDoc]);
    }
    return BundleMessage;
}
exports.createBundleMessage = createBundleMessage;
// It creates the 'entity' of a Patient Record Audit Event
function createAuditEntity(entityTitle, entityDescription, payloadBase64, encryptedPayload) {
    // purposeOfEvent = "HDIRECT" <-- operations on information used to manage a patient directory
    // it creates the 'entity' of this Patient Record Audit Event
    let entity = {
        type: {
            // What contains the entity
            system: "http://hl7.org/fhir/resource-types",
            code: "Bundle"
        }
    };
    if (entityTitle)
        entity.name = entityTitle;
    if (entityDescription)
        entity.description = entityDescription;
    /* TODO: fix the code
    let payloadBase64:string
    if (sharedKey) {
        // It indicates that the entity must to be encrypted
        let extensionEncrypted:R4.IExtension = {
            url: "http://hl7.org/fhir/StructureDefinition/auditevent-Encrypted",
            valueBoolean: true
        }
        entity.extension = [extensionEncrypted]

        // It encrypts the bundle
        payloadBase64 = await encryptJsonToBase64(sharedKey, bundle)
    } else {
        payloadBase64 = btoa(JSON.stringify(bundle))
    }

    let entityDetail:R4.IAuditEvent_Detail = {
        // Information about the entity (the object related with the Audit Event)
        type: "payload",
        valueBase64Binary: payloadBase64
    }
    // It contains the payload (base64) with the Bundle document (encrypted or not)
    entity.detail = [entityDetail]
    */
    return entity;
}
// TODO: review both source, agents, entity (sender, receiver, patient): eg. parent / guardian, practitioner, children 
function createPatientRecordAuditEvent(reporterId, entityTitle, entityDescription, payloadBase64, encryptedPayload) {
    // purposeOfEvent = "HDIRECT" <-- operations on information used to manage a patient directory
    let auditEventEntity = createAuditEntity(entityTitle, entityDescription, payloadBase64, encryptedPayload);
    let agent = {
        requestor: true // Whether user is initiator
    };
    let auditEvent = {
        id: uuid_1.v4(),
        resourceType: "AuditEvent",
        type: {
            code: "110110" // Patient record audit event: Patient Record has been created, read, updated, or deleted
        },
        agent: [agent],
        source: {
            // Who is the Audit Event Reporter
            observer: {
                // The identity of source detecting the event
                reference: reporterId
                // type = 1 <-- User Device: End-user display device, diagnostic device
            }
        },
        entity: [auditEventEntity]
    };
    return auditEvent;
}
function getBundleDocumentInBundleMessage(bundleMessage) {
    let bundleDocuments = Bundle_1.getResourcesByTypesWithOptionalMetadata(bundleMessage, ["Bundle"]);
    if (bundleDocuments.length && bundleDocuments.length > 0) {
        return bundleDocuments[0];
    }
    return {};
}
exports.getBundleDocumentInBundleMessage = getBundleDocumentInBundleMessage;
function addCommunicationTextToBundleMessage(fhirMessage, text) {
    let newCommunicationPayload = { contentString: text };
    let newCommunication = {
        // id: uuidv4(),    // not needed when using addResourceToBundle instead of addAdditionalResourcesToBundle
        resourceType: "Communication",
        payload: [newCommunicationPayload]
    };
    // It adds the new communication to the bundle of the message and returns a valid bundle
    let newMessage = Bundle_1.addResourceToBundle(fhirMessage, newCommunication); // using addResourceToBundle instead of addAdditionalResourcesToBundle
    // //console.log("newMessage = ", JSON.stringify(newMessage))
    return newMessage;
}
exports.addCommunicationTextToBundleMessage = addCommunicationTextToBundleMessage;
function getTextInBundleMessage(fhirMessage) {
    let resources = Bundle_1.getResourcesByTypesWithOptionalMetadata(fhirMessage, ["Communication"]);
    if (resources.length < 1) {
        // //console.log(("No communication resource was found in message"))
        return {};
    }
    let text = "";
    // It gets only the first contentString in the payload (not an array of strings)
    resources.forEach(function (resource) {
        if (resource.payload && resource.payload.length > 0) {
            resource.payload.forEach(function (payload) {
                if (payload.contentString) {
                    text = payload.contentString;
                    //console.log("text found = ", text)
                    return true;
                }
            });
        }
    });
    if (text == "")
        return {};
    else
        return text;
}
exports.getTextInBundleMessage = getTextInBundleMessage;
function addAttachmentsToBundleMessage(fhirMessage, attachments) {
    if (attachments.length > 1)
        throw new Error("Empty attachment");
    let communication = { resourceType: "Communication" };
    attachments.forEach(function (item) {
        // TODO: check if valid FHIR attachment
        let newCommunicationPayload = { contentAttachment: item };
        if (!communication.payload)
            communication.payload = [newCommunicationPayload]; // it initializes the payload
        else
            communication.payload.push(...communication.payload, newCommunicationPayload);
    });
    // It adds the new communication to the bundle of the message and returns a valid bundle
    let newMessage = Bundle_1.addResourceToBundle(fhirMessage, communication); // using addResourceToBundle instead of addAdditionalResourcesToBundle
    // //console.log("newMessage = ", JSON.stringify(newMessage))
    return newMessage;
}
exports.addAttachmentsToBundleMessage = addAttachmentsToBundleMessage;
function getAttachmentsInBundleMessage(fhirMessage) {
    let resources = Bundle_1.getResourcesByTypesWithOptionalMetadata(fhirMessage, ["Communication"]);
    if (resources.length < 1) {
        // //console.log(("No communication resource was found in message"))
        return {};
    }
    let attachments = [];
    // It gets an array of attachments in contentAttachment in the payload
    resources.forEach(function (resource) {
        if (resource.payload && resource.payload.length > 0) {
            resource.payload.forEach(function (payload) {
                if (payload.contentAttachment) {
                    attachments.push(payload.contentAttachment);
                }
            });
        }
    });
    return attachments;
}
exports.getAttachmentsInBundleMessage = getAttachmentsInBundleMessage;
function addAuditEventToBundleMessage(fhirMessage, auditEvent) {
    // It adds the audit event to the bundle of the message and returns a valid bundle
    return Bundle_1.addResourceToBundle(fhirMessage, auditEvent); // using addResourceToBundle instead of addAdditionalResourcesToBundle
}
exports.addAuditEventToBundleMessage = addAuditEventToBundleMessage;
