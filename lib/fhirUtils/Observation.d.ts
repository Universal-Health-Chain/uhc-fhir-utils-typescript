import { R4 } from "@ahryman40k/ts-fhir-types";
export declare function getSectionVitalSignsLOINC(): string;
export declare function getSectionSymptomsLOINC(): string;
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
export declare function addObservationAsMemberToMainObservation(member: R4.IObservation, main: R4.IObservation): R4.IObservation;
export declare function createBloodTypingMainBundleFHIR(): R4.IBundle;
