/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
export const systemICD10 = "http://hl7.org/fhir/sid/icd-10";
export const systemLOINC = "http://loinc.org";
export const systemSNOMED = "http://snomed.info/sct";
export const systemUCUM = "http://unitsofmeasure.org";
export const BLOOD_TYPING_MAIN_CODE_TEXT = "Blood typing";
export const FHIR_DATE_REGEX = "([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?";
export const FHIR_DATETIME_REGEX = "([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?";
export const FHIR_INSTANT_REGEX = "([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))";
export const ANONYMIZATION = ["extension", "_extension", "meta", "note", "display", "_display", "text", "data", "url",
    "title", "description", "authorString", "comment", "extraDetails", "patientInstruction", "availableTime", "notAvailable", "availabilityExceptions",
    "subject", "patient", "name", "family", "_family", "given", "birthDate", "age", "address", "contact", "gender", "telecom", "maritalStatus",
    "reference", "identifier", "masterIdentifier", "id", "fullUrl"];
export class CommonFHIR {
    constructor() {
    }
    // TODO:
    validateFhirDateTime(dateTime) {
        return validateFhirDateTime(dateTime);
    }
    getLabelsOfCodes(codes, codeLabels, groupedSectionName) {
        return getLabelsOfCodes(codes, codeLabels, groupedSectionName);
    }
    getDisplayCode(code, englishCodeLabels) {
        return getDisplayCode(code, englishCodeLabels);
    }
    getLocalizedTextCode(code, localizedCodeLabels) {
        return getLocalizedTextCode(code, localizedCodeLabels);
    }
}
// TODO:
export function validateFhirDateTime(dateTime) {
    return true;
}
// TODO: change to enum
export function getChoiceNameFromValueFHIR(fhir) {
    switch (fhir) {
        case (fhir.valueString): return "valueString";
        case (fhir.valueQuantity): return "valueQuantity";
        case (fhir.valueRatio): return "valueRatio";
        case (fhir.valueRange): return "valueRange";
        case (fhir.valueCodeableConcept): return "valueCodeableConcept";
        case (fhir.valueBoolean): return "valueBoolean";
        case (fhir.valueSampledData): return "valueSampledData";
        case (fhir.valueTime): return "valueTime";
        case (fhir.valueDateTime): return "valueDateTime";
        case (fhir.valuePeriod): return "valuePeriod";
        default: return "";
    }
}
// composition.section.entry will be empty in an IPS document, also observation.hasMembers (fix it?)
// TODO: remove identifier, performer should be empty
export function anonymizeResource(fhirResource) {
    let keyNames = ANONYMIZATION;
    // return anonymizeValuesHelper(fhirResource, keyNames)
    // let anonymizedObject:any = fhirResource
    let keys = Object.keys(fhirResource);
    keys.forEach(function (keyName) {
        // if (!keyNames.includes(fhirResource[keyName])) delete fhirResource[keyName] 
        // else {
        // in case of array recursively check all the objects and save the array of anonymized objects in anonymizedObj[i]
        // if (fhirResource[keyName] instanceof Array && keyNames.includes(keyName)) delete fhirResource[keyName]
        if (fhirResource[keyName] instanceof Array && fhirResource[keyName].length && fhirResource[keyName] > 0) {
            fhirResource[keyName].forEach(function (subKey, index) {
                fhirResource[keyName][index] = anonymizeResource(fhirResource[keyName][index]);
            });
        }
        // in case of object it does not remove the field, but put empty (undefined) data on it
        // if (typeof fhirResource[keyName]==="object" && keyNames.includes(keyName)) delete fhirResource[keyName]
        if ((typeof fhirResource[keyName] == "object")) { // && (fhirResource[keyName] !== null) ){
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
    if ((typeof data == "object") && (data !== null)) {
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
    if ((typeof obj == "object") && (obj !== null)) {
        var children = Object.keys(obj);
        if (children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                list = list.concat(findValuesHelper(obj[children[i]], key, []));
            }
        }
    }
    return list;
}
// It returns the array of labels (e.g. to create "SelectOption" component)
export function getLabelsOfCodes(codes, codeLabels, groupedSectionName) {
    if (!codes.length || codes.length < 1)
        return [];
    let labels = [];
    let codeLabelsKeys = Object.keys(codeLabels);
    //console.log("Keys in codeLabels = ", keys)
    if (codeLabelsKeys.length && codeLabelsKeys.length > 0) {
        // efficient search
        if (groupedSectionName && codeLabelsKeys.includes(groupedSectionName)) {
            codeLabelsKeys.forEach(function (keyName, index, object) {
                // it looks for the specific keySection
                if (keyName == groupedSectionName) {
                    // console.log("get labels in groupedSection = ", groupedSectionName)
                    codes.forEach(function (code) {
                        // console.log("label of code " + code + " is = ", codeLabels[groupedSectionName][code])
                        labels.push(codeLabels[groupedSectionName][code]);
                    });
                } // else checks next
            });
        }
        // less efficient search
        else {
            // no "groupedSectionName" was given, so it looks for every "code" in all the sections (keys) of the "codeLabels" object            
            codes.forEach(function (code) {
                codeLabelsKeys.forEach(function (currentSectionName) {
                    // console.log("looking labels for codes in groupedSectionName = ", currentSectionName)
                    let elements = Object.keys(codeLabels[currentSectionName]);
                    if (elements.length && elements.length > 0) {
                        let found = false;
                        if (!found) {
                            elements.forEach(function (element) {
                                if (element == code) {
                                    labels.push(codeLabels[currentSectionName][code]);
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
export function getDisplayCode(code, englishCodeLabels) {
    let codes = getLabelsOfCodes([code], englishCodeLabels);
    return codes[0];
}
export function getLocalizedTextCode(code, localizedCodeLabels) {
    let codes = getLabelsOfCodes([code], localizedCodeLabels);
    return codes[0];
}
