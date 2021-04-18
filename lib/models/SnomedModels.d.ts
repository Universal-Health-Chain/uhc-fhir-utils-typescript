import { GlobalIndex } from "./UtilsModels";
export interface IndexSNOMED extends GlobalIndex {
    categorization: any;
    groupedCodes: GroupedCodesSNOMED;
}
export interface GroupedCodesSNOMED {
    vaccinationProcedureFullCovid19: {
        codes: string[];
    };
    vaccineTargetDisease: {
        codes: string[];
    };
}
