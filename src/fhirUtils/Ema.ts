/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { IndexEMA } from "../models/FhirModels"
import { CodingSystem } from "../models/CommonUtilsModels"
import { getLabelsOfGroupedCodes } from "./CommonFHIR"

export class Ema {
    constructor() {
    }

    // TODO: section SHALL be mandatory
    getDisplayOrTextInGroupedSection(code:string, groupedSectionName:string, emaLanguageFile?:object): string {
        // It changes the params order because of getLabelsOfGroupedCodes has mandatory languageFile but optional section
        return getDisplayOrTextByCodeEMA(code, emaLanguageFile, groupedSectionName)
    }

    // display code SHALL ALWAYS BE English (international)
    getLabelsOfCodesInGroupedSection(codes:string[], groupedSectionName?:string, emaLanguageFile?:object): string[] {
        // It changes the params order because of getLabelsOfCodesInGroupedSection has mandatory languageFile but optional section
        return getLabelsOfCodesInGroupedSection(codes, emaLanguageFile, groupedSectionName)
    }
    
    getAllCovid19VaccineCodes(): string[] {
        return getAllCovid19VaccineCodesEMA()
    }

    getApprovedCovid19VaccineCodes(): string[] {
        return getApprovedCovid19VaccineCodesEMA()
    }

    getCovid19OfficialManufacturerCodes = ():string[] => getCovid19OfficialManufacturerCodesEMA()
    // for clinical trials
    getCovid19TempManufacturerCodes= ():string[] => getCovid19TempManufacturerCodesEMA()
    
}

export function getCovid19OfficialManufacturerCodesEMA():string[] { // "https://spor.ema.europa.eu/v1/organisations"
    return [
        "ORG-100001699", // "AstraZeneca AB",    
        "ORG-100030215", // Biontech Manufacturing GmbH",
        "ORG-100001417", // Janssen-Cilag International",
        "ORG-100031184", // Moderna Biotech Spain S.L.",
        "ORG-100006270", // Curevac AG",
        "ORG-100013793", // CanSino Biologics",
        "ORG-100020693", // China Sinopharm International Corp. - Beijing location",
        "ORG-100010771", // Sinopharm Weiqida Europe Pharmaceutical s.r.o. - Prague location",
        "ORG-100024420", // Sinopharm Zhijun (Shenzhen) Pharmaceutical Co. Ltd. - Shenzhen location",
        "ORG-100032020", // Novavax CZ AS"
    ]
}

// for clinical trials
export function getCovid19TempManufacturerCodesEMA():string[] { // "https://spor.ema.europa.eu/v1/organisations"
    return [
        "Gamaleya-Research-Institute",
        "Vector-Institute",
        "Sinovac-Biotech",
        "Bharat-Biotech"
    ]
}

// export function getCovid19DeviceManufacturerCodeEMA "http://ec.europa.eu/temp/vaccinemanufacturer"

// getCovid19LabTestManufacturerCodesEMA"emaDeviceManufacturer": {


// display code SHALL ALWAYS BE English (international)
export function getDisplayOrTextByCodeEMA(code:string, emaLanguageFile?:object, groupedSectionName?:string): string {
    if (!emaLanguageFile) emaLanguageFile = require("../../languages/international/emaUHC.json")
    return getLabelsOfGroupedCodes([code], emaLanguageFile, groupedSectionName)[0]
}

export function getLabelsOfCodesInGroupedSection(codes:string[], hl7LanguageFile?:object, groupedSectionName?:string): string[] {
    if (!hl7LanguageFile) hl7LanguageFile = require("../../languages/international/emaUHC.json")
    return getLabelsOfGroupedCodes(codes, hl7LanguageFile, groupedSectionName)
}

export function getApprovedCovid19VaccineCodesEMA(): string[] {
    return GlobalIndexEMA.groupedCodes.covid19VaccineRegistered.codes
}

export function getAllCovid19VaccineCodesEMA(): string[] {
    return [
        ... GlobalIndexEMA.groupedCodes.covid19VaccineRegistered.codes,
        ... GlobalIndexEMA.groupedCodes.covid19VaccineTemp.codes
    ]
}

// FHIR 'ValueSets' can contain codes from distinct coding systems, UHC 'grouped codes' are groups of codes from the same coding system
export const GlobalIndexEMA:IndexEMA = {
    // extension:      ExtensionsFHIR,
    groupedCodes:   {
        covid19VaccineRegistered:{
            codes: [ // approved ones codes (China, Russia and Spain are not present)
                "EU/1/20/1528", "EU/1/20/1507", "EU/1/21/1529", "EU/1/20/1525"
            ],
            system: "https://ec.europa.eu/health/documents/community-register/html/"
        },
        covid19VaccineTemp:{
            codes: [ // not approved until now
                "CVnCoV","Sputnik-V","Convidecia","EpiVacCorona","BBIBP-CorV","Inactivated-SARS-CoV-2-Vero-Cell","CoronaVac","Covaxin"
            ],
            system: "http://ec.europa.eu/temp/vaccineproductname"
        }
    }
}