"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLabelsOfGroupedCodes = exports.anonymizeResource = exports.normalizedAndCanonicalizedFHIR = exports.getBundleEntriesMap = exports.getCleanIdOfResource = exports.CommonFHIR = exports.ANONYMIZATION = exports.FHIR_INSTANT_REGEX = exports.FHIR_DATETIME_REGEX = exports.FHIR_DATE_REGEX = exports.BLOOD_TYPING_MAIN_CODE_TEXT = void 0;
const canonicalize_1 = __importDefault(require("canonicalize"));
const uhc_common_utils_typescript_1 = require("@universal-health-chain/uhc-common-utils-typescript");
exports.BLOOD_TYPING_MAIN_CODE_TEXT = "Blood typing";
exports.FHIR_DATE_REGEX = "([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?";
exports.FHIR_DATETIME_REGEX = "([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(.[0-9]+)?(Z|(+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?";
exports.FHIR_INSTANT_REGEX = "([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(.[0-9]+)?(Z|(+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))";
exports.ANONYMIZATION = [
    "extension",
    "_extension",
    "meta",
    "note",
    "display",
    "_display",
    "text",
    "data",
    "url",
    "title",
    "description",
    "authorString",
    "comment",
    "extraDetails",
    "patientInstruction",
    "availableTime",
    "notAvailable",
    "availabilityExceptions",
    "subject",
    "patient",
    "name",
    "family",
    "_family",
    "given",
    "_given",
    "birthDate",
    "age",
    "address",
    "contact",
    "gender",
    "telecom",
    "maritalStatus",
    "reference",
    "identifier",
    "masterIdentifier",
    "id",
    "fullUrl",
];
const commonUtils = new uhc_common_utils_typescript_1.CommonUtilsUHC();
class CommonFHIR {
    constructor() {
        this.classifyBundleByResourceTypes = (fhirDocument) => getBundleEntriesMap(fhirDocument);
        this.getCleanIdOfResource = (resource) => getCleanIdOfResource(resource);
        this.normalizedAndCanonicalizedFHIR = (json) => normalizedAndCanonicalizedFHIR(json);
    }
    anonymizeResource(fhirResource) {
        return anonymizeResource(fhirResource);
    }
    /*
      // TODO:
      validateFhirDateTime(dateTime:string): boolean {
          return validateFhirDateTime(dateTime)
      }
      */
    // display code SHALL ALWAYS BE English (international)
    getLabelsOfGroupedCodes(codes, codeLabels, groupedSectionName) {
        return getLabelsOfGroupedCodes(codes, codeLabels, groupedSectionName);
    }
}
exports.CommonFHIR = CommonFHIR;
/** it gets a single ID from a FHIR reference URI or URN, among others */
function cleanIdWithoutReferenceFHIROrURN(referenceOrURN) {
    const splittedReferenceURI = referenceOrURN.split("/");
    const splittedURN = splittedReferenceURI[splittedReferenceURI.length - 1].split(":"); // splits the last of them wich will contain an URN string if any
    return splittedURN[splittedURN.length - 1]; // it returns the last of them wich is the sole identifier
}
/**
 * It gets a single ID from a FHIR reference URI or URN, among others.
 * NOTE: if empty result it should be fixed or deleted by the fronted
*/
function getCleanIdOfResource(resource) {
    try {
        if (resource && resource.id) {
            const cleanId = cleanIdWithoutReferenceFHIROrURN(resource.id);
            return cleanId || ""; // it can be an URN with the ID at the end of the string
        }
        else
            return "";
    }
    catch (e) {
        return "";
    }
}
exports.getCleanIdOfResource = getCleanIdOfResource;
function getBundleEntriesMap(fhirDocument) {
    const classifiedData = new Map();
    if (fhirDocument.entry &&
        fhirDocument.entry.length &&
        fhirDocument.entry.length > 1) {
        fhirDocument.entry.forEach(function (entry) {
            if (entry.resource && entry.resource.resourceType) {
                let classifiedResourcesByType = classifiedData.get(entry.resource.resourceType);
                classifiedResourcesByType
                    ? classifiedResourcesByType.push(entry.resource)
                    : (classifiedResourcesByType = [entry.resource]);
                classifiedData.set(entry.resource.resourceType, classifiedResourcesByType);
            }
        });
    }
    return classifiedData;
}
exports.getBundleEntriesMap = getBundleEntriesMap;
// FHIR Digital Signatures: https://confluence.hl7.org/display/FHIR/Digital+Signatures
// Removing properties for FHIR normalization (https://www.hl7.org/fhir/xml.html#digsig)
// and creating crypto safe predictable canocalization of JSON as defined by RFC8785.
// One consequence of signing the document is that URLs, identifiers and internal references are frozen and cannot be changed.
// This might be a desired feature, but it may also cripple interoperability between closed ecosystems where re-identification frequently occurs.
// Depending if a FHIR Bundle document or any other FHIR resource is being normalized:
// 1. In a Bundle everything is signed, except for the Bundle.id and Bundle.meta data. SMART Health Credentials also removes in every Resource: id, meta and text.
// 2. The narrative (Resource.text) is omitted prior to signing (note the deletion is at Resource.text, not Resource.text.div)
//    In addition to narrative (Resource.text), the Resource.meta element is removed. SMART Health Credential also removes the resource id, so it must be added to identifiers (as URN)
/// It returns a normalized and crypto safe predictable FHIR JSON resource or document (canonicalized as defined by RFC8785)
function normalizedAndCanonicalizedFHIR(json) {
    const resorceNormalization = ["meta", "text"]; // 'static' normatilzation as defined for XML: http://hl7.org/fhir/canonicalization/xml#static
    const bundleDocNormalization = ["meta", "id"]; // 'document' normalization as defined for XML: http://hl7.org/fhir/canonicalization/xml#document
    if (json && json.resourceType) {
        if (json.resourceType == "Bundle") {
            bundleDocNormalization.forEach((key) => {
                delete json[key];
            });
        }
        else {
            resorceNormalization.forEach((key) => {
                delete json[key];
            });
        }
    }
    // it returns crypto safe predictable canocalization of JSON as defined by RFC8785
    return canonicalize_1.default(json);
}
exports.normalizedAndCanonicalizedFHIR = normalizedAndCanonicalizedFHIR;
// composition.section.entry will be empty in an IPS document, also observation.hasMembers (fix it?)
// TODO: remove identifier, performer should be empty
function anonymizeResource(fhirResource) {
    let keyNames = exports.ANONYMIZATION;
    // return anonymizeValuesHelper(fhirResource, keyNames)
    // let anonymizedObject:any = fhirResource
    let keys = Object.keys(fhirResource);
    keys.forEach(function (keyName) {
        // if (!keyNames.includes(fhirResource[keyName])) delete fhirResource[keyName]
        // else {
        // in case of array recursively check all the objects and save the array of anonymized objects in anonymizedObj[i]
        // if (fhirResource[keyName] instanceof Array && keyNames.includes(keyName)) delete fhirResource[keyName]
        if (fhirResource[keyName] instanceof Array &&
            fhirResource[keyName].length &&
            fhirResource[keyName] > 0) {
            fhirResource[keyName].forEach(function (subKey, index) {
                fhirResource[keyName][index] = anonymizeResource(fhirResource[keyName][index]);
            });
        }
        // in case of object it does not remove the field, but put empty (undefined) data on it
        // if (typeof fhirResource[keyName]==="object" && keyNames.includes(keyName)) delete fhirResource[keyName]
        if (typeof fhirResource[keyName] == "object") {
            // && (fhirResource[keyName] !== null) ){
            let keys = Object.keys(fhirResource[keyName]);
            if (keys.length && keys.length > 0) {
                keys.forEach(function (subKey, index) {
                    if (!keyNames.includes(subKey)) {
                        // it isn't a target, so search inside of the subkey
                        fhirResource[keyName][subKey] = anonymizeResource(fhirResource[keyName][subKey]); // , keyNames)
                    }
                    else {
                        // The target was found
                        // console.log("anonymizing ", subKey)
                        if (fhirResource[keyName][subKey] instanceof Array) {
                            // subKey = undefined, but not removing the subKey
                            delete fhirResource[keyName][subKey]; //  = []
                        }
                        else if (typeof fhirResource[keyName][subKey] == "object") {
                            // subKey = undefined, but not removing the subKey
                            delete fhirResource[keyName][subKey]; //  = {}
                        }
                        // it removes the data of the single value
                        else
                            delete fhirResource[keyName][subKey]; //.remove()
                    }
                });
            }
        }
        else if (keyNames.includes(keyName))
            delete fhirResource[keyName]; // fhirResource[keyName].remove()
        // }
    });
    return fhirResource;
}
exports.anonymizeResource = anonymizeResource;
// recursive function
function anonymizeValuesHelper(data, keyNames) {
    let anonymized = [];
    if (!data)
        return anonymized;
    // in case of array recursively check all the objects and save the array of anonymized objects in anonymizedObj[i]
    if (data instanceof Array) {
        for (let i in data) {
            anonymized[i] = anonymizeValuesHelper(data[i], keyNames);
            // list = list.concat(findValuesHelper(obj[i], key, []))
        }
        // console.log("array anonymized")
        return anonymized;
    }
    // in case of object it does not remove the field, but put empty (undefined) data on it
    if (typeof data == "object" && data !== null) {
        let keys = Object.keys(data);
        if (keys.length > 0) {
            for (let i = 0; i < keys.length; i++) {
                let subKey = keys[i];
                // console.log("subKey = ", subKey, " | index = ", i,  " | keyNames = ", keyNames)
                if (!keyNames.includes(subKey)) {
                    // it isn't a target, so search inside of the subkey
                    anonymized[subKey] = anonymizeValuesHelper(data[subKey], keyNames);
                }
                else {
                    // target was found
                    // console.log("anonymizing ", subKey)
                    if (data[subKey] instanceof Array) {
                        // subKey = undefined, but not removing the subKey
                        anonymized[subKey] = [];
                    }
                    else if (typeof data[subKey] == "object") {
                        // subKey = undefined, but not removing the subKey
                        anonymized[subKey] = {};
                    }
                    // it removes the data of the single value
                    else
                        delete anonymized[subKey]; //.remove()
                }
            }
        }
        return anonymized;
    }
    // it is a single value, so do not anonymize it and save the value as is
    anonymized = data;
    return anonymized;
}
function findValuesHelper(obj, key, list) {
    if (!obj)
        return list;
    if (obj instanceof Array) {
        for (var i in obj) {
            list = list.concat(findValuesHelper(obj[i], key, []));
        }
        return list;
    }
    if (obj[key])
        list.push(obj[key]);
    if (typeof obj == "object" && obj !== null) {
        var children = Object.keys(obj);
        if (children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                list = list.concat(findValuesHelper(obj[children[i]], key, []));
            }
        }
    }
    return list;
}
// Only for hl7UHC.json file: It returns the array of labels (e.g. to create "SelectOption" component)
function getLabelsOfGroupedCodes(codes, hl7LanguageFile, targetGroupedSection) {
    if (!codes.length || codes.length < 1)
        return [];
    let labels = [];
    let groupedSections = Object.keys(hl7LanguageFile);
    //console.log("groupedSections in languageFile = ", groupedSections)
    if (groupedSections.length && groupedSections.length > 0) {
        // efficient search
        if (targetGroupedSection &&
            groupedSections.includes(targetGroupedSection)) {
            groupedSections.forEach(function (section, index, object) {
                // it looks for the specific keySection
                if (section == targetGroupedSection) {
                    // console.log("get labels in groupedSection = ", groupedSectionName)
                    codes.forEach(function (code) {
                        // console.log("label of code " + code + " is = ", codeLabels[groupedSectionName][code])
                        labels.push(hl7LanguageFile[targetGroupedSection][code]);
                    });
                } // else checks next
            });
        }
        // less efficient search
        else {
            // no "targetGroupedSection" was given, so it looks for every "code" in all the sections (keys) of the JSON file
            codes.forEach(function (code) {
                groupedSections.forEach(function (currentSectionName) {
                    // console.log("looking labels for codes in groupedSectionName = ", currentSectionName)
                    let elements = Object.keys(hl7LanguageFile[currentSectionName]);
                    if (elements.length && elements.length > 0) {
                        let found = false;
                        if (!found) {
                            elements.forEach(function (element) {
                                if (element == code) {
                                    labels.push(hl7LanguageFile[currentSectionName][code]);
                                    found = true;
                                }
                            });
                        }
                    }
                });
            });
        }
    }
    // //console.log("labels translateCodesLOINC = ", labels)
    return labels;
}
exports.getLabelsOfGroupedCodes = getLabelsOfGroupedCodes;
// display code SHALL ALWAYS BE English (international), groupedSectionName is mandatory only for HL7
// export function getDisplayOrTextByCode(code:string, languageFile:any, groupedSectionName?:string): string {}
/*
// TODO:
export function validateFhirDateTime(dateTime:string): boolean {
    return true
}
*/
