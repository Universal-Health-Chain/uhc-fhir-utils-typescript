/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { CodesAndSystem, CodingSystem, GlobalIndex } from "./CommonUtilsModels"

export interface IndexEMA extends GlobalIndex {
    // extension:      typeof ExtensionsFHIR
    groupedCodes:   GroupedCodesEMA
}

export interface GroupedCodesEMA {  // https://csvjson.com/json2csv
    covid19VaccineRegistered:   CodesAndSystem
    covid19VaccineTemp:         CodesAndSystem
}

export interface IndexFHIR extends GlobalIndex {
    extension:      typeof ExtensionsFHIR
    groupedCodes:   GroupedCodesFHIR
}

export enum ExtensionsFHIR {
    mothersFamily = "http://hl7.org/fhir/StructureDefinition/humanname-mothers-family",
    mothersMaidenName = "http://hl7.org/fhir/StructureDefinition/patient-mothersMaidenName"
}

// for indexing the ACTIVE codes
export interface GroupedCodesFHIR {  // https://csvjson.com/json2csv
    identifierBusiness:         CodesAndSystem
    identifierPersonal:         CodesAndSystem
    identiferPatient:           CodesAndSystem
    identifierProfessional:     CodesAndSystem
    identifierGeneral:          CodesAndSystem
    diagnosticServiceSections:  CodesAndSystem
    deviceSafety:               CodesAndSystem
    cvx:                        CodesAndSystem
    cvxCovid19:                 CodesAndSystem
    communicationCategory:      CodesAndSystem
    eventStatus:                CodesAndSystem
    organizationType:           CodesAndSystem
    vaccineManufacturer:        CodesAndSystem
}

/**
    category: {
        // see https://hl7.org/fhir/r4/v2/0203/index.html AND https://www.hl7.org/fhir/v2/0203/index.html
        business: {
            CODES: ["TAX","PRN"]
        },
        personal:{
            CODES: ["NN","DL","HC","JHN","SB","PPN","PRC","SP","WP"],
            passport: "PPN",
            nationalPersonIdentifierPrefix: "NN",   //NNxxx where the xxx is the ISO table 3166 3-character (alphabetic) country code
            healthCard: "HC",

            residencyCard: "SS"
        },
        patient: {  // see https://www.dshs.texas.gov/IDCU/investigation/ELR/Texas-HL7-2_5_1-ELR_Specification_-2016_Final-Draft-4-29-16.pdf
            CODES:["DR","MA","MC","MR","PI","SS","PIN"]
        },
        professional: {
            CODES:["MD","RN","RPH","TRL","UPIN"],
            registered:{code:"COM"},

        },
        general: {
            CODES:["RI"]    // "Resource Identifier": ES CIAS
        }
    }
    // {code: "MCF",  display: ""}
 */