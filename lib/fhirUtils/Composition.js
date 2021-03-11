/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { v4 as uuidv4 } from 'uuid';
import { GlobalIndexHL7 } from "./Hl7";
import { validateUUIDv4 } from "./commonUtils";
import { systemLOINC } from "./CommonFHIR";
// import { getCodesOfSections } from "./fhirCodingUtils"
// It returns an array of strings with the codes of a specific system in the sections of a Composition
export function getCodesOfSections(sections, system) {
    let results = [];
    sections.forEach(function (section) {
        if (section.code && section.code.coding && section.code.coding.length > 1) {
            section.code.coding.forEach(function (item) {
                if (item.code && item.system == system)
                    results.push(item.code);
            });
        }
    });
    return results;
}
// TODO: manage empty authorReferenceId and typeDocumentCodeLOINC
export function createDefaultComposition(authorReferenceId, typeDocumentCodeLOINC, id) {
    let composition = {
        resourceType: "Composition",
        type: {
            coding: [{
                    system: systemLOINC,
                    code: typeDocumentCodeLOINC
                }]
        },
        author: [{ reference: authorReferenceId }]
    };
    if (id && validateUUIDv4(id))
        composition.id = id;
    else
        composition.id = uuidv4();
    return composition;
}
function createEmptyCompositionIPS(authorReferenceId) {
    let compositionIPS = {
        id: uuidv4(),
        resourceType: "Composition",
        type: {
            coding: [{
                    system: "http://loinc.org",
                    code: "60591-5",
                    display: "Patient summary Document"
                }]
        },
        author: [{
                reference: authorReferenceId // who is the author? (user, practitioner, organization)
            }],
    };
    // It validates the FHIR object and returns the value of the valid object
    return compositionIPS;
}
// TODO: put display and text of the section (translation)
export function addResourcesToComposition(composition, resources, sectionCode, sectionSystem) {
    // It gets the validated composition to be updated
    let newComposition = composition;
    // It gets or creates the section
    let section = getSectionByCodeInComposition(newComposition, sectionCode, sectionSystem);
    if (!section || !section.code || !section.code.coding || section.code.coding.length < 1) {
        section = createEmptyCompositionSection(sectionCode, sectionSystem);
    }
    // else section = getSectionByCodeInComposition(newComposition, sectionCode, sectionSystem)    // error if section has no code
    // It gets the references to the resources and puts them into the section
    let references = getReferencesOfResources(resources);
    section = addReferencesToCompositionSection(section, references);
    // It updates the section in the composition
    newComposition = putSectionInComposition(newComposition, section); // error if section does not have any code
    return newComposition;
}
export function createEmptyCompositionSection(sectionCode, sectionSystem) {
    // console.log("creating new empty section in composition with code "+ sectionCode + " of system " + sectionSystem)
    // TODO: get display and text for the section
    let newSectionCoding = {
        code: sectionCode,
        system: sectionSystem
    };
    let newSection = {
        // TODO: add title in the user language
        code: {
            coding: [newSectionCoding]
        }
    };
    return newSection;
}
// It is mandatory to have one and only one code in the section
export function addReferencesToCompositionSection(section, references) {
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
// getSectionByCodeInComposition returns empty if no section found
export function getSectionByCodeInComposition(composition, sectionCode, sectionSystem) {
    if (!composition.section || composition.section.length < 1)
        return {}; // returns empty
    let result = {};
    composition.section.forEach(function (section) {
        if (section.code && section.code.coding && section.code.coding.length > 0) {
            section.code.coding.forEach(function (sectionCoding) {
                // It looks for the first section that matchs with the code (no duplicated sections)
                if (sectionCoding.code == sectionCode)
                    result = section;
            });
        }
    });
    return result;
}
// It updates the composition with the new section
export function putSectionInComposition(composition, newSection) {
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
        let codes = getCodesOfSections(newComposition.section, GlobalIndexHL7.codeSystem.loinc);
        if (!codes.includes(newSection.code.coding[0].code))
            newComposition.section.push(newSection);
        else
            newComposition = replaceSectionInComposition(newComposition, newSection);
    }
    return newComposition;
}
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
