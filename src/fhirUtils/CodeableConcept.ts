/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { systemLOINC, systemSNOMED } from "./CommonFHIR"
import { getDisplayOrTextByCodeHL7 } from "./Hl7"
import { getDisplayOrTextByCodeLOINC } from "./Loinc"
import { getDisplayOrTextByCodeSNOMED } from "./Snomed"

export class CodeableConcept {
    constructor() {
    }

    getCodingsBySystem(codeableConcept:R4.ICodeableConcept, system:string): R4.ICoding[]{
        return getCodingsBySystem(codeableConcept, system)
    }

    getSingleCodingBySystem(codeableConcept:R4.ICodeableConcept, system:string): R4.ICoding{
        return getSingleCodingBySystem(codeableConcept, system)
    }

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

    createCodeableConceptBySystem(code:string, system:string): R4.ICodeableConcept {
        return createCodeableConceptBySystem(code, system)
    }

    createArrayOfCodeableConceptsOfSystem(inputCodes:string[], system:string): R4.ICodeableConcept[] {
        return createArrayOfCodeableConceptsOfSystem(inputCodes, system)
    }
}

/** Coding  */

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

// 'display' SHALL BE English (default) but 'text' can be any custom language
export function createDisplayOrTextOfCodeable(code:string, system:string, customLanguageFile?:any):string {
    let systemType:string = system
    if (String(system).startsWith("http://hl7.org")) systemType = "http://hl7.org"
    // console.log("createDisplayOrText of code " + code + " and system " + system)

    // it checks if HL7 or others
    let result:string = ""
    switch (String(systemType)) {
        case systemLOINC: {
            result = getDisplayOrTextByCodeLOINC(code, customLanguageFile)
            // console.log("getDisplayOrTextByCodeLOINC = ", result)
            break
        }
        case systemSNOMED: {
            result = getDisplayOrTextByCodeSNOMED(code, customLanguageFile)
            // console.log("getDisplayOrTextByCodeSNOMED = ", result)
            break
        }
        case "http://hl7.org": {
            result = getDisplayOrTextByCodeHL7(code, customLanguageFile, system)
            // console.log("getDisplayOrTextByCodeHL7 = ", result)
            break
        }
    }  
    return result
}

export function createCoding(code:string, system:string, display?:string): R4.ICoding {
    let coding: R4.ICoding = {
        system: system,
        code: code
    }
    if (display) coding.display = display
    
    return coding
}

/** Codeable Concepts */

// It searchs and returns all codes from every system without duplicates
export function getExistingTargetCodesInCodeableConcepts(codeableConcepts:R4.ICodeableConcept[], targetCodes:string[]): string[] {
    if (!targetCodes.length || targetCodes.length < 1) return []  // do nothing
    
    let newList:string[] = []
    let codes:string[] = getCodeListInArrayOfCodeableConcepts(codeableConcepts)  // without system -> for every system
    if (codes && codes.length && codes.length > 0) {
        codes.forEach( function(code:string) {
            // //console.log("found code = ", code)
            if ( targetCodes.includes(code) && (!newList.includes(code)) ) newList.push(code) // //console.log("added code = ", code)
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
            // //console.log("found code = ", code)
            if ( targetCodes.includes(code) && (!currentCodes.includes(code)) ) currentCodes.push(code) // //console.log("added code = ", code)
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
export function createCodeableConceptBySystem(code:string, system:string, customLanguageFile?:any) : R4.ICodeableConcept {
    let codeableConcept:R4.ICodeableConcept = {}
    if (!code) return codeableConcept

    // invert order of customLanguageFile and system because system is mandatory in coding
    const display:string = createDisplayOrTextOfCodeable(code, system) // international display text in English by default, no customLanguageFile
    console.log("createCodeableConceptBySystem display = ", display)
    let customText:string = display
    if (customLanguageFile) customText = createDisplayOrTextOfCodeable(code, system, customLanguageFile)
    console.log("createCodeableConceptBySystem customText = ", customText)

    // It puts the Coding and the text into the CodeableConcept and returns
    let newCoding:R4.ICoding = createCoding(code, system, display)
    codeableConcept = {
        coding: [newCoding],
        text: customText
    }

    return codeableConcept
}

export function createArrayOfCodeableConceptsOfSystem(inputCodes:string[], system:string, customLanguageFile?:any) : R4.ICodeableConcept[] {
    if (!inputCodes.length || inputCodes.length < 1) throw new Error ("Missing codes")
    
    let output:R4.ICodeableConcept[] = []

    inputCodes.forEach(function(code){
        let newCodeableConcept:R4.ICodeableConcept = createCodeableConceptBySystem(code, system, customLanguageFile)

        // put the CodeableConcept in the output array
        if (!output) output = [newCodeableConcept]    // if not initialized
        else output.push(...output, newCodeableConcept)
    })

    return output
}