/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types";
import { GlobalIndexHL7 } from "../../src/fhirUtils/Hl7";
import { GlobalIndexLOINC } from "../../src/fhirUtils/Loinc";
import { getCodeListInCodeableConcept } from "../../src/fhirUtils/CodeableConcept";

// Testing both ways
import BundleUtils = require('../../src/fhirUtils/Bundle')
import { Bundle } from '../../src/fhirUtils/Bundle';
const bundleUtils = new Bundle()

import { FhirUtils } from '../../src/FhirUtils';
import { systemLOINC } from "../../src/fhirUtils/CommonFHIR";
const fhirUtils = new FhirUtils()

const authorReferenceIdForTesting = "author-reference-uuid"
const patientSubject = "2b90dd2b-2dab-4c75-9bb9-a355e07401e8"

// -- Immunization --
const targetDisease:string = "840539006"

// -- Observation --
const healthHistorySectionCodeForTesting = "11369-6" // IndexHL7.category.healthSection.DiagnosticResults

const observationForTesting:R4.IObservation = {
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


describe("create FHIR Document Bundle and operates with it", () => { 
  it("should build an empty FHIR Bundle", (done) => {
      const result = bundleUtils.createBundleDocumentWithComposition() as any
      expect(result.resourceType).toBe("Bundle")
      expect(result.id).toBeDefined()
      expect(result.entry.length).toBe(1)
      expect(result.entry[0].resource.resourceType).toBe("Composition")
      done()
  });
  it("should add a FHIR resource to a FHIR Bundle", (done) => {
      let bundle = BundleUtils.createBundleDocumentWithComposition() as any
      bundle = BundleUtils.addAdditionalResourcesToBundle(bundle, [observationForTesting])
      expect(bundle.resourceType).toBe("Bundle")
      expect(bundle.id).toBeDefined()
      // expect(bundle.entry).toBeDefined()
      expect(bundle.entry).toBeDefined()
      expect(bundle.entry).toHaveLength(2)    // updated with the composition resource included
      const resourceEntry = bundle.entry[1]
      expect(resourceEntry).toHaveProperty("resource")      
      expect(resourceEntry.resource).toEqual(observationForTesting)
      done()
  });
  it("should create a FHIR bundle from an observation", (done) => {
      let bundle = BundleUtils.createBundleDocumentWithComposition([observationForTesting]) as any
      expect(bundle.resourceType).toBe("Bundle")
      expect(bundle.id).toBeDefined()
      expect(bundle.entry).toBeDefined()
      expect(bundle.entry).toHaveLength(2)    // updated with the composition resource included
      expect(bundle.entry[1]).toHaveProperty("resource")      
      expect(bundle.entry[1].resource).toEqual(observationForTesting)
      done()
  });    
  it("should get FHIR resources from a FHIR Bundle", (done) => {
      let bundle = BundleUtils.createBundleDocumentWithComposition()
      bundle = BundleUtils.addAdditionalResourcesToBundle(bundle, [observationForTesting])
      let resources = BundleUtils.getAllResourcesInBundleEntries(bundle)
      expect(resources).toHaveLength(2)   // updated with the composition resource included
      expect(resources[1].resourceType).toEqual(observationForTesting.resourceType)
      done()
  });    
  it("should get FHIR resources by type from a FHIR Bundle", (done) => {
      let bundle = BundleUtils.createBundleDocumentWithComposition()
      bundle = BundleUtils.addAdditionalResourcesToBundle(bundle, [observationForTesting])
      let resources = BundleUtils.getResourcesByTypes(bundle, ["Observation"])
      // //console.log("Resources = ", resources)
      expect(resources).toHaveLength(1)
      expect(resources[0]).toBe(observationForTesting)
      done()
  });
  it("should get a FHIR observation by its code from a FHIR Bundle", (done) => {
      let bundle = BundleUtils.createBundleDocumentWithComposition()
      bundle = BundleUtils.addAdditionalResourcesToBundle(bundle, [observationForTesting])
      let resources = BundleUtils.getResourcesByTypes(bundle, ["Observation"])
      expect(resources).toHaveLength(1)
      let observations = BundleUtils.getObservationsByCode(bundle, "code-for-testing-1")
      expect(observations).toHaveLength(1)    
      expect(observations[0]).toEqual(observationForTesting)
      done()
  });
  it("should get a FHIR resource by ID from a FHIR Bundle", (done) => {
      let bundle = BundleUtils.createBundleDocumentWithComposition()
      bundle = BundleUtils.addAdditionalResourcesToBundle(bundle, [observationForTesting])
      let resource = BundleUtils.getResourceByIdInBundle("observation-for-testing-uuid", bundle)
      expect(resource).toEqual(observationForTesting)
      done()
  });
});


describe("create bundle Documents and operates with it", () => {

    it("should create an IPS Document ", (done) => {
        //console.log("IndexHL7.category", IndexHL7.category)

        // It creates an IPS Bundle document       
        let ipsDocument = BundleUtils.createEmptyIPS(authorReferenceIdForTesting) as any
        //console.log("first ipsDocument = ", JSON.stringify(ipsDocument))
        expect(ipsDocument.id).toBeDefined()
        expect(ipsDocument.resourceType).toBe("Bundle")
        expect(ipsDocument.type).toBe(R4.BundleTypeKind._document)
        expect(ipsDocument.entry[0].resource.resourceType).toBe("Composition")

        // It checks isIPS()
        let checkIPS = BundleUtils.isIPS(ipsDocument)
        expect(checkIPS==true).toBe(true)

        // It checks if the "Composition" is of type "IPS"
        let compositions = BundleUtils.getResourcesByTypes(ipsDocument, ["Composition"]) as any
        expect(compositions[0]).toBeDefined
        // console.log("composition[0] = ", JSON.stringify(compositions[0]))
        
        let compositionCodes = getCodeListInCodeableConcept(compositions[0].type, systemLOINC) as string[]
        //console.log("compositionCodes[] = ", compositionCodes)
        expect(compositionCodes.includes("60591-5")).toBeTruthy // or expect(compositionCodes).toContain("60591-5")

        // It adds an observation in the section
        let modifiedIPS = BundleUtils.addResourcesBySection(ipsDocument, healthHistorySectionCodeForTesting, systemLOINC, [observationForTesting]) as any
        //console.log("IPS Document with added observation = ", JSON.stringify(modifiedIPS))
        expect(modifiedIPS.entry[1].resource).toEqual(observationForTesting)
        // TODO: check if the composition contains the reference to the added resource

        // It gets the observation from the IPS document
        let resources = BundleUtils.getResourcesInSection(modifiedIPS, healthHistorySectionCodeForTesting, systemLOINC) as any
        //expect(resources[0]).toEqual(observationForTesting)

        // It replaces the observation by its id into the IPS document
        let newObservation = observationForTesting
        newObservation.language = "newLanguage"
        let newIPS = BundleUtils.replaceResourceById(newObservation, modifiedIPS) as any
        //console.log("newIPS = ", JSON.stringify(newIPS))
        expect(newIPS.entry[1].resource).toBe(newObservation)
        done()
    })

    // see also fhirMessageUtils.test.ts

    /*
    it("should add COVID-19 data to an IPS Document ", (done) => {
        let fhirIPS:R4.IBundle = ipsForTesting as R4.IBundle // JSON.parse(ipsForTesting) // as R4.IBundle
        // It checks isIPS()
        let checkIPS = isIPS(fhirIPS)
        expect(checkIPS==true).toBe(true)

        // Getting (creating) an Immunization and a Lab test
        let fhirImmunization =  createImmunization(immunizationFormCovid19ForTesting)
        let fhirDiagnosticReport = (advancedCovid19DiagnosticReportFormForTesting)

        // It adds an immunization to the section
        let immunizationSection = helpers.immunizationHelper.getSectionImmunizationLOINC()
        let modifiedIPS = addResourcesBySection(fhirIPS, immunizationSection, IndexHL7.CODE_SYSTEMS.LOINC, [fhirImmunization]) as any
        //console.log("IPS Document with added immunization = ", JSON.stringify(modifiedIPS))
        // TODO: check if the composition contains the reference to the added resource

        // It adds a lab test to the section
        let diagnosticResultsSection = helpers.diagnosticReportHelper.getSectionDiagnosticResultsLOINC()
        modifiedIPS = addResourcesBySection(fhirIPS, diagnosticResultsSection, IndexHL7.CODE_SYSTEMS.LOINC, [fhirDiagnosticReport]) as any
        
        // console.log("IPS Document = ", JSON.stringify(modifiedIPS))
        // TODO: check if the composition contains the reference to the added resource

        done()
    }) 
    */

})