"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditEvent = void 0;
// import { getValidOrNewRandomUUID } from "./commonUtils"
const uhc_common_utils_typescript_1 = require("uhc-common-utils-typescript");
const uuidUtils = new uhc_common_utils_typescript_1.Uuid();
class AuditEvent {
    constructor() {
    }
    createAuditEntity(entityTitle, entityDescription, payloadBase64, encryptedPayload) {
        return createAuditEntity(entityTitle, entityDescription, payloadBase64, encryptedPayload);
    }
    createPatientRecordAuditEvent(reporterId, entityTitle, entityDescription, payloadBase64, encryptedPayload) {
        return createPatientRecordAuditEvent(reporterId, entityTitle, entityDescription, payloadBase64, encryptedPayload);
    }
}
exports.AuditEvent = AuditEvent;
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
        id: uuidUtils.getValidOrNewRandomUUID(),
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
