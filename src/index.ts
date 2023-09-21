/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

// exports interfaces
export * from "./models";
// export * from "./models/DicomModels";
export { ExtensionsFHIR } from "./models/FhirModels"
export { CodingSystem } from "./models/CommonModels"

// export classes
export * from "./FhirUtils";            // global class
export * from "./managers/index";   // independent classes

// export consts and enums (and functions outside classes)
export { MimeType } from "./managers/Attachment"
export { getCleanIdByFhirResource as getCleanId, getBundleEntriesMap, normalizedAndCanonicalizedFHIR, anonymizeResource} from "./managers/CommonFHIR"
export { GlobalIndexATC } from "./managers/Atc"
export { GlobalIndexEMA } from "./managers/Ema"
export { GlobalIndexFHIR } from "./managers/Hl7"
export { GlobalIndexLOINC, GroupedLOINC, medicalHistoryClassification } from "./managers/Loinc";
export { GlobalIndexSNOMED, RegionalIndexSNOMED, GroupedSNOMED,
    resultCovid19NaatCodesSNOMED, resultCovid19SerologyCodesSNOMED,
    SNOMED_TO_ICD10, SNOMED_TO_ICD11
} from "./managers/Snomed";

