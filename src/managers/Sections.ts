/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { medicalHistoryClassification } from "./Loinc"

export class Sections {
    constructor(){
    }

    getPatientSummaryLOINC          = ():string => medicalHistoryClassification.ips
    getSectionAdvanceDirectivesLOINC= ():string => medicalHistoryClassification.advanceDirectives
    getSectionAllergiesLOINC        = ():string => medicalHistoryClassification.allergies
    getSectionDiagnosticResultsLOINC= ():string => medicalHistoryClassification.diagnosticResults
    getSectionDietLOINC             = ():string => medicalHistoryClassification.diet
    getSectionFamilyDiseasesLOINC   = ():string => medicalHistoryClassification.familyDiseases
    getSectionFunctionalStatusLOINC = ():string => medicalHistoryClassification.functionalStatus
    getSectionImmunizationLOINC     = ():string => medicalHistoryClassification.immunization
    getSectionMedicalDevicesLOINC   = ():string => medicalHistoryClassification.medicalDevices
    getSectionMedicationLOINC       = ():string => medicalHistoryClassification.medication
    getSectionMentalStatusLOINC     = ():string => medicalHistoryClassification.mentalStatus
    getSectionOutPatientLOINC       = ():string => medicalHistoryClassification.outpatient
    getSectionPastProblemsLOINC     = ():string => medicalHistoryClassification.pastProblems
    getSectionPlanOfCareLOINC       = ():string => medicalHistoryClassification.planOfCare
    getSectionPregnancyLOINC        = ():string => medicalHistoryClassification.pregnancy
    getSectionProblemListLOINC      = ():string => medicalHistoryClassification.problemList
    getSectionProceduresLOINC       = ():string => medicalHistoryClassification.procedures
    getSectionSocialHistoryLOINC    = ():string => medicalHistoryClassification.socialHistory
    getSectionSymptomsLOINC         = ():string => medicalHistoryClassification.symptoms
    getSectionVitalSignsLOINC       = ():string => medicalHistoryClassification.vitalSigns
}