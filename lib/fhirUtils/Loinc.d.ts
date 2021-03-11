import { IndexLOINC } from "../models";
/** Define the sections for the indexed codes and for the JSON files with the labels of the codes in different languages*/
export declare enum GroupedLOINC {
    healthSection = "healthSection",
    documentType = "documentType",
    laboratoryTestCovid19 = "laboratoryTestCovid19",
    laboratoryTestTopCommonSI = "laboratoryTestTopCommonSI"
}
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
