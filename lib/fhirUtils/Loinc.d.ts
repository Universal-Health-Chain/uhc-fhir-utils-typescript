import { IndexLOINC } from "../models/LoincModels";
export declare class Loinc {
    constructor();
    aboRhCodeLOINC: () => string;
    getDisplayOrTextByCodeLOINC: (code: string, loincLanguageFile?: any) => string;
    healthSections: () => string[];
    laboratoryTestTopCommonSI: () => string[];
    laboratoryTestCodesSerologyLOINC: () => string[];
    laboratoryTestCodesNaatLOINC: () => string[];
}
export declare enum medicalHistoryClassification {
    ips = "60591-5",
    allergies = "48765-2",
    vitalSigns = "8716-3",
    problemList = "11450-4",
    pastProblems = "11348-0",
    familyDiseases = "10157-6",
    medication = "10160-0",
    immunization = "11369-6",
    procedures = "47519-4",
    diet = "61144-2",
    diagnosticResults = "30954-2",
    radiologyStudies = "18726-0",
    medicalDevices = "46264-8",
    socialHistory = "29762-2",
    mentalStatus = "10190-7",
    functionalStatus = "47420-5",
    planOfCare = "18776-5",
    pregnancy = "82810-3",
    symptoms = "10187-3",
    outpatient = "46240-8",
    advanceDirectives = "42348-3"
}
export declare enum terminologyCodesLOINC {
    serologyTestsGroup = "LG51018-6",
    naatTestsGroup = "LG51017-8",
    aboRH = "882-1"
}
export declare enum covid19LaboratoryTestGroups {
    serologyTestsGroup = "LG51018-6",
    naatTestsGroup = "LG51017-8"
}
export declare enum covid19HealthCertificateLaboratoryTest {
    RAT = "LP217198-3",
    NAT = "LP6464-4"
}
/** Define the sections for the indexed codes and for the JSON files with the labels of the codes in different languages*/
export declare enum GroupedLOINC {
    healthSection = "healthSection",
    documentType = "documentType",
    laboratoryTestCovid19 = "laboratoryTestCovid19",
    laboratoryTestTopCommonSI = "laboratoryTestTopCommonSI"
}
export declare function getDisplayOrTextByCodeLOINC(code: string, loincLanguageFile?: object): string;
export declare function getCovid19HealthCertificateLaboratoryTests(): string[];
export declare function getActiveLaboratoryTestsCovid19(): string[];
export declare function getFullSerologyTestCovid19LOINC(): string[];
export declare function getFullNaatTestCovid19LOINC(): string[];
export declare const GlobalIndexLOINC: IndexLOINC;
