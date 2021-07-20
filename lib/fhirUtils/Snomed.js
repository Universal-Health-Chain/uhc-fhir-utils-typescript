"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalIndexSNOMED = exports.RegionalIndexSNOMED = exports.getVaccinationProcedureCovid19CodesSNOMED = exports.getDisplayOrTextByCodeSNOMED = exports.probablyNotPresentCodesSNOMED = exports.suspectedOrInconclusiveCodesSNOMED = exports.negativeOrNotDetectedCodesSNOMED = exports.positiveOrDetectedCodesSNOMED = exports.resultCovid19NaatCodesSNOMED = exports.resultCovid19SerologyCodesSNOMED = exports.GroupedSNOMED = exports.resultQualifierValueSNOMED = exports.covid19DiseaseTerminologySNOMED = exports.SNOMED_TO_ICD11 = exports.SNOMED_TO_ICD10 = exports.covid19VaccineProphylaxisCodesSNOMED = exports.covid19LaboratoryOriginSamples = exports.Snomed = void 0;
const vaccinationProcedureCovid19International = "840534001";
class Snomed {
    constructor() {
        // display code SHALL ALWAYS BE English (international)
        this.getDisplayOrTextByCodeSNOMED = (code, snomedLanguageFile) => getDisplayOrTextByCodeSNOMED(code, snomedLanguageFile);
        // TODO: define interface for GlobalIndex objects
        this.getVaccinationProcedureCovid19CodesSNOMED = (globalOrRegional) => getVaccinationProcedureCovid19CodesSNOMED(globalOrRegional);
        this.getCovid19VaccineProphylaxisCodesSNOMED = () => covid19VaccineProphylaxisCodesSNOMED();
        this.getCovid19LaboratoryOriginSamples = () => covid19LaboratoryOriginSamples();
        this.getPositiveOrDetectedCodesSNOMED = () => exports.positiveOrDetectedCodesSNOMED();
        this.getNegativeOrNotDetectedCodesSNOMED = () => exports.negativeOrNotDetectedCodesSNOMED();
        this.getSuspectedOrInconclusiveCodesSNOMED = () => exports.suspectedOrInconclusiveCodesSNOMED();
        this.getProbablyNotPresentCodesSNOMED = () => exports.probablyNotPresentCodesSNOMED();
    }
}
exports.Snomed = Snomed;
function covid19LaboratoryOriginSamples() {
    return [
        "258500001",
        "461911000124106",
        "472881004",
        "472901003",
        "119342007",
        "119297000",
        "119361006",
        "119364003",
        "122592007" // Acellular blood
    ];
}
exports.covid19LaboratoryOriginSamples = covid19LaboratoryOriginSamples;
function covid19VaccineProphylaxisCodesSNOMED() {
    return ["1119349007", "1119349007"]; // antigen and nRNA vaccines
}
exports.covid19VaccineProphylaxisCodesSNOMED = covid19VaccineProphylaxisCodesSNOMED;
exports.SNOMED_TO_ICD10 = {
    "840539006": "U07.1",
    "840544004": "U07.2", // Suspected disease caused by Severe acute respiratory coronavirus 2 (situation)
};
exports.SNOMED_TO_ICD11 = {
    "840539006": "RA01.0",
    "840544004": "RA01.1", // Suspected disease caused by Severe acute respiratory coronavirus 2 (situation)
};
var covid19DiseaseTerminologySNOMED;
(function (covid19DiseaseTerminologySNOMED) {
    covid19DiseaseTerminologySNOMED["covid19Disease"] = "840539006";
    covid19DiseaseTerminologySNOMED["suspectedCovid19"] = "840544004";
    covid19DiseaseTerminologySNOMED["exposureToCovid19"] = "840546002"; // Exposure to SARS-CoV-2 (event)
})(covid19DiseaseTerminologySNOMED = exports.covid19DiseaseTerminologySNOMED || (exports.covid19DiseaseTerminologySNOMED = {}));
var resultQualifierValueSNOMED;
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
})(resultQualifierValueSNOMED = exports.resultQualifierValueSNOMED || (exports.resultQualifierValueSNOMED = {}));
/** Define the sections for the indexed codes and for the JSON files with the labels of the codes in different languages*/
var GroupedSNOMED;
(function (GroupedSNOMED) {
    GroupedSNOMED["vaccinationProcedureFullCovid19"] = "vaccinationProcedureFullCovid19";
    GroupedSNOMED["vaccineTargetDisease"] = "vaccineTargetDisease";
})(GroupedSNOMED = exports.GroupedSNOMED || (exports.GroupedSNOMED = {}));
var resultCovid19SerologyCodesSNOMED;
(function (resultCovid19SerologyCodesSNOMED) {
    resultCovid19SerologyCodesSNOMED["positive"] = "10828004";
    resultCovid19SerologyCodesSNOMED["negative"] = "260385009"; // DISPLAY: "Negative"
})(resultCovid19SerologyCodesSNOMED = exports.resultCovid19SerologyCodesSNOMED || (exports.resultCovid19SerologyCodesSNOMED = {}));
var resultCovid19NaatCodesSNOMED;
(function (resultCovid19NaatCodesSNOMED) {
    resultCovid19NaatCodesSNOMED["detected"] = "260373001";
    resultCovid19NaatCodesSNOMED["notDetected"] = "260415000"; // DISPLAY: "Not Detected"
})(resultCovid19NaatCodesSNOMED = exports.resultCovid19NaatCodesSNOMED || (exports.resultCovid19NaatCodesSNOMED = {}));
const positiveOrDetectedCodesSNOMED = () => [
    resultQualifierValueSNOMED.positive,
    resultQualifierValueSNOMED.detected,
    resultQualifierValueSNOMED.confirmedPresent
];
exports.positiveOrDetectedCodesSNOMED = positiveOrDetectedCodesSNOMED;
const negativeOrNotDetectedCodesSNOMED = () => [
    resultQualifierValueSNOMED.negative,
    resultQualifierValueSNOMED.notDetected,
    resultQualifierValueSNOMED.definitelyNotPresent
];
exports.negativeOrNotDetectedCodesSNOMED = negativeOrNotDetectedCodesSNOMED;
const suspectedOrInconclusiveCodesSNOMED = () => [
    resultQualifierValueSNOMED.actionStatusUnknown,
    resultQualifierValueSNOMED.inconclusive,
    resultQualifierValueSNOMED.presumptivePositive,
    resultQualifierValueSNOMED.probablyPresent
];
exports.suspectedOrInconclusiveCodesSNOMED = suspectedOrInconclusiveCodesSNOMED;
const probablyNotPresentCodesSNOMED = () => [
    resultQualifierValueSNOMED.probablyNotPresent
];
exports.probablyNotPresentCodesSNOMED = probablyNotPresentCodesSNOMED;
// display code SHALL ALWAYS BE English (international)
function getDisplayOrTextByCodeSNOMED(code, snomedLanguageFile) {
    if (!snomedLanguageFile)
        snomedLanguageFile = require("../../languages/international/snomedGPS-UHC.json");
    return snomedLanguageFile[code];
}
exports.getDisplayOrTextByCodeSNOMED = getDisplayOrTextByCodeSNOMED;
// TODO: define interface for GlobalIndex objects
function getVaccinationProcedureCovid19CodesSNOMED(globalOrRegional) {
    if (!globalOrRegional || globalOrRegional.toLocaleUpperCase() == "GLOBAL") {
        // return international + all regional codes
        return exports.GlobalIndexSNOMED.groupedCodes.vaccinationProcedureFullCovid19.codes;
        // return vaccinationProcedureCovid19International
    }
    if (globalOrRegional.toLocaleUpperCase() == "INTERNATIONAL") {
        // returns only international (no regional codes)
        return [vaccinationProcedureCovid19International];
    }
    if (globalOrRegional.toLocaleUpperCase() == "ES") {
        // returns only the specific regional codes
        return exports.RegionalIndexSNOMED.ES.vaccinacionProcedureCovid19Codes;
    }
    else
        return [];
}
exports.getVaccinationProcedureCovid19CodesSNOMED = getVaccinationProcedureCovid19CodesSNOMED;
// list of countries by country code
exports.RegionalIndexSNOMED = {
    ES: {
        // LaboratoryResultCovid19Codes:[],    // TODO
        vaccinacionProcedureCovid19Codes: ["65661000122107", "65671000122102"] // first dose and second dose
    }
};
// TODO: define interface for GlobalIndex objects
exports.GlobalIndexSNOMED = {
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
                exports.RegionalIndexSNOMED.ES.vaccinacionProcedureCovid19Codes
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
