"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReasonConcept = exports.createCommunication = exports.Communication = void 0;
const CodeableConcept_1 = require("./CodeableConcept");
const Identifier_1 = require("./Identifier");
const models_1 = require("../models");
const Hl7_1 = require("./Hl7");
const Snomed_1 = require("./Snomed");
const uhc_common_utils_typescript_1 = require("uhc-common-utils-typescript");
const uuidUtils = new uhc_common_utils_typescript_1.Uuid();
class Communication {
    constructor() {
    }
    // identifier should be the same as the UHC Message ID
    create(statusCode, categoryCode, uuidv4, reasonCode, priorityCode, payloadString) {
        const randomUUID = uuidUtils.getValidOrNewRandomUUID(uuidv4);
        return createCommunication(statusCode, categoryCode, randomUUID, reasonCode, priorityCode, payloadString);
    }
    createReasonConcept(code, system, internationalDisplay, userSelected, customText) {
        return createReasonConcept(code, system, internationalDisplay, userSelected, customText);
    }
}
exports.Communication = Communication;
// identifier should be the same as the UHC Message ID, concepts in english by default
function createCommunication(statusCode, categoryCode, randomUUID, reasonCode, priorityCode, payloadString) {
    let communicationIdentifier = Identifier_1.createIdentifierWithoutType("urn:uuid:" + randomUUID, models_1.CodingSystem.ucum);
    let categoryDisplayHL7 = Hl7_1.getDisplayOrTextByCodeHL7(categoryCode);
    let categoryConceptHL7 = CodeableConcept_1.createCodeableConcept(categoryCode, models_1.CodingSystem.communicationCategory, categoryDisplayHL7);
    let communicationFHIR = {
        category: [categoryConceptHL7],
        identifier: [communicationIdentifier],
        resourceType: "Communication",
        status: statusCode
    };
    if (reasonCode) {
        let reasonDisplaySNOMED = Snomed_1.getDisplayOrTextByCodeSNOMED(reasonCode);
        let reasonConceptSNOMED = createReasonConcept(reasonCode, models_1.CodingSystem.snomed, reasonDisplaySNOMED);
        communicationFHIR.reasonCode = [reasonConceptSNOMED];
    }
    return communicationFHIR;
}
exports.createCommunication = createCommunication;
function createReasonConcept(code, system, internationalDisplay, userSelected, customText) {
    return CodeableConcept_1.createCodeableConcept(code, system, internationalDisplay, undefined, userSelected, customText);
}
exports.createReasonConcept = createReasonConcept;
