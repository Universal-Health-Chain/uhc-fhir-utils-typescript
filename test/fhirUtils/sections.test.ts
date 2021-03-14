/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { FhirUtils } from "../../src/"
const fhirUtils = new FhirUtils()

describe("get specific section code", () => {
    it("should getSectionDiagnosticResultsLOINC", () => {
        const healthHistorySection:string = fhirUtils.sections.getSectionDiagnosticResultsLOINC()
        expect(healthHistorySection).toBeDefined
    })
    it("should getSectionImmunizationLOINC", () => {
        const healthHistorySection:string = fhirUtils.sections.getSectionImmunizationLOINC()
        expect(healthHistorySection).toBeDefined
    })
    it("should getSectionVitalSignsLOINC", () => {
        const healthHistorySection:string = fhirUtils.sections.getSectionVitalSignsLOINC()
        expect(healthHistorySection).toBeDefined
    })
    it("should getSectionSymptomsLOINC", () => {
        const healthHistorySection:string = fhirUtils.sections.getSectionSymptomsLOINC()
        expect(healthHistorySection).toBeDefined
    })

})