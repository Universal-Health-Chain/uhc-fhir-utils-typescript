export interface GlobalIndex {
    categorization?: any;
    groupedCodes: any;
}
interface CodeSystemsHL7 {
    snomed: string;
    loinc: string;
    icd10: string;
    ucum: string;
}
export interface IndexHL7 extends GlobalIndex {
    extension: any;
    codeSystem: CodeSystemsHL7;
    groupedCodes: GroupedCodesHL7;
}
export interface GroupedCodesHL7 {
    identifierBusiness: {
        codes: string[];
        system: string;
    };
    identifierPersonal: {
        codes: string[];
        system: string;
    };
    identiferPatient: {
        codes: string[];
        system: string;
    };
    identifierProfessional: {
        codes: string[];
        system: string;
    };
    identifierGeneral: {
        codes: string[];
        system: string;
    };
    diagnosticServiceSections: {
        codes: string[];
        system: string;
    };
    deviceSafety: {
        codes: string[];
        system: string;
    };
    cvx: {
        codes: string[];
        system: string;
    };
    cvxCovid19: {
        codes: string[];
        system: string;
    };
    eventStatus: {
        codes: string[];
        system: string;
    };
    organizationType: {
        codes: string[];
        system: string;
    };
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
    categorization: {
        allergies: {
            food: any;
        };
        procedure: any;
    };
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
export {};
