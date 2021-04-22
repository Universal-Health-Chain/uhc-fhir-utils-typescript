import { IndexFHIR } from "../models/FhirModels";
export declare class Hl7 {
    constructor();
    getDisplayOrTextInGroupedSection(code: string, groupedSectionName: string, hl7LanguageFile?: object): string;
    getLabelsOfCodesInGroupedSection(codes: string[], groupedSectionName?: string, hl7LanguageFile?: object): string[];
    getVaccinesCovid19CVX(): string[];
}
export declare function getDisplayOrTextByCodeHL7(code: string, hl7LanguageFile?: object, groupedSectionName?: string): string;
export declare function getLabelsOfCodesInGroupedSection(codes: string[], hl7LanguageFile?: object, groupedSectionName?: string): string[];
export declare function getVaccinesCovid19CVX(): string[];
export declare const GlobalIndexFHIR: IndexFHIR;
