
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { GlobalIndexLOINC, getFullSerologyTestCovid19LOINC, getFullNaatTestCovid19LOINC, covidLaboratoryTestGroups } from "./Loinc"
import { covid19DiseaseTermsSNOMED, getVaccinationProcedureCovid19CodesSNOMED, positiveOrDetectedCodesSNOMED,
    negativeOrNotDetectedCodesSNOMED, suspectedOrInconclusiveCodesSNOMED, probablyNotPresentCodesSNOMED } from "./Snomed"
import { GlobalIndexHL7 } from "./Hl7"
import { covid19DiseaseTermsICD10, covid19DiseaseTermsICD11 } from "./Icd"

export class Covid19{
    
    constructor(){
    }

    covid19Tag = ():string => "COVID-19"

    /** Get specific codes by HL7 */
    vaccineCodesCVX = ():string[] => GlobalIndexHL7.groupedCodes.cvxCovid19.codes

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

    positiveOrDetectedCodesSNOMED = ():string[] => positiveOrDetectedCodesSNOMED()
    negativeOrNotDetectedCodesSNOMED = ():string[] => negativeOrNotDetectedCodesSNOMED()
    suspectedOrInconclusiveCodesSNOMED = ():string[] => suspectedOrInconclusiveCodesSNOMED()
    probablyNotPresentCodesSNOMED = ():string[] => probablyNotPresentCodesSNOMED()
    
    vaccinationProcedureCodesInternationalSNOMED = ():string[] => getVaccinationProcedureCovid19CodesSNOMED("INTERNATIONAL")
    vaccinationProcedureCodesSpainSNOMED = ():string[] => getVaccinationProcedureCovid19CodesSNOMED("ES")
    confirmedDiseaseSNOMED = ():string => covid19DiseaseTermsSNOMED.covid19Disease
    suspectedDiseaseSNOMED = ():string => covid19DiseaseTermsSNOMED.suspectedCovid19
    exposureToDiseaseSNOMED = ():string => covid19DiseaseTermsSNOMED.exposureToCovid19

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
