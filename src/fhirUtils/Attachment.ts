/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { v4 as uuidRandom} from "uuid"
import { encode as encodeBase64, decode as decodeBase64 } from "@stablelib/base64"
// import { validateFhirDateTime } from "./CommonFHIR"
import { CommonUtilsUHC } from "uhc-common-utils-typescript"

const uhcUtils = new CommonUtilsUHC()

export enum MimeType {
    jpeg = "image/jpeg",
    pdf = "application/pdf",
    png = "image/png",
    fhirJson = "application/fhir+json",
    fhirXml = "application/fhir+xml"
}

export class Attachment {
    constructor() {
    }

    /*
    createAttachmentFHIR(url: string, resourceLanguage?: string, size?: number, hash?: string, creation?: string, title?: string): R4.IAttachment {
        return createAttachmentFHIR(url, resourceLanguage, size, hash, creation, title)
    }
    */

    // MIME type is mandatory and it returns error if empty bytes
    fhirAttachmentFromBytes(bytesArray:Uint8Array, mimeType:string, id?:string, url?:string, title?:string, language?:string, creationDateTime?:string): R4.IAttachment {
        return fhirAttachmentFromBytes(bytesArray, mimeType, id, url, title, language, creationDateTime)
    }

    createFhirAttachment(mimeType?:string, id?:string, url?:string, title?:string, language?:string, hashSHA1?:string, size?:number, base64Data?:string, creationDateTime?:string): R4.IAttachment {
        return createFhirAttachment(mimeType, id, url, title, language, hashSHA1, size, base64Data, creationDateTime)
    }

    // It returns error if no bytes
    getBytesEmbedded(fhirAttachment:R4.IAttachment): Uint8Array {
        return getBytesEmbedded(fhirAttachment)
    }
}

// MIME type is mandatory and it returns error if empty bytes
export function fhirAttachmentFromBytes(bytesArray:Uint8Array, mimeType:string, id?:string, url?:string, title?:string, language?:string, creationDateTime?:string): R4.IAttachment {
    let attachment:R4.IAttachment = {}
    if (!bytesArray || !bytesArray.length || bytesArray.length<=0) throw new Error ('Empty bytes received when creating the FHIR attachment')
    
    if (creationDateTime)   attachment.creation = creationDateTime  // TODO: validateFhirDateTime
    if (mimeType)           attachment.contentType = mimeType

    attachment.data = encodeBase64(bytesArray)
    attachment.hash = uhcUtils.hash.sha1Base64OfUint8Array(bytesArray)
    uhcUtils.uuid.validateUUIDv4(id) ? attachment.id = id : attachment.id = uuidRandom()
    
    if (language)   attachment.language = language   
    attachment.size = bytesArray.length
    
    if (url)        attachment.url = url
    if (title)      attachment.title = title
    
    return attachment   // already sorted
}

/*
export function createAttachmentFHIR(url: string, resourceLanguage?: string, size?: number, hash?: string, creation?: string, title?: string): R4.IAttachment {
    let fhirAttachment: R4.IAttachment = {url: url}
    if (resourceLanguage) fhirAttachment.language = resourceLanguage
    if (title) fhirAttachment.title = title
    if (size && size > 0) fhirAttachment.size = size
    if (hash) fhirAttachment.hash = hash
    if (creation) fhirAttachment.creation = creation
    return fhirAttachment
}
*/

// mimeType should be mandatory
export function createFhirAttachment(mimeType?:string, id?:string, url?:string, title?:string, language?:string, hashSHA1?:string, size?:number, base64Data?:string, creationDateTime?:string): R4.IAttachment {
    // let attachment:R4.IAttachment = { contentType: mimeType }
    let attachment:R4.IAttachment = {}
    if (mimeType) attachment.contentType = mimeType
    id ? attachment.id = id : attachment.id = uuidRandom()
    if (url) attachment.url = url
    if (title) attachment.title = title
    if (language) attachment.language = language
    if (hashSHA1) attachment.hash = hashSHA1
    if (size) attachment.size = size
    if (base64Data) attachment.data = base64Data
    // TODO: validateFhirDateTime
    if (creationDateTime) attachment.creation = creationDateTime
    return attachment
}

export function getBytesEmbedded(fhirAttachment:R4.IAttachment): Uint8Array {
    if (!fhirAttachment.data) throw new Error ("No embedded data") // return [] as unknown as Uint8Array
    return decodeBase64(fhirAttachment.data)
}