/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { ExtensionsFHIR, GroupedCodesFHIR, IndexFHIR } from "../models/FhirModels"
import { getLabelsOfGroupedCodes } from "./CommonFHIR"

export class Hl7 {
    constructor() {
    }

    getDisplayOrTextInGroupedSection(code:string, hl7LanguageFile?:any, groupedSectionName?:string): string {
        return getDisplayOrTextByCodeHL7(code, hl7LanguageFile, groupedSectionName)
    }

    // display code SHALL ALWAYS BE English (international)
    getLabelsOfCodesInGroupedSection(codes:string[], hl7LanguageFile?:any, groupedSectionName?:string): string[] {
        return getLabelsOfCodesInGroupedSection(codes, hl7LanguageFile, groupedSectionName)
    }
    
    getVaccinesCovid19CVX(): string[] {
        return getVaccinesCovid19CVX()
    }
    
}

export const GlobalIndexFHIR:IndexFHIR = {
    extension:      ExtensionsFHIR,
    groupedCodes:   GroupedCodesFHIR
}

// display code SHALL ALWAYS BE English (international)
export function getDisplayOrTextByCodeHL7(code:string, hl7LanguageFile?:any, groupedSectionName?:string): string {
    if (!hl7LanguageFile) hl7LanguageFile = require("../../languages/international/hl7UHC.json")
    return getLabelsOfGroupedCodes([code], hl7LanguageFile, groupedSectionName)[0]
}

export function getLabelsOfCodesInGroupedSection(codes:string[], hl7LanguageFile?:any, groupedSectionName?:string): string[] {
    if (!hl7LanguageFile) hl7LanguageFile = require("../../languages/international/hl7UHC.json")
    return getLabelsOfGroupedCodes(codes, hl7LanguageFile, groupedSectionName)
}

export function getVaccinesCovid19CVX(): string[] {
    return GlobalIndexFHIR.groupedCodes.cvxCovid19.codes
}