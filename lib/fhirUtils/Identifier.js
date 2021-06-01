"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAssignerToIdentifier = exports.createAssigner = exports.createIdentifierWithoutType = exports.addTypeToIdentifier = exports.createIdentifierByType = exports.createIdentifierType = exports.addIdentifierToResource = exports.Identifier = void 0;
const CodeableConcept_1 = require("./CodeableConcept");
class Identifier {
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
exports.Identifier = Identifier;
function addIdentifierToResource(fhirResource, system, value, use, assignerReference, period) {
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
exports.addIdentifierToResource = addIdentifierToResource;
function createIdentifierType(code, system, customLanguageFile) {
    return CodeableConcept_1.createCodeableConceptWithOptionalLanguage(code, system, customLanguageFile);
}
exports.createIdentifierType = createIdentifierType;
function createIdentifierByType(typeCode, codeSystem, internationalDisplay, systemVersion, userSelected, customText) {
    let identifierType = CodeableConcept_1.createCodeableConcept(typeCode, codeSystem, internationalDisplay, systemVersion, userSelected, customText);
    let identifier = {
        type: identifierType
    };
    return identifier;
}
exports.createIdentifierByType = createIdentifierByType;
function addTypeToIdentifier() {
}
exports.addTypeToIdentifier = addTypeToIdentifier;
function createIdentifierWithoutType(value, system, use, periodStart, periodEnd) {
    let identifier = {
        period: { end: periodEnd, start: periodStart },
        system: system,
        use: use,
        value: value
    };
    return identifier;
}
exports.createIdentifierWithoutType = createIdentifierWithoutType;
function createAssigner() {
}
exports.createAssigner = createAssigner;
function addAssignerToIdentifier() {
}
exports.addAssignerToIdentifier = addAssignerToIdentifier;
