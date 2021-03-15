/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { systemSNOMED } from '../../src/fhirUtils/CommonFHIR';
import { createArrayOfCodeableConceptsOfSystem, getCodeListInArrayOfCodeableConcepts, getSingleCodingSNOMED } from '../../src/fhirUtils/CodeableConcept';
import { getDisplayOrTextByCodeSNOMED } from '../../src/fhirUtils/Snomed';

import { FhirUtils } from '../../src/FhirUtils';
import { R4 } from '@ahryman40k/ts-fhir-types';
const fhirUtils = new FhirUtils()

const customLanguageFileSpanishSNOMED:any = {
    "840544004":"Sospecha de COVID-19"
}

describe("test CodeableConcept", () => {
    
    it("should create an array of codeable concepts and get the codes, display and text", () => {
        const code = fhirUtils.covid19.suspectedDiseaseSNOMED()
        const codeableConcepts:R4.ICodeableConcept[] = createArrayOfCodeableConceptsOfSystem([code], systemSNOMED, customLanguageFileSpanishSNOMED)
        // console.log("codeable concepts = ", JSON.stringify(codeableConcepts))
        expect(codeableConcepts).toHaveLength(1)
        expect(codeableConcepts[0].text).toBe(customLanguageFileSpanishSNOMED["840544004"])
        
        const codes = getCodeListInArrayOfCodeableConcepts(codeableConcepts)
        expect(codes[0]).toBe(code)

        const coding:R4.ICoding = getSingleCodingSNOMED(codeableConcepts[0])
        const displaySNOMED = getDisplayOrTextByCodeSNOMED(code)
        expect(coding.display).toBe(displaySNOMED)
    })
})