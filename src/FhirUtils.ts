/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { TerminologyAdapterMem, TerminologyInterface } from '@universal-health-chain/uhc-common-utils-typescript'
import { Atc } from "./managers/Atc";
import { Attachment } from "./managers/Attachment";
import { AuditEvent } from "./managers/AuditEvent";
import { Bundle } from "./managers/Bundle";
import { BundleMessage } from "./managers/BundleMessage";
import { CodeableConcept } from "./managers/CodeableConcept";
import { CommonFHIR } from "./managers/CommonFHIR";
import { Communication } from "./managers/Communication";
import { Composition } from "./managers/Composition";
import { Covid19 } from "./managers/Covid19";
import { DiagnosticReport } from "./managers/DiagnosticReport";
// import { Dicom } from "./fhirUtils/Dicom";
import { DocumentReference } from "./managers/DocumentReference";
import { Hl7 } from "./managers/Hl7";
import { Identifier } from "./managers/Identifier";
import { ImagingStudy } from "./managers/ImagingStudy";
import { Immunization } from "./managers/Immunization";
import { Loinc } from "./managers/Loinc";
import { Personal } from "./managers/Personal";
import { Quantity } from "./managers/Quantity";
import { Reference } from "./managers/Reference";
import { Sections } from "./managers/Sections";
import { Snomed } from "./managers/Snomed";

export class FhirUtils {
    public atc: Atc
    public attachment: Attachment
    public auditEvent: AuditEvent
    public bundle: Bundle
    public bundleMessage: BundleMessage
    public codeableConcept: CodeableConcept
    public commonFHIR: CommonFHIR
    public communication: Communication
    public composition: Composition
    public covid19: Covid19
    public diagnosticReport: DiagnosticReport
    // public dicom: Dicom
    public documentReference: DocumentReference
    public hl7: Hl7
    public identifier: Identifier
    public imagingStudy: ImagingStudy
    public immunization: Immunization
    public loinc: Loinc
    public personal: Personal
    public quantity: Quantity
    public reference: Reference
    public sections: Sections
    public snomed: Snomed

    // public terminologyAdapter: TerminologyAdapterMem;
    
    constructor() {
        // initializing other managers
        this.atc = new Atc()
        this.attachment = new Attachment()
        this.auditEvent = new AuditEvent()
        this.bundle = new Bundle()
        this.bundleMessage = new BundleMessage()
        this.codeableConcept = new CodeableConcept()
        this.commonFHIR = new CommonFHIR()
        this.communication = new Communication()
        this.composition = new Composition()
        this.covid19 = new Covid19()       
        this.diagnosticReport = new DiagnosticReport()
        // this.dicom = new Dicom()
        this.documentReference = new DocumentReference()
        this.hl7 = new Hl7()
        this.identifier = new Identifier()
        this.imagingStudy = new ImagingStudy()
        this.immunization = new Immunization()
        this.loinc = new Loinc()
        this.personal = new Personal() 
        this.quantity = new Quantity() 
        this.reference = new Reference()
        this.sections = new Sections()
        this.snomed = new Snomed()
    }
}