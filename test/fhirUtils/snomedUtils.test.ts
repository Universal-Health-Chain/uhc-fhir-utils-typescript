
import { getLabelsOfCodes } from "../../src/fhirUtils/CommonFHIR";
import { GroupedSNOMED, getVaccinationProcedureCovid19CodesSNOMED } from "../../src/fhirUtils/Snomed";

// TODO: define interface for SnomedLabels JSON objects
const SnomedLabelsEN:any = require ("../../languages/en/snomedUHC.json") 

describe("translate SNOMED codes", () => {

        it("should translate SNOMED code", (done) => {
            expect(Object.keys(SnomedLabelsEN.vaccineTargetDisease).length).toBeGreaterThan(0)
            // console.log("LoincLabelsEN.healthSection = ", LoincLabelsEN.healthSection)
            
            let procedureCodesCovid19Global = getVaccinationProcedureCovid19CodesSNOMED()
            expect(procedureCodesCovid19Global.length).toBeGreaterThan(0)
            // console.log("first procedureCodesCovid19Global = ", procedureCodesCovid19Global[0])
            
            let procedureCodesCovid19International = getVaccinationProcedureCovid19CodesSNOMED("international")
            expect(procedureCodesCovid19International.length).toBeGreaterThan(0)
            // console.log("first procedureCodesCovid19International = ", procedureCodesCovid19International[0])
            
            let procedureCodesCovid19Spain = getVaccinationProcedureCovid19CodesSNOMED("ES")
            expect(procedureCodesCovid19Spain.length).toBeGreaterThan(0)
            // console.log("first procedureCodesCovid19Spain = ", procedureCodesCovid19Spain[0])    

            let groupedSectionName = GroupedSNOMED.vaccinationProcedureFullCovid19
            expect(groupedSectionName).toBeDefined

            // It searchs and gets the labels by a specific groupedSectionName (more efficient)
            let labelsByGroupedSectionName = getLabelsOfCodes(procedureCodesCovid19Global, SnomedLabelsEN, groupedSectionName)
            expect(labelsByGroupedSectionName.length).toBeGreaterThan(0)
            expect(labelsByGroupedSectionName[0]).toBeDefined()
            // console.log("first label found with groupedSectionName = ", labelsByGroupedSectionName[0])

            // It searchs and gets the labels without a specific groupedSectionName (less efficient)
            let labelsWithoutGroupedSectionName = getLabelsOfCodes(procedureCodesCovid19Global, SnomedLabelsEN)
            expect(labelsWithoutGroupedSectionName.length).toBeGreaterThan(0)
            expect(labelsWithoutGroupedSectionName[0]).toBeDefined()
            // console.log("first label found without groupedSectionName = ", labelsWithoutGroupedSectionName[0])

            done()
        })
    
    })
