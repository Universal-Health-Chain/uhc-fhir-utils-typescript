/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */


import { FhirUtils } from '../../src/FhirUtils';
import { R4 } from '@ahryman40k/ts-fhir-types';
import { GlobalIndexFHIR } from '../../src';
const fhirUtils = new FhirUtils()

const customLanguageFileSpanishHL7:any = {
    "identifierType": {
        "NN":"Documento nacionad de identidad"
    }
}

describe("test Identifer", () => {
    
    it("should create a patient identifier", () => {
        const hl7CodeType:string = "NN"
        const identifierTypeCode = hl7CodeType + "ESP" // HL7 type code: Spanish National Person Identifier
        const identifierConcept:R4.ICodeableConcept = fhirUtils.codeableConcept.createCodeableConceptWithLanguageFile(
            identifierTypeCode,
            GlobalIndexFHIR.groupedCodes.identifierPersonal.system, // "http://hl7.org/fhir/v2/0203/"
            customLanguageFileSpanishHL7
        )
        // console.log("identifier.type = ", JSON.stringify(identifierType))

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