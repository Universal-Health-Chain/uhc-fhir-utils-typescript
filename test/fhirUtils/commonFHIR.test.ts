/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types";
import { anonymizeResource } from "../../src/fhirUtils/CommonFHIR";
import { getLabelsOfGroupedCodes } from "../../src/fhirUtils/CommonFHIR";
import { FhirUtils } from "../../src"

const fhirUtils = new FhirUtils()

const ipsDocument:R4.IBundle = require("../examples/Bundle-IPS-examples-Bundle-01.json")

describe("fhir organization of bundles", () => {
    it("should organize bundle by resource type", (done) => {
        const map = fhirUtils.commonFHIR.classifyBundleByResourceTypes(ipsDocument)
        // console.log("classifyFhirBundleByResourceType map = ", map)
        expect(map.get("Composition")).not.toBeUndefined()
        done()
    })

})

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

describe("get labels of codes", () => {

    it("should get labels of codes by sections in an object", (done) => {
        const LabelsOfCodesGroupedInSections = {
            group1:{
                code1InGroup1: "labelOfCode1InGroup1"
            },
            group2:{
                code1InGroup2: "labelOfCode1InGroup2"
            }
        }
        const codes = ["code1InGroup1"]
        const groupedSectionName = Object.keys(LabelsOfCodesGroupedInSections)[0] // "group1"

        // It searchs and gets the labels by a specific groupedSectionName (more efficient)
        let labelsByGroupedSectionName = getLabelsOfGroupedCodes(codes, LabelsOfCodesGroupedInSections, groupedSectionName)
        expect(labelsByGroupedSectionName.length).toBeGreaterThan(0)
        expect(labelsByGroupedSectionName[0]).toBeDefined()
        // console.log("first label found with groupedSectionName = ", labelsByGroupedSectionName[0])

        // It searchs and gets the labels without a specific groupedSectionName (less efficient)
        let labelsWithoutGroupedSectionName = getLabelsOfGroupedCodes(codes, LabelsOfCodesGroupedInSections)
        expect(labelsWithoutGroupedSectionName.length).toBeGreaterThan(0)
        expect(labelsWithoutGroupedSectionName[0]).toBeDefined()
        // console.log("first label found without groupedSectionName = ", labelsWithoutGroupedSectionName[0])

        done()
    })

})