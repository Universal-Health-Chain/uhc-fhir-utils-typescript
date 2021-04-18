/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { ExtensionsFHIR, GroupedCodesFHIR } from "../models/FhirModels";
import { getLabelsOfGroupedCodes } from "./CommonFHIR";
export class Hl7 {
    constructor() {
    }
    // TODO: section SHALL be mandatory
    getDisplayOrTextInGroupedSection(code, groupedSectionName, hl7LanguageFile) {
        // It changes the params order because of getLabelsOfGroupedCodes has mandatory languageFile but optional section
        return getDisplayOrTextByCodeHL7(code, hl7LanguageFile, groupedSectionName);
    }
    // display code SHALL ALWAYS BE English (international)
    getLabelsOfCodesInGroupedSection(codes, groupedSectionName, hl7LanguageFile) {
        // It changes the params order because of getLabelsOfCodesInGroupedSection has mandatory languageFile but optional section
        return getLabelsOfCodesInGroupedSection(codes, hl7LanguageFile, groupedSectionName);
    }
    getVaccinesCovid19CVX() {
        return getVaccinesCovid19CVX();
    }
}
export const GlobalIndexFHIR = {
    extension: ExtensionsFHIR,
    groupedCodes: GroupedCodesFHIR
};
// display code SHALL ALWAYS BE English (international)
export function getDisplayOrTextByCodeHL7(code, hl7LanguageFile, groupedSectionName) {
    if (!hl7LanguageFile)
        hl7LanguageFile = require("../../languages/international/hl7UHC.json");
    return getLabelsOfGroupedCodes([code], hl7LanguageFile, groupedSectionName)[0];
}
export function getLabelsOfCodesInGroupedSection(codes, hl7LanguageFile, groupedSectionName) {
    if (!hl7LanguageFile)
        hl7LanguageFile = require("../../languages/international/hl7UHC.json");
    return getLabelsOfGroupedCodes(codes, hl7LanguageFile, groupedSectionName);
}
export function getVaccinesCovid19CVX() {
    return GlobalIndexFHIR.groupedCodes.cvxCovid19.codes;
}
