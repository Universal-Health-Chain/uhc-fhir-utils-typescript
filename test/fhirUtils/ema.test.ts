
import { getLabelsOfGroupedCodes } from "../../src/fhirUtils/CommonFHIR";
import { getDisplayOrTextByCodeEMA, getApprovedCovid19VaccineCodesEMA } from "../../src/fhirUtils/Ema";
import { CodingSystem } from "../../src";

// TODO: define interface for SnomedLabels JSON objects
const emaEnglishFile:any = require ("../../languages/international/emaUHC.json") 

describe("translate EMA codes", () => {

    it("should translate EMA code", (done) => {
        expect(Object.keys(emaEnglishFile["https://ec.europa.eu/health/documents/community-register/html/"]).length).toBeGreaterThan(0)
        // console.log("LoincLabelsEN.healthSection = ", LoincLabelsEN.healthSection)
        
        let approvedCovid19VaccineCodes = getApprovedCovid19VaccineCodesEMA()
        expect(approvedCovid19VaccineCodes.length).toBeGreaterThan(0)
        // console.log("first procedureCodesCovid19Spain = ", procedureCodesCovid19Spain[0])    

        let groupedSectionName = CodingSystem.emaCovid19Vaccine
        expect(groupedSectionName).toBeDefined

        // It searchs and gets the labels by a specific groupedSectionName (more efficient)
        let labelsByGroupedSectionName = getLabelsOfGroupedCodes(approvedCovid19VaccineCodes, emaEnglishFile, groupedSectionName)
        expect(labelsByGroupedSectionName.length).toBeGreaterThan(0)
        expect(labelsByGroupedSectionName[0]).toBeDefined()
        // console.log("first label found with groupedSectionName = ", labelsByGroupedSectionName[0])

        // It searchs and gets the labels without a specific groupedSectionName (less efficient)
        let labelsWithoutGroupedSectionName = getLabelsOfGroupedCodes(approvedCovid19VaccineCodes, emaEnglishFile)
        expect(labelsWithoutGroupedSectionName.length).toBeGreaterThan(0)
        expect(labelsWithoutGroupedSectionName[0]).toBeDefined()
        // console.log("first label found without groupedSectionName = ", labelsWithoutGroupedSectionName[0])

        done()
    })

    it("should display EMA code", () => {
        let codes = getApprovedCovid19VaccineCodesEMA()
        let displayCode = getDisplayOrTextByCodeEMA(codes[0])   // international English display code (default)
        // console.log("displayCode EMA = ", displayCode)
        expect(displayCode).toBeDefined()
    })

})
