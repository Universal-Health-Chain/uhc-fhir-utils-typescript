import { IndexHL7 } from "../models/FhirUtilsModels";
export declare class Hl7 {
    constructor();
    getDisplayOrTextInGroupedSection(code: string, hl7LanguageFile?: any, groupedSectionName?: string): string;
    getLabelsOfCodesInGroupedSection(codes: string[], hl7LanguageFile?: any, groupedSectionName?: string): string[];
    getVaccinesCovid19CVX(): string[];
}
export declare enum GroupedHL7 {
    cvx = "cvx",
    cvxCovid19 = "cvxCovid19",
    deviceSafety = "deviceSafety",
    diagnosticServiceSections = "diagnosticServiceSections",
    identifierType = "identifierType",
    organizationTypes = "organizationTypes"
}
export declare function getDisplayOrTextByCodeHL7(code: string, hl7LanguageFile?: any, groupedSectionName?: string): string;
export declare function getLabelsOfCodesInGroupedSection(codes: string[], hl7LanguageFile?: any, groupedSectionName?: string): string[];
export declare function getVaccinesCovid19CVX(): string[];
export declare const GlobalIndexHL7: IndexHL7;
