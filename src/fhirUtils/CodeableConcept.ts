/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { systemLOINC, systemSNOMED } from "./CommonFHIR"

export class CodeableConcept {
    constructor() {
    }

    getCodingsBySystem(coding: R4.ICoding[], system:string): R4.ICoding[]{
        return getCodingsBySystem(coding, system)
    }

    getSingleCodingBySystem(coding: R4.ICoding[], system:string): R4.ICoding{
        return getSingleCodingBySystem(coding, system)
    }

    getCodingsLOINC(coding: R4.ICoding[]): R4.ICoding[]{
        return getCodingsLOINC(coding)
    }

    getSingleCodingLOINC(coding: R4.ICoding[]): R4.ICoding{
        return getSingleCodingLOINC(coding)
    }

    getCodingSNOMED(coding: R4.ICoding[]): R4.ICoding[]{
        return getCodingSNOMED(coding)
    }

    getSingleCodingSNOMED(coding: R4.ICoding[]): R4.ICoding{
        return getSingleCodingSNOMED(coding)
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

    // TODO: put display and / or custom text
    createSingleCodeableConceptSNOMED(code:string, language?: string): R4.ICodeableConcept{
        return createSingleCodeableConceptSNOMED(code, language)
    }

    // TODO: put display for every code
    createCodeableConceptsFromSNOMED(codes:string[], language?: string): R4.ICodeableConcept[] {
        return createCodeableConceptsFromSNOMED(codes, language)
    }

    createCodeableConceptBySystem(code:string, system:string): R4.ICodeableConcept {
        return createCodeableConceptBySystem(code, system)
    }

    createArrayOfCodeableConceptsOfSystem(inputCodes:string[], system:string): R4.ICodeableConcept[] {
        return createArrayOfCodeableConceptsOfSystem(inputCodes, system)
    }
}

/** Coding  */

export function getCodingsBySystem(coding: R4.ICoding[], system:string): R4.ICoding[]{
    let results:R4.ICoding[] = []
    coding.forEach(function(item){
        if (item.system==system) results.push(item)
    })
    return results
}

export function getSingleCodingBySystem(coding: R4.ICoding[], system:string): R4.ICoding{
    let result = coding.some(function(item){
        if (item.system==system) return item
    })
    return result as R4.ICoding
}

export function getCodingsLOINC(coding: R4.ICoding[]): R4.ICoding[]{
    let results:R4.ICoding[] = []
    coding.forEach(function(item){
        if (item.system == systemLOINC) results.push(item)
    })
    return results
}

export function getSingleCodingLOINC(coding: R4.ICoding[]): R4.ICoding{
    let result = coding.some(function(item){
        if (item.system == systemLOINC) return item
    })
    return result as R4.ICoding
}

// returns all the SNOMED CT coding found in an array of R4.ICoding
export function getCodingSNOMED(coding: R4.ICoding[]): R4.ICoding[]{
    let results:R4.ICoding[] = []
    coding.forEach(function(item){
      if (item.system == systemSNOMED) results.push(item)
    })
    return results
}

// returns only the first SNOMED CT coding found in an array of R4.ICoding
export function getSingleCodingSNOMED(coding: R4.ICoding[]): R4.ICoding{
    let result:R4.ICoding = {}
    coding.some(function(item){
      if (item.system == systemSNOMED) result=item
    })
    return result
}

export function createCoding(code:string, system:string): R4.ICoding {
    // it gets the display if any
    let display:string = ""
    switch (system) {
      // case  IndexHL7.CODE_SYSTEMS.LOINC: display = getDisplayFromLOINC(code)
      // case  IndexHL7.CODE_SYSTEMS.SNOMED: display = getDisplayFromSNOMED(code)
    }
  
    let coding: R4.ICoding = {}
    coding.system = system
    coding.code = code
    if (display != "") coding.display = display
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

export function createSingleCodeableConceptSNOMED(code:string, language?: string): R4.ICodeableConcept{
    let coding: R4.ICoding = createCoding(code, systemSNOMED)
    if (!coding || !coding.code || coding.code == "") return {} as R4.ICodeableConcept

    let codeableConcept: R4.ICodeableConcept = {}
    // FHIR CodeableConcept contais an array of coding objects for different CODE_SYSTEMS
    codeableConcept.coding = [coding]
    if (!language) return codeableConcept   // not needed a local translation
    
    // it gets the local translation if any
    // let text:string = getLocaleTextFromSNOMED(code, language)
    // if (!text || text == "") return codeableConcept // no local translation provided
    // codeableConcept.text = text
    return codeableConcept
}

export function createCodeableConceptsFromSNOMED(codes:string[], language?: string): R4.ICodeableConcept[] {
    let codeableConcepts:R4.ICodeableConcept[] = []
    if (codes.length && codes.length>0) {
        codes.forEach(function (code:string) {
            let codeableConcept:R4.ICodeableConcept = createSingleCodeableConceptSNOMED(code, language)
            if (codeableConcept && codeableConcept.coding && codeableConcept.coding.length && codeableConcept.coding.length>0) {
                codeableConcepts.push(codeableConcept)
            }
        })
    }
    return codeableConcepts
}

export function createCodeableConceptBySystem(code:string, system:string) : R4.ICodeableConcept {
    let output:R4.ICodeableConcept = {}
    if (code == "") return output

    let newCoding:R4.ICoding = createCoding(code, system)
    // put the Coding in the CodeableConcept and return
    output = { coding: [newCoding] }
    return output
}

export function createArrayOfCodeableConceptsOfSystem(inputCodes:string[], system:string) : R4.ICodeableConcept[] {
    if (!inputCodes.length || inputCodes.length < 1) throw new Error ("Missing codes")
    
    let output:R4.ICodeableConcept[] = []

    inputCodes.forEach(function(item){
        let newCoding:R4.ICoding = createCoding(item, system)
        
        // put the Coding in a CodeableConcept
        let newCodeableConcept:R4.ICodeableConcept = { coding: [newCoding] }

        // put the CodeableConcept in the output array
        if (!output) output = [newCodeableConcept]    // if not initialized
        else output.push(...output, newCodeableConcept)
    })

    return output
}