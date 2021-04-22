import { R4 } from "@ahryman40k/ts-fhir-types";
export declare const covid19Tag = "COVID-19";
export declare const vaccineCodeATC = "J07BX03";
export declare class Covid19 {
    constructor();
    covid19Tag: () => string;
    /** Alert Communications */
    createCovid19DiseaseAlertCommunication: (priorityCode?: string | undefined) => R4.ICommunication;
    createCovid19SuspectedAlertCommunication: (priorityCode?: string | undefined) => R4.ICommunication;
    createCovid19ExposureAlertCommunication: (priorityCode?: string | undefined) => R4.ICommunication;
    isCovid19DiseaseAlertCommunication: (communication: R4.ICommunication) => boolean;
    isCovid19SuspectedAlertCommunication: (communication: R4.ICommunication) => boolean;
    isCovid19ExposureAlertCommunication: (communication: R4.ICommunication) => boolean;
    /** Get specific codes by HL7 */
    vaccineCodesCVX: () => string[];
    /** Get specific codes by system WHO's ATC */
    vaccineCodeATC: () => string;
    /** Get LOINC laboratory test group code: serology or naat group code */
    naatTestsGroupCodeLOINC: () => string;
    serologyTestsGroupCodeLOINC: () => string;
    /** Get all or specific LOINC laboratory tests */
    laboratoryTestsCodesLOINC: () => string[];
    activeLaboratoryTestsLOINC: () => string[];
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
    laboratoryTestAndGroupsCodes: () => string[];
    /** Get COVID-19 specific resoruces */
    getCovid19DiagnosticReportsInDocument: (bundleDocument: R4.IBundle) => R4.IDiagnosticReport[];
    getCovid19ImmunizationsInDocument: (bundleDocument: R4.IBundle) => R4.IImmunization[];
}
export declare function createCovid19DiseaseAlertCommunication(priorityCode?: string): R4.ICommunication;
export declare function createCovid19SuspectedAlertCommunication(priorityCode?: string): R4.ICommunication;
export declare function createCovid19ExposureAlertCommunication(priorityCode?: string): R4.ICommunication;
export declare function isCovid19DiseaseAlertCommunication(communication: R4.ICommunication): boolean;
export declare function isCovid19SuspectedAlertCommunication(communication: R4.ICommunication): boolean;
export declare function isCovid19ExposureAlertCommunication(communication: R4.ICommunication): boolean;
/** Merge codes from distinct systems (if several ones, e.g. for searching) */
export declare const vaccineCodes: () => string[];
export declare const vaccinationProcedureCodes: () => string[];
export declare const diseaseCodes: () => string[];
export declare const suspectedDiseaseCodes: () => string[];
export declare const diseaseOrSuspectedDiseaseCodes: () => string[];
export declare const laboratoryTestCodes: () => string[];
export declare const laboratoryTestAndGroupsCodes: () => string[];
export declare function getCovid19DiagnosticReportsInDocument(bundleDoc: R4.IBundle): R4.IDiagnosticReport[];
export declare function getCovid19ImmunizationsInDocument(bundleDoc: R4.IBundle): R4.IImmunization[];
