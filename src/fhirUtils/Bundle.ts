/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { v4 as uuidv4 } from 'uuid'
// import { convertUuidToUuid58 } from 'uuid58'
import { GlobalIndexLOINC, medicalHistoryClassification } from "./Loinc"
import { addResourcesToComposition, getSectionByCodeInComposition, createEmptyCompositionSection, 
    addReferencesToCompositionSection, putSectionInComposition, createDefaultComposition, getCodesOfSections } from "./Composition"
import { addExistingTargetCodesInCodeableConcepts, getCodeListInCodeableConcept } from "./CodeableConcept"
import { covid19VaccineProphylaxisCodesGlobal, covid19Tag, covid19LaboratoryTestsAndGroupsCodes } from "./Covid19"
import { getCleanIdByFhirResource, getCleanId } from "./CommonFHIR"
import { CodingSystem } from "../models"

export class Bundle {
    constructor() {
    }

    getDocumentKindInComposition(bundleDocument:R4.IBundle): string | undefined {
        return getDocumentKindInComposition(bundleDocument)
    }

    /** The first resource type in the bundle document must be a Composition of resources (the index): http://hl7.org/fhir/bundle.html */
    isIPS(bundleDocument:R4.IBundle): boolean {
        return isIPS(bundleDocument)
    }

    //** returns the list of sections or empty array (but not undefined) */
    getCodesOfSections(bundleDocument:R4.IBundle): string[] {
        const compositions = getResourcesByTypes(bundleDocument, ['Composition'])
        if (compositions && compositions.length && compositions.length>0) {
            return getCodesOfSections(compositions[0].section, CodingSystem.loinc)
        } else {
            return [] // empty
        }
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

    /** Bundle type can be "document" but also "collection", "message", "history"... */
    getTagsInBundle(fhirBundle:R4.IBundle): string[] {
        return getTagsInBundleResource(fhirBundle)
    }

    // TODO: create another function to add the resource to the composition index
    // export function addResourceToBundleAndIndex(bundle:R4.IBundle, resource:any, sectionCode:string): R4.IBundle{}

    /** It adds a bundle resource including Composition or HeaderMessage and skips if already present */
    addResourceToBundle(bundle:R4.IBundle, resource:any): R4.IBundle{
        return addResourceToBundle(bundle, resource)
    }

    // TODO: create another function for adding resources to the Composition index by section
    // export function addAdditionalResourcesToBundleAndIndex(bundle:R4.IBundle, resources:any[], sectionCode:string): R4.IBundle {

    /** It adds resources except 'Composition', 'MessageHeader' and also skips if empty resource.id or already exists, both for Bundle Document and Bundle Message */
    addResourcesToBundle(bundle:R4.IBundle, resources?:any[]): R4.IBundle {
        return addResourcesToBundle(bundle, resources)
    }

    createBundleDocumentWithTypeLOINC(resources?:any[], authorReferenceId?:string, typeDocumentCodeLOINC?:string): R4.IBundle {
        return createBundleDocumentWithComposition(resources, authorReferenceId, typeDocumentCodeLOINC)
    }

    // TODO: set the UHC identifier, not only the id
    createEmptyIPS(authorReferenceId:string): R4.IBundle{
        return createEmptyIPS(authorReferenceId)
    }

    // TODO: it does not check for the meta.version of the document
    addEntriesToBundle(bundle:R4.IBundle, entries:R4.IBundle_Entry[]): R4.IBundle {
        return addEntriesToBundle(bundle, entries)
    }

    // TODO: generate the entry.fullUrl and reference as "resourceType/id"
    addResourcesBySection(bundleDocument:R4.IBundle, sectionCode:string, resources:any[]): R4.IBundle {
        return addResourcesBySection(bundleDocument, sectionCode, resources)
    }

    addEntriesBySection(bundleDocument:R4.IBundle, bundleEntries:R4.IBundle_Entry[], sectionCode:string, sectionSystem:string): R4.IBundle {
        return addEntriesBySection(bundleDocument, bundleEntries, sectionCode, sectionSystem)
    }

    getReferencesInSection(section:R4.IComposition_Section): R4.IReference[] {
        return  getReferencesInSection(section)
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

    // TODO: change to use getResourcesWithFilters
    getResourcesInSection(bundleDocument:R4.IBundle, sectionCode:string): any[] {
        return getResourcesInSection(bundleDocument, sectionCode)
    }

    // TODO: change to use getResourcesWithFilters
    getAllResources(bundle: R4.IBundle): any[] {
        return getAllResourcesInBundle(bundle)
    }

    // TODO: change to use getResourcesWithFilters
    getAllResourcesWithoutCompositionOrMessageHeader(bundle: R4.IBundle): any[] {
        return getAllResourcesWithoutCompositionOrMessageHeader(bundle)
    }

    // TODO: change to use getResourcesWithFilters
    getResourcesByTypes(bundle: R4.IBundle, resourceTypes:string[]): any[] {
        return getResourcesByTypes(bundle, resourceTypes)
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
} // end class Bundle

// ---- FUNCTIONS ----
// -------------------

export function addOptionalMetaDataToResource(fhirResource:any, fhirBundle:R4.IBundle, defaultSectionLOINC?:string, defaultServiceType?:string){
    let loincSection = getSectionCodeForResourceIdInBundle(fhirBundle, fhirResource.id)
    if (loincSection === "" && defaultSectionLOINC && defaultSectionLOINC !== ""){
      loincSection = defaultSectionLOINC
    }
    
    // setting LOINC section in the meta data of the resource (if any)
    if (loincSection !== "") {
      fhirResource.meta = { 
        ... fhirResource.meta,  // it can have 'serviceType' also
        section: loincSection
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
  
export function getResourceWithOptionalMetaData(fhirResource:any, fhirBundle:R4.IBundle, defaultSectionLOINC?:string, defaultServiceType?:string){
    const containsSections = hasSections(fhirBundle)
    
    // getting the LOINC section for the resource
    let loincSectionCode:string = ""
    if (containsSections) {
        loincSectionCode = getSectionCodeForResourceIdInBundle(fhirBundle, fhirResource.id)
    } else if (defaultSectionLOINC) {
        loincSectionCode = defaultSectionLOINC
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
 * 'defaultSectionLOINC' is used in case the FHIR Bundle does not have any section in a composition resource.
 * 'defaultServiceType' is used in case the FHIR resource does not have meta.serviceType as creator healthcare service of the resource.
 */
export function getResourcesWithFilters(fhirBundle:R4.IBundle, defaultSectionLOINC?: string, defaultServiceType?:string,
    excludeResourceTypes?:string[], includeResourceTypes?:string[], withSectionsLOINC?:string[], fromServiceTypes?:string[], withCodes?:string[]
): any[] {
    // it adds meta.section if the document has sections or the LOINC section code of the biography if not

    const containsSections = hasSections(fhirBundle)
    // it puts meta.section for every resource, if available
    let resources = getAllResourcesInBundle(fhirBundle)

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

/**
 * It returns the code of the section or empty string ("") if not found.
 * Optionally, the main function can pass the composition as parameter, but it is not required.
 */
export function getSectionCodeForResourceIdInBundle(bundleDocument:R4.IBundle, resourceId: string | undefined, composition?:R4.IComposition): string {
    if (!resourceId) return ""
  
    // It gets the composition if some is available in the document and it was not given as parameter
    if (!composition) {
      const compositions = getResourcesByTypes(bundleDocument, ['Composition'])
      if (compositions && compositions.length && compositions.length>0) {
          composition = compositions[0]
      }
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
                  compositionSection.code.coding.length>0 && compositionSection.code.coding[0].code) {
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

/** If resource is a Bundle then the different resources MUST be managed by the parent function for calling several times to this child function */
export function isCovid19SoleResource(resource:any): boolean {
    if (resource && resource.resourceType) {
        let codesCovid19:string[] = []

        switch(resource.resourceType) {
            case ("Immunization"): {
                // It checks for all COVID-19 vaccine codes (CVX and ATC) and put uhcTagForCovid19 value if some was found
                codesCovid19 = addExistingTargetCodesInCodeableConcepts([resource.vaccineCode], covid19VaccineProphylaxisCodesGlobal(), codesCovid19)
                // console.log("codesCovid19 at " + resource.resourceType + " =", codesCovid19)
                break
            }
            case ("DiagnosticReport"): {
                // It checks for all COVID-19 laboratory test codes (LOINC)
                codesCovid19 = addExistingTargetCodesInCodeableConcepts([resource.code], covid19LaboratoryTestsAndGroupsCodes(), codesCovid19)
                // console.log("codesCovid19 at " + resource.resourceType + " =", codesCovid19)
                break
            }
        }
        // Adding the COVID-19 tag to the list if some COVID-19 code was detected and if the tag does not exists in the list
        if (codesCovid19 && codesCovid19.length && codesCovid19.length>0) return true
    }
    return false
}

/** Bundle type can be document, collection, message, history... */
export function getTagsInBundleResource(bundleDocument:R4.IBundle): string[] {
    const tagCovid19:string = covid19Tag
    let uhcCodeTags:string[] = ["Bundle"]
    let resources:any = getAllResourcesInBundle(bundleDocument)
    if (resources && resources.length && resources.length > 0) { // the first entry shall be the composition resource
        let flagIsCovid19 = false
        resources.forEach( function(resource:any) {
            if (!uhcCodeTags.includes(resource.resourceType)) uhcCodeTags.push(resource.resourceType)
            // setting COVID-19 flag to true if isCovid19SoleResource is true
            flagIsCovid19 = flagIsCovid19 || isCovid19SoleResource(resource)
        })
        // Adding "COVID-19" tag if some COVID-19 code was detected in the resources
        if (flagIsCovid19) uhcCodeTags.push(tagCovid19)
    }
    return uhcCodeTags
}

// createEmptyBundle does not adds composition as the default Bundle.entry[0] resource (use createBundleDocumentWithComposition)
function createEmptyBundle(bundleType:R4.BundleTypeKind, language?:string): R4.IBundle{
    let bundle: R4.IBundle = {
        resourceType: "Bundle",
        type: bundleType,
        id: uuidv4(), // convertUuidToUuid58(uuidv4()),  // base58
        timestamp: new Date().toISOString()
    }
    if (language) bundle.language = language
    return bundle
}

// TODO: create another function to add the resource to the composition index
// export function addResourceToBundleAndIndex(bundle:R4.IBundle, resource:any, sectionCode:string): R4.IBundle{}

// TODO: create another function for adding resources to the Composition index by section
// export function addAdditionalResourcesToBundleAndIndex(bundle:R4.IBundle, resources:any[], sectionCode:string): R4.IBundle {

// It adds a bundle resource including Composition or HeaderMessage and skips if already present
export function addResourceToBundle(bundle:R4.IBundle, resource:any): R4.IBundle{
    if (!resource.resourceType) return bundle
    // Only for debugging, resourceType "Bundle" MUST BE ADDED ONLY when creating a FHIR MESSAGE but NOT WHEN CREATING A BUNDLE DOCUMENT (just resource entries)
    // if (resource.resourceType!="Bundle"&&resource.resourceType!="Composition"&&resource.resourceType!="Communication"&&resource.resourceType!="AuditEvent"&&  resource.resourceType!="MessageHeader")  console.log("Health resource type received in addResourceToBundleFHIR = ", resource.resourceType)

    // It checks if resource is already present and returns if true
    if (resource.id) {
        let existingResourcesIds:string[] = getResourceIdsInBundle(bundle)
        if (existingResourcesIds.includes(resource.id)) {
            // console.log("resource id already existis in bundle, so skiping it ")
            return bundle
        }
    }

    // it prepares the new resource as a new entry in the bundle and inserts it
    let newEntry: R4.IBundle_Entry = {
        // TODO: fullUrl: "urn:uhc:...:uuid"
        resource: resource
    }
    if (bundle.entry && bundle.entry.length >0) bundle.entry.push(newEntry)
    else bundle.entry = [newEntry]

    // console.log("resulting bundle from addResourceToBundle = ", JSON.stringify(bundle))
    return bundle
}

// DONE: renaming 'addAdditionalResourcesToBundle' as 'addResourcesToBundle'
/** It adds resources except 'Composition', 'MessageHeader' and also skips if empty resource.id or already exists, both for Bundle Document and Bundle Message */
export function addResourcesToBundle(bundle:R4.IBundle, resources?:any[]): R4.IBundle {
    // console.log("addAdditionalResourcesToBundle with resources = ", JSON.stringify(resources))
    if (!bundle || bundle.resourceType != "Bundle") throw new Error ("Not a FHIR Bundle") // return {} as R4.IBundle
    if (!resources || !resources.length || resources.length<1) throw new Error ("No 'AdditionalResources' to add")  // for debugging, instead of return the original bundle without error

    // TODO: it validates the FHIR object and gets the validated value or returns empty
    let newBundle: R4.IBundle = {...bundle}

    // let existingResourcesIds:string[] = getResourceIdsInBundle(bundle)
    
    resources.forEach(function(resource:any){
        if (resource){  // e.g. it can be undefined when a function generating a Bundle with an Immunization and an optional DocumentReference
            // it checks if it is a FHIR resource and skips it if resource.id is already present
            if (!resource.id) console.warn("Resource ID is missing and it was not added to the FHIR Bundle document")
            if (resource.id && resource.resourceType && resource.resourceType!="Composition" && resource.resourceType!="MessageHeader") {
                // console.info("OK: resource not exists, so adding resource to bundle")
                // It adds a bundle resource including Composition or HeaderMessage and skips if already present
                newBundle = addResourceToBundle(newBundle, resource)
            }
        }
    })
    return newBundle
}

function getResourcesByReferences(bundle:R4.IBundle, references:R4.IReference[]): any[] {
    const validBundle = bundle

    if (!validBundle.entry || validBundle.entry.length < 1) return []

    let results:any[] = []
    references.forEach( function(item:R4.IReference) {
        const validItem = item
        if (validItem && validItem.reference) {
            let reference:string[] = validItem.reference.split("/")
            // The ID of the resource will be in the position "reference.length-1" of the splitted string
            if (reference.length > 0) { // there is an ID
                results.push( getResourceByIdInBundle(reference[reference.length-1], validBundle) )
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

export function createBundleDocumentWithComposition(resources?:any[], authorReferenceId?:string, typeDocumentCodeLOINC?:string): R4.IBundle {
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

 // the first resource type in the bundle document must be a composition: http://hl7.org/fhir/bundle.html
export function isIPS(bundleDocument:R4.IBundle): boolean {
    const documentKind = getDocumentKindInComposition(bundleDocument)
    if (documentKind && documentKind === medicalHistoryClassification.ips) {
        return true
    } else {
        return false
    }
}

 // the first resource type in the bundle document must be a composition: http://hl7.org/fhir/bundle.html
 export function getDocumentKindInComposition(bundleDocument:R4.IBundle): string | undefined {
    if (!bundleDocument || !bundleDocument.type || bundleDocument.type != R4.BundleTypeKind._document || !bundleDocument.entry ||!bundleDocument.entry.length || !bundleDocument.entry[0]
        || !bundleDocument.entry[0].resource || bundleDocument.entry[0].resource.resourceType != "Composition" || !bundleDocument.entry[0].resource.type
        || !bundleDocument.entry[0].resource.type.coding || !bundleDocument.entry[0].resource.type.coding[0] || !bundleDocument.entry[0].resource.type.coding[0].code
    ){
        return undefined
    }
    else {
        return bundleDocument.entry[0].resource.type.coding[0].code
    }
}

/** It assumes the composition index it the 1st resource in the Bundle Document or will return false */
export function hasSections(bundleDocument:R4.IBundle): boolean {
    if (!bundleDocument || !bundleDocument.type || bundleDocument.type !== R4.BundleTypeKind._document){
        console.log("no sections in bundle")
        return false
    }
    
    /*
    const compositions = getResourcesByTypes(bundleDocument, ['Composition'])
    if (!compositions || !compositions.length || compositions.length<1) {
        return false
    }

    if (!compositions[0].section || !compositions[0].section.length || compositions[0].section.length<1){
        return false
    }
    */

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

// TODO: set the UHC identifier, not only the id
export function createEmptyIPS(authorReferenceId:string): R4.IBundle{
    let typeDocumentCodeLOINC:string = GlobalIndexLOINC.categorization.healthSection.compositionIPS
    return createBundleDocumentWithComposition(undefined, authorReferenceId, typeDocumentCodeLOINC)
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

// TODO: generate the entry.fullUrl and reference as "resourceType/id"
export function addResourcesBySection(bundleDocument:R4.IBundle, sectionCode:string, resources:any[]): R4.IBundle {
    let compositions:R4.IComposition[] = getResourcesByTypes(bundleDocument, ["Composition"])
    if (compositions.length < 1 ) return {} as R4.IBundle   //returns empty TODO: error or create new Composition?

    // if it was created as an empty IPS document then it does not have any section yet

    // It updates the resources references of the section into the composition entry of the bundle
    let newComposition:R4.IComposition = addResourcesToComposition(compositions[0], resources, sectionCode)
    
    // Then it adds the new resources to the bundle
    let newBundle:R4.IBundle = addResourcesToBundle(bundleDocument, resources)

    // Finally it replaces the composition with the new references to the added resources
    newBundle = replaceResourceById(newComposition, newBundle)
    return newBundle
}

export function addEntriesBySection(bundleDocument:R4.IBundle, bundleEntries:R4.IBundle_Entry[], sectionCode:string, sectionSystem:string): R4.IBundle {
    let compositions:R4.IComposition[] = getResourcesByTypes(bundleDocument, ["Composition"])
    if (compositions.length < 1 ) return {} as R4.IBundle   //returns empty

    // if it was created as an empty IPS document then it does not have any section yet
    let resources
    // It updates the resources references of the section into the composition entry of the bundle
    let newComposition:R4.IComposition = addReferencesInBundleEntriesToComposition(compositions[0], bundleEntries, sectionCode)
    // Then it adds the new resources to the bundle
    let newBundle:R4.IBundle = addEntriesToBundle(bundleDocument, bundleEntries)
    // Finally it replaces the composition with the new references to the added resources
    newBundle = replaceResourceById(newComposition, newBundle)
    return newBundle
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

export function getResourcesInSection(fhirBundle:R4.IBundle, loincSectionCode:string): any[] {
    /*
    return getResourcesWithFilters(bundle, undefined, undefined,
        undefined, undefined, [loincSectionCode], undefined, undefined)
    */
    let compositions:R4.IComposition[] = getResourcesByTypes(fhirBundle, ["Composition"])
    if (compositions.length < 1 ) return {} as any[]    //returns empty
    if (!compositions[0].section || compositions[0].section.length < 1) return {} as any[]    //returns empty
    
    let sectionInComposition = getSectionByCodeInComposition(compositions[0], loincSectionCode)
    // It checks if the section has references to resources
    if (!sectionInComposition || !sectionInComposition.entry || sectionInComposition.entry.length < 1) return {} as any[]    //returns empty
    
    let sectionReferences:R4.IReference[] = sectionInComposition.entry
    let resources:any[] = getResourcesByReferences(fhirBundle, sectionReferences) // search resources by id in a Bundle from the array of references
    return resources
    // */
}

// getResourcesWithFilters causes RangeError: Maximum call stack size exceeded
export function getAllResourcesInBundle(fhirBundle: R4.IBundle, defaultSectionLOINC?:string, defaultServiceType?:string): any[] {
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

export function getAllResourcesWithoutCompositionOrMessageHeader(fhirBundle: R4.IBundle): any[] {
    const excludeResourceTypes = ['Composition', 'MessageHeader']
    /*
    return getResourcesWithFilters(fhirBundle, undefined, undefined,
        excludeResourceTypes, undefined, undefined, undefined, undefined)
    */
    if (!fhirBundle || fhirBundle.resourceType != "Bundle" || !fhirBundle.entry || !fhirBundle.entry.length || fhirBundle.entry.length<1) return []  // or error?

    let results: any[] = []
    // let entries:R4.IBundle_Entry[] = bundle.entry as R4.IBundle_Entry[]
    fhirBundle.entry.forEach( function(entry:R4.IBundle_Entry){
      if (entry.resource && entry.resource.resourceType && entry.resource.resourceType!="Composition" && entry.resource.resourceType!="MessageHeader") results.push(entry.resource)
    })
    return results
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
    // const documentComposition = getResourcesByTypes(bundleDocumentIPS, ["Composition"])[0]
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

export function getResourcesByTypes(fhirBundle: R4.IBundle, includeResourceTypes:string[]): any[] {
    /*
    return getResourcesWithFilters(bundle, undefined, undefined,
        undefined, includeResourceTypes, undefined, undefined, undefined)
    */
    if (!fhirBundle || fhirBundle.resourceType != "Bundle" || !fhirBundle.entry || !fhirBundle.entry.length || fhirBundle.entry.length<1
        || !includeResourceTypes.length || includeResourceTypes.length<1)
    {
        return []  // or error?
    }

    let results: any[] = []
    // let entries:R4.IBundle_Entry[] = bundle.entry as R4.IBundle_Entry[]
    fhirBundle.entry.forEach( function(entry:R4.IBundle_Entry){
        if (entry.resource && entry.resource.resourceType && includeResourceTypes.includes(entry.resource.resourceType)){
            // console.log("resource by type found: ", entry.resource.resourceType)    
            results.push(entry.resource)
        }
    })
    return results
    // */
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

// TODO: replace with getResourcesByCodeAndSystem
export function getObservationsByCode(bundle: R4.IBundle, code:string): any[] {
    let observations:any[] = getResourcesByTypes(bundle, ["Observation"])
    let results:R4.IObservation[] = []
    observations.forEach( function(observation){
      // it checks if the observation has a code.coding[].code = code
      if (observation.code && observation.code.coding && (observation.code.coding.find(
        (function(item:R4.ICoding) { if (item.code && item.code == code) return true})
      ))) {
        // adds the observation to results[] if true
        results.push(observation)
      }
    })
    return results
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