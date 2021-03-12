/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { Attachment } from "./fhirUtils/Attachment";
import { Bundle } from "./fhirUtils/Bundle";
import { BundleMessage } from "./fhirUtils/BundleMessage";
import { CodeableConcept } from "./fhirUtils/CodeableConcept";
import { Immunization } from "./fhirUtils/Immunization";
import { Hl7 } from "./fhirUtils/Hl7";
import { Loinc } from "./fhirUtils/Loinc";
import { Snomed } from "./fhirUtils/Snomed";

export class FhirUtils {
    public attachment: Attachment
    public bundle: Bundle
    public bundleMessage: BundleMessage
    public codeableConcept: CodeableConcept
    public immunization: Immunization
    public hl7: Hl7
    public loinc: Loinc
    public snomed: Snomed

    constructor() {
        this.attachment = new Attachment()
        this.bundle = new Bundle()
        this.bundleMessage = new BundleMessage()
        this.codeableConcept = new CodeableConcept()
        this.immunization = new Immunization()
        this.hl7 = new Hl7()
        this.loinc = new Loinc()
        this.snomed = new Snomed()
    }
}