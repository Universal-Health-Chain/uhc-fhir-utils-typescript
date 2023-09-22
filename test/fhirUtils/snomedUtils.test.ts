
import { getLabelsOfGroupedCodes } from "../../src/managers/CommonFHIR";
import { GroupedSNOMED, getVaccinationProcedureCovid19CodesSNOMED, resultCovid19SerologyCodesSNOMED, getDisplayOrTextByCodeSNOMED } from "../../src/managers/Snomed";

import { FhirUtils } from '../../src/FhirUtils';
const fhirUtils = new FhirUtils()

const customLanguageFileSpanishSNOMED = {
    "840544004":"Sospecha de COVID-19"
}

describe("translate SNOMED codes", () => {
    it("should display SNOMED code", () => {
        let code = resultCovid19SerologyCodesSNOMED.negative
        let displayCode = getDisplayOrTextByCodeSNOMED(code) // display code SHALL ALWAYS BE English (international)
        console.log("display code SNOMED " + code + " = ", displayCode)
        expect(displayCode==undefined).toBeFalsy()
    })

    it("should get the text of a SNOMED code in a custom language", () => {
        let code = fhirUtils.covid19.suspectedDiseaseSNOMED()
        let customText = getDisplayOrTextByCodeSNOMED(code, customLanguageFileSpanishSNOMED) // display code SHALL ALWAYS BE English (international)
        console.log("custom text of code SNOMED " + code + " = ", customText)
        expect(customText==undefined).toBeFalsy()
    })

    // deprecated grouped sections in SNOMED file
    xit("should translate SNOMED code by grouped sections", (done) => {
        const SnomedLabelsEN:any = require ("../../languages/international/snomedUHC.json") 
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
        let labelsByGroupedSectionName = getLabelsOfGroupedCodes(procedureCodesCovid19Global, SnomedLabelsEN, groupedSectionName)
        expect(labelsByGroupedSectionName.length).toBeGreaterThan(0)
        expect(labelsByGroupedSectionName[0]).toBeDefined()
        // console.log("first label found with groupedSectionName = ", labelsByGroupedSectionName[0])

        // It searchs and gets the labels without a specific groupedSectionName (less efficient)
        let labelsWithoutGroupedSectionName = getLabelsOfGroupedCodes(procedureCodesCovid19Global, SnomedLabelsEN)
        expect(labelsWithoutGroupedSectionName.length).toBeGreaterThan(0)
        expect(labelsWithoutGroupedSectionName[0]).toBeDefined()
        // console.log("first label found without groupedSectionName = ", labelsWithoutGroupedSectionName[0])

        done()
    })

})
