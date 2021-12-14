import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class AuditEvent {
    constructor();
    createAuditEntity(entityTitle?: string, entityDescription?: string, payloadBase64?: string, encryptedPayload?: boolean): R4.IAuditEvent_Entity;
    createPatientRecordAuditEvent(reporterId: string, entityTitle?: string, entityDescription?: string, payloadBase64?: string, encryptedPayload?: boolean): R4.IAuditEvent;
}
/** It is exported because it is used in BundleMessage
 * TODO: review both source, agents, entity (sender, receiver, patient): eg. parent / guardian, practitioner, children
 */
export declare function createPatientRecordAuditEvent(reporterId: string, entityTitle?: string, entityDescription?: string, payloadBase64?: string, encryptedPayload?: boolean, recorded?: string): R4.IAuditEvent;
