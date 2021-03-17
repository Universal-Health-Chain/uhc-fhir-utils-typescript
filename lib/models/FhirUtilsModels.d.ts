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
            covid19: any;
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
export declare enum CodingSystem {
    icd10 = "http://hl7.org/fhir/sid/icd-10",
    loinc = "http://loinc.org",
    snomed = "http://snomed.info/sct",
    ucum = "http://unitsofmeasure.org",
    uuid = "urn:ietf:rfc:3986",
    identifierBusiness = "http://terminology.hl7.org/CodeSystem/v2-0203",
    identifierPersonal = "http://terminology.hl7.org/CodeSystem/v2-0203",
    identiferPatient = "http://terminology.hl7.org/CodeSystem/v2-0203",
    identifierProfessional = "http://terminology.hl7.org/CodeSystem/v2-0203",
    identifierGeneral = "http://terminology.hl7.org/CodeSystem/v2-0203",
    diagnosticServiceSections = "http://terminology.hl7.org/CodeSystem/v2-0074",
    deviceSafety = "http://ncithesaurus-stage.nci.nih.gov",
    cvx = "http://hl7.org/fhir/sid/cvx",
    cvxCovid19 = "http://hl7.org/fhir/sid/cvx",
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
