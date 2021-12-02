/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

export interface GlobalIndex {
    categorization?:any
    groupedCodes:   any
}

export interface LanguageFiles {
    atc?:       object
    hl7?:       object
    icd10?:     object
    icd11?:     object
    loinc?:     object
    snomed?:    object
}

export interface Codes {
    codes:  string[]    
}

export interface CodesAndSystem extends Codes {
    system: string
}

// It provides the 'target grouped section' within a HL7 JSON file or others with sections
export enum CodingSystem {
    icd10                       = "http://hl7.org/fhir/sid/icd-10", // Target disease ICD10: https://www.hl7.org/fhir/valueset-icd-10.html
    icd11                       = "http://hl7.org/fhir/sid/icd-11", // not official
    loinc                       = "http://loinc.org",
    snomed                      = "http://snomed.info/sct", // http://hl7.org/fhir/uv/ips/ValueSet-vaccines-gps-uv-ips.html
    ucum                        = "http://unitsofmeasure.org",
    uuid                        = "urn:ietf:rfc:3986",

    humanNameRepresentationISO  = "http://hl7.org/fhir/StructureDefinition/iso21090-EN-representation",
    deviceSafety                = "http://ncithesaurus-stage.nci.nih.gov",  // NCI Thesaurus is urn:oid:2.16.840.1.113883.3.26.1.1

    atc                         = "http://www.whocc.no/atc", // ATC Vaccine groups: https://www.whocc.no/ddd/lists_of_temporary_atc_ddds_and_alterations/atc_codes/
    cpt                         = "http://www.ama-assn.org/go/cpt",    
    cvx                         = "http://hl7.org/fhir/sid/cvx", // Vaccine Administered
    cvxCovid19                  = "http://hl7.org/fhir/sid/cvx",
    mvx                         = "https://terminology.hl7.org/ValueSet-v3-VaccineManufacturer.html",
    emaOfficialMedicinalProduct = "https://ec.europa.eu/health/documents/community-register/html/",
    emaCovid19OfficialVaccine   = "https://ec.europa.eu/health/documents/community-register/html/",
    emaCovid19TempVaccine       = "http://ec.europa.eu/temp/vaccineproductname",
    emaCovid19TestManufacturer  = "emaDeviceManufacturer",
    emaCovid19LabTestDevice     = "https://covid-19-diagnostics.jrc.ec.europa.eu/devices",
    emaOfficialOrganization     = "https://spor.ema.europa.eu/v1/organisations",
    emaTempVaccineManufacturer  = "http://ec.europa.eu/temp/vaccinemanufacturer",
    
    vaccineManufacturer         = "https://terminology.hl7.org/ValueSet-v3-VaccineManufacturer.html",
    immunizationProviderRole    = "http://terminology.hl7.org/CodeSystem/v2-0443",
    immunizationFunding         = "http://terminology.hl7.org/CodeSystem/immunization-funding-source",
    immunizationEligibilty      = "http://terminology.hl7.org/CodeSystem/immunization-program-eligibility",
    immunizationOrigin          = "http://terminology.hl7.org/CodeSystem/immunization-origin",
    immunizationActReason       = "http://terminology.hl7.org/CodeSystem/v3-ActReason",
    immunizationActSite         = "http://terminology.hl7.org/CodeSystem/v3-ActSite",
    routeOfAdministration       = "http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration",
    immunizationSubpotent       = "http://terminology.hl7.org/CodeSystem/immunization-subpotent-reason",

    identifierBusiness          = "http://terminology.hl7.org/CodeSystem/v2-0203",  // CAUTION: use System (CLD) but not ValueSet
    identifierPersonal          = "http://terminology.hl7.org/CodeSystem/v2-0203", 
    identiferPatient            = "http://terminology.hl7.org/CodeSystem/v2-0203", 
    identifierProfessional      = "http://terminology.hl7.org/CodeSystem/v2-0203", 
    identifierGeneral           = "http://terminology.hl7.org/CodeSystem/v2-0203", 
    
    diagnosticServiceSections   = "http://terminology.hl7.org/CodeSystem/v2-0074",  // use System (CLD) but not ValueSet
    communicationCategory       = "http://terminology.hl7.org/CodeSystem/communication-category",
    compositionStatus           = "http://hl7.org/fhir/composition-status",
    eventStatus                 = "http://hl7.org/fhir/event-status",
    organizationType            = "http://terminology.hl7.org/CodeSystem/organization-type",
    locationMode                = "http://hl7.org/fhir/location-mode",
    locationStatusKind          = "http://hl7.org/fhir/location-status",
    locationPhysicalType        = "http://terminology.hl7.org/CodeSystem/location-physical-type",
    locationBedStatus           = "http://terminology.hl7.org/CodeSystem/v2-0116",
    daysOfWeek                  = "http://hl7.org/fhir/days-of-week",
    serviceDeliveryLocationRoleType = "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
    serviceCategory             = "http://terminology.hl7.org/CodeSystem/service-category",
    serviceType                 = "http://terminology.hl7.org/CodeSystem/service-type",
    serviceProvisionConditions  = "http://terminology.hl7.org/CodeSystem/service-provision-conditions",
    servicePrograms             = "http://terminology.hl7.org/CodeSystem/program",
    serviceReferralMethod       = "http://terminology.hl7.org/CodeSystem/service-referral-method"
}