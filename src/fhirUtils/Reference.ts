/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"

export class Reference {

    constructor(){
    }

    getStringsReferencesByIdentifierAndSystem(referencesFHIR:R4.IReference[], system:string) : string[] {
        return getStringsReferencesByIdentifierAndSystem(referencesFHIR, system)
    }
    
    getStringsReferences(referencesFHIR:R4.IReference[]) : string[] {
        return getStringsReferences(referencesFHIR)
    }
    
    createWithStringReference(strReference:string, type?:string, display?:string): R4.IReference {
        return createWithStringReference(strReference, type, display)
    }
    
    createByStringsReferences(literalReferences:string[]): R4.IReference[]{
        return createByStringsReferences(literalReferences)
    }
    
    createByIdentifiersAndSystem(identifiers:string[], system:string): R4.IReference[] {
        return createByIdentifiersAndSystem(identifiers, system)
    }

}

export function getStringsReferencesByIdentifierAndSystem(referencesFHIR:R4.IReference[], system:string) : string[] {
    if (!referencesFHIR.length || referencesFHIR.length < 1) throw new Error ("Missing FHIR References")

    let identifierReference:string[] = []
    referencesFHIR.forEach(function(item){
        if (item.identifier && item.identifier.system==system && item.identifier.value) {
            identifierReference.push(item.identifier.value)
        }
    })
    return identifierReference
}

export function getStringsReferences(referencesFHIR:R4.IReference[]) : string[] {
    if (!referencesFHIR.length || referencesFHIR.length < 1) throw new Error ("Missing FHIR References")

    let literalReferences:string[] = []
    referencesFHIR.forEach(function(item){
        if (item.reference) literalReferences.push(item.reference)
    })
    return literalReferences
}

export function createWithStringReference(strReference:string, type?:string, display?:string): R4.IReference {
    if (!strReference) return {} as R4.IReference  // returns void, but not null or error
    let fhirReference:R4.IReference = {reference: strReference}
    if (type) fhirReference.type = type
    if (display) fhirReference.display = display
    return fhirReference
}

export function createByStringsReferences(literalReferences:string[]): R4.IReference[]{
    if (!literalReferences.length || literalReferences.length < 1) throw new Error ("Missing literal references")

    let referencesFHIR:R4.IReference[] = []

    literalReferences.forEach(function(item){
        let newReference:R4.IReference = { reference: item }

        if (!referencesFHIR) referencesFHIR = [newReference]    // if not initialized
        else referencesFHIR.push(...referencesFHIR, newReference)
    })

    return referencesFHIR
}

export function createByIdentifiersAndSystem(identifiers:string[], system:string): R4.IReference[] {
    if (!identifiers.length || identifiers.length < 1) throw new Error ("Missing identifiers")

    let references:R4.IReference[] = []

    identifiers.forEach(function(item){
        let newIdentifier:R4.IIdentifier = {
            value: item,
            system: system
        }
        let newReference:R4.IReference = { identifier: newIdentifier }

        if (!references) references = [newReference]    // if not initialized
        else references.push(...references, newReference)
    })

    return references
}