/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { medicalHistoryClassification } from "./Loinc";
export class Sections {
    constructor() {
        this.getPatientSummaryLOINC = () => medicalHistoryClassification.ips;
        this.getSectionAdvanceDirectivesLOINC = () => medicalHistoryClassification.advanceDirectives;
        this.getSectionAllergiesLOINC = () => medicalHistoryClassification.allergies;
        this.getSectionDiagnosticResultsLOINC = () => medicalHistoryClassification.diagnosticResults;
        this.getSectionDietLOINC = () => medicalHistoryClassification.diet;
        this.getSectionFamilyDiseasesLOINC = () => medicalHistoryClassification.familyDiseases;
        this.getSectionFunctionalStatusLOINC = () => medicalHistoryClassification.functionalStatus;
        this.getSectionImmunizationLOINC = () => medicalHistoryClassification.immunization;
        this.getSectionMedicalDevicesLOINC = () => medicalHistoryClassification.medicalDevices;
        this.getSectionMedicationLOINC = () => medicalHistoryClassification.medication;
        this.getSectionMentalStatusLOINC = () => medicalHistoryClassification.mentalStatus;
        this.getSectionOutPatientLOINC = () => medicalHistoryClassification.outpatient;
        this.getSectionPastProblemsLOINC = () => medicalHistoryClassification.pastProblems;
        this.getSectionPlanOfCareLOINC = () => medicalHistoryClassification.planOfCare;
        this.getSectionPregnancyLOINC = () => medicalHistoryClassification.pregnancy;
        this.getSectionProblemListLOINC = () => medicalHistoryClassification.problemList;
        this.getSectionProceduresLOINC = () => medicalHistoryClassification.procedures;
        this.getSectionSocialHistoryLOINC = () => medicalHistoryClassification.socialHistory;
        this.getSectionSymptomsLOINC = () => medicalHistoryClassification.symptoms;
        this.getSectionVitalSignsLOINC = () => medicalHistoryClassification.vitalSigns;
    }
}
