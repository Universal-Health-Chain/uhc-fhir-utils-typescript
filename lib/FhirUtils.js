/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { Attachment } from "./fhirUtils/Attachment";
import { Bundle } from "./fhirUtils/Bundle";
import { BundleMessage } from "./fhirUtils/BundleMessage";
import { CodeableConcept } from "./fhirUtils/CodeableConcept";
import { Immunization } from "./fhirUtils/Immunization";
export class FhirUtils {
    constructor() {
        this.attachment = new Attachment();
        this.bundle = new Bundle();
        this.bundleMessage = new BundleMessage();
        this.codeableConcept = new CodeableConcept();
        this.immunization = new Immunization();
    }
}
