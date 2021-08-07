"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCovid19ImmunizationsInDocument = exports.getCovid19DiagnosticReportsInDocument = exports.covid19LaboratoryTestsAndGroupsCodes = exports.covid19LaboratoryTestsCodes = exports.diseaseOrSuspectedDiseaseCodes = exports.suspectedDiseaseCodes = exports.diseaseCodes = exports.vaccinationProcedureCodes = exports.covid19VaccineProphylaxisCodesEMA = exports.covid19VaccineProphylaxisCodesGlobal = exports.isCovid19ExposureAlertCommunication = exports.isCovid19SuspectedAlertCommunication = exports.isCovid19DiseaseAlertCommunication = exports.createCovid19ExposureAlertCommunication = exports.createCovid19SuspectedAlertCommunication = exports.createCovid19DiseaseAlertCommunication = exports.Covid19 = exports.vaccineProphylaxisCodeATC = exports.covid19Tag = void 0;
const Loinc_1 = require("./Loinc");
const Snomed_1 = require("./Snomed");
const Hl7_1 = require("./Hl7");
const Icd_1 = require("./Icd");
const Communication_1 = require("./Communication");
// import { getValidOrNewRandomUUID } from "./commonUtils"
const CodeableConcept_1 = require("./CodeableConcept");
const Bundle_1 = require("./Bundle");
const uhc_common_utils_typescript_1 = require("@universal-health-chain/uhc-common-utils-typescript");
const Ema_1 = require("./Ema");
const uuidUtils = new uhc_common_utils_typescript_1.Uuid();
exports.covid19Tag = "COVID-19";
exports.vaccineProphylaxisCodeATC = "J07BX03";
// TODO: add test for the new added functions 
class Covid19 {
    constructor() {
        this.covid19Tag = () => exports.covid19Tag; // "COVID-19"
        /** Alert Communications */
        this.createCovid19DiseaseAlertCommunication = (priorityCode) => createCovid19DiseaseAlertCommunication(priorityCode);
        this.createCovid19SuspectedAlertCommunication = (priorityCode) => createCovid19SuspectedAlertCommunication(priorityCode);
        this.createCovid19ExposureAlertCommunication = (priorityCode) => createCovid19ExposureAlertCommunication(priorityCode);
        this.isCovid19DiseaseAlertCommunication = (communication) => isCovid19DiseaseAlertCommunication(communication);
        this.isCovid19SuspectedAlertCommunication = (communication) => isCovid19SuspectedAlertCommunication(communication);
        this.isCovid19ExposureAlertCommunication = (communication) => isCovid19ExposureAlertCommunication(communication);
        /** Get specific codes by CVX coding system */
        this.vaccineProphylaxisCodesCVX = () => vaccineProphylaxisCodesCVX();
        /** Get specific codes by WHO's ATC coding system*/
        this.vaccineProphylaxisCodeATC = () => exports.vaccineProphylaxisCodeATC;
        /** Get specific vaccine prophylaxis codes (no vaccine product codes) by SNOMED coding system */
        this.vaccineProphylaxisCodesSNOMED = () => Snomed_1.covid19VaccineProphylaxisCodesSNOMED();
        /** Get LOINC laboratory test group code: serology or naat group code */
        this.naatTestsGroupCodeLOINC = () => naatTestsGroupCodeLOINC();
        this.serologyTestsGroupCodeLOINC = () => serologyTestsGroupCodeLOINC();
        /** Get all or specific LOINC laboratory tests */
        this.laboratoryTestsCodesLOINC = () => laboratoryTestsCodesLOINC();
        this.activeLaboratoryTestsLOINC = () => Loinc_1.getActiveLaboratoryTestsCovid19();
        this.naatTestsCodesLOINC = () => Loinc_1.getFullNaatTestCovid19LOINC();
        this.serologyTestsCodesLOINC = () => Loinc_1.getFullSerologyTestCovid19LOINC();
        /** Get specific codes by system SNOMED */
        this.laboratoryOriginSampleCodesSNOMED = () => Snomed_1.covid19LaboratoryOriginSamples();
        this.naatResultsCodesSNOMED = () => naatResultsCodesSNOMED();
        this.serologyResultsCodesSNOMED = () => serologyResultsCodesSNOMED();
        this.positiveOrDetectedCodesSNOMED = () => Snomed_1.positiveOrDetectedCodesSNOMED();
        this.negativeOrNotDetectedCodesSNOMED = () => Snomed_1.negativeOrNotDetectedCodesSNOMED();
        this.suspectedOrInconclusiveCodesSNOMED = () => Snomed_1.suspectedOrInconclusiveCodesSNOMED();
        this.probablyNotPresentCodesSNOMED = () => Snomed_1.probablyNotPresentCodesSNOMED();
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
        /** Manufacturers by system */
        this.getCovid19OfficialManufacturerCodesEMA = () => Ema_1.getCovid19OfficialManufacturerCodesEMA();
        // for clinical trials
        this.getCovid19TempManufacturerCodesEMA = () => Ema_1.getCovid19TempManufacturerCodesEMA();
        /** Merge codes from distinct systems (if several ones, e.g. for searching) */
        this.vaccineProphylaxisCodesGlobal = () => exports.covid19VaccineProphylaxisCodesGlobal();
        this.vaccineProphylaxisCodesEMA = () => exports.covid19VaccineProphylaxisCodesEMA();
        this.laboratoryTestCodes = () => exports.covid19LaboratoryTestsCodes();
        this.laboratoryTestAndGroupsCodes = () => exports.covid19LaboratoryTestsAndGroupsCodes();
        this.vaccinationProcedureCodes = () => exports.vaccinationProcedureCodes();
        this.diseaseCodes = () => exports.diseaseCodes();
        this.diseaseOrSuspectedDiseaseCodes = () => exports.diseaseOrSuspectedDiseaseCodes();
        this.suspectedDiseaseCodes = () => exports.suspectedDiseaseCodes();
        this.isCovid19VaccineProphylaxis = (code) => isCovid19VaccineProphylaxis(code);
        this.isCovid19Disease = (code) => isCovid19Disease(code);
        this.isSuspectedDisease = (code) => isSuspectedDisease(code);
        this.isCovid19OrSuspectedDisease = (code) => isCovid19OrSuspectedDisease(code);
        /** Get COVID-19 specific resoruces */
        this.getCovid19DiagnosticReportsInDocument = (bundleDocument) => getCovid19DiagnosticReportsInDocument(bundleDocument);
        this.getCovid19ImmunizationsInDocument = (bundleDocument) => getCovid19ImmunizationsInDocument(bundleDocument);
    }
    isCovid19Bundle(bundleDocument) {
        return (Bundle_1.getTagsInBundleResource(bundleDocument).includes(exports.covid19Tag));
    }
    /** It checks both Bundle resource and any other type of resource */
    isCovid19Resource(resource) {
        if (resource && resource.resourceType) {
            if (resource.resourceType == "Bundle") {
                return (Bundle_1.getTagsInBundleResource(resource).includes(exports.covid19Tag));
            }
            else
                return Bundle_1.isCovid19SoleResource(resource);
        }
        return false;
    }
}
exports.Covid19 = Covid19;
// identifier should be the same as the UHC Message ID, concepts in english by default
function createCovid19DiseaseAlertCommunication(priorityCode) {
    return Communication_1.createCommunication("completed", "alert", uuidUtils.getValidOrNewRandomUUID(), Snomed_1.covid19DiseaseTerminologySNOMED.covid19Disease, priorityCode);
}
exports.createCovid19DiseaseAlertCommunication = createCovid19DiseaseAlertCommunication;
function createCovid19SuspectedAlertCommunication(priorityCode) {
    return Communication_1.createCommunication("completed", "alert", uuidUtils.getValidOrNewRandomUUID(), Snomed_1.covid19DiseaseTerminologySNOMED.suspectedCovid19, priorityCode);
}
exports.createCovid19SuspectedAlertCommunication = createCovid19SuspectedAlertCommunication;
function createCovid19ExposureAlertCommunication(priorityCode) {
    return Communication_1.createCommunication("completed", "alert", uuidUtils.getValidOrNewRandomUUID(), Snomed_1.covid19DiseaseTerminologySNOMED.exposureToCovid19, priorityCode);
}
exports.createCovid19ExposureAlertCommunication = createCovid19ExposureAlertCommunication;
function isCovid19DiseaseAlertCommunication(communication) {
    if (!communication.category)
        return false;
    let categoryCodes = CodeableConcept_1.getCodeListInArrayOfCodeableConcepts(communication.category);
    if (!categoryCodes.includes("alert"))
        return false;
    let reasonCodes = CodeableConcept_1.getCodeListInArrayOfCodeableConcepts(communication.reasonCode);
    if (!reasonCodes.includes(Snomed_1.covid19DiseaseTerminologySNOMED.covid19Disease))
        return false;
    return true; // both "alert" and "covid19Disease" are present
}
exports.isCovid19DiseaseAlertCommunication = isCovid19DiseaseAlertCommunication;
function isCovid19SuspectedAlertCommunication(communication) {
    if (!communication.category)
        return false;
    let categoryCodes = CodeableConcept_1.getCodeListInArrayOfCodeableConcepts(communication.category);
    if (!categoryCodes.includes("alert"))
        return false;
    let reasonCodes = CodeableConcept_1.getCodeListInArrayOfCodeableConcepts(communication.reasonCode);
    if (!reasonCodes.includes(Snomed_1.covid19DiseaseTerminologySNOMED.suspectedCovid19))
        return false;
    return true; // both "alert" and "suspectedCovid19" are present
}
exports.isCovid19SuspectedAlertCommunication = isCovid19SuspectedAlertCommunication;
function isCovid19ExposureAlertCommunication(communication) {
    if (!communication.category)
        return false;
    let categoryCodes = CodeableConcept_1.getCodeListInArrayOfCodeableConcepts(communication.category);
    if (!categoryCodes.includes("alert"))
        return false;
    let reasonCodes = CodeableConcept_1.getCodeListInArrayOfCodeableConcepts(communication.reasonCode);
    if (!reasonCodes.includes(Snomed_1.covid19DiseaseTerminologySNOMED.exposureToCovid19))
        return false;
    return true; // both "alert" and "exposureToCovid19" are present
}
exports.isCovid19ExposureAlertCommunication = isCovid19ExposureAlertCommunication;
/** Get specific codes by HL7 */
const vaccineProphylaxisCodesCVX = () => Hl7_1.GlobalIndexFHIR.groupedCodes.cvxCovid19.codes;
/** Get LOINC laboratory test group code: serology or naat group code */
const naatTestsGroupCodeLOINC = () => Loinc_1.covid19LaboratoryTestGroups.naatTestsGroup;
const serologyTestsGroupCodeLOINC = () => Loinc_1.covid19LaboratoryTestGroups.serologyTestsGroup;
/** Get all or specific LOINC laboratory tests */
const laboratoryTestsCodesLOINC = () => Loinc_1.GlobalIndexLOINC.groupedCodes.laboratoryTestCovid19.codes;
/** Get specific codes by system SNOMED */
const naatResultsCodesSNOMED = () => [
    Snomed_1.resultCovid19NaatCodesSNOMED.detected, Snomed_1.resultCovid19NaatCodesSNOMED.notDetected
];
const serologyResultsCodesSNOMED = () => [
    Snomed_1.resultCovid19SerologyCodesSNOMED.positive, Snomed_1.resultCovid19SerologyCodesSNOMED.negative
];
const vaccinationProcedureCodesInternationalSNOMED = () => Snomed_1.getVaccinationProcedureCovid19CodesSNOMED("INTERNATIONAL");
const vaccinationProcedureCodesSpainSNOMED = () => Snomed_1.getVaccinationProcedureCovid19CodesSNOMED("ES");
const confirmedDiseaseSNOMED = () => Snomed_1.covid19DiseaseTerminologySNOMED.covid19Disease;
const suspectedDiseaseSNOMED = () => Snomed_1.covid19DiseaseTerminologySNOMED.suspectedCovid19;
const exposureToDiseaseSNOMED = () => Snomed_1.covid19DiseaseTerminologySNOMED.exposureToCovid19;
/** Get specific codes by system ICD10 and ICD11 */
const confirmedDiseaseICD10 = () => Icd_1.covid19DiseaseTermsICD10.covid19Disease;
const suspectedDiseaseICD10 = () => Icd_1.covid19DiseaseTermsICD10.suspectedCovid19;
const confirmedDiseaseICD11 = () => Icd_1.covid19DiseaseTermsICD11.covid19Disease;
const suspectedDiseaseICD11 = () => Icd_1.covid19DiseaseTermsICD11.suspectedCovid19;
/** Merge codes from distinct systems (if several ones, e.g. for searching) */
const covid19VaccineProphylaxisCodesGlobal = () => [
    ...vaccineProphylaxisCodesCVX(), ...exports.covid19VaccineProphylaxisCodesEMA()
];
exports.covid19VaccineProphylaxisCodesGlobal = covid19VaccineProphylaxisCodesGlobal;
const covid19VaccineProphylaxisCodesEMA = () => [
    exports.vaccineProphylaxisCodeATC, ...Snomed_1.covid19VaccineProphylaxisCodesSNOMED()
];
exports.covid19VaccineProphylaxisCodesEMA = covid19VaccineProphylaxisCodesEMA;
const isCovid19VaccineProphylaxis = (code) => exports.covid19VaccineProphylaxisCodesGlobal().includes(code) ? true : false;
const vaccinationProcedureCodes = () => [...Snomed_1.getVaccinationProcedureCovid19CodesSNOMED("GLOBAL")];
exports.vaccinationProcedureCodes = vaccinationProcedureCodes;
const diseaseCodes = () => [confirmedDiseaseSNOMED(), confirmedDiseaseICD10(), confirmedDiseaseICD11()];
exports.diseaseCodes = diseaseCodes;
const isCovid19Disease = (code) => exports.diseaseCodes().includes(code) ? true : false;
const suspectedDiseaseCodes = () => [suspectedDiseaseSNOMED(), suspectedDiseaseICD10(), suspectedDiseaseICD11()];
exports.suspectedDiseaseCodes = suspectedDiseaseCodes;
const isSuspectedDisease = (code) => exports.suspectedDiseaseCodes().includes(code) ? true : false;
const diseaseOrSuspectedDiseaseCodes = () => [...exports.diseaseCodes(), ...exports.suspectedDiseaseCodes()];
exports.diseaseOrSuspectedDiseaseCodes = diseaseOrSuspectedDiseaseCodes;
const isCovid19OrSuspectedDisease = (code) => exports.diseaseOrSuspectedDiseaseCodes().includes(code) ? true : false;
const covid19LaboratoryTestsCodes = () => Loinc_1.GlobalIndexLOINC.groupedCodes.laboratoryTestCovid19.codes;
exports.covid19LaboratoryTestsCodes = covid19LaboratoryTestsCodes;
const covid19LaboratoryTestsAndGroupsCodes = () => [
    Loinc_1.covid19LaboratoryTestGroups.serologyTestsGroup,
    Loinc_1.covid19LaboratoryTestGroups.naatTestsGroup,
    ...Loinc_1.GlobalIndexLOINC.groupedCodes.laboratoryTestCovid19.codes
];
exports.covid19LaboratoryTestsAndGroupsCodes = covid19LaboratoryTestsAndGroupsCodes;
// it checks and gets only the first code into DiagnosticReport.code.coding[0].code if it matchs
function getCovid19DiagnosticReportsInDocument(bundleDoc) {
    let diagnosticReports = Bundle_1.getResourcesByTypes(bundleDoc, ["DiagnosticReport"]);
    // console.log("diagnosticReports found = ", diagnosticReports)
    const covid19Codes = exports.covid19LaboratoryTestsAndGroupsCodes(); // full COVID-10 laboratory test codes (currently only LOINC codes)
    // console.log("covid19LaboratoryTestsAndGroupsCodes = ", covid19Codes)
    let covid19DiagnosticReports = [];
    diagnosticReports.forEach(function (item) {
        let diagnosticCodes = CodeableConcept_1.getCodeListInCodeableConcept(item.code);
        if (diagnosticCodes && diagnosticCodes.length && diagnosticCodes.length > 0) {
            // only one code is expected
            if (covid19Codes.includes(diagnosticCodes[0]))
                covid19DiagnosticReports.push(item);
        }
    });
    return covid19DiagnosticReports;
}
exports.getCovid19DiagnosticReportsInDocument = getCovid19DiagnosticReportsInDocument;
// it checks and gets only the first code into DiagnosticReport.code.coding[0].code if it matchs
function getCovid19ImmunizationsInDocument(bundleDoc) {
    let immunizations = Bundle_1.getResourcesByTypes(bundleDoc, ["Immunization"]);
    const covid19Codes = exports.covid19VaccineProphylaxisCodesGlobal(); // full COVID-10 vaccine codes: ATC and SNOMED codes
    // console.log("FullCovid19VaccineCodes = ", covid19Codes)
    let covid19Immunizations = [];
    immunizations.forEach(function (item) {
        let vaccineCodes = CodeableConcept_1.getCodeListInCodeableConcept(item.vaccineCode);
        if (vaccineCodes && vaccineCodes.length && vaccineCodes.length > 0) {
            // only one code is expected
            if (covid19Codes.includes(vaccineCodes[0]))
                covid19Immunizations.push(item);
        }
    });
    return covid19Immunizations;
}
exports.getCovid19ImmunizationsInDocument = getCovid19ImmunizationsInDocument;
