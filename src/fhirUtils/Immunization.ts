/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

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