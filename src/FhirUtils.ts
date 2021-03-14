/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { Attachment } from "./fhirUtils/Attachment";
import { Bundle } from "./fhirUtils/Bundle";
import { BundleMessage } from "./fhirUtils/BundleMessage";
import { CodeableConcept } from "./fhirUtils/CodeableConcept";
import { Composition } from "./fhirUtils/Composition";
import { CommonFHIR } from "./fhirUtils/CommonFHIR";
import { Covid19 } from "./fhirUtils/Covid19";
import { DiagnosticReport } from "./fhirUtils/DiagnosticReport";
// import { Dicom } from "./fhirUtils/Dicom";
import { DocumentReference } from "./fhirUtils/DocumentReference";
import { Identifier } from "./fhirUtils/Identifier";
import { ImagingStudy } from "./fhirUtils/ImagingStudy";
import { Immunization } from "./fhirUtils/Immunization";
import { Hl7 } from "./fhirUtils/Hl7";
import { Loinc } from "./fhirUtils/Loinc";
import { Snomed } from "./fhirUtils/Snomed";
import { Reference } from "./fhirUtils/Reference";
import { Quantity } from "./fhirUtils/Quantity";
import { Sections } from "./fhirUtils/Sections";


export class FhirUtils {
    public attachment: Attachment
    public bundle: Bundle
    public bundleMessage: BundleMessage
    public codeableConcept: CodeableConcept
    public commonFHIR: CommonFHIR
    public composition: Composition
    public covid19: Covid19
    public diagnosticReport: DiagnosticReport
    // public dicom: Dicom
    public documentReference: DocumentReference
    public identifier: Identifier
    public imagingStudy: ImagingStudy
    public immunization: Immunization
    public hl7: Hl7
    public loinc: Loinc
    public snomed: Snomed
    public references: Reference
    public quantity: Quantity
    public sections: Sections

    constructor() {
        this.attachment = new Attachment()
        this.bundle = new Bundle()
        this.bundleMessage = new BundleMessage()
        this.codeableConcept = new CodeableConcept()
        this.commonFHIR = new CommonFHIR()
        this.composition = new Composition()
        this.covid19 = new Covid19()       
        this.diagnosticReport = new DiagnosticReport()
        // this.dicom = new Dicom()
        this.documentReference = new DocumentReference()
        this.identifier = new Identifier()
        this.imagingStudy = new ImagingStudy()
        this.immunization = new Immunization()
        this.hl7 = new Hl7()
        this.loinc = new Loinc()
        this.snomed = new Snomed()
        this.references = new Reference()
        this.quantity = new Quantity() 
        this.sections = new Sections()
    }
}