/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types";
import { FhirUtils } from '../../src/FhirUtils';
import { CodingSystem, medicalHistoryClassification } from "../../src";
import { testBundleDocumentWithCovid19ImmunizationsWithoutComposition, testFhirImmunization1stDoseForCovid19WithVaccineCodeATC, testFhirImmunization2ndDoseForCovid19WithVaccineCodeATC} from "../../test/data/dataForImmunizations"
import { testAuthorReferenceId, testBundleDocumentId, testDatetime1, testDiagnosticReportFHIR, testDocumentCompositionId, testDocumentCompositionStatus, testLanguageEN, testTitleDocumentComposition, testTypeDocumentCodeLOINC, testTypeDocumentDisplay } from "../data/dataForCommonTests";
import { testBundleDocumentWithCompositionForGenericMedicalRecordsButWithoutMedicalRecords } from "../data/dataForBundleTests";
import { exit } from "process";

const fhirUtils = new FhirUtils()

// -- Immunization --
const targetDisease:string = "840539006"

const bundleIPS:R4.IBundle = require("../examples/fhirR4/Bundle-IPS-examples-Bundle-01.json")

describe("test create bundle with composition", () => {

  // initialBundle is the "test" object
  let initialBundle;

  beforeEach(() => {
      initialBundle = {... testBundleDocumentWithCompositionForGenericMedicalRecordsButWithoutMedicalRecords}
  })

  // TODO: test all mandatory properties
  it("should create bundle with options", () => {

    const bundle = fhirUtils.bundle.createBundleDocumentAndCompositionWithIds(
      testBundleDocumentId, testDocumentCompositionId, testAuthorReferenceId, testDatetime1,
      testTitleDocumentComposition, testDocumentCompositionStatus, testTypeDocumentCodeLOINC, CodingSystem.loinc,
      testTypeDocumentDisplay, testLanguageEN, [testFhirImmunization1stDoseForCovid19WithVaccineCodeATC, testFhirImmunization2ndDoseForCovid19WithVaccineCodeATC]
    )

    // console.log("createBundleDocumentAndCompositionWithIds = ", bundle)
    
    expect(bundle).toBeDefined()
    expect(bundle.entry).toBeDefined()
    expect(bundle.entry.length).toBe(3)

    let composition = fhirUtils.bundle.getBundleDocumentComposition(bundle)
    expect(composition).toBeDefined()

    composition = fhirUtils.bundle.getBundleDocumentCompositionWithValidation(bundle)
    expect(composition).toBeDefined()
    
    const resourceEntry = bundle.entry[1]
    expect(resourceEntry).toHaveProperty("resource")      
    expect(resourceEntry.resource).toEqual(testFhirImmunization1stDoseForCovid19WithVaccineCodeATC)

    const documentCompositionTypeLOINC = fhirUtils.bundle.getTypeOfBundleDocumentComposition(bundle)
    expect(documentCompositionTypeLOINC).toBe(testTypeDocumentCodeLOINC)
  })

  it("should add bundle entries", (done) => {
    const bundleEntry: R4.IBundle_Entry = {
      resource: testFhirImmunization1stDoseForCovid19WithVaccineCodeATC
    }
    const bundle = fhirUtils.bundle.addEntriesToBundle(initialBundle, [bundleEntry])
    expect(bundle.resourceType).toBe("Bundle")
    expect(bundle.id).toBeDefined()
    // expect(bundle.entry).toBeDefined()
    expect(bundle.entry).toBeDefined()
    expect(bundle.entry).toHaveLength(2)    // updated with the composition resource included
    const resourceEntry = bundle.entry[1]
    expect(resourceEntry).toHaveProperty("resource")      
    expect(resourceEntry.resource).toEqual(testFhirImmunization1stDoseForCovid19WithVaccineCodeATC)
    done()
  });
  
  it("should add a resource as entry in the Bundle", (done) => {
    const bundle = fhirUtils.bundle.addResourceAsBundleEntry(initialBundle, testFhirImmunization1stDoseForCovid19WithVaccineCodeATC)
    expect(bundle.resourceType).toBe("Bundle")
    expect(bundle.id).toBeDefined()
    // expect(bundle.entry).toBeDefined()
    expect(bundle.entry).toBeDefined()
    expect(bundle.entry).toHaveLength(2)    // updated with the composition resource included
    const resourceEntry = bundle.entry[1]
    expect(resourceEntry).toHaveProperty("resource")      
    expect(resourceEntry.resource).toEqual(testFhirImmunization1stDoseForCovid19WithVaccineCodeATC)
    done()
  });

  // TODO: the problem is the addResourcesWithOptions the original resource but it does not return a new updated one 
  it("should add a resources with options to exclude resources", (done) => {
    if(initialBundle.entry.length>1) {
      console.warn(`initial bundle has incorrect size, run the test manually`)
      expect(initialBundle.entry.length).toBe(1)
    }
    const bundle = fhirUtils.bundle.addResourcesWithOptions(
      initialBundle,
      [testFhirImmunization1stDoseForCovid19WithVaccineCodeATC, testDiagnosticReportFHIR],
      undefined,        // add to section
      ['Immunization']  // exlude resources
    )
    expect(bundle.resourceType).toBe("Bundle")
    expect(bundle.id).toBeDefined()
    // expect(bundle.entry).toBeDefined()
    expect(bundle.entry).toBeDefined()
    expect(bundle.entry).toHaveLength(2)    // updated with the composition resource included
    const resourceEntry = bundle.entry[1]
    expect(resourceEntry).toHaveProperty("resource")      
    expect(resourceEntry.resource).toEqual(testDiagnosticReportFHIR)
    done()
  });

  // TODO: the problem is addResourcesWithOptions modifies the original resource but it does not return a new updated one 
  it("should add resource without options for excluding resources", (done) => {
    if(initialBundle.entry.length>1) {
      console.warn(`initial bundle has incorrect size, run the test manually`)
      expect(initialBundle.entry.length).toBe(1)
    }
    const bundle = fhirUtils.bundle.addResourcesWithOptions(initialBundle, [testFhirImmunization1stDoseForCovid19WithVaccineCodeATC])
    expect(bundle.resourceType).toBe("Bundle")
    expect(bundle.id).toBeDefined()
    // expect(bundle.entry).toBeDefined()
    expect(bundle.entry).toBeDefined()
    expect(bundle.entry).toHaveLength(2)    // updated with the composition resource included
    const resourceEntry = bundle.entry[1]
    expect(resourceEntry).toHaveProperty("resource")      
    expect(resourceEntry.resource).toEqual(testFhirImmunization1stDoseForCovid19WithVaccineCodeATC)
    done()
  });
  
})

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
    // console.log("references = ", references)
    expect(references).toBeDefined()
    expect(references.length).toBeGreaterThan(0)
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

  // If no composition the default 'Medical records' code will be set as meta.section
  it("should getResourcesWithFilters by document without setting section", () => {
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

    expect(resources[0].meta).toBeDefined()
    expect(resources[0].meta.section).toBe(medicalHistoryClassification.defaultMedicalRecords)
  })

})