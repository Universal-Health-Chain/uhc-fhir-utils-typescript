/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { GroupedLOINC } from "../../src/managers/Loinc";

import { FhirUtils } from "../../src"
const fhirUtils = new FhirUtils()

// TODO: define interface for SnomedLabels JSON objects
// const LoincLabelsEN:any = require ("../../languages/international/loincUHC.json")

describe("translate LOINC codes", () => {

    it("should display LOINC code", () => {
        let codes = fhirUtils.atc.getVaccinesGroupsATC()
        let displayCode = fhirUtils.atc.getDisplayOrTextByCodeATC(codes[0])
        // console.log("display code ATC " + codes[0] + " = ", displayCode)
        expect(displayCode).toBeDefined()
        expect(displayCode==undefined).toBeFalsy()
    })

})
