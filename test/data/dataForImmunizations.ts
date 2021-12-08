// IMMUNIZATION

import { R4 } from "@ahryman40k/ts-fhir-types"
import { medicalHistoryClassification } from "../../src"
import { testAuthorId, testDatetime1, testDatetime2, testDoseQuantityML, testEncounterReference, testLocation,
   testManufacturerReferenceByBlockchain, testPerformer
} from "./dataForCommonTests"

export const testImmunizationPerformerFunctionAdministeringProvider: R4.ICodeableConcept = {
   "coding":[{
      "code": 'AP', // Administering Provider
      "system": 'http://terminology.hl7.org/CodeSystem/v2-0443'
   }]
}
export const testPerformerImmunization: R4.IImmunization_Performer = { // actor is mandatory
   // id: testPerformer.id, // use actor.id instead because actor is mandatory
   actor: testPerformer,
   // function: testImmunizationPerformerFunctionAdministeringProvider
}

export const testFhirImmunization1stDoseForCovid19WithVaccineCodeATC:R4.IImmunization = {
   "doseQuantity": testDoseQuantityML,
   "encounter": testEncounterReference,
   "expirationDate": "2022-06-30", // some vaccine product expiration date
   "id": "universal-immunization-id1",
   "language": "es", // for testing if translation works
   "location": testLocation,
   "lotNumber":"lot-1234", // verifiable on blockchain
   "manufacturer": testManufacturerReferenceByBlockchain,
   "occurrenceDateTime": testDatetime1,
   "performer":[
      {actor: testPerformer}
   ],
   "protocolApplied":[
      {
         "doseNumberPositiveInt":1,
         "seriesDosesPositiveInt":2,
         "targetDisease":[
            {
               "coding":[
                  {
                     "code":"840539006",
                     "display":"COVID-19",
                     "system":"http://snomed.info/sct"
                  }
               ],
               "text":"COVID-19"
            }
         ]
      }
   ],
   "status":"completed", // CAUTION: it means this dose administration has finished, but not all the doses completed
   "patient":{ // FHIR resources sometimes have the 'subject' property and sometimes the 'patient' one
      id: "URN:UNID:PERSON:UUID:universal-health-uuid",
      reference: "Person/universal-health-uuid" // the Patient identifier will be the SOS identifier to be printed, not the personal universal health identifier to be shown in the app
   },
   "resourceType":"Immunization",
   "vaccineCode":{
       "coding":[
           {
              "code":"J07BX03",
              "display":"COVID-19",
              "system":"http://www.whocc.no/atc"
           }
        ],
        "text":"COVID-19"        
   }
}

export const testFhirImmunization2ndDoseForCovid19WithVaccineCodeATC:R4.IImmunization = {
   "doseQuantity": testDoseQuantityML,
   "encounter": testEncounterReference,
   "expirationDate": "2022-06-30", // some vaccine product expiration date
   "id": "universal-immunization-id2",
   "language": "es", // for testing if translation works
   "location": testLocation,
   "lotNumber":"lot-1234", // verifiable on blockchain
   "manufacturer": testManufacturerReferenceByBlockchain,
   "occurrenceDateTime": testDatetime2,
   "performer":[
      {actor: testPerformer}
   ],
   "protocolApplied":[
      {
         "doseNumberPositiveInt":2,
         "seriesDosesPositiveInt":2,
         "targetDisease":[
            {
               "coding":[
                  {
                     "code":"840539006",
                     "display":"COVID-19",
                     "system":"http://snomed.info/sct"
                  }
               ],
               "text":"COVID-19"
            }
         ]
      }
   ],
   "status":"completed", // CAUTION: it means this dose administration has finished, but not all the doses completed
   "patient":{ // FHIR resources sometimes have the 'subject' property and sometimes the 'patient' one
      id: "URN:UNID:PERSON:UUID:universal-health-uuid",
      reference: "Person/universal-health-uuid" // the Patient identifier will be the SOS identifier to be printed, not the personal universal health identifier to be shown in the app
   },
   "resourceType":"Immunization",
   "vaccineCode":{
       "coding":[
           {
              "code":"J07BX03",
              "display":"COVID-19",
              "system":"http://www.whocc.no/atc"
           }
        ],
        "text":"COVID-19"        
   }
}

// INDEX COMPOSITION FOR BUNDLE DOCUMENTS

// IPS document type code ('60591-5') or others can be used, e.g.: '11503-0' for generic 'Medical records'
export const testCompositionIndexForImmunizationDocument: R4.IComposition = {
   resourceType: "Composition",
   id: "test-composition-for-immunization-document-uuid",
   type:{ // LOINC code for IPS Document type or others, e.g.: '11503-0' for generic 'Medical records' can be used
      "coding":[{
         "code": '11503-0',
         "system": 'http://loinc.org'
      }]
   },
   author:[{"reference": testAuthorId}],
   section: [
      {
         code: {
               "coding": [{
                  "code": medicalHistoryClassification.immunization
               }]
         },
         entry: [ // index of resources in the current health section 
               {"reference": "Immunization/" + testFhirImmunization1stDoseForCovid19WithVaccineCodeATC.id}
         ]
      }
   ]
}
 
// BUNDLE DOCUMENTS
export const testBundleDocumentWithCovid19ImmunizationsWithoutComposition: R4.IBundle = {
   resourceType: "Bundle",
   type: R4.BundleTypeKind._document, // "document"
   id: "test-bundle-document-with-covid19-immunization-uuid",
   entry:[
     { // missing composiiton in the first resource
       "resource": testFhirImmunization1stDoseForCovid19WithVaccineCodeATC
     },
     {
      "resource": testFhirImmunization2ndDoseForCovid19WithVaccineCodeATC
    }
  ]
}

export const testBundleDocumentWithCompositionAndCovid19Immunization: R4.IBundle = {
    resourceType: "Bundle",
    type: R4.BundleTypeKind._document, // "document"
    id: "test-bundle-document-with-covid19-immunization-uuid",
    entry:[
      { // composiiton if the first resource: index of the document
        "resource": testCompositionIndexForImmunizationDocument
      },
      {
        "resource": testFhirImmunization1stDoseForCovid19WithVaccineCodeATC
      }
   ]
}