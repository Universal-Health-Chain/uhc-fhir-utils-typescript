/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { createCodeableConceptWithOptionalLanguage, createCodeableConcept } from "./CodeableConcept"

export class Identifier {
    
    constructor(){
    }

    createIdentifierType(code:string, system:string, customLanguageFile?:any):R4.ICodeableConcept{
        return createIdentifierType(code, system, customLanguageFile)
    }

    createIdentifierByType(typeCode:string, codeSystem:string, internationalDisplay:string, systemVersion?:string, userSelected?:boolean, customText?:string):R4.IIdentifier{
        return  createIdentifierByType(typeCode, codeSystem, internationalDisplay, systemVersion, userSelected, customText)
    }

    addTypeToIdentifier(){

    }

    createIdentifierWithoutType(){

    }

    createAssigner(){

    }

    addAssignerToIdentifier(){

    }

    addIdentifierToResource(fhirResource:any, system:string, value:string, use?:R4.IdentifierUseKind, assignerReference?:string, period?:R4.IPeriod): any {
        return addIdentifierToResource(fhirResource, system, value, use, assignerReference, period)
    }

}

export function addIdentifierToResource(fhirResource:any, system:string, value:string, use?:R4.IdentifierUseKind, assignerReference?:string, period?:R4.IPeriod): any {
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

export function createIdentifierType(code:string, system:string, customLanguageFile?:any):R4.ICodeableConcept{
    return createCodeableConceptWithOptionalLanguage(code, system, customLanguageFile)
}

export function createIdentifierByType(typeCode:string, codeSystem:string, internationalDisplay:string, systemVersion?:string, userSelected?:boolean, customText?:string):R4.IIdentifier{
    let identifierType:R4.ICodeableConcept = createCodeableConcept(typeCode, codeSystem, internationalDisplay, systemVersion, userSelected, customText)
    let identifier:R4.IIdentifier = {
        type: identifierType
    }
    return identifier
}

export function addTypeToIdentifier(){
    
}

export function createIdentifierWithoutType(value:string, system:string, use?:R4.IdentifierUseKind, periodStart?:string, periodEnd?:string){
    let identifier:R4.IIdentifier = {
        period: {end:periodEnd, start:periodStart},
        system: system,
        use: use,
        value: value
    }
    return identifier
}

export function createAssigner(){

}

export function addAssignerToIdentifier(){

}