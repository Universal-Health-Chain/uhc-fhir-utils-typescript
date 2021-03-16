/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { createCodeableConceptWithLanguageFile, createCodeableConcept } from "./CodeableConcept";
export class Identifier {
    constructor() {
    }
    createIdentifierType(code, system, customLanguageFile) {
        return createIdentifierType(code, system, customLanguageFile);
    }
    createIdentifierByType(typeCode, codeSystem, internationalDisplay, systemVersion, userSelected, customText) {
        return createIdentifierByType(typeCode, codeSystem, internationalDisplay, systemVersion, userSelected, customText);
    }
    addTypeToIdentifier() {
    }
    createIdentifierWithoutType() {
    }
    createAssigner() {
    }
    addAssignerToIdentifier() {
    }
    addIdentifierToResource(fhirResource, system, value, use, assignerReference, period) {
        return addIdentifierToResource(fhirResource, system, value, use, assignerReference, period);
    }
}
export function addIdentifierToResource(fhirResource, system, value, use, assignerReference, period) {
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
export function createIdentifierType(code, system, customLanguageFile) {
    return createCodeableConceptWithLanguageFile(code, system, customLanguageFile);
}
export function createIdentifierByType(typeCode, codeSystem, internationalDisplay, systemVersion, userSelected, customText) {
    let identifierType = createCodeableConcept(typeCode, codeSystem, internationalDisplay, systemVersion, userSelected, customText);
    let identifier = {
        type: identifierType
    };
    return identifier;
}
export function addTypeToIdentifier() {
}
export function createIdentifierWithoutType(value, system, use, periodStart, periodEnd) {
    let identifier = {
        period: { end: periodEnd, start: periodStart },
        system: system,
        use: use,
        value: value
    };
    return identifier;
}
export function createAssigner() {
}
export function addAssignerToIdentifier() {
}
