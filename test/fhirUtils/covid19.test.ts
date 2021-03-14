/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { FhirUtils } from "../../src/"
import { covid19DiseaseTermsSNOMED } from "../../src/fhirUtils/Snomed"
import { covid19DiseaseTermsICD10, covid19DiseaseTermsICD11 } from "../../src/fhirUtils/Icd"
const fhirUtils = new FhirUtils()

describe("get specific COVID-19 related code(s) by system(s)", () => {

    it("should get 'COVID-19' tag", () => {
        let code:string = fhirUtils.covid19.covid19Tag()
        expect(code).toBe("COVID-19")
    })

    it("should get confirmedDiseaseICD10", () => {
        let code:string = fhirUtils.covid19.confirmedDiseaseICD10()
        expect(code==undefined).toBeFalsy()
    })

    it("should get confirmedDiseaseICD11", () => {
        let code:string = fhirUtils.covid19.confirmedDiseaseICD11()
        expect(code==undefined).toBeFalsy()
    })

    it("should get confirmedDiseaseSNOMED", () => {
        let code:string = fhirUtils.covid19.confirmedDiseaseSNOMED()
        expect(code).toBe("840539006")
    })

    it("should get exposureToDiseaseSNOMED", () => {
        let code:string = fhirUtils.covid19.exposureToDiseaseSNOMED()
        expect(code==undefined).toBeFalsy()
    })
    
    it("should get COVID-19 disease code from different systems", () => {
        let codes = fhirUtils.covid19.diseaseCodes()
        expect(codes.length).toBeGreaterThan(0)
        expect(codes[0]==undefined).toBeFalsy() // TODO: check if distinct codes are included
    })

    it("should get isCovid19Disease", () => {
        let result = fhirUtils.covid19.isCovid19Disease(fhirUtils.covid19.confirmedDiseaseSNOMED())
        expect(result).toBeTruthy()
        result = fhirUtils.covid19.isCovid19Disease(fhirUtils.covid19.confirmedDiseaseICD10())
        expect(result).toBeTruthy()
        result = fhirUtils.covid19.isCovid19Disease(fhirUtils.covid19.confirmedDiseaseICD11())
        expect(result).toBeTruthy()
    })

    it("should get isSuspectedDisease", () => {
        let result = fhirUtils.covid19.isSuspectedDisease(fhirUtils.covid19.suspectedDiseaseSNOMED())
        expect(result).toBeTruthy()
        result = fhirUtils.covid19.isSuspectedDisease(fhirUtils.covid19.suspectedDiseaseICD10())
        expect(result).toBeTruthy()
        result = fhirUtils.covid19.isSuspectedDisease(fhirUtils.covid19.suspectedDiseaseICD11())
        expect(result).toBeTruthy()
    })

    it("should get isCovid19OrSuspectedDisease", () => {
        let result = fhirUtils.covid19.isCovid19OrSuspectedDisease(fhirUtils.covid19.confirmedDiseaseSNOMED())
        expect(result).toBeTruthy()
        result = fhirUtils.covid19.isCovid19OrSuspectedDisease(fhirUtils.covid19.confirmedDiseaseICD10())
        expect(result).toBeTruthy()
        result = fhirUtils.covid19.isCovid19OrSuspectedDisease(fhirUtils.covid19.confirmedDiseaseICD11())
        expect(result).toBeTruthy()
        result = fhirUtils.covid19.isCovid19OrSuspectedDisease(fhirUtils.covid19.suspectedDiseaseSNOMED())
        expect(result).toBeTruthy()
        result = fhirUtils.covid19.isCovid19OrSuspectedDisease(fhirUtils.covid19.suspectedDiseaseICD10())
        expect(result).toBeTruthy()
        result = fhirUtils.covid19.isCovid19OrSuspectedDisease(fhirUtils.covid19.suspectedDiseaseICD11())
        expect(result).toBeTruthy()
    })

    it("should display laboratoryTestCodesNaatLOINC", () => {
        let codes = fhirUtils.covid19.laboratoryTestCodesLOINC()
        let displayCode = fhirUtils.loinc.getDisplayCode(codes[0])
        // console.log("display code LOINC " + codes[0] + " = ", displayCode)
        expect(displayCode==undefined).toBeFalsy()
    })

    it("should display laboratoryTestCodesSerologyLOINC", () => {
        let codes = fhirUtils.covid19.laboratoryTestCodesSerologyLOINC()
        let displayCode = fhirUtils.loinc.getDisplayCode(codes[0])
        // console.log("display code LOINC " + codes[0] + " = ", displayCode)
        expect(displayCode==undefined).toBeFalsy()
    })

    it("should display laboratoryTestCodesNaatLOINC", () => {
        let codes = fhirUtils.covid19.laboratoryTestCodesNaatLOINC()
        let displayCode = fhirUtils.loinc.getDisplayCode(codes[0])
        // console.log("display code LOINC " + codes[0] + " = ", displayCode)
        expect(displayCode==undefined).toBeFalsy()
    })

    it("should get negativeOrNotDetectedCodesSNOMED", () => {
        let codes:string[] = fhirUtils.covid19.negativeOrNotDetectedCodesSNOMED()
        expect(codes.length).toBeGreaterThan(0)
        expect(codes[0]==undefined).toBeFalsy() // TODO: check if distinct codes are included
    })

    it("should get positiveOrDetectedCodesSNOMED", () => {
        let codes:string[] = fhirUtils.covid19.positiveOrDetectedCodesSNOMED()
        expect(codes.length).toBeGreaterThan(0)
        expect(codes[0]==undefined).toBeFalsy() // TODO: check if distinct codes are included
    })


    it("should get probablyNotPresentCodesSNOMED", () => {
        let codes:string[] = fhirUtils.covid19.probablyNotPresentCodesSNOMED()
        expect(codes.length).toBeGreaterThan(0)
        expect(codes[0]==undefined).toBeFalsy() // TODO: check if distinct codes are included
    })

    it("should get suspectedDiseaseCodes", () => {
        let codes:string[] = fhirUtils.covid19.suspectedDiseaseCodes()
        expect(codes.length).toBeGreaterThan(0)
        expect(codes[0]==undefined).toBeFalsy() // TODO: check if distinct codes are included
    })

    it("should get suspectedDiseaseCodes", () => {
        let codes:string[] = fhirUtils.covid19.suspectedOrInconclusiveCodesSNOMED()
        expect(codes.length).toBeGreaterThan(0)
        expect(codes[0]==undefined).toBeFalsy() // TODO: check if distinct codes are included
    })

    it("should get vaccinationProcedureCodes", () => {
        let codes:string[] = fhirUtils.covid19.vaccinationProcedureCodes()
        expect(codes.length).toBeGreaterThan(0)
        expect(codes[0]==undefined).toBeFalsy() // TODO: check if distinct codes are included
    })

    it("should get vaccinationProcedureCodesInternationalSNOMED", () => {
        let codes:string[] = fhirUtils.covid19.vaccinationProcedureCodesInternationalSNOMED()
        expect(codes.length).toBeGreaterThan(0)
        expect(codes[0]==undefined).toBeFalsy() // TODO: check if distinct codes are included
    })

    it("should get vaccinationProcedureCodes", () => {
        let codes:string[] = fhirUtils.covid19.vaccinationProcedureCodesSpainSNOMED()
        expect(codes.length).toBeGreaterThan(0)
        expect(codes[0]).toBe("65661000122107") // TODO: check if distinct codes are included
    })

    it("should display vaccineCodesCVX", () => {
        let codes:string[] = fhirUtils.covid19.vaccineCodesCVX()
        let displayCode = fhirUtils.hl7.getDisplayCode(codes[0])
        // console.log("display code HL7 CVX " + codes[0] + " = ", displayCode)
        expect(displayCode==undefined).toBeFalsy()
    })

    it("should get vaccineCodeATC", () => {
        let code:string = fhirUtils.covid19.vaccineCodeATC()
        expect(code==undefined).toBeFalsy()
        //let displayCode = fhirUtils.hl7.getDisplayCode(codes[0])
        // console.log("display code HL7 CVX " + codes[0] + " = ", displayCode)
        //expect(displayCode==undefined).toBeFalsy()
    })

    it("should get CVX and ATC COVID-19 vaccineCodes", () => {
        let codes = fhirUtils.covid19.vaccineCodes()
        expect(codes.length).toBeGreaterThan(0)
        expect(codes[0]==undefined).toBeFalsy() // TODO: check if distinct codes are included
    })

    it("should get isCovid19Vaccine", () => {
        let result = fhirUtils.covid19.isCovid19Vaccine(fhirUtils.covid19.vaccineCodesCVX()[0])
        expect(result).toBeTruthy()
        result = fhirUtils.covid19.isCovid19Vaccine(fhirUtils.covid19.vaccineCodeATC())
        expect(result).toBeTruthy()
        result = fhirUtils.covid19.isCovid19Vaccine(fhirUtils.covid19.vaccineCodes()[0])
        expect(result).toBeTruthy()
    })


})