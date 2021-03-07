/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { R4 } from "@ahryman40k/ts-fhir-types";
import { v4 as uuidv4 } from 'uuid';
import { validateUUIDv4 } from "./commonUtils";
const Bundle = require("./Bundle");
export class BundleMessage {
    constructor() {
    }
    createPlainMessageFHIR(senderId, messageId, bundleDoc, textMessage, attachments, entityTitle, entityDescription) {
        return createPlainMessageFHIR(senderId, messageId, bundleDoc, textMessage, attachments, entityTitle, entityDescription);
    }
    getBundleDocumentInFhirMessage(bundleMessage) {
        return getBundleDocumentInFhirMessage(bundleMessage);
    }
    addCommunicationTextToMessageFHIR(fhirMessage, text) {
        return addCommunicationTextToMessageFHIR(fhirMessage, text);
    }
    getTextInDecodedMessageFHIR(fhirMessage) {
        return getTextInDecodedMessageFHIR(fhirMessage);
    }
    addAttachmentsToDecodedMessageFHIR(fhirMessage, attachments) {
        return addAttachmentsToDecodedMessageFHIR(fhirMessage, attachments);
    }
    getAttachmentsInDecodedMessageFHIR(fhirMessage) {
        return getAttachmentsInDecodedMessageFHIR(fhirMessage);
    }
    addAuditEventToDecodedMessageFHIR(fhirMessage, auditEvent) {
        return addAuditEventToDecodedMessageFHIR(fhirMessage, auditEvent);
    }
}
// export function createBundleMessage(resources?:any[]): R4.IBundle { return createEmptyBundleOfType(R4.BundleTypeKind._message, resources)}
function createEmptyDecodedMessageFHIR() {
    let bundle = {
        resourceType: "Bundle",
        type: R4.BundleTypeKind._message,
        id: uuidv4()
    };
    return bundle;
}
function createBodyMessageHeaderFHIR(encryptedMessageId) {
    let messageHeader = {
        resourceType: "MessageHeader",
        id: encryptedMessageId,
        source: {
            endpoint: encryptedMessageId
        }
    };
    return messageHeader;
}
function createBasicMessageFHIR(messageId, textMessage, attachments) {
    let messageBundle = createEmptyDecodedMessageFHIR();
    // It creates the mandatory MessageHeader with id equal to the messageId (which is a document in pouchDB)
    let messageHeader = createBodyMessageHeaderFHIR(messageId);
    messageBundle = Bundle.addAdditionalResourcesToBundle(messageBundle, [messageHeader]);
    // it adds a text sended by the user (if any)
    if (textMessage)
        addCommunicationTextToMessageFHIR(messageBundle, textMessage);
    // it adds attachments like additional PDFs or photos if the user attached them
    if (attachments)
        addAttachmentsToDecodedMessageFHIR(messageBundle, attachments);
    return messageBundle;
}
export function createPlainMessageFHIR(senderId, messageId, bundleDoc, textMessage, attachments, entityTitle, entityDescription) {
    if (!messageId || !validateUUIDv4(messageId))
        throw new Error("Message ID must be a valid UUIDv4");
    let messageFHIR = createBasicMessageFHIR(messageId, textMessage, attachments);
    // it adds a bundle document as payload into a Patient Record Audit Event (if a biograhy entry is present)
    if (bundleDoc) {
        // TODO: create or add to a "Communication" resource with 'contentReference' for a Patient Record Audit Event
        let patientRecordAudit = createPatientRecordAuditEvent(senderId, entityTitle, entityDescription);
        messageFHIR = Bundle.addAdditionalResourcesToBundle(messageFHIR, [patientRecordAudit, bundleDoc]);
    }
    return messageFHIR;
}
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
        id: uuidv4(),
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
export function getBundleDocumentInFhirMessage(bundleMessage) {
    let bundleDocuments = Bundle.getResourcesByTypes(bundleMessage, ["Bundle"]);
    if (bundleDocuments.length && bundleDocuments.length > 0) {
        return bundleDocuments[0];
    }
    return {};
}
export function addCommunicationTextToMessageFHIR(fhirMessage, text) {
    let newCommunicationPayload = { contentString: text };
    let newCommunication = {
        // id: uuidv4(),    // not needed when using addResourceToBundle instead of addAdditionalResourcesToBundle
        resourceType: "Communication",
        payload: [newCommunicationPayload]
    };
    // It adds the new communication to the bundle of the message and returns a valid bundle
    let newMessage = Bundle.addResourceToBundle(fhirMessage, newCommunication); // using addResourceToBundle instead of addAdditionalResourcesToBundle
    // //console.log("newMessage = ", JSON.stringify(newMessage))
    return newMessage;
}
export function getTextInDecodedMessageFHIR(fhirMessage) {
    let resources = Bundle.getResourcesByTypes(fhirMessage, ["Communication"]);
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
export function addAttachmentsToDecodedMessageFHIR(fhirMessage, attachments) {
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
    let newMessage = Bundle.addResourceToBundle(fhirMessage, communication); // using addResourceToBundle instead of addAdditionalResourcesToBundle
    // //console.log("newMessage = ", JSON.stringify(newMessage))
    return newMessage;
}
export function getAttachmentsInDecodedMessageFHIR(fhirMessage) {
    let resources = Bundle.getResourcesByTypes(fhirMessage, ["Communication"]);
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
export function addAuditEventToDecodedMessageFHIR(fhirMessage, auditEvent) {
    // It adds the audit event to the bundle of the message and returns a valid bundle
    return Bundle.addResourceToBundle(fhirMessage, auditEvent); // using addResourceToBundle instead of addAdditionalResourcesToBundle
}
