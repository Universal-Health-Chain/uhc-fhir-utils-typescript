import { Codes } from "./UtilsModels";
export interface IndexLOINC {
    readonly healthSections: string[];
    readonly covid19SerologyTestCodes: string[];
    readonly covid19NaatTestCodes: string[];
    categorization: CategorizationLOINC;
    groupedCodes: GroupedCodesLOINC;
}
export interface CategorizationLOINC {
    healthSection: any;
    documents: any;
    laboratory: LaboratoryCategoriesLOINC;
}
export interface LaboratoryCategoriesLOINC {
    covid19LoincGroupCodes: string[];
    covid19LoincNaatCodes: string[];
    covid19LoincSerologyCodes: string[];
}
export interface GroupedCodesLOINC {
    healthSection: Codes;
    documentType: Codes;
    laboratoryTestCovid19: Codes;
    laboratoryTestTopCommonSI: Codes;
}
