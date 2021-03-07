/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
export const systemICD10 = "http://hl7.org/fhir/sid/icd-10";
export const systemLOINC = "http://loinc.org";
export const systemSNOMED = "http://snomed.info/sct";
export const systemUCUM = "http://unitsofmeasure.org";
/** Coding  */
export function getCodingsBySystem(coding, system) {
    let results = [];
    coding.forEach(function (item) {
        if (item.system == system)
            results.push(item);
    });
    return results;
}
export function getSingleCodingFHIRBySystem(coding, system) {
    let result = coding.some(function (item) {
        if (item.system == system)
            return item;
    });
    return result;
}
export function getLOINCCoding(coding) {
    let results = [];
    coding.forEach(function (item) {
        if (item.system == systemLOINC)
            results.push(item);
    });
    return results;
}
export function getSingleLOINCCoding(coding) {
    let result = coding.some(function (item) {
        if (item.system == systemLOINC)
            return item;
    });
    return result;
}
// returns all the SNOMED CT coding found in an array of R4.ICoding
export function getSNOMEDCoding(coding) {
    let results = [];
    coding.forEach(function (item) {
        if (item.system == systemSNOMED)
            results.push(item);
    });
    return results;
}
// returns only the first SNOMED CT coding found in an array of R4.ICoding
export function getSingleSNOMEDCoding(coding) {
    let result = {};
    coding.some(function (item) {
        if (item.system == systemSNOMED)
            result = item;
    });
    return result;
}
export function createCoding(code, system) {
    // it gets the display if any
    let display = "";
    switch (system) {
        // case  IndexHL7.CODE_SYSTEMS.LOINC: display = getDisplayFromLOINC(code)
        // case  IndexHL7.CODE_SYSTEMS.SNOMED: display = getDisplayFromSNOMED(code)
    }
    let coding = {};
    coding.system = system;
    coding.code = code;
    if (display != "")
        coding.display = display;
    return coding;
}
/** Quantity */
export function createSimpleQuantityByCodeMg(number) {
    return createSimpleQuantity(number, "mg");
}
export function createSimpleQuantityByCodeMl(number) {
    return createSimpleQuantity(number, "ml");
}
export function createSimpleQuantity(number, code) {
    let simpleQuantityInMl = {
        value: number,
        system: systemUCUM,
        code: code // Coded form of the unit ("mg", "ml", ...)
        // unit: "mL", // Unit string representation
    };
    return simpleQuantityInMl;
}
/** Codeable Concepts */
// It searchs and returns all codes from every system without duplicates
export function getExistingTargetCodesInCodeableConcepts(codeableConcepts, targetCodes) {
    if (!targetCodes.length || targetCodes.length < 1)
        return []; // do nothing
    let newList = [];
    let codes = getCodeListInArrayOfCodeableConcepts(codeableConcepts); // without system -> for every system
    if (codes && codes.length && codes.length > 0) {
        codes.forEach(function (code) {
            // //console.log("found code = ", code)
            if (targetCodes.includes(code) && (!newList.includes(code)))
                newList.push(code); // //console.log("added code = ", code)
        });
    }
    return newList;
}
// It searchs and adds all codes from every system without duplicates to the given currentCodes
export function addExistingTargetCodesInCodeableConcepts(codeableConcepts, targetCodes, currentCodes) {
    if (!targetCodes.length || targetCodes.length < 1)
        return currentCodes; // do nothing
    let codes = getCodeListInArrayOfCodeableConcepts(codeableConcepts); // without system -> for every system
    if (codes && codes.length && codes.length > 0) {
        codes.forEach(function (code) {
            // //console.log("found code = ", code)
            if (targetCodes.includes(code) && (!currentCodes.includes(code)))
                currentCodes.push(code); // //console.log("added code = ", code)
        });
    }
    return currentCodes;
}
// system is optional but recommended
export function getCodeListInCodeableConcept(codeableConcept, system) {
    if (!codeableConcept || !codeableConcept.coding || !codeableConcept.coding.length || codeableConcept.coding.length < 1)
        return []; // returns empty
    // it gets the codes or put empty {}
    let codes = [];
    codeableConcept.coding.forEach(function (item) {
        if (system) {
            if (item.code && item.system == system)
                codes.push(item.code);
        }
        else if (item.code)
            codes.push(item.code); // not filtering by system if codeSystem param has not been passed
    });
    return codes;
}
// system is optional but recommended
export function getCodeListInArrayOfCodeableConcepts(codeableConcepts, system) {
    if (!codeableConcepts || !codeableConcepts.length || codeableConcepts.length < 1)
        return [];
    // it gets the codes or put empty {}
    let results = [];
    codeableConcepts.forEach(function (codeableConcept) {
        let codes = getCodeListInCodeableConcept(codeableConcept, system);
        if (codes.length > 0)
            results.push(...codes);
    });
    return results;
}
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
export function createCodeableConceptsFromSNOMED(codes, language) {
    let codeableConcepts = [];
    if (codes.length && codes.length > 0) {
        codes.forEach(function (code) {
            let codeableConcept = createCodeableConceptFromSNOMED(code, language);
            if (codeableConcept && codeableConcept.coding && codeableConcept.coding.length && codeableConcept.coding.length > 0) {
                codeableConcepts.push(codeableConcept);
            }
        });
    }
    return codeableConcepts;
}
export function createCodeableConceptFromSNOMED(code, language) {
    let coding = createCoding(code, systemSNOMED);
    if (!coding || !coding.code || coding.code == "")
        return {};
    let codeableConcept = {};
    // FHIR CodeableConcept contais an array of coding objects for different CODE_SYSTEMS
    codeableConcept.coding = [coding];
    if (!language)
        return codeableConcept; // not needed a local translation
    // it gets the local translation if any
    // let text:string = getLocaleTextFromSNOMED(code, language)
    // if (!text || text == "") return codeableConcept // no local translation provided
    // codeableConcept.text = text
    return codeableConcept;
}
export function createArrayOfCodeableConceptsOfSystem(inputCodes, system) {
    if (!inputCodes.length || inputCodes.length < 1)
        throw new Error("Missing codes");
    let output = [];
    inputCodes.forEach(function (item) {
        let newCoding = createCoding(item, system);
        // put the Coding in a CodeableConcept
        let newCodeableConcept = { coding: [newCoding] };
        // put the CodeableConcept in the output array
        if (!output)
            output = [newCodeableConcept]; // if not initialized
        else
            output.push(...output, newCodeableConcept);
    });
    return output;
}
export function createCodeableConceptBySystem(code, system) {
    let output = {};
    if (code == "")
        return output;
    let newCoding = createCoding(code, system);
    // put the Coding in the CodeableConcept and return
    output = { coding: [newCoding] };
    return output;
}
/** References */
export function createReferenceIdentifiers(identifiers, system) {
    if (!identifiers.length || identifiers.length < 1)
        throw new Error("Missing identifiers");
    let references = [];
    identifiers.forEach(function (item) {
        let newIdentifier = {
            value: item,
            system: system
        };
        let newReference = { identifier: newIdentifier };
        if (!references)
            references = [newReference]; // if not initialized
        else
            references.push(...references, newReference);
    });
    return references;
}
export function getReferencesByIdentifierAndSystem(referencesFHIR, system) {
    if (!referencesFHIR.length || referencesFHIR.length < 1)
        throw new Error("Missing FHIR References");
    let identifierReference = [];
    referencesFHIR.forEach(function (item) {
        if (item.identifier && item.identifier.system == system && item.identifier.value) {
            identifierReference.push(item.identifier.value);
        }
    });
    return identifierReference;
}
export function createReferenceLiteralURLs(literalReferences) {
    if (!literalReferences.length || literalReferences.length < 1)
        throw new Error("Missing literal references");
    let referencesFHIR = [];
    literalReferences.forEach(function (item) {
        let newReference = { reference: item };
        if (!referencesFHIR)
            referencesFHIR = [newReference]; // if not initialized
        else
            referencesFHIR.push(...referencesFHIR, newReference);
    });
    return referencesFHIR;
}
export function getLiteralReferences(referencesFHIR) {
    if (!referencesFHIR.length || referencesFHIR.length < 1)
        throw new Error("Missing FHIR References");
    let literalReferences = [];
    referencesFHIR.forEach(function (item) {
        if (item.reference)
            literalReferences.push(item.reference);
    });
    return literalReferences;
}
