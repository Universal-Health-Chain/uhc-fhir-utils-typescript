/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { v4 as uuidv4 } from 'uuid'
import { validateUUIDv4 } from "./commonUtils"
import { addAdditionalResourcesToBundle, getResourcesByTypes, addResourceToBundle } from "./Bundle"

export class BundleMessage {
    constructor() {
    }

    create(senderId:string, messageId:string, bundleDoc?:R4.IBundle, textMessage?:string, attachments?:R4.IAttachment[], entityTitle?:string, entityDescription?:string):R4.IBundle {
        return createBundleMessage(senderId, messageId, bundleDoc, textMessage, attachments, entityTitle, entityDescription)
    }

    createBasicBundleMessage(messageId:string, textMessage?:string, attachments?:R4.IAttachment[]): R4.IBundle {
        return createBasicBundleMessage(messageId, textMessage, attachments)
    }

    createEmptyMessage = (): R4.IBundle => createEmptyMessage()

    // It creates the mandatory MessageHeader with id equal to the messageId (which is like a document ID in CouchDB / PouchDB)
    createMessageHeader = (messageId:string) : R4.IMessageHeader => createMessageHeader(messageId)

    getBundleDocumentInBundleMessage(bundleMessage:R4.IBundle): R4.IBundle{
        return getBundleDocumentInBundleMessage(bundleMessage)
    }

    addCommunicationTextToBundleMessage(fhirMessage:R4.IBundle, text:string): R4.IBundle {
        return addCommunicationTextToBundleMessage(fhirMessage, text)
    }

    getTextInBundleMessage(fhirMessage:R4.IBundle): string {
        return getTextInBundleMessage(fhirMessage)
    }

    addAttachmentsToBundleMessage(fhirMessage:R4.IBundle, attachments:R4.IAttachment[]): R4.IBundle {
        return addAttachmentsToBundleMessage(fhirMessage, attachments)
    }

    getAttachmentsInBundleMessage(fhirMessage:R4.IBundle): R4.IAttachment[] {
        return getAttachmentsInBundleMessage(fhirMessage)
    }

    addAuditEventToBundleMessage(fhirMessage:R4.IBundle, auditEvent:R4.IAuditEvent): R4.IBundle {
        return addAuditEventToBundleMessage(fhirMessage, auditEvent)
    }
    
}

// export function createBundleMessage(resources?:any[]): R4.IBundle { return createEmptyBundleOfType(R4.BundleTypeKind._message, resources)}

function createEmptyMessage(): R4.IBundle{
    let bundle: R4.IBundle = {
        resourceType: "Bundle",
        type: R4.BundleTypeKind._message,
        id: uuidv4()
    }    

    return bundle
}

function createMessageHeader(messageId:string) : R4.IMessageHeader {
    let messageHeader:R4.IMessageHeader = {
        resourceType: "MessageHeader",
        id: messageId,
        source: {
            endpoint: messageId
        }
     }
    return messageHeader
}

function createBasicBundleMessage(messageId:string, textMessage?:string, attachments?:R4.IAttachment[]): R4.IBundle {
    let messageBundle:R4.IBundle = createEmptyMessage()
 
    // It creates the mandatory MessageHeader with id equal to the messageId (which is a document in pouchDB)
    let messageHeader:R4.IMessageHeader = createMessageHeader(messageId)
    messageBundle = addAdditionalResourcesToBundle(messageBundle, [messageHeader])
 
    // it adds a text sended by the user (if any)
    if (textMessage) addCommunicationTextToBundleMessage(messageBundle, textMessage)
 
    // it adds attachments like additional PDFs or photos if the user attached them
    if (attachments) addAttachmentsToBundleMessage(messageBundle, attachments)
 
    return messageBundle
 }
 
 export function createBundleMessage(senderId:string, messageId:string, bundleDoc?:R4.IBundle, textMessage?:string, attachments?:R4.IAttachment[], entityTitle?:string, entityDescription?:string):R4.IBundle {
     if (!messageId || !validateUUIDv4(messageId)) throw new Error ("Message ID must be a valid UUIDv4")
    
    let BundleMessage:R4.IBundle = createBasicBundleMessage(messageId, textMessage, attachments)
    
    // it adds a bundle document as payload into a Patient Record Audit Event (if a biograhy entry is present)
    if (bundleDoc) {
        // TODO: create or add to a "Communication" resource with 'contentReference' for a Patient Record Audit Event
        let patientRecordAudit:R4.IAuditEvent = createPatientRecordAuditEvent(senderId, entityTitle, entityDescription)
        BundleMessage = addAdditionalResourcesToBundle(BundleMessage, [patientRecordAudit, bundleDoc])
    }
    return BundleMessage
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

// TODO: review both source, agents, entity (sender, receiver, patient): eg. parent / guardian, practitioner, children 
function createPatientRecordAuditEvent(reporterId:string, entityTitle?:string, entityDescription?:string, payloadBase64?:string, encryptedPayload?:boolean) : R4.IAuditEvent {
    // purposeOfEvent = "HDIRECT" <-- operations on information used to manage a patient directory

    let auditEventEntity:R4.IAuditEvent_Entity = createAuditEntity(entityTitle, entityDescription, payloadBase64, encryptedPayload)

    let agent:R4.IAuditEvent_Agent = {
        requestor: true     // Whether user is initiator
    }

    let auditEvent:R4.IAuditEvent = {
        id: uuidv4(),
        resourceType: "AuditEvent",
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

export function getBundleDocumentInBundleMessage(bundleMessage:R4.IBundle): R4.IBundle{
    let bundleDocuments:R4.IBundle[] = getResourcesByTypes(bundleMessage, ["Bundle"])
    if (bundleDocuments.length && bundleDocuments.length > 0) {
        return bundleDocuments[0]
    }
    return {} as R4.IBundle
}

export function addCommunicationTextToBundleMessage(fhirMessage:R4.IBundle, text:string): R4.IBundle {

    let newCommunicationPayload:R4.ICommunication_Payload= { contentString: text }

    let newCommunication:R4.ICommunication = {
        // id: uuidv4(),    // not needed when using addResourceToBundle instead of addAdditionalResourcesToBundle
        resourceType:"Communication",
        payload: [newCommunicationPayload]
    }
    // It adds the new communication to the bundle of the message and returns a valid bundle
    let newMessage:R4.IBundle = addResourceToBundle(fhirMessage, newCommunication)  // using addResourceToBundle instead of addAdditionalResourcesToBundle
    // //console.log("newMessage = ", JSON.stringify(newMessage))
    return newMessage
}

export function getTextInBundleMessage(fhirMessage:R4.IBundle): string {
    let resources:any[] = getResourcesByTypes(fhirMessage, ["Communication"])
    if (resources.length < 1) {
        // //console.log(("No communication resource was found in message"))
        return {} as string
    }

    let text:string = ""

    // It gets only the first contentString in the payload (not an array of strings)
    resources.forEach(function(resource:R4.ICommunication){
        if (resource.payload && resource.payload.length > 0) {
            resource.payload.forEach(function(payload){
                if (payload.contentString) {
                    text = payload.contentString
                    //console.log("text found = ", text)
                    return true
                }
            })
        }
    })

    if (text == "") return {} as string
    else return text
}

export function addAttachmentsToBundleMessage(fhirMessage:R4.IBundle, attachments:R4.IAttachment[]): R4.IBundle {
    if (attachments.length > 1) throw new Error ("Empty attachment")
    
    let communication:R4.ICommunication = { resourceType:"Communication" }

    attachments.forEach(function(item){
        // TODO: check if valid FHIR attachment
        let newCommunicationPayload:R4.ICommunication_Payload= { contentAttachment: item }
        if (!communication.payload) communication.payload = [newCommunicationPayload]   // it initializes the payload
        else communication.payload.push(...communication.payload, newCommunicationPayload)
    })
    
    // It adds the new communication to the bundle of the message and returns a valid bundle
    let newMessage:R4.IBundle = addResourceToBundle(fhirMessage, communication)  // using addResourceToBundle instead of addAdditionalResourcesToBundle
    // //console.log("newMessage = ", JSON.stringify(newMessage))
    return newMessage
}

export function getAttachmentsInBundleMessage(fhirMessage:R4.IBundle): R4.IAttachment[] {
    let resources:any[] = getResourcesByTypes(fhirMessage, ["Communication"])
    if (resources.length < 1) {
        // //console.log(("No communication resource was found in message"))
        return {} as R4.IAttachment[]
    }

    let attachments:R4.IAttachment[] = []

    // It gets an array of attachments in contentAttachment in the payload
    resources.forEach(function(resource:R4.ICommunication){
        if (resource.payload && resource.payload.length > 0) {
            resource.payload.forEach(function(payload){
                if (payload.contentAttachment) {
                    attachments.push(payload.contentAttachment)
                }
            })
        }
    })
    return attachments
}

export function addAuditEventToBundleMessage(fhirMessage:R4.IBundle, auditEvent:R4.IAuditEvent): R4.IBundle {
        // It adds the audit event to the bundle of the message and returns a valid bundle
        return addResourceToBundle(fhirMessage, auditEvent)  // using addResourceToBundle instead of addAdditionalResourcesToBundle
}
