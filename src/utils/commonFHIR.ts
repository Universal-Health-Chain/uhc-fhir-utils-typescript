/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { v4 as uuidRandom} from "uuid"
import { decode as decodeBase64 } from "@stablelib/base64"
import { createBundleDocumentWithComposition } from "./bundle";

export interface ObservationChoiceValueFhirR4{
    valueString?:             string
    valueQuantity?:           R4.IQuantity
    valueInteger?:            number
    valueRatio?:              R4.IRatio
    valueRange?:              R4.IRange
    valueCodeableConcept?:    R4.ICodeableConcept
    valueBoolean?:            boolean
    valueSampledData?:        R4.ISampledData
    valueTime?:               string
    valueDateTime?:           string
    valuePeriod?:             R4.IPeriod
}

export function getBytesEmbedded(fhirAttachment:R4.IAttachment): Uint8Array {
    if (!fhirAttachment.data) throw new Error ("No embedded data") // return [] as unknown as Uint8Array
    return decodeBase64(fhirAttachment.data)
}

// TODO:
export function validateFhirDateTime(dateTime:string): boolean {
    return true
}

export function addIdentifier(fhirResource:any, system:string, value:string, use?:R4.IdentifierUseKind, assignerReference?:string, period?:R4.IPeriod): any {
    let singleIdentifier:R4.IIdentifier = {system: system, value: value}
    if (use) singleIdentifier.use = use
    if (assignerReference) singleIdentifier.assigner = {reference: assignerReference}
    // //console.log("addIdentifier = ", singleIdentifier)
    
    //let result = resource       // copy or modify the original resource?
    if (!fhirResource.identifier || !fhirResource.identifier.length || fhirResource.identifier.length<1) fhirResource.identifier = [singleIdentifier]
    else fhirResource.identifier.push(singleIdentifier) // or resource.identifier = [...resource.identifier, singleIdentifier]?
    // //console.log("resource with added identifier = ", JSON.stringify(resource))
    return fhirResource as any
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

export function createFhirAttachment(mimeType:string, id?:string, url?:string, title?:string, language?:string, hashSHA1?:string, size?:number, base64Data?:string, creationDateTime?:string): R4.IAttachment {
    let result:R4.IAttachment = { contentType: mimeType }
    id ? result.id = id : result.id = uuidRandom()
    if (url) result.url = url
    if (title) result.title = title
    if (language) result.language = language
    if (hashSHA1) result.hash = hashSHA1
    if (size) result.size = size
    if (base64Data) result.data = base64Data
    if (creationDateTime && validateFhirDateTime(creationDateTime)) result.creation = creationDateTime
    return result
}

export function createFhirReferences(strReferences:string[]): R4.IReference[] {
    if (!strReferences.length || strReferences.length<1) return [] as R4.IReference[]
    let fhirReferences:R4.IReference[] = []
    strReferences.forEach( function(reference) {
        let fhirReference:R4.IReference = createFhirReference(reference)
        if (fhirReference.reference && fhirReference.reference != "") fhirReferences.push(fhirReference)
    })
    return fhirReferences
}

export function createFhirReference(strReference:string, type?:string, display?:string): R4.IReference {
    if (strReference == "") return {} as R4.IReference  // returns void, but not null or error
    let fhirReference:R4.IReference = {reference: strReference}
    if (type) fhirReference.type = type
    if (display) fhirReference.display = display
    return fhirReference
}

export function getChoiceNameFromValueFHIR(fhir: any): string {
    switch(fhir) {
        case (fhir.valueString):            return "valueString"
        case (fhir.valueQuantity):          return "valueQuantity"
        case (fhir.valueRatio):             return "valueRatio"
        case (fhir.valueRange):             return "valueRange"
        case (fhir.valueCodeableConcept):   return "valueCodeableConcept"
        case (fhir.valueBoolean):           return "valueBoolean"
        case (fhir.valueSampledData):       return "valueSampledData"
        case (fhir.valueTime):              return "valueTime"
        case (fhir.valueDateTime):          return "valueDateTime"
        case (fhir.valuePeriod):            return "valuePeriod"
        default: return ""
    }
}

export function addObservationAsMemberToMainObservation(member:R4.IObservation, main:R4.IObservation) : R4.IObservation{
    let members: R4.IReference[] = main.hasMember || []
    members.push(...members, {
      reference: member.id
    })
    main.hasMember = members
    return main
}
  
export function createBloodTypingMainBundleFHIR() : R4.IBundle{
    let mainBloodTypingObservation:R4.IObservation = {
        resourceType: 'Observation',
        code: {
        // text: BLOOD_TYPING_MAIN_CODE_TEXT
        },
        // TODO: category, effectiveDateTime, subject, ...
        status: R4.ObservationStatusKind._final
    }
    let bundle: R4.IBundle = createBundleDocumentWithComposition([mainBloodTypingObservation])  
    return bundle
}

/*
// TODO: solve Variable is used before being assigned.
export function getBloodTypingMainObservationFromBundleFHIR(bundle:R4.IBundle) : R4.IObservation{
  if (!bundle.entry || bundle.entry.length < 1) return {} as R4.IObservation

  let mainBloodTypingObservation:R4.IObservation
  let result:boolean = bundle.entry.some(function(item){
    if (item.resource && item.resource.resourceType == 'Observation'){
      // TODO: validate the observation object
      if (item.resource.code && item.resource.code.text && item.resource.code.text==BLOOD_TYPING_MAIN_CODE_TEXT){
        // it assumes only one blood typing observation exists or none
        mainBloodTypingObservation = item.resource
        return true
      }
    }
  })

  // TODO: validate mainBloodTypingObservation?
  if (!result) return {} as R4.IObservation
  else return mainBloodTypingObservation
}
*/

/*
// TODO: solve Variable is used before being assigned.
export function getAboRhBloodTypeObservationFromBundleFHIR(bundle:R4.IBundle) : R4.IObservation{
  let mainBloodTypingObservation:R4.IObservation = getBloodTypingMainObservationFromBundleFHIR(bundle)
  if (!mainBloodTypingObservation.hasMember || mainBloodTypingObservation.hasMember.length<1) return {} as R4.IObservation
  
  let aboRhBloodTypeObservation: R4.IObservation
  let result:boolean = mainBloodTypingObservation.hasMember.some(function(item){
    if (item.reference) {
      let observation = getResourceByIdInBundle(item.reference, bundle)
      if (observation.code && observation.code.coding && observation.code.coding.length > 0) {
        let loincCoding:R4.ICoding = getLOINCCoding(observation.code.coding)
        if (loincCoding.code == LOINC_ABO_RH_CODE) {
          aboRhBloodTypeObservation = observation
          return true
        }
      }
    }
  })
  
  if (!result) return {} as R4.IObservation
  else return aboRhBloodTypeObservation
}
*/

