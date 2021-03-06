"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCodingArrayOfSystem = exports.createCodeableConceptsArrayOfSystem = exports.createCodeableConcept = exports.createCodeableConceptWithOptionalLanguage = exports.getCodeListInArrayOfCodeableConcepts = exports.getCodeListInCodeableConcept = exports.addExistingTargetCodesInCodeableConcepts = exports.getExistingTargetCodesInCodeableConcepts = exports.createCoding = exports.createDisplayOrTextOfCodeable = exports.getSingleCodingBySystem = exports.getCodingsBySystem = exports.getCodingInArrayOfCodeableConcepts = exports.getCodeableConceptInArray = exports.CodeableConcept = void 0;
const models_1 = require("../models");
const Hl7_1 = require("./Hl7");
const Loinc_1 = require("./Loinc");
const Snomed_1 = require("./Snomed");
class CodeableConcept {
    constructor() {
    }
    getCodings(codeableConcept, system) {
        return getCodingsBySystem(codeableConcept, system);
    }
    getSingleCoding(codeableConcept, system) {
        return getSingleCodingBySystem(codeableConcept, system);
    }
    getCodingInArrayOfCodeableConcepts(codeableConcepts, system) {
        return getCodingInArrayOfCodeableConcepts(codeableConcepts, system);
    }
    getCodeableConceptInArray(codeableConcepts, system) {
        return getCodeableConceptInArray(codeableConcepts, system);
    }
    /*
    getCodingsLOINC(codeableConcept:R4.ICodeableConcept): R4.ICoding[]{
        return getCodingsLOINC(codeableConcept)
    }

    getSingleCodingLOINC(codeableConcept:R4.ICodeableConcept): R4.ICoding{
        return getSingleCodingLOINC(codeableConcept)
    }

    getCodingsSNOMED(codeableConcept:R4.ICodeableConcept): R4.ICoding[]{
        return getCodingsSNOMED(codeableConcept)
    }

    getSingleCodingSNOMED(codeableConcept:R4.ICodeableConcept): R4.ICoding{
        return getSingleCodingSNOMED(codeableConcept)
    }
    */
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
    createCodeableConcept(typeCode, codeSystem, internationalDisplay, systemVersion, userSelected, customText) {
        return createCodeableConcept(typeCode, codeSystem, internationalDisplay, systemVersion, userSelected, customText);
    }
    createCodeableConceptWithOptionalLanguage(typeCode, codeSystem, customLanguageFile) {
        return createCodeableConceptWithOptionalLanguage(typeCode, codeSystem, customLanguageFile);
    }
    createArrayOfCodeableConceptsOfSystem(inputCodes, codeSystem, customLanguageFile) {
        return createCodeableConceptsArrayOfSystem(inputCodes, codeSystem, customLanguageFile);
    }
    createCodingArrayOfSystem(inputCodes, codeSystem, englishData) {
        return createCodingArrayOfSystem(inputCodes, codeSystem, englishData);
    }
}
exports.CodeableConcept = CodeableConcept;
/** Coding  */
function getCodeableConceptInArray(codeableConcepts, system) {
    let result = {};
    let found = false;
    codeableConcepts.forEach(function (codeableConcept) {
        if (!found) {
            const coding = getSingleCodingBySystem(codeableConcept, system);
            if (coding) {
                result = codeableConcept;
                found = true;
            }
        }
    });
    // console.log("getGetSingleCodingInArrayOfCodeableConcepts = ", JSON.stringify(result))
    return result;
}
exports.getCodeableConceptInArray = getCodeableConceptInArray;
function getCodingInArrayOfCodeableConcepts(codeableConcepts, system) {
    let result = {};
    let found = false;
    codeableConcepts.forEach(function (codeableConcept) {
        if (!found) {
            const coding = getSingleCodingBySystem(codeableConcept, system);
            if (coding) {
                result = coding;
                found = true;
            }
        }
    });
    // console.log("getGetSingleCodingInArrayOfCodeableConcepts = ", JSON.stringify(result))
    return result;
}
exports.getCodingInArrayOfCodeableConcepts = getCodingInArrayOfCodeableConcepts;
function getCodingsBySystem(codeableConcept, system) {
    let results = [];
    if (codeableConcept.coding && codeableConcept.coding.length && codeableConcept.coding.length > 0) {
        codeableConcept.coding.forEach(function (coding) {
            if (coding.system && coding.system == system)
                results.push(coding);
        });
    }
    // console.log("getCodingsBySystem = ", JSON.stringify(results))
    return results;
}
exports.getCodingsBySystem = getCodingsBySystem;
function getSingleCodingBySystem(codeableConcept, system) {
    return getCodingsBySystem(codeableConcept, system)[0];
}
exports.getSingleCodingBySystem = getSingleCodingBySystem;
/*
export function getCodingsLOINC(codeableConcept:R4.ICodeableConcept): R4.ICoding[]{
    return getCodingsBySystem(codeableConcept, systemLOINC)
}

export function getSingleCodingLOINC(codeableConcept:R4.ICodeableConcept): R4.ICoding{
    return getSingleCodingBySystem(codeableConcept, systemLOINC)
}

export function getCodingsSNOMED(codeableConcept:R4.ICodeableConcept): R4.ICoding[]{
    return getCodingsBySystem(codeableConcept, systemSNOMED)
}

export function getSingleCodingSNOMED(codeableConcept:R4.ICodeableConcept): R4.ICoding{
    return getSingleCodingBySystem(codeableConcept, systemSNOMED)
}
*/
// 'display' SHALL BE English (default) but 'text' can be any custom language
function createDisplayOrTextOfCodeable(code, system, customLanguageFile) {
    let systemType = system;
    if (String(system).startsWith("http://hl7.org"))
        systemType = "http://hl7.org";
    // console.log("createDisplayOrText of code " + code + " and system " + system)
    // it checks if HL7 or others
    let result = "";
    switch (String(systemType)) {
        case models_1.CodingSystem.loinc: {
            result = Loinc_1.getDisplayOrTextByCodeLOINC(code, customLanguageFile);
            // console.log("getDisplayOrTextByCodeLOINC = ", result)
            break;
        }
        case models_1.CodingSystem.snomed: {
            result = Snomed_1.getDisplayOrTextByCodeSNOMED(code, customLanguageFile);
            // console.log("getDisplayOrTextByCodeSNOMED = ", result)
            break;
        }
        case "http://hl7.org": {
            result = Hl7_1.getDisplayOrTextByCodeHL7(code, customLanguageFile, system);
            // console.log("getDisplayOrTextByCodeHL7 = ", result)
            break;
        }
    }
    return result;
}
exports.createDisplayOrTextOfCodeable = createDisplayOrTextOfCodeable;
function createCoding(code, system, display, systemVersion, userSelected) {
    let coding = {
        code: code,
        display: display,
        system: system,
        userSelected: userSelected,
        version: systemVersion
    };
    return coding;
}
exports.createCoding = createCoding;
/** Codeable Concepts */
// It searchs and returns all codes from every system without duplicates
function getExistingTargetCodesInCodeableConcepts(codeableConcepts, targetCodes) {
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
exports.getExistingTargetCodesInCodeableConcepts = getExistingTargetCodesInCodeableConcepts;
// It searchs and adds all codes from every system without duplicates to the given currentCodes
function addExistingTargetCodesInCodeableConcepts(codeableConcepts, targetCodes, currentCodes) {
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
exports.addExistingTargetCodesInCodeableConcepts = addExistingTargetCodesInCodeableConcepts;
// system is optional but recommended
function getCodeListInCodeableConcept(codeableConcept, system) {
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
exports.getCodeListInCodeableConcept = getCodeListInCodeableConcept;
// system is optional but recommended
function getCodeListInArrayOfCodeableConcepts(codeableConcepts, system) {
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
exports.getCodeListInArrayOfCodeableConcepts = getCodeListInArrayOfCodeableConcepts;
// It creates CodeableConcept with display in english and text also in english or in other language if language file is provided
function createCodeableConceptWithOptionalLanguage(typeCode, codeSystem, customLanguageFile, systemVersion, userSelected) {
    if (!typeCode)
        return [];
    // invert order of customLanguageFile and system because system is mandatory in coding
    const internationalDisplay = createDisplayOrTextOfCodeable(typeCode, codeSystem); // international display text in English by default, no customLanguageFile
    //console.log("createCodeableConceptBySystem display = ", display)
    let customText = internationalDisplay; // it puts english as default text
    if (customLanguageFile)
        customText = createDisplayOrTextOfCodeable(typeCode, codeSystem, customLanguageFile);
    // console.log("createCodeableConceptBySystem customText = ", customText)
    return createCodeableConcept(typeCode, codeSystem, internationalDisplay, systemVersion, userSelected, customText);
}
exports.createCodeableConceptWithOptionalLanguage = createCodeableConceptWithOptionalLanguage;
function createCodeableConcept(typeCode, codeSystem, internationalDisplay, systemVersion, userSelected, customText) {
    let coding = createCoding(typeCode, codeSystem, internationalDisplay, systemVersion, userSelected);
    let codeableConcept = {
        coding: [coding],
        text: customText
    };
    return codeableConcept;
}
exports.createCodeableConcept = createCodeableConcept;
// it does not throws an error if empty
function createCodeableConceptsArrayOfSystem(inputCodes, system, customLanguageFile) {
    let output = [];
    if (!inputCodes || !inputCodes.length || inputCodes.length < 1)
        return output; // throw new Error ("Missing codes")
    inputCodes.forEach(function (code) {
        let newCodeableConcept = createCodeableConceptWithOptionalLanguage(code, system, customLanguageFile);
        // put the CodeableConcept in the output array
        if (!output)
            output = [newCodeableConcept]; // if not initialized
        else
            output.push(...output, newCodeableConcept);
    });
    return output;
}
exports.createCodeableConceptsArrayOfSystem = createCodeableConceptsArrayOfSystem;
// it does not throws an error if empty; it is used to generate several target diseases in a code system for a single CodeableConcept
function createCodingArrayOfSystem(inputCodes, codeSystem, englishData) {
    let output = [];
    if (!inputCodes || inputCodes.length || inputCodes.length < 1)
        return output; // throw new Error ("Missing codes")
    inputCodes.forEach(function (typeCode) {
        const internationalDisplay = createDisplayOrTextOfCodeable(typeCode, codeSystem, englishData);
        // console.log("internationalDisplay = ", internationalDisplay)
        let newCoding = createCoding(typeCode, codeSystem, internationalDisplay);
        // put the CodeableConcept in the output array
        if (!output)
            output = [newCoding]; // if not initialized
        else
            output.push(...output, newCoding);
    });
    return output;
}
exports.createCodingArrayOfSystem = createCodingArrayOfSystem;
