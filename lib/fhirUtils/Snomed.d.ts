import { IndexSNOMED } from "../models/FhirUtilsModels";
/** Define the sections for the indexed codes and for the JSON files with the labels of the codes in different languages*/
export declare enum GroupedSNOMED {
    vaccinationProcedureFullCovid19 = "vaccinationProcedureFullCovid19",
    vaccineTargetDisease = "vaccineTargetDisease"
}
export declare const SNOMED_TO_ICD10: any;
export declare const SNOMED_TO_ICD11: any;
export declare function getVaccinationProcedureCovid19CodesSNOMED(globalOrRegional?: string): any;
export declare const RegionalIndexSNOMED: any;
export declare const GlobalIndexSNOMED: IndexSNOMED;
