/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { Codes } from "./CommonModels";

export interface IndexLOINC {   // extends GlobalIndex {
    readonly healthSections:            string[]
    readonly covid19SerologyTestCodes:  string[]
    readonly covid19NaatTestCodes:      string[]
    categorization:                     CategorizationLOINC
    groupedCodes:                       GroupedCodesLOINC
}

export interface CategorizationLOINC {
    healthSection:  any
    documents:      any
    laboratory:     LaboratoryCategoriesLOINC
}

export interface LaboratoryCategoriesLOINC {
    covid19LoincGroupCodes:     string[] // antibody (serum) or virus (RNA) detection
    covid19LoincNaatCodes:      string[] // "SARSCoV2 detection (group code) - Nucleic acid amplification test"
    covid19LoincSerologyCodes:  string[] // 
}

export interface GroupedCodesLOINC {
    healthSection:              Codes
    documentType:               Codes
    laboratoryTestCovid19:      Codes
    laboratoryTestTopCommonSI:  Codes
}