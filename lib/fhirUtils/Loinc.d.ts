import { IndexLOINC } from "../models";
export declare class Loinc {
    constructor();
    getDisplayCode: (code: string, englishCodeLabels?: any) => string;
    healthSections: () => string[];
    laboratoryTestTopCommonSI: () => string[];
    laboratoryTestCodesSerologyLOINC: () => string[];
    laboratoryTestCodesNaatLOINC: () => string[];
}
/** Define the sections for the indexed codes and for the JSON files with the labels of the codes in different languages*/
export declare enum GroupedLOINC {
    healthSection = "healthSection",
    documentType = "documentType",
    laboratoryTestCovid19 = "laboratoryTestCovid19",
    laboratoryTestTopCommonSI = "laboratoryTestTopCommonSI"
}
export declare function getDisplayCodeLoinc(code: string, englishCodeLabels?: any): string;
export declare function getFullSerologyTestCovid19LOINC(): string[];
export declare function getFullNaatTestCovid19LOINC(): string[];
export declare const GlobalIndexLOINC: IndexLOINC;
