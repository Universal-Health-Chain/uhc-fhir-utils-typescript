/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

// exports interfaces
export * from "./models";
// export * from "./models/DicomModels";
export { ExtensionsFHIR } from "./models/FhirModels"
export { CodingSystem } from "./models/CommonModels"

// export classes
export * from "./FhirUtils";            // global class
export * from "./fhirUtils/index";   // independent classes

// export consts and enums (and functions outside classes)
export { MimeType } from "./fhirUtils/Attachment"
export { getCleanIdByFhirResource as getCleanId, getBundleEntriesMap, normalizedAndCanonicalizedFHIR, anonymizeResource} from "./fhirUtils/CommonFHIR"
export { GlobalIndexATC } from "./fhirUtils/Atc"
export { GlobalIndexEMA } from "./fhirUtils/Ema"
export { GlobalIndexFHIR } from "./fhirUtils/Hl7"
export { GlobalIndexLOINC, GroupedLOINC, medicalHistoryClassification } from "./fhirUtils/Loinc";
export { GlobalIndexSNOMED, RegionalIndexSNOMED, GroupedSNOMED,
    resultCovid19NaatCodesSNOMED, resultCovid19SerologyCodesSNOMED,
    SNOMED_TO_ICD10, SNOMED_TO_ICD11
} from "./fhirUtils/Snomed";

export * from './models/fhirResourceModels/AdverseEventModel'
export * from './models/fhirResourceModels/AllergyIntoleranceModel'
export * from './models/fhirResourceModels/AppointmentModel'
export * from './models/fhirResourceModels/ClinicalImpressionModel'
export * from './models/fhirResourceModels/ConditionModel'
export * from './models/fhirResourceModels/DetectedIssueModel'
// export * from './models/fhirResourceModels/DiagnosticReportModel'
export * from './models/fhirResourceModels/EncounterModel'
// export * from './models/fhirResourceModels/ImmunizationModel'
export * from './models/fhirResourceModels/ObservationModel'
export * from './models/fhirResourceModels/ProcedureModel'
export * from './models/fhirResourceModels/ServiceRequestModel'
export * from './models/fhirResourceModels/SpecimenModel'
