/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"

export const systemICD10 = "http://hl7.org/fhir/sid/icd-10"
export const systemLOINC = "http://loinc.org"
export const systemSNOMED = "http://snomed.info/sct"
export const systemUCUM = "http://unitsofmeasure.org"

/** Coding  */

export function getCodingsBySystem(coding: R4.ICoding[], system:string): R4.ICoding[]{
    let results:R4.ICoding[] = []
    coding.forEach(function(item){
        if (item.system==system) results.push(item)
    })
    return results
}

export function getSingleCodingFHIRBySystem(coding: R4.ICoding[], system:string): R4.ICoding{
    let result = coding.some(function(item){
        if (item.system==system) return item
    })
    return result as R4.ICoding
}

export function getLOINCCoding(coding: R4.ICoding[]): R4.ICoding[]{
    let results:R4.ICoding[] = []
    coding.forEach(function(item){
        if (item.system == systemLOINC) results.push(item)
    })
    return results
}

export function getSingleLOINCCoding(coding: R4.ICoding[]): R4.ICoding{
    let result = coding.some(function(item){
        if (item.system == systemLOINC) return item
    })
    return result as R4.ICoding
}

// returns all the SNOMED CT coding found in an array of R4.ICoding
export function getSNOMEDCoding(coding: R4.ICoding[]): R4.ICoding[]{
    let results:R4.ICoding[] = []
    coding.forEach(function(item){
      if (item.system == systemSNOMED) results.push(item)
    })
    return results
}

// returns only the first SNOMED CT coding found in an array of R4.ICoding
export function getSingleSNOMEDCoding(coding: R4.ICoding[]): R4.ICoding{
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

/** Quantity */

export function createSimpleQuantityByCodeMg(number:number){
    return createSimpleQuantity(number, "mg")
}

export function createSimpleQuantityByCodeMl(number:number){
    return createSimpleQuantity(number, "ml")
}

export function createSimpleQuantity(number:number, code:string){
    let simpleQuantityInMl:R4.IQuantity = {
        value: number,
        system: systemUCUM, // System that defines coded unit form
        code:   code  // Coded form of the unit ("mg", "ml", ...)
        // unit: "mL", // Unit string representation
    }
    return simpleQuantityInMl
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

// It returns an array of strings with the codes of a specific system in the sections of a Composition
export function getCodesOfSections(sections:R4.IComposition_Section[], system:string): string[] {
    let results:string[] = []
    sections.forEach( function(section:R4.IComposition_Section) {
        if (section.code && section.code.coding && section.code.coding.length > 1) {
            section.code.coding.forEach( function(item:R4.ICoding){
                if (item.code && item.system==system) results.push(item.code)
            })
        }
    })
    return results
}

export function createCodeableConceptsFromSNOMED(codes:string[], language?: string): R4.ICodeableConcept[] {
    let codeableConcepts:R4.ICodeableConcept[] = []
    if (codes.length && codes.length>0) {
        codes.forEach(function (code:string) {
            let codeableConcept:R4.ICodeableConcept = createCodeableConceptFromSNOMED(code, language)
            if (codeableConcept && codeableConcept.coding && codeableConcept.coding.length && codeableConcept.coding.length>0) {
                codeableConcepts.push(codeableConcept)
            }
        })
    }
    return codeableConcepts
}

export function createCodeableConceptFromSNOMED(code:string, language?: string): R4.ICodeableConcept{
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

export function createCodeableConceptBySystem(code:string, system:string) : R4.ICodeableConcept {
    let output:R4.ICodeableConcept = {}
    if (code == "") return output

    let newCoding:R4.ICoding = createCoding(code, system)
    // put the Coding in the CodeableConcept and return
    output = { coding: [newCoding] }
    return output
}

/** References */

export function createReferenceIdentifiers(identifiers:string[], system:string): R4.IReference[] {
    if (!identifiers.length || identifiers.length < 1) throw new Error ("Missing identifiers")

    let references:R4.IReference[] = []

    identifiers.forEach(function(item){
        let newIdentifier:R4.IIdentifier = {
            value: item,
            system: system
        }
        let newReference:R4.IReference = { identifier: newIdentifier }

        if (!references) references = [newReference]    // if not initialized
        else references.push(...references, newReference)
    })

    return references
}

export function getReferencesByIdentifierAndSystem(referencesFHIR:R4.IReference[], system:string) : string[] {
    if (!referencesFHIR.length || referencesFHIR.length < 1) throw new Error ("Missing FHIR References")

    let identifierReference:string[] = []
    referencesFHIR.forEach(function(item){
        if (item.identifier && item.identifier.system==system && item.identifier.value) {
            identifierReference.push(item.identifier.value)
        }
    })
    return identifierReference
}

export function createReferenceLiteralURLs(literalReferences:string[]){
    if (!literalReferences.length || literalReferences.length < 1) throw new Error ("Missing literal references")

    let referencesFHIR:R4.IReference[] = []

    literalReferences.forEach(function(item){
        let newReference:R4.IReference = { reference: item }

        if (!referencesFHIR) referencesFHIR = [newReference]    // if not initialized
        else referencesFHIR.push(...referencesFHIR, newReference)
    })

    return referencesFHIR
}

export function getLiteralReferences(referencesFHIR:R4.IReference[]) : string[] {
    if (!referencesFHIR.length || referencesFHIR.length < 1) throw new Error ("Missing FHIR References")

    let literalReferences:string[] = []
    referencesFHIR.forEach(function(item){
        if (item.reference) literalReferences.push(item.reference)
    })
    return literalReferences
}

