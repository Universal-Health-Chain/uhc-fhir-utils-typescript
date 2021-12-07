"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.putSectionInComposition = exports.getSectionByCodeInComposition = exports.addReferencesToCompositionSection = exports.createEmptyCompositionSection = exports.updateComposition = exports.addResourcesToComposition = exports.createCompositionWithId = exports.createDefaultComposition = exports.getCodesOfSections = exports.getTypeOfBundleDocumentComposition = exports.Composition = void 0;
const ts_fhir_types_1 = require("@ahryman40k/ts-fhir-types");
const uuid_1 = require("uuid");
const models_1 = require("../models");
const uhc_common_utils_typescript_1 = require("@universal-health-chain/uhc-common-utils-typescript");
const Loinc_1 = require("./Loinc");
const uuidUtils = new uhc_common_utils_typescript_1.Uuid();
class Composition {
    constructor() {
    }
    /** First it checks if there is a valid 'Composition' resource (with title, type, date and status)
     * as first resource in the FHIR Bundle document, then return the type code if any or undefined */
    getTypeOfBundleDocumentComposition(fhirBundleDocument) {
        return getTypeOfBundleDocumentComposition(fhirBundleDocument);
    }
    getCodesOfSections(sections, system) {
        return getCodesOfSections(sections, system);
    }
    // TODO: manage empty authorReferenceId and typeDocumentCodeLOINC
    createDefaultComposition(authorReferenceId, typeDocumentCodeLOINC, id) {
        return createDefaultComposition(authorReferenceId, typeDocumentCodeLOINC, id);
    }
    /** deprecated: create the empty IPS document and then add resources by section
    createEmptyCompositionIPS(authorReferenceId:string): R4.IComposition {
        return createEmptyCompositionIPS(authorReferenceId)
    } */
    // TODO: put display and text of the section (translation)
    addResourcesToComposition(composition, resources, sectionCode, sectionSystem) {
        return addResourcesToComposition(composition, resources, sectionCode);
    }
    createEmptyCompositionSection(loincSectionCode) {
        return createEmptyCompositionSection(loincSectionCode);
    }
    // It is mandatory to have one and only one code in the section
    addReferencesToCompositionSection(section, references) {
        return addReferencesToCompositionSection(section, references);
    }
    // TODO: it does not add the type of the resource in the reference(?)
    getReferencesOfResources(resources) {
        return getReferencesOfResources(resources);
    }
    // getSectionByCodeInComposition returns empty if no section found
    getSectionByCodeInComposition(composition, loincSectionCode) {
        return getSectionByCodeInComposition(composition, loincSectionCode);
    }
    // It updates the composition with the new section
    putSectionInComposition(composition, newSection) {
        return putSectionInComposition(composition, newSection);
    }
}
exports.Composition = Composition;
// ---- FUNCTIONS ----
// NOTE: the exported functions can be used by other managers (classes) ----
/** First it checks if there is a valid 'Composition' resource (with title, type, date and status)
 * as first resource in the FHIR Bundle document, then return the type code if any or undefined */
function getTypeOfBundleDocumentComposition(fhirBundleDocument) {
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
        && fhirBundleDocument.entry[0].resource.title && fhirBundleDocument.entry[0].resource.title !== ''
    // && fhirBundleDocument.entry[0].resource.section && fhirBundleDocument.entry[0].resource.section.length>0 && fhirBundleDocument.entry[0].resource.section[0].entry
    ) {
        // TODO: ckeck date and status
        return fhirBundleDocument.entry[0].resource.type.coding[0].code;
    }
    else {
        return undefined;
    }
}
exports.getTypeOfBundleDocumentComposition = getTypeOfBundleDocumentComposition;
// It returns an array of strings with the codes of a specific system in the sections of a Composition or empty
function getCodesOfSections(sections, system) {
    let results = [];
    if (!sections) {
        return results;
    }
    sections.forEach(function (section) {
        if (section.code && section.code.coding && section.code.coding.length > 0) {
            section.code.coding.forEach(function (item) {
                if (item.code && item.system == system)
                    results.push(item.code);
            });
        }
    });
    return results;
}
exports.getCodesOfSections = getCodesOfSections;
/** TODO: create title translating the LOINC document type code.
 * The default 'typeDocumentCodeLOINC' is set to '11503-0' (generic 'Medical records') if not provided.
 * The 'id' is autogenerated as UUIDv4 if not provided.
 * The default 'status' is set to 'preliminary' if not provided (draft).
 * Date is the timestamp (ISO string).
*/
function createDefaultComposition(authorReferenceURN, typeDocumentCodeLOINC, typeDocumentDisplay, idOrURN, status, language) {
    if (!typeDocumentCodeLOINC) {
        typeDocumentCodeLOINC = '11503-0'; // generic 'Medical records' type of document if not provided
        typeDocumentDisplay = Loinc_1.getDisplayOrTextByCodeLOINC(typeDocumentCodeLOINC);
    }
    else if (!typeDocumentDisplay) {
        typeDocumentDisplay = Loinc_1.getDisplayOrTextByCodeLOINC(typeDocumentCodeLOINC);
    }
    if (!idOrURN) {
        idOrURN = uuid_1.v4();
    }
    if (!status) {
        status = ts_fhir_types_1.R4.CompositionStatusKind._preliminary;
    }
    const date = new Date().toISOString();
    const title = `${typeDocumentDisplay} (${date})`;
    return createCompositionWithId(idOrURN, authorReferenceURN, date, title, status, typeDocumentCodeLOINC, models_1.CodingSystem.loinc, typeDocumentDisplay, language);
}
exports.createDefaultComposition = createDefaultComposition;
/** Create composition with mandatory properties and with URN as ID. Title is mandatory, it is not automatically generated */
function createCompositionWithId(idOrURN, authorReferenceURN, date, title, status, typeDocumentCode, typeDocumentSystem, typeDocumentDisplay, language) {
    let composition = {
        author: [{ reference: authorReferenceURN }],
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
    };
    return composition;
}
exports.createCompositionWithId = createCompositionWithId;
/** Title example: "Patient Summary as of December 11, 2017 14:30". TODO: if not title, generate it automatically */
function createEmptyCompositionIPS(idOrURN, authorReferenceURN, date, status, title, language) {
    if (!title) {
        title = `Patient Summary (${date})`;
    }
    return createCompositionWithId(idOrURN, authorReferenceURN, date, title, status, Loinc_1.medicalHistoryClassification.ips, models_1.CodingSystem.loinc, 'Patient summary Document', language);
}
// TODO: put display and text of the section (translation)
function addResourcesToComposition(composition, resources, sectionCode) {
    // It gets the validated composition to be updated
    let newComposition = composition;
    // It gets or creates the section
    let section = getSectionByCodeInComposition(newComposition, sectionCode);
    if (!section || !section.code || !section.code.coding || section.code.coding.length < 1) {
        section = createEmptyCompositionSection(sectionCode);
    }
    // else section = getSectionByCodeInComposition(newComposition, sectionCode, sectionSystem)    // error if section has no code
    // It gets the references to the resources and puts them into the section
    let references = getReferencesOfResources(resources);
    section = addReferencesToCompositionSection(section, references);
    // It updates the section in the composition
    newComposition = putSectionInComposition(newComposition, section); // error if section does not have any code
    return newComposition;
}
exports.addResourcesToComposition = addResourcesToComposition;
/** it checks if composition exists and replace it or error. TODO: verify the ID? */
function updateComposition(bundleDocument, composition) {
    if (!bundleDocument || !bundleDocument.entry || !bundleDocument.entry.length
        || bundleDocument.entry.length < 1 || !bundleDocument.entry[0].resource
        || !bundleDocument.entry[0].resource.resourceType
        || bundleDocument.entry[0].resource.resourceType !== 'Composition') {
        throw new Error(`Bundle document does not have Composition`);
    }
    else {
        // replacing composition with the new one
        bundleDocument.entry[0].resource = composition;
        return bundleDocument;
    }
}
exports.updateComposition = updateComposition;
function createEmptyCompositionSection(sectionCode) {
    // console.log("creating new empty section in composition with code "+ sectionCode + " of system " + sectionSystem)
    // TODO: get display and text for the section
    let newSectionCoding = {
        code: sectionCode,
        system: models_1.CodingSystem.loinc
    };
    let newSection = {
        // TODO: add title in the user language
        code: {
            coding: [newSectionCoding]
        }
    };
    return newSection;
}
exports.createEmptyCompositionSection = createEmptyCompositionSection;
// It is mandatory to have one and only one code in the section
function addReferencesToCompositionSection(section, references) {
    // It makes mandatory the code of the section
    if (!section.code || !section.code.coding || section.code.coding.length != 1 || !section.code.coding[0].code)
        throw new Error("Invalid section");
    // It initializes the new updated section to add the references
    let updatedSection = section;
    // It adds the references to the section.entry   
    references.forEach(function (item) {
        if (item.reference) {
            if (!updatedSection.entry)
                updatedSection.entry = [item];
            else
                updatedSection.entry.push(item);
        }
    });
    return updatedSection;
}
exports.addReferencesToCompositionSection = addReferencesToCompositionSection;
// TODO: it does not add the type of the resource in the reference(?)
function getReferencesOfResources(resources) {
    if (resources.length < 1)
        return {};
    let references = [];
    resources.forEach(function (resource) {
        if (resource.id) {
            let newReference = { reference: resource.id };
            references.push(newReference);
        }
    });
    return references;
}
/** getSectionByCodeInComposition returns undefined if no section found */
function getSectionByCodeInComposition(composition, loincSectionCode) {
    if (!composition.section || composition.section.length < 1)
        return undefined;
    let result;
    composition.section.forEach(function (section) {
        if (section.code && section.code.coding && section.code.coding.length > 0) {
            section.code.coding.forEach(function (sectionCoding) {
                // It looks for the first section that matchs with the code (no duplicated sections)
                if (sectionCoding.code == loincSectionCode)
                    result = section;
            });
        }
    });
    return result;
}
exports.getSectionByCodeInComposition = getSectionByCodeInComposition;
// It updates the composition with the new section
function putSectionInComposition(composition, newSection) {
    // It checks if the new section has a code
    if (!newSection.code || !newSection.code.coding || newSection.code.coding.length != 1 || !newSection.code.coding[0].code)
        throw new Error("Invalid new section");
    // It updates the composition with the new section
    let newComposition = composition;
    if (!newComposition.section || newComposition.section.length < 1) {
        // it does not have any section so create it
        newComposition.section = [newSection];
    }
    else {
        // some section(s) exists so replace it if the section is found or add the section if it is not found
        let codes = getCodesOfSections(newComposition.section, models_1.CodingSystem.loinc);
        if (!codes.includes(newSection.code.coding[0].code))
            newComposition.section.push(newSection);
        else
            newComposition = replaceSectionInComposition(newComposition, newSection);
    }
    return newComposition;
}
exports.putSectionInComposition = putSectionInComposition;
function replaceSectionInComposition(composition, newSection) {
    // It checks the given composition to be updated
    let newComposition = composition;
    if (!newComposition.section || newComposition.section.length < 1)
        throw new Error("Invalid composition");
    // It checks if the new section has a code
    let newSectionCode;
    if (!newSection.code || !newSection.code.coding || newSection.code.coding.length != 1 || !newSection.code.coding[0].code)
        throw new Error("Invalid new section");
    else
        newSectionCode = newSection.code.coding[0].code;
    // It replaces the composition with the new section
    newComposition.section.some(function (item, index, sectionsArray) {
        if (item.code && item.code.coding && item.code.coding.length == 1 && item.code.coding[0].code == newSectionCode) {
            // Replace the section
            sectionsArray[index] = newSection;
            return true;
        }
    });
    return newComposition;
}
