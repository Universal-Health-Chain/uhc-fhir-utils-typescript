"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalIndexEMA = exports.getAllCovid19VaccineCodesEMA = exports.getApprovedCovid19VaccineCodesEMA = exports.getLabelsOfCodesInGroupedSection = exports.getDisplayOrTextByCodeEMA = exports.getCovid19TempManufacturerCodesEMA = exports.getCovid19OfficialManufacturerCodesEMA = exports.Ema = void 0;
const CommonFHIR_1 = require("./CommonFHIR");
class Ema {
    constructor() {
        this.getCovid19OfficialManufacturerCodes = () => getCovid19OfficialManufacturerCodesEMA();
        // for clinical trials
        this.getCovid19TempManufacturerCodes = () => getCovid19TempManufacturerCodesEMA();
    }
    // TODO: section SHALL be mandatory
    getDisplayOrTextInGroupedSection(code, groupedSectionName, emaLanguageFile) {
        // It changes the params order because of getLabelsOfGroupedCodes has mandatory languageFile but optional section
        return getDisplayOrTextByCodeEMA(code, emaLanguageFile, groupedSectionName);
    }
    // display code SHALL ALWAYS BE English (international)
    getLabelsOfCodesInGroupedSection(codes, groupedSectionName, emaLanguageFile) {
        // It changes the params order because of getLabelsOfCodesInGroupedSection has mandatory languageFile but optional section
        return getLabelsOfCodesInGroupedSection(codes, emaLanguageFile, groupedSectionName);
    }
    getAllCovid19VaccineCodes() {
        return getAllCovid19VaccineCodesEMA();
    }
    getApprovedCovid19VaccineCodes() {
        return getApprovedCovid19VaccineCodesEMA();
    }
}
exports.Ema = Ema;
function getCovid19OfficialManufacturerCodesEMA() {
    return [
        "ORG-100001699",
        "ORG-100030215",
        "ORG-100001417",
        "ORG-100031184",
        "ORG-100006270",
        "ORG-100013793",
        "ORG-100020693",
        "ORG-100010771",
        "ORG-100024420",
        "ORG-100032020", // Novavax CZ AS"
    ];
}
exports.getCovid19OfficialManufacturerCodesEMA = getCovid19OfficialManufacturerCodesEMA;
// for clinical trials
function getCovid19TempManufacturerCodesEMA() {
    return [
        "Gamaleya-Research-Institute",
        "Vector-Institute",
        "Sinovac-Biotech",
        "Bharat-Biotech"
    ];
}
exports.getCovid19TempManufacturerCodesEMA = getCovid19TempManufacturerCodesEMA;
// export function getCovid19DeviceManufacturerCodeEMA "http://ec.europa.eu/temp/vaccinemanufacturer"
// getCovid19LabTestManufacturerCodesEMA"emaDeviceManufacturer": {
// display code SHALL ALWAYS BE English (international)
function getDisplayOrTextByCodeEMA(code, emaLanguageFile, groupedSectionName) {
    if (!emaLanguageFile)
        emaLanguageFile = require("../../languages/international/emaUHC.json");
    return CommonFHIR_1.getLabelsOfGroupedCodes([code], emaLanguageFile, groupedSectionName)[0];
}
exports.getDisplayOrTextByCodeEMA = getDisplayOrTextByCodeEMA;
function getLabelsOfCodesInGroupedSection(codes, hl7LanguageFile, groupedSectionName) {
    if (!hl7LanguageFile)
        hl7LanguageFile = require("../../languages/international/emaUHC.json");
    return CommonFHIR_1.getLabelsOfGroupedCodes(codes, hl7LanguageFile, groupedSectionName);
}
exports.getLabelsOfCodesInGroupedSection = getLabelsOfCodesInGroupedSection;
function getApprovedCovid19VaccineCodesEMA() {
    return exports.GlobalIndexEMA.groupedCodes.covid19VaccineRegistered.codes;
}
exports.getApprovedCovid19VaccineCodesEMA = getApprovedCovid19VaccineCodesEMA;
function getAllCovid19VaccineCodesEMA() {
    return [
        ...exports.GlobalIndexEMA.groupedCodes.covid19VaccineRegistered.codes,
        ...exports.GlobalIndexEMA.groupedCodes.covid19VaccineTemp.codes
    ];
}
exports.getAllCovid19VaccineCodesEMA = getAllCovid19VaccineCodesEMA;
// FHIR 'ValueSets' can contain codes from distinct coding systems, UHC 'grouped codes' are groups of codes from the same coding system
exports.GlobalIndexEMA = {
    // extension:      ExtensionsFHIR,
    groupedCodes: {
        covid19VaccineRegistered: {
            codes: [
                "EU/1/20/1528", "EU/1/20/1507", "EU/1/21/1529", "EU/1/20/1525"
            ],
            system: "https://ec.europa.eu/health/documents/community-register/html/"
        },
        covid19VaccineTemp: {
            codes: [
                "CVnCoV", "Sputnik-V", "Convidecia", "EpiVacCorona", "BBIBP-CorV", "Inactivated-SARS-CoV-2-Vero-Cell", "CoronaVac", "Covaxin"
            ],
            system: "http://ec.europa.eu/temp/vaccineproductname"
        }
    }
};
