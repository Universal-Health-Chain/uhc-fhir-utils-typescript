import { R4 } from "@ahryman40k/ts-fhir-types"
import { CodingSystem } from "../../src/models/CommonModels"

// GENERAL
export const testDatetime1 = "2021-02-18";
export const testDatetime2 = "2021-11-29";
export const testLanguageEN = "en";
export const testLanguageES = "es";

// IDENTITY
export const testAuthorId = "author-uuid";
export const testAuthorReferenceId = "";
export const testAuthorType = "PractitionerRole";
export const testAuthorURI = testAuthorType + "/" + testAuthorId;
export const testAuthorDisplay = 'Author Display Name';
export const testSubjectId = "uhc-subject-uuid";
export const testSubjectReference = "Patient/" + testSubjectId;
export const testIssuerOrgHexUUID = '18492e52-1c64-4f4e-ac20-38900d315fc6' // https://www.uuidgenerator.net/version4
export const testIssuerOrgBase58UUID = '3zwNekKsPK7H2JjMoxMnEq' // https://learnmeabitcoin.com/technical/base58
export const testAuthorPractRoleHexUUID = '21d08eb6-37a5-41c2-9e39-6e16c239a2c8'
export const testAuthorPractRoleBase58UUID= '5BBesbtwFxGv9NziHkT5D1'
export const testChannelIdentityEU = 'hcare-eu'

export const testTypeDocumentCodeLOINC = '11503-0';
export const testTypeDocumentDisplay = 'Medica records';
export const testBundleDocumentId = 'test-bundle-document-id';
export const testDocumentCompositionId = 'test-document-composition-id';
export const testDocumentCompositionStatus = R4.CompositionStatusKind._preliminary;
export const testTitleDocumentComposition = 'Document title';

// MEDICAL DATA
export const testDoseQuantityML: R4.IQuantity = {
   "code":"ml",
   "system":"http://unitsofmeasure.org",
   "unit":"http://unitsofmeasure.org", // not neccessary
   "value":0.3
}
export const testDoseQuantityMG: R4.IQuantity = {
   "code":"mg",
   "system":"http://unitsofmeasure.org",
   "unit":"http://unitsofmeasure.org", // not neccessary
   "value":500
}

// PROCEDURE REFERENCES. TODO: can be simplified and compatible with IPS if the reference.reference (mandatory) is the URN format for blockchain
export const testEncounterReference: R4.IReference = {
   id: "URN:UHC:HCARE-EU:ENCOUNTER:UUID:some-encounter-uuid", // URN format for blockchain
   reference: "Encounter/verifiable-encounter-uuid" // FHIR reference format
}

// ACTORS
export const testOrganizationReferenceByBlockchain: R4.IReference = {
   id: "URN:UNID:ORGANIZATION:UUID:some-organization-uuid", // URN format for blockchain
   reference: "Organization/verifiable-organization-uuid", // FHIR reference format
   display: "Organization Name from blockchain",
   identifier:{
      value: "blockchain-organization-VAT-id",
      type: {
         coding: [{
            code: "TAX",
            system: CodingSystem.identifierBusiness
         }]
      }
   }
}

export const testPerformer: R4.IReference = { ... testOrganizationReferenceByBlockchain }

export const testLocation: R4.IReference = {
   id: "URN:UHC:HCARE-EU:LOCATION:UUID:some-location-uuid", // URN format for UHC
   reference: "Location/healthcare-location-uuid", // FHIR reference format
   display: "some-location-description"
}

export const testManufacturerReferenceByBlockchain = {
   id: "URN:UNID:ORGANIZATION:UUID:some-manufacturer-uuid", // URN format for blockchain
   reference: "Organization/verifiable-manufacturer-uuid", // FHIR reference format
   display: "Manufacturer Organization Name from blockchain",
   identifier:{
      value: "blockchain-manufacturer-VAT-id",
      type: {
         coding: [{
            code: "TAX",
            system: CodingSystem.identifierBusiness
         }]
      }
   }
}

// MESSAGES
export const testMessageText = "This is my COVID-19 data"
export const testMessageId = "53dba18f-d169-42e2-87c0-eade2977c796"
export const testConnectionId = "connection-uuid-1"
export const testSenderId = "56d4d889-bf7c-4475-b7b7-bb88ba2b55d4"
export const testRecipientId = "0f34d1d8-2672-4395-b8ed-9edb78b06a9e" 

export const testMySecretKey = "lFO8hOSodEKssy6fezSpH6IPBtRoPVFPizoDkOvZcnw="
export const testTheirPublicKey = "17Ibb48t+Qs2e+S1s6o5YIdE6xY/sF5BefXxzut5Wn0="
export const testConnectionSharedKey =  "okH9Y2fFD0I6pfZliinOpZ+rEV7/bWW92wdUMuV8iC4=" // "dyn2O2sdUqnMvpxTySya2JHww+48keyQD9RoGrXEtY0="

// HEALTH DATA
export const testTargetDiseaseCOVID19:string = "840539006" // COVID-19
   
export const testDiagnosticReportFHIR:R4.IDiagnosticReport = {
    "basedOn":[
    ],
    "category":[
       {
          "coding":[
             {
                "code":"LAB",
                "system":"http://terminology.hl7.org/CodeSystem/v2-0074"
             }
          ]
       }
    ],
    "code":{
       "coding":[
          {
             "code":"94762-2",
             "display":"SARS-CoV-2  (COVID-19)  Ab  [Presence]  in  Serum  or  Plasma  by  Immunoassay ",
             "system":"http://loinc.org"
          }
       ],
       "text":"SARS-CoV-2 (COVID-19) Ab [Presencia] en suero o plasma por inmunoensayo"
    },
    "conclusion": "SARS-CoV-2 no detectado",
    "conclusionCode":[
       {
          "coding":[
             {
                "code":"260385009",
                "display":"Negative",
                "system":"http://snomed.info/sct"
             }
          ],
          "text":"Negativo"
       }
    ],
    "contained":[ 
    ],
    "encounter":{ 
    },
    "effectiveDateTime": testDatetime1,
    /* choice: effectiveDateTime or effectivePeriod
    "effectivePeriod": {
       "end": testDiagnosticReportSheet.validUntil,
       "start": testDiagnosticReportSheet.validFrom
    },*/
    "extension":[ 
    ],
    "id":"0a2c3ead-8191-4b1c-87b5-78b9f8f92ad5",
    "identifier":[
    ],
    "imagingStudy":[
    ],
    "implicitRules":"",
    "language":"es",
    "media":[
    ],
    "meta":{
    },
    "modifierExtension":[ 
    ],
    "performer":[
       {
          "identifier":{
             "type": {
                 "text":"Laboratory"
             }
         },
       }
    ],
    "presentedForm":[
    ],
    "resourceType":"DiagnosticReport",
    "result":[  
    ],
    "resultsInterpreter":[
    ],
    "specimen":[  
    ],
    "status": R4.DiagnosticReportStatusKind._final, // "final",
    "subject":{
       "identifier":{
          "type":{
             "coding":[
                {
                   "code":"NNESP",
                   "system":"http://hl7.org/fhir/v2/0203/"
                }
             ],
             "text":"Documento Nacional de Identidad"
          },
          "use": R4.IdentifierUseKind._official, // "official",
          "value":"12345678D"
       },
       "reference":"urn:uuid:patient-universal-id",
       "type":"Patient"
    }
}

