/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { getLabelsOfCodes } from "./CommonFHIR"
const vaccinationProcedureCovid19International = "840534001"

/** Define the sections for the indexed codes and for the JSON files with the labels of the codes in different languages*/
export enum GroupedSNOMED { // from GlobalIndexSNOMED.groupedCodes
    vaccinationProcedureFullCovid19 = "vaccinationProcedureFullCovid19",
    vaccineTargetDisease = "vaccineTargetDisease"
}

const ResultCovid19SerologyCodesSNOMED:string[] = [
    "10828004", // DISPLAY: "Positive"
    "260385009" // DISPLAY: "Negative"
]
const ResultCovid19NaatCodesSNOMED:string[] = [
    "260373001", // DISPLAY: "Detected"
    "260373001" // DISPLAY: "Not Detected"
]

export const SNOMED_TO_ICD10:any = {
    "840539006": "U07.1",  // Disease caused by Severe acute respiratory syndrome coronavirus 2 (disorder)  
    "840544004": "U07.2",  // Suspected disease caused by Severe acute respiratory coronavirus 2 (situation)
}

export const SNOMED_TO_ICD11:any = {
    "840539006": "RA01.0",  // Disease caused by Severe acute respiratory syndrome coronavirus 2 (disorder)  
    "840544004": "RA01.1",  // Suspected disease caused by Severe acute respiratory coronavirus 2 (situation)
}

// TODO: define interface for GlobalIndex objects
export function getVaccinationProcedureCovid19CodesSNOMED(globalOrRegional?:string){
    if (!globalOrRegional || globalOrRegional.toLocaleUpperCase() == "GLOBAL") {
        // return international + all regional codes
        return GlobalIndexSNOMED.groupedCodes.vaccinationProcedureFullCovid19.codes
        return vaccinationProcedureCovid19International
    }
    if (globalOrRegional.toLocaleUpperCase() == "INTERNATIONAL") {
        // returns only international (no regional codes)
        return vaccinationProcedureCovid19International
    }
    if (globalOrRegional.toLocaleUpperCase() == "ES") {
        // returns only the specific regional codes
        return RegionalIndexSNOMED.ES.vaccinacionProcedureCovid19
    }
}

// list of countries by country code
export const RegionalIndexSNOMED:any = {
    ES: {
        // LaboratoryResultCovid19Codes:[],    // TODO
        vaccinacionProcedureCovid19: ["65661000122107","65671000122102"]    // first dose and second dose
    }
}

// TODO: define interface for GlobalIndex objects
export const GlobalIndexSNOMED:any = {  // note: use https://csvjson.com/json2csv
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
                RegionalIndexSNOMED.ES.vaccinacionProcedureCovid19
            ],
        },
        vaccineTargetDisease: {
            codes: ["840539006","4834000","6142004","14189004","23502006","24662006","25225006","27836007","32398004","36653000","36989005","38907003","40122008","40468003","50711007","56717001","66071002","70036007","75702008","76902006","186150001","186772009","186788009","192644005","240532009","372244006","398102009","442438000"]
        }
    }
}

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