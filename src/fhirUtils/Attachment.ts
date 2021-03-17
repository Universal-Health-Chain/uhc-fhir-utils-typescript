/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { v4 as uuidRandom} from "uuid"
import { decode as decodeBase64 } from "@stablelib/base64"
// import { validateFhirDateTime } from "./CommonFHIR"


export class Attachment {
    constructor() {
    }

    /*
    createAttachmentFHIR(url: string, resourceLanguage?: string, size?: number, hash?: string, creation?: string, title?: string): R4.IAttachment {
        return createAttachmentFHIR(url, resourceLanguage, size, hash, creation, title)
    }
    */

    createFhirAttachment(mimeType?:string, id?:string, url?:string, title?:string, language?:string, hashSHA1?:string, size?:number, base64Data?:string, creationDateTime?:string): R4.IAttachment {
        return createFhirAttachment(mimeType, id, url, title, language, hashSHA1, size, base64Data, creationDateTime)
    }

    // It returns error if no data
    getBytesEmbedded(fhirAttachment:R4.IAttachment): Uint8Array {
        return getBytesEmbedded(fhirAttachment)
    }
    
}


export function createAttachmentFHIR(url: string, resourceLanguage?: string, size?: number, hash?: string, creation?: string, title?: string): R4.IAttachment {
    let fhirAttachment: R4.IAttachment = {url: url}
    if (resourceLanguage) fhirAttachment.language = resourceLanguage
    if (title) fhirAttachment.title = title
    if (size && size > 0) fhirAttachment.size = size
    if (hash) fhirAttachment.hash = hash
    if (creation) fhirAttachment.creation = creation
    return fhirAttachment
}

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