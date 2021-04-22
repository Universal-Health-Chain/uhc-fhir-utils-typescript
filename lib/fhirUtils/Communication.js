/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { createCodeableConcept } from "./CodeableConcept";
import { createIdentifierWithoutType } from "./Identifier";
import { CodingSystem } from "../models";
import { getDisplayOrTextByCodeHL7 } from "./Hl7";
import { getDisplayOrTextByCodeSNOMED } from "./Snomed";
import { Uuid } from "uhc-common-utils-typescript";
const uuidUtils = new Uuid();
export class Communication {
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
// identifier should be the same as the UHC Message ID, concepts in english by default
export function createCommunication(statusCode, categoryCode, randomUUID, reasonCode, priorityCode, payloadString) {
    let communicationIdentifier = createIdentifierWithoutType("urn:uuid:" + randomUUID, CodingSystem.ucum);
    let categoryDisplayHL7 = getDisplayOrTextByCodeHL7(categoryCode);
    let categoryConceptHL7 = createCodeableConcept(categoryCode, CodingSystem.communicationCategory, categoryDisplayHL7);
    let communicationFHIR = {
        category: [categoryConceptHL7],
        identifier: [communicationIdentifier],
        resourceType: "Communication",
        status: statusCode
    };
    if (reasonCode) {
        let reasonDisplaySNOMED = getDisplayOrTextByCodeSNOMED(reasonCode);
        let reasonConceptSNOMED = createReasonConcept(reasonCode, CodingSystem.snomed, reasonDisplaySNOMED);
        communicationFHIR.reasonCode = [reasonConceptSNOMED];
    }
    return communicationFHIR;
}
export function createReasonConcept(code, system, internationalDisplay, userSelected, customText) {
    return createCodeableConcept(code, system, internationalDisplay, undefined, userSelected, customText);
}
