/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { medicalHistoryClassification } from "./Loinc"
import { addResourcesToComposition, getSectionByCodeInComposition, createEmptyCompositionSection, 
    addReferencesToCompositionSection, putSectionInComposition, getTypeOfBundleDocumentComposition, createCompositionWithId, updateComposition
} from "./Composition"
import {getCodeListInCodeableConcept } from "./CodeableConcept"
import { getCleanIdByFhirResource, getCleanId } from "./CommonFHIR"
import { CodingSystem } from "../models"

// TODO: isValidFhirBundleDocument


export class Bundle {
    constructor() {
    }

    /** First it checks if there is a valid 'Composition' resource (with title, type, date and status)
     * as first resource in the FHIR Bundle document, then return the type code if any or undefined */
    getTypeOfBundleDocumentComposition(fhirBundleDocument:R4.IBundle): string | undefined {
        return getTypeOfBundleDocumentComposition(fhirBundleDocument)
    }

    /** it does not validate bundle document properties or Composition mandatory properties */
    getBundleDocumentComposition(fhirBundleDocument:R4.IBundle | undefined): R4.IComposition | undefined {
        return getBundleDocumentComposition(fhirBundleDocument)
    }

    /** First it checks if there is a valid 'Composition' resource (with title, type, date and status)
     * as first resource in the FHIR Bundle document, then return the type code if any or undefined */
    getBundleDocumentCompositionWithValidation(fhirBundleDocument:R4.IBundle | undefined): R4.IComposition | undefined {
        return getBundleDocumentCompositionWithValidation(fhirBundleDocument)
    }

    /** The first resource type in the bundle document must be a Composition of resources (the index): http://hl7.org/fhir/bundle.html */
    isIPS(bundleDocument:R4.IBundle): boolean {
        return isIPS(bundleDocument)
    }

    hasSections(bundleDocument:R4.IBundle): boolean {
        return hasSections(bundleDocument)
    }

    /**
     * It returns the code of the section or empty string ("") if not found.
     * Optionally, composition can be passed as parameter, but it is not required.
     */
    getSectionCodeForResourceId(bundleDocument:R4.IBundle, resourceId: string | undefined, composition?:R4.IComposition): string {
        return getSectionCodeForResourceIdInBundle(bundleDocument, resourceId, composition)
    }

    /**
     * The permanent ID of a FHIR Document across any system
     * is the ID of the Composition resource as index of the document,
     * but not the bundle ID which can change across systems
     * and also is removed in canonicalizaton before signature (FHIR specifications).
     */
    getCompositionCleanID = (fhirBundle:R4.IBundle | undefined): string => getCleanIdOfDocumentComposition(fhirBundle)

    getTimestamp(fhirBundle:R4.IBundle): string {
        return getTimestamp(fhirBundle)
    }

    /**
     * 'defaultSectionLOINC' is used in case the FHIR Bundle does not have any section in a composition resource.
     * 'defaultServiceType' is used in case the FHIR resource does not have meta.serviceType as creator healthcare service of the resource.
     */
    getResourcesWithFilters(fhirBundle:R4.IBundle, defaultSectionLOINC?: string, defaultServiceType?:string,
        excludeResourceTypes?:string[], includeResourceTypes?:string[], withSectionsLOINC?:string[], fromServiceTypes?:string[], withCodes?:string[]
    ): any[] {
        return getResourcesWithFilters(fhirBundle, defaultSectionLOINC, defaultServiceType,
           excludeResourceTypes, includeResourceTypes, withSectionsLOINC, fromServiceTypes, withCodes)
    }

    getReferencesInSection(section:R4.IComposition_Section): R4.IReference[] {
        return  getReferencesInSection(section)
    }

    getResourcesInSection(bundleDocument:R4.IBundle, sectionCode:string): any[] {
        return getResourcesWithFilters(bundleDocument, undefined, undefined,
        undefined, undefined, [sectionCode], undefined, undefined)
    }

    getAllResources(bundle: R4.IBundle): any[] {
        // return getAllResourcesInBundle(bundle)
        return getResourcesWithFilters(bundle, undefined, undefined,
            undefined, undefined, undefined, undefined, undefined)
    }

    getAllResourcesWithoutCompositionOrMessageHeader(bundle: R4.IBundle): any[] {
        // return getAllResourcesWithoutCompositionOrMessageHeader(bundle)
        const excludedResources = ['Composition', 'MessageHeader']
        return getResourcesWithFilters(bundle, undefined, undefined,
            excludedResources, undefined, undefined, undefined, undefined)
    }

    // TODO review, use getResourcesByTypes instead of getResourcesWithFilters to avoid circular dependencies
    /** It gets resources with additional metadata */
    getResourcesByTypes(bundle: R4.IBundle, resourceTypes:string[]): any[] {
        // return getResourcesByTypes(bundle, resourceTypes)
        return getResourcesWithFilters(bundle, undefined, undefined,
            undefined, resourceTypes, undefined, undefined, undefined)
    }

    getResourceByIdInBundle(resourceId:string, bundle:R4.IBundle): any{
        return getResourceByIdInBundle(resourceId, bundle)
    }

    /** It returns an arry of IDs, splitting the ID by "/" and getting the last string after the slash */
    getResourceIdsInBundle(bundle: R4.IBundle): string[] {
        return getResourceIdsInBundle(bundle)
    }

    getResourceReferencesBySectionCodeLOINC(bundleDocumentIPS: R4.IBundle, sectionCode: string): string[] {
        return getResourceReferencesBySectionCodeLOINC(bundleDocumentIPS, sectionCode)
    }

    /** It replaces the given resource in the right Bundle.entry without generating Bundle.entry[].fullUrl */
    replaceResourceById(resource:any, bundle:R4.IBundle): R4.IBundle{
        return replaceResourceById(resource, bundle)
    }

    getMediaInBundle(bundle: R4.IBundle): R4.IMedia[]{
        return getMediaInBundle(bundle)
    }

    addEntriesToBundle(bundle:R4.IBundle, entries:R4.IBundle_Entry[]): R4.IBundle {
        return addEntriesToBundle(bundle, entries)
    }

    addEntriesBySection(bundleDocument:R4.IBundle, bundleEntries:R4.IBundle_Entry[], sectionCode:string, sectionSystem:string): R4.IBundle {
        return addEntriesBySection(bundleDocument, bundleEntries, sectionCode, sectionSystem)
    }

    /** It adds a bundle resource including Composition or HeaderMessage and skips if already present */
    addResourceAsBundleEntry(bundle:R4.IBundle, resource:any, fullUrl?:string): R4.IBundle{
        return addResourceAsBundleEntry(bundle, resource, fullUrl)
    }

    /** It adds resources to a given health section but excluding some resources by its type.
     * It returns error if composition does not exits in the document bundle.
     * 'fullUrlPrefix' can be passed for creating the 'fullUrl' in the bundle entries.
     * It uses addResourcesToComposition, addResourcesWithOptions and updateComposition.
     * TODO: generate reference as "resourceType/id"
     */
    addResourcesToSection(bundleDocument:R4.IBundle, resources:any[], sectionCode:string, excludeResources?:string[]): R4.IBundle {
        return addResourcesToSection(bundleDocument, resources, sectionCode, excludeResources)
    }

    /** It adds the resource to the composition, updates the composition and adds the resource as bundle entry */
    addResourceToSection(bundleDocument:R4.IBundle, resource:any, sectionCode:string, fullUrl?:string): R4.IBundle {
        return addResourceToSection(bundleDocument, resource, sectionCode, fullUrl)
    }

    /** It adds resources both for Bundle document, Bundle composition and Bundle Message.
     * If sectionCodeLOINC is provided then the Bundle SHALL be a document with composition or it will throw an error */
    addResourcesWithOptions(bundle:R4.IBundle, resources?:any[], excludeResources?:string[], sectionCodeLOINC?:string, fullUrlPrefix?:string): R4.IBundle {
        return addResourcesWithOptions(bundle, resources, sectionCodeLOINC, excludeResources, fullUrlPrefix)
    }

    /** it checks if composition exists and replace it or error. TODO: verify the ID? */
    updateComposition(bundleDocument:R4.IBundle, composition:R4.IComposition): R4.IBundle{
        return updateComposition(bundleDocument, composition)
    }

    /** Creates a Bundle document with all mandatory properties in the document 'Composition' resource (the index) */
    createBundleDocumentAndCompositionWithIds(bundleId:string, compositionId: string, authorReferenceId:string, date:string, title:string, status:R4.CompositionStatusKind,
        typeDocumentCode:string, typeDocumentSystem:string, typeDocumentDisplay:string, language?: string, resources?:any[], excludeResources?:string[]
    ): R4.IBundle {
        return createBundleDocumentAndCompositionWithIds(bundleId, compositionId, authorReferenceId, date, title, status,
            typeDocumentCode, typeDocumentSystem, typeDocumentDisplay, typeDocumentDisplay, resources, excludeResources
        )
    }


} // end class Bundle

// ---- FUNCTIONS ----
// NOTE: the exported functions can be used by other external managers (classes)

/** Creates a Bundle document with all mandatory properties in the document 'Composition' resource (the index) */
export function createBundleDocumentAndCompositionWithIds(bundleId:string, compositionId: string, authorReferenceId:string, date:string, title:string, status:R4.CompositionStatusKind,
    typeDocumentCode:string, typeDocumentSystem:string, typeDocumentDisplay:string, language?: string, resources?:any[], excludeResources?:string[]
): R4.IBundle {
    // console.log(`createBundleDocumentWithCompositionAndURNs with ${resources.length} resources`)
    let basicComposition:R4.IComposition = createCompositionWithId(compositionId, authorReferenceId, date, title, status,
        typeDocumentCode, typeDocumentSystem, typeDocumentDisplay, language)
    //console.log("basicComposition = ", basicComposition)

    // It creates the bundle documment, adds the composition and the additional resources
    let bundle = createEmptyBundleWithId(bundleId, R4.BundleTypeKind._document)
    bundle = addResourceAsBundleEntry(bundle, basicComposition)

    // TODO: addAdditionalResourcesToBundle SHOULD ADD RESOURCES TO COMPOSITION
    if (resources && resources.length && resources.length >0) bundle = addResourcesWithOptions(bundle, resources)
    
    // console.log("createBundleDocumentWithComposition resulting bundle= ", JSON.stringify(bundle))
    return bundle
}

/** createEmptyBundleWithId does not adds composition as the default Bundle.entry[0] resource (use createBundleDocumentWithCompositionAndId for that) */
function createEmptyBundleWithId(id:string, bundleType:R4.BundleTypeKind, language?:string): R4.IBundle{
    let bundle: R4.IBundle = {
        id: id,
        resourceType: "Bundle",
        timestamp: new Date().toISOString(),
        type: bundleType,
    }
    if (language) bundle.language = language
    return bundle
}

/** deprecated: use createBundleDocumentAndCompositionWithIds */
/*
export function createBundleDocumentWithComposition(authorReferenceId:string, typeDocumentCodeLOINC?:string, resources?:any[]): R4.IBundle {
    // console.log("createBundleDocumentWithComposition with resources = ", JSON.stringify(resources))
    let emptyComposition:R4.IComposition = createDefaultComposition(authorReferenceId, typeDocumentCodeLOINC)
    //console.log("emptyComposition = ", emptyComposition)

    // It creates the bundle documment, adds the composition and the additional resources
    let bundle = createEmptyBundle(R4.BundleTypeKind._document)
    bundle = addResourceToBundle(bundle, emptyComposition)

    // TODO: addAdditionalResourcesToBundle SHOULD ADD RESOURCES TO COMPOSITION
    if (resources && resources.length && resources.length >0) bundle = addResourcesToBundle(bundle, resources)
    
    // console.log("createBundleDocumentWithComposition resulting bundle= ", JSON.stringify(bundle))
    return bundle
}
*/

// -------------------
// TODO: remove old getResources functions
// -------------------

/** It filters resources by types adding section code LOINC from 1) Composition type, 2) given defaultCodeLOINC or 3) generic 'Medical records' */
export function getResourcesByTypesWithOptionalMetadata(fhirBundle: R4.IBundle, includeResourceTypes:string[], defaultCodeLOINC?: string): any[] {
    // not using getResourcesWithFilters here to avoid circular dependencies
    let results: any[] = []
    
    if (fhirBundle && fhirBundle.resourceType === "Bundle" && fhirBundle.entry && fhirBundle.entry.length
        && fhirBundle.entry.length>0 && includeResourceTypes.length && includeResourceTypes.length>0)
    {
        fhirBundle.entry.forEach( function(entry:R4.IBundle_Entry){
            if (entry.resource && entry.resource.resourceType && includeResourceTypes.includes(entry.resource.resourceType)){
                // console.log("resource by type found: ", entry.resource.resourceType)
                let sectionCodeLOINC = getSectionCodeForResourceIdInBundle(fhirBundle, entry.resource.id)
                if (!sectionCodeLOINC) {
                    if (defaultCodeLOINC) {
                        sectionCodeLOINC = defaultCodeLOINC
                    } else {
                        sectionCodeLOINC = medicalHistoryClassification.defaultMedicalRecords
                    }
                }
                const resource = getResourceWithOptionalMetaData(entry.resource, fhirBundle, medicalHistoryClassification.defaultMedicalRecords);
                results.push(resource)
            }
        })
    }
    return results
}

/**
 * 'defaultSectionLOINC' is used in case the FHIR Bundle does not have any section in a composition resource.
 * 'defaultServiceType' is used in case the FHIR resource does not have meta.serviceType as creator healthcare service of the resource.
 */
export function getResourcesWithFilters(fhirBundle:R4.IBundle, defaultSectionLOINC?: string, defaultServiceType?:string,
    excludeResourceTypes?:string[], includeResourceTypes?:string[], withSectionsLOINC?:string[], fromServiceTypes?:string[], withCodes?:string[]
): any[] {
    // it adds meta.section if the document has sections or the LOINC section code of the biography if not

    const containsSections = hasSections(fhirBundle)
    
    // it puts meta.section for every resource, if available
    let resources = getResourcesWithOptionalMetadata(fhirBundle)

    // exclude some resources or include only the desired resources
    if (excludeResourceTypes && excludeResourceTypes.length && excludeResourceTypes.length>0) {
        let filtered:any[] = [] 
        resources.forEach((fhirResource:any) => {
            if (fhirResource.resourceType && !excludeResourceTypes.includes(fhirResource.resourceType)){
                // getting the LOINC section for the resource
                const result = getResourceWithOptionalMetaData(fhirResource, fhirBundle, defaultSectionLOINC, defaultServiceType)
                // console.log("match not excluded resource: ", resource.resourceType)    
                filtered.push(result)
            }
        })
        resources = filtered // overwritting with the filtered ones
    } else if (includeResourceTypes && includeResourceTypes.length && includeResourceTypes.length>0){
        let filtered:any[] = [] 
        resources.forEach((fhirResource:any) => {
            if (fhirResource.resourceType && includeResourceTypes.includes(fhirResource.resourceType)){
                // getting the LOINC section for the resource    

                // console.log("match for include resource: ", resource.resourceType)    
                filtered.push(fhirResource)
            }
        })
        resources = filtered // overwritting with the filtered ones
    }

    // include only resources from some health sections 
    if (withSectionsLOINC) {
        let filtered:any[] = [] 
        resources.forEach((resource:any) => {
            if (resource.meta && resource.meta.section && withSectionsLOINC.includes(resource.meta.section)){
                // console.log("match resource by LOINC section: ", resource.meta.section)    
                filtered.push(resource)
            }
        })
        resources = filtered // overwritting with the filtered ones
    }

    // include only resources from some healcare service categories
    if (fromServiceTypes) {
        let filtered:any[] = [] 
        resources.forEach((resource:any) => {
            if (resource.meta && resource.meta.serviceType && fromServiceTypes.includes(resource.meta.serviceType)){
                // console.log("match resource by service type: ", resource.meta.serviceType)    
                filtered.push(resource)
            }
        })
        resources = filtered // overwritting with the filtered ones
    }

    /* TODO
    if (withCodes) {
        let filtered:any[] = []
        resources.forEach((resource:any) => {
        if (resource.meta && resource.meta.codes) {
        }
        })
        resources = filtered // overwritting with the filtered ones
    } */
    return resources
}

export function getResourcesInSection(fhirBundle:R4.IBundle, loincSectionCode:string): any[] {
    /* do not use it to avoid circular dependencies
    return getResourcesWithFilters(bundle, undefined, undefined,
        undefined, undefined, [loincSectionCode], undefined, undefined)
    */
    let resources:any[] = []

    let composition = getBundleDocumentComposition(fhirBundle)
    if (!composition){
        return resources
    }

    let sectionInComposition = getSectionByCodeInComposition(composition, loincSectionCode)
    // It checks if the section has references to resources
    if (!sectionInComposition || !sectionInComposition.entry || sectionInComposition.entry.length < 1){
        return resources // empty
    }
    
    let sectionReferences:R4.IReference[] = sectionInComposition.entry
    resources = getResourcesByReferences(fhirBundle, sectionReferences) // search resources by id in a Bundle from the array of references
    return resources
    // */
}

function getResourcesWithOptionalMetadata(fhirBundle: R4.IBundle, defaultSectionLOINC?:string, defaultServiceType?:string): any[] {
    /*
    const test = getResourcesWithFilters(fhirBundle, defaultSectionLOINC, defaultServiceType,
        undefined, undefined, undefined, undefined, undefined)
    */
    if (!fhirBundle || fhirBundle.resourceType != "Bundle" || !fhirBundle.entry || !fhirBundle.entry.length || fhirBundle.entry.length<1) return []  // or error?

    let results: any[] = []
    fhirBundle.entry.forEach( function(entry:R4.IBundle_Entry){
      if (entry.resource && entry.resource.resourceType) {
        const result = getResourceWithOptionalMetaData(entry.resource, fhirBundle, defaultSectionLOINC, defaultServiceType)
        results.push(result)
      }
    })
    return results
    // */
}

//----

/** It gets the section code LOINC for the resource from the Bundle document Composition, use the given 'defaultSectionLOINC' if not found or generic 'Medical records' if none */
export function getResourceWithOptionalMetaData(fhirResource:any, fhirBundle:R4.IBundle, defaultSectionLOINC?:string, defaultServiceType?:string){
    const containsSections = hasSections(fhirBundle)
    
    // getting the LOINC section for the resource
    let loincSectionCode:string = ""
    if (containsSections) {
        loincSectionCode = getSectionCodeForResourceIdInBundle(fhirBundle, fhirResource.id)
    } else if (defaultSectionLOINC) {
        loincSectionCode = defaultSectionLOINC
    } else {
        loincSectionCode = medicalHistoryClassification.defaultMedicalRecords
    }
    
    // setting LOINC section in the meta data of the resource (if any)
    if (loincSectionCode !== "") {
      fhirResource.meta = { 
        ... fhirResource.meta,  // it can have 'serviceType' also
        section: loincSectionCode
      }
    }
  
    // if meta.serviceType does not exist in the FHIR resource, then put the default serviceType (if provided)
    if (defaultServiceType){
      if (!fhirResource.meta.serviceType){
        fhirResource.meta.serviceType = defaultServiceType
      }
    }
  
    return fhirResource
}

/**
 * It returns the code of the section or empty string ("") if not found.
 * Optionally, the main function can pass the composition as parameter, but it is not required.
 */
export function getSectionCodeForResourceIdInBundle(bundleDocument:R4.IBundle, resourceId: string | undefined, composition?:R4.IComposition): string {
    if (!resourceId) return ""
  
    // It gets the composition if some is available in the document and it was not given as parameter
    if (!composition) {
        composition = getBundleDocumentComposition(bundleDocument)
    }
  
    let result: string = ""
    // It returns the section code if the resourceId is found in some section as reference (entry)
    if (composition){
        if (composition.section && composition.section.length && composition.section.length>0){
            composition.section.some( function(compositionSection:R4.IComposition_Section){
            if (compositionSection.code && compositionSection.entry && compositionSection.entry.length && compositionSection.entry.length>0){
                compositionSection.entry.some( function(reference:R4.IReference){
                    const cleanResourceId = getCleanId(resourceId)
                    if (reference.reference && reference.reference.includes(cleanResourceId)){
                        // fhirUtils.codeableConcept.getCodeListInCodeableConcept
                        if (compositionSection.code && compositionSection.code.coding && compositionSection.code.coding.length &&
                            compositionSection.code.coding.length>0 && compositionSection.code.coding[0].code)
                        {
                            result = compositionSection.code.coding[0].code
                            // console.log('section code found = ', result)
                            return true // it breaks the 'some' iteration
                        }
                    }
                })
                if (result !== '') return true // it breaks the 'some' iteration
            }
            })
        }
    }
  
    return result
}

export function getCleanIdOfDocumentComposition(fhirBundle:R4.IBundle | undefined): string {
    // Composition is always fhirBundle.entry[0].resource in a FHIR Document or it is not a Bundle Document
    if (!fhirBundle || !fhirBundle.entry || !fhirBundle.entry.length || fhirBundle.entry.length<1 || 
        !fhirBundle.entry[0].resource || !fhirBundle.entry[0].resource.resourceType || 
        fhirBundle.entry[0].resource.resourceType !== "Composition" || !fhirBundle.entry[0].resource.id){
        return "" // instead of error
    }
    else {
        // fullUrn should contain the URN and the Compositon.id should 
        return getCleanIdByFhirResource(fhirBundle.entry[0].resource)
    }
}

export function getTimestamp(fhirBundle:R4.IBundle): string {
    if (fhirBundle.timestamp) return fhirBundle.timestamp
    if (fhirBundle.entry && fhirBundle.entry.length && fhirBundle.entry.length>0 && fhirBundle.entry[0].resource
        && fhirBundle.entry[0].resource.resourceType && fhirBundle.entry[0].resource.resourceType == "Composition"
        && fhirBundle.entry[0].resource.date ) return fhirBundle.entry[0].resource.date
    return ""   // else returns empty
}

/** It sets the section code LOINC for each resource from the Bundle document Composition, use the given 'defaultSectionLOINC' if not found or generic 'Medical records' if none */
function getResourcesByReferences(bundle:R4.IBundle, references:R4.IReference[], defaultCodeLOINC?:string): any[] {
    let results:any[] = []

    if (!bundle.entry || bundle.entry.length < 1) {
        return results // empty
    }  

    references.forEach( function(fhirReference:R4.IReference) {
        if (fhirReference && fhirReference.reference) {
            // do not use cleanId because if URN the cleanId will not match in the search
            let splittedReferenceURN:string[] = fhirReference.reference.split("/")
            // The ID of the resource will be in the position "reference.length-1" (last position) of the splitted string
            if (splittedReferenceURN.length > 0) { // there is an ID
                const resourceId = splittedReferenceURN[splittedReferenceURN.length-1]
                let resource = getResourceByIdInBundle(resourceId, bundle)
                resource = getResourceWithOptionalMetaData(resource, bundle, defaultCodeLOINC)
                results.push(resource)
            }
        }
    })
    return results
}

function getReferencesInBundleEntries(entries:R4.IBundle_Entry[]): R4.IReference[] {
    if (entries.length < 1) return [] as R4.IReference[]
    let references:R4.IReference[] = []
    entries.forEach( function(entry:R4.IBundle_Entry){
        if (entry.resource && entry.resource.id) {
            let newReference:R4.IReference = {reference: entry.resource.id}
            references.push(newReference)
        }
    })
    return references
}

// TODO: put display and text of the section (translation)
function addReferencesInBundleEntriesToComposition(composition:R4.IComposition, entries:R4.IBundle_Entry[], loincSectionCode:string): R4.IComposition {
    // TODO: check bundle

    // It gets the validated composition to be updated
    let newComposition:R4.IComposition = { ... composition}

    // It gets or creates the section
    let section = getSectionByCodeInComposition(newComposition, loincSectionCode)    // error if section has no code
    if (!section){
        section = createEmptyCompositionSection(loincSectionCode)
    }
    
    // It gets the references to the resources and puts them into the section
    let references:R4.IReference[] = getReferencesInBundleEntries(entries)
    section = addReferencesToCompositionSection(section, references)

    // It updates the section into the composition
    newComposition = putSectionInComposition(newComposition, section)
    return newComposition
}

 // the first resource type in the bundle document must be a composition: http://hl7.org/fhir/bundle.html
export function isIPS(bundleDocument:R4.IBundle): boolean {
    const documentKind = getTypeOfBundleDocumentComposition(bundleDocument)
    if (documentKind && documentKind === medicalHistoryClassification.ips) {
        return true
    } else {
        return false
    }
}

/** It assumes the composition index it the 1st resource in the Bundle Document or will return false */
export function hasSections(bundleDocument:R4.IBundle): boolean {
    if (!bundleDocument || !bundleDocument.type || bundleDocument.type !== R4.BundleTypeKind._document){
        return false
    }

    if (!bundleDocument || !bundleDocument.entry || !bundleDocument.entry.length || bundleDocument.entry.length<1
        || !bundleDocument.entry[0].resource || !bundleDocument.entry[0].resource)
    {
        return false
    }

    const composition = bundleDocument.entry[0].resource as R4.IComposition
    if (!composition.section || !composition.section.length || composition.section.length<1){
        return false
    }

    return true
}

// TODO: it does not check for the meta.version of the document
export function addEntriesToBundle(bundle:R4.IBundle, entries:R4.IBundle_Entry[]): R4.IBundle {
    let newBundle: R4.IBundle = bundle

    let currentIds:string[] = getResourceIdsInBundle(newBundle)

    entries.forEach( function(bundleEntry){
        // it checks if there is a FHIR resource (check if bundleEntry.resource.id or not?)
        if (bundleEntry.resource && bundleEntry.resource.resourceType && bundleEntry.resource.id) {
            // let cleanId:string = cleanId(bundleEntry.resource.id) // TODO: get the alone id from a id with type of reference "resourceType/id"
            if (!currentIds.includes(bundleEntry.resource.id)) {
                // TODO: check the meta for the version of the document
                if (!newBundle.entry || newBundle.entry.length < 1) newBundle.entry = [bundleEntry]
                else newBundle.entry.push(bundleEntry)
            }
        }
    })
    return newBundle
}

/** It returns error if composition does not exits in the document bundle. TODO: create and add a new composition?
 * TODO: exlude resources by resourceType
 */
export function addEntriesBySection(bundleDocument:R4.IBundle, bundleEntries:R4.IBundle_Entry[], sectionCode:string, sectionSystem:string): R4.IBundle {
    if (!bundleDocument || !bundleDocument.entry || !bundleDocument.entry.length
        || bundleDocument.entry.length<1 || !bundleDocument.entry[0].resource
        || !bundleDocument.entry[0].resource.resourceType
        || bundleDocument.entry[0].resource.resourceType !== 'Composition'
    ) {
        throw new Error (`Bundle document does not have Composition`)
    }

    const composition = bundleDocument.entry[0].resource

    // It updates the resources references of the section into the composition entry of the bundle
    let newComposition:R4.IComposition = addReferencesInBundleEntriesToComposition(composition, bundleEntries, sectionCode)
    // Then it adds the new resources to the bundle
    let newBundle:R4.IBundle = addEntriesToBundle(bundleDocument, bundleEntries)
    // Finally it replaces the composition with the new references to the added resources
    newBundle = replaceResourceById(newComposition, newBundle)
    return newBundle
}

/** It just adds a new entry (it does not update Composition or MessageHeader resources) */
export function addResourceAsBundleEntry(bundle:R4.IBundle, resource:any, fullUrl?:string): R4.IBundle{
    if (!resource.resourceType || !resource.id) {
        return bundle
    }

    // It checks if resource is already present
    let existingResourcesIds:string[] = getResourceIdsInBundle(bundle)
    if (existingResourcesIds.includes(resource.id)) {
        // console.log("resource id already existis in bundle, so skiping it ")
        return bundle
    }

    // it prepares the new resource as a new entry in the bundle and inserts it
    let newEntry: R4.IBundle_Entry = {
        fullUrl: fullUrl,
        resource: resource
    }
    bundle.entry ? bundle.entry.push(newEntry) : bundle.entry = [newEntry]

    // console.log("resulting bundle from addResourceToBundle = ", JSON.stringify(bundle))
    return bundle
}

/** It adds resources to a given health section but excluding some resources by its type.
 * It returns error if composition does not exits in the document bundle.
 * 'fullUrlPrefix' can be passed for creating the 'fullUrl' in the bundle entries.
 * It uses addResourcesToComposition, addResourcesWithOptions and updateComposition.
 * TODO: generate reference as "resourceType/id"
 */
export function addResourcesToSection(bundleDocument:R4.IBundle, resources:any[], sectionCode:string, excludeResources?:string[], fullUrlPrefix?:string): R4.IBundle {
    if (!bundleDocument || !bundleDocument.entry || !bundleDocument.entry.length
        || bundleDocument.entry.length<1 || !bundleDocument.entry[0].resource
        || !bundleDocument.entry[0].resource.resourceType
        || bundleDocument.entry[0].resource.resourceType !== 'Composition'
    ) {
        throw new Error (`Bundle document does not have Composition`)
    }

    const composition = bundleDocument.entry[0].resource

    // if it was created as an empty IPS document then it does not have any section yet
    if (excludeResources && excludeResources.length && excludeResources.length>0){
        resources = resources.filter(resource => {
            // filter that includes only resources that are not in the exclusion list
            return !(excludeResources.includes(resource.resourceType))
        });
    }

    // It updates the resources references of the section into the composition entry of the bundle
    let updatedComposition:R4.IComposition = addResourcesToComposition(composition, resources, sectionCode)
    
    // Then it adds the new resources to the bundle
    bundleDocument = addResourcesWithOptions(bundleDocument, resources, undefined, excludeResources, fullUrlPrefix)

    // Finally it replaces the composition
    return updateComposition(bundleDocument, updatedComposition) // instead of replaceResourceById(newComposition, newBundle)
}

/** It adds the resource to the composition, updates the composition and adds the resource as bundle entry */
export function addResourceToSection(bundleDocument:R4.IBundle, resource:any, sectionCode:string, fullUrl?:string): R4.IBundle {
    if (!bundleDocument || !bundleDocument.entry || !bundleDocument.entry.length
        || bundleDocument.entry.length<1 || !bundleDocument.entry[0].resource
        || !bundleDocument.entry[0].resource.resourceType
        || bundleDocument.entry[0].resource.resourceType !== 'Composition'
    ) {
        throw new Error (`Bundle document does not have Composition`)
    } else {
        // adding resource to the composition and updating the composition in the bundle document
        const composition = addResourcesToComposition(bundleDocument.entry[0].resource, [resource], sectionCode)
        bundleDocument.entry[0].resource = composition // simple operation, it is not necessary to call to 'updateComposition'
        // adding the resource as bundle entry
        bundleDocument = addResourceAsBundleEntry(bundleDocument, resource, fullUrl)
        return bundleDocument
    }
}

/** It adds resources both for Bundle document, Bundle composition and Bundle Message.
 * If sectionCodeLOINC is provided then the Bundle SHALL be a document with composition or it will throw an error */
export function addResourcesWithOptions(bundle:R4.IBundle, resources?:any[], sectionCodeLOINC?:string, excludeResources?:string[], fullUrlPrefix?:string): R4.IBundle {
    if (!resources || !resources.length || resources.length<1) {
        console.warn('cannot add resources because no resource was given')  // for debugging
        return bundle
    }
    
    resources.forEach(function(resource:any){
        if (!resource.resourceType || !resource.id) {
            console.warn("Skipping invalid resource")
        } else {
            // valid resource
            if (!excludeResources ||
                !(excludeResources.includes(resource.resourceType))
            ){
                // non-excluded resource
                let existingResourcesIds:string[] = getResourceIdsInBundle(bundle)
                if (existingResourcesIds.includes(resource.id)) {
                    console.log(`skipping already existing resource ${resource.id}`)
                } else {
                    // if a section is given put the resource in the section
                    if (!sectionCodeLOINC) {
                        bundle = addResourceAsBundleEntry(bundle, resource)
                    } else {
                        let fullUrl = undefined
                        if (fullUrlPrefix){
                            fullUrl = fullUrlPrefix + resource.id
                        }
                        bundle = addResourceToSection(bundle, resource, sectionCodeLOINC, fullUrl)
                    }
                }
            }
        }
    })
    return bundle
}

export function getReferencesInSection(section:R4.IComposition_Section): R4.IReference[] {
    // TODO: do validations
    if (!section.entry || section.entry.length < 1) return {} as any[]    // returns empty if none
    
    let entryCompositionReferencesInSection:R4.IReference[] = []
    section.entry.forEach( function(item:R4.IReference){
        if (item.reference) entryCompositionReferencesInSection.push(item)
    })
    return entryCompositionReferencesInSection
}

/** It gets all the resources excluding some resource types if provided
 * and adds meta.section if the document has sections or the default LOINC section code if given */
/*
export function getResourcesWithOptions(bundle: R4.IBundle, excludedTypes?: string[], defaultSectionLOINC?:string): any[] {
    if (!bundle || bundle.resourceType != "Bundle" || !bundle.entry || !bundle.entry.length || bundle.entry.length<1) return []  // or error?

    let results: any[] = []
    // let entries:R4.IBundle_Entry[] = bundle.entry as R4.IBundle_Entry[]
    bundle.entry.forEach( function(entry:R4.IBundle_Entry){
      if (entry.resource && entry.resource.resourceType && entry.resource.resourceType!="Composition" && entry.resource.resourceType!="MessageHeader") results.push(entry.resource)
    })
    return results
}
*/

// It returns an arry of IDs, splitting the ID by "/" and getting the last string after the slash
export function getResourceIdsInBundle(bundle: R4.IBundle): string[] {
    let entries:R4.IBundle_Entry[] = bundle.entry as R4.IBundle_Entry[]
    if (!entries || !entries.length || entries.length<1) return []
    
    let results: any[] = []
    entries.forEach( function(entry){
      if (entry.resource && entry.resource.id) {
        let idArray:string[] = entry.resource.id.split("/")
        // The ID of the resource will be in the position "reference.length-1" of the splitted string
        if (idArray.length > 0) { // there is an ID
            results.push( idArray[idArray.length-1] )
        }
      }
    })
    return results
}

// It returns an arry of IDs, splitting the ID by "/" and getting the last string after the slash
export function getResourceReferencesBySectionCodeLOINC(bundleDocumentIPS: R4.IBundle, sectionCode: string): string[] {
    
    // the FHIR resources are within document.entry[] and the Composition resource (document index) is always in the first entry
    if (!bundleDocumentIPS || !bundleDocumentIPS.entry || !bundleDocumentIPS.entry.length || bundleDocumentIPS.entry.length<1) {
        return []
    }

    // the health sections are in the Composition resource (first entry in the bundle document): document.entry[0].resource.section[]
    const documentComposition:R4.IComposition = bundleDocumentIPS.entry[0].resource as R4.IComposition
    if (!documentComposition || !documentComposition.section || !documentComposition.section.length || documentComposition.section.length<1){
        return []
    }

    let references:string[] = []
    documentComposition.section.forEach( function(section:R4.IComposition_Section) {
        const code = getCodeListInCodeableConcept(section.code, CodingSystem.loinc)
        if (code && code.length && code.length>0 && code[0]===sectionCode){
            if (section.entry && section.entry.length && section.entry.length>0){
                section.entry.forEach( function(dataReference:R4.IReference){
                    // adding all the references within the health section
                    if (dataReference.reference) references.push(dataReference.reference)
                })
            }
        }
    })
    return references
}

export function getResourceByIdInBundle(resourceId:string, bundle:R4.IBundle): any{
    if (!bundle.entry || bundle.entry.length < 1) return {}
    let fhirResource:any
    let result:boolean = bundle.entry.some(function(item){
      if (item.resource && item.resource.id == resourceId){
        fhirResource = item.resource
        return true
      }
    })
    if (!result) return {}
    else return fhirResource
}

// It replaces the given resource in the right Bundle.entry without generating Bundle.entry[].fullUrl
export function replaceResourceById(resource:any, bundle:R4.IBundle): R4.IBundle{
    // It checks the required inputs
    if (!resource.id) throw new Error("Resource doesn't have any ID")

    let updatedBundle:R4.IBundle = bundle
    if (!updatedBundle.entry || updatedBundle.entry.length < 1) throw new Error("No resources were found")

    // It searchs the resource by its id, generates a new entry with the given resource and replaces the entry in the Bundle
    updatedBundle.entry.some( function(item:R4.IBundle_Entry, entryIndex, bundleEntries) {
        if (item.resource && item.resource.id && item.resource.id == resource.id) {
            // Create a completely new entry whitout entry.fullUrl
            let newEntry:R4.IBundle_Entry = { resource: resource }
            bundleEntries[entryIndex] = newEntry
            return true
        }
    })
    return updatedBundle
}

export function getMediaInBundle(bundle: R4.IBundle): R4.IMedia[]{
    if (!bundle || bundle.resourceType != "Bundle") return [] as R4.IMedia[]
    if (!bundle.entry || bundle.entry.length<=0) return [] as R4.IMedia[]
    return getMediaInBundleEntries(bundle.entry)
}
    
function getMediaInBundleEntries(entries: R4.IBundle_Entry[]): R4.IMedia[]{
    let mediaContents: R4.IMedia[] = []
    entries.forEach(function(item){
        if (item.resource && item.resource.resourceType=="Media") mediaContents.push(item.resource)
    })
    return mediaContents
}

/** First it checks if there is a valid 'Composition' resource (with title, type, date and status)
 * as first resource in the FHIR Bundle document, then return the type code if any or undefined */
export function getBundleDocumentCompositionWithValidation(fhirBundleDocument:R4.IBundle | undefined): R4.IComposition | undefined {
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
    ) {
        // TODO: ckeck date and status
        return fhirBundleDocument.entry[0].resource
    } else {
        return undefined
    }
}

/** it does not validate bundle document properties or Composition mandatory properties */
export function getBundleDocumentComposition(fhirBundleDocument:R4.IBundle | undefined): R4.IComposition | undefined {
    // it does not validate bundle document nor composition mandatory properties
    if (fhirBundleDocument && fhirBundleDocument.entry && fhirBundleDocument.entry.length
        && fhirBundleDocument.entry.length>0 && fhirBundleDocument.entry[0].resource
        && fhirBundleDocument.entry[0].resource.resourceType
        && fhirBundleDocument.entry[0].resource.resourceType === 'Composition'
    ) {
        return fhirBundleDocument.entry[0].resource
    } else {
        return undefined
    }
}