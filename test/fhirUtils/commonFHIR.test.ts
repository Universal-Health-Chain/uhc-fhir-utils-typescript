/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { anonymizeResource } from "../../src/fhirUtils/CommonFHIR"

const ipsDocument:any = require("../examples/Bundle-IPS-examples-Bundle-01.json")

describe("anonymize FHIR data", () => {

// composition.section.entry will be empty in an IPS document, also observation.hasMembers (fix it?)
// TODO: remove identifier, performer should be empty
    it("should anonymize a IPS document", (done) => {
        // //console.log("ipsDocument", ipsDocument)
        const anonymizedFHIR = anonymizeResource(ipsDocument)
        // console.log("Anonymized IPS = ", JSON.stringify(anonymizedFHIR))
        // TODO: check if values are empty
        done()
    })

})