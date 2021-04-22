/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { ExtensionsFHIR } from "../models/FhirModels"

export class Personal {
    constructor(){
    }

    getSurname2 = (fhirHumanName:R4.IHumanName): string  => getSurname2(fhirHumanName)
    getPhones = (fhir:any, use?:string): string[] => getPhones(fhir, use)
    getEmails = (fhir:any, use?:string): string[]  => getEmails(fhir, use) 

}

export function getSurname2(fhirHumanName:R4.IHumanName): string {
    let surname2:string = ""
    if (fhirHumanName._family && fhirHumanName._family.extension && fhirHumanName._family.extension.length &&  fhirHumanName._family.extension.length>0) {  
        // it returns with the first value found in the _family.extension array
        fhirHumanName._family.extension.forEach (function (fhirExtension:R4.IExtension){
            if (fhirExtension.url==ExtensionsFHIR.mothersMaidenName || fhirExtension.url==ExtensionsFHIR.mothersFamily){
                if (fhirExtension.valueString) surname2 = fhirExtension.valueString
            }
        })
    }
    return surname2
}

// it filters by use and system the "telecom" object passed as parameter and returns the results
function getTelecoms(telecom:any[], use?:string, system?:string): string[] {

    if (!telecom || telecom.length < 1) return []

    let results:string[] = []

    // it uses forEach instead of map
    telecom.forEach(function(item){
        if (item.system && item.system == system) {
            if (!use){
                results.push(item.value)
                return true
            }
            else {
                if (item.use && item.use == use) {
                    results.push(item.value)
                    return true
                }
            }
        }
        return false
    }) 

    return results
}

// it get phones by searching in the "telecom" field of any FHIR resource
export function getPhones(fhir:any, use?:string): string[] {
    return getTelecoms(fhir.telecom, use, "phone")
}

// it get emails by searching in the "telecom" field of any FHIR resource
export function getEmails(fhir:any, use?:string): string[] {
    return getTelecoms(fhir.telecom, use, "email")
}