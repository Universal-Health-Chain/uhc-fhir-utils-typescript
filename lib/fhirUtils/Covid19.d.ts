export declare class Covid19 {
    constructor();
    covid19Tag: () => string;
    /** Get specific codes by HL7 */
    vaccineCodesCVX: () => string[];
    /** Get specific codes by system WHO's ATC */
    vaccineCodeATC: () => string;
    /** Get specific codes by system LOINC */
    laboratoryTestCodesLOINC: () => string[];
    laboratoryTestCodesSerologyLOINC: () => string[];
    laboratoryTestCodesNaatLOINC: () => string[];
    /** Get specific codes by system SNOMED */
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
