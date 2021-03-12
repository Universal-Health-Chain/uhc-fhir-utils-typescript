import { IndexSNOMED } from "../models/FhirUtilsModels";
export declare class Snomed {
    constructor();
    getDisplayCodeSnomed(code: string, englishCodeLabels?: any): string;
    getVaccinationProcedureCovid19CodesSNOMED(globalOrRegional?: string): any;
}
/** Define the sections for the indexed codes and for the JSON files with the labels of the codes in different languages*/
export declare enum GroupedSNOMED {
    vaccinationProcedureFullCovid19 = "vaccinationProcedureFullCovid19",
    vaccineTargetDisease = "vaccineTargetDisease"
}
export declare enum ResultCovid19SerologyCodesSNOMED {
    positive = "10828004",
    negative = "260385009"
}
export declare enum ResultCovid19NaatCodesSNOMED {
    detected = "260373001",
    notDetected = "260415000"
}
export declare const SNOMED_TO_ICD10: any;
export declare const SNOMED_TO_ICD11: any;
export declare function getDisplayCodeSnomed(code: string, englishCodeLabels?: any): string;
export declare function getVaccinationProcedureCovid19CodesSNOMED(globalOrRegional?: string): any;
export declare const RegionalIndexSNOMED: any;
export declare const GlobalIndexSNOMED: IndexSNOMED;
