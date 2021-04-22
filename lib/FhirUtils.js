/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { Atc } from "./fhirUtils/Atc";
import { Attachment } from "./fhirUtils/Attachment";
import { AuditEvent } from "./fhirUtils/AuditEvent";
import { Bundle } from "./fhirUtils/Bundle";
import { BundleMessage } from "./fhirUtils/BundleMessage";
import { CodeableConcept } from "./fhirUtils/CodeableConcept";
import { CommonFHIR } from "./fhirUtils/CommonFHIR";
import { Communication } from "./fhirUtils/Communication";
import { Composition } from "./fhirUtils/Composition";
import { Covid19 } from "./fhirUtils/Covid19";
import { DiagnosticReport } from "./fhirUtils/DiagnosticReport";
// import { Dicom } from "./fhirUtils/Dicom";
import { DocumentReference } from "./fhirUtils/DocumentReference";
import { Hl7 } from "./fhirUtils/Hl7";
import { Identifier } from "./fhirUtils/Identifier";
import { ImagingStudy } from "./fhirUtils/ImagingStudy";
import { Immunization } from "./fhirUtils/Immunization";
import { Loinc } from "./fhirUtils/Loinc";
import { Personal } from "./fhirUtils/Personal";
import { Quantity } from "./fhirUtils/Quantity";
import { Reference } from "./fhirUtils/Reference";
import { Sections } from "./fhirUtils/Sections";
import { Snomed } from "./fhirUtils/Snomed";
export class FhirUtils {
    constructor() {
        this.atc = new Atc();
        this.attachment = new Attachment();
        this.auditEvent = new AuditEvent();
        this.bundle = new Bundle();
        this.bundleMessage = new BundleMessage();
        this.codeableConcept = new CodeableConcept();
        this.commonFHIR = new CommonFHIR();
        this.communication = new Communication();
        this.composition = new Composition();
        this.covid19 = new Covid19();
        this.diagnosticReport = new DiagnosticReport();
        // this.dicom = new Dicom()
        this.documentReference = new DocumentReference();
        this.hl7 = new Hl7();
        this.identifier = new Identifier();
        this.imagingStudy = new ImagingStudy();
        this.immunization = new Immunization();
        this.loinc = new Loinc();
        this.personal = new Personal();
        this.quantity = new Quantity();
        this.reference = new Reference();
        this.sections = new Sections();
        this.snomed = new Snomed();
    }
}
