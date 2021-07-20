import { IndexEMA } from "../models/FhirModels";
export declare class Ema {
    constructor();
    getDisplayOrTextInGroupedSection(code: string, groupedSectionName: string, emaLanguageFile?: object): string;
    getLabelsOfCodesInGroupedSection(codes: string[], groupedSectionName?: string, emaLanguageFile?: object): string[];
    getAllCovid19VaccineCodes(): string[];
    getApprovedCovid19VaccineCodes(): string[];
    getCovid19OfficialManufacturerCodes: () => string[];
    getCovid19TempManufacturerCodes: () => string[];
}
export declare function getCovid19OfficialManufacturerCodesEMA(): string[];
export declare function getCovid19TempManufacturerCodesEMA(): string[];
export declare function getDisplayOrTextByCodeEMA(code: string, emaLanguageFile?: object, groupedSectionName?: string): string;
export declare function getLabelsOfCodesInGroupedSection(codes: string[], hl7LanguageFile?: object, groupedSectionName?: string): string[];
export declare function getApprovedCovid19VaccineCodesEMA(): string[];
export declare function getAllCovid19VaccineCodesEMA(): string[];
export declare const GlobalIndexEMA: IndexEMA;
