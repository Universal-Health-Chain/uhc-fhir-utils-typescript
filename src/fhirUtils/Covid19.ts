
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { GlobalIndexLOINC, getFullSerologyTestCovid19LOINC, getFullNaatTestCovid19LOINC, covidLaboratoryTestGroups } from "./Loinc"
import { covid19DiseaseTerminologySNOMED, getVaccinationProcedureCovid19CodesSNOMED, positiveOrDetectedCodesSNOMED,
    negativeOrNotDetectedCodesSNOMED, suspectedOrInconclusiveCodesSNOMED, probablyNotPresentCodesSNOMED, resultCovid19NaatCodesSNOMED, resultCovid19SerologyCodesSNOMED } from "./Snomed"
import { GlobalIndexFHIR } from "./Hl7"
import { covid19DiseaseTermsICD10, covid19DiseaseTermsICD11 } from "./Icd"
import { createCommunication } from "./Communication"
import { R4 } from "@ahryman40k/ts-fhir-types"
import { getValidOrNewRandomUUID } from "./commonUtils"
import { getCodeListInArrayOfCodeableConcepts } from "./CodeableConcept"
export class Covid19{
    
    constructor(){
    }

    covid19Tag = ():string => "COVID-19"

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

    /** Get specific codes by HL7 */
    vaccineCodesCVX = ():string[] => GlobalIndexFHIR.groupedCodes.cvxCovid19.codes

    /** Get specific codes by system WHO's ATC */
    vaccineCodeATC = ():string => "J07BX03"
    
    /** Get LOINC laboratory test group code: serology or naat group code */
    naatTestsGroupCodeLOINC = ():string => covidLaboratoryTestGroups.naatTestsGroup
    serologyTestsGroupCodeLOINC = ():string => covidLaboratoryTestGroups.serologyTestsGroup

    /** Get all or specific LOINC laboratory tests */
    laboratoryTestsCodesLOINC = ():string[] => GlobalIndexLOINC.groupedCodes.laboratoryTestCovid19.codes
    naatTestsCodesLOINC = ():string[] => getFullNaatTestCovid19LOINC()
    serologyTestsCodesLOINC = ():string[] => getFullSerologyTestCovid19LOINC()

    /** Get specific codes by system SNOMED */
    naatResultsCodesSNOMED = ():string[] => [
        resultCovid19NaatCodesSNOMED.detected, resultCovid19NaatCodesSNOMED.notDetected
    ]
    serologyResultsCodesSNOMED = ():string[] => [
        resultCovid19SerologyCodesSNOMED.positive, resultCovid19SerologyCodesSNOMED.negative
    ]

    positiveOrDetectedCodesSNOMED = ():string[] => positiveOrDetectedCodesSNOMED()
    negativeOrNotDetectedCodesSNOMED = ():string[] => negativeOrNotDetectedCodesSNOMED()
    suspectedOrInconclusiveCodesSNOMED = ():string[] => suspectedOrInconclusiveCodesSNOMED()
    probablyNotPresentCodesSNOMED = ():string[] => probablyNotPresentCodesSNOMED()
    
    vaccinationProcedureCodesInternationalSNOMED = ():string[] => getVaccinationProcedureCovid19CodesSNOMED("INTERNATIONAL")
    vaccinationProcedureCodesSpainSNOMED = ():string[] => getVaccinationProcedureCovid19CodesSNOMED("ES")
    confirmedDiseaseSNOMED = ():string => covid19DiseaseTerminologySNOMED.covid19Disease
    suspectedDiseaseSNOMED = ():string => covid19DiseaseTerminologySNOMED.suspectedCovid19
    exposureToDiseaseSNOMED = ():string => covid19DiseaseTerminologySNOMED.exposureToCovid19

    /** Get specific codes by system ICD10 and ICD11 */
    confirmedDiseaseICD10 = ():string => covid19DiseaseTermsICD10.covid19Disease
    suspectedDiseaseICD10 = ():string => covid19DiseaseTermsICD10.suspectedCovid19
    confirmedDiseaseICD11 = ():string => covid19DiseaseTermsICD11.covid19Disease
    suspectedDiseaseICD11 = ():string => covid19DiseaseTermsICD11.suspectedCovid19

    /** Merge codes from distinct systems (if several ones, e.g. for searching) */
    vaccineCodes = ():string[] =>  [...this.vaccineCodesCVX(), this.vaccineCodeATC()]
    isCovid19Vaccine = (code:string):boolean => this.vaccineCodes().includes(code) ? true : false
    
    vaccinationProcedureCodes = ():string[] => [
        ...getVaccinationProcedureCovid19CodesSNOMED("GLOBAL")
    ]

    diseaseCodes = ():string[] => [
        this.confirmedDiseaseSNOMED(),
        this.confirmedDiseaseICD10(),
        this.confirmedDiseaseICD11(),
    ]
    isCovid19Disease= (code:string):boolean => this.diseaseCodes().includes(code) ? true : false
    
    suspectedDiseaseCodes = ():string[] => [
        this.suspectedDiseaseSNOMED(),
        this.suspectedDiseaseICD10(),
        this.suspectedDiseaseICD11()
    ]
    isSuspectedDisease = (code:string):boolean => this.suspectedDiseaseCodes().includes(code) ? true : false
    
    diseaseOrSuspectedDiseaseCodes = ():string[] => [...this.diseaseCodes(), ...this.suspectedDiseaseCodes()]
    isCovid19OrSuspectedDisease = (code:string):boolean => this.diseaseOrSuspectedDiseaseCodes().includes(code) ? true : false
        
    laboratoryTestCodes = ():string[] => GlobalIndexLOINC.groupedCodes.laboratoryTestCovid19.codes
}

// identifier should be the same as the UHC Message ID, concepts in english by default
export function createCovid19DiseaseAlertCommunication(priorityCode?:string): R4.ICommunication{
    return createCommunication("completed", "alert", getValidOrNewRandomUUID(), covid19DiseaseTerminologySNOMED.covid19Disease, priorityCode)
}

export function createCovid19SuspectedAlertCommunication(priorityCode?:string): R4.ICommunication{
    return createCommunication("completed", "alert", getValidOrNewRandomUUID(), covid19DiseaseTerminologySNOMED.suspectedCovid19, priorityCode)
}

export function createCovid19ExposureAlertCommunication(priorityCode?:string): R4.ICommunication{
    return createCommunication("completed", "alert", getValidOrNewRandomUUID(), covid19DiseaseTerminologySNOMED.exposureToCovid19, priorityCode)
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
