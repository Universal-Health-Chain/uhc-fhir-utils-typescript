/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { GlobalIndexLOINC } from "./Loinc";
export class Sections {
    constructor() {
    }
    /** Get medical history section codes */
    getSectionDiagnosticResultsLOINC() {
        return getSectionDiagnosticResultsLOINC();
    }
    getSectionImmunizationLOINC() {
        return getSectionImmunizationLOINC();
    }
    getSectionVitalSignsLOINC() {
        return getSectionVitalSignsLOINC();
    }
    getSectionSymptomsLOINC() {
        return getSectionSymptomsLOINC();
    }
}
/** Get medical history section codes */
export function getSectionDiagnosticResultsLOINC() {
    return GlobalIndexLOINC.categorization.healthSection.DiagnosticResults;
}
export function getSectionImmunizationLOINC() {
    return GlobalIndexLOINC.categorization.healthSection.immunization;
}
export function getSectionVitalSignsLOINC() {
    return GlobalIndexLOINC.categorization.healthSection.vitalSigns;
}
export function getSectionSymptomsLOINC() {
    return GlobalIndexLOINC.categorization.healthSection.symptoms;
}
