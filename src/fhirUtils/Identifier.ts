/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"

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