"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaInBundle = exports.replaceResourceById = exports.getObservationsByCode = exports.getResourceByIdInBundle = exports.getResourcesByTypes = exports.getResourceIdsInBundle = exports.getAllResourcesWithoutCompositionOrMessageHeader = exports.getAllResourcesInBundleEntries = exports.getResourcesInSection = exports.getReferencesInSection = exports.addEntriesBySection = exports.addResourcesBySection = exports.addEntriesToBundle = exports.createEmptyIPS = exports.isIPS = exports.createBundleDocumentWithComposition = exports.addAdditionalResourcesToBundle = exports.addResourceToBundle = exports.getTagsOfBundleDocument = exports.getTimestamp = exports.Bundle = void 0;
const ts_fhir_types_1 = require("@ahryman40k/ts-fhir-types");
const uuid_1 = require("uuid");
// import { convertUuidToUuid58 } from 'uuid58'
const Loinc_1 = require("./Loinc");
const Composition_1 = require("./Composition");
const CodeableConcept_1 = require("./CodeableConcept");
const Covid19_1 = require("./Covid19");
class Bundle {
    constructor() {
    }
    getTimestamp(fhirBundle) {
        return getTimestamp(fhirBundle);
    }
    getTagsOfBundleDocument(bundleDocument) {
        return getTagsOfBundleDocument(bundleDocument);
    }
    // the first resource type in the bundle document must be a composition: http://hl7.org/fhir/bundle.html
    isIPS(bundleDocument) {
        return isIPS(bundleDocument);
    }
    // TODO: ADD RESOURCES TO COMPOSITION SECTIONS AND FULLURL
    // It adds a bundle resource including Composition or HeaderMessage and skips if already present
    addResourceToBundle(bundle, resource, sectionCode, sectionSystem) {
        return addResourceToBundle(bundle, resource, sectionCode, sectionSystem);
    }
    // TODO: ADD RESOURCES TO COMPOSITION SECTIONS
    // It adds resources except 'Composition', 'MessageHeader' and also skips if empty resource.id or already exists, both for Bundle Document and Bundle Message
    addAdditionalResourcesToBundle(bundle, resources, sectionCode, sectionSystem) {
        return addAdditionalResourcesToBundle(bundle, resources, sectionCode, sectionSystem);
    }
    createBundleDocumentWithTypeLOINC(resources, authorReferenceId, typeDocumentCodeLOINC) {
        return createBundleDocumentWithComposition(resources, authorReferenceId, typeDocumentCodeLOINC);
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
    addResourcesBySection(bundleDocument, sectionCode, sectionSystem, resources) {
        return addResourcesBySection(bundleDocument, sectionCode, sectionSystem, resources);
    }
    addEntriesBySection(bundleDocument, bundleEntries, sectionCode, sectionSystem) {
        return addEntriesBySection(bundleDocument, bundleEntries, sectionCode, sectionSystem);
    }
    getReferencesInSection(section) {
        return getReferencesInSection(section);
    }
    getResourcesInSection(bundleDocument, sectionCode, sectionSystem) {
        return getResourcesInSection(bundleDocument, sectionCode, sectionSystem);
    }
    getAllResources(bundle) {
        return getAllResourcesInBundleEntries(bundle);
    }
    getAllResourcesWithoutCompositionOrMessageHeader(bundle) {
        return getAllResourcesWithoutCompositionOrMessageHeader(bundle);
    }
    // It returns an arry of IDs, splitting the ID by "/" and getting the last string after the slash
    getResourceIdsInBundle(bundle) {
        return getResourceIdsInBundle(bundle);
    }
    getResourcesByTypes(bundle, resourceTypes) {
        return getResourcesByTypes(bundle, resourceTypes);
    }
    getResourceByIdInBundle(resourceId, bundle) {
        return getResourceByIdInBundle(resourceId, bundle);
    }
    // It replaces the given resource in the right Bundle.entry without generating Bundle.entry[].fullUrl
    replaceResourceById(resource, bundle) {
        return replaceResourceById(resource, bundle);
    }
    getMediaInBundle(bundle) {
        return getMediaInBundle(bundle);
    }
}
exports.Bundle = Bundle;
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
function getTagsOfBundleDocument(bundleDocument) {
    const tagCovid19 = Covid19_1.covid19Tag;
    let uhcCodeTags = [];
    let resources = getAllResourcesInBundleEntries(bundleDocument);
    if (resources && resources.length && resources.length > 1) {
        resources.forEach(function (resource) {
            if (resource.resourceType != "Composition") {
                // It adds the resource found to the tags list if it does not exists in that list
                if (!uhcCodeTags.includes(resource.resourceType))
                    uhcCodeTags.push(resource.resourceType);
                let codesCovid19 = [];
                switch (resource.resourceType) {
                    case ("Immunization"): {
                        // It checks for all COVID-19 vaccine codes (CVX and ATC) and put uhcTagForCovid19 value if some was found
                        codesCovid19 = CodeableConcept_1.addExistingTargetCodesInCodeableConcepts([resource.vaccineCode], Covid19_1.vaccineCodesCovid19(), codesCovid19);
                        // console.log("codesCovid19 at " + resource.resourceType + " =", codesCovid19)
                        break;
                    }
                    case ("DiagnosticReport"): {
                        // It checks for all COVID-19 laboratory test codes (LOINC)
                        codesCovid19 = CodeableConcept_1.addExistingTargetCodesInCodeableConcepts([resource.code], Covid19_1.covid19LaboratoryTestsAndGroupsCodes(), codesCovid19);
                        // console.log("codesCovid19 at " + resource.resourceType + " =", codesCovid19)
                        break;
                    }
                }
                // Adding the COVID-19 tag to the list if some COVID-19 code was detected and if the tag does not exists in the list
                if (codesCovid19 && codesCovid19.length && codesCovid19.length > 0 && !uhcCodeTags.includes(tagCovid19))
                    uhcCodeTags.push(tagCovid19);
            }
        });
    }
    return uhcCodeTags;
}
exports.getTagsOfBundleDocument = getTagsOfBundleDocument;
// createEmptyBundle does not adds composition as the default Bundle.entry[0] resource (use createBundleDocumentWithComposition)
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
// TODO: ADD RESOURCES TO COMPOSITION SECTIONS AND FULLURL
// It adds a bundle resource including Composition or HeaderMessage and skips if already present
function addResourceToBundle(bundle, resource, sectionCode, sectionSystem) {
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
// TODO: ADD RESOURCES TO COMPOSITION SECTIONS
// It adds resources except 'Composition', 'MessageHeader' and also skips if empty resource.id or already exists, both for Bundle Document and Bundle Message
function addAdditionalResourcesToBundle(bundle, resources, sectionCode, sectionSystem) {
    // console.log("addAdditionalResourcesToBundle with resources = ", JSON.stringify(resources))
    if (!bundle || bundle.resourceType != "Bundle")
        throw new Error("Not a FHIR Bundle"); // return {} as R4.IBundle
    if (!resources || !resources.length || resources.length < 1)
        throw new Error("No 'AdditionalResources' to add"); // for debugging, instead of return the original bundle without error
    // TODO: it validates the FHIR object and gets the validated value or returns empty
    let newBundle;
    newBundle = bundle;
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
exports.addAdditionalResourcesToBundle = addAdditionalResourcesToBundle;
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
function addReferencesInBundleEntriesToComposition(composition, entries, sectionCode, sectionSystem) {
    // TODO: check bundle
    // It gets the validated composition to be updated
    let newComposition = composition;
    // It gets or creates the section
    let section;
    if (!newComposition.section)
        section = Composition_1.createEmptyCompositionSection(sectionCode, sectionSystem);
    else
        section = Composition_1.getSectionByCodeInComposition(newComposition, sectionCode, sectionSystem); // error if section has no code
    // It gets the references to the resources and puts them into the section
    let references = getReferencesInBundleEntries(entries);
    section = Composition_1.addReferencesToCompositionSection(section, references);
    // It updates the section into the composition
    newComposition = Composition_1.putSectionInComposition(newComposition, section);
    return newComposition;
}
function createBundleDocumentWithComposition(resources, authorReferenceId, typeDocumentCodeLOINC) {
    // console.log("createBundleDocumentWithComposition with resources = ", JSON.stringify(resources))
    let emptyComposition = Composition_1.createDefaultComposition(authorReferenceId, typeDocumentCodeLOINC);
    //console.log("emptyComposition = ", emptyComposition)
    // It creates the bundle documment, adds the composition and the additional resources
    let bundle = createEmptyBundle(ts_fhir_types_1.R4.BundleTypeKind._document);
    bundle = addResourceToBundle(bundle, emptyComposition);
    // TODO: addAdditionalResourcesToBundle SHOULD ADD RESOURCES TO COMPOSITION
    if (resources && resources.length && resources.length > 0)
        bundle = addAdditionalResourcesToBundle(bundle, resources);
    // console.log("createBundleDocumentWithComposition resulting bundle= ", JSON.stringify(bundle))
    return bundle;
}
exports.createBundleDocumentWithComposition = createBundleDocumentWithComposition;
// the first resource type in the bundle document must be a composition: http://hl7.org/fhir/bundle.html
function isIPS(bundleDocument) {
    if (!bundleDocument || !bundleDocument.type || bundleDocument.type != ts_fhir_types_1.R4.BundleTypeKind._document || !bundleDocument.entry || !bundleDocument.entry.length || !bundleDocument.entry[0]
        || !bundleDocument.entry[0].resource || bundleDocument.entry[0].resource.resourceType != "Composition" || !bundleDocument.entry[0].resource.type
        || !bundleDocument.entry[0].resource.type.coding || !bundleDocument.entry[0].resource.type.coding[0] || !bundleDocument.entry[0].resource.type.coding[0].code
        || bundleDocument.entry[0].resource.type.coding[0].code != "60591-5")
        return false;
    else
        return true;
}
exports.isIPS = isIPS;
// TODO: set the UHC identifier, not only the id
function createEmptyIPS(authorReferenceId) {
    let typeDocumentCodeLOINC = Loinc_1.GlobalIndexLOINC.categorization.healthSection.compositionIPS;
    return createBundleDocumentWithComposition(undefined, authorReferenceId, typeDocumentCodeLOINC);
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
function addResourcesBySection(bundleDocument, sectionCode, sectionSystem, resources) {
    let compositions = getResourcesByTypes(bundleDocument, ["Composition"]);
    if (compositions.length < 1)
        return {}; //returns empty TODO: error or create new Composition?
    // if it was created as an empty IPS document then it does not have any section yet
    // It updates the resources references of the section into the composition entry of the bundle
    let newComposition = Composition_1.addResourcesToComposition(compositions[0], resources, sectionCode, sectionSystem);
    // Then it adds the new resources to the bundle
    let newBundle = addAdditionalResourcesToBundle(bundleDocument, resources);
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
    let newComposition = addReferencesInBundleEntriesToComposition(compositions[0], bundleEntries, sectionCode, sectionSystem);
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
function getResourcesInSection(bundleDocument, sectionCode, sectionSystem) {
    let compositions = getResourcesByTypes(bundleDocument, ["Composition"]);
    if (compositions.length < 1)
        return {}; //returns empty
    if (!compositions[0].section || compositions[0].section.length < 1)
        return {}; //returns empty
    let sectionInComposition = Composition_1.getSectionByCodeInComposition(compositions[0], sectionCode, sectionSystem);
    // It checks if the section has references to resources
    if (!sectionInComposition.entry || sectionInComposition.entry.length < 1)
        return {}; //returns empty
    let sectionReferences = sectionInComposition.entry;
    let resources = getResourcesByReferences(bundleDocument, sectionReferences); // search resources by id in a Bundle from the array of references
    return resources;
}
exports.getResourcesInSection = getResourcesInSection;
function getAllResourcesInBundleEntries(bundle) {
    if (!bundle || bundle.resourceType != "Bundle" || !bundle.entry || !bundle.entry.length || bundle.entry.length < 1)
        return []; // or error?
    let results = [];
    // let entries:R4.IBundle_Entry[] = bundle.entry as R4.IBundle_Entry[]
    bundle.entry.forEach(function (entry) {
        if (entry.resource && entry.resource.resourceType)
            results.push(entry.resource);
    });
    return results;
}
exports.getAllResourcesInBundleEntries = getAllResourcesInBundleEntries;
function getAllResourcesWithoutCompositionOrMessageHeader(bundle) {
    if (!bundle || bundle.resourceType != "Bundle" || !bundle.entry || !bundle.entry.length || bundle.entry.length < 1)
        return []; // or error?
    let results = [];
    // let entries:R4.IBundle_Entry[] = bundle.entry as R4.IBundle_Entry[]
    bundle.entry.forEach(function (entry) {
        if (entry.resource && entry.resource.resourceType && entry.resource.resourceType != "Composition" && entry.resource.resourceType != "MessageHeader")
            results.push(entry.resource);
    });
    return results;
}
exports.getAllResourcesWithoutCompositionOrMessageHeader = getAllResourcesWithoutCompositionOrMessageHeader;
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
function getResourcesByTypes(bundle, resourceTypes) {
    if (!bundle || bundle.resourceType != "Bundle" || !bundle.entry || !bundle.entry.length || bundle.entry.length < 1 || !resourceTypes.length || resourceTypes.length < 1)
        return []; // or error?
    let results = [];
    // let entries:R4.IBundle_Entry[] = bundle.entry as R4.IBundle_Entry[]
    bundle.entry.forEach(function (entry) {
        if (entry.resource && entry.resource.resourceType && resourceTypes.includes(entry.resource.resourceType)) {
            // console.log("resource by type found: ", entry.resource.resourceType)    
            results.push(entry.resource);
        }
    });
    return results;
}
exports.getResourcesByTypes = getResourcesByTypes;
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
// TODO: replace with getResourcesByCodeAndSystem
function getObservationsByCode(bundle, code) {
    let observations = getResourcesByTypes(bundle, ["Observation"]);
    let results = [];
    observations.forEach(function (observation) {
        // it checks if the observation has a code.coding[].code = code
        if (observation.code && observation.code.coding && (observation.code.coding.find((function (item) { if (item.code && item.code == code)
            return true; })))) {
            // adds the observation to results[] if true
            results.push(observation);
        }
    });
    return results;
}
exports.getObservationsByCode = getObservationsByCode;
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
