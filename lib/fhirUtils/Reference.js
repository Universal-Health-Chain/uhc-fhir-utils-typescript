/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
export class Reference {
    constructor() {
    }
    getStringsReferencesByIdentifierAndSystem(referencesFHIR, system) {
        return getStringsReferencesByIdentifierAndSystem(referencesFHIR, system);
    }
    getStringsReferences(referencesFHIR) {
        return getStringsReferences(referencesFHIR);
    }
    createWithStringReference(strReference, type, display) {
        return createWithStringReference(strReference, type, display);
    }
    createByStringsReferences(literalReferences) {
        return createByStringsReferences(literalReferences);
    }
    createByIdentifiersAndSystem(identifiers, system) {
        return createByIdentifiersAndSystem(identifiers, system);
    }
}
export function getStringsReferencesByIdentifierAndSystem(referencesFHIR, system) {
    if (!referencesFHIR.length || referencesFHIR.length < 1)
        throw new Error("Missing FHIR References");
    let identifierReference = [];
    referencesFHIR.forEach(function (item) {
        if (item.identifier && item.identifier.system == system && item.identifier.value) {
            identifierReference.push(item.identifier.value);
        }
    });
    return identifierReference;
}
export function getStringsReferences(referencesFHIR) {
    if (!referencesFHIR.length || referencesFHIR.length < 1)
        throw new Error("Missing FHIR References");
    let literalReferences = [];
    referencesFHIR.forEach(function (item) {
        if (item.reference)
            literalReferences.push(item.reference);
    });
    return literalReferences;
}
export function createWithStringReference(strReference, type, display) {
    if (!strReference)
        return {}; // returns void, but not null or error
    let fhirReference = { reference: strReference };
    if (type)
        fhirReference.type = type;
    if (display)
        fhirReference.display = display;
    return fhirReference;
}
export function createByStringsReferences(literalReferences) {
    if (!literalReferences.length || literalReferences.length < 1)
        throw new Error("Missing literal references");
    let referencesFHIR = [];
    literalReferences.forEach(function (item) {
        let newReference = { reference: item };
        if (!referencesFHIR)
            referencesFHIR = [newReference]; // if not initialized
        else
            referencesFHIR.push(...referencesFHIR, newReference);
    });
    return referencesFHIR;
}
export function createByIdentifiersAndSystem(identifiers, system) {
    if (!identifiers.length || identifiers.length < 1)
        throw new Error("Missing identifiers");
    let references = [];
    identifiers.forEach(function (item) {
        let newIdentifier = {
            value: item,
            system: system
        };
        let newReference = { identifier: newIdentifier };
        if (!references)
            references = [newReference]; // if not initialized
        else
            references.push(...references, newReference);
    });
    return references;
}
