export interface GlobalIndex {
    categorization?: any;
    groupedCodes: any;
}
export interface IndexLOINC extends GlobalIndex {
    readonly healthSections: string[];
    readonly covid19SerologyTestCodes: string[];
    readonly covid19NaatTestCodes: string[];
    categorization: {
        healthSection: any;
        documents: any;
        laboratory: {
            covid19LoincGroupCodes: string[];
            covid19LoincNaatCodes: string[];
            covid19LoincSerologyCodes: string[];
        };
    };
    groupedCodes: GroupedCodesLOINC;
}
export interface GroupedCodesLOINC {
    healthSection: {
        codes: string[];
    };
    documentType: {
        codes: string[];
    };
    laboratoryTestCovid19: {
        codes: string[];
    };
    laboratoryTestTopCommonSI: {
        codes: string[];
    };
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
    organizationType = "http://terminology.hl7.org/CodeSystem/organization-type"
}
export interface IndexFHIR extends GlobalIndex {
    extension: any;
    groupedCodes: any;
}
export declare const ExtensionsFHIR: any;
export declare const GroupedCodesFHIR: any;
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
