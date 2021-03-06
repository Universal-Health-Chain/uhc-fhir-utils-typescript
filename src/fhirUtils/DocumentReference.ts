/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { v4 as uuidRandom} from "uuid"
import { decode as decodeBase64 } from "@stablelib/base64"
import { createFhirAttachment } from "./Attachment"
import { createCoding } from "./CodeableConcept"

export class DocumentReference {
    constructor(){
    }
    
    // TODO: use category classes of https://www.hl7.org/fhir/valueset-document-classcodes.html
    // and remove {"11369-6":"History of Immunization"} in the "additional category classes"
    // getDocumentReferenceAdditionalCategoryCodeAndValueOptionsLOINC(language:string): any[] { // CodeAndValue[]

    // TODO: change
    getDocumentReferenceTypeCodeAndValueOptionsLOINC(language:string): any {
        return getDocumentReferenceTypeCodeAndValueOptionsLOINC(language)
    }
    
    getFhirAttachmentsInDocumentReference(documentReference:R4.IDocumentReference): R4.IAttachment[] {
        return getFhirAttachmentsInDocumentReference(documentReference)
    }
    
    createDocumentReference(contents:R4.IDocumentReference_Content[], id?:string, categoryCodeLOINC?:string, identifiers?:R4.IIdentifier[]): R4.IDocumentReference {
        return createDocumentReference(contents, id, categoryCodeLOINC, identifiers)
    }

}

// TODO: urn identifier
export function createDocumentReferenceToCertificate(
    documentIdentifier:     string,     // universal ID of the document (UUID v4 format), it can have several certified / verifiable versions (VC)
    masterIdentifierVC:     string,     // assigned by the source of the document and specific to this version of the document
    certifiedBytesAsBase64: string,     // the original bytes but now encoded in Base64
    mimeType:               string,     // MIME type of the content bytes
    subjectReferenceString: string,     // 'Patient/universal-health-identifier'
    categoryLOINC?:         string,     // medical history section to wich the document corresponds
    documentTypeLOINC?:     string,     // LOINC Document Class and HITSP C80 Table 2-144 Document Class
    documentLanguage?:      string,
    documentTitle?:         string,
    documentDescription?:   string,
    contentTitle?:          string,
    contentFormatURN?:      string      // URN format defined by IHE or HL7
): R4.IDocumentReference {
    try {
        let fhirAttachment:R4.IAttachment = createFhirAttachment(mimeType, undefined, undefined, undefined, undefined,undefined, undefined, certifiedBytesAsBase64, undefined)
        let fhirContent:R4.IDocumentReference_Content = {attachment: fhirAttachment}
        if (!!contentFormatURN) {
            const coding:R4.ICoding = createCoding(contentFormatURN,"http://ihe.net/fhir/ihe.formatcode.fhir/ValueSet/formatcode")
            fhirContent.format = coding
        }

        // TODO: urn identifier

        let documentReference:R4.IDocumentReference = createDocumentReference([fhirContent], categoryLOINC, documentIdentifier)
        return documentReference
    } catch (e){
        return e
    }
}

/*
export function getDocumentReferenceAdditionalCategoryCodeAndValueOptionsLOINC(language:string): any[] { // CodeAndValue[]
    return [
        // TODO: use category classes of https://www.hl7.org/fhir/valueset-document-classcodes.html
        // and remove {"11369-6":"History of Immunization"} in the "additional category classes"
    ]
}
*/

// TODO: change
export function getDocumentReferenceTypeCodeAndValueOptionsLOINC(language:string): any {
    // based on https://loinc.org/81214-9/ recommended C-CDA R2.0 and R2.1 sections
    // and https://www.hl7.org/fhir/valueset-c80-doc-typecodes.html
    // see also https://loinc.org/74028-2/ Virtual Medical Record for Clinical Decision Support panel HL7.VMR-CDS
    return[
        {"60591-5": "Patient summary Document"},
        {"64290-0": "Health insurance card"},
        {"64291-8": "Health insurance-related form Document"},
        {"48765-2": "Allergies and adverse reactions Document"},
        {"34117-2": "History and physical note"},   // Problems history
        {"71428-7": "CMS - history of present illness panel"},
        {"47519-4": "History of Procedures Document"},
        {"56445-0": "Medication summary Document"},
        {"57833-6": "Prescription for medication"},
        {"55110-1": "Conclusions Document"},
        {"51898-5": "Risk factors Document"},
        {"74264-3": "HIV Summary registry report"},
        {"74156-1": "Oncology treatment plan and summary Document"},
        {"72267-8": "Evaluation of mental and physical incapacity certificate Document"},
        {"59284-0": "Patient Consent"},
        {"64300-7": "Organ donation consent"},
        {"71230-7": "Birth certificate Document"},
        {"64299-1": "Legal document"},
        {"55188-7": "Other - Patient data Document"}
        // {"74209-8": "Injury event summary Document"},
        // {"74198-3": "Trauma summary registry report Document"},
        // {"64293-4": "Procedure consent Document"},   // The patient agent may not have a legally defined relationship with the patient (e.g. a close friend).
    ]
}

export function getFhirAttachmentsInDocumentReference(documentReference:R4.IDocumentReference): R4.IAttachment[] {
    if (!documentReference.content || !documentReference.content.length || documentReference.content.length<1) return []
    let attachments:R4.IAttachment[] = []
    documentReference.content.forEach (function(content:R4.IDocumentReference_Content){
        if (content.attachment) attachments.push(content.attachment)
    })
    return attachments
}

export function createDocumentReference(contents:R4.IDocumentReference_Content[], categoryCodeLOINC?:string, id?:string, identifiers?:R4.IIdentifier[]): R4.IDocumentReference {
    if (!id) id = uuidRandom()
    let documentReference: R4.IDocumentReference = {
        id: id,
        content: contents,
        resourceType: "DocumentReference"
    }
    if (identifiers && identifiers.length && identifiers.length>0) documentReference.identifier = identifiers
    return documentReference
}

