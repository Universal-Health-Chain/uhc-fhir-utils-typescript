
import { getLabelsOfCodes } from "../../src/fhirUtils/CommonFHIR";
import { getVaccinesCovid19CVX, GroupedHL7, getDisplayCodeHl7 } from "../../src/fhirUtils/Hl7";

// TODO: define interface for SnomedLabels JSON objects
const Hl7LabelsEN:any = require ("../../languages/en/hl7UHC.json") 

describe("translate HL7 codes", () => {

    it("should translate HL7 code", (done) => {
        expect(Object.keys(Hl7LabelsEN.cvx).length).toBeGreaterThan(0)
        // console.log("LoincLabelsEN.healthSection = ", LoincLabelsEN.healthSection)
        
        let vaccineCovid19CVX = getVaccinesCovid19CVX()
        expect(vaccineCovid19CVX.length).toBeGreaterThan(0)
        // console.log("first procedureCodesCovid19Spain = ", procedureCodesCovid19Spain[0])    

        let groupedSectionName = GroupedHL7.cvxCovid19
        expect(groupedSectionName).toBeDefined

        // It searchs and gets the labels by a specific groupedSectionName (more efficient)
        let labelsByGroupedSectionName = getLabelsOfCodes(vaccineCovid19CVX, Hl7LabelsEN, groupedSectionName)
        expect(labelsByGroupedSectionName.length).toBeGreaterThan(0)
        expect(labelsByGroupedSectionName[0]).toBeDefined()
        // console.log("first label found with groupedSectionName = ", labelsByGroupedSectionName[0])

        // It searchs and gets the labels without a specific groupedSectionName (less efficient)
        let labelsWithoutGroupedSectionName = getLabelsOfCodes(vaccineCovid19CVX, Hl7LabelsEN)
        expect(labelsWithoutGroupedSectionName.length).toBeGreaterThan(0)
        expect(labelsWithoutGroupedSectionName[0]).toBeDefined()
        // console.log("first label found without groupedSectionName = ", labelsWithoutGroupedSectionName[0])

        done()
    })

    it("should display HL7 code", () => {
        let codes = getVaccinesCovid19CVX()
        let displayCode = getDisplayCodeHl7(codes[0])
        expect(displayCode).toBeDefined
    })

})
