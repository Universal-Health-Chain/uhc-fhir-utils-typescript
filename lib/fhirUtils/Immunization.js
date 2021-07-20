"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBundleDocumentWithImmunizationAndAttachmentsByGroupATC = exports.createCovid19BundleDocumentWithImmunizationAndAttachmentsByGroupATC = exports.Immunization = void 0;
const Covid19_1 = require("./Covid19");
class Immunization {
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
exports.Immunization = Immunization;
function createCovid19BundleDocumentWithImmunizationAndAttachmentsByGroupATC(attachments) {
    return createBundleDocumentWithImmunizationAndAttachmentsByGroupATC(Covid19_1.vaccineProphylaxisCodeATC, attachments);
}
exports.createCovid19BundleDocumentWithImmunizationAndAttachmentsByGroupATC = createCovid19BundleDocumentWithImmunizationAndAttachmentsByGroupATC;
function createBundleDocumentWithImmunizationAndAttachmentsByGroupATC(atcCode, attachments) {
    let bundleDoc = { resourceType: "Bundle" };
    return bundleDoc;
}
exports.createBundleDocumentWithImmunizationAndAttachmentsByGroupATC = createBundleDocumentWithImmunizationAndAttachmentsByGroupATC;
