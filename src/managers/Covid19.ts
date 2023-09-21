/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { GlobalIndexLOINC, getFullSerologyTestCovid19LOINC, getFullNaatTestCovid19LOINC, covid19LaboratoryTestGroups, 
    getActiveLaboratoryTestsCovid19, getCovid19HealthCertificateLaboratoryTests } from "./Loinc"
import { covid19DiseaseTerminologySNOMED, getVaccinationProcedureCovid19CodesSNOMED, positiveOrDetectedCodesSNOMED,
    negativeOrNotDetectedCodesSNOMED, suspectedOrInconclusiveCodesSNOMED, probablyNotPresentCodesSNOMED,
    resultCovid19NaatCodesSNOMED, resultCovid19SerologyCodesSNOMED, covid19VaccineProphylaxisCodesSNOMED,
    covid19LaboratoryOriginSamples } from "./Snomed"
import { GlobalIndexFHIR } from "./Hl7"
import { covid19DiseaseTermsICD10, covid19DiseaseTermsICD11 } from "./Icd"
import { createCommunication } from "./Communication"
import { R4 } from "@ahryman40k/ts-fhir-types"
// import { getValidOrNewRandomUUID } from "./commonUtils"
import { getCodeListInArrayOfCodeableConcepts, getCodeListInCodeableConcept } from "./CodeableConcept"
import { getResourcesByTypesWithOptionalMetadata } from "./Bundle"
import { Uuid } from "@universal-health-chain/uhc-common-utils-typescript"
import { getCovid19OfficialManufacturerCodesEMA, getCovid19TempManufacturerCodesEMA } from "./Ema"

const uuidUtils = new Uuid() 

export const covid19Tag = "COVID-19"
export const vaccineProphylaxisCodeATC = "J07BX03"


// TODO: add test for the new added functions 
export class Covid19 {
    
    constructor(){
    }

    covid19Tag = ():string => covid19Tag // "COVID-19"


    /** Alert Communications */
    
    createCovid19DiseaseAlertCommunication = (priorityCode?:string): R4.ICommunication =>
        createCovid19DiseaseAlertCommunication(priorityCode)

    createCovid19SuspectedAlertCommunication = (priorityCode?:string): R4.ICommunication =>
        createCovid19SuspectedAlertCommunication(priorityCode)

    createCovid19ExposureAlertCommunication = (priorityCode?:string): R4.ICommunication =>
        createCovid19ExposureAlertCommunication(priorityCode)

    isCovid19DiseaseAlertCommunication = (communication:R4.ICommunication): boolean =>
        isCovid19DiseaseAlertCommunication(communication)

    isCovid19SuspectedAlertCommunication = (communication:R4.ICommunication): boolean =>
        isCovid19SuspectedAlertCommunication(communication)

    isCovid19ExposureAlertCommunication = (communication:R4.ICommunication): boolean =>
        isCovid19ExposureAlertCommunication(communication)

    /** Get specific codes by CVX coding system */
    vaccineProphylaxisCodesCVX = ():string[] => vaccineProphylaxisCodesCVX()

    /** Get specific codes by WHO's ATC coding system*/
    vaccineProphylaxisCodeATC = ():string => vaccineProphylaxisCodeATC

    /** Get specific vaccine prophylaxis codes (no vaccine product codes) by SNOMED coding system */
    vaccineProphylaxisCodesSNOMED = ():string[] => covid19VaccineProphylaxisCodesSNOMED()
    
    /** Get LOINC laboratory test group code: serology or naat group code */
    naatTestsGroupCodeLOINC = ():string => naatTestsGroupCodeLOINC()
    serologyTestsGroupCodeLOINC = ():string => serologyTestsGroupCodeLOINC()
    healthCertificateLaboratoryTests = ():string [] => getCovid19HealthCertificateLaboratoryTests()

    /** Get all or specific LOINC laboratory tests */
    laboratoryTestsCodesLOINC = ():string[] => laboratoryTestsCodesLOINC()
    activeLaboratoryTestsLOINC = ():string [] => getActiveLaboratoryTestsCovid19()
    naatTestsCodesLOINC = ():string[] => getFullNaatTestCovid19LOINC()
    serologyTestsCodesLOINC = ():string[] => getFullSerologyTestCovid19LOINC()

    /** Get specific codes by system SNOMED */
    laboratoryOriginSampleCodesSNOMED = ():string[] => covid19LaboratoryOriginSamples()
    naatResultsCodesSNOMED = ():string[] => naatResultsCodesSNOMED()
    serologyResultsCodesSNOMED = ():string[] => serologyResultsCodesSNOMED()
    positiveOrDetectedCodesSNOMED = ():string[] => positiveOrDetectedCodesSNOMED()
    negativeOrNotDetectedCodesSNOMED = ():string[] => negativeOrNotDetectedCodesSNOMED()
    suspectedOrInconclusiveCodesSNOMED = ():string[] => suspectedOrInconclusiveCodesSNOMED()
    probablyNotPresentCodesSNOMED = ():string[] => probablyNotPresentCodesSNOMED()
    vaccinationProcedureCodesInternationalSNOMED = ():string[] => vaccinationProcedureCodesInternationalSNOMED()
    vaccinationProcedureCodesSpainSNOMED = ():string[] => vaccinationProcedureCodesSpainSNOMED()
    confirmedDiseaseSNOMED = ():string => confirmedDiseaseSNOMED()
    suspectedDiseaseSNOMED = ():string => suspectedDiseaseSNOMED()
    exposureToDiseaseSNOMED = ():string => exposureToDiseaseSNOMED()

    /** Get specific codes by system ICD10 and ICD11 */
    confirmedDiseaseICD10 = ():string => confirmedDiseaseICD10()
    suspectedDiseaseICD10 = ():string => suspectedDiseaseICD10()
    confirmedDiseaseICD11 = ():string => confirmedDiseaseICD11()
    suspectedDiseaseICD11 = ():string => suspectedDiseaseICD11()

    /** Manufacturers by system */
    getCovid19OfficialManufacturerCodesEMA = ():string[] => getCovid19OfficialManufacturerCodesEMA()
    // for clinical trials
    getCovid19TempManufacturerCodesEMA = ():string[] => getCovid19TempManufacturerCodesEMA()
 
    /** Merge codes from distinct systems (if several ones, e.g. for searching) */
    vaccineProphylaxisCodesGlobal = ():string[] =>  covid19VaccineProphylaxisCodesGlobal()
    vaccineProphylaxisCodesEMA = ():string[] => covid19VaccineProphylaxisCodesEMA()
    laboratoryTestCodes = ():string[] => covid19LaboratoryTestsCodes()
    laboratoryTestAndGroupsCodes = ():string[] => covid19LaboratoryTestsAndGroupsCodes()
   
    vaccinationProcedureCodes = ():string[] => vaccinationProcedureCodes()
    diseaseCodes = ():string[] => diseaseCodes()
    diseaseOrSuspectedDiseaseCodes = ():string[] => diseaseOrSuspectedDiseaseCodes()
    suspectedDiseaseCodes = ():string[] => suspectedDiseaseCodes()

    isCovid19VaccineProphylaxis = (code:string):boolean => isCovid19VaccineProphylaxis(code)
    isCovid19Disease= (code:string):boolean => isCovid19Disease(code)
    isSuspectedDisease = (code:string):boolean => isSuspectedDisease(code)
    isCovid19OrSuspectedDisease = (code:string):boolean => isCovid19OrSuspectedDisease(code)
 
    /** Get COVID-19 specific resoruces */
    getCovid19DiagnosticReportsInDocument = (bundleDocument:R4.IBundle): R4.IDiagnosticReport[] => getCovid19DiagnosticReportsInDocument(bundleDocument)
    getCovid19ImmunizationsInDocument = (bundleDocument: R4.IBundle): R4.IImmunization[] => getCovid19ImmunizationsInDocument(bundleDocument)
}

// identifier should be the same as the UHC Message ID, concepts in english by default
export function createCovid19DiseaseAlertCommunication(priorityCode?:string): R4.ICommunication{
    return createCommunication("completed", "alert", uuidUtils.getValidOrNewRandomUUID(), covid19DiseaseTerminologySNOMED.covid19Disease, priorityCode)
}

export function createCovid19SuspectedAlertCommunication(priorityCode?:string): R4.ICommunication{
    return createCommunication("completed", "alert", uuidUtils.getValidOrNewRandomUUID(), covid19DiseaseTerminologySNOMED.suspectedCovid19, priorityCode)
}

export function createCovid19ExposureAlertCommunication(priorityCode?:string): R4.ICommunication{
    return createCommunication("completed", "alert", uuidUtils.getValidOrNewRandomUUID(), covid19DiseaseTerminologySNOMED.exposureToCovid19, priorityCode)
}

export function isCovid19DiseaseAlertCommunication(communication:R4.ICommunication): boolean {
    if (!communication.category) return false

    let categoryCodes:string[] = getCodeListInArrayOfCodeableConcepts(communication.category)
    if (!categoryCodes.includes("alert")) return false

    let reasonCodes:string[] = getCodeListInArrayOfCodeableConcepts(communication.reasonCode)  
    if (!reasonCodes.includes(covid19DiseaseTerminologySNOMED.covid19Disease)) return false

    return true // both "alert" and "covid19Disease" are present
}

export function isCovid19SuspectedAlertCommunication(communication:R4.ICommunication): boolean {
    if (!communication.category) return false

    let categoryCodes:string[] = getCodeListInArrayOfCodeableConcepts(communication.category)
    if (!categoryCodes.includes("alert")) return false

    let reasonCodes:string[] = getCodeListInArrayOfCodeableConcepts(communication.reasonCode)  
    if (!reasonCodes.includes(covid19DiseaseTerminologySNOMED.suspectedCovid19)) return false

    return true // both "alert" and "suspectedCovid19" are present
}

export function isCovid19ExposureAlertCommunication(communication:R4.ICommunication): boolean {
    if (!communication.category) return false

    let categoryCodes:string[] = getCodeListInArrayOfCodeableConcepts(communication.category)
    if (!categoryCodes.includes("alert")) return false

    let reasonCodes:string[] = getCodeListInArrayOfCodeableConcepts(communication.reasonCode)  
    if (!reasonCodes.includes(covid19DiseaseTerminologySNOMED.exposureToCovid19)) return false

    return true // both "alert" and "exposureToCovid19" are present
}

/** Get specific codes by HL7 */
const vaccineProphylaxisCodesCVX = ():string[] => GlobalIndexFHIR.groupedCodes.cvxCovid19.codes

/** Get LOINC laboratory test group code: serology or naat group code */
const naatTestsGroupCodeLOINC = ():string => covid19LaboratoryTestGroups.naatTestsGroup
const serologyTestsGroupCodeLOINC = ():string => covid19LaboratoryTestGroups.serologyTestsGroup

/** Get all or specific LOINC laboratory tests */
const laboratoryTestsCodesLOINC = ():string[] => GlobalIndexLOINC.groupedCodes.laboratoryTestCovid19.codes

/** Get specific codes by system SNOMED */
const naatResultsCodesSNOMED = ():string[] => [
    resultCovid19NaatCodesSNOMED.detected, resultCovid19NaatCodesSNOMED.notDetected
]
const serologyResultsCodesSNOMED = ():string[] => [
    resultCovid19SerologyCodesSNOMED.positive, resultCovid19SerologyCodesSNOMED.negative
]
const vaccinationProcedureCodesInternationalSNOMED = ():string[] => getVaccinationProcedureCovid19CodesSNOMED("INTERNATIONAL")
const vaccinationProcedureCodesSpainSNOMED = ():string[] => getVaccinationProcedureCovid19CodesSNOMED("ES")
const confirmedDiseaseSNOMED = ():string => covid19DiseaseTerminologySNOMED.covid19Disease
const suspectedDiseaseSNOMED = ():string => covid19DiseaseTerminologySNOMED.suspectedCovid19
const exposureToDiseaseSNOMED = ():string => covid19DiseaseTerminologySNOMED.exposureToCovid19

/** Get specific codes by system ICD10 and ICD11 */
const confirmedDiseaseICD10 = ():string => covid19DiseaseTermsICD10.covid19Disease
const suspectedDiseaseICD10 = ():string => covid19DiseaseTermsICD10.suspectedCovid19
const confirmedDiseaseICD11 = ():string => covid19DiseaseTermsICD11.covid19Disease
const suspectedDiseaseICD11 = ():string => covid19DiseaseTermsICD11.suspectedCovid19


/** Merge codes from distinct systems (if several ones, e.g. for searching) */
export const covid19VaccineProphylaxisCodesGlobal = ():string[] =>  [
    ...vaccineProphylaxisCodesCVX(), ...covid19VaccineProphylaxisCodesEMA()
]
export const covid19VaccineProphylaxisCodesEMA = ():string[] =>  [
    vaccineProphylaxisCodeATC, ...covid19VaccineProphylaxisCodesSNOMED()
]

const isCovid19VaccineProphylaxis = (code:string):boolean => covid19VaccineProphylaxisCodesGlobal().includes(code) ? true : false
export const vaccinationProcedureCodes = ():string[] => [...getVaccinationProcedureCovid19CodesSNOMED("GLOBAL")]
export const diseaseCodes = ():string[] => [confirmedDiseaseSNOMED(),confirmedDiseaseICD10(), confirmedDiseaseICD11()]
const isCovid19Disease= (code:string):boolean => diseaseCodes().includes(code) ? true : false
export const suspectedDiseaseCodes = ():string[] => [suspectedDiseaseSNOMED(),suspectedDiseaseICD10(),suspectedDiseaseICD11()]
const isSuspectedDisease = (code:string):boolean => suspectedDiseaseCodes().includes(code) ? true : false
export const diseaseOrSuspectedDiseaseCodes = ():string[] => [...diseaseCodes(), ...suspectedDiseaseCodes()]
const isCovid19OrSuspectedDisease = (code:string):boolean => diseaseOrSuspectedDiseaseCodes().includes(code) ? true : false
export const covid19LaboratoryTestsCodes = ():string[] => GlobalIndexLOINC.groupedCodes.laboratoryTestCovid19.codes
export const covid19LaboratoryTestsAndGroupsCodes = ():string[] => [
    covid19LaboratoryTestGroups.serologyTestsGroup,
    covid19LaboratoryTestGroups.naatTestsGroup,
    ... GlobalIndexLOINC.groupedCodes.laboratoryTestCovid19.codes
]

// it checks and gets only the first code into DiagnosticReport.code.coding[0].code if it matchs
export function getCovid19DiagnosticReportsInDocument(bundleDoc: R4.IBundle): R4.IDiagnosticReport[] {
    let diagnosticReports: R4.IDiagnosticReport[] = getResourcesByTypesWithOptionalMetadata(bundleDoc, ["DiagnosticReport"])
    // console.log("diagnosticReports found = ", diagnosticReports)
    const covid19Codes: string[] = covid19LaboratoryTestsAndGroupsCodes()    // full COVID-10 laboratory test codes (currently only LOINC codes)
    // console.log("covid19LaboratoryTestsAndGroupsCodes = ", covid19Codes)

    let covid19DiagnosticReports: R4.IDiagnosticReport[] = []
    diagnosticReports.forEach(function (item: R4.IDiagnosticReport) {
        let diagnosticCodes = getCodeListInCodeableConcept(item.code)
        if (diagnosticCodes && diagnosticCodes.length && diagnosticCodes.length>0) {
            // only one code is expected
            if (covid19Codes.includes(diagnosticCodes[0])) covid19DiagnosticReports.push(item)
        }
    })

    return covid19DiagnosticReports
}

// it checks and gets only the first code into DiagnosticReport.code.coding[0].code if it matchs
export function getCovid19ImmunizationsInDocument(bundleDoc: R4.IBundle): R4.IImmunization[] {
    let immunizations: R4.IImmunization[] = getResourcesByTypesWithOptionalMetadata(bundleDoc, ["Immunization"])
    const covid19Codes: string[] = covid19VaccineProphylaxisCodesGlobal()   // full COVID-10 vaccine codes: ATC and SNOMED codes
    // console.log("FullCovid19VaccineCodes = ", covid19Codes)
    
    let covid19Immunizations: R4.IImmunization[] = []
    immunizations.forEach(function (item: R4.IImmunization) {
        let vaccineCodes = getCodeListInCodeableConcept(item.vaccineCode)
        if (vaccineCodes && vaccineCodes.length && vaccineCodes.length>0) {
            // only one code is expected
            if (covid19Codes.includes(vaccineCodes[0])) covid19Immunizations.push(item)
        }
    })

    return covid19Immunizations
}