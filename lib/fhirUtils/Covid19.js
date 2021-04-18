/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { GlobalIndexLOINC, getFullSerologyTestCovid19LOINC, getFullNaatTestCovid19LOINC, covidLaboratoryTestGroups, getActiveLaboratoryTestsCovid19 } from "./Loinc";
import { covid19DiseaseTerminologySNOMED, getVaccinationProcedureCovid19CodesSNOMED, positiveOrDetectedCodesSNOMED, negativeOrNotDetectedCodesSNOMED, suspectedOrInconclusiveCodesSNOMED, probablyNotPresentCodesSNOMED, resultCovid19NaatCodesSNOMED, resultCovid19SerologyCodesSNOMED } from "./Snomed";
import { GlobalIndexFHIR } from "./Hl7";
import { covid19DiseaseTermsICD10, covid19DiseaseTermsICD11 } from "./Icd";
import { createCommunication } from "./Communication";
import { getValidOrNewRandomUUID } from "./commonUtils";
import { getCodeListInArrayOfCodeableConcepts } from "./CodeableConcept";
import { getResourcesByTypes } from "./Bundle";
import { CodingSystem } from "../models/UtilsModels";
export class Covid19 {
    constructor() {
        this.covid19Tag = () => covid19Tag(); // "COVID-19"
        /** Alert Communications */
        this.createCovid19DiseaseAlertCommunication = (priorityCode) => createCovid19DiseaseAlertCommunication(priorityCode);
        this.createCovid19SuspectedAlertCommunication = (priorityCode) => createCovid19SuspectedAlertCommunication(priorityCode);
        this.createCovid19ExposureAlertCommunication = (priorityCode) => createCovid19ExposureAlertCommunication(priorityCode);
        this.isCovid19DiseaseAlertCommunication = (communication) => isCovid19DiseaseAlertCommunication(communication);
        this.isCovid19SuspectedAlertCommunication = (communication) => isCovid19SuspectedAlertCommunication(communication);
        this.isCovid19ExposureAlertCommunication = (communication) => isCovid19ExposureAlertCommunication(communication);
        /** Get specific codes by HL7 */
        this.vaccineCodesCVX = () => vaccineCodesCVX();
        /** Get specific codes by system WHO's ATC */
        this.vaccineCodeATC = () => vaccineCodeATC();
        /** Get LOINC laboratory test group code: serology or naat group code */
        this.naatTestsGroupCodeLOINC = () => naatTestsGroupCodeLOINC();
        this.serologyTestsGroupCodeLOINC = () => serologyTestsGroupCodeLOINC();
        /** Get all or specific LOINC laboratory tests */
        this.laboratoryTestsCodesLOINC = () => laboratoryTestsCodesLOINC();
        this.activeLaboratoryTestsLOINC = () => getActiveLaboratoryTestsCovid19();
        this.naatTestsCodesLOINC = () => getFullNaatTestCovid19LOINC();
        this.serologyTestsCodesLOINC = () => getFullSerologyTestCovid19LOINC();
        /** Get specific codes by system SNOMED */
        this.naatResultsCodesSNOMED = () => naatResultsCodesSNOMED();
        this.serologyResultsCodesSNOMED = () => serologyResultsCodesSNOMED();
        this.positiveOrDetectedCodesSNOMED = () => positiveOrDetectedCodesSNOMED();
        this.negativeOrNotDetectedCodesSNOMED = () => negativeOrNotDetectedCodesSNOMED();
        this.suspectedOrInconclusiveCodesSNOMED = () => suspectedOrInconclusiveCodesSNOMED();
        this.probablyNotPresentCodesSNOMED = () => probablyNotPresentCodesSNOMED();
        this.vaccinationProcedureCodesInternationalSNOMED = () => vaccinationProcedureCodesInternationalSNOMED();
        this.vaccinationProcedureCodesSpainSNOMED = () => vaccinationProcedureCodesSpainSNOMED();
        this.confirmedDiseaseSNOMED = () => confirmedDiseaseSNOMED();
        this.suspectedDiseaseSNOMED = () => suspectedDiseaseSNOMED();
        this.exposureToDiseaseSNOMED = () => exposureToDiseaseSNOMED();
        /** Get specific codes by system ICD10 and ICD11 */
        this.confirmedDiseaseICD10 = () => confirmedDiseaseICD10();
        this.suspectedDiseaseICD10 = () => suspectedDiseaseICD10();
        this.confirmedDiseaseICD11 = () => confirmedDiseaseICD11();
        this.suspectedDiseaseICD11 = () => suspectedDiseaseICD11();
        /** Merge codes from distinct systems (if several ones, e.g. for searching) */
        this.vaccineCodes = () => vaccineCodes();
        this.isCovid19Vaccine = (code) => isCovid19Vaccine(code);
        this.vaccinationProcedureCodes = () => vaccinationProcedureCodes();
        this.diseaseCodes = () => diseaseCodes();
        this.isCovid19Disease = (code) => isCovid19Disease(code);
        this.suspectedDiseaseCodes = () => suspectedDiseaseCodes();
        this.isSuspectedDisease = (code) => isSuspectedDisease(code);
        this.diseaseOrSuspectedDiseaseCodes = () => diseaseOrSuspectedDiseaseCodes();
        this.isCovid19OrSuspectedDisease = (code) => isCovid19OrSuspectedDisease(code);
        this.laboratoryTestCodes = () => laboratoryTestCodes();
        this.laboratoryTestAndGroupsCodes = () => laboratoryTestAndGroupsCodes();
        /** Get COVID-19 specific resoruces */
        this.getCovid19DiagnosticReportsInDocument = (bundleDocument) => getCovid19DiagnosticReportsInDocument(bundleDocument);
        this.getCovid19ImmunizationsInDocument = (bundleDocument) => getCovid19ImmunizationsInDocument(bundleDocument);
    }
}
// identifier should be the same as the UHC Message ID, concepts in english by default
export function createCovid19DiseaseAlertCommunication(priorityCode) {
    return createCommunication("completed", "alert", getValidOrNewRandomUUID(), covid19DiseaseTerminologySNOMED.covid19Disease, priorityCode);
}
export function createCovid19SuspectedAlertCommunication(priorityCode) {
    return createCommunication("completed", "alert", getValidOrNewRandomUUID(), covid19DiseaseTerminologySNOMED.suspectedCovid19, priorityCode);
}
export function createCovid19ExposureAlertCommunication(priorityCode) {
    return createCommunication("completed", "alert", getValidOrNewRandomUUID(), covid19DiseaseTerminologySNOMED.exposureToCovid19, priorityCode);
}
export function isCovid19DiseaseAlertCommunication(communication) {
    if (!communication.category)
        return false;
    let categoryCodes = getCodeListInArrayOfCodeableConcepts(communication.category);
    if (!categoryCodes.includes("alert"))
        return false;
    let reasonCodes = getCodeListInArrayOfCodeableConcepts(communication.reasonCode);
    if (!reasonCodes.includes(covid19DiseaseTerminologySNOMED.covid19Disease))
        return false;
    return true; // both "alert" and "covid19Disease" are present
}
export function isCovid19SuspectedAlertCommunication(communication) {
    if (!communication.category)
        return false;
    let categoryCodes = getCodeListInArrayOfCodeableConcepts(communication.category);
    if (!categoryCodes.includes("alert"))
        return false;
    let reasonCodes = getCodeListInArrayOfCodeableConcepts(communication.reasonCode);
    if (!reasonCodes.includes(covid19DiseaseTerminologySNOMED.suspectedCovid19))
        return false;
    return true; // both "alert" and "suspectedCovid19" are present
}
export function isCovid19ExposureAlertCommunication(communication) {
    if (!communication.category)
        return false;
    let categoryCodes = getCodeListInArrayOfCodeableConcepts(communication.category);
    if (!categoryCodes.includes("alert"))
        return false;
    let reasonCodes = getCodeListInArrayOfCodeableConcepts(communication.reasonCode);
    if (!reasonCodes.includes(covid19DiseaseTerminologySNOMED.exposureToCovid19))
        return false;
    return true; // both "alert" and "exposureToCovid19" are present
}
export const covid19Tag = () => "COVID-19";
/** Get specific codes by HL7 */
const vaccineCodesCVX = () => GlobalIndexFHIR.groupedCodes.cvxCovid19.codes;
/** Get specific codes by system WHO's ATC */
const vaccineCodeATC = () => "J07BX03";
/** Get LOINC laboratory test group code: serology or naat group code */
const naatTestsGroupCodeLOINC = () => covidLaboratoryTestGroups.naatTestsGroup;
const serologyTestsGroupCodeLOINC = () => covidLaboratoryTestGroups.serologyTestsGroup;
/** Get all or specific LOINC laboratory tests */
const laboratoryTestsCodesLOINC = () => GlobalIndexLOINC.groupedCodes.laboratoryTestCovid19.codes;
/** Get specific codes by system SNOMED */
const naatResultsCodesSNOMED = () => [
    resultCovid19NaatCodesSNOMED.detected, resultCovid19NaatCodesSNOMED.notDetected
];
const serologyResultsCodesSNOMED = () => [
    resultCovid19SerologyCodesSNOMED.positive, resultCovid19SerologyCodesSNOMED.negative
];
const vaccinationProcedureCodesInternationalSNOMED = () => getVaccinationProcedureCovid19CodesSNOMED("INTERNATIONAL");
const vaccinationProcedureCodesSpainSNOMED = () => getVaccinationProcedureCovid19CodesSNOMED("ES");
const confirmedDiseaseSNOMED = () => covid19DiseaseTerminologySNOMED.covid19Disease;
const suspectedDiseaseSNOMED = () => covid19DiseaseTerminologySNOMED.suspectedCovid19;
const exposureToDiseaseSNOMED = () => covid19DiseaseTerminologySNOMED.exposureToCovid19;
/** Get specific codes by system ICD10 and ICD11 */
const confirmedDiseaseICD10 = () => covid19DiseaseTermsICD10.covid19Disease;
const suspectedDiseaseICD10 = () => covid19DiseaseTermsICD10.suspectedCovid19;
const confirmedDiseaseICD11 = () => covid19DiseaseTermsICD11.covid19Disease;
const suspectedDiseaseICD11 = () => covid19DiseaseTermsICD11.suspectedCovid19;
/** Merge codes from distinct systems (if several ones, e.g. for searching) */
export const vaccineCodes = () => [...vaccineCodesCVX(), vaccineCodeATC()];
const isCovid19Vaccine = (code) => vaccineCodes().includes(code) ? true : false;
export const vaccinationProcedureCodes = () => [...getVaccinationProcedureCovid19CodesSNOMED("GLOBAL")];
export const diseaseCodes = () => [confirmedDiseaseSNOMED(), confirmedDiseaseICD10(), confirmedDiseaseICD11()];
const isCovid19Disease = (code) => diseaseCodes().includes(code) ? true : false;
export const suspectedDiseaseCodes = () => [suspectedDiseaseSNOMED(), suspectedDiseaseICD10(), suspectedDiseaseICD11()];
const isSuspectedDisease = (code) => suspectedDiseaseCodes().includes(code) ? true : false;
export const diseaseOrSuspectedDiseaseCodes = () => [...diseaseCodes(), ...suspectedDiseaseCodes()];
const isCovid19OrSuspectedDisease = (code) => diseaseOrSuspectedDiseaseCodes().includes(code) ? true : false;
export const laboratoryTestCodes = () => GlobalIndexLOINC.groupedCodes.laboratoryTestCovid19.codes;
export const laboratoryTestAndGroupsCodes = () => [
    covidLaboratoryTestGroups.serologyTestsGroup,
    covidLaboratoryTestGroups.serologyTestsGroup,
    ...GlobalIndexLOINC.groupedCodes.laboratoryTestCovid19.codes
];
// it checks and gets only the first code into DiagnosticReport.code.coding[0].code if it matchs
export function getCovid19DiagnosticReportsInDocument(bundleDoc) {
    let diagnosticReports = getResourcesByTypes(bundleDoc, ["DiagnosticReport"]);
    // console.log("diagnosticReports found = ", diagnosticReports)
    const covid19Codes = laboratoryTestAndGroupsCodes(); // full COVID-10 laboratory test codes (currently only LOINC codes)
    let covid19DiagnosticReports = [];
    diagnosticReports.forEach(function (item) {
        // TODO: must ckeck the entire codes into the CodeableConcept "DiagnosticReport.code", not only the first one
        // let diagnosticReportCodes = getCodesBySystemInCodeableConcept(item.code)
        if (item.code && item.code.coding && item.code.coding[0].system == CodingSystem.loinc && item.code.coding[0].code) {
            if (covid19Codes.includes(item.code.coding[0].code))
                covid19DiagnosticReports.push(item);
        }
    });
    return covid19DiagnosticReports;
}
// it checks and gets only the first code into DiagnosticReport.code.coding[0].code if it matchs
export function getCovid19ImmunizationsInDocument(bundleDoc) {
    let immunizations = getResourcesByTypes(bundleDoc, ["Immunization"]);
    const covid19Codes = vaccineCodes(); // full COVID-10 vaccine codes: ATC and SNOMED codes
    // console.log("FullCovid19VaccineCodes = ", covid19Codes)
    let covid19Immunizations = [];
    immunizations.forEach(function (item) {
        // TODO: must ckeck the entire codes into the CodeableConcept "DiagnosticReport.code", not only the first one
        // let diagnosticReportCodes = getCodesBySystemInCodeableConcept(item.code)
        if (item.vaccineCode && item.vaccineCode.coding && item.vaccineCode.coding[0].system == GlobalIndexFHIR.groupedCodes.cvx.system && item.vaccineCode.coding[0].code) {
            if (covid19Codes.includes(item.vaccineCode.coding[0].code))
                covid19Immunizations.push(item);
        }
    });
    return covid19Immunizations;
}
