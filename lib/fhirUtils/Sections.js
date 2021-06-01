"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sections = void 0;
const Loinc_1 = require("./Loinc");
class Sections {
    constructor() {
        this.getPatientSummaryLOINC = () => Loinc_1.medicalHistoryClassification.ips;
        this.getSectionAdvanceDirectivesLOINC = () => Loinc_1.medicalHistoryClassification.advanceDirectives;
        this.getSectionAllergiesLOINC = () => Loinc_1.medicalHistoryClassification.allergies;
        this.getSectionDiagnosticResultsLOINC = () => Loinc_1.medicalHistoryClassification.diagnosticResults;
        this.getSectionDietLOINC = () => Loinc_1.medicalHistoryClassification.diet;
        this.getSectionFamilyDiseasesLOINC = () => Loinc_1.medicalHistoryClassification.familyDiseases;
        this.getSectionFunctionalStatusLOINC = () => Loinc_1.medicalHistoryClassification.functionalStatus;
        this.getSectionImmunizationLOINC = () => Loinc_1.medicalHistoryClassification.immunization;
        this.getSectionMedicalDevicesLOINC = () => Loinc_1.medicalHistoryClassification.medicalDevices;
        this.getSectionMedicationLOINC = () => Loinc_1.medicalHistoryClassification.medication;
        this.getSectionMentalStatusLOINC = () => Loinc_1.medicalHistoryClassification.mentalStatus;
        this.getSectionOutPatientLOINC = () => Loinc_1.medicalHistoryClassification.outpatient;
        this.getSectionPastProblemsLOINC = () => Loinc_1.medicalHistoryClassification.pastProblems;
        this.getSectionPlanOfCareLOINC = () => Loinc_1.medicalHistoryClassification.planOfCare;
        this.getSectionPregnancyLOINC = () => Loinc_1.medicalHistoryClassification.pregnancy;
        this.getSectionProblemListLOINC = () => Loinc_1.medicalHistoryClassification.problemList;
        this.getSectionProceduresLOINC = () => Loinc_1.medicalHistoryClassification.procedures;
        this.getSectionSocialHistoryLOINC = () => Loinc_1.medicalHistoryClassification.socialHistory;
        this.getSectionSymptomsLOINC = () => Loinc_1.medicalHistoryClassification.symptoms;
        this.getSectionVitalSignsLOINC = () => Loinc_1.medicalHistoryClassification.vitalSigns;
    }
}
exports.Sections = Sections;
