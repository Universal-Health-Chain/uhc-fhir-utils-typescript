/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
const vaccinationProcedureCovid19International = "840534001";
export class Snomed {
    constructor() {
        // display code SHALL ALWAYS BE English (international)
        this.getDisplayOrTextByCodeSNOMED = (code, snomedLanguageFile) => getDisplayOrTextByCodeSNOMED(code, snomedLanguageFile);
        this.getPositiveOrDetectedCodesSNOMED = () => positiveOrDetectedCodesSNOMED();
        this.getNegativeOrNotDetectedCodesSNOMED = () => negativeOrNotDetectedCodesSNOMED();
        this.getSuspectedOrInconclusiveCodesSNOMED = () => suspectedOrInconclusiveCodesSNOMED();
        this.getProbablyNotPresentCodesSNOMED = () => probablyNotPresentCodesSNOMED();
    }
    // TODO: define interface for GlobalIndex objects
    getVaccinationProcedureCovid19CodesSNOMED(globalOrRegional) {
        return getVaccinationProcedureCovid19CodesSNOMED(globalOrRegional);
    }
}
export const SNOMED_TO_ICD10 = {
    "840539006": "U07.1",
    "840544004": "U07.2", // Suspected disease caused by Severe acute respiratory coronavirus 2 (situation)
};
export const SNOMED_TO_ICD11 = {
    "840539006": "RA01.0",
    "840544004": "RA01.1", // Suspected disease caused by Severe acute respiratory coronavirus 2 (situation)
};
export var covid19DiseaseTerminologySNOMED;
(function (covid19DiseaseTerminologySNOMED) {
    covid19DiseaseTerminologySNOMED["covid19Disease"] = "840539006";
    covid19DiseaseTerminologySNOMED["suspectedCovid19"] = "840544004";
    covid19DiseaseTerminologySNOMED["exposureToCovid19"] = "840546002"; // Exposure to SARS-CoV-2 (event)
})(covid19DiseaseTerminologySNOMED || (covid19DiseaseTerminologySNOMED = {}));
export var resultQualifierValueSNOMED;
(function (resultQualifierValueSNOMED) {
    resultQualifierValueSNOMED["positive"] = "10828004";
    resultQualifierValueSNOMED["negative"] = "260385009";
    resultQualifierValueSNOMED["detected"] = "260373001";
    resultQualifierValueSNOMED["notDetected"] = "260415000";
    resultQualifierValueSNOMED["presumptivePositive"] = "720735008";
    resultQualifierValueSNOMED["confirmedPresent"] = "410605003";
    resultQualifierValueSNOMED["probablyPresent"] = "410592001";
    resultQualifierValueSNOMED["probablyNotPresent"] = "410593006";
    resultQualifierValueSNOMED["definitelyNotPresent"] = "410594000";
    resultQualifierValueSNOMED["inconclusive"] = "419984006";
    resultQualifierValueSNOMED["actionStatusUnknown"] = "410537005";
})(resultQualifierValueSNOMED || (resultQualifierValueSNOMED = {}));
/** Define the sections for the indexed codes and for the JSON files with the labels of the codes in different languages*/
export var GroupedSNOMED;
(function (GroupedSNOMED) {
    GroupedSNOMED["vaccinationProcedureFullCovid19"] = "vaccinationProcedureFullCovid19";
    GroupedSNOMED["vaccineTargetDisease"] = "vaccineTargetDisease";
})(GroupedSNOMED || (GroupedSNOMED = {}));
export var resultCovid19SerologyCodesSNOMED;
(function (resultCovid19SerologyCodesSNOMED) {
    resultCovid19SerologyCodesSNOMED["positive"] = "10828004";
    resultCovid19SerologyCodesSNOMED["negative"] = "260385009"; // DISPLAY: "Negative"
})(resultCovid19SerologyCodesSNOMED || (resultCovid19SerologyCodesSNOMED = {}));
export var resultCovid19NaatCodesSNOMED;
(function (resultCovid19NaatCodesSNOMED) {
    resultCovid19NaatCodesSNOMED["detected"] = "260373001";
    resultCovid19NaatCodesSNOMED["notDetected"] = "260415000"; // DISPLAY: "Not Detected"
})(resultCovid19NaatCodesSNOMED || (resultCovid19NaatCodesSNOMED = {}));
export const positiveOrDetectedCodesSNOMED = () => [
    resultQualifierValueSNOMED.positive,
    resultQualifierValueSNOMED.detected,
    resultQualifierValueSNOMED.confirmedPresent
];
export const negativeOrNotDetectedCodesSNOMED = () => [
    resultQualifierValueSNOMED.negative,
    resultQualifierValueSNOMED.notDetected,
    resultQualifierValueSNOMED.definitelyNotPresent
];
export const suspectedOrInconclusiveCodesSNOMED = () => [
    resultQualifierValueSNOMED.actionStatusUnknown,
    resultQualifierValueSNOMED.inconclusive,
    resultQualifierValueSNOMED.presumptivePositive,
    resultQualifierValueSNOMED.probablyPresent
];
export const probablyNotPresentCodesSNOMED = () => [
    resultQualifierValueSNOMED.probablyNotPresent
];
// display code SHALL ALWAYS BE English (international)
export function getDisplayOrTextByCodeSNOMED(code, snomedLanguageFile) {
    if (!snomedLanguageFile)
        snomedLanguageFile = require("../../languages/international/snomedGPS.json");
    return snomedLanguageFile[code];
}
// TODO: define interface for GlobalIndex objects
export function getVaccinationProcedureCovid19CodesSNOMED(globalOrRegional) {
    if (!globalOrRegional || globalOrRegional.toLocaleUpperCase() == "GLOBAL") {
        // return international + all regional codes
        return GlobalIndexSNOMED.groupedCodes.vaccinationProcedureFullCovid19.codes;
        // return vaccinationProcedureCovid19International
    }
    if (globalOrRegional.toLocaleUpperCase() == "INTERNATIONAL") {
        // returns only international (no regional codes)
        return [vaccinationProcedureCovid19International];
    }
    if (globalOrRegional.toLocaleUpperCase() == "ES") {
        // returns only the specific regional codes
        return RegionalIndexSNOMED.ES.vaccinacionProcedureCovid19Codes;
    }
    else
        return [];
}
// list of countries by country code
export const RegionalIndexSNOMED = {
    ES: {
        // LaboratoryResultCovid19Codes:[],    // TODO
        vaccinacionProcedureCovid19Codes: ["65661000122107", "65671000122102"] // first dose and second dose
    }
};
// TODO: define interface for GlobalIndex objects
export const GlobalIndexSNOMED = {
    // some categorization classifications
    categorization: {
        allergies: {
            food: {}
        },
        procedure: {
        // covid19: {}
        }
    },
    // indexed codes grouped by sections to search labels for
    groupedCodes: {
        vaccinationProcedureFullCovid19: {
            codes: [
                vaccinationProcedureCovid19International,
                RegionalIndexSNOMED.ES.vaccinacionProcedureCovid19Codes
            ],
        },
        vaccineTargetDisease: {
            codes: ["840539006", "4834000", "6142004", "14189004", "23502006", "24662006", "25225006", "27836007", "32398004", "36653000", "36989005", "38907003", "40122008", "40468003", "50711007", "56717001", "66071002", "70036007", "75702008", "76902006", "186150001", "186772009", "186788009", "192644005", "240532009", "372244006", "398102009", "442438000"]
        }
    }
};
/*
function getIndexCodesByCategoriesSNOMED(customCategory:string, subCategory:string, parentGroupCode:string):string[] {
    let codes:string[] = []
    const groupCodes:string[] = Object.keys(GlobalIndexSNOMED.category[customCategory][subCategory][parentGroupCode])
    if (groupCodes && groupCodes.length && groupCodes.length>0) {
        groupCodes.forEach( function(groupCode:string) {
            codes.push(...GlobalIndexSNOMED.category[customCategory][subCategory][parentGroupCode][groupCode])
        })
    }
    return codes
}
*/ 
