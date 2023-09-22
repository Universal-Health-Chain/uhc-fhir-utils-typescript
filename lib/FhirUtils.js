"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FhirUtils = void 0;
const Atc_1 = require("./managers/Atc");
const Attachment_1 = require("./managers/Attachment");
const AuditEvent_1 = require("./managers/AuditEvent");
const Bundle_1 = require("./managers/Bundle");
const BundleMessage_1 = require("./managers/BundleMessage");
const CodeableConcept_1 = require("./managers/CodeableConcept");
const CommonFHIR_1 = require("./managers/CommonFHIR");
const Communication_1 = require("./managers/Communication");
const Composition_1 = require("./managers/Composition");
const Covid19_1 = require("./managers/Covid19");
const DiagnosticReport_1 = require("./managers/DiagnosticReport");
// import { Dicom } from "./fhirUtils/Dicom";
const DocumentReference_1 = require("./managers/DocumentReference");
const Hl7_1 = require("./managers/Hl7");
const Identifier_1 = require("./managers/Identifier");
const ImagingStudy_1 = require("./managers/ImagingStudy");
const Immunization_1 = require("./managers/Immunization");
const Loinc_1 = require("./managers/Loinc");
const Personal_1 = require("./managers/Personal");
const Quantity_1 = require("./managers/Quantity");
const Reference_1 = require("./managers/Reference");
const Sections_1 = require("./managers/Sections");
const Snomed_1 = require("./managers/Snomed");
class FhirUtils {
    constructor() {
        this.atc = new Atc_1.Atc();
        this.attachment = new Attachment_1.Attachment();
        this.auditEvent = new AuditEvent_1.AuditEvent();
        this.bundle = new Bundle_1.Bundle();
        this.bundleMessage = new BundleMessage_1.BundleMessage();
        this.codeableConcept = new CodeableConcept_1.CodeableConcept();
        this.commonFHIR = new CommonFHIR_1.CommonFHIR();
        this.communication = new Communication_1.Communication();
        this.composition = new Composition_1.Composition();
        this.covid19 = new Covid19_1.Covid19();
        this.diagnosticReport = new DiagnosticReport_1.DiagnosticReport();
        // this.dicom = new Dicom()
        this.documentReference = new DocumentReference_1.DocumentReference();
        this.hl7 = new Hl7_1.Hl7();
        this.identifier = new Identifier_1.Identifier();
        this.imagingStudy = new ImagingStudy_1.ImagingStudy();
        this.immunization = new Immunization_1.Immunization();
        this.loinc = new Loinc_1.Loinc();
        this.personal = new Personal_1.Personal();
        this.quantity = new Quantity_1.Quantity();
        this.reference = new Reference_1.Reference();
        this.sections = new Sections_1.Sections();
        this.snomed = new Snomed_1.Snomed();
    }
}
exports.FhirUtils = FhirUtils;
