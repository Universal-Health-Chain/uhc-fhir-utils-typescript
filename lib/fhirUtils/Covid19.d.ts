import { R4 } from "@ahryman40k/ts-fhir-types";
export declare const covid19Tag = "COVID-19";
export declare const vaccineProphylaxisCodeATC = "J07BX03";
export declare class Covid19 {
    constructor();
    covid19Tag: () => string;
    isCovid19Bundle(bundleDocument: R4.IBundle): boolean;
    /** It checks both Bundle resource and any other type of resource */
    isCovid19Resource(resource: any | undefined): boolean;
    /** Alert Communications */
    createCovid19DiseaseAlertCommunication: (priorityCode?: string | undefined) => R4.ICommunication;
    createCovid19SuspectedAlertCommunication: (priorityCode?: string | undefined) => R4.ICommunication;
    createCovid19ExposureAlertCommunication: (priorityCode?: string | undefined) => R4.ICommunication;
    isCovid19DiseaseAlertCommunication: (communication: R4.ICommunication) => boolean;
    isCovid19SuspectedAlertCommunication: (communication: R4.ICommunication) => boolean;
    isCovid19ExposureAlertCommunication: (communication: R4.ICommunication) => boolean;
    /** Get specific codes by CVX coding system */
    vaccineProphylaxisCodesCVX: () => string[];
    /** Get specific codes by WHO's ATC coding system*/
    vaccineProphylaxisCodeATC: () => string;
    /** Get specific vaccine prophylaxis codes (no vaccine product codes) by SNOMED coding system */
    vaccineProphylaxisCodesSNOMED: () => string[];
    /** Get LOINC laboratory test group code: serology or naat group code */
    naatTestsGroupCodeLOINC: () => string;
    serologyTestsGroupCodeLOINC: () => string;
    /** Get all or specific LOINC laboratory tests */
    laboratoryTestsCodesLOINC: () => string[];
    activeLaboratoryTestsLOINC: () => string[];
    naatTestsCodesLOINC: () => string[];
    serologyTestsCodesLOINC: () => string[];
    /** Get specific codes by system SNOMED */
    laboratoryOriginSampleCodesSNOMED: () => string[];
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
    /** Manufacturers by system */
    getCovid19OfficialManufacturerCodesEMA: () => string[];
    getCovid19TempManufacturerCodesEMA: () => string[];
    /** Merge codes from distinct systems (if several ones, e.g. for searching) */
    vaccineProphylaxisCodesGlobal: () => string[];
    vaccineProphylaxisCodesEMA: () => string[];
    laboratoryTestCodes: () => string[];
    laboratoryTestAndGroupsCodes: () => string[];
    vaccinationProcedureCodes: () => string[];
    diseaseCodes: () => string[];
    diseaseOrSuspectedDiseaseCodes: () => string[];
    suspectedDiseaseCodes: () => string[];
    isCovid19VaccineProphylaxis: (code: string) => boolean;
    isCovid19Disease: (code: string) => boolean;
    isSuspectedDisease: (code: string) => boolean;
    isCovid19OrSuspectedDisease: (code: string) => boolean;
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
export declare const covid19VaccineProphylaxisCodesGlobal: () => string[];
export declare const covid19VaccineProphylaxisCodesEMA: () => string[];
export declare const vaccinationProcedureCodes: () => string[];
export declare const diseaseCodes: () => string[];
export declare const suspectedDiseaseCodes: () => string[];
export declare const diseaseOrSuspectedDiseaseCodes: () => string[];
export declare const covid19LaboratoryTestsCodes: () => string[];
export declare const covid19LaboratoryTestsAndGroupsCodes: () => string[];
export declare function getCovid19DiagnosticReportsInDocument(bundleDoc: R4.IBundle): R4.IDiagnosticReport[];
export declare function getCovid19ImmunizationsInDocument(bundleDoc: R4.IBundle): R4.IImmunization[];
