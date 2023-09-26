import { R4 } from "@ahryman40k/ts-fhir-types"
import { getValidOrNewRandomUUID } from "@universal-health-chain/uhc-common-utils-typescript"

export class AuditEvent{

    constructor() {
    }
    
    createAuditEntity(entityTitle?:string, entityDescription?:string, payloadBase64?:string, encryptedPayload?:boolean) : R4.IAuditEvent_Entity {
        return createAuditEntity(entityTitle, entityDescription, payloadBase64, encryptedPayload)
    }

    createPatientRecordAuditEvent(reporterId:string, entityTitle?:string, entityDescription?:string, payloadBase64?:string, encryptedPayload?:boolean) : R4.IAuditEvent {
        return createPatientRecordAuditEvent(reporterId, entityTitle, entityDescription, payloadBase64, encryptedPayload)
    }

}

// It creates the 'entity' of a Patient Record Audit Event
function createAuditEntity(entityTitle?:string, entityDescription?:string, payloadBase64?:string, encryptedPayload?:boolean) : R4.IAuditEvent_Entity {
    // purposeOfEvent = "HDIRECT" <-- operations on information used to manage a patient directory

    // it creates the 'entity' of this Patient Record Audit Event
    let entity:R4.IAuditEvent_Entity = {
        type: {
            // What contains the entity
            system: "http://hl7.org/fhir/resource-types",
            code: "Bundle"
        }
    }
    if (entityTitle) entity.name = entityTitle
    if (entityDescription) entity.description = entityDescription

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

    return entity
}

/** It is exported because it is used in BundleMessage
 * TODO: review both source, agents, entity (sender, receiver, patient): eg. parent / guardian, practitioner, children 
 */
export function createPatientRecordAuditEvent(reporterId:string, entityTitle?:string, entityDescription?:string, payloadBase64?:string, encryptedPayload?:boolean, recorded?:string) : R4.IAuditEvent {

    let auditEventEntity:R4.IAuditEvent_Entity = createAuditEntity(entityTitle, entityDescription, payloadBase64, encryptedPayload)

    let agent:R4.IAuditEvent_Agent = {
        requestor: true     // Whether user is initiator
    }

    if (!recorded) {
        recorded = new Date().toISOString();
    }

    let auditEvent:R4.IAuditEvent = {
        id: getValidOrNewRandomUUID(),
        resourceType: "AuditEvent",
        recorded: recorded,
        type: {
            code: "110110"  // Patient record audit event: Patient Record has been created, read, updated, or deleted
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
    }
    
    return auditEvent
}