/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { GlobalIndex } from "./UtilsModels";

export interface IndexSNOMED extends GlobalIndex {
    categorization: any
    groupedCodes: GroupedCodesSNOMED
}

export interface GroupedCodesSNOMED {
    vaccinationProcedureFullCovid19:    {codes:  string[]}
    vaccineTargetDisease:               {codes:  string[]}
}