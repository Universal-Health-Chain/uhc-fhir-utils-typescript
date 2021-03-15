/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { GroupedLOINC } from "../../src/fhirUtils/Loinc";

import { FhirUtils } from "../../src/"
const fhirUtils = new FhirUtils()

// TODO: define interface for SnomedLabels JSON objects
const LoincLabelsEN:any = require ("../../languages/international/loincUHC.json")

describe("translate LOINC codes", () => {
    it("should translate LOINC code", (done) => {
        expect(Object.keys(LoincLabelsEN.healthSection).length).toBeGreaterThan(0)
        // console.log("LoincLabelsEN.healthSection = ", LoincLabelsEN.healthSection)
          
        let codes = fhirUtils.loinc.healthSections()
        expect(codes.length).toBeGreaterThan(0)
        // console.log("first code = ", codes[0])

        let groupedSectionName = GroupedLOINC.laboratoryTestCovid19
        expect(groupedSectionName).toBeDefined

        /*
        // It searchs and gets the labels by a specific groupedSectionName (more efficient)
        let labelsByGroupedSectionName = fhirUtils.commonFHIR.getLabelsOfGroupedCodes(codes, LoincLabelsEN, groupedSectionName)
        expect(labelsByGroupedSectionName.length).toBeGreaterThan(0)
        expect(labelsByGroupedSectionName[0]).toBeDefined()
        // console.log("first label found with groupedSectionName = ", labelsByGroupedSectionName[0])

        // It searchs and gets the labels without a specific groupedSectionName (less efficient)
        let labelsWithoutGroupedSectionName = fhirUtils.commonFHIR.getLabelsOfGroupedCodes(codes, LoincLabelsEN)
        expect(labelsWithoutGroupedSectionName.length).toBeGreaterThan(0)
        expect(labelsWithoutGroupedSectionName[0]).toBeDefined()
        // console.log("first label found without groupedSectionName = ", labelsWithoutGroupedSectionName[0])
        */
        done()
    })

    it("should display LOINC code", () => {
        let codes = fhirUtils.loinc.healthSections()
        let displayCode = fhirUtils.loinc.getDisplayOrTextByCodeLOINC(codes[0])
        console.log("display code LOINC " + codes[0] + " = ", displayCode)
        expect(displayCode==undefined).toBeFalsy()
    })

})
