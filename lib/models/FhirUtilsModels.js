export var test;
(function (test) {
})(test || (test = {}));
// It provides the 'target grouped section' within a HL7 JSON file or others with sections
export var CodingSystem;
(function (CodingSystem) {
    CodingSystem["icd10"] = "http://hl7.org/fhir/sid/icd-10";
    CodingSystem["loinc"] = "http://loinc.org";
    CodingSystem["snomed"] = "http://snomed.info/sct";
    CodingSystem["ucum"] = "http://unitsofmeasure.org";
    CodingSystem["uuid"] = "urn:ietf:rfc:3986";
    CodingSystem["deviceSafety"] = "http://ncithesaurus-stage.nci.nih.gov";
    CodingSystem["atc"] = "http://www.whocc.no/atc";
    CodingSystem["cpt"] = "http://www.ama-assn.org/go/cpt";
    CodingSystem["cvx"] = "http://hl7.org/fhir/sid/cvx";
    CodingSystem["cvxCovid19"] = "http://hl7.org/fhir/sid/cvx";
    CodingSystem["immunizationFunding"] = "http://terminology.hl7.org/CodeSystem/immunization-funding-source";
    CodingSystem["immunizationEligibilty"] = "http://terminology.hl7.org/CodeSystem/immunization-program-eligibility";
    CodingSystem["immunizationOrigin"] = "http://terminology.hl7.org/CodeSystem/immunization-origin";
    CodingSystem["notAdministeredReason"] = "http://terminology.hl7.org/CodeSystem/v3-ActReason";
    CodingSystem["administrationSite"] = "http://terminology.hl7.org/CodeSystem/v3-ActSite";
    CodingSystem["routeOfAdministration"] = "http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration";
    CodingSystem["immunizationSubpotent"] = "http://terminology.hl7.org/CodeSystem/immunization-subpotent-reason";
    CodingSystem["identifierBusiness"] = "http://terminology.hl7.org/CodeSystem/v2-0203";
    CodingSystem["identifierPersonal"] = "http://terminology.hl7.org/CodeSystem/v2-0203";
    CodingSystem["identiferPatient"] = "http://terminology.hl7.org/CodeSystem/v2-0203";
    CodingSystem["identifierProfessional"] = "http://terminology.hl7.org/CodeSystem/v2-0203";
    CodingSystem["identifierGeneral"] = "http://terminology.hl7.org/CodeSystem/v2-0203";
    CodingSystem["diagnosticServiceSections"] = "http://terminology.hl7.org/CodeSystem/v2-0074";
    CodingSystem["communicationCategory"] = "http://terminology.hl7.org/CodeSystem/communication-category";
    CodingSystem["eventStatus"] = "http://hl7.org/fhir/event-status";
    CodingSystem["organizationType"] = "http://terminology.hl7.org/CodeSystem/organization-type";
})(CodingSystem || (CodingSystem = {}));
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
