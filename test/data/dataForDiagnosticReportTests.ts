import { R4 } from "@ahryman40k/ts-fhir-types"
import { medicalHistoryClassification } from "../../src/managers/Loinc"
import { testAuthorReferenceId, testDatetime1 } from "./dataForCommonTests"

/**
 * The `$meta` operation can be used to access metadata and
 * to get a summary of all the labels that are in use across the system.
 * The principle use for this operation is to support search e.g. what tags can be searched for.
 * At these levels, the returned `meta` will not contain `versionId`, `lastUpdated`, `deleted`, etc.
 * For example, the following operations will return the same metadata:
 * GET http://<tenant-web-path>/cds-<territory>/v1/health/fhir/Observation/<uuid-v4>/$meta
 * GET http://<tenant-web-path>/cds-<territory>/v1/health/fhir/Observation/<uuid-v4>/_history/<versionId>/$meta
 * Both $meta-add and $meta-delete operations can easily change the metadata on the resources.
 * These operations can be performed on the instance and history level.
 * For example, when a lab test is to diagnose a concrete condition (e.g.: COVID-19 or others)
 * the tag for the condition can be set in the metadata to be used as a search filter, e.g.:
 * POST http://<tenant-web-path>/cds-<territory>/v1/health/fhir/Observation/<uuid-v4>/$meta-add
 * Then a search for resources containing a condition in the metadata `tag` can be done:
 * POST http://<tenant-web-path>/cds-<territory>/v1/health/fhir/Observation/_tag?code:in=codingSystem|codeValue
 */

export const testDiagnosticReportNotDetectedCovid19FHIR:R4.IDiagnosticReport = {
	"category": [
		{
			"coding": [
				{ 
					"code": "LAB",
					"display": "Laboratory",
					"system": "http://terminology.hl7.org/CodeSystem/v2-0074"
				}
			],
			"text": "Laboratorio"
		}
	],
	"code": {
		"coding": [
			{
				"code": "94762-2",
				"display": "SARS-CoV-2 (COVID-19) Ab [Presence] in Serum or Plasma by Immunoassay",
				"system": "http://loinc.org"
			}
		],
		"text": "SARS-CoV-2 (COVID-19) Ab [Presencia] en suero o plasma por inmunoensayo"
	},
   "conclusion": "Negativo",
	"conclusionCode": [
		{
			"coding": [
				{
					"code": "260385009",
                    "display": "Negative",
					"system": "http://snomed.info/sct"
				}
			],
			"text": "Negativo"
		}
	],
	"effectiveDateTime": "2021-02-18",
	"identifier": [
		{
			"system": "urn:ietf:rfc:3986",
			"value": "urn:uuid:<universal-health-identifier-diagnosticreport-uuid>"
		}
	],
   "meta": {
     /* "tag": {

      }*/
   },
	"language": "es",
	"performer": [
		{
			"reference": "Organization/<universal-health-identifier-organization-uuid>"
		}
	],
	"resourceType": "DiagnosticReport",
	"subject": {
		"reference": "Patient/<universal-health-identifier-patient-uuid>"
	}
}

export const testDiagnosticReportAllPropertiesFHIR:R4.IDiagnosticReport = {
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

export const testCompositionIndexForDiagnosticReportDocument: R4.IComposition = {
    resourceType: "Composition",
    id: "test-composition-for-immunization-document-uuid",
    type:{ // LOINC code for IPS Document type or others, e.g.: '11503-0' for generic 'Medical records' can be used
       "coding":[{
          "code": medicalHistoryClassification.diagnosticResults, // '11503-0',
          "system": 'http://loinc.org'
       }]
    },
    author:[{"reference": testAuthorReferenceId}],
    section: [
       {
          code: {
                "coding": [{
                   "code": medicalHistoryClassification.diagnosticResults
                }]
          },
          entry: [ // index of resources in the current health section 
                {"reference": "DiagnosticReport/" + testDiagnosticReportNotDetectedCovid19FHIR.id}
          ]
       }
    ]
}
  
 // BUNDLE DOCUMENTS
 // A bundle for Diagnostic Results or Laboratory Tests can contain both DiagnosticReport, Observation(s) and Specimen(s) resources
 export const testBundleDocumentWithCompositionAndCovid19DiagnosticReport: R4.IBundle = {
     resourceType: "Bundle",
     type: R4.BundleTypeKind._document, // "document"
     id: "test-bundle-document-with-notDetectedCovid19-diagnosticReport-uuid",
     entry:[
       { // composiiton if the first resource: index of the document
         "resource": testCompositionIndexForDiagnosticReportDocument
       },
       {
         "resource": testDiagnosticReportNotDetectedCovid19FHIR
       }
    ]
 }