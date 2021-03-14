/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { GlobalIndexLOINC, getFullSerologyTestCovid19LOINC, getFullNaatTestCovid19LOINC, covidLaboratoryTestGroups } from "./Loinc";
import { covid19DiseaseTermsSNOMED, getVaccinationProcedureCovid19CodesSNOMED, positiveOrDetectedCodesSNOMED, negativeOrNotDetectedCodesSNOMED, suspectedOrInconclusiveCodesSNOMED, probablyNotPresentCodesSNOMED, resultCovid19NaatCodesSNOMED, resultCovid19SerologyCodesSNOMED } from "./Snomed";
import { GlobalIndexHL7 } from "./Hl7";
import { covid19DiseaseTermsICD10, covid19DiseaseTermsICD11 } from "./Icd";
export class Covid19 {
    constructor() {
        this.covid19Tag = () => "COVID-19";
        /** Get specific codes by HL7 */
        this.vaccineCodesCVX = () => GlobalIndexHL7.groupedCodes.cvxCovid19.codes;
        /** Get specific codes by system WHO's ATC */
        this.vaccineCodeATC = () => "J07BX03";
        /** Get LOINC laboratory test group code: serology or naat group code */
        this.naatTestsGroupCodeLOINC = () => covidLaboratoryTestGroups.naatTestsGroup;
        this.serologyTestsGroupCodeLOINC = () => covidLaboratoryTestGroups.serologyTestsGroup;
        /** Get all or specific LOINC laboratory tests */
        this.laboratoryTestsCodesLOINC = () => GlobalIndexLOINC.groupedCodes.laboratoryTestCovid19.codes;
        this.naatTestsCodesLOINC = () => getFullNaatTestCovid19LOINC();
        this.serologyTestsCodesLOINC = () => getFullSerologyTestCovid19LOINC();
        /** Get specific codes by system SNOMED */
        this.naatResultsCodesSNOMED = () => [
            resultCovid19NaatCodesSNOMED.detected, resultCovid19NaatCodesSNOMED.notDetected
        ];
        this.serologyResultsCodesSNOMED = () => [
            resultCovid19SerologyCodesSNOMED.positive, resultCovid19SerologyCodesSNOMED.negative
        ];
        this.positiveOrDetectedCodesSNOMED = () => positiveOrDetectedCodesSNOMED();
        this.negativeOrNotDetectedCodesSNOMED = () => negativeOrNotDetectedCodesSNOMED();
        this.suspectedOrInconclusiveCodesSNOMED = () => suspectedOrInconclusiveCodesSNOMED();
        this.probablyNotPresentCodesSNOMED = () => probablyNotPresentCodesSNOMED();
        this.vaccinationProcedureCodesInternationalSNOMED = () => getVaccinationProcedureCovid19CodesSNOMED("INTERNATIONAL");
        this.vaccinationProcedureCodesSpainSNOMED = () => getVaccinationProcedureCovid19CodesSNOMED("ES");
        this.confirmedDiseaseSNOMED = () => covid19DiseaseTermsSNOMED.covid19Disease;
        this.suspectedDiseaseSNOMED = () => covid19DiseaseTermsSNOMED.suspectedCovid19;
        this.exposureToDiseaseSNOMED = () => covid19DiseaseTermsSNOMED.exposureToCovid19;
        /** Get specific codes by system ICD10 and ICD11 */
        this.confirmedDiseaseICD10 = () => covid19DiseaseTermsICD10.covid19Disease;
        this.suspectedDiseaseICD10 = () => covid19DiseaseTermsICD10.suspectedCovid19;
        this.confirmedDiseaseICD11 = () => covid19DiseaseTermsICD11.covid19Disease;
        this.suspectedDiseaseICD11 = () => covid19DiseaseTermsICD11.suspectedCovid19;
        /** Merge codes from distinct systems (if several ones, e.g. for searching) */
        this.vaccineCodes = () => [...this.vaccineCodesCVX(), this.vaccineCodeATC()];
        this.isCovid19Vaccine = (code) => this.vaccineCodes().includes(code) ? true : false;
        this.vaccinationProcedureCodes = () => [
            ...getVaccinationProcedureCovid19CodesSNOMED("GLOBAL")
        ];
        this.diseaseCodes = () => [
            this.confirmedDiseaseSNOMED(),
            this.confirmedDiseaseICD10(),
            this.confirmedDiseaseICD11(),
        ];
        this.isCovid19Disease = (code) => this.diseaseCodes().includes(code) ? true : false;
        this.suspectedDiseaseCodes = () => [
            this.suspectedDiseaseSNOMED(),
            this.suspectedDiseaseICD10(),
            this.suspectedDiseaseICD11()
        ];
        this.isSuspectedDisease = (code) => this.suspectedDiseaseCodes().includes(code) ? true : false;
        this.diseaseOrSuspectedDiseaseCodes = () => [...this.diseaseCodes(), ...this.suspectedDiseaseCodes()];
        this.isCovid19OrSuspectedDisease = (code) => this.diseaseOrSuspectedDiseaseCodes().includes(code) ? true : false;
        this.laboratoryTestCodes = () => GlobalIndexLOINC.groupedCodes.laboratoryTestCovid19.codes;
    }
}
