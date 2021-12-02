"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalIndexFHIR = exports.getVaccinesCovid19CVX = exports.getLabelsOfCodesInGroupedSection = exports.getDisplayOrTextByCodeHL7 = exports.Hl7 = void 0;
const FhirModels_1 = require("../models/FhirModels");
const CommonModels_1 = require("../models/CommonModels");
const CommonFHIR_1 = require("./CommonFHIR");
class Hl7 {
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
exports.Hl7 = Hl7;
// display code SHALL ALWAYS BE English (international)
function getDisplayOrTextByCodeHL7(code, hl7LanguageFile, groupedSectionName) {
    if (!hl7LanguageFile)
        hl7LanguageFile = require("../../languages/international/hl7UHC.json");
    return CommonFHIR_1.getLabelsOfGroupedCodes([code], hl7LanguageFile, groupedSectionName)[0];
}
exports.getDisplayOrTextByCodeHL7 = getDisplayOrTextByCodeHL7;
function getLabelsOfCodesInGroupedSection(codes, hl7LanguageFile, groupedSectionName) {
    if (!hl7LanguageFile)
        hl7LanguageFile = require("../../languages/international/hl7UHC.json");
    return CommonFHIR_1.getLabelsOfGroupedCodes(codes, hl7LanguageFile, groupedSectionName);
}
exports.getLabelsOfCodesInGroupedSection = getLabelsOfCodesInGroupedSection;
function getVaccinesCovid19CVX() {
    return exports.GlobalIndexFHIR.groupedCodes.cvxCovid19.codes;
}
exports.getVaccinesCovid19CVX = getVaccinesCovid19CVX;
// FHIR 'ValueSets' can contain codes from distinct coding systems, UHC 'grouped codes' are groups of codes from the same coding system
exports.GlobalIndexFHIR = {
    extension: FhirModels_1.ExtensionsFHIR,
    groupedCodes: {
        compositionStatus: {
            codes: ["preliminary", "amended", "final", "entered-in-error"],
            system: CommonModels_1.CodingSystem.compositionStatus
        },
        identifierBusiness: {
            codes: ["TAX", "PRN"],
            system: CommonModels_1.CodingSystem.identifierBusiness
        },
        identifierPersonal: {
            codes: ["NN", "DL", "HC", "JHN", "SB", "PPN", "PRC", "SP", "WP"],
            system: CommonModels_1.CodingSystem.identifierPersonal
        },
        identiferPatient: {
            codes: ["DR", "MA", "MC", "MR", "PI", "SS", "PIN"],
            system: CommonModels_1.CodingSystem.identiferPatient
        },
        identifierProfessional: {
            codes: ["MD", "RN", "RPH", "TRL", "UPIN"],
            system: CommonModels_1.CodingSystem.identifierProfessional
        },
        identifierGeneral: {
            codes: ["RI"],
            system: CommonModels_1.CodingSystem.identifierGeneral
        },
        diagnosticServiceSections: {
            codes: ["LAB", "AU", "BG", "BLB", "CG", "CH", "CP", "CT", "CTH", "CUS", "EC", "EN", "GE", "HM", "ICU", "IMM", "LAB", "MB", "MCB", "MYC", "NMR", "NMS", "NRS", "OSL", "OT", "OTH", "OUS", "PF", "PHR", "PHY", "PT", "RAD", "RC", "RT", "RUS", "RX", "SP", "SR", "TX", "VR", "VUS", "XRC"],
            system: CommonModels_1.CodingSystem.diagnosticServiceSections
        },
        deviceSafety: {
            codes: ["C106038", "C101673", "C113844", "C106047", "C106045", "C106046"],
            system: CommonModels_1.CodingSystem.deviceSafety
        },
        cvx: {
            codes: ["143", "24", "19", "173", "174", "172", "56", "146", "28", "198", "20", "106", "130", "120", "195", "110", "102", "49", "48", "169", "104", "193", "52", "83", "189", "43", "44", "08", "62", "165", "176", "175", "160", "135", "197", "186", "171", "158", "150", "161", "166", "149", "205", "141", "140", "201", "202", "200", "134", "03", "94", "191", "192", "162", "163", "136", "114", "203", "178", "170", "179", "177", "133", "33", "10", "119", "116", "207", "208", "210", "144", "168", "185", "155", "206", "09", "113", "196", "115", "77", "190", "25", "101", "75", "21", "37", "183", "187", "121"],
            system: CommonModels_1.CodingSystem.cvx
        },
        cvxCovid19: {
            codes: ["207", "208", "210"],
            system: CommonModels_1.CodingSystem.cvxCovid19
        },
        communicationCategory: {
            codes: ["alert", "notification", "reminder", "instruction"],
            system: CommonModels_1.CodingSystem.communicationCategory
        },
        eventStatus: {
            codes: ["preparation", "in-progress", "completed", "not-done", "on-hold", "stopped", "entered-in-error", "unknown"],
            system: CommonModels_1.CodingSystem.eventStatus
        },
        organizationType: {
            codes: ["prov", "dept", "bus", "ins", "govt", "cg", "edu", "pay", "team", "reli", "crs", "other"],
            system: CommonModels_1.CodingSystem.organizationType
        },
        vaccineManufacturer: {
            codes: [
                "BTP", "MIP", "DVC", "GEO", "SKB", "KGC", "MBL", "MED", "MSD", "NAB", "NVX", "OTC", "PMC", "WAL", "OTH", "UNK", "PFR", "JNJ", "IDB", "GRF", "KED", "PAX", "SEQ", "VAL", "DVX", "TVA", "BN", "MOD", "ASZ", "JSN"
            ],
            system: "http://terminology.hl7.org/CodeSystem/MVX"
        }
    }
};
