/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import {  } from "../../src/fhirUtils/Bundle"
import { medicalHistoryClassification } from "../../src/fhirUtils/Loinc"
import { testSubjectId } from "../data/dataForCommonTests"

const observationForTesting: R4.IObservation = {
    resourceType: "Observation",
    id: "observation-for-testing-uuid",
    code: {
        text: "Locale code text for testing",
        coding: [
            {
                display: "observation code for testing",
                code: "code-for-testing-1",
                system: "code-system-for-testing"
            }
        ]
    }
}

// TODO:
describe("test FHIR Bundle of type Message", () => {

    // errors with resources.filter is not a function at Object.getResources (src/fhirUtils/fhirBundleUtils.ts:453:35): let results:any[] = resources.filter( function(resource){

    it("should create a FHIR Message", async (done) => {
        done()
    })

})