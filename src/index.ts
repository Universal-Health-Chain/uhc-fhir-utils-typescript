/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { TerminologyAdapterMem, DomainTerminologyDoc } from '@universal-health-chain/uhc-common-utils-typescript'
export { TerminologyAdapterMem, DomainTerminologyDoc } from '@universal-health-chain/uhc-common-utils-typescript'

// exports interfaces
export * from "./models";

// export classes
export * from "./managers/index";   // independent classes

export * from "./FhirUtils";        // global class

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

