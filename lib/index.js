"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SNOMED_TO_ICD11 = exports.SNOMED_TO_ICD10 = exports.resultCovid19SerologyCodesSNOMED = exports.resultCovid19NaatCodesSNOMED = exports.GroupedSNOMED = exports.RegionalIndexSNOMED = exports.GlobalIndexSNOMED = exports.medicalHistoryClassification = exports.GroupedLOINC = exports.GlobalIndexLOINC = exports.GlobalIndexFHIR = exports.GlobalIndexATC = exports.MimeType = exports.CodingSystem = exports.ExtensionsFHIR = void 0;
// exports interfaces
__exportStar(require("./models"), exports);
// export * from "./models/DicomModels";
var FhirModels_1 = require("./models/FhirModels");
Object.defineProperty(exports, "ExtensionsFHIR", { enumerable: true, get: function () { return FhirModels_1.ExtensionsFHIR; } });
var UtilsModels_1 = require("./models/UtilsModels");
Object.defineProperty(exports, "CodingSystem", { enumerable: true, get: function () { return UtilsModels_1.CodingSystem; } });
// export classes
__exportStar(require("./FhirUtils"), exports); // global class
__exportStar(require("./fhirUtils/index"), exports); // independent classes
// export consts and enums (and functions outside classes)
var Attachment_1 = require("./fhirUtils/Attachment");
Object.defineProperty(exports, "MimeType", { enumerable: true, get: function () { return Attachment_1.MimeType; } });
var Atc_1 = require("./fhirUtils/Atc");
Object.defineProperty(exports, "GlobalIndexATC", { enumerable: true, get: function () { return Atc_1.GlobalIndexATC; } });
var Hl7_1 = require("./fhirUtils/Hl7");
Object.defineProperty(exports, "GlobalIndexFHIR", { enumerable: true, get: function () { return Hl7_1.GlobalIndexFHIR; } });
var Loinc_1 = require("./fhirUtils/Loinc");
Object.defineProperty(exports, "GlobalIndexLOINC", { enumerable: true, get: function () { return Loinc_1.GlobalIndexLOINC; } });
Object.defineProperty(exports, "GroupedLOINC", { enumerable: true, get: function () { return Loinc_1.GroupedLOINC; } });
Object.defineProperty(exports, "medicalHistoryClassification", { enumerable: true, get: function () { return Loinc_1.medicalHistoryClassification; } });
var Snomed_1 = require("./fhirUtils/Snomed");
Object.defineProperty(exports, "GlobalIndexSNOMED", { enumerable: true, get: function () { return Snomed_1.GlobalIndexSNOMED; } });
Object.defineProperty(exports, "RegionalIndexSNOMED", { enumerable: true, get: function () { return Snomed_1.RegionalIndexSNOMED; } });
Object.defineProperty(exports, "GroupedSNOMED", { enumerable: true, get: function () { return Snomed_1.GroupedSNOMED; } });
Object.defineProperty(exports, "resultCovid19NaatCodesSNOMED", { enumerable: true, get: function () { return Snomed_1.resultCovid19NaatCodesSNOMED; } });
Object.defineProperty(exports, "resultCovid19SerologyCodesSNOMED", { enumerable: true, get: function () { return Snomed_1.resultCovid19SerologyCodesSNOMED; } });
Object.defineProperty(exports, "SNOMED_TO_ICD10", { enumerable: true, get: function () { return Snomed_1.SNOMED_TO_ICD10; } });
Object.defineProperty(exports, "SNOMED_TO_ICD11", { enumerable: true, get: function () { return Snomed_1.SNOMED_TO_ICD11; } });
