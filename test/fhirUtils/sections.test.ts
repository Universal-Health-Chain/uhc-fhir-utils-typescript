/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { FhirUtils } from "../../src/"
const fhirUtils = new FhirUtils()

describe("get codes of medical history classification", () => {
    it("should get code for every medical history classification", () => {
        let patientSummaryLOINC = fhirUtils.sections.getPatientSummaryLOINC()
        expect(patientSummaryLOINC==undefined).toBeFalsy()

        let section:string

        section = fhirUtils.sections.getSectionAdvanceDirectivesLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionAllergiesLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionDiagnosticResultsLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionDietLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionFamilyDiseasesLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionFunctionalStatusLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionImmunizationLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionMedicalDevicesLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionMedicationLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionMentalStatusLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionOutPatientLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionPastProblemsLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionPlanOfCareLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionPregnancyLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionProblemListLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionSocialHistoryLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionSymptomsLOINC()
        expect(section==undefined).toBeFalsy()
        section = fhirUtils.sections.getSectionVitalSignsLOINC()
        expect(section==undefined).toBeFalsy()        
    })

})