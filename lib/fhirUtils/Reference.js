"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createByIdentifiersAndSystem = exports.createByStringsReferences = exports.createWithStringReference = exports.getStringsReferences = exports.getStringsReferencesByIdentifierAndSystem = exports.getReferenceType = exports.Reference = void 0;
class Reference {
    constructor() {
    }
    getReferenceType(reference) {
        return getReferenceType(reference);
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
exports.Reference = Reference;
function getReferenceType(reference) {
    if (reference.type)
        return reference.type;
    if (reference.reference) {
        const referenceParts = reference.reference.split('/'); // e.g. 'Patient/uuid' has length = 2
        if (referenceParts && referenceParts.length && referenceParts.length >= 2)
            return referenceParts[0];
    }
    return "";
}
exports.getReferenceType = getReferenceType;
function getStringsReferencesByIdentifierAndSystem(referencesFHIR, system) {
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
exports.getStringsReferencesByIdentifierAndSystem = getStringsReferencesByIdentifierAndSystem;
function getStringsReferences(referencesFHIR) {
    if (!referencesFHIR.length || referencesFHIR.length < 1)
        throw new Error("Missing FHIR References");
    let literalReferences = [];
    referencesFHIR.forEach(function (item) {
        if (item.reference)
            literalReferences.push(item.reference);
    });
    return literalReferences;
}
exports.getStringsReferences = getStringsReferences;
function createWithStringReference(strReference, type, display) {
    if (!strReference)
        return {}; // returns void, but not null or error
    let fhirReference = { reference: strReference };
    if (type)
        fhirReference.type = type;
    if (display)
        fhirReference.display = display;
    return fhirReference;
}
exports.createWithStringReference = createWithStringReference;
// no error if empty because it accepts undefined as input
function createByStringsReferences(literalReferences) {
    let referencesFHIR = [];
    if (!literalReferences || !literalReferences.length || literalReferences.length < 1)
        return referencesFHIR;
    literalReferences.forEach(function (item) {
        let newReference = { reference: item };
        if (!referencesFHIR)
            referencesFHIR = [newReference]; // if not initialized
        else
            referencesFHIR.push(...referencesFHIR, newReference);
    });
    return referencesFHIR;
}
exports.createByStringsReferences = createByStringsReferences;
function createByIdentifiersAndSystem(identifiers, system) {
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
exports.createByIdentifiersAndSystem = createByIdentifiersAndSystem;
