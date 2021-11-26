/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types";
import { getCodeListInCodeableConcept } from "../../src/fhirUtils/CodeableConcept";
import { testBundleDocumentWithCovid19ImmunizationsWithoutComposition} from "../../test/data/dataForImmunizations"

// importbundleUtils = require('../../src/fhirUtils/Bundle')
// import { Bundle } from '../../src/fhirUtils/Bundle';
// const bundleUtils = new Bundle()

import { FhirUtils } from '../../src/FhirUtils';
import { CodingSystem, medicalHistoryClassification } from "../../src";
const fhirUtils = new FhirUtils()

const authorReferenceIdForTesting = "author-reference-uuid"
const patientSubject = "2b90dd2b-2dab-4c75-9bb9-a355e07401e8"

// -- Immunization --
const targetDisease:string = "840539006"

// -- Observation --
const healthHistorySectionCodeForTesting = "11369-6" // DiagnosticResults
const bundleIPS:R4.IBundle = require("../examples/fhirR4/Bundle-IPS-examples-Bundle-01.json")
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

const DiagnosticReportCovid19:R4.IDiagnosticReport={
    resourceType: "DiagnosticReport",
    status: R4.DiagnosticReportStatusKind._final,
    id: "diagnostic-report-covid-for-testing-uuid",
    code: {
        text: "Locale code text for testing",
        coding: [
            {
                code: fhirUtils.covid19.serologyTestsGroupCodeLOINC(),
                display: fhirUtils.loinc.getDisplayOrTextByCodeLOINC(fhirUtils.covid19.serologyTestsGroupCodeLOINC()),
                system: CodingSystem.loinc
            }
        ]
    },
    conclusionCode: [
        {
            text: "Resultado en texto local",
            coding: [
                {
                    code: fhirUtils.covid19.confirmedDiseaseSNOMED(),
                    display: fhirUtils.snomed.getDisplayOrTextByCodeSNOMED(fhirUtils.covid19.confirmedDiseaseSNOMED()),
                    system: CodingSystem.snomed
                }
            ]
        }
    ]
}

describe("testing bundle composition functions", () => {

  it("should getSectionCodeForResourceId", (done) => {
    const bundleDocument = bundleIPS as R4.IBundle
    const resourceId = "c64139e7-f02d-409c-bf34-75e8bf23bc80"
    // const resourceReference = "Condition/c64139e7-f02d-409c-bf34-75e8bf23bc80"
    // createBundleDocumentAndCompositionIndexByResourceId
    const result = fhirUtils.bundle.getSectionCodeForResourceId(bundleDocument, resourceId)
    expect(result).toBe('11450-4') // "Problem list Reported"
    done()
  })

  it("should get the Composition ID from a FHIR Bundle", (done) => {
    const documentCompositionID = fhirUtils.bundle.getCompositionCleanID(bundleIPS)
    // console.log("documentCompositionID = ", documentCompositionID)
    expect(documentCompositionID).toBeDefined()
    expect(documentCompositionID==="").toBeFalsy()
    done()
  })

  it("should get the resources references in a section of the bundle document", (done) => {
    const sectionCodeLOINC = medicalHistoryClassification.allergies
    const bundleDocumentIPS = bundleIPS as R4.IBundle
    
    const references = fhirUtils.bundle.getResourceReferencesBySectionCodeLOINC(bundleDocumentIPS, sectionCodeLOINC)
    console.log("references = ", references)
    
    expect(references).toBeDefined()
    expect(references.length).toBeGreaterThan(0)
    done()
  })

  it("should get the list of section codes in the bundle document", (done) => {
    const bundleDocumentIPS = bundleIPS as R4.IBundle
    
    const loincSectionCodes = fhirUtils.bundle.getCodesOfSections(bundleDocumentIPS)
    console.log("loincSectionCodes = ", loincSectionCodes)
    
    expect(loincSectionCodes).toBeDefined()
    expect(loincSectionCodes.length).toBeGreaterThan(0)
    done()
  })

})

// TODO: what happens with section if Practitioner, Organization, etc.? (USCDI Care Team Members)
describe("test getting resources from bundle", () => {

  it("should getResourcesWithFilters by IPS document with sections and excluding resources", (done) => {
    // params with possible options
    const fhirBundle = bundleIPS as R4.IBundle
    const defaultSectionLOINC = 'shouldNotBePresent' // should ignore it because IPS has sections
    const defaultServiceType = undefined
    const excludeResourceTypes: string[] = ['Patient', 'Practitioner', 'Organization', 'Composition', 'Event', 'MessageHeader']
    const includeResourceTypes = undefined
    const withSectionsLOINC = undefined
    const fromServiceTypes = undefined
    const withCodes = undefined

    const resources = fhirUtils.bundle.getResourcesWithFilters(fhirBundle, defaultSectionLOINC, defaultServiceType,
      excludeResourceTypes, includeResourceTypes, withSectionsLOINC, fromServiceTypes, withCodes)
    
    // console.log('getResourcesWithFilters by IPS document with sections and excluding resources = ', resources)
    expect(resources.length).toBeGreaterThan(1)
    // console.log("number of resources = ", resources.length)

    expect(resources[0].meta.section).toBeDefined()
    // console.log('resources[0].meta.section = ', resources[0].meta.section)
    expect(resources[0].meta.section!=='shouldNotBePresent').toBeTruthy()

    done()
  })

  it("should get resources by document whitout sections but with default section", (done) => {
    // params with possible options
    const fhirBundle = {...testBundleDocumentWithCovid19ImmunizationsWithoutComposition}
    const defaultSectionLOINC = 'shoulBePresent' // should put it because IPS has sections
    const defaultServiceType = undefined
    const excludeResourceTypes: string[] = ['Patient', 'Practitioner', 'Organization', 'Composition', 'Event', 'MessageHeader']
    const includeResourceTypes = undefined
    const withSectionsLOINC = undefined
    const fromServiceTypes = undefined
    const withCodes = undefined

    const resources = fhirUtils.bundle.getResourcesWithFilters(fhirBundle, defaultSectionLOINC, defaultServiceType,
      excludeResourceTypes, includeResourceTypes, withSectionsLOINC, fromServiceTypes, withCodes)
    
    // console.log('getResourcesWithFilters by IPS document with sections and excluding resources = ', resources)
    expect(resources.length).toBeGreaterThan(1)
    // console.log("number of resources = ", resources.length)

    expect(resources[0].meta.section).toBeDefined()
    // console.log('resources[0].meta.section = ', resources[0].meta.section)
    expect(resources[0].meta.section==='shoulBePresent').toBeTruthy()

    done()
  })

  it("should getResourcesWithFilters by document without setting section", (done) => {
    // params with possible options
    const fhirBundle = {...testBundleDocumentWithCovid19ImmunizationsWithoutComposition}
    const defaultSectionLOINC = undefined
    const defaultServiceType = undefined
    const excludeResourceTypes: string[] = ['Patient', 'Practitioner', 'Organization', 'Composition', 'Event', 'MessageHeader']
    const includeResourceTypes = undefined
    const withSectionsLOINC = undefined
    const fromServiceTypes = undefined
    const withCodes = undefined

    const resources = fhirUtils.bundle.getResourcesWithFilters(fhirBundle, defaultSectionLOINC, defaultServiceType,
      excludeResourceTypes, includeResourceTypes, withSectionsLOINC, fromServiceTypes, withCodes)
    
    // console.log('getResourcesWithFilters by IPS document with sections and excluding resources = ', resources)
    expect(resources.length).toBeGreaterThan(1)
    // console.log("number of resources = ", resources.length)

    expect(resources[0].meta).toBeUndefined()
    done()
  })

})

describe("create FHIR Document Bundle and operates with it", () => { 
  it("should build an empty FHIR Bundle", (done) => {
      // const result = fhirUtils.bundle.createBundleDocumentWithTypeLOINC() as any
      const result = fhirUtils.bundle.createBundleDocumentWithTypeLOINC() as any
      expect(result.resourceType).toBe("Bundle")
      expect(result.id).toBeDefined()
      expect(result.entry.length).toBe(1)
      expect(result.entry[0].resource.resourceType).toBe("Composition")
      done()
  });
  it("should add a FHIR resource to a FHIR Bundle", (done) => {
      let bundle = fhirUtils.bundle.createBundleDocumentWithTypeLOINC() as any
      bundle = fhirUtils.bundle.addResourcesToBundle(bundle, [DiagnosticReportCovid19])
      expect(bundle.resourceType).toBe("Bundle")
      expect(bundle.id).toBeDefined()
      // expect(bundle.entry).toBeDefined()
      expect(bundle.entry).toBeDefined()
      expect(bundle.entry).toHaveLength(2)    // updated with the composition resource included
      const resourceEntry = bundle.entry[1]
      expect(resourceEntry).toHaveProperty("resource")      
      expect(resourceEntry.resource).toEqual(DiagnosticReportCovid19)
      done()
  });
  it("should create a FHIR bundle from an observation", (done) => {
      let bundle = fhirUtils.bundle.createBundleDocumentWithTypeLOINC([observationForTesting]) as any
      expect(bundle.resourceType).toBe("Bundle")
      expect(bundle.id).toBeDefined()
      expect(bundle.entry).toBeDefined()
      expect(bundle.entry).toHaveLength(2)    // updated with the composition resource included
      expect(bundle.entry[1]).toHaveProperty("resource")      
      expect(bundle.entry[1].resource).toEqual(observationForTesting)
      done()
  });    
  it("should get FHIR resources from a FHIR Bundle", (done) => {
      let bundle = fhirUtils.bundle.createBundleDocumentWithTypeLOINC()
      bundle = fhirUtils.bundle.addResourcesToBundle(bundle, [observationForTesting])
      let resources = fhirUtils.bundle.getAllResources(bundle)
      expect(resources).toHaveLength(2)   // updated with the composition resource included
      expect(resources[1].resourceType).toEqual(observationForTesting.resourceType)
      done()
  });    
  it("should get FHIR resources by type from a FHIR Bundle", (done) => {
      let bundle = fhirUtils.bundle.createBundleDocumentWithTypeLOINC()
      bundle = fhirUtils.bundle.addResourcesToBundle(bundle, [observationForTesting])
      let resources = fhirUtils.bundle.getResourcesByTypes(bundle, ["Observation"])
      // //console.log("Resources = ", resources)
      expect(resources).toHaveLength(1)
      expect(resources[0]).toBe(observationForTesting)
      done()
  });

  it("should get a FHIR resource by ID from a FHIR Bundle", (done) => {
      let bundle =fhirUtils.bundle.createBundleDocumentWithTypeLOINC()
      bundle =fhirUtils.bundle.addResourcesToBundle(bundle, [observationForTesting])
      let resource =fhirUtils.bundle.getResourceByIdInBundle("observation-for-testing-uuid", bundle)
      expect(resource).toEqual(observationForTesting)
      done()
  });
});

describe("create bundle Documents and operates with it", () => {

    it("should create an IPS Document ", (done) => {
        //console.log("IndexHL7.category", IndexHL7.category)

        // It creates an IPS Bundle document       
        let ipsDocument =fhirUtils.bundle.createEmptyIPS(authorReferenceIdForTesting) as any
        //console.log("first ipsDocument = ", JSON.stringify(ipsDocument))
        expect(ipsDocument.id).toBeDefined()
        expect(ipsDocument.resourceType).toBe("Bundle")
        expect(ipsDocument.type).toBe(R4.BundleTypeKind._document)
        expect(ipsDocument.entry[0].resource.resourceType).toBe("Composition")

        // It checks isIPS()
        let checkIPS =fhirUtils.bundle.isIPS(ipsDocument)
        expect(checkIPS==true).toBe(true)

        // It checks if the "Composition" is of type "IPS"
        let compositions =fhirUtils.bundle.getResourcesByTypes(ipsDocument, ["Composition"]) as any
        expect(compositions[0]).toBeDefined
        // console.log("composition[0] = ", JSON.stringify(compositions[0]))
        
        let compositionCodes = getCodeListInCodeableConcept(compositions[0].type, CodingSystem.loinc) as string[]
        //console.log("compositionCodes[] = ", compositionCodes)
        expect(compositionCodes.includes("60591-5")).toBeTruthy // or expect(compositionCodes).toContain("60591-5")

        // It adds an observation in the section
        let modifiedIPS =fhirUtils.bundle.addResourcesBySection(ipsDocument, healthHistorySectionCodeForTesting, [observationForTesting]) as any
        //console.log("IPS Document with added observation = ", JSON.stringify(modifiedIPS))
        expect(modifiedIPS.entry[1].resource).toEqual(observationForTesting)
        // TODO: check if the composition contains the reference to the added resource

        // It gets the observation from the IPS document
        let resources =fhirUtils.bundle.getResourcesInSection(modifiedIPS, healthHistorySectionCodeForTesting) as any
        //expect(resources[0]).toEqual(observationForTesting)

        // It replaces the observation by its id into the IPS document
        let newObservation = observationForTesting
        newObservation.language = "newLanguage"
        let newIPS =fhirUtils.bundle.replaceResourceById(newObservation, modifiedIPS) as any
        //console.log("newIPS = ", JSON.stringify(newIPS))
        expect(newIPS.entry[1].resource).toBe(newObservation)
        done()
    })

    // see also fhirMessageUtils.test.ts

    
    it("should add COVID-19 data to an IPS Document ", (done) => {
        let documentIPS:R4.IBundle = require("../examples/fhirR4/Bundle-IPS-examples-Bundle-01.json")
        // It checks isIPS()
        let checkIPS = fhirUtils.bundle.isIPS(documentIPS)
        expect(checkIPS==true).toBe(true)

        // It adds an immunization to the section
        let immunizationSection = fhirUtils.sections.getSectionImmunizationLOINC()
        let modifiedIPS = fhirUtils.bundle.addResourcesBySection(documentIPS, immunizationSection, [ImmunizationCovid19]) as any
        //console.log("IPS Document with added immunization = ", JSON.stringify(modifiedIPS))
        // TODO: check if the composition contains the reference to the added resource

        // It adds a lab test to the section
        let diagnosticResultsSection = fhirUtils.sections.getSectionDiagnosticResultsLOINC()
        modifiedIPS = fhirUtils.bundle.addResourcesBySection(documentIPS, diagnosticResultsSection, [DiagnosticReportCovid19]) as any
        
        // console.log("IPS Document = ", JSON.stringify(modifiedIPS))
        // TODO: check if the composition contains the reference to the added resource

        // the tags are get by the frontend and shown to the practitioner
        let uhcCodeTags = fhirUtils.bundle.getTagsInBundle(documentIPS)
        console.log("uhcCodeTags = ", uhcCodeTags)
        expect(uhcCodeTags.length).toBeGreaterThan(0)
        expect(uhcCodeTags.includes("COVID-19")).toBeTruthy()
        expect(uhcCodeTags.includes("DiagnosticReport")).toBeTruthy()
        expect(uhcCodeTags.includes("Immunization")).toBeTruthy()
        
        // the practitioner selects COVID-19 tag and then DiagnosticReport tag
        let covid19DiagnosticReports = fhirUtils.covid19.getCovid19DiagnosticReportsInDocument(modifiedIPS) as any
        expect(covid19DiagnosticReports.length).toBeGreaterThan(0)
        expect(covid19DiagnosticReports[0]).toEqual(DiagnosticReportCovid19)

        // the practitioner selects COVID-19 tag and then Immunization tag
        let covid19Immunizations = fhirUtils.covid19.getCovid19ImmunizationsInDocument(modifiedIPS) as any
        expect(covid19Immunizations.length).toBeGreaterThan(0)
        expect(covid19Immunizations[0]).toEqual(ImmunizationCovid19)

        done()
    })

})

const ImmunizationCovid19:R4.IImmunization =  {
    "doseQuantity": {
      "code": "ml",
      "system": "http://unitsofmeasure.org",
      "value": 0.3
    },
    "id": "immunization-for-testing",
    "lotNumber": "lot-1234",
    "occurrenceDateTime": "2020-02-18",
    "patient": {
      "reference": "Patient/universal-health-id"
    },
    "protocolApplied": [
      {
        "doseNumberPositiveInt": 1,
        "seriesDosesPositiveInt": 2,
        "targetDisease": [
          {
            "coding": [
              {
                "code": "840539006",
                "system": "http://snomed.info/sct"
              }
            ]
          }
        ]
      }
    ],
    "resourceType": "Immunization",
    "status": "completed",
    "vaccineCode": {
      "coding": [
        {
          "code": "207",
          "system": "http://hl7.org/fhir/sid/cvx"
        }
      ]
    }
}