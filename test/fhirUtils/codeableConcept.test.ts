/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { FhirUtils } from '../../src/FhirUtils';
import { R4 } from '@ahryman40k/ts-fhir-types';
import { createCodeableConcept } from '../../src/managers/CodeableConcept';
import { CodingSystem } from '../../src/models/CommonModels';

const fhirUtils = new FhirUtils()

const customLanguageFileSpanishSNOMED:object = {
    "840544004":"Sospecha de COVID-19"
}

describe("test CodeableConcept", () => {
    it("should create an array of codeable concepts and get the codes, display and text", () => {
        const code = fhirUtils.covid19.suspectedDiseaseSNOMED()
        const internationalDisplay = fhirUtils.snomed.getDisplayOrTextByCodeSNOMED(code)
        const customText = customLanguageFileSpanishSNOMED[code]
       
        const codeableConcept = createCodeableConcept(code, CodingSystem.snomed, internationalDisplay, "systemVersion", false, customText)
        expect(codeableConcept).toBeDefined
        expect(codeableConcept.text).toBe(customLanguageFileSpanishSNOMED["840544004"])
        
        const coding:R4.ICoding = fhirUtils.codeableConcept.getSingleCoding(codeableConcept, CodingSystem.snomed)
        expect(coding.code).toBe(code)
        expect(coding.display).toBe(internationalDisplay)

    })
    it("should create an array of codeable concepts and get the codes, display and text", async () => {
        const code = fhirUtils.covid19.suspectedDiseaseSNOMED()
        const codeableConcepts:R4.ICodeableConcept[] = await fhirUtils.codeableConcept.createArrayOfCodeableConceptsOfSystem(
            [code],
            CodingSystem.snomed,
            customLanguageFileSpanishSNOMED
        )
        // console.log("codeable concepts = ", JSON.stringify(codeableConcepts))
        expect(codeableConcepts).toHaveLength(1)
        expect(codeableConcepts[0].text).toBe(customLanguageFileSpanishSNOMED["840544004"])
        
        const codes = fhirUtils.codeableConcept.getCodeListInArrayOfCodeableConcepts(codeableConcepts)
        expect(codes[0]).toBe(code)

        const coding:R4.ICoding = fhirUtils.codeableConcept.getSingleCoding(codeableConcepts[0], CodingSystem.snomed)
        const displaySNOMED = fhirUtils.snomed.getDisplayOrTextByCodeSNOMED(code)
        expect(coding.display).toBe(displaySNOMED)
    })


    it("should get a single coding from an array of codeable concepts", async () => {
        const snomedCodes = fhirUtils.covid19.diseaseOrSuspectedDiseaseCodes()
        const codeableConcepts:R4.ICodeableConcept[] = await fhirUtils.codeableConcept.createArrayOfCodeableConceptsOfSystem(
            snomedCodes,
            CodingSystem.snomed,
            customLanguageFileSpanishSNOMED
        )
        // console.log("codeable concepts = ", JSON.stringify(codeableConcepts))
        expect(codeableConcepts.length).toBeGreaterThan(1)
        
        const coding:R4.ICoding = fhirUtils.codeableConcept.getCodingInArrayOfCodeableConcepts(codeableConcepts, CodingSystem.snomed)
        expect(coding).toBeDefined()
        // console.log("single coding by array of codeable concepts = ", JSON.stringify(coding))
    })

    it("should get a single codeable concept from an array of codeable concepts", async () => {
        const snomedCodes = fhirUtils.covid19.diseaseOrSuspectedDiseaseCodes()
        const codeableConcepts:R4.ICodeableConcept[] = await fhirUtils.codeableConcept.createArrayOfCodeableConceptsOfSystem(
            snomedCodes,
            CodingSystem.snomed,
            customLanguageFileSpanishSNOMED
        )
        // console.log("codeable concepts = ", JSON.stringify(codeableConcepts))
        expect(codeableConcepts.length).toBeGreaterThan(1)
        
        const codeableConcept:R4.ICodeableConcept = fhirUtils.codeableConcept.getCodeableConceptInArray(codeableConcepts, CodingSystem.snomed)
        expect(codeableConcept).toBeDefined()

        const coding:R4.ICoding = fhirUtils.codeableConcept.getCodingInArrayOfCodeableConcepts([codeableConcept], CodingSystem.snomed)
        expect(coding).toBeDefined()
    })

})