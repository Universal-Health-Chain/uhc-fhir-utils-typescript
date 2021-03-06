"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocumentReference = exports.getFhirAttachmentsInDocumentReference = exports.getDocumentReferenceTypeCodeAndValueOptionsLOINC = exports.createDocumentReferenceToCertificate = exports.DocumentReference = void 0;
const uuid_1 = require("uuid");
const Attachment_1 = require("./Attachment");
const CodeableConcept_1 = require("./CodeableConcept");
class DocumentReference {
    constructor() {
    }
    // TODO: use category classes of https://www.hl7.org/fhir/valueset-document-classcodes.html
    // and remove {"11369-6":"History of Immunization"} in the "additional category classes"
    // getDocumentReferenceAdditionalCategoryCodeAndValueOptionsLOINC(language:string): any[] { // CodeAndValue[]
    // TODO: change
    getDocumentReferenceTypeCodeAndValueOptionsLOINC(language) {
        return getDocumentReferenceTypeCodeAndValueOptionsLOINC(language);
    }
    getFhirAttachmentsInDocumentReference(documentReference) {
        return getFhirAttachmentsInDocumentReference(documentReference);
    }
    createDocumentReference(contents, id, categoryCodeLOINC, identifiers) {
        return createDocumentReference(contents, id, categoryCodeLOINC, identifiers);
    }
}
exports.DocumentReference = DocumentReference;
// TODO: urn identifier
function createDocumentReferenceToCertificate(documentIdentifier, // universal ID of the document (UUID v4 format), it can have several certified / verifiable versions (VC)
masterIdentifierVC, // assigned by the source of the document and specific to this version of the document
certifiedBytesAsBase64, // the original bytes but now encoded in Base64
mimeType, // MIME type of the content bytes
subjectReferenceString, // 'Patient/universal-health-identifier'
categoryLOINC, // medical history section to wich the document corresponds
documentTypeLOINC, // LOINC Document Class and HITSP C80 Table 2-144 Document Class
documentLanguage, documentTitle, documentDescription, contentTitle, contentFormatURN // URN format defined by IHE or HL7
) {
    try {
        let fhirAttachment = Attachment_1.createFhirAttachment(mimeType, undefined, undefined, undefined, undefined, undefined, undefined, certifiedBytesAsBase64, undefined);
        let fhirContent = { attachment: fhirAttachment };
        if (!!contentFormatURN) {
            const coding = CodeableConcept_1.createCoding(contentFormatURN, "http://ihe.net/fhir/ihe.formatcode.fhir/ValueSet/formatcode");
            fhirContent.format = coding;
        }
        // TODO: urn identifier
        let documentReference = createDocumentReference([fhirContent], categoryLOINC, documentIdentifier);
        return documentReference;
    }
    catch (e) {
        return e;
    }
}
exports.createDocumentReferenceToCertificate = createDocumentReferenceToCertificate;
/*
export function getDocumentReferenceAdditionalCategoryCodeAndValueOptionsLOINC(language:string): any[] { // CodeAndValue[]
    return [
        // TODO: use category classes of https://www.hl7.org/fhir/valueset-document-classcodes.html
        // and remove {"11369-6":"History of Immunization"} in the "additional category classes"
    ]
}
*/
// TODO: change
function getDocumentReferenceTypeCodeAndValueOptionsLOINC(language) {
    // based on https://loinc.org/81214-9/ recommended C-CDA R2.0 and R2.1 sections
    // and https://www.hl7.org/fhir/valueset-c80-doc-typecodes.html
    // see also https://loinc.org/74028-2/ Virtual Medical Record for Clinical Decision Support panel HL7.VMR-CDS
    return [
        { "60591-5": "Patient summary Document" },
        { "64290-0": "Health insurance card" },
        { "64291-8": "Health insurance-related form Document" },
        { "48765-2": "Allergies and adverse reactions Document" },
        { "34117-2": "History and physical note" },
        { "71428-7": "CMS - history of present illness panel" },
        { "47519-4": "History of Procedures Document" },
        { "56445-0": "Medication summary Document" },
        { "57833-6": "Prescription for medication" },
        { "55110-1": "Conclusions Document" },
        { "51898-5": "Risk factors Document" },
        { "74264-3": "HIV Summary registry report" },
        { "74156-1": "Oncology treatment plan and summary Document" },
        { "72267-8": "Evaluation of mental and physical incapacity certificate Document" },
        { "59284-0": "Patient Consent" },
        { "64300-7": "Organ donation consent" },
        { "71230-7": "Birth certificate Document" },
        { "64299-1": "Legal document" },
        { "55188-7": "Other - Patient data Document" }
        // {"74209-8": "Injury event summary Document"},
        // {"74198-3": "Trauma summary registry report Document"},
        // {"64293-4": "Procedure consent Document"},   // The patient agent may not have a legally defined relationship with the patient (e.g. a close friend).
    ];
}
exports.getDocumentReferenceTypeCodeAndValueOptionsLOINC = getDocumentReferenceTypeCodeAndValueOptionsLOINC;
function getFhirAttachmentsInDocumentReference(documentReference) {
    if (!documentReference.content || !documentReference.content.length || documentReference.content.length < 1)
        return [];
    let attachments = [];
    documentReference.content.forEach(function (content) {
        if (content.attachment)
            attachments.push(content.attachment);
    });
    return attachments;
}
exports.getFhirAttachmentsInDocumentReference = getFhirAttachmentsInDocumentReference;
function createDocumentReference(contents, categoryCodeLOINC, id, identifiers) {
    if (!id)
        id = uuid_1.v4();
    let documentReference = {
        id: id,
        content: contents,
        resourceType: "DocumentReference"
    };
    if (identifiers && identifiers.length && identifiers.length > 0)
        documentReference.identifier = identifiers;
    return documentReference;
}
exports.createDocumentReference = createDocumentReference;
