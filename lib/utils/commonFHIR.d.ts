import { R4 } from "@ahryman40k/ts-fhir-types";
export interface ObservationChoiceValueFhirR4 {
    valueString?: string;
    valueQuantity?: R4.IQuantity;
    valueInteger?: number;
    valueRatio?: R4.IRatio;
    valueRange?: R4.IRange;
    valueCodeableConcept?: R4.ICodeableConcept;
    valueBoolean?: boolean;
    valueSampledData?: R4.ISampledData;
    valueTime?: string;
    valueDateTime?: string;
    valuePeriod?: R4.IPeriod;
}
export declare function getBytesEmbedded(fhirAttachment: R4.IAttachment): Uint8Array;
export declare function validateFhirDateTime(dateTime: string): boolean;
export declare function addIdentifier(fhirResource: any, system: string, value: string, use?: R4.IdentifierUseKind, assignerReference?: string, period?: R4.IPeriod): any;
export declare function createAttachmentFHIR(url: string, resourceLanguage?: string, size?: number, hash?: string, creation?: string, title?: string): R4.IAttachment;
export declare function createFhirAttachment(mimeType: string, id?: string, url?: string, title?: string, language?: string, hashSHA1?: string, size?: number, base64Data?: string, creationDateTime?: string): R4.IAttachment;
export declare function createFhirReferences(strReferences: string[]): R4.IReference[];
export declare function createFhirReference(strReference: string, type?: string, display?: string): R4.IReference;
export declare function getChoiceNameFromValueFHIR(fhir: any): string;
export declare function addObservationAsMemberToMainObservation(member: R4.IObservation, main: R4.IObservation): R4.IObservation;
export declare function createBloodTypingMainBundleFHIR(): R4.IBundle;
