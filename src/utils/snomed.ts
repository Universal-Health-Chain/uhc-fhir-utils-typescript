/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

const ResultCovid19SerologyCodesSNOMED:string[] = [
    "10828004", // DISPLAY: "Positive"
    "260385009" // DISPLAY: "Negative"
]
const ResultCovid19NaatCodesSNOMED:string[] = [
    "260373001", // DISPLAY: "Detected"
    "260373001" // DISPLAY: "Not Detected"
]

// TODO: return international + regional or only international or a specific regional options
export function optionsVaccinationProcedureCovid19SNOMED(globalOrRegional:string){
    if (!globalOrRegional) return
    if (globalOrRegional.toLocaleUpperCase() == "GLOBAL") { // return international + all regional codes
    }
    if (globalOrRegional.toLocaleUpperCase() == "INTERNATIONAL") { // returns only international (no regional codes)
    }
    if (globalOrRegional.toLocaleUpperCase() == "ES") { // returns only the specific regional codes
    }
}

export const RegionalIndexSNOMED:any = {
    ES: {
        LaboratoryResultCovid19Codes:[],    // TODO
        VaccinationCovid19Codes: ["65661000122107","65671000122102"]    // first dose and second dose
    }
}

export const GlobalIndexSNOMED:any = {  // note: use https://csvjson.com/json2csv
    FullCovid19ResultCodes: [           // test results (the laboratory tests are LOINC coded)
        RegionalIndexSNOMED.ES.LaboratoryResultCovid19
    ],
    FullCovid19VaccinationProcedureCodes: [
        "840534001",
        RegionalIndexSNOMED.ES.VaccinationCovid19Codes
    ],
    VaccineTargetDiseaseCodes: ["840539006","4834000","6142004","14189004","23502006","24662006","25225006","27836007","32398004","36653000","36989005","38907003","40122008","40468003","50711007","56717001","66071002","70036007","75702008","76902006","186150001","186772009","186788009","192644005","240532009","372244006","398102009","442438000"],
    Category: {
        Allergies: {
            Food: {}
        },
        Laboratory: {
            Covid19: {
            }
        }
    },
    // get "Category"() { return this["_Category"] }
    // set "Category"(value) { this["_Category"] = value }
}

export var SNOMED_CODES_HINT:any = {         // It can be overrided with a custom language
    "Covid19LaboratoryLabels": {
    }
}

export const SNOMED_TO_ICD10:any = {
    "840539006": "U07.1",  // Disease caused by Severe acute respiratory syndrome coronavirus 2 (disorder)  
    "840544004": "U07.2",  // Suspected disease caused by Severe acute respiratory coronavirus 2 (situation)
}

export const SNOMED_TO_ICD11:any = {
    "840539006": "RA01.0",  // Disease caused by Severe acute respiratory syndrome coronavirus 2 (disorder)  
    "840544004": "RA01.1",  // Suspected disease caused by Severe acute respiratory coronavirus 2 (situation)
}

export var SNOMED_CODES_LABEL:any = {        // It can be overrided with a custom language: customized sections to classify and translate terms in the frontend
    "AllergiesLabels": {

    },
    "VaccineTargetDiseaseLabels": {
        "840539006": "Disease caused by severe acute respiratory syndrome coronavirus 2 (disorder)",
        "192644005": "Meningococcal meningitis (disorder)",
        "40122008": "Pneumoconiosis (disorder)",
        "186150001": "Enteritis caused by rotavirus (disorder)",
        "56717001": "Tuberculosis (disorder)",
        "27836007": "Pertussis (disorder)",
        "372244006": "Malignant melanoma (disorder)",
        "36989005": "Mumps (disorder)",
        "38907003": "Varicella (disorder)",
        "23502006": "Lyme disease (disorder)",
        "14189004": "Measles (disorder)",
        "25225006": "Disease caused by Adenovirus (disorder)",
        "442438000": "Influenza caused by Influenza A virus (disorder)",
        "24662006": "Influenza caused by Influenza B virus (disorder)",
        "6142004": "Influenza (disorder)",
        "240532009": "Human papillomavirus infection (disorder)",
        "4834000": "Typhoid fever (disorder)",
        "76902006": "Tetanus (disorder)",
        "32398004": "Bronchitis (disorder)",
        "70036007": "Haemophilus influenzae pneumonia (disorder)",
        "398102009": "Acute poliomyelitis (disorder)",
        "40468003": "Viral hepatitis, type A (disorder)",
        "66071002": "Viral hepatitis type B (disorder)",
        "50711007": "Viral hepatitis type C (disorder)",
        "36653000": "Rubella (disorder)",
        "75702008": "Brucellosis (disorder)",
        "186772009": "Rocky Mountain spotted fever (disorder)",
        "186788009": "Q fever (disorder)",
    },
    "FullCovid19VaccinationProcedureLabels": {
        "840534001": "Severe acute respiratory syndrome coronavirus 2 vaccination (procedure) - SARS-CoV-2 vaccination",
        "65661000122107": "Administration of vaccine against COVID-19, first dose (procedure)",
        "65671000122102": "Administration of vaccine against COVID-19, second dose (procedure)"
    }
}

/* export function displayCodeSNOMED(codeLOINC:string): string {
    let codes:string[] = translateCodesSNOMED([codeLOINC])
    return codes[0]
} */


function getIndexCodesByCategoriesSNOMED(customCategory:string, subCategory:string, parentGroupCode:string):string[] {
    let codes:string[] = []
    const groupCodes:string[] = Object.keys(GlobalIndexSNOMED.Category[customCategory][subCategory][parentGroupCode])
    if (groupCodes && groupCodes.length && groupCodes.length>0) {
        groupCodes.forEach( function(groupCode:string) {
            codes.push(...GlobalIndexSNOMED.Category[customCategory][subCategory][parentGroupCode][groupCode])
        })
    }
    return codes
}

// It returns the array of labels to create the SelectOption components
export function translateCodesSNOMED(codes: string[], labelKeySection?: string): string[] {  
    if (!codes.length || codes.length<1) return []
    let labels:string[] = []
    let keys = Object.keys(SNOMED_CODES_LABEL)
    if (keys.length && keys.length > 0){
        if (labelKeySection && keys.includes(labelKeySection)) {
            keys.forEach( function(keyName:any, index:number, object:any) {
                // it looks for the specific keySection
                if (keyName == labelKeySection) {
                    codes.forEach(function(code:string) {
                        labels.push(object[index][code])
                    })
                }
            })
        }
        else {
            // no keySection given so it looks for every "code" in all the keys of the SNOMED_TRANSLATION object            
            codes.forEach(function(code:string) {
                keys.forEach( function(keyName:any, index:number, object:any) {
                    let elements = Object.keys(object[index])
                    if (elements.length && elements.length > 0){
                        let found:boolean = false
                        if (!found) {
                            elements.forEach (function (element) {
                                if (element == code) {
                                    labels.push(element)
                                    found = true
                                }
                            })
                        }
                    }
                })
            })
        }
    }
    // //console.log("labels translateCodesLOINC = ", labels)
    return labels
}