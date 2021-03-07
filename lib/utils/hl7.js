/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
export const BLOOD_TYPING_MAIN_CODE_TEXT = "Blood typing";
export const FHIR_DATE_REGEX = "([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?";
export const FHIR_DATETIME_REGEX = "([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?";
export const FHIR_INSTANT_REGEX = "([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))";
// UCUM units: https://www.hl7.org/fhir/valueset-ucum-units.html
export const IndexHL7 = {
    FullCovid19VaccineCodes: ["207", "208", "210"],
    CODE_SYSTEMS: {
        SNOMED: "http://snomed.info/sct",
        LOINC: "http://loinc.org",
    },
    EXTENSIONS: {
        MOTHERS_FAMILY: "http://hl7.org/fhir/StructureDefinition/humanname-mothers-family"
    },
    ValueSet: {
        IPS: {
            SYSTEM: "",
            CODES: []
        },
        IDENTIFIER_TYPE: {
            VALUE_SET: "http://hl7.org/fhir/ValueSet/identifier-type",
            SYSTEM: "http://hl7.org/fhir/ValueSet/identifier-type",
            CATEGORY: {
                // see https://hl7.org/fhir/r4/v2/0203/index.html
                BUSINESS: {
                    CODES: ["TAX", "PRN"]
                },
                PERSONAL: {
                    CODES: ["NN", "DL", "HC", "JHN", "SB", "PPN", "PRC", "SP", "WP"]
                },
                PATIENT: {
                    CODES: ["DR", "MA", "MC", "MR", "PI", "SS", "PIN"]
                },
                PROFESSIONAL: {
                    CODES: ["MD", "RN", "RPH", "TRL", "UPIN"]
                },
                GENERAL: {
                    CODES: ["RI"] // "Resource Identifier": ES CIAS
                }
            }
            // {code: "MCF",  display: ""}
        },
        // https://www.hl7.org/fhir/valueset-diagnostic-service-sections.html
        DIAGNOSTIC_SERVICE_SECTIONS: {
            // VALUE_SET: "http://hl7.org/fhir/ValueSet/diagnostic-service-sections",   // CAUTION: use SYSTEM and not VALUE_SET
            SYSTEM: "http://terminology.hl7.org/CodeSystem/v2-0074",
            CODES: ["LAB", "AU", "BG", "BLB", "CG", "CH", "CP", "CT", "CTH", "CUS", "EC", "EN", "GE", "HM", "ICU", "IMM", "LAB", "MB", "MCB", "MYC", "NMR", "NMS", "NRS", "OSL", "OT", "OTH", "OUS", "PF", "PHR", "PHY", "PT", "RAD", "RC", "RT", "RUS", "RX", "SP", "SR", "TX", "VR", "VUS", "XRC"]
        },
        DEVICE_SAFETY: {
            // VALUE_SET: "http://hl7.org/fhir/ValueSet/device-safety", // CAUTION: use SYSTEM and not VALUE_SET
            SYSTEM: "http://hl7.org/fhir/ValueSet/device-safety",
            CODES: ["C106038", "C101673", "C113844", "C106047", "C106045", "C106046"]
        },
        VaccineCode: {
            SYSTEM: "http://hl7.org/fhir/sid/cvx",
            CODES: ["143", "24", "19", "173", "174", "172", "56", "146", "28", "198", "20", "106", "130", "120", "195", "110", "102", "49", "48", "169", "104", "193", "52", "83", "189", "43", "44", "08", "62", "165", "176", "175", "160", "135", "197", "186", "171", "158", "150", "161", "166", "149", "205", "141", "140", "201", "202", "200", "134", "03", "94", "191", "192", "162", "163", "136", "114", "203", "178", "170", "179", "177", "133", "33", "10", "119", "116", "207", "208", "210", "144", "168", "185", "155", "206", "09", "113", "196", "115", "77", "190", "25", "101", "75", "21", "37", "183", "187", "121"]
        },
        OrganizationType: {
            SYSTEM: "http://terminology.hl7.org/CodeSystem/organization-type",
            CODES: ["prov", "dept", "bus", "ins", "govt", "cg", "edu", "pay", "team", "reli", "crs", "other"]
        }
    }
};
// It returns the array of labels to create the SelectOption components
export function translateCodesHL7(codes, codeslabels, labelKeySection) {
    if (!codes.length || codes.length < 1)
        return [];
    let labels = [];
    let keys = Object.keys(codeslabels);
    if (keys.length && keys.length > 0) {
        if (labelKeySection && keys.includes(labelKeySection)) {
            keys.forEach(function (keyName, index, object) {
                // it looks for the specific keySection
                if (keyName == labelKeySection) {
                    codes.forEach(function (code) {
                        labels.push(object[index][code]);
                    });
                }
            });
        }
        else {
            // no keySection given so it looks for every "code" in all the keys of the translation object            
            codes.forEach(function (code) {
                keys.forEach(function (keyName, index, object) {
                    let elements = Object.keys(object[index]);
                    if (elements.length && elements.length > 0) {
                        let found = false;
                        if (!found) {
                            elements.forEach(function (element) {
                                if (element == code) {
                                    labels.push(element);
                                    found = true;
                                }
                            });
                        }
                    }
                });
            });
        }
    }
    // //console.log("labels translateCodesHL7 = ", labels)
    return labels;
}
