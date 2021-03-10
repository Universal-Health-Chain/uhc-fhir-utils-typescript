/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
export var GroupedHL7;
(function (GroupedHL7) {
    // TODO: add from IndexHL7.groupedCodes
    GroupedHL7["cvx"] = "cvx";
    GroupedHL7["cvxCovid19"] = "cvxCovid19";
    GroupedHL7["deviceSafety"] = "deviceSafety";
    GroupedHL7["diagnosticServiceSections"] = "diagnosticServiceSections";
    GroupedHL7["identifierType"] = "identifierType";
})(GroupedHL7 || (GroupedHL7 = {}));
export function getVaccinesCovid19CVX() {
    return GlobalIndexHL7.groupedCodes[GroupedHL7.cvxCovid19].codes;
}
export const GlobalIndexHL7 = {
    extension: {
        mothersFamily: "http://hl7.org/fhir/StructureDefinition/humanname-mothers-family"
    },
    codeSystem: {
        snomed: "http://snomed.info/sct",
        loinc: "http://loinc.org",
    },
    groupedCodes: {
        // ips: { system: "", codes: []},
        identifierBusiness: {
            codes: ["TAX", "PRN"],
            system: "http://hl7.org/fhir/ValueSet/identifier-type" // CAUTION: use SYSTEM and not VALUE_SET for the hl7.json file
        },
        identifierPersonal: {
            codes: ["NN", "DL", "HC", "JHN", "SB", "PPN", "PRC", "SP", "WP"],
            system: "http://hl7.org/fhir/ValueSet/identifier-type" // CAUTION: use SYSTEM and not VALUE_SET for the hl7.json file
        },
        identiferPatient: {
            codes: ["DR", "MA", "MC", "MR", "PI", "SS", "PIN"],
            system: "http://hl7.org/fhir/ValueSet/identifier-type" // CAUTION: use SYSTEM and not VALUE_SET for the hl7.json file
        },
        identifierProfessional: {
            codes: ["MD", "RN", "RPH", "TRL", "UPIN"],
            system: "http://hl7.org/fhir/ValueSet/identifier-type" // CAUTION: use SYSTEM and not VALUE_SET for the hl7.json file
        },
        identifierGeneral: {
            codes: ["RI"],
            system: "http://hl7.org/fhir/ValueSet/identifier-type" // CAUTION: use SYSTEM and not VALUE_SET for the hl7.json file
        },
        diagnosticServiceSections: {
            system: "http://terminology.hl7.org/CodeSystem/v2-0074",
            codes: ["LAB", "AU", "BG", "BLB", "CG", "CH", "CP", "CT", "CTH", "CUS", "EC", "EN", "GE", "HM", "ICU", "IMM", "LAB", "MB", "MCB", "MYC", "NMR", "NMS", "NRS", "OSL", "OT", "OTH", "OUS", "PF", "PHR", "PHY", "PT", "RAD", "RC", "RT", "RUS", "RX", "SP", "SR", "TX", "VR", "VUS", "XRC"]
        },
        deviceSafety: {
            system: "http://hl7.org/fhir/ValueSet/device-safety",
            codes: ["C106038", "C101673", "C113844", "C106047", "C106045", "C106046"]
        },
        cvx: {
            system: "http://hl7.org/fhir/sid/cvx",
            codes: ["143", "24", "19", "173", "174", "172", "56", "146", "28", "198", "20", "106", "130", "120", "195", "110", "102", "49", "48", "169", "104", "193", "52", "83", "189", "43", "44", "08", "62", "165", "176", "175", "160", "135", "197", "186", "171", "158", "150", "161", "166", "149", "205", "141", "140", "201", "202", "200", "134", "03", "94", "191", "192", "162", "163", "136", "114", "203", "178", "170", "179", "177", "133", "33", "10", "119", "116", "207", "208", "210", "144", "168", "185", "155", "206", "09", "113", "196", "115", "77", "190", "25", "101", "75", "21", "37", "183", "187", "121"]
        },
        cvxCovid19: {
            system: "http://hl7.org/fhir/sid/cvx",
            codes: ["207", "208", "210"]
        },
        eventStatus: {
            system: "http://hl7.org/fhir/event-status",
            codes: ["preparation", "in-progress", "completed", "not-done", "on-hold", "stopped", "entered-in-error", "unknown"]
        }
    }
};
