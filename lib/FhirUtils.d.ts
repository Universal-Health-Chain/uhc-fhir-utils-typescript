import { Attachment } from "./fhirUtils/Attachment";
import { Bundle } from "./fhirUtils/Bundle";
import { BundleMessage } from "./fhirUtils/BundleMessage";
import { CodeableConcept } from "./fhirUtils/CodeableConcept";
import { Immunization } from "./fhirUtils/Immunization";
import { Hl7 } from "./fhirUtils/Hl7";
import { Loinc } from "./fhirUtils/Loinc";
import { Snomed } from "./fhirUtils/Snomed";
export declare class FhirUtils {
    attachment: Attachment;
    bundle: Bundle;
    bundleMessage: BundleMessage;
    codeableConcept: CodeableConcept;
    immunization: Immunization;
    hl7: Hl7;
    loinc: Loinc;
    snomed: Snomed;
    constructor();
}
