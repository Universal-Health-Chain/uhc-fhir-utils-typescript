import { IndexSNOMED } from "../models/SnomedModels";
export declare class Snomed {
    constructor();
    getDisplayOrTextByCodeSNOMED: (code: string, snomedLanguageFile?: any) => string;
    getVaccinationProcedureCovid19CodesSNOMED(globalOrRegional?: string): string[];
    getPositiveOrDetectedCodesSNOMED: () => string[];
    getNegativeOrNotDetectedCodesSNOMED: () => string[];
    getSuspectedOrInconclusiveCodesSNOMED: () => string[];
    getProbablyNotPresentCodesSNOMED: () => string[];
}
export declare const SNOMED_TO_ICD10: any;
export declare const SNOMED_TO_ICD11: any;
export declare enum covid19DiseaseTerminologySNOMED {
    covid19Disease = "840539006",
    suspectedCovid19 = "840544004",
    exposureToCovid19 = "840546002"
}
export declare enum resultQualifierValueSNOMED {
    positive = "10828004",
    negative = "260385009",
    detected = "260373001",
    notDetected = "260415000",
    presumptivePositive = "720735008",
    confirmedPresent = "410605003",
    probablyPresent = "410592001",
    probablyNotPresent = "410593006",
    definitelyNotPresent = "410594000",
    inconclusive = "419984006",
    actionStatusUnknown = "410537005"
}
/** Define the sections for the indexed codes and for the JSON files with the labels of the codes in different languages*/
export declare enum GroupedSNOMED {
    vaccinationProcedureFullCovid19 = "vaccinationProcedureFullCovid19",
    vaccineTargetDisease = "vaccineTargetDisease"
}
export declare enum resultCovid19SerologyCodesSNOMED {
    positive = "10828004",
    negative = "260385009"
}
export declare enum resultCovid19NaatCodesSNOMED {
    detected = "260373001",
    notDetected = "260415000"
}
export declare const positiveOrDetectedCodesSNOMED: () => string[];
export declare const negativeOrNotDetectedCodesSNOMED: () => string[];
export declare const suspectedOrInconclusiveCodesSNOMED: () => string[];
export declare const probablyNotPresentCodesSNOMED: () => string[];
export declare function getDisplayOrTextByCodeSNOMED(code: string, snomedLanguageFile?: object): string;
export declare function getVaccinationProcedureCovid19CodesSNOMED(globalOrRegional?: string): string[];
export declare const RegionalIndexSNOMED: any;
export declare const GlobalIndexSNOMED: IndexSNOMED;
