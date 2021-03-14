/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { GlobalIndexLOINC } from "./Loinc"

export class Sections {
    constructor(){
    }
    
    /** Get medical history section codes */
    
    getSectionDiagnosticResultsLOINC(): string{
        return getSectionDiagnosticResultsLOINC()
    }
    
    getSectionImmunizationLOINC(): string{
        return getSectionImmunizationLOINC()
    }
    
    getSectionVitalSignsLOINC(): string{
        return getSectionVitalSignsLOINC()
    }
    
    getSectionSymptomsLOINC(): string{
        return getSectionSymptomsLOINC()
    }
}

/** Get medical history section codes */

export function getSectionDiagnosticResultsLOINC(): string{
    return GlobalIndexLOINC.categorization.healthSection.DiagnosticResults
}

export function getSectionImmunizationLOINC(): string{
    return GlobalIndexLOINC.categorization.healthSection.immunization
}

export function getSectionVitalSignsLOINC(): string{
    return GlobalIndexLOINC.categorization.healthSection.vitalSigns
}

export function getSectionSymptomsLOINC(): string{
    return GlobalIndexLOINC.categorization.healthSection.symptoms
}