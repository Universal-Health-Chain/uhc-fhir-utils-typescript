import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class AuditEvent {
    constructor();
    createAuditEntity(entityTitle?: string, entityDescription?: string, payloadBase64?: string, encryptedPayload?: boolean): R4.IAuditEvent_Entity;
    createPatientRecordAuditEvent(reporterId: string, entityTitle?: string, entityDescription?: string, payloadBase64?: string, encryptedPayload?: boolean): R4.IAuditEvent;
}
