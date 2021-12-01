"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaInBundle = exports.replaceResourceById = exports.getResourceByIdInBundle = exports.getResourceReferencesBySectionCodeLOINC = exports.getResourceIdsInBundle = exports.getReferencesInSection = exports.addEntriesBySection = exports.addResourcesBySection = exports.addEntriesToBundle = exports.createEmptyIPS = exports.hasSections = exports.isIPS = exports.addResourcesToBundle = exports.addResourceToBundle = exports.getTimestamp = exports.getCleanIdOfDocumentComposition = exports.getSectionCodeForResourceIdInBundle = exports.getResourceWithOptionalMetaData = exports.getAllResourcesInBundle = exports.getResourcesInSection = exports.getResourcesWithFilters = exports.getResourcesByTypes = exports.createBundleDocumentWithComposition = exports.createBundleDocumentAndCompositionWithIds = exports.Bundle = void 0;
const ts_fhir_types_1 = require("@ahryman40k/ts-fhir-types");
const uuid_1 = require("uuid");
// import { convertUuidToUuid58 } from 'uuid58'
const Loinc_1 = require("./Loinc");
const Composition_1 = require("./Composition");
const CodeableConcept_1 = require("./CodeableConcept");
const CommonFHIR_1 = require("./CommonFHIR");
const models_1 = require("../models");
// TODO: isValidFhirBundleDocument
class Bundle {
    constructor() {
        /**
         * The permanent ID of a FHIR Document across any system
         * is the ID of the Composition resource as index of the document,
         * but not the bundle ID which can change across systems
         * and also is removed in canonicalizaton before signature (FHIR specifications).
         */
        this.getCompositionCleanID = (fhirBundle) => getCleanIdOfDocumentComposition(fhirBundle);
    }
    /** First it checks if there is a valid 'Composition' resource (with title, type, date and status)
     * as first resource in the FHIR Bundle document, then return the type code if any or undefined */
    getTypeOfBundleDocumentComposition(fhirBundleDocument) {
        return Composition_1.getTypeOfBundleDocumentComposition(fhirBundleDocument);
    }
    /** The first resource type in the bundle document must be a Composition of resources (the index): http://hl7.org/fhir/bundle.html */
    isIPS(bundleDocument) {
        return isIPS(bundleDocument);
    }
    hasSections(bundleDocument) {
        return hasSections(bundleDocument);
    }
    /**
     * It returns the code of the section or empty string ("") if not found.
     * Optionally, composition can be passed as parameter, but it is not required.
     */
    getSectionCodeForResourceId(bundleDocument, resourceId, composition) {
        return getSectionCodeForResourceIdInBundle(bundleDocument, resourceId, composition);
    }
    getTimestamp(fhirBundle) {
        return getTimestamp(fhirBundle);
    }
    /**
     * 'defaultSectionLOINC' is used in case the FHIR Bundle does not have any section in a composition resource.
     * 'defaultServiceType' is used in case the FHIR resource does not have meta.serviceType as creator healthcare service of the resource.
     */
    getResourcesWithFilters(fhirBundle, defaultSectionLOINC, defaultServiceType, excludeResourceTypes, includeResourceTypes, withSectionsLOINC, fromServiceTypes, withCodes) {
        return getResourcesWithFilters(fhirBundle, defaultSectionLOINC, defaultServiceType, excludeResourceTypes, includeResourceTypes, withSectionsLOINC, fromServiceTypes, withCodes);
    }
    // TODO: create another function to add the resource to the composition index
    // export function addResourceToBundleAndIndex(bundle:R4.IBundle, resource:any, sectionCode:string): R4.IBundle{}
    /** It adds a bundle resource including Composition or HeaderMessage and skips if already present */
    addResourceToBundle(bundle, resource) {
        return addResourceToBundle(bundle, resource);
    }
    // TODO: create another function for adding resources to the Composition index by section
    // export function addAdditionalResourcesToBundleAndIndex(bundle:R4.IBundle, resources:any[], sectionCode:string): R4.IBundle {
    /** It adds resources except 'Composition', 'MessageHeader' and also skips if empty resource.id or already exists, both for Bundle Document and Bundle Message */
    addResourcesToBundle(bundle, resources) {
        return addResourcesToBundle(bundle, resources);
    }
    /** It create Bundle Document and Composition with URNs
     * It sets by defautl the status as 'final',  the title as `${typeDocumentDisplay} (${date})`
     * and the type of document composition as '11503-0' (generic 'Medical records') if not provided */
    createBundleDocumentWithTypeLOINC(authorReferenceId, typeDocumentCodeLOINC, resources) {
        if (!typeDocumentCodeLOINC) {
            typeDocumentCodeLOINC = '11503-0'; // generic 'Medical records' type of document if not provided
        }
        const typeDocumentDisplay = Loinc_1.getDisplayOrTextByCodeLOINC(typeDocumentCodeLOINC);
        const newId = uuid_1.v4();
        const bundleDocumentURN = 'URN:FHIR:DOCUMENT:UUID:' + newId;
        const documentCompositionURN = 'URN:FHIR:COMPOSITION:UUID:' + newId;
        const datetime = new Date().toISOString();
        const title = `${typeDocumentDisplay} (${datetime})`;
        return createBundleDocumentAndCompositionWithIds(bundleDocumentURN, documentCompositionURN, authorReferenceId, datetime, title, ts_fhir_types_1.R4.CompositionStatusKind._final, typeDocumentCodeLOINC, models_1.CodingSystem.loinc, typeDocumentDisplay, undefined, resources);
    }
    // TODO: set the UHC identifier, not only the id
    createEmptyIPS(authorReferenceId) {
        return createEmptyIPS(authorReferenceId);
    }
    // TODO: it does not check for the meta.version of the document
    addEntriesToBundle(bundle, entries) {
        return addEntriesToBundle(bundle, entries);
    }
    // TODO: generate the entry.fullUrl and reference as "resourceType/id"
    addResourcesBySection(bundleDocument, sectionCode, resources) {
        return addResourcesBySection(bundleDocument, sectionCode, resources);
    }
    addEntriesBySection(bundleDocument, bundleEntries, sectionCode, sectionSystem) {
        return addEntriesBySection(bundleDocument, bundleEntries, sectionCode, sectionSystem);
    }
    getReferencesInSection(section) {
        return getReferencesInSection(section);
    }
    getResourcesInSection(bundleDocument, sectionCode) {
        return getResourcesWithFilters(bundleDocument, undefined, undefined, undefined, undefined, [sectionCode], undefined, undefined);
    }
    getAllResources(bundle) {
        // return getAllResourcesInBundle(bundle)
        return getResourcesWithFilters(bundle, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    }
    getAllResourcesWithoutCompositionOrMessageHeader(bundle) {
        // return getAllResourcesWithoutCompositionOrMessageHeader(bundle)
        const excludedResources = ['Composition', 'MessageHeader'];
        return getResourcesWithFilters(bundle, undefined, undefined, excludedResources, undefined, undefined, undefined, undefined);
    }
    getResourcesByTypes(bundle, resourceTypes) {
        // return getResourcesByTypes(bundle, resourceTypes)
        return getResourcesWithFilters(bundle, undefined, undefined, undefined, resourceTypes, undefined, undefined, undefined);
    }
    getResourceByIdInBundle(resourceId, bundle) {
        return getResourceByIdInBundle(resourceId, bundle);
    }
    /** It returns an arry of IDs, splitting the ID by "/" and getting the last string after the slash */
    getResourceIdsInBundle(bundle) {
        return getResourceIdsInBundle(bundle);
    }
    getResourceReferencesBySectionCodeLOINC(bundleDocumentIPS, sectionCode) {
        return getResourceReferencesBySectionCodeLOINC(bundleDocumentIPS, sectionCode);
    }
    /** It replaces the given resource in the right Bundle.entry without generating Bundle.entry[].fullUrl */
    replaceResourceById(resource, bundle) {
        return replaceResourceById(resource, bundle);
    }
    getMediaInBundle(bundle) {
        return getMediaInBundle(bundle);
    }
} // end class Bundle
exports.Bundle = Bundle;
// ---- FUNCTIONS ----
// NOTE: the exported functions can be used by other external managers (classes)
/** Creates a Bundle document with all mandatory properties in the document 'Composition' resource (the index) */
function createBundleDocumentAndCompositionWithIds(bundleId, compositionId, authorReferenceId, date, title, status, typeDocumentCode, typeDocumentSystem, typeDocumentDisplay, language, resources) {
    // console.log(`createBundleDocumentWithCompositionAndURNs with ${resources.length} resources`)
    let basicComposition = Composition_1.createCompositionWithId(compositionId, authorReferenceId, date, title, status, typeDocumentCode, typeDocumentSystem, typeDocumentDisplay, language);
    //console.log("basicComposition = ", basicComposition)
    // It creates the bundle documment, adds the composition and the additional resources
    let bundle = createEmptyBundleWithId(bundleId, ts_fhir_types_1.R4.BundleTypeKind._document);
    bundle = addResourceToBundle(bundle, basicComposition);
    // TODO: addAdditionalResourcesToBundle SHOULD ADD RESOURCES TO COMPOSITION
    if (resources && resources.length && resources.length > 0)
        bundle = addResourcesToBundle(bundle, resources);
    // console.log("createBundleDocumentWithComposition resulting bundle= ", JSON.stringify(bundle))
    return bundle;
}
exports.createBundleDocumentAndCompositionWithIds = createBundleDocumentAndCompositionWithIds;
/** deprecated: use createBundleDocumentAndCompositionWithIds */
function createBundleDocumentWithComposition(authorReferenceId, typeDocumentCodeLOINC, resources) {
    // console.log("createBundleDocumentWithComposition with resources = ", JSON.stringify(resources))
    let emptyComposition = Composition_1.createDefaultComposition(authorReferenceId, typeDocumentCodeLOINC);
    //console.log("emptyComposition = ", emptyComposition)
    // It creates the bundle documment, adds the composition and the additional resources
    let bundle = createEmptyBundle(ts_fhir_types_1.R4.BundleTypeKind._document);
    bundle = addResourceToBundle(bundle, emptyComposition);
    // TODO: addAdditionalResourcesToBundle SHOULD ADD RESOURCES TO COMPOSITION
    if (resources && resources.length && resources.length > 0)
        bundle = addResourcesToBundle(bundle, resources);
    // console.log("createBundleDocumentWithComposition resulting bundle= ", JSON.stringify(bundle))
    return bundle;
}
exports.createBundleDocumentWithComposition = createBundleDocumentWithComposition;
// -------------------
// TODO: remove old getResources functions
function getResourcesByTypes(fhirBundle, includeResourceTypes) {
    /*
    return getResourcesWithFilters(bundle, undefined, undefined,
        undefined, includeResourceTypes, undefined, undefined, undefined)
    */
    if (!fhirBundle || fhirBundle.resourceType != "Bundle" || !fhirBundle.entry || !fhirBundle.entry.length || fhirBundle.entry.length < 1
        || !includeResourceTypes.length || includeResourceTypes.length < 1) {
        return []; // or error?
    }
    let results = [];
    // let entries:R4.IBundle_Entry[] = bundle.entry as R4.IBundle_Entry[]
    fhirBundle.entry.forEach(function (entry) {
        if (entry.resource && entry.resource.resourceType && includeResourceTypes.includes(entry.resource.resourceType)) {
            // console.log("resource by type found: ", entry.resource.resourceType)    
            results.push(entry.resource);
        }
    });
    return results;
    // */
}
exports.getResourcesByTypes = getResourcesByTypes;
/**
 * 'defaultSectionLOINC' is used in case the FHIR Bundle does not have any section in a composition resource.
 * 'defaultServiceType' is used in case the FHIR resource does not have meta.serviceType as creator healthcare service of the resource.
 */
function getResourcesWithFilters(fhirBundle, defaultSectionLOINC, defaultServiceType, excludeResourceTypes, includeResourceTypes, withSectionsLOINC, fromServiceTypes, withCodes) {
    // it adds meta.section if the document has sections or the LOINC section code of the biography if not
    const containsSections = hasSections(fhirBundle);
    // it puts meta.section for every resource, if available
    let resources = getAllResourcesInBundle(fhirBundle);
    // fhirBundle.entry.forEach( function(entry:R4.IBundle_Entry){
    // if (entry.resource && entry.resource.resourceType) {
    // const result = getResourceWithOptionalMetaData(entry.resource, fhirBundle, defaultSectionLOINC, defaultServiceType)
    // exclude some resources or include only the desired resources
    if (excludeResourceTypes && excludeResourceTypes.length && excludeResourceTypes.length > 0) {
        let filtered = [];
        resources.forEach((fhirResource) => {
            if (fhirResource.resourceType && !excludeResourceTypes.includes(fhirResource.resourceType)) {
                // getting the LOINC section for the resource
                const result = getResourceWithOptionalMetaData(fhirResource, fhirBundle, defaultSectionLOINC, defaultServiceType);
                // console.log("match not excluded resource: ", resource.resourceType)    
                filtered.push(result);
            }
        });
        resources = filtered; // overwritting with the filtered ones
    }
    else if (includeResourceTypes && includeResourceTypes.length && includeResourceTypes.length > 0) {
        let filtered = [];
        resources.forEach((fhirResource) => {
            if (fhirResource.resourceType && includeResourceTypes.includes(fhirResource.resourceType)) {
                // getting the LOINC section for the resource    
                // console.log("match for include resource: ", resource.resourceType)    
                filtered.push(fhirResource);
            }
        });
        resources = filtered; // overwritting with the filtered ones
    }
    // include only resources from some health sections 
    if (withSectionsLOINC) {
        let filtered = [];
        resources.forEach((resource) => {
            if (resource.meta && resource.meta.section && withSectionsLOINC.includes(resource.meta.section)) {
                // console.log("match resource by LOINC section: ", resource.meta.section)    
                filtered.push(resource);
            }
        });
        resources = filtered; // overwritting with the filtered ones
    }
    // include only resources from some healcare service categories
    if (fromServiceTypes) {
        let filtered = [];
        resources.forEach((resource) => {
            if (resource.meta && resource.meta.serviceType && fromServiceTypes.includes(resource.meta.serviceType)) {
                // console.log("match resource by service type: ", resource.meta.serviceType)    
                filtered.push(resource);
            }
        });
        resources = filtered; // overwritting with the filtered ones
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
    return resources;
}
exports.getResourcesWithFilters = getResourcesWithFilters;
function getResourcesInSection(fhirBundle, loincSectionCode) {
    /*
    return getResourcesWithFilters(bundle, undefined, undefined,
        undefined, undefined, [loincSectionCode], undefined, undefined)
    */
    let compositions = getResourcesByTypes(fhirBundle, ["Composition"]);
    if (compositions.length < 1)
        return {}; //returns empty
    if (!compositions[0].section || compositions[0].section.length < 1)
        return {}; //returns empty
    let sectionInComposition = Composition_1.getSectionByCodeInComposition(compositions[0], loincSectionCode);
    // It checks if the section has references to resources
    if (!sectionInComposition || !sectionInComposition.entry || sectionInComposition.entry.length < 1)
        return {}; //returns empty
    let sectionReferences = sectionInComposition.entry;
    let resources = getResourcesByReferences(fhirBundle, sectionReferences); // search resources by id in a Bundle from the array of references
    return resources;
    // */
}
exports.getResourcesInSection = getResourcesInSection;
// getResourcesWithFilters causes RangeError: Maximum call stack size exceeded
function getAllResourcesInBundle(fhirBundle, defaultSectionLOINC, defaultServiceType) {
    /*
    const test = getResourcesWithFilters(fhirBundle, defaultSectionLOINC, defaultServiceType,
        undefined, undefined, undefined, undefined, undefined)
    */
    if (!fhirBundle || fhirBundle.resourceType != "Bundle" || !fhirBundle.entry || !fhirBundle.entry.length || fhirBundle.entry.length < 1)
        return []; // or error?
    let results = [];
    fhirBundle.entry.forEach(function (entry) {
        if (entry.resource && entry.resource.resourceType) {
            const result = getResourceWithOptionalMetaData(entry.resource, fhirBundle, defaultSectionLOINC, defaultServiceType);
            results.push(result);
        }
    });
    return results;
    // */
}
exports.getAllResourcesInBundle = getAllResourcesInBundle;
//----
function getResourceWithOptionalMetaData(fhirResource, fhirBundle, defaultSectionLOINC, defaultServiceType) {
    const containsSections = hasSections(fhirBundle);
    // getting the LOINC section for the resource
    let loincSectionCode = "";
    if (containsSections) {
        loincSectionCode = getSectionCodeForResourceIdInBundle(fhirBundle, fhirResource.id);
    }
    else if (defaultSectionLOINC) {
        loincSectionCode = defaultSectionLOINC;
    }
    // setting LOINC section in the meta data of the resource (if any)
    if (loincSectionCode !== "") {
        fhirResource.meta = {
            ...fhirResource.meta,
            section: loincSectionCode
        };
    }
    // if meta.serviceType does not exist in the FHIR resource, then put the default serviceType (if provided)
    if (defaultServiceType) {
        if (!fhirResource.meta.serviceType) {
            fhirResource.meta.serviceType = defaultServiceType;
        }
    }
    return fhirResource;
}
exports.getResourceWithOptionalMetaData = getResourceWithOptionalMetaData;
/**
 * It returns the code of the section or empty string ("") if not found.
 * Optionally, the main function can pass the composition as parameter, but it is not required.
 */
function getSectionCodeForResourceIdInBundle(bundleDocument, resourceId, composition) {
    if (!resourceId)
        return "";
    // It gets the composition if some is available in the document and it was not given as parameter
    if (!composition) {
        const compositions = getResourcesByTypes(bundleDocument, ['Composition']);
        if (compositions && compositions.length && compositions.length > 0) {
            composition = compositions[0];
        }
    }
    let result = "";
    // It returns the section code if the resourceId is found in some section as reference (entry)
    if (composition) {
        if (composition.section && composition.section.length && composition.section.length > 0) {
            composition.section.some(function (compositionSection) {
                if (compositionSection.code && compositionSection.entry && compositionSection.entry.length && compositionSection.entry.length > 0) {
                    compositionSection.entry.some(function (reference) {
                        const cleanResourceId = CommonFHIR_1.getCleanId(resourceId);
                        if (reference.reference && reference.reference.includes(cleanResourceId)) {
                            // fhirUtils.codeableConcept.getCodeListInCodeableConcept
                            if (compositionSection.code && compositionSection.code.coding && compositionSection.code.coding.length &&
                                compositionSection.code.coding.length > 0 && compositionSection.code.coding[0].code) {
                                result = compositionSection.code.coding[0].code;
                                // console.log('section code found = ', result)
                                return true; // it breaks the 'some' iteration
                            }
                        }
                    });
                    if (result !== '')
                        return true; // it breaks the 'some' iteration
                }
            });
        }
    }
    return result;
}
exports.getSectionCodeForResourceIdInBundle = getSectionCodeForResourceIdInBundle;
function getCleanIdOfDocumentComposition(fhirBundle) {
    // Composition is always fhirBundle.entry[0].resource in a FHIR Document or it is not a Bundle Document
    if (!fhirBundle || !fhirBundle.entry || !fhirBundle.entry.length || fhirBundle.entry.length < 1 ||
        !fhirBundle.entry[0].resource || !fhirBundle.entry[0].resource.resourceType ||
        fhirBundle.entry[0].resource.resourceType !== "Composition" || !fhirBundle.entry[0].resource.id) {
        return ""; // instead of error
    }
    else {
        // fullUrn should contain the URN and the Compositon.id should 
        return CommonFHIR_1.getCleanIdByFhirResource(fhirBundle.entry[0].resource);
    }
}
exports.getCleanIdOfDocumentComposition = getCleanIdOfDocumentComposition;
function getTimestamp(fhirBundle) {
    if (fhirBundle.timestamp)
        return fhirBundle.timestamp;
    if (fhirBundle.entry && fhirBundle.entry.length && fhirBundle.entry.length > 0 && fhirBundle.entry[0].resource
        && fhirBundle.entry[0].resource.resourceType && fhirBundle.entry[0].resource.resourceType == "Composition"
        && fhirBundle.entry[0].resource.date)
        return fhirBundle.entry[0].resource.date;
    return ""; // else returns empty
}
exports.getTimestamp = getTimestamp;
/** deprecated: use createEmptyBundleWithId. CreateEmptyBundle does not adds composition as the default Bundle.entry[0] resource (use createBundleDocumentWithComposition) */
function createEmptyBundle(bundleType, language) {
    let bundle = {
        resourceType: "Bundle",
        type: bundleType,
        id: uuid_1.v4(),
        timestamp: new Date().toISOString()
    };
    if (language)
        bundle.language = language;
    return bundle;
}
/** createEmptyBundleWithId does not adds composition as the default Bundle.entry[0] resource (use createBundleDocumentWithCompositionAndId) */
function createEmptyBundleWithId(id, bundleType, language) {
    let bundle = {
        id: id,
        resourceType: "Bundle",
        timestamp: new Date().toISOString(),
        type: bundleType,
    };
    if (language)
        bundle.language = language;
    return bundle;
}
// TODO: create another function to add the resource to the composition index
// export function addResourceToBundleAndIndex(bundle:R4.IBundle, resource:any, sectionCode:string): R4.IBundle{}
// TODO: create another function for adding resources to the Composition index by section
// export function addAdditionalResourcesToBundleAndIndex(bundle:R4.IBundle, resources:any[], sectionCode:string): R4.IBundle {
// It adds a bundle resource including Composition or HeaderMessage and skips if already present
function addResourceToBundle(bundle, resource) {
    if (!resource.resourceType)
        return bundle;
    // Only for debugging, resourceType "Bundle" MUST BE ADDED ONLY when creating a FHIR MESSAGE but NOT WHEN CREATING A BUNDLE DOCUMENT (just resource entries)
    // if (resource.resourceType!="Bundle"&&resource.resourceType!="Composition"&&resource.resourceType!="Communication"&&resource.resourceType!="AuditEvent"&&  resource.resourceType!="MessageHeader")  console.log("Health resource type received in addResourceToBundleFHIR = ", resource.resourceType)
    // It checks if resource is already present and returns if true
    if (resource.id) {
        let existingResourcesIds = getResourceIdsInBundle(bundle);
        if (existingResourcesIds.includes(resource.id)) {
            // console.log("resource id already existis in bundle, so skiping it ")
            return bundle;
        }
    }
    // it prepares the new resource as a new entry in the bundle and inserts it
    let newEntry = {
        // TODO: fullUrl: "urn:uhc:...:uuid"
        resource: resource
    };
    if (bundle.entry && bundle.entry.length > 0)
        bundle.entry.push(newEntry);
    else
        bundle.entry = [newEntry];
    // console.log("resulting bundle from addResourceToBundle = ", JSON.stringify(bundle))
    return bundle;
}
exports.addResourceToBundle = addResourceToBundle;
// DONE: renaming 'addAdditionalResourcesToBundle' as 'addResourcesToBundle'
/** It adds resources except 'Composition', 'MessageHeader' and also skips if empty resource.id or already exists, both for Bundle Document and Bundle Message */
function addResourcesToBundle(bundle, resources) {
    // console.log("addAdditionalResourcesToBundle with resources = ", JSON.stringify(resources))
    if (!bundle || bundle.resourceType != "Bundle")
        throw new Error("Not a FHIR Bundle"); // return {} as R4.IBundle
    if (!resources || !resources.length || resources.length < 1)
        throw new Error("No 'AdditionalResources' to add"); // for debugging, instead of return the original bundle without error
    // TODO: it validates the FHIR object and gets the validated value or returns empty
    let newBundle = { ...bundle };
    // let existingResourcesIds:string[] = getResourceIdsInBundle(bundle)
    resources.forEach(function (resource) {
        if (resource) { // e.g. it can be undefined when a function generating a Bundle with an Immunization and an optional DocumentReference
            // it checks if it is a FHIR resource and skips it if resource.id is already present
            if (!resource.id)
                console.warn("Resource ID is missing and it was not added to the FHIR Bundle document");
            if (resource.id && resource.resourceType && resource.resourceType != "Composition" && resource.resourceType != "MessageHeader") {
                // console.info("OK: resource not exists, so adding resource to bundle")
                // It adds a bundle resource including Composition or HeaderMessage and skips if already present
                newBundle = addResourceToBundle(newBundle, resource);
            }
        }
    });
    return newBundle;
}
exports.addResourcesToBundle = addResourcesToBundle;
function getResourcesByReferences(bundle, references) {
    const validBundle = bundle;
    if (!validBundle.entry || validBundle.entry.length < 1)
        return [];
    let results = [];
    references.forEach(function (item) {
        const validItem = item;
        if (validItem && validItem.reference) {
            let reference = validItem.reference.split("/");
            // The ID of the resource will be in the position "reference.length-1" of the splitted string
            if (reference.length > 0) { // there is an ID
                results.push(getResourceByIdInBundle(reference[reference.length - 1], validBundle));
            }
        }
    });
    return results;
}
function getReferencesInBundleEntries(entries) {
    if (entries.length < 1)
        return [];
    let references = [];
    entries.forEach(function (entry) {
        if (entry.resource && entry.resource.id) {
            let newReference = { reference: entry.resource.id };
            references.push(newReference);
        }
    });
    return references;
}
// TODO: put display and text of the section (translation)
function addReferencesInBundleEntriesToComposition(composition, entries, loincSectionCode) {
    // TODO: check bundle
    // It gets the validated composition to be updated
    let newComposition = { ...composition };
    // It gets or creates the section
    let section = Composition_1.getSectionByCodeInComposition(newComposition, loincSectionCode); // error if section has no code
    if (!section) {
        section = Composition_1.createEmptyCompositionSection(loincSectionCode);
    }
    // It gets the references to the resources and puts them into the section
    let references = getReferencesInBundleEntries(entries);
    section = Composition_1.addReferencesToCompositionSection(section, references);
    // It updates the section into the composition
    newComposition = Composition_1.putSectionInComposition(newComposition, section);
    return newComposition;
}
// the first resource type in the bundle document must be a composition: http://hl7.org/fhir/bundle.html
function isIPS(bundleDocument) {
    const documentKind = Composition_1.getTypeOfBundleDocumentComposition(bundleDocument);
    if (documentKind && documentKind === Loinc_1.medicalHistoryClassification.ips) {
        return true;
    }
    else {
        return false;
    }
}
exports.isIPS = isIPS;
/** It assumes the composition index it the 1st resource in the Bundle Document or will return false */
function hasSections(bundleDocument) {
    if (!bundleDocument || !bundleDocument.type || bundleDocument.type !== ts_fhir_types_1.R4.BundleTypeKind._document) {
        // console.log("no sections in bundle")
        return false;
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
    if (!bundleDocument || !bundleDocument.entry || !bundleDocument.entry.length || bundleDocument.entry.length < 1
        || !bundleDocument.entry[0].resource || !bundleDocument.entry[0].resource) {
        return false;
    }
    const composition = bundleDocument.entry[0].resource;
    if (!composition.section || !composition.section.length || composition.section.length < 1) {
        return false;
    }
    return true;
}
exports.hasSections = hasSections;
// TODO: set the UHC identifier, not only the id
function createEmptyIPS(authorReferenceId) {
    return createBundleDocumentWithComposition(authorReferenceId, Loinc_1.medicalHistoryClassification.ips);
}
exports.createEmptyIPS = createEmptyIPS;
// TODO: it does not check for the meta.version of the document
function addEntriesToBundle(bundle, entries) {
    let newBundle = bundle;
    let currentIds = getResourceIdsInBundle(newBundle);
    entries.forEach(function (bundleEntry) {
        // it checks if there is a FHIR resource (check if bundleEntry.resource.id or not?)
        if (bundleEntry.resource && bundleEntry.resource.resourceType && bundleEntry.resource.id) {
            // let cleanId:string = cleanId(bundleEntry.resource.id) // TODO: get the alone id from a id with type of reference "resourceType/id"
            if (!currentIds.includes(bundleEntry.resource.id)) {
                // TODO: check the meta for the version of the document
                if (!newBundle.entry || newBundle.entry.length < 1)
                    newBundle.entry = [bundleEntry];
                else
                    newBundle.entry.push(bundleEntry);
            }
        }
    });
    return newBundle;
}
exports.addEntriesToBundle = addEntriesToBundle;
// TODO: generate the entry.fullUrl and reference as "resourceType/id"
function addResourcesBySection(bundleDocument, sectionCode, resources) {
    let compositions = getResourcesByTypes(bundleDocument, ["Composition"]);
    if (compositions.length < 1)
        return {}; //returns empty TODO: error or create new Composition?
    // if it was created as an empty IPS document then it does not have any section yet
    // It updates the resources references of the section into the composition entry of the bundle
    let newComposition = Composition_1.addResourcesToComposition(compositions[0], resources, sectionCode);
    // Then it adds the new resources to the bundle
    let newBundle = addResourcesToBundle(bundleDocument, resources);
    // Finally it replaces the composition with the new references to the added resources
    newBundle = replaceResourceById(newComposition, newBundle);
    return newBundle;
}
exports.addResourcesBySection = addResourcesBySection;
function addEntriesBySection(bundleDocument, bundleEntries, sectionCode, sectionSystem) {
    let compositions = getResourcesByTypes(bundleDocument, ["Composition"]);
    if (compositions.length < 1)
        return {}; //returns empty
    // if it was created as an empty IPS document then it does not have any section yet
    let resources;
    // It updates the resources references of the section into the composition entry of the bundle
    let newComposition = addReferencesInBundleEntriesToComposition(compositions[0], bundleEntries, sectionCode);
    // Then it adds the new resources to the bundle
    let newBundle = addEntriesToBundle(bundleDocument, bundleEntries);
    // Finally it replaces the composition with the new references to the added resources
    newBundle = replaceResourceById(newComposition, newBundle);
    return newBundle;
}
exports.addEntriesBySection = addEntriesBySection;
function getReferencesInSection(section) {
    // TODO: do validations
    if (!section.entry || section.entry.length < 1)
        return {}; // returns empty if none
    let entryCompositionReferencesInSection = [];
    section.entry.forEach(function (item) {
        if (item.reference)
            entryCompositionReferencesInSection.push(item);
    });
    return entryCompositionReferencesInSection;
}
exports.getReferencesInSection = getReferencesInSection;
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
function getResourceIdsInBundle(bundle) {
    let entries = bundle.entry;
    if (!entries || !entries.length || entries.length < 1)
        return [];
    let results = [];
    entries.forEach(function (entry) {
        if (entry.resource && entry.resource.id) {
            let idArray = entry.resource.id.split("/");
            // The ID of the resource will be in the position "reference.length-1" of the splitted string
            if (idArray.length > 0) { // there is an ID
                results.push(idArray[idArray.length - 1]);
            }
        }
    });
    return results;
}
exports.getResourceIdsInBundle = getResourceIdsInBundle;
// It returns an arry of IDs, splitting the ID by "/" and getting the last string after the slash
function getResourceReferencesBySectionCodeLOINC(bundleDocumentIPS, sectionCode) {
    // the FHIR resources are within document.entry[] and the Composition resource (document index) is always in the first entry
    if (!bundleDocumentIPS || !bundleDocumentIPS.entry || !bundleDocumentIPS.entry.length || bundleDocumentIPS.entry.length < 1) {
        return [];
    }
    // the health sections are in the Composition resource (first entry in the bundle document): document.entry[0].resource.section[]
    const documentComposition = bundleDocumentIPS.entry[0].resource;
    // const documentComposition = getResourcesByTypes(bundleDocumentIPS, ["Composition"])[0]
    if (!documentComposition || !documentComposition.section || !documentComposition.section.length || documentComposition.section.length < 1) {
        return [];
    }
    let references = [];
    documentComposition.section.forEach(function (section) {
        const code = CodeableConcept_1.getCodeListInCodeableConcept(section.code, models_1.CodingSystem.loinc);
        if (code && code.length && code.length > 0 && code[0] === sectionCode) {
            if (section.entry && section.entry.length && section.entry.length > 0) {
                section.entry.forEach(function (dataReference) {
                    // adding all the references within the health section
                    if (dataReference.reference)
                        references.push(dataReference.reference);
                });
            }
        }
    });
    return references;
}
exports.getResourceReferencesBySectionCodeLOINC = getResourceReferencesBySectionCodeLOINC;
function getResourceByIdInBundle(resourceId, bundle) {
    if (!bundle.entry || bundle.entry.length < 1)
        return {};
    let fhirResource;
    let result = bundle.entry.some(function (item) {
        if (item.resource && item.resource.id == resourceId) {
            fhirResource = item.resource;
            return true;
        }
    });
    if (!result)
        return {};
    else
        return fhirResource;
}
exports.getResourceByIdInBundle = getResourceByIdInBundle;
// It replaces the given resource in the right Bundle.entry without generating Bundle.entry[].fullUrl
function replaceResourceById(resource, bundle) {
    // It checks the required inputs
    if (!resource.id)
        throw new Error("Resource doesn't have any ID");
    let updatedBundle = bundle;
    if (!updatedBundle.entry || updatedBundle.entry.length < 1)
        throw new Error("No resources were found");
    // It searchs the resource by its id, generates a new entry with the given resource and replaces the entry in the Bundle
    updatedBundle.entry.some(function (item, entryIndex, bundleEntries) {
        if (item.resource && item.resource.id && item.resource.id == resource.id) {
            // Create a completely new entry whitout entry.fullUrl
            let newEntry = { resource: resource };
            bundleEntries[entryIndex] = newEntry;
            return true;
        }
    });
    return updatedBundle;
}
exports.replaceResourceById = replaceResourceById;
function getMediaInBundle(bundle) {
    if (!bundle || bundle.resourceType != "Bundle")
        return [];
    if (!bundle.entry || bundle.entry.length <= 0)
        return [];
    return getMediaInBundleEntries(bundle.entry);
}
exports.getMediaInBundle = getMediaInBundle;
function getMediaInBundleEntries(entries) {
    let mediaContents = [];
    entries.forEach(function (item) {
        if (item.resource && item.resource.resourceType == "Media")
            mediaContents.push(item.resource);
    });
    return mediaContents;
}
