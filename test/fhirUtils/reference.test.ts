/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"

import { FhirUtils } from "../../src"
const fhirUtils = new FhirUtils()

describe("test Reference", () => {
    it("should create Reference by string reference and type of reference", () => {
        let reference:R4.IReference = fhirUtils.reference.createWithStringReference("Patient/universal-health-id", "Patient")
        expect(reference).toBeDefined()
        let stringReferences = fhirUtils.reference.getStringsReferences([reference])
        expect(stringReferences).toHaveLength(1)
    })

    // type of reference is different from type of identifier code 
    xit("should create Reference by identifier with code, system and type of code", () => {
        // let reference:R4.IReference = fhirUtils.reference.getStringsReferencesByIdentifierAndSystem

    })
})

const patientIdentifierTest:R4.IReference = {
    identifier: {
        assigner: {
            display: "Ministerio del Interior - Gobierno de España"
        },
        period: {
            end: "2028-04-30",
            start: "2018-04-30"
        },
        system: "urn:oid:1.3.6.1.4.1.19126.3",
        type: {
            coding: [
                {
                    code: "NNESP",
                    display: "National Person Identifier",
                    system: "http://hl7.org/fhir/v2/0203/"
                }
            ],
            text: "Documento Nacional de Identidad"
        },
        use:  R4.IdentifierUseKind._official,
        value: "DNI123456"
    },
    reference: "Patient/universal-health-id",
    type: "Patient"
}