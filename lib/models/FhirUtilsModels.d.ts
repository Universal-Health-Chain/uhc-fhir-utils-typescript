export interface GlobalIndex {
    categorization?: any;
    groupedCodes: any;
}
export interface IndexLOINC {
    readonly healthSections: string[];
    readonly covid19SerologyTestCodes: string[];
    readonly covid19NaatTestCodes: string[];
    categorization: CategorizationLOINC;
    groupedCodes: GroupedCodesLOINC;
}
export interface CategorizationLOINC {
    healthSection: any;
    documents: any;
    laboratory: LaboratoryCategoriesLOINC;
}
export interface LaboratoryCategoriesLOINC {
    covid19LoincGroupCodes: string[];
    covid19LoincNaatCodes: string[];
    covid19LoincSerologyCodes: string[];
}
export interface GroupedCodesLOINC {
    healthSection: Codes;
    documentType: Codes;
    laboratoryTestCovid19: Codes;
    laboratoryTestTopCommonSI: Codes;
}
interface Codes {
    codes: string[];
}
export interface IndexSNOMED extends GlobalIndex {
    categorization: any;
    groupedCodes: GroupedCodesSNOMED;
}
export interface GroupedCodesSNOMED {
    vaccinationProcedureFullCovid19: {
        codes: string[];
    };
    vaccineTargetDisease: {
        codes: string[];
    };
}
export declare enum test {
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
export interface IndexFHIR extends GlobalIndex {
    extension: any;
    groupedCodes: any;
}
export declare const ExtensionsFHIR: any;
export declare const GroupedCodesFHIR: any;
export {};
/**
    category: {
        // see https://hl7.org/fhir/r4/v2/0203/index.html AND https://www.hl7.org/fhir/v2/0203/index.html
        business: {
            CODES: ["TAX","PRN"]
        },
        personal:{
            CODES: ["NN","DL","HC","JHN","SB","PPN","PRC","SP","WP"],
            passport: "PPN",
            nationalPersonIdentifierPrefix: "NN",   //NNxxx where the xxx is the ISO table 3166 3-character (alphabetic) country code
            healthCard: "HC",

            residencyCard: "SS"
        },
        patient: {  // see https://www.dshs.texas.gov/IDCU/investigation/ELR/Texas-HL7-2_5_1-ELR_Specification_-2016_Final-Draft-4-29-16.pdf
            CODES:["DR","MA","MC","MR","PI","SS","PIN"]
        },
        professional: {
            CODES:["MD","RN","RPH","TRL","UPIN"],
            registered:{code:"COM"},

        },
        general: {
            CODES:["RI"]    // "Resource Identifier": ES CIAS
        }
    }
    // {code: "MCF",  display: ""}
 */ 
