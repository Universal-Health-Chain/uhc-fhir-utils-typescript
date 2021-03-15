/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { systemLOINC, systemSNOMED } from "./CommonFHIR";
import { getDisplayOrTextByCodeHL7 } from "./Hl7";
import { getDisplayOrTextByCodeLOINC } from "./Loinc";
import { getDisplayOrTextByCodeSNOMED } from "./Snomed";
export class CodeableConcept {
    constructor() {
    }
    getCodingsBySystem(codeableConcept, system) {
        return getCodingsBySystem(codeableConcept, system);
    }
    getSingleCodingBySystem(codeableConcept, system) {
        return getSingleCodingBySystem(codeableConcept, system);
    }
    getCodingsLOINC(codeableConcept) {
        return getCodingsLOINC(codeableConcept);
    }
    getSingleCodingLOINC(codeableConcept) {
        return getSingleCodingLOINC(codeableConcept);
    }
    getCodingsSNOMED(codeableConcept) {
        return getCodingsSNOMED(codeableConcept);
    }
    getSingleCodingSNOMED(codeableConcept) {
        return getSingleCodingSNOMED(codeableConcept);
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
    createCodeableConceptBySystem(code, system) {
        return createCodeableConceptBySystem(code, system);
    }
    createArrayOfCodeableConceptsOfSystem(inputCodes, system) {
        return createArrayOfCodeableConceptsOfSystem(inputCodes, system);
    }
}
/** Coding  */
export function getCodingsBySystem(codeableConcept, system) {
    // console.log("getCodingsBySystem codeableConcept = ", codeableConcept)
    let results = [];
    if (codeableConcept.coding && codeableConcept.coding.length && codeableConcept.coding.length > 1) {
        console.log("codings in codeableConcept = ", JSON.stringify(codeableConcept.coding));
        codeableConcept.coding.forEach(function (coding) {
            console.log("coding system = ", coding.system);
            if (coding.system && coding.system == system)
                results.push(coding);
        });
    }
    console.log("getCodingsBySystem = ", JSON.stringify(results));
    return results;
}
export function getSingleCodingBySystem(codeableConcept, system) {
    return getCodingsBySystem(codeableConcept, system)[0];
}
export function getCodingsLOINC(codeableConcept) {
    return getCodingsBySystem(codeableConcept, systemLOINC);
}
export function getSingleCodingLOINC(codeableConcept) {
    return getSingleCodingBySystem(codeableConcept, systemLOINC);
}
export function getCodingsSNOMED(codeableConcept) {
    return getCodingsBySystem(codeableConcept, systemSNOMED);
}
export function getSingleCodingSNOMED(codeableConcept) {
    return getSingleCodingBySystem(codeableConcept, systemSNOMED);
}
// 'display' SHALL BE English (default) but 'text' can be any custom language
export function createDisplayOrTextOfCodeable(code, system, customLanguageFile) {
    let systemType = system;
    if (String(system).startsWith("http://hl7.org"))
        systemType = "http://hl7.org";
    // console.log("createDisplayOrText of code " + code + " and system " + system)
    // it checks if HL7 or others
    let result = "";
    switch (String(systemType)) {
        case systemLOINC: {
            result = getDisplayOrTextByCodeLOINC(code, customLanguageFile);
            // console.log("getDisplayOrTextByCodeLOINC = ", result)
            break;
        }
        case systemSNOMED: {
            result = getDisplayOrTextByCodeSNOMED(code, customLanguageFile);
            // console.log("getDisplayOrTextByCodeSNOMED = ", result)
            break;
        }
        case "http://hl7.org": {
            result = getDisplayOrTextByCodeHL7(code, customLanguageFile, system);
            // console.log("getDisplayOrTextByCodeHL7 = ", result)
            break;
        }
    }
    return result;
}
export function createCoding(code, system, display) {
    let coding = {
        system: system,
        code: code
    };
    if (display)
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
// It creates CodeableConcept with display in english and text also in english or in other language if language file is provided
export function createCodeableConceptBySystem(code, system, customLanguageFile) {
    let codeableConcept = {};
    if (!code)
        return codeableConcept;
    // invert order of customLanguageFile and system because system is mandatory in coding
    const display = createDisplayOrTextOfCodeable(code, system, customLanguageFile); // international display text in English (default)
    console.log("createCodeableConceptBySystem display = ", display);
    let customText = display;
    if (customLanguageFile)
        customText = createDisplayOrTextOfCodeable(code, system, customLanguageFile);
    console.log("createCodeableConceptBySystem customText = ", customText);
    // It puts the Coding and the text into the CodeableConcept and returns
    let newCoding = createCoding(code, system, display);
    codeableConcept = {
        coding: [newCoding],
        text: customText
    };
    return codeableConcept;
}
export function createArrayOfCodeableConceptsOfSystem(inputCodes, system, customLanguageFile) {
    if (!inputCodes.length || inputCodes.length < 1)
        throw new Error("Missing codes");
    let output = [];
    inputCodes.forEach(function (code) {
        let newCodeableConcept = createCodeableConceptBySystem(code, system, customLanguageFile);
        // put the CodeableConcept in the output array
        if (!output)
            output = [newCodeableConcept]; // if not initialized
        else
            output.push(...output, newCodeableConcept);
    });
    return output;
}
