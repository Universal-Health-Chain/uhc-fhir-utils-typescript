"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFhirAttachment = exports.Attachment = exports.MimeType = void 0;
const uuid_1 = require("uuid");
const base64_1 = require("@stablelib/base64");
// import { validateFhirDateTime } from "./CommonFHIR"
const uhc_common_utils_typescript_1 = require("@universal-health-chain/uhc-common-utils-typescript");
const commonUtils = new uhc_common_utils_typescript_1.CommonUtilsUHC();
var MimeType;
(function (MimeType) {
    MimeType["jpeg"] = "image/jpeg";
    MimeType["pdf"] = "application/pdf";
    MimeType["png"] = "image/png";
    MimeType["fhirJson"] = "application/fhir+json";
    MimeType["fhirXml"] = "application/fhir+xml";
})(MimeType = exports.MimeType || (exports.MimeType = {}));
class Attachment {
    constructor() {
    }
    createFhirAttachment(mimeType, id, url, title, language, hashSHA1, size, base64Data, creationDateTime) {
        // it is used also by DICOM
        return createFhirAttachment(mimeType, id, url, title, language, hashSHA1, size, base64Data, creationDateTime);
    }
    // TODO: sort
    createFhirAttachmentWithOptionalBytes(mimeType, id, url, title, language, bytes) {
        let hashSHA1base64, bytesSize, base64data;
        if (bytes) {
            hashSHA1base64 = commonUtils.hash.sha1Base64OfUint8Array(bytes);
            bytesSize = bytes.length;
            base64data = base64_1.encode(bytes);
        }
        // TODO: sort
        return createFhirAttachment(mimeType, id, url, title, language, hashSHA1base64, bytesSize, base64data, new Date().toISOString());
    }
    // TODO: sort
    createFhirAttachmentWithOptionalBase64Data(mimeType, id, url, title, language, base64data) {
        let hashSHA1base64, bytesSize;
        if (base64data) {
            const bytes = base64_1.decode(base64data);
            hashSHA1base64 = commonUtils.hash.sha1Base64OfUint8Array(bytes);
            bytesSize = bytes.length;
        }
        // TODO: sort
        return createFhirAttachment(mimeType, id, url, title, language, hashSHA1base64, bytesSize, base64data, new Date().toISOString());
    }
    // It returns error if no bytes
    getBytesEmbedded(fhirAttachment) {
        if (!fhirAttachment.data)
            throw new Error("No embedded data"); // return [] as unknown as Uint8Array
        return base64_1.decode(fhirAttachment.data);
    }
}
exports.Attachment = Attachment;
// it is used by DICOM
function createFhirAttachment(mimeType, id, url, title, language, hashSHA1, size, base64Data, creationDateTime) {
    // let attachment:R4.IAttachment = { contentType: mimeType }
    let attachment = {};
    if (mimeType)
        attachment.contentType = mimeType;
    id ? attachment.id = id : attachment.id = uuid_1.v4();
    if (url)
        attachment.url = url;
    if (title)
        attachment.title = title;
    if (language)
        attachment.language = language;
    if (hashSHA1)
        attachment.hash = hashSHA1;
    if (size)
        attachment.size = size;
    if (base64Data)
        attachment.data = base64Data;
    // TODO: validateFhirDateTime
    if (creationDateTime)
        attachment.creation = creationDateTime;
    return attachment;
}
exports.createFhirAttachment = createFhirAttachment;
