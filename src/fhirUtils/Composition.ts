/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { v4 as uuidv4 } from 'uuid'
import { CodingSystem } from "../models"
import { Uuid } from "@universal-health-chain/uhc-common-utils-typescript"
import { getDisplayOrTextByCodeLOINC, medicalHistoryClassification } from "./Loinc"

const uuidUtils = new Uuid() 

export class Composition {
    
    constructor(){
    }

    /** First it checks if there is a valid 'Composition' resource (with title, type, date and status)
     * as first resource in the FHIR Bundle document, then return the type code if any or undefined */
    getTypeOfBundleDocumentComposition(fhirBundleDocument:R4.IBundle): string | undefined {
        return getTypeOfBundleDocumentComposition(fhirBundleDocument)
    }

    getCodesOfSections(sections:R4.IComposition_Section[], system:string): string[] {
        return getCodesOfSections(sections, system)
    }
    
    // TODO: manage empty authorReferenceId and typeDocumentCodeLOINC
    createDefaultComposition(authorReferenceId:string, typeDocumentCodeLOINC?:string, id?:string): R4.IComposition {
        return createDefaultComposition(authorReferenceId, typeDocumentCodeLOINC, id)
    }
    
    /** deprecated: create the empty IPS document and then add resources by section
    createEmptyCompositionIPS(authorReferenceId:string): R4.IComposition {
        return createEmptyCompositionIPS(authorReferenceId)
    } */
    
    // TODO: put display and text of the section (translation)
    addResourcesToComposition(composition:R4.IComposition, resources:any[], sectionCode:string, sectionSystem:string): R4.IComposition {
        return addResourcesToComposition(composition, resources, sectionCode)
    }
    
    createEmptyCompositionSection(loincSectionCode:string): R4.IComposition_Section {
        return createEmptyCompositionSection(loincSectionCode)
    }
    
    // It is mandatory to have one and only one code in the section
    addReferencesToCompositionSection(section:R4.IComposition_Section, references:R4.IReference[]): R4.IComposition_Section {
        return addReferencesToCompositionSection(section, references)
    }
    
    // TODO: it does not add the type of the resource in the reference(?)
    getReferencesOfResources(resources:any[]): R4.IReference[] {
        return getReferencesOfResources(resources)
    }
    
    // getSectionByCodeInComposition returns empty if no section found
    getSectionByCodeInComposition(composition:R4.IComposition, loincSectionCode:string): R4.IComposition_Section | undefined {
        return getSectionByCodeInComposition(composition, loincSectionCode)
    }
    
    // It updates the composition with the new section
    putSectionInComposition(composition:R4.IComposition, newSection:R4.IComposition_Section): R4.IComposition {
        return putSectionInComposition(composition, newSection)
    }

}

// ---- FUNCTIONS ----
// NOTE: the exported functions can be used by other managers (classes) ----

/** First it checks if there is a valid 'Composition' resource (with title, type, date and status)
 * as first resource in the FHIR Bundle document, then return the type code if any or undefined */
export function getTypeOfBundleDocumentComposition(fhirBundleDocument:R4.IBundle): string | undefined {
    // first checking if it is a valid composition with title, type, date and status as first resource in the FHIR Bundle document
    if (fhirBundleDocument && fhirBundleDocument.id && fhirBundleDocument.resourceType && fhirBundleDocument.resourceType === 'Bundle'
        && fhirBundleDocument.type && fhirBundleDocument.type === R4.BundleTypeKind._document
        && fhirBundleDocument.entry && fhirBundleDocument.entry.length && fhirBundleDocument.entry.length>0
        && fhirBundleDocument.entry[0].resource && fhirBundleDocument.entry[0].resource.id
        && fhirBundleDocument.entry[0].resource.resourceType && fhirBundleDocument.entry[0].resource.resourceType === 'Composition'
        && fhirBundleDocument.entry[0].resource.type && fhirBundleDocument.entry[0].resource.type.coding
        && fhirBundleDocument.entry[0].resource.type.coding.length && fhirBundleDocument.entry[0].resource.type.coding.length>0
        && fhirBundleDocument.entry[0].resource.type.coding[0].code && fhirBundleDocument.entry[0].resource.status
        && fhirBundleDocument.entry[0].resource.date && fhirBundleDocument.entry[0].resource.date !== ''
        && fhirBundleDocument.entry[0].resource.title && fhirBundleDocument.entry[0].resource.title !== ''
        // && fhirBundleDocument.entry[0].resource.section && fhirBundleDocument.entry[0].resource.section.length>0 && fhirBundleDocument.entry[0].resource.section[0].entry
    ) {
        // TODO: ckeck date and status
        return fhirBundleDocument.entry[0].resource.type.coding[0].code
    } else {
        return undefined
    }
}

// It returns an array of strings with the codes of a specific system in the sections of a Composition
export function getCodesOfSections(sections:R4.IComposition_Section[], system:string): string[] {
    let results:string[] = []
    sections.forEach( function(section:R4.IComposition_Section) {
        if (section.code && section.code.coding && section.code.coding.length > 0) {
            section.code.coding.forEach( function(item:R4.ICoding){
                if (item.code && item.system==system) results.push(item.code)
            })
        }
    })
    return results
}

/** TODO: create title translating the LOINC document type code.
 * The default 'typeDocumentCodeLOINC' is set to '11503-0' (generic 'Medical records') if not provided.
 * The 'id' is autogenerated as UUIDv4 if not provided.
 * The default 'status' is set to 'preliminary' if not provided (draft).
 * Date is the timestamp (ISO string).
*/
export function createDefaultComposition(authorReferenceURN:string, typeDocumentCodeLOINC?:string, typeDocumentDisplay?:string,
    idOrURN?:string, status?:R4.CompositionStatusKind, language?:string
): R4.IComposition {
    if (!typeDocumentCodeLOINC) {
        typeDocumentCodeLOINC = '11503-0'; // generic 'Medical records' type of document if not provided
        typeDocumentDisplay = getDisplayOrTextByCodeLOINC(typeDocumentCodeLOINC)
    } else if (!typeDocumentDisplay) {
        typeDocumentDisplay = getDisplayOrTextByCodeLOINC(typeDocumentCodeLOINC)
    }

    if (!idOrURN) {
        idOrURN = uuidv4()
    }

    if (!status) {
        status = R4.CompositionStatusKind._preliminary
    }
    const date = new Date().toISOString()
    const title = `${typeDocumentDisplay} (${date})`

    return createCompositionWithId(idOrURN, authorReferenceURN, date, title, status,
        typeDocumentCodeLOINC, CodingSystem.loinc, typeDocumentDisplay, language)
}

/** Create composition with mandatory properties and with URN as ID. Title is mandatory, it is not automatically generated */
export function createCompositionWithId(idOrURN:string, authorReferenceURN:string, date:string, title:string,
    status:R4.CompositionStatusKind, typeDocumentCode:string, typeDocumentSystem:string, typeDocumentDisplay?:string, language?:string
): R4.IComposition {
    let composition:R4.IComposition = {
        author: [{reference: authorReferenceURN}],
        date: date,
        id: idOrURN,
        language: language,
        resourceType: 'Composition',
        status: status,
        title: title,
        type: {
            coding: [{
                code: typeDocumentCode,
                display: typeDocumentDisplay,
                system: typeDocumentSystem
            }]
        }
    }

    return composition
}

/** Title example: "Patient Summary as of December 11, 2017 14:30". TODO: if not title, generate it automatically */
function createEmptyCompositionIPS(idOrURN:string, authorReferenceURN:string,
    date:string, status:R4.CompositionStatusKind, title?:string, language?:string)
: R4.IComposition {
    if (!title) {
        title = `Patient Summary (${date})`
    }
    return createCompositionWithId(idOrURN, authorReferenceURN, date, title, status,
        medicalHistoryClassification.ips, CodingSystem.loinc, 'Patient summary Document', language)
}

// TODO: put display and text of the section (translation)
export function addResourcesToComposition(composition:R4.IComposition, resources:any[], sectionCode:string): R4.IComposition {
    // It gets the validated composition to be updated
    let newComposition:R4.IComposition = composition

    // It gets or creates the section
    let section = getSectionByCodeInComposition(newComposition, sectionCode)
    if (!section || !section.code || !section.code.coding || section.code.coding.length <1) {
        section = createEmptyCompositionSection(sectionCode)
    }
    // else section = getSectionByCodeInComposition(newComposition, sectionCode, sectionSystem)    // error if section has no code
    
    // It gets the references to the resources and puts them into the section
    let references:R4.IReference[] = getReferencesOfResources(resources)
    section = addReferencesToCompositionSection(section, references)

    // It updates the section in the composition
    newComposition = putSectionInComposition(newComposition, section)    // error if section does not have any code
     return newComposition
}

export function createEmptyCompositionSection(sectionCode:string): R4.IComposition_Section {
    // console.log("creating new empty section in composition with code "+ sectionCode + " of system " + sectionSystem)
    // TODO: get display and text for the section
    let newSectionCoding:R4.ICoding = {
        code: sectionCode,
        system: CodingSystem.loinc
    }
    let newSection:R4.IComposition_Section = {  // It is a CodeableConcept with a Coding object inside
        // TODO: add title in the user language
        code: {
            coding: [newSectionCoding]
        }
    }
    return newSection
}

// It is mandatory to have one and only one code in the section
export function addReferencesToCompositionSection(section:R4.IComposition_Section, references:R4.IReference[]): R4.IComposition_Section {
    // It makes mandatory the code of the section
    if (!section.code || !section.code.coding || section.code.coding.length != 1 || !section.code.coding[0].code) throw new Error("Invalid section")

    // It initializes the new updated section to add the references
    let updatedSection:R4.IComposition_Section = section

    // It adds the references to the section.entry   
    references.forEach( function(item:R4.IReference){
        if (item.reference) {
            if (!updatedSection.entry) updatedSection.entry = [item]
            else updatedSection.entry.push(item)
        }
    })
    return updatedSection
}


// TODO: it does not add the type of the resource in the reference(?)
function getReferencesOfResources(resources:any[]): R4.IReference[] {
    if (resources.length < 1) return {} as R4.IReference[]
    let references:R4.IReference[] = []
    resources.forEach( function(resource:any){
        if (resource.id) {
            let newReference:R4.IReference = {reference: resource.id}
            references.push(newReference)
        }
    })
    return references
}


/** getSectionByCodeInComposition returns undefined if no section found */
export function getSectionByCodeInComposition(composition:R4.IComposition, loincSectionCode:string): R4.IComposition_Section | undefined {
    if (!composition.section || composition.section.length < 1) return undefined

    let result
    composition.section.forEach( function(section:R4.IComposition_Section){
        if (section.code && section.code.coding && section.code.coding.length > 0) {
            section.code.coding.forEach( function(sectionCoding:R4.ICoding) {
                // It looks for the first section that matchs with the code (no duplicated sections)
                if (sectionCoding.code == loincSectionCode) result = section
            })
        }
    })
    return result
}

// It updates the composition with the new section
export function putSectionInComposition(composition:R4.IComposition, newSection:R4.IComposition_Section): R4.IComposition {
    // It checks if the new section has a code
    if (!newSection.code || !newSection.code.coding || newSection.code.coding.length != 1 || !newSection.code.coding[0].code) throw new Error("Invalid new section")
    
    // It updates the composition with the new section
    let newComposition:R4.IComposition = composition
    if (!newComposition.section || newComposition.section.length < 1) {
        // it does not have any section so create it
        newComposition.section = [newSection]
    }
    else {
        // some section(s) exists so replace it if the section is found or add the section if it is not found
        let codes:string[] = getCodesOfSections(newComposition.section,  CodingSystem.loinc)
        if (!codes.includes(newSection.code.coding[0].code)) newComposition.section.push(newSection)
        else newComposition = replaceSectionInComposition(newComposition, newSection)
    }

    return newComposition
}

function replaceSectionInComposition(composition:R4.IComposition, newSection:R4.IComposition_Section): R4.IComposition {
    // It checks the given composition to be updated

    let newComposition:R4.IComposition = composition
    if (!newComposition.section || newComposition.section.length < 1) throw new Error("Invalid composition")

    // It checks if the new section has a code
    let newSectionCode:string
    if (!newSection.code || !newSection.code.coding || newSection.code.coding.length != 1 || !newSection.code.coding[0].code) throw new Error("Invalid new section")
    else newSectionCode = newSection.code.coding[0].code

    // It replaces the composition with the new section
    newComposition.section.some( function(item:R4.IComposition_Section, index, sectionsArray) {
        if (item.code && item.code.coding && item.code.coding.length==1 && item.code.coding[0].code == newSectionCode){
            // Replace the section
            sectionsArray[index] = newSection
            return true
        }
    })
    return newComposition
}
