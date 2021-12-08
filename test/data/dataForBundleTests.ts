import { R4 } from "@ahryman40k/ts-fhir-types";
import { medicalHistoryClassification } from "../../src/fhirUtils/Loinc";
import { testAuthorReferenceId } from "./dataForCommonTests";

export const testCompositionIndexForGenericMedicalRecordsSoWithoutSections: R4.IComposition = {
    resourceType: "Composition",
    id: "test-composition-for-generic-medical-records-uuid",
    type:{ // LOINC code for IPS Document type or others, e.g.: '11503-0' for generic 'Medical records' can be used
       "coding":[{
          "code": medicalHistoryClassification.defaultMedicalRecords, // '11503-0',
          "system": 'http://loinc.org'
       }]
    },
    author:[{"reference": testAuthorReferenceId}]
}

// A bundle for Diagnostic Results or Laboratory Tests can contain both DiagnosticReport, Observation(s) and Specimen(s) resources
export const testBundleDocumentWithCompositionForGenericMedicalRecordsButWithoutMedicalRecords: R4.IBundle = {
    resourceType: "Bundle",
    type: R4.BundleTypeKind._document, // "document"
    id: "test-bundle-document-uuid",
    entry:[
      { // composition if the first resource: index of the document
        "resource": testCompositionIndexForGenericMedicalRecordsSoWithoutSections
      }
   ]
}