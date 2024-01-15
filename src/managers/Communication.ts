/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { createCodeableConcept } from "./CodeableConcept"
import { createIdentifierWithoutType } from "./Identifier"
import { CodingSystem } from "../models/CommonModels"
import { getDisplayOrTextByCodeHL7 } from "./Hl7"
import { getDisplayOrTextByCodeSNOMED } from "./Snomed"

import { Uuid, getValidOrNewRandomUUID } from "@universal-health-chain/uhc-common-utils-typescript"

const uuidUtils = new Uuid() 

export class Communication {
    
    constructor(){
    }

    /** async method
     *  Note: identifier should be the same as the UHC Message ID
     */
    async create(statusCode:string, categoryCode:string, uuidv4?:string, reasonCode?:string, priorityCode?:string, payloadString?:string): Promise<R4.ICommunication>{
        const randomUUID = getValidOrNewRandomUUID(uuidv4)
        return await createCommunication(statusCode, categoryCode, randomUUID, reasonCode, priorityCode, payloadString)
    }

    createReasonConcept(code:string, system:string, internationalDisplay:string, userSelected?:boolean, customText?:string): R4.ICodeableConcept {
        return createReasonConcept(code, system, internationalDisplay, userSelected, customText)
    }

    // addPayloadString(contentString:string){}

}

// identifier should be the same as the UHC Message ID, concepts in english by default
export async function createCommunication(statusCode:string, categoryCode:string, randomUUID:string, reasonCode?:string, priorityCode?:string, payloadString?:string): Promise<R4.ICommunication>{
    let communicationIdentifier:R4.IIdentifier = createIdentifierWithoutType("urn:uuid:"+randomUUID, CodingSystem.ucum)
    
    let categoryDisplayHL7:string = await getDisplayOrTextByCodeHL7(categoryCode)
    let categoryConceptHL7:R4.ICodeableConcept = createCodeableConcept(categoryCode, CodingSystem.communicationCategory, categoryDisplayHL7)
        
    let communicationFHIR:R4.ICommunication = {
        category: [categoryConceptHL7],
        identifier: [communicationIdentifier],
        resourceType: "Communication",
        status: statusCode
    }

    if (reasonCode) {
        let reasonDisplaySNOMED:string = getDisplayOrTextByCodeSNOMED(reasonCode)
        let reasonConceptSNOMED:R4.ICodeableConcept = createReasonConcept(reasonCode, CodingSystem.snomed, reasonDisplaySNOMED)
        communicationFHIR.reasonCode = [reasonConceptSNOMED]
    }
    
    return communicationFHIR
}


export function createReasonConcept(code:string, system:string, internationalDisplay:string, userSelected?:boolean, customText?:string): R4.ICodeableConcept {
    return createCodeableConcept(code, system, internationalDisplay, undefined, userSelected, customText)
}