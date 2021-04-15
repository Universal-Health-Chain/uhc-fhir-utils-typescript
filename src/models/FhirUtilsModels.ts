
export interface GlobalIndex {
    categorization?:any
    groupedCodes:   any
}

export interface IndexLOINC extends GlobalIndex {
    readonly healthSections:            string[]
    readonly covid19SerologyTestCodes:  string[]
    readonly covid19NaatTestCodes:      string[]
    categorization: {
        healthSection:  any
        documents:      any
        laboratory: {
            covid19LoincGroupCodes:     string[] // antibody (serum) or virus (RNA) detection
            covid19LoincNaatCodes:      string[] // "SARSCoV2 detection (group code) - Nucleic acid amplification test"
            covid19LoincSerologyCodes:  string[] // 
        }
    },
    groupedCodes: GroupedCodesLOINC
}

export interface GroupedCodesLOINC {
    healthSection:              {codes:  string[]}
    documentType:               {codes:  string[]}
    laboratoryTestCovid19:      {codes:  string[]}
    laboratoryTestTopCommonSI:  {codes:  string[]}
}

export interface IndexSNOMED extends GlobalIndex {
    categorization: any
    groupedCodes: GroupedCodesSNOMED
}

export interface GroupedCodesSNOMED {
    vaccinationProcedureFullCovid19:    {codes:  string[]}
    vaccineTargetDisease:               {codes:  string[]}
}

export enum test {

}

// It provides the 'target grouped section' within a HL7 JSON file or others with sections
export enum CodingSystem {
    icd10                       = "http://hl7.org/fhir/sid/icd-10", // Target disease ICD10: https://www.hl7.org/fhir/valueset-icd-10.html
    loinc                       = "http://loinc.org",
    snomed                      = "http://snomed.info/sct", // http://hl7.org/fhir/uv/ips/ValueSet-vaccines-gps-uv-ips.html
    ucum                        = "http://unitsofmeasure.org",
    uuid                        = "urn:ietf:rfc:3986",

    deviceSafety                = "http://ncithesaurus-stage.nci.nih.gov",  // NCI Thesaurus is urn:oid:2.16.840.1.113883.3.26.1.1

    atc                         = "http://www.whocc.no/atc", // ATC Vaccine groups: https://www.whocc.no/ddd/lists_of_temporary_atc_ddds_and_alterations/atc_codes/
    cpt                         = "http://www.ama-assn.org/go/cpt",    
    cvx                         = "http://hl7.org/fhir/sid/cvx", // Vaccine Administered
    cvxCovid19                  = "http://hl7.org/fhir/sid/cvx",

    immunizationFunding         = "http://terminology.hl7.org/CodeSystem/immunization-funding-source",
    immunizationEligibilty      = "http://terminology.hl7.org/CodeSystem/immunization-program-eligibility",
    immunizationOrigin          = "http://terminology.hl7.org/CodeSystem/immunization-origin",
    notAdministeredReason       = "http://terminology.hl7.org/CodeSystem/v3-ActReason",
    administrationSite          = "http://terminology.hl7.org/CodeSystem/v3-ActSite",
    routeOfAdministration       = "http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration",
    immunizationSubpotent       = "http://terminology.hl7.org/CodeSystem/immunization-subpotent-reason",
    
    identifierBusiness          = "http://terminology.hl7.org/CodeSystem/v2-0203",  // CAUTION: use System (CLD) but not ValueSet
    identifierPersonal          = "http://terminology.hl7.org/CodeSystem/v2-0203", 
    identiferPatient            = "http://terminology.hl7.org/CodeSystem/v2-0203", 
    identifierProfessional      = "http://terminology.hl7.org/CodeSystem/v2-0203", 
    identifierGeneral           = "http://terminology.hl7.org/CodeSystem/v2-0203", 
    
    diagnosticServiceSections   = "http://terminology.hl7.org/CodeSystem/v2-0074",  // use System (CLD) but not ValueSet
    communicationCategory       = "http://terminology.hl7.org/CodeSystem/communication-category",
    eventStatus                 = "http://hl7.org/fhir/event-status",
    organizationType            = "http://terminology.hl7.org/CodeSystem/organization-type",
}

export interface IndexFHIR extends GlobalIndex {
    extension:      any
    groupedCodes:   any
}

export const ExtensionsFHIR:any = {
    mothersFamily: "http://hl7.org/fhir/StructureDefinition/humanname-mothers-family"
}

// FHIR 'ValueSets' can contain codes from distinct coding systems, UHC 'grouped codes' are groups of codes from the same coding system
export const GroupedCodesFHIR:any = {  // https://csvjson.com/json2csv
    identifierBusiness: {
        codes: ["TAX","PRN"],
        system: CodingSystem.identifierBusiness
    },
    identifierPersonal:{
        codes: ["NN","DL","HC","JHN","SB","PPN","PRC","SP","WP"],
        system: CodingSystem.identifierPersonal
    },
    identiferPatient: {  // see https://www.dshs.texas.gov/IDCU/investigation/ELR/Texas-HL7-2_5_1-ELR_Specification_-2016_Final-Draft-4-29-16.pdf
        codes:["DR","MA","MC","MR","PI","SS","PIN"],
        system: CodingSystem.identiferPatient
    },
    identifierProfessional: {
        codes:["MD","RN","RPH","TRL","UPIN"],
        system: CodingSystem.identifierProfessional
    },
    identifierGeneral: {
        codes:["RI"],   // "Resource Identifier" e.g. ES CIAS in old HL7 v2 messages
        system: CodingSystem.identifierGeneral
    },
    diagnosticServiceSections:  {   // https://www.hl7.org/fhir/valueset-diagnostic-service-sections.html
        codes: ["LAB","AU","BG","BLB","CG","CH","CP","CT","CTH","CUS","EC","EN","GE","HM","ICU","IMM","LAB","MB","MCB","MYC", "NMR","NMS","NRS","OSL","OT","OTH","OUS","PF","PHR","PHY","PT","RAD","RC","RT","RUS","RX","SP","SR","TX","VR","VUS","XRC"],
        system: CodingSystem.diagnosticServiceSections
    },
    deviceSafety: { 
        codes: ["C106038","C101673","C113844","C106047","C106045","C106046"],
        system: CodingSystem.deviceSafety
    },
    cvx: {
        codes: ["143","24","19","173","174","172","56","146","28","198","20","106","130","120","195","110","102","49","48","169","104","193","52","83","189","43","44","08","62","165","176","175","160","135","197","186","171","158","150","161","166","149","205","141","140","201","202","200","134","03","94","191","192","162","163","136","114","203","178","170","179","177","133","33","10","119","116","207","208","210","144","168","185","155","206","09","113","196","115","77","190","25","101","75","21","37","183","187","121"],
        system: CodingSystem.cvx
    },
    cvxCovid19: {
        codes: ["207","208","210"],
        system: CodingSystem.cvxCovid19
    },
    communicationCategory: {
        codes: ["alert","notification","reminder","instruction"],
        system: CodingSystem.communicationCategory
    },
    eventStatus: {
        codes: ["preparation","in-progress","completed","not-done","on-hold","stopped","entered-in-error","unknown"],
        system: CodingSystem.eventStatus
    },
    organizationType: {
        codes: ["prov","dept","bus","ins","govt","cg","edu","pay","team","reli","crs","other"],
        system: CodingSystem.organizationType
    }
}

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