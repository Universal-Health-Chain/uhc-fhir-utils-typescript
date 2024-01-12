/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { ParameterData } from '../models/params/Search.params.model'
import { vaccineProphylaxisCodeATC } from "./Covid19"
import { fhirDateOrPeriodToParam, fhirIdentifiersToParam, fhirImmunizationVaccineCodeToParam, fhirReferenceToParam } from "./Params";

export class Immunization {
    
    constructor() {
    }

    systemVaccineATC               = () => "http://www.whocc.no/atc"
    systemVaccineCPT               = () => "http://www.ama-assn.org/go/cpt"
    systemVaccineCVX               = () => "http://hl7.org/fhir/sid/cvx"
    systemVaccineSNOMED            = () => "http://snomed.info/sct"    // http://hl7.org/fhir/uv/ips/ValueSet-vaccines-gps-uv-ips.html
    systemImmunizationFunding      = () => "http://terminology.hl7.org/CodeSystem/immunization-funding-source"
    systemImmunizationEligibilty   = () => "http://terminology.hl7.org/CodeSystem/immunization-program-eligibility"
    systemImmunizationOrigin       = () => "http://terminology.hl7.org/CodeSystem/immunization-origin"
    systemNotAdministeredReason    = () => "http://terminology.hl7.org/CodeSystem/v3-ActReason"
    systemAdministrationSite       = () => "http://terminology.hl7.org/CodeSystem/v3-ActSite"
    systemRouteOfAdministration    = () => "http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration"
    systemImmunizationSubpotent    = () => "http://terminology.hl7.org/CodeSystem/immunization-subpotent-reason"

}

export function createCovid19BundleDocumentWithImmunizationAndAttachmentsByGroupATC(attachments:R4.IAttachment[]):R4.IBundle {
    return createBundleDocumentWithImmunizationAndAttachmentsByGroupATC(vaccineProphylaxisCodeATC, attachments)
}

export function createBundleDocumentWithImmunizationAndAttachmentsByGroupATC(atcCode:string, attachments:R4.IAttachment[]) : R4.IBundle {
    let bundleDoc:R4.IBundle = {resourceType:"Bundle"}
    return bundleDoc
}

export function GetParamsByImmunizationFHIR4(immunization: R4.IImmunization): ParameterData[] {
    let parameters: ParameterData[] = [];

    if (immunization.vaccineCode) {
        parameters.push(fhirImmunizationVaccineCodeToParam(immunization.vaccineCode));
    }
    if (immunization.identifier && immunization.identifier.length > 0) {
        parameters.push(fhirIdentifiersToParam(immunization.identifier));
    }
    if (immunization.patient) {
        parameters.push(fhirReferenceToParam(immunization.patient, 'patient'));
    }
    if (immunization.encounter) {
        parameters.push(fhirReferenceToParam(immunization.encounter, 'encounter'));
    }
    if (immunization.location) {
        parameters.push(fhirReferenceToParam(immunization.location, 'location'));
    }
    if (immunization.occurrenceDateTime) {
        parameters.push(fhirDateOrPeriodToParam(immunization.occurrenceDateTime, 'date'));
    }
    if (immunization.expirationDate) {
        parameters.push(fhirDateOrPeriodToParam(immunization.expirationDate, 'expirationDate'));
    }

    return parameters;
}

