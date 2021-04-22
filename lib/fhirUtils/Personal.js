/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { ExtensionsFHIR } from "../models/FhirModels";
export class Personal {
    constructor() {
        this.getSurname2 = (fhirHumanName) => getSurname2(fhirHumanName);
        this.getPhones = (fhir, use) => getPhones(fhir, use);
        this.getEmails = (fhir, use) => getEmails(fhir, use);
    }
}
export function getSurname2(fhirHumanName) {
    if (!fhirHumanName.extension || fhirHumanName.extension.length || fhirHumanName.extension.length < 1)
        return "";
    // it returns with the first value found in the extensions array
    fhirHumanName.extension.forEach(function (fhirExtension) {
        if (fhirExtension.url == ExtensionsFHIR.mothersMaidenName) {
            if (!!fhirExtension.valueString)
                return fhirExtension.valueString;
        }
    });
    // or returns empty if no value found
    return "";
}
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
export function getPhones(fhir, use) {
    return getTelecoms(fhir.telecom, use, "phone");
}
// it get emails by searching in the "telecom" field of any FHIR resource
export function getEmails(fhir, use) {
    return getTelecoms(fhir.telecom, use, "email");
}
