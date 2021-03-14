export declare class Covid19 {
    constructor();
    covid19Tag: () => string;
    /** Get specific codes by HL7 */
    vaccineCodesCVX: () => string[];
    /** Get specific codes by system WHO's ATC */
    vaccineCodeATC: () => string;
    /** Get LOINC laboratory test group code: serology or naat group code */
    naatTestsGroupCodeLOINC: () => string;
    serologyTestsGroupCodeLOINC: () => string;
    /** Get all or specific LOINC laboratory tests */
    laboratoryTestsCodesLOINC: () => string[];
    naatTestsCodesLOINC: () => string[];
    serologyTestsCodesLOINC: () => string[];
    /** Get specific codes by system SNOMED */
    naatResultsCodesSNOMED: () => string[];
    serologyResultsCodesSNOMED: () => string[];
    positiveOrDetectedCodesSNOMED: () => string[];
    negativeOrNotDetectedCodesSNOMED: () => string[];
    suspectedOrInconclusiveCodesSNOMED: () => string[];
    probablyNotPresentCodesSNOMED: () => string[];
    vaccinationProcedureCodesInternationalSNOMED: () => string[];
    vaccinationProcedureCodesSpainSNOMED: () => string[];
    confirmedDiseaseSNOMED: () => string;
    suspectedDiseaseSNOMED: () => string;
    exposureToDiseaseSNOMED: () => string;
    /** Get specific codes by system ICD10 and ICD11 */
    confirmedDiseaseICD10: () => string;
    suspectedDiseaseICD10: () => string;
    confirmedDiseaseICD11: () => string;
    suspectedDiseaseICD11: () => string;
    /** Merge codes from distinct systems (if several ones, e.g. for searching) */
    vaccineCodes: () => string[];
    isCovid19Vaccine: (code: string) => boolean;
    vaccinationProcedureCodes: () => string[];
    diseaseCodes: () => string[];
    isCovid19Disease: (code: string) => boolean;
    suspectedDiseaseCodes: () => string[];
    isSuspectedDisease: (code: string) => boolean;
    diseaseOrSuspectedDiseaseCodes: () => string[];
    isCovid19OrSuspectedDisease: (code: string) => boolean;
    laboratoryTestCodes: () => string[];
}
