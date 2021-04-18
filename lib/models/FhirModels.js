/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { CodingSystem } from "./UtilsModels";
export const ExtensionsFHIR = {
    mothersFamily: "http://hl7.org/fhir/StructureDefinition/humanname-mothers-family"
};
// FHIR 'ValueSets' can contain codes from distinct coding systems, UHC 'grouped codes' are groups of codes from the same coding system
export const GroupedCodesFHIR = {
    identifierBusiness: {
        codes: ["TAX", "PRN"],
        system: CodingSystem.identifierBusiness
    },
    identifierPersonal: {
        codes: ["NN", "DL", "HC", "JHN", "SB", "PPN", "PRC", "SP", "WP"],
        system: CodingSystem.identifierPersonal
    },
    identiferPatient: {
        codes: ["DR", "MA", "MC", "MR", "PI", "SS", "PIN"],
        system: CodingSystem.identiferPatient
    },
    identifierProfessional: {
        codes: ["MD", "RN", "RPH", "TRL", "UPIN"],
        system: CodingSystem.identifierProfessional
    },
    identifierGeneral: {
        codes: ["RI"],
        system: CodingSystem.identifierGeneral
    },
    diagnosticServiceSections: {
        codes: ["LAB", "AU", "BG", "BLB", "CG", "CH", "CP", "CT", "CTH", "CUS", "EC", "EN", "GE", "HM", "ICU", "IMM", "LAB", "MB", "MCB", "MYC", "NMR", "NMS", "NRS", "OSL", "OT", "OTH", "OUS", "PF", "PHR", "PHY", "PT", "RAD", "RC", "RT", "RUS", "RX", "SP", "SR", "TX", "VR", "VUS", "XRC"],
        system: CodingSystem.diagnosticServiceSections
    },
    deviceSafety: {
        codes: ["C106038", "C101673", "C113844", "C106047", "C106045", "C106046"],
        system: CodingSystem.deviceSafety
    },
    cvx: {
        codes: ["143", "24", "19", "173", "174", "172", "56", "146", "28", "198", "20", "106", "130", "120", "195", "110", "102", "49", "48", "169", "104", "193", "52", "83", "189", "43", "44", "08", "62", "165", "176", "175", "160", "135", "197", "186", "171", "158", "150", "161", "166", "149", "205", "141", "140", "201", "202", "200", "134", "03", "94", "191", "192", "162", "163", "136", "114", "203", "178", "170", "179", "177", "133", "33", "10", "119", "116", "207", "208", "210", "144", "168", "185", "155", "206", "09", "113", "196", "115", "77", "190", "25", "101", "75", "21", "37", "183", "187", "121"],
        system: CodingSystem.cvx
    },
    cvxCovid19: {
        codes: ["207", "208", "210"],
        system: CodingSystem.cvxCovid19
    },
    communicationCategory: {
        codes: ["alert", "notification", "reminder", "instruction"],
        system: CodingSystem.communicationCategory
    },
    eventStatus: {
        codes: ["preparation", "in-progress", "completed", "not-done", "on-hold", "stopped", "entered-in-error", "unknown"],
        system: CodingSystem.eventStatus
    },
    organizationType: {
        codes: ["prov", "dept", "bus", "ins", "govt", "cg", "edu", "pay", "team", "reli", "crs", "other"],
        system: CodingSystem.organizationType
    }
};
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
