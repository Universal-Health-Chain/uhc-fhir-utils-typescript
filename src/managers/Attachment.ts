/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { v4 as uuidRandom} from "uuid"
import { encode as encodeBase64, decode as decodeBase64 } from "@stablelib/base64"
import sha1 from 'sha1';

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

    // Old SHA-1 only for compatibility
    // sha1HexOfUint8Array = (dataBytes: Uint8Array): string => sha1HexOfUint8Array(dataBytes);
    // sha1HexOfString = (code: string): string => sha1HexOfString(code);
    // Old SHA-1 in Base64 only for FHIR Attachment compatibility (instead of SHA-256)
    // sha1Base64OfUint8Array = (dataBytes: Uint8Array): string => sha1Base64OfUint8Array(dataBytes);


    createFhirAttachment(mimeType?:string, id?:string, url?:string, title?:string, language?:string, hashSHA1?:string, size?:number, base64Data?:string, creationDateTime?:string): R4.IAttachment {
        // it is used also by DICOM
        return createFhirAttachment(mimeType, id, url, title, language, hashSHA1, size, base64Data, creationDateTime)       
    }

    // TODO: sort
    createFhirAttachmentWithOptionalBytes(mimeType?:string, id?:string, url?:string, title?:string, language?:string, bytes?:Uint8Array): R4.IAttachment {
        let hashSHA1base64, bytesSize, base64data
        if (bytes) {
            hashSHA1base64 = sha1HexOfUint8Array(bytes)
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
            hashSHA1base64 = sha1HexOfUint8Array(bytes)
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

export function sha1HexOfUint8Array(dataBytes: Uint8Array): string {
    // Convert the Uint8Array to a Buffer
    const buffer = Buffer.from(dataBytes.buffer);
    
    // Compute the SHA-1 hash
    return sha1(buffer);
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