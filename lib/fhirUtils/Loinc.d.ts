import { IndexLOINC } from "../models";
export declare class Loinc {
    constructor();
    getDisplayCodeLoinc(code: string, englishCodeLabels?: any): string;
    /** Get predefined goups of codes */
    getFullTestCovid19LOINC(): string[];
    getFullSerologyTestCovid19LOINC(): string[];
    getFullNaatTestCovid19LOINC(): string[];
    /** Get medical history section codes */
    getSectionDiagnosticResultsLOINC(): string;
    getSectionImmunizationLOINC(): string;
    getSectionVitalSignsLOINC(): string;
    getSectionSymptomsLOINC(): string;
}
/** Define the sections for the indexed codes and for the JSON files with the labels of the codes in different languages*/
export declare enum GroupedLOINC {
    healthSection = "healthSection",
    documentType = "documentType",
    laboratoryTestCovid19 = "laboratoryTestCovid19",
    laboratoryTestTopCommonSI = "laboratoryTestTopCommonSI"
}
export declare function getDisplayCodeLoinc(code: string, englishCodeLabels?: any): string;
/** Get predefined goups of codes */
export declare function getFullTestCovid19LOINC(): string[];
export declare function getFullSerologyTestCovid19LOINC(): string[];
export declare function getFullNaatTestCovid19LOINC(): string[];
/** Get medical history section codes */
export declare function getSectionDiagnosticResultsLOINC(): string;
export declare function getSectionImmunizationLOINC(): string;
export declare function getSectionVitalSignsLOINC(): string;
export declare function getSectionSymptomsLOINC(): string;
export declare var LOINC_CODES_HINT: any;
export declare const GlobalIndexLOINC: IndexLOINC;
