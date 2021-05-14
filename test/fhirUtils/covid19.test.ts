/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { FhirUtils, CodingSystem } from "../../src/"
import { R4 } from "@ahryman40k/ts-fhir-types"
import { getCodeListInArrayOfCodeableConcepts } from "../../src/fhirUtils/CodeableConcept"
const fhirUtils = new FhirUtils()

describe("test COVID-19 alert communications", () => {

    it("should create confirmed COVID-19 alert communication", () => {
        let communication:R4.ICommunication = fhirUtils.covid19.createCovid19DiseaseAlertCommunication()
        // console.log("COVID-19 communication = ", JSON.stringify(communication))
        expect(communication.category).toHaveLength(1)
        expect(communication.reasonCode).toHaveLength(1)

        let categoryCodes:string[] = getCodeListInArrayOfCodeableConcepts(communication.category)
        expect(categoryCodes.includes("alert")).toBeTruthy()

        let reasonCodes:string[] = getCodeListInArrayOfCodeableConcepts(communication.reasonCode)
        expect(reasonCodes.includes(fhirUtils.covid19.confirmedDiseaseSNOMED())).toBeTruthy()

        expect(fhirUtils.covid19.isCovid19DiseaseAlertCommunication(communication)).toBeTruthy
    })

    it("should create suspected COVID-19 alert communication", () => {
        let communication:R4.ICommunication = fhirUtils.covid19.createCovid19SuspectedAlertCommunication()
        // console.log("COVID-19 communication = ", JSON.stringify(communication))
        expect(communication.category).toHaveLength(1)
        expect(communication.reasonCode).toHaveLength(1)

        let categoryCodes:string[] = getCodeListInArrayOfCodeableConcepts(communication.category)
        expect(categoryCodes.includes("alert")).toBeTruthy()

        let reasonCodes:string[] = getCodeListInArrayOfCodeableConcepts(communication.reasonCode)
        expect(reasonCodes.includes(fhirUtils.covid19.suspectedDiseaseSNOMED())).toBeTruthy()

        expect(fhirUtils.covid19.isCovid19SuspectedAlertCommunication(communication)).toBeTruthy
    })

    it("should create exposure to COVID-19 alert communication", () => {
        let communication:R4.ICommunication = fhirUtils.covid19.createCovid19ExposureAlertCommunication()
        // console.log("COVID-19 communication = ", JSON.stringify(communication))
        expect(communication.category).toHaveLength(1)
        expect(communication.reasonCode).toHaveLength(1)

        let categoryCodes:string[] = getCodeListInArrayOfCodeableConcepts(communication.category)
        expect(categoryCodes.includes("alert")).toBeTruthy()

        let reasonCodes:string[] = getCodeListInArrayOfCodeableConcepts(communication.reasonCode)
        expect(reasonCodes.includes(fhirUtils.covid19.exposureToDiseaseSNOMED())).toBeTruthy()

        expect(fhirUtils.covid19.isCovid19ExposureAlertCommunication(communication)).toBeTruthy
    })

})

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

    it("should get laboratory test group code: serology or NAAT group code", () => {
        let code:string = fhirUtils.covid19.naatTestsGroupCodeLOINC()
        expect(code==undefined).toBeFalsy()
        code = fhirUtils.covid19.naatTestsGroupCodeLOINC()
        expect(code==undefined).toBeFalsy()
    })

    it("should get possible SNOMED result codes for serology or NAAT laboratory tests", () => {
        let codes:string[] = fhirUtils.covid19.naatResultsCodesSNOMED()
        let displayCode = fhirUtils.snomed.getDisplayOrTextByCodeSNOMED(codes[0])
        // console.log("display code SNOMED " + codes[0] + " = ", displayCode)
        expect(displayCode==undefined).toBeFalsy()
        
        codes = fhirUtils.covid19.serologyResultsCodesSNOMED()
        displayCode = fhirUtils.snomed.getDisplayOrTextByCodeSNOMED(codes[0])
        // console.log("display code SNOMED " + codes[0] + " = ", displayCode)
        expect(displayCode==undefined).toBeFalsy()
    })

    it("should display laboratoryTestsCodesLOINC", () => {
        let codes = fhirUtils.covid19.laboratoryTestsCodesLOINC()
        let displayCode = fhirUtils.loinc.getDisplayOrTextByCodeLOINC(codes[0])
        console.log("display code LOINC " + codes[0] + " = ", displayCode)
        expect(displayCode==undefined).toBeFalsy()
    })

    it("should display laboratoryTestCodesSerologyLOINC", () => {
        let codes = fhirUtils.covid19.serologyTestsCodesLOINC()
        let displayCode = fhirUtils.loinc.getDisplayOrTextByCodeLOINC(codes[0])
        // console.log("display code LOINC " + codes[0] + " = ", displayCode)
        expect(displayCode==undefined).toBeFalsy()
    })

    it("should display laboratoryTestCodesNaatLOINC", () => {
        let codes = fhirUtils.covid19.naatTestsCodesLOINC()
        let displayCode = fhirUtils.loinc.getDisplayOrTextByCodeLOINC(codes[0])
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
        let displayCode = fhirUtils.hl7.getDisplayOrTextInGroupedSection(codes[0], CodingSystem.cvx)
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

describe("get COVID-19 resources", () => {

    it("should get COVID-19 Immunizations in a Bundle Document", () => {
        let bundleDocument = fhirUtils.bundle.createBundleDocumentWithTypeLOINC([testImmunizationFHIR])
        let covid19Immunizations = fhirUtils.covid19.getCovid19ImmunizationsInDocument(bundleDocument)
        expect(covid19Immunizations).toBeDefined()
        expect(covid19Immunizations).toHaveLength(1)
    })

    it("should get COVID-19 DiagnosticReports in a Bundle Document", () => {
        let bundleDocument = fhirUtils.bundle.createBundleDocumentWithTypeLOINC([testDiagnosticReportFHIR])
        let covid19Diagnostics = fhirUtils.covid19.getCovid19DiagnosticReportsInDocument(bundleDocument)
        expect(covid19Diagnostics).toBeDefined()
        expect(covid19Diagnostics).toHaveLength(1)
    })
})

// patient, vaccineCode and resourceType are mandatory
const testImmunizationFHIR:R4.IImmunization =  {
    "patient":{
        "reference": "Patient/universal-health-uuid"
    },
    "resourceType":"Immunization",
    "vaccineCode":{
        "coding":[
            {
                "code":"207",
                "system":"http://hl7.org/fhir/sid/cvx"
            }
        ]
    },
    "id":"universal-immunization-id",
    "status":"completed",
    "occurrenceDateTime":"2020-02-18",
}

const testDiagnosticReportFHIR:R4.IDiagnosticReport = {
	"category": [
		{
			"coding": [
				{
					"code": "LAB",
					"display": "Laboratory",
					"system": "http://terminology.hl7.org/CodeSystem/v2-0074"
				}
			],
			"text": "Laboratorio"
		}
	],
	"code": {
		"coding": [
			{
				"code": "94762-2",
				"display": "SARS-CoV-2 (COVID-19) Ab [Presence] in Serum or Plasma by Immunoassay",
				"system": "http://loinc.org"
			}
		],
		"text": "SARS-CoV-2 (COVID-19) Ab [Presencia] en suero o plasma por inmunoensayo"
	},
    "conclusion": "Negativo",
	"conclusionCode": [
		{
			"coding": [
				{
					"code": "260385009",
                    "display": "Negative",
					"system": "http://snomed.info/sct"
				}
			],
			"text": "Negativo"
		}
	],
	"effectiveDateTime": "2021-02-18",
    "id":"universal-diagnostic-report-id",
	"resourceType": "DiagnosticReport",
	"subject": {
		"reference": "Patient/<universal-health-identifier-patient-uuid>"
	}
}