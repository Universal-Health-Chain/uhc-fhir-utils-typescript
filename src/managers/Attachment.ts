/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { v4 as uuidRandom} from "uuid"
import { encode as encodeBase64, decode as decodeBase64 } from "@stablelib/base64"
// import { validateFhirDateTime } from "./CommonFHIR"
import { CommonUtilsUHC } from "@universal-health-chain/uhc-common-utils-typescript"

const commonUtils = new CommonUtilsUHC()

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

    createFhirAttachment(mimeType?:string, id?:string, url?:string, title?:string, language?:string, hashSHA1?:string, size?:number, base64Data?:string, creationDateTime?:string): R4.IAttachment {
        // it is used also by DICOM
        return createFhirAttachment(mimeType, id, url, title, language, hashSHA1, size, base64Data, creationDateTime)       
    }

    // TODO: sort
    createFhirAttachmentWithOptionalBytes(mimeType?:string, id?:string, url?:string, title?:string, language?:string, bytes?:Uint8Array): R4.IAttachment {
        let hashSHA1base64, bytesSize, base64data
        if (bytes) {
            hashSHA1base64 = commonUtils.hash.sha1Base64OfUint8Array(bytes)
            bytesSize = bytes.length
            base64data = encodeBase64(bytes)
        }
        // TODO: sort
        return createFhirAttachment(mimeType, id, url, title, language, hashSHA1base64, bytesSize, base64data, new Date().toISOString())
    }

    // TODO: sort
    createFhirAttachmentWithOptionalBase64Data(mimeType?:string, id?:string, url?:string, title?:string, language?:string, base64data?:string): R4.IAttachment {
        let hashSHA1base64, bytesSize
        if (base64data) {
            const bytes:Uint8Array = decodeBase64(base64data)
            hashSHA1base64 = commonUtils.hash.sha1Base64OfUint8Array(bytes)
            bytesSize = bytes.length
        }
        // TODO: sort
        return createFhirAttachment(mimeType, id, url, title, language, hashSHA1base64, bytesSize, base64data, new Date().toISOString())
    }

    // It returns error if no bytes
    getBytesEmbedded(fhirAttachment:R4.IAttachment): Uint8Array {
        if (!fhirAttachment.data) throw new Error ("No embedded data") // return [] as unknown as Uint8Array
        return decodeBase64(fhirAttachment.data)
    }
}

// it is used by DICOM
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