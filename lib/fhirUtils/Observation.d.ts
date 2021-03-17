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
export declare function getChoiceNameFromValueFHIR(fhir: any): string;
export declare function addObservationAsMemberToMainObservation(member: R4.IObservation, main: R4.IObservation): R4.IObservation;
export declare function createBloodTypingMainBundleFHIR(): R4.IBundle;
export declare function createBloodTypeFHIRObservationFromSNOMED(snomedCode: string, language: string): R4.IObservation;
export declare function createABOBloodTypeCodeableConceptFromSNOMED(code: string): R4.ICodeableConcept;
