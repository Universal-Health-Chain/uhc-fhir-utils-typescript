/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { Codes } from "./CommonModels";

export interface IndexATC {   // extends GlobalIndex {
    categorization:                     CategorizationATC
    groupedCodes:                       GroupedCodesATC
}

export interface CategorizationATC {
    fullVaccineClassification:  Codes   //Mixed code groups
}

export interface GroupedCodesATC {
    vaccineGroups?:                      Codes
    bacterialVaccines?:                  Codes
    viralVaccines?:                      Codes
    combinedBacterialAndViralVaccines?:  Codes
    otherVaccines?:                      Codes
}