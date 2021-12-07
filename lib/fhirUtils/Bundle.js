"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBundleDocumentComposition = exports.getBundleDocumentCompositionWithValidation = exports.getMediaInBundle = exports.replaceResourceById = exports.getResourceByIdInBundle = exports.getResourceReferencesBySectionCodeLOINC = exports.getResourceIdsInBundle = exports.getReferencesInSection = exports.addResourcesWithOptions = exports.addResourceToSection = exports.addResourcesToSection = exports.addResourceAsBundleEntry = exports.addEntriesBySection = exports.addEntriesToBundle = exports.hasSections = exports.isIPS = exports.getTimestamp = exports.getCleanIdOfDocumentComposition = exports.getSectionCodeForResourceIdInBundle = exports.getResourceWithOptionalMetaData = exports.getResourcesInSection = exports.getResourcesWithFilters = exports.getResourcesByTypesWithOptionalMetadata = exports.createBundleDocumentAndCompositionWithIds = exports.Bundle = void 0;
const ts_fhir_types_1 = require("@ahryman40k/ts-fhir-types");
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
    /** it does not validate bundle document properties or Composition mandatory properties */
    getBundleDocumentComposition(fhirBundleDocument) {
        return getBundleDocumentComposition(fhirBundleDocument);
    }
    /** First it checks if there is a valid 'Composition' resource (with title, type, date and status)
     * as first resource in the FHIR Bundle document, then return the type code if any or undefined */
    getBundleDocumentCompositionWithValidation(fhirBundleDocument) {
        return getBundleDocumentCompositionWithValidation(fhirBundleDocument);
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
    // TODO review, use getResourcesByTypes instead of getResourcesWithFilters to avoid circular dependencies
    /** It gets resources with additional metadata */
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
    addEntriesToBundle(bundle, entries) {
        return addEntriesToBundle(bundle, entries);
    }
    addEntriesBySection(bundleDocument, bundleEntries, sectionCode, sectionSystem) {
        return addEntriesBySection(bundleDocument, bundleEntries, sectionCode, sectionSystem);
    }
    /** It adds a bundle resource including Composition or HeaderMessage and skips if already present */
    addResourceAsBundleEntry(bundle, resource, fullUrl) {
        return addResourceAsBundleEntry(bundle, resource, fullUrl);
    }
    /** It adds resources to a given health section but excluding some resources by its type.
     * It returns error if composition does not exits in the document bundle.
     * 'fullUrlPrefix' can be passed for creating the 'fullUrl' in the bundle entries.
     * It uses addResourcesToComposition, addResourcesWithOptions and updateComposition.
     * TODO: generate reference as "resourceType/id"
     */
    addResourcesToSection(bundleDocument, resources, sectionCode, excludeResources) {
        return addResourcesToSection(bundleDocument, resources, sectionCode, excludeResources);
    }
    /** It adds the resource to the composition, updates the composition and adds the resource as bundle entry */
    addResourceToSection(bundleDocument, resource, sectionCode, fullUrl) {
        return addResourceToSection(bundleDocument, resource, sectionCode, fullUrl);
    }
    /** It adds resources both for Bundle document, Bundle composition and Bundle Message.
     * If sectionCodeLOINC is provided then the Bundle SHALL be a document with composition or it will throw an error */
    addResourcesWithOptions(bundle, resources, excludeResources, sectionCodeLOINC, fullUrlPrefix) {
        return addResourcesWithOptions(bundle, resources, sectionCodeLOINC, excludeResources, fullUrlPrefix);
    }
    /** it checks if composition exists and replace it or error. TODO: verify the ID? */
    updateComposition(bundleDocument, composition) {
        return Composition_1.updateComposition(bundleDocument, composition);
    }
    /** Creates a Bundle document with all mandatory properties in the document 'Composition' resource (the index) */
    createBundleDocumentAndCompositionWithIds(bundleId, compositionId, authorReferenceId, date, title, status, typeDocumentCode, typeDocumentSystem, typeDocumentDisplay, language, resources, excludeResources) {
        return createBundleDocumentAndCompositionWithIds(bundleId, compositionId, authorReferenceId, date, title, status, typeDocumentCode, typeDocumentSystem, typeDocumentDisplay, typeDocumentDisplay, resources, excludeResources);
    }
} // end class Bundle
exports.Bundle = Bundle;
// ---- FUNCTIONS ----
// NOTE: the exported functions can be used by other external managers (classes)
/** Creates a Bundle document with all mandatory properties in the document 'Composition' resource (the index) */
function createBundleDocumentAndCompositionWithIds(bundleId, compositionId, authorReferenceId, date, title, status, typeDocumentCode, typeDocumentSystem, typeDocumentDisplay, language, resources, excludeResources) {
    // console.log(`createBundleDocumentWithCompositionAndURNs with ${resources.length} resources`)
    let basicComposition = Composition_1.createCompositionWithId(compositionId, authorReferenceId, date, title, status, typeDocumentCode, typeDocumentSystem, typeDocumentDisplay, language);
    //console.log("basicComposition = ", basicComposition)
    // It creates the bundle documment, adds the composition and the additional resources
    let bundle = createEmptyBundleWithId(bundleId, ts_fhir_types_1.R4.BundleTypeKind._document);
    bundle = addResourceAsBundleEntry(bundle, basicComposition);
    // TODO: addAdditionalResourcesToBundle SHOULD ADD RESOURCES TO COMPOSITION
    if (resources && resources.length && resources.length > 0)
        bundle = addResourcesWithOptions(bundle, resources);
    // console.log("createBundleDocumentWithComposition resulting bundle= ", JSON.stringify(bundle))
    return bundle;
}
exports.createBundleDocumentAndCompositionWithIds = createBundleDocumentAndCompositionWithIds;
/** createEmptyBundleWithId does not adds composition as the default Bundle.entry[0] resource (use createBundleDocumentWithCompositionAndId for that) */
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
function getResourcesByTypesWithOptionalMetadata(fhirBundle, includeResourceTypes, defaultCodeLOINC) {
    // not using getResourcesWithFilters here to avoid circular dependencies
    let results = [];
    if (fhirBundle && fhirBundle.resourceType === "Bundle" && fhirBundle.entry && fhirBundle.entry.length
        && fhirBundle.entry.length > 0 && includeResourceTypes.length && includeResourceTypes.length > 0) {
        fhirBundle.entry.forEach(function (entry) {
            if (entry.resource && entry.resource.resourceType && includeResourceTypes.includes(entry.resource.resourceType)) {
                // console.log("resource by type found: ", entry.resource.resourceType)
                let sectionCodeLOINC = getSectionCodeForResourceIdInBundle(fhirBundle, entry.resource.id);
                if (!sectionCodeLOINC) {
                    if (defaultCodeLOINC) {
                        sectionCodeLOINC = defaultCodeLOINC;
                    }
                    else {
                        sectionCodeLOINC = Loinc_1.medicalHistoryClassification.defaultMedicalRecords;
                    }
                }
                const resource = getResourceWithOptionalMetaData(entry.resource, fhirBundle, Loinc_1.medicalHistoryClassification.defaultMedicalRecords);
                results.push(resource);
            }
        });
    }
    return results;
}
exports.getResourcesByTypesWithOptionalMetadata = getResourcesByTypesWithOptionalMetadata;
/**
 * 'defaultSectionLOINC' is used in case the FHIR Bundle does not have any section in a composition resource.
 * 'defaultServiceType' is used in case the FHIR resource does not have meta.serviceType as creator healthcare service of the resource.
 */
function getResourcesWithFilters(fhirBundle, defaultSectionLOINC, defaultServiceType, excludeResourceTypes, includeResourceTypes, withSectionsLOINC, fromServiceTypes, withCodes) {
    // it adds meta.section if the document has sections or the LOINC section code of the biography if not
    const containsSections = hasSections(fhirBundle);
    // it puts meta.section for every resource, if available
    let resources = getResourcesWithOptionalMetadata(fhirBundle);
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
    /* do not use it to avoid circular dependencies
    return getResourcesWithFilters(bundle, undefined, undefined,
        undefined, undefined, [loincSectionCode], undefined, undefined)
    */
    let resources = [];
    let composition = getBundleDocumentComposition(fhirBundle);
    if (!composition) {
        return resources;
    }
    let sectionInComposition = Composition_1.getSectionByCodeInComposition(composition, loincSectionCode);
    // It checks if the section has references to resources
    if (!sectionInComposition || !sectionInComposition.entry || sectionInComposition.entry.length < 1) {
        return resources; // empty
    }
    let sectionReferences = sectionInComposition.entry;
    resources = getResourcesByReferences(fhirBundle, sectionReferences); // search resources by id in a Bundle from the array of references
    return resources;
    // */
}
exports.getResourcesInSection = getResourcesInSection;
function getResourcesWithOptionalMetadata(fhirBundle, defaultSectionLOINC, defaultServiceType) {
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
//----
/** It gets the section code LOINC for the resource from the Bundle document Composition, use the given 'defaultSectionLOINC' if not found or generic 'Medical records' if none */
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
    else {
        loincSectionCode = Loinc_1.medicalHistoryClassification.defaultMedicalRecords;
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
        composition = getBundleDocumentComposition(bundleDocument);
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
/** It sets the section code LOINC for each resource from the Bundle document Composition, use the given 'defaultSectionLOINC' if not found or generic 'Medical records' if none */
function getResourcesByReferences(bundle, references, defaultCodeLOINC) {
    let results = [];
    if (!bundle.entry || bundle.entry.length < 1) {
        return results; // empty
    }
    references.forEach(function (fhirReference) {
        if (fhirReference && fhirReference.reference) {
            // do not use cleanId because if URN the cleanId will not match in the search
            let splittedReferenceURN = fhirReference.reference.split("/");
            // The ID of the resource will be in the position "reference.length-1" (last position) of the splitted string
            if (splittedReferenceURN.length > 0) { // there is an ID
                const resourceId = splittedReferenceURN[splittedReferenceURN.length - 1];
                let resource = getResourceByIdInBundle(resourceId, bundle);
                resource = getResourceWithOptionalMetaData(resource, bundle, defaultCodeLOINC);
                results.push(resource);
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
        return false;
    }
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
/** It returns error if composition does not exits in the document bundle. TODO: create and add a new composition?
 * TODO: exlude resources by resourceType
 */
function addEntriesBySection(bundleDocument, bundleEntries, sectionCode, sectionSystem) {
    if (!bundleDocument || !bundleDocument.entry || !bundleDocument.entry.length
        || bundleDocument.entry.length < 1 || !bundleDocument.entry[0].resource
        || !bundleDocument.entry[0].resource.resourceType
        || bundleDocument.entry[0].resource.resourceType !== 'Composition') {
        throw new Error(`Bundle document does not have Composition`);
    }
    const composition = bundleDocument.entry[0].resource;
    // It updates the resources references of the section into the composition entry of the bundle
    let newComposition = addReferencesInBundleEntriesToComposition(composition, bundleEntries, sectionCode);
    // Then it adds the new resources to the bundle
    let newBundle = addEntriesToBundle(bundleDocument, bundleEntries);
    // Finally it replaces the composition with the new references to the added resources
    newBundle = replaceResourceById(newComposition, newBundle);
    return newBundle;
}
exports.addEntriesBySection = addEntriesBySection;
/** It just adds a new entry (it does not update Composition or MessageHeader resources) */
function addResourceAsBundleEntry(bundle, resource, fullUrl) {
    if (!resource.resourceType || !resource.id) {
        return bundle;
    }
    // It checks if resource is already present
    let existingResourcesIds = getResourceIdsInBundle(bundle);
    if (existingResourcesIds.includes(resource.id)) {
        // console.log("resource id already existis in bundle, so skiping it ")
        return bundle;
    }
    // it prepares the new resource as a new entry in the bundle and inserts it
    let newEntry = {
        fullUrl: fullUrl,
        resource: resource
    };
    bundle.entry ? bundle.entry.push(newEntry) : bundle.entry = [newEntry];
    // console.log("resulting bundle from addResourceToBundle = ", JSON.stringify(bundle))
    return bundle;
}
exports.addResourceAsBundleEntry = addResourceAsBundleEntry;
/** It adds resources to a given health section but excluding some resources by its type.
 * It returns error if composition does not exits in the document bundle.
 * 'fullUrlPrefix' can be passed for creating the 'fullUrl' in the bundle entries.
 * It uses addResourcesToComposition, addResourcesWithOptions and updateComposition.
 * TODO: generate reference as "resourceType/id"
 */
function addResourcesToSection(bundleDocument, resources, sectionCode, excludeResources, fullUrlPrefix) {
    if (!bundleDocument || !bundleDocument.entry || !bundleDocument.entry.length
        || bundleDocument.entry.length < 1 || !bundleDocument.entry[0].resource
        || !bundleDocument.entry[0].resource.resourceType
        || bundleDocument.entry[0].resource.resourceType !== 'Composition') {
        throw new Error(`Bundle document does not have Composition`);
    }
    const composition = bundleDocument.entry[0].resource;
    // if it was created as an empty IPS document then it does not have any section yet
    if (excludeResources && excludeResources.length && excludeResources.length > 0) {
        resources = resources.filter(resource => {
            // filter that includes only resources that are not in the exclusion list
            return !(excludeResources.includes(resource.resourceType));
        });
    }
    // It updates the resources references of the section into the composition entry of the bundle
    let updatedComposition = Composition_1.addResourcesToComposition(composition, resources, sectionCode);
    // Then it adds the new resources to the bundle
    bundleDocument = addResourcesWithOptions(bundleDocument, resources, undefined, excludeResources, fullUrlPrefix);
    // Finally it replaces the composition
    return Composition_1.updateComposition(bundleDocument, updatedComposition); // instead of replaceResourceById(newComposition, newBundle)
}
exports.addResourcesToSection = addResourcesToSection;
/** It adds the resource to the composition, updates the composition and adds the resource as bundle entry */
function addResourceToSection(bundleDocument, resource, sectionCode, fullUrl) {
    if (!bundleDocument || !bundleDocument.entry || !bundleDocument.entry.length
        || bundleDocument.entry.length < 1 || !bundleDocument.entry[0].resource
        || !bundleDocument.entry[0].resource.resourceType
        || bundleDocument.entry[0].resource.resourceType !== 'Composition') {
        throw new Error(`Bundle document does not have Composition`);
    }
    else {
        // adding resource to the composition and updating the composition in the bundle document
        const composition = Composition_1.addResourcesToComposition(bundleDocument.entry[0].resource, [resource], sectionCode);
        bundleDocument.entry[0].resource = composition; // simple operation, it is not necessary to call to 'updateComposition'
        // adding the resource as bundle entry
        bundleDocument = addResourceAsBundleEntry(bundleDocument, resource, fullUrl);
        return bundleDocument;
    }
}
exports.addResourceToSection = addResourceToSection;
/** It adds resources both for Bundle document, Bundle composition and Bundle Message.
 * If sectionCodeLOINC is provided then the Bundle SHALL be a document with composition or it will throw an error */
function addResourcesWithOptions(bundle, resources, sectionCodeLOINC, excludeResources, fullUrlPrefix) {
    if (!resources || !resources.length || resources.length < 1) {
        console.warn('cannot add resources because no resource was given'); // for debugging
        return bundle;
    }
    resources.forEach(function (resource) {
        if (!resource.resourceType || !resource.id) {
            console.warn("Skipping invalid resource");
        }
        else {
            // valid resource
            if (!excludeResources ||
                !(excludeResources.includes(resource.resourceType))) {
                // non-excluded resource
                let existingResourcesIds = getResourceIdsInBundle(bundle);
                if (existingResourcesIds.includes(resource.id)) {
                    console.log(`skipping already existing resource ${resource.id}`);
                }
                else {
                    // if a section is given put the resource in the section
                    if (!sectionCodeLOINC) {
                        bundle = addResourceAsBundleEntry(bundle, resource);
                    }
                    else {
                        let fullUrl = undefined;
                        if (fullUrlPrefix) {
                            fullUrl = fullUrlPrefix + resource.id;
                        }
                        bundle = addResourceToSection(bundle, resource, sectionCodeLOINC, fullUrl);
                    }
                }
            }
        }
    });
    return bundle;
}
exports.addResourcesWithOptions = addResourcesWithOptions;
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
/** First it checks if there is a valid 'Composition' resource (with title, type, date and status)
 * as first resource in the FHIR Bundle document, then return the type code if any or undefined */
function getBundleDocumentCompositionWithValidation(fhirBundleDocument) {
    // first checking if it is a valid composition with title, type, date and status as first resource in the FHIR Bundle document
    if (fhirBundleDocument && fhirBundleDocument.id && fhirBundleDocument.resourceType && fhirBundleDocument.resourceType === 'Bundle'
        && fhirBundleDocument.type && fhirBundleDocument.type === ts_fhir_types_1.R4.BundleTypeKind._document
        && fhirBundleDocument.entry && fhirBundleDocument.entry.length && fhirBundleDocument.entry.length > 0
        && fhirBundleDocument.entry[0].resource && fhirBundleDocument.entry[0].resource.id
        && fhirBundleDocument.entry[0].resource.resourceType && fhirBundleDocument.entry[0].resource.resourceType === 'Composition'
        && fhirBundleDocument.entry[0].resource.type && fhirBundleDocument.entry[0].resource.type.coding
        && fhirBundleDocument.entry[0].resource.type.coding.length && fhirBundleDocument.entry[0].resource.type.coding.length > 0
        && fhirBundleDocument.entry[0].resource.type.coding[0].code && fhirBundleDocument.entry[0].resource.status
        && fhirBundleDocument.entry[0].resource.date && fhirBundleDocument.entry[0].resource.date !== ''
        && fhirBundleDocument.entry[0].resource.title && fhirBundleDocument.entry[0].resource.title !== '') {
        // TODO: ckeck date and status
        return fhirBundleDocument.entry[0].resource;
    }
    else {
        return undefined;
    }
}
exports.getBundleDocumentCompositionWithValidation = getBundleDocumentCompositionWithValidation;
/** it does not validate bundle document properties or Composition mandatory properties */
function getBundleDocumentComposition(fhirBundleDocument) {
    // it does not validate bundle document nor composition mandatory properties
    if (fhirBundleDocument && fhirBundleDocument.entry && fhirBundleDocument.entry.length
        && fhirBundleDocument.entry.length > 0 && fhirBundleDocument.entry[0].resource
        && fhirBundleDocument.entry[0].resource.resourceType
        && fhirBundleDocument.entry[0].resource.resourceType === 'Composition') {
        return fhirBundleDocument.entry[0].resource;
    }
    else {
        return undefined;
    }
}
exports.getBundleDocumentComposition = getBundleDocumentComposition;
