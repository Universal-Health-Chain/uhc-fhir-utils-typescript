/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
export const systemICD10 = "http://hl7.org/fhir/sid/icd-10";
export const systemLOINC = "http://loinc.org";
export const systemSNOMED = "http://snomed.info/sct";
export const systemUCUM = "http://unitsofmeasure.org";
export class CodeableConcept {
    constructor() {
    }
    getCodingsBySystem(coding, system) {
        return getCodingsBySystem(coding, system);
    }
    getSingleCodingBySystem(coding, system) {
        return getSingleCodingBySystem(coding, system);
    }
    getCodingsLOINC(coding) {
        return getCodingsLOINC(coding);
    }
    getSingleCodingLOINC(coding) {
        return getSingleCodingLOINC(coding);
    }
    getCodingSNOMED(coding) {
        return getCodingSNOMED(coding);
    }
    getSingleCodingSNOMED(coding) {
        return getSingleCodingSNOMED(coding);
    }
    createCoding(code, system) {
        return createCoding(code, system);
    }
    getExistingTargetCodesInCodeableConcepts(codeableConcepts, targetCodes) {
        return getExistingTargetCodesInCodeableConcepts(codeableConcepts, targetCodes);
    }
    addExistingTargetCodesInCodeableConcepts(codeableConcepts, targetCodes, currentCodes) {
        return addExistingTargetCodesInCodeableConcepts(codeableConcepts, targetCodes, currentCodes);
    }
    getCodeListInCodeableConcept(codeableConcept, system) {
        return getCodeListInCodeableConcept(codeableConcept, system);
    }
    getCodeListInArrayOfCodeableConcepts(codeableConcepts, system) {
        return getCodeListInArrayOfCodeableConcepts(codeableConcepts, system);
    }
    // TODO: put display and / or custom text
    createSingleCodeableConceptSNOMED(code, language) {
        return createSingleCodeableConceptSNOMED(code, language);
    }
    // TODO: put display for every code
    createCodeableConceptsFromSNOMED(codes, language) {
        return createCodeableConceptsFromSNOMED(codes, language);
    }
    createCodeableConceptBySystem(code, system) {
        return createCodeableConceptBySystem(code, system);
    }
    createArrayOfCodeableConceptsOfSystem(inputCodes, system) {
        return createArrayOfCodeableConceptsOfSystem(inputCodes, system);
    }
}
/** Coding  */
export function getCodingsBySystem(coding, system) {
    let results = [];
    coding.forEach(function (item) {
        if (item.system == system)
            results.push(item);
    });
    return results;
}
export function getSingleCodingBySystem(coding, system) {
    let result = coding.some(function (item) {
        if (item.system == system)
            return item;
    });
    return result;
}
export function getCodingsLOINC(coding) {
    let results = [];
    coding.forEach(function (item) {
        if (item.system == systemLOINC)
            results.push(item);
    });
    return results;
}
export function getSingleCodingLOINC(coding) {
    let result = coding.some(function (item) {
        if (item.system == systemLOINC)
            return item;
    });
    return result;
}
// returns all the SNOMED CT coding found in an array of R4.ICoding
export function getCodingSNOMED(coding) {
    let results = [];
    coding.forEach(function (item) {
        if (item.system == systemSNOMED)
            results.push(item);
    });
    return results;
}
// returns only the first SNOMED CT coding found in an array of R4.ICoding
export function getSingleCodingSNOMED(coding) {
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
export function createSingleCodeableConceptSNOMED(code, language) {
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
export function createCodeableConceptsFromSNOMED(codes, language) {
    let codeableConcepts = [];
    if (codes.length && codes.length > 0) {
        codes.forEach(function (code) {
            let codeableConcept = createSingleCodeableConceptSNOMED(code, language);
            if (codeableConcept && codeableConcept.coding && codeableConcept.coding.length && codeableConcept.coding.length > 0) {
                codeableConcepts.push(codeableConcept);
            }
        });
    }
    return codeableConcepts;
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
