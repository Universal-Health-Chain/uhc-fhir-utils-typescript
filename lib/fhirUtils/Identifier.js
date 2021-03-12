/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
export class Identifier {
    constructor() {
    }
    addIdentifier(fhirResource, system, value, use, assignerReference, period) {
        return addIdentifier(fhirResource, system, value, use, assignerReference, period);
    }
}
export function addIdentifier(fhirResource, system, value, use, assignerReference, period) {
    let singleIdentifier = { system: system, value: value };
    if (use)
        singleIdentifier.use = use;
    if (assignerReference)
        singleIdentifier.assigner = { reference: assignerReference };
    // //console.log("addIdentifier = ", singleIdentifier)
    //let result = resource       // copy or modify the original resource?
    if (!fhirResource.identifier || !fhirResource.identifier.length || fhirResource.identifier.length < 1)
        fhirResource.identifier = [singleIdentifier];
    else
        fhirResource.identifier.push(singleIdentifier); // or resource.identifier = [...resource.identifier, singleIdentifier]?
    // //console.log("resource with added identifier = ", JSON.stringify(resource))
    return fhirResource;
}
