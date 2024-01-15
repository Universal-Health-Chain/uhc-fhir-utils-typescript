/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { CodingSystem } from "../models/CommonModels"
import { getDisplayOrTextByCodeHL7 } from "./Hl7"
import { getDisplayOrTextByCodeLOINC } from "./Loinc"
import { getDisplayOrTextByCodeSNOMED } from "./Snomed"

export class CodeableConcept {
    // someData: any; // this.someData

    constructor() {
    }

    static getCodings(codeableConcept:R4.ICodeableConcept, system:string): R4.ICoding[]{
        return getCodingsBySystem(codeableConcept, system)
    }

    getSingleCoding(codeableConcept:R4.ICodeableConcept, system:string): R4.ICoding{
        return getSingleCodingBySystem(codeableConcept, system)
    }

    getCodingInArrayOfCodeableConcepts(codeableConcepts:R4.ICodeableConcept[], system:string): R4.ICoding{
        return getCodingInArrayOfCodeableConcepts(codeableConcepts, system)
    }

    getCodeableConceptInArray(codeableConcepts:R4.ICodeableConcept[], system:string): R4.ICodeableConcept{
        return getCodeableConceptInArray(codeableConcepts, system)
    }

    /*
    getCodingsLOINC(codeableConcept:R4.ICodeableConcept): R4.ICoding[]{
        return getCodingsLOINC(codeableConcept)
    }

    getSingleCodingLOINC(codeableConcept:R4.ICodeableConcept): R4.ICoding{
        return getSingleCodingLOINC(codeableConcept)
    }

    getCodingsSNOMED(codeableConcept:R4.ICodeableConcept): R4.ICoding[]{
        return getCodingsSNOMED(codeableConcept)
    }

    getSingleCodingSNOMED(codeableConcept:R4.ICodeableConcept): R4.ICoding{
        return getSingleCodingSNOMED(codeableConcept)
    }
    */

    createCoding(code:string, system:string): R4.ICoding {
        return createCoding(code, system)
    }

    getExistingTargetCodesInCodeableConcepts(codeableConcepts:R4.ICodeableConcept[], targetCodes:string[]): string[] {
        return getExistingTargetCodesInCodeableConcepts(codeableConcepts, targetCodes)
    }

    addExistingTargetCodesInCodeableConcepts(codeableConcepts:R4.ICodeableConcept[], targetCodes:string[], currentCodes:string[]): string[] {
        return addExistingTargetCodesInCodeableConcepts(codeableConcepts, targetCodes, currentCodes)
    }

    getCodeListInCodeableConcept(codeableConcept:R4.ICodeableConcept|undefined, system?:string): string[]{
        return getCodeListInCodeableConcept(codeableConcept, system)
    }

    getCodeListInArrayOfCodeableConcepts(codeableConcepts:R4.ICodeableConcept[]|undefined, system?:string): string[] {
        return getCodeListInArrayOfCodeableConcepts(codeableConcepts, system)
    }

    createCodeableConcept(typeCode:string, codeSystem:string, internationalDisplay:string, systemVersion?:string, userSelected?:boolean, customText?:string):R4.ICodeableConcept{
        return createCodeableConcept(typeCode, codeSystem, internationalDisplay, systemVersion, userSelected, customText)
    }

    /** async method */
    async createCodeableConceptWithOptionalLanguage(typeCode:string|undefined, codeSystem:string, customLanguageFile?:any): Promise<R4.ICodeableConcept> {
        return await createCodeableConceptWithOptionalLanguage(typeCode, codeSystem, customLanguageFile)
    }

    /** async method */
    async createArrayOfCodeableConceptsOfSystem(inputCodes:string[]|undefined, codeSystem:string, customLanguageFile?:any): Promise<R4.ICodeableConcept[]> {
        return await createCodeableConceptsArrayOfSystem(inputCodes, codeSystem, customLanguageFile)
    }

    /** async method */
    async createCodingArrayOfSystem(inputCodes:string[]|undefined, codeSystem:string, englishData:object) : Promise<R4.ICoding[]> {
        return await createCodingArrayOfSystem(inputCodes, codeSystem, englishData)
    }
}

/** Coding  */
export function getCodeableConceptInArray(codeableConcepts:R4.ICodeableConcept[], system:string): R4.ICodeableConcept{
    let result:R4.ICodeableConcept = {}
    let found = false
    codeableConcepts.forEach( function(codeableConcept:R4.ICodeableConcept){
        if (!found) {
            const coding = getSingleCodingBySystem(codeableConcept, system)
            if (coding) {
                result = codeableConcept
                found = true
            }
        }
    })
    // console.log("getGetSingleCodingInArrayOfCodeableConcepts = ", JSON.stringify(result))
    return result    
}

export function getCodingInArrayOfCodeableConcepts(codeableConcepts:R4.ICodeableConcept[], system:string): R4.ICoding{
    let result:R4.ICoding = {}
    let found = false
    codeableConcepts.forEach( function(codeableConcept:R4.ICodeableConcept){
        if (!found) {
            const coding = getSingleCodingBySystem(codeableConcept, system)
            if (coding) {
                result = coding
                found = true
            }
        }
    })
    // console.log("getGetSingleCodingInArrayOfCodeableConcepts = ", JSON.stringify(result))
    return result
}

export function getCodingsBySystem(codeableConcept:R4.ICodeableConcept, system:string): R4.ICoding[]{
    let results:R4.ICoding[] = []
    if(codeableConcept.coding && codeableConcept.coding.length && codeableConcept.coding.length>0) {
        codeableConcept.coding.forEach(function(coding){
            if (coding.system && coding.system == system) results.push(coding)
        })
    }
    // console.log("getCodingsBySystem = ", JSON.stringify(results))
    return results
}

export function getSingleCodingBySystem(codeableConcept:R4.ICodeableConcept, system:string): R4.ICoding{
    return getCodingsBySystem(codeableConcept, system)[0]
}

/*
export function getCodingsLOINC(codeableConcept:R4.ICodeableConcept): R4.ICoding[]{
    return getCodingsBySystem(codeableConcept, systemLOINC)
}

export function getSingleCodingLOINC(codeableConcept:R4.ICodeableConcept): R4.ICoding{
    return getSingleCodingBySystem(codeableConcept, systemLOINC)
}

export function getCodingsSNOMED(codeableConcept:R4.ICodeableConcept): R4.ICoding[]{
    return getCodingsBySystem(codeableConcept, systemSNOMED)
}

export function getSingleCodingSNOMED(codeableConcept:R4.ICodeableConcept): R4.ICoding{
    return getSingleCodingBySystem(codeableConcept, systemSNOMED)
}
*/

// 'display' SHALL BE English (default) but 'text' can be any custom language
export async function createDisplayOrTextOfCodeable(code:string, system:string, customLanguageFile?:any):Promise<string> {
    let systemType:string = system
    if (String(system).startsWith("http://hl7.org")) systemType = "http://hl7.org"
    // console.log("createDisplayOrText of code " + code + " and system " + system)

    // it checks if HL7 or others
    let result:string = ""
    switch (String(systemType)) {
        case CodingSystem.loinc: {
            result = getDisplayOrTextByCodeLOINC(code, customLanguageFile)
            // console.log("getDisplayOrTextByCodeLOINC = ", result)
            break
        }
        case CodingSystem.snomed: {
            result = getDisplayOrTextByCodeSNOMED(code, customLanguageFile)
            // console.log("getDisplayOrTextByCodeSNOMED = ", result)
            break
        }
        case "http://hl7.org": {
            result = await getDisplayOrTextByCodeHL7(code, customLanguageFile, system)
            // console.log("getDisplayOrTextByCodeHL7 = ", result)
            break
        }
    }  
    return result
}

export function createCoding(code:string, system:string, display?:string, systemVersion?:string, userSelected?:boolean): R4.ICoding {
    let coding: R4.ICoding = {
        code: code,
        display: display,
        system: system,
        userSelected: userSelected,
        version: systemVersion
    }
    return coding
}

/** Codeable Concepts */
export function getExistingTargetCodesInCodeableConcepts(codeableConcepts:R4.ICodeableConcept[], targetCodes:string[]): string[] {
    if (!targetCodes.length || targetCodes.length < 1) return []  // do nothing
    
    let newList:string[] = []
    let codes:string[] = getCodeListInArrayOfCodeableConcepts(codeableConcepts)  // without system -> for every system

    if (codes && codes.length && codes.length > 0) {
        codes.forEach( function(code:string) {
            // using 'indexOf' instead of 'includes' for ES2015 compatibility
            if ( targetCodes.indexOf(code) !== -1 && newList.indexOf(code) === -1 ) {
                newList.push(code)
            }
        })
    }
    return newList
}


// It searchs and adds all codes from every system without duplicates to the given currentCodes
export function addExistingTargetCodesInCodeableConcepts(codeableConcepts:R4.ICodeableConcept[], targetCodes:string[], currentCodes:string[]): string[] {
    if (!targetCodes.length || targetCodes.length < 1) return currentCodes  // do nothing
    
    let codes:string[] = getCodeListInArrayOfCodeableConcepts(codeableConcepts)  // without system -> for every system

    if (codes && codes.length && codes.length > 0) {
        codes.forEach( function(code:string) {
            if ( targetCodes.indexOf(code) !== -1 && currentCodes.indexOf(code) === -1 ) {
                currentCodes.push(code)
            }
        })
    }
    return currentCodes
}


// system is optional but recommended
export function getCodeListInCodeableConcept(codeableConcept:R4.ICodeableConcept|undefined, system?:string): string[]{
    if (!codeableConcept || !codeableConcept.coding || !codeableConcept.coding.length || codeableConcept.coding.length < 1) return [] as string[] // returns empty
    // it gets the codes or put empty {}
    let codes:any[] = []
    codeableConcept.coding.forEach( function(item){
        if (system) {
            if (item.code && item.system==system) codes.push(item.code)
        }
        else if (item.code) codes.push(item.code)  // not filtering by system if codeSystem param has not been passed
    })
    return codes
}

// system is optional but recommended
export function getCodeListInArrayOfCodeableConcepts(codeableConcepts:R4.ICodeableConcept[]|undefined, system?:string): string[] {
    if (!codeableConcepts || !codeableConcepts.length || codeableConcepts.length < 1) return []
    // it gets the codes or put empty {}
    let results:string[] = []
    codeableConcepts.forEach( function(codeableConcept:R4.ICodeableConcept) {
        let codes:string[] = getCodeListInCodeableConcept(codeableConcept, system)
        if (codes.length > 0) results.push(...codes)
    })
    return results
}

// It creates CodeableConcept with display in english and text also in english or in other language if language file is provided
export async function createCodeableConceptWithOptionalLanguage(typeCode:string|undefined, codeSystem:string, customLanguageFile?:any, systemVersion?:string, userSelected?:boolean) : Promise<R4.ICodeableConcept> {
    if (!typeCode) return [] as R4.ICodeableConcept
    // invert order of customLanguageFile and system because system is mandatory in coding
    const internationalDisplay:string = await createDisplayOrTextOfCodeable(typeCode, codeSystem) // international display text in English by default, no customLanguageFile
    //console.log("createCodeableConceptBySystem display = ", display)
    
    let customText:string = internationalDisplay // it puts english as default text
    if (customLanguageFile) customText = await createDisplayOrTextOfCodeable(typeCode, codeSystem, customLanguageFile)
    // console.log("createCodeableConceptBySystem customText = ", customText)

    return createCodeableConcept(typeCode, codeSystem, internationalDisplay, systemVersion, userSelected, customText)
}

export function createCodeableConcept(typeCode:string, codeSystem:string, internationalDisplay:string, systemVersion?:string, userSelected?:boolean, customText?:string):R4.ICodeableConcept{
    let coding:R4.ICoding = createCoding(typeCode, codeSystem, internationalDisplay, systemVersion, userSelected)
    let codeableConcept = {
        coding: [coding],
        text: customText
    }
    return codeableConcept    
}

export async function createCodeableConceptsArrayOfSystem(inputCodes: string[] | undefined, system: string, customLanguageFile?: any): Promise<R4.ICodeableConcept[]> {
    if (!inputCodes || inputCodes.length < 1) return []; // Early return if no valid inputCodes

    const output = await Promise.all(inputCodes.map(async code => {
        return await createCodeableConceptWithOptionalLanguage(code, system, customLanguageFile);
    }));

    return output;
}

// it does not throws an error if empty; it is used to generate several target diseases in a code system for a single CodeableConcept
export async function createCodingArrayOfSystem (inputCodes: string[] | undefined, codeSystem: string, englishData: object): Promise<R4.ICoding[]> {
    if (!inputCodes || inputCodes.length < 1) return []; // Early return if no valid inputCodes

    const output = await Promise.all(inputCodes.map(async typeCode => {
        const internationalDisplay = await createDisplayOrTextOfCodeable(typeCode, codeSystem, englishData);
        return createCoding(typeCode, codeSystem, internationalDisplay);
    }));

    return output;
}
