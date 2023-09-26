
import { getLabelsOfGroupedCodes } from "../../src/managers/CommonFHIR";
import { getVaccinesCovid19CVX, getDisplayOrTextByCodeHL7 } from "../../src/managers/Hl7";
import { CodingSystem } from "../../src";

// TODO: define interface for SnomedLabels JSON objects
const hl7EnglishFile:any = require ("../../languages/international/hl7UHC.json") 

describe("translate HL7 codes", () => {

    it("should translate HL7 code", (done) => {
        expect(Object.keys(hl7EnglishFile["http://hl7.org/fhir/sid/cvx"]).length).toBeGreaterThan(0)
        // console.log("LoincLabelsEN.healthSection = ", LoincLabelsEN.healthSection)
        
        let vaccineCovid19CVX = getVaccinesCovid19CVX()
        expect(vaccineCovid19CVX.length).toBeGreaterThan(0)
        // console.log("first procedureCodesCovid19Spain = ", procedureCodesCovid19Spain[0])    

        let groupedSectionName = CodingSystem.cvxCovid19
        expect(groupedSectionName).toBeDefined

        // It searchs and gets the labels by a specific groupedSectionName (more efficient)
        let labelsByGroupedSectionName = getLabelsOfGroupedCodes(vaccineCovid19CVX, hl7EnglishFile, groupedSectionName)
        expect(labelsByGroupedSectionName.length).toBeGreaterThan(0)
        expect(labelsByGroupedSectionName[0]).toBeDefined()
        // console.log("first label found with groupedSectionName = ", labelsByGroupedSectionName[0])

        // It searchs and gets the labels without a specific groupedSectionName (less efficient)
        let labelsWithoutGroupedSectionName = getLabelsOfGroupedCodes(vaccineCovid19CVX, hl7EnglishFile)
        expect(labelsWithoutGroupedSectionName.length).toBeGreaterThan(0)
        expect(labelsWithoutGroupedSectionName[0]).toBeDefined()
        // console.log("first label found without groupedSectionName = ", labelsWithoutGroupedSectionName[0])

        done()
    })

    it("should display HL7 code", async () => {
        let codes = getVaccinesCovid19CVX()
        let displayCode = await getDisplayOrTextByCodeHL7(codes[0])   // international English display code (default)
        // console.log("displayCode HL7 = ", displayCode)
        expect(displayCode).toBeDefined()
    })

})
