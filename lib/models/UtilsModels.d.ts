export interface GlobalIndex {
    categorization?: any;
    groupedCodes: any;
}
export interface LanguageFiles {
    atc?: object;
    hl7?: object;
    icd10?: object;
    icd11?: object;
    loinc?: object;
    snomed?: object;
}
export interface Codes {
    codes: string[];
}
export interface CodesAndSystem extends Codes {
    system?: string;
}
export declare enum CodingSystem {
    icd10 = "http://hl7.org/fhir/sid/icd-10",
    icd11 = "http://hl7.org/fhir/sid/icd-11",
    loinc = "http://loinc.org",
    snomed = "http://snomed.info/sct",
    ucum = "http://unitsofmeasure.org",
    uuid = "urn:ietf:rfc:3986",
    deviceSafety = "http://ncithesaurus-stage.nci.nih.gov",
    atc = "http://www.whocc.no/atc",
    cpt = "http://www.ama-assn.org/go/cpt",
    cvx = "http://hl7.org/fhir/sid/cvx",
    cvxCovid19 = "http://hl7.org/fhir/sid/cvx",
    immunizationFunding = "http://terminology.hl7.org/CodeSystem/immunization-funding-source",
    immunizationEligibilty = "http://terminology.hl7.org/CodeSystem/immunization-program-eligibility",
    immunizationOrigin = "http://terminology.hl7.org/CodeSystem/immunization-origin",
    notAdministeredReason = "http://terminology.hl7.org/CodeSystem/v3-ActReason",
    administrationSite = "http://terminology.hl7.org/CodeSystem/v3-ActSite",
    routeOfAdministration = "http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration",
    immunizationSubpotent = "http://terminology.hl7.org/CodeSystem/immunization-subpotent-reason",
    identifierBusiness = "http://terminology.hl7.org/CodeSystem/v2-0203",
    identifierPersonal = "http://terminology.hl7.org/CodeSystem/v2-0203",
    identiferPatient = "http://terminology.hl7.org/CodeSystem/v2-0203",
    identifierProfessional = "http://terminology.hl7.org/CodeSystem/v2-0203",
    identifierGeneral = "http://terminology.hl7.org/CodeSystem/v2-0203",
    diagnosticServiceSections = "http://terminology.hl7.org/CodeSystem/v2-0074",
    communicationCategory = "http://terminology.hl7.org/CodeSystem/communication-category",
    eventStatus = "http://hl7.org/fhir/event-status",
    organizationType = "http://terminology.hl7.org/CodeSystem/organization-type",
    locationMode = "http://hl7.org/fhir/location-mode",
    locationStatusKind = "http://hl7.org/fhir/location-status",
    locationPhysicalType = "http://terminology.hl7.org/CodeSystem/location-physical-type",
    locationBedStatus = "http://terminology.hl7.org/CodeSystem/v2-0116",
    daysOfWeek = "http://hl7.org/fhir/days-of-week",
    serviceDeliveryLocationRoleType = "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
    serviceCategory = "http://terminology.hl7.org/CodeSystem/service-category",
    serviceType = "http://terminology.hl7.org/CodeSystem/service-type",
    serviceProvisionConditions = "http://terminology.hl7.org/CodeSystem/service-provision-conditions",
    servicePrograms = "http://terminology.hl7.org/CodeSystem/program",
    serviceReferralMethod = "http://terminology.hl7.org/CodeSystem/service-referral-method"
}
