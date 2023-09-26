/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { getValidOrNewRandomUUID, validateUUIDv4 } from "@universal-health-chain/uhc-common-utils-typescript"
import { getCleanIdByFhirResource } from "./CommonFHIR"
import { getResourcesByTypesWithOptionalMetadata, addResourceAsBundleEntry, 
    getResourceByIdInBundle, getResourceIdsInBundle, getTimestamp, replaceResourceById, getResourcesWithFilters, addResourcesWithOptions
} from "./Bundle"
import { createPatientRecordAuditEvent } from "./AuditEvent"

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
    
    /** The permanent ID of a FHIR Message across any system is the ID of the MessageHeader of the content resources */
    getCleanIdOfDocumentComposition = (fhirBundle:R4.IBundle): string => getCleanIdOfMessageHeader(fhirBundle)

    getTimestamp(fhirBundle:R4.IBundle): string {
        return getTimestamp(fhirBundle)
    }

    getAllResources(bundle: R4.IBundle): any[] {
        // return getAllResourcesInBundle(bundle)
        return getResourcesWithFilters(bundle, undefined, undefined,
            undefined, undefined, undefined, undefined, undefined)
    }

    getAllResourcesWithoutCompositionOrMessageHeader(bundle: R4.IBundle): any[] {
        // return getAllResourcesWithoutCompositionOrMessageHeader(bundle)
        const excludedResources = ['Composition', 'MessageHeader']
        return getResourcesWithFilters(bundle, undefined, undefined,
            excludedResources, undefined, undefined, undefined, undefined)
    }

    getResourcesByTypes(bundle: R4.IBundle, resourceTypes:string[]): any[] {
        // return getResourcesByTypes(bundle, resourceTypes)
        return getResourcesWithFilters(bundle, undefined, undefined,
            undefined, resourceTypes, undefined, undefined, undefined)
    }

    /** It returns an arry of IDs, splitting the ID by "/" and getting the last string after the slash */
    getResourceIdsInBundle(bundle: R4.IBundle): string[] {
        return getResourceIdsInBundle(bundle)
    }

    getResourceByIdInBundle(resourceId:string, bundle:R4.IBundle): any{
        return getResourceByIdInBundle(resourceId, bundle)
    }

    /** It replaces the given resource in the right Bundle.entry without generating Bundle.entry[].fullUrl */
    replaceResourceById(resource:any, bundle:R4.IBundle): R4.IBundle{
        return replaceResourceById(resource, bundle)
    }

}

/** MessageHeader is always fhirBundle.entry[0].resource in a FHIR Message or it is not a Bundle Message */
export function getCleanIdOfMessageHeader(fhirBundle:R4.IBundle): string {
    if (!fhirBundle || !fhirBundle.entry || !fhirBundle.entry.length || fhirBundle.entry.length<1 || 
        !fhirBundle.entry[0].resource || !fhirBundle.entry[0].resource.resourceType || 
        fhirBundle.entry[0].resource.resourceType !== "MessageHeader" || !!fhirBundle.entry[0].resource.id){
        return "" // instead of error
    }
    else {
        return getCleanIdByFhirResource(fhirBundle.entry[0].resource.id)
    }
}

// export function createBundleMessage(resources?:any[]): R4.IBundle { return createEmptyBundleOfType(R4.BundleTypeKind._message, resources)}

function createEmptyMessage(): R4.IBundle{
    let bundle: R4.IBundle = {
        resourceType: "Bundle",
        type: R4.BundleTypeKind._message,
        id: getValidOrNewRandomUUID()
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
    messageBundle = addResourcesWithOptions(messageBundle, [messageHeader])
 
    // it adds a text sended by the user (if any)
    if (textMessage) addCommunicationTextToBundleMessage(messageBundle, textMessage)
 
    // it adds attachments like additional PDFs or photos if the user attached them
    if (attachments) addAttachmentsToBundleMessage(messageBundle, attachments)
 
    return messageBundle
}

// TODO: review why the following ones are exported

export function createBundleMessage(senderId:string, messageId:string, bundleDoc?:R4.IBundle, textMessage?:string, attachments?:R4.IAttachment[], entityTitle?:string, entityDescription?:string):R4.IBundle {
     if (!messageId || !validateUUIDv4(messageId)) throw new Error ("Message ID must be a valid UUIDv4")
    
    let BundleMessage:R4.IBundle = createBasicBundleMessage(messageId, textMessage, attachments)
    
    // it adds a bundle document as payload into a Patient Record Audit Event (if a biograhy entry is present)
    if (bundleDoc) {
        // TODO: create or add to a "Communication" resource with 'contentReference' for a Patient Record Audit Event
        let patientRecordAudit:R4.IAuditEvent = createPatientRecordAuditEvent(senderId, entityTitle, entityDescription)
        BundleMessage = addResourcesWithOptions(BundleMessage, [patientRecordAudit, bundleDoc])
    }
    return BundleMessage
}

export function getBundleDocumentInBundleMessage(bundleMessage:R4.IBundle): R4.IBundle{
    let bundleDocuments:R4.IBundle[] = getResourcesByTypesWithOptionalMetadata(bundleMessage, ["Bundle"])
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
    let newMessage:R4.IBundle = addResourceAsBundleEntry(fhirMessage, newCommunication)  // using addResourceToBundle instead of addAdditionalResourcesToBundle
    // //console.log("newMessage = ", JSON.stringify(newMessage))
    return newMessage
}

export function getTextInBundleMessage(fhirMessage:R4.IBundle): string {
    let resources:any[] = getResourcesByTypesWithOptionalMetadata(fhirMessage, ["Communication"])
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
    let newMessage:R4.IBundle = addResourceAsBundleEntry(fhirMessage, communication)  // using addResourceToBundle instead of addAdditionalResourcesToBundle
    // //console.log("newMessage = ", JSON.stringify(newMessage))
    return newMessage
}

export function getAttachmentsInBundleMessage(fhirMessage:R4.IBundle): R4.IAttachment[] {
    let resources:any[] = getResourcesByTypesWithOptionalMetadata(fhirMessage, ["Communication"])
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
        return addResourceAsBundleEntry(fhirMessage, auditEvent)  // using addResourceToBundle instead of addAdditionalResourcesToBundle
}