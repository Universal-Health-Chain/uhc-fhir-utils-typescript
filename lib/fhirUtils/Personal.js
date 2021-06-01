"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmails = exports.getPhones = exports.getSurname2 = exports.Personal = void 0;
const FhirModels_1 = require("../models/FhirModels");
class Personal {
    constructor() {
        this.getSurname2 = (fhirHumanName) => getSurname2(fhirHumanName);
        this.getPhones = (fhir, use) => getPhones(fhir, use);
        this.getEmails = (fhir, use) => getEmails(fhir, use);
    }
}
exports.Personal = Personal;
function getSurname2(fhirHumanName) {
    let surname2 = "";
    if (fhirHumanName._family && fhirHumanName._family.extension && fhirHumanName._family.extension.length && fhirHumanName._family.extension.length > 0) {
        // it returns with the first value found in the _family.extension array
        fhirHumanName._family.extension.forEach(function (fhirExtension) {
            if (fhirExtension.url == FhirModels_1.ExtensionsFHIR.mothersMaidenName || fhirExtension.url == FhirModels_1.ExtensionsFHIR.mothersFamily) {
                if (fhirExtension.valueString)
                    surname2 = fhirExtension.valueString;
            }
        });
    }
    return surname2;
}
exports.getSurname2 = getSurname2;
// it filters by use and system the "telecom" object passed as parameter and returns the results
function getTelecoms(telecom, use, system) {
    if (!telecom || telecom.length < 1)
        return [];
    let results = [];
    // it uses forEach instead of map
    telecom.forEach(function (item) {
        if (item.system && item.system == system) {
            if (!use) {
                results.push(item.value);
                return true;
            }
            else {
                if (item.use && item.use == use) {
                    results.push(item.value);
                    return true;
                }
            }
        }
        return false;
    });
    return results;
}
// it get phones by searching in the "telecom" field of any FHIR resource
function getPhones(fhir, use) {
    return getTelecoms(fhir.telecom, use, "phone");
}
exports.getPhones = getPhones;
// it get emails by searching in the "telecom" field of any FHIR resource
function getEmails(fhir, use) {
    return getTelecoms(fhir.telecom, use, "email");
}
exports.getEmails = getEmails;
