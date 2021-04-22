/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { vaccineCodeATC } from "./Covid19";
export class Immunization {
    constructor() {
        this.systemVaccineATC = () => "http://www.whocc.no/atc";
        this.systemVaccineCPT = () => "http://www.ama-assn.org/go/cpt";
        this.systemVaccineCVX = () => "http://hl7.org/fhir/sid/cvx";
        this.systemVaccineSNOMED = () => "http://snomed.info/sct"; // http://hl7.org/fhir/uv/ips/ValueSet-vaccines-gps-uv-ips.html
        this.systemImmunizationFunding = () => "http://terminology.hl7.org/CodeSystem/immunization-funding-source";
        this.systemImmunizationEligibilty = () => "http://terminology.hl7.org/CodeSystem/immunization-program-eligibility";
        this.systemImmunizationOrigin = () => "http://terminology.hl7.org/CodeSystem/immunization-origin";
        this.systemNotAdministeredReason = () => "http://terminology.hl7.org/CodeSystem/v3-ActReason";
        this.systemAdministrationSite = () => "http://terminology.hl7.org/CodeSystem/v3-ActSite";
        this.systemRouteOfAdministration = () => "http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration";
        this.systemImmunizationSubpotent = () => "http://terminology.hl7.org/CodeSystem/immunization-subpotent-reason";
    }
}
export function createCovid19BundleDocumentWithImmunizationAndAttachmentsByGroupATC(attachments) {
    return createBundleDocumentWithImmunizationAndAttachmentsByGroupATC(vaccineCodeATC, attachments);
}
export function createBundleDocumentWithImmunizationAndAttachmentsByGroupATC(atcCode, attachments) {
    let bundleDoc = { resourceType: "Bundle" };
    return bundleDoc;
}
