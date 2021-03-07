/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { v4 as uuidRandom } from "uuid";
import { decode as decodeBase64 } from "@stablelib/base64";
import { validateFhirDateTime } from "./CommonFHIR";
export default class Attachment {
    constructor() {
    }
    createAttachmentFHIR(url, resourceLanguage, size, hash, creation, title) {
        return createAttachmentFHIR(url, resourceLanguage, size, hash, creation, title);
    }
    createFhirAttachment(mimeType, id, url, title, language, hashSHA1, size, base64Data, creationDateTime) {
        return createFhirAttachment(mimeType, id, url, title, language, hashSHA1, size, base64Data, creationDateTime);
    }
    // It returns error if no data
    getBytesEmbedded(fhirAttachment) {
        return getBytesEmbedded(fhirAttachment);
    }
}
export function createAttachmentFHIR(url, resourceLanguage, size, hash, creation, title) {
    let fhirAttachment = { url: url };
    if (resourceLanguage)
        fhirAttachment.language = resourceLanguage;
    if (title)
        fhirAttachment.title = title;
    if (size && size > 0)
        fhirAttachment.size = size;
    if (hash)
        fhirAttachment.hash = hash;
    if (creation)
        fhirAttachment.creation = creation;
    return fhirAttachment;
}
export function createFhirAttachment(mimeType, id, url, title, language, hashSHA1, size, base64Data, creationDateTime) {
    let result = { contentType: mimeType };
    id ? result.id = id : result.id = uuidRandom();
    if (url)
        result.url = url;
    if (title)
        result.title = title;
    if (language)
        result.language = language;
    if (hashSHA1)
        result.hash = hashSHA1;
    if (size)
        result.size = size;
    if (base64Data)
        result.data = base64Data;
    if (creationDateTime && validateFhirDateTime(creationDateTime))
        result.creation = creationDateTime;
    return result;
}
export function getBytesEmbedded(fhirAttachment) {
    if (!fhirAttachment.data)
        throw new Error("No embedded data"); // return [] as unknown as Uint8Array
    return decodeBase64(fhirAttachment.data);
}
