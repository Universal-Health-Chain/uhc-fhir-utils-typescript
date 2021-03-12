
import { getLabelsOfCodes } from "../../src/fhirUtils/CommonFHIR";
import { getFullTestCovid19LOINC, GroupedLOINC, getFullSerologyTestCovid19LOINC, getFullNaatTestCovid19LOINC, getSectionDiagnosticResultsLOINC, getSectionImmunizationLOINC, getSectionVitalSignsLOINC, getSectionSymptomsLOINC } from "../../src/fhirUtils/Loinc";
import { getDisplayCodeLoinc } from "../../src/fhirUtils/Loinc";

// TODO: define interface for SnomedLabels JSON objects
const LoincLabelsEN:any = require ("../../languages/en/loincUHC.json")

describe("get specific group of codes", () => {
    it("should getFullTestCovid19LOINC", () => {
        const result:string[] = getFullTestCovid19LOINC()
        expect(result.length).toBeGreaterThan(0)
        expect(result[0]).toBeDefined
    })
    it("should getFullSerologyTestCovid19LOINC", () => {
        const result:string[] = getFullSerologyTestCovid19LOINC()
        expect(result.length).toBeGreaterThan(0)
        expect(result[0]).toBeDefined
    })
    it("should getFullNaatTestCovid19LOINC", () => {
        const result:string[] = getFullNaatTestCovid19LOINC()
        expect(result.length).toBeGreaterThan(0)
        expect(result[0]).toBeDefined
    })

})

describe("get specific section code", () => {
    it("should getSectionDiagnosticResultsLOINC", () => {
        const healthHistorySection:string = getSectionDiagnosticResultsLOINC()
        expect(healthHistorySection).toBeDefined
    })
    it("should getSectionImmunizationLOINC", () => {
        const healthHistorySection:string = getSectionImmunizationLOINC()
        expect(healthHistorySection).toBeDefined
    })
    it("should getSectionVitalSignsLOINC", () => {
        const healthHistorySection:string = getSectionVitalSignsLOINC()
        expect(healthHistorySection).toBeDefined
    })
    it("should getSectionSymptomsLOINC", () => {
        const healthHistorySection:string = getSectionSymptomsLOINC()
        expect(healthHistorySection).toBeDefined
    })

})

describe("translate LOINC codes", () => {
    it("should translate LOINC code", (done) => {
        expect(Object.keys(LoincLabelsEN.healthSection).length).toBeGreaterThan(0)
        // console.log("LoincLabelsEN.healthSection = ", LoincLabelsEN.healthSection)
        
        let codes = getFullTestCovid19LOINC()
        expect(codes.length).toBeGreaterThan(0)
        // console.log("first code = ", codes[0])

        let groupedSectionName = GroupedLOINC.laboratoryTestCovid19
        expect(groupedSectionName).toBeDefined

        // It searchs and gets the labels by a specific groupedSectionName (more efficient)
        let labelsByGroupedSectionName = getLabelsOfCodes(codes, LoincLabelsEN, groupedSectionName)
        expect(labelsByGroupedSectionName.length).toBeGreaterThan(0)
        expect(labelsByGroupedSectionName[0]).toBeDefined()
        // console.log("first label found with groupedSectionName = ", labelsByGroupedSectionName[0])

        // It searchs and gets the labels without a specific groupedSectionName (less efficient)
        let labelsWithoutGroupedSectionName = getLabelsOfCodes(codes, LoincLabelsEN)
        expect(labelsWithoutGroupedSectionName.length).toBeGreaterThan(0)
        expect(labelsWithoutGroupedSectionName[0]).toBeDefined()
        // console.log("first label found without groupedSectionName = ", labelsWithoutGroupedSectionName[0])

        done()
    })

    it("should display LOINC code", () => {
        let codes = getFullSerologyTestCovid19LOINC()
        let displayCode = getDisplayCodeLoinc(codes[0])
        console.log("display code LOINC " + codes[0] + " = ", displayCode)
        expect(displayCode==undefined).toBeFalsy()
    })

})
