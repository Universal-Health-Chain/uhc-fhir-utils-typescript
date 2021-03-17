import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class Communication {
    constructor();
    create(statusCode: string, categoryCode: string, uuidv4?: string, reasonCode?: string, priorityCode?: string, payloadString?: string): R4.ICommunication;
    createReasonConcept(code: string, system: string, internationalDisplay: string, userSelected?: boolean, customText?: string): R4.ICodeableConcept;
}
export declare function createCommunication(statusCode: string, categoryCode: string, randomUUID: string, reasonCode?: string, priorityCode?: string, payloadString?: string): R4.ICommunication;
export declare function createReasonConcept(code: string, system: string, internationalDisplay: string, userSelected?: boolean, customText?: string): R4.ICodeableConcept;
