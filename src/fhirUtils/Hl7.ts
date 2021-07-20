/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { ExtensionsFHIR, GroupedCodesFHIR, IndexFHIR } from "../models/FhirModels"
import { CodingSystem } from "../models/CommonUtilsModels"
import { getLabelsOfGroupedCodes } from "./CommonFHIR"

export class Hl7 {
    constructor() {
    }

    // TODO: section SHALL be mandatory
    getDisplayOrTextInGroupedSection(code:string, groupedSectionName:string, hl7LanguageFile?:object): string {
        // It changes the params order because of getLabelsOfGroupedCodes has mandatory languageFile but optional section
        return getDisplayOrTextByCodeHL7(code, hl7LanguageFile, groupedSectionName)
    }

    // display code SHALL ALWAYS BE English (international)
    getLabelsOfCodesInGroupedSection(codes:string[], groupedSectionName?:string, hl7LanguageFile?:object): string[] {
        // It changes the params order because of getLabelsOfCodesInGroupedSection has mandatory languageFile but optional section
        return getLabelsOfCodesInGroupedSection(codes, hl7LanguageFile, groupedSectionName)
    }
    
    getVaccinesCovid19CVX(): string[] {
        return getVaccinesCovid19CVX()
    }
    
}

// display code SHALL ALWAYS BE English (international)
export function getDisplayOrTextByCodeHL7(code:string, hl7LanguageFile?:object, groupedSectionName?:string): string {
    if (!hl7LanguageFile) hl7LanguageFile = require("../../languages/international/hl7UHC.json")
    return getLabelsOfGroupedCodes([code], hl7LanguageFile, groupedSectionName)[0]
}

export function getLabelsOfCodesInGroupedSection(codes:string[], hl7LanguageFile?:object, groupedSectionName?:string): string[] {
    if (!hl7LanguageFile) hl7LanguageFile = require("../../languages/international/hl7UHC.json")
    return getLabelsOfGroupedCodes(codes, hl7LanguageFile, groupedSectionName)
}

export function getVaccinesCovid19CVX(): string[] {
    return GlobalIndexFHIR.groupedCodes.cvxCovid19.codes
}

// FHIR 'ValueSets' can contain codes from distinct coding systems, UHC 'grouped codes' are groups of codes from the same coding system
export const GlobalIndexFHIR:IndexFHIR = {
    extension:      ExtensionsFHIR,
    groupedCodes:   {
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
        },
        vaccineManufacturer:{
            codes: [ // ACTIVE codes (China, Russia and Spain are not present)
                "BTP","MIP","DVC","GEO","SKB","KGC","MBL","MED","MSD","NAB","NVX","OTC","PMC","WAL","OTH","UNK","PFR","JNJ","IDB","GRF","KED","PAX","SEQ","VAL","DVX","TVA","BN","MOD","ASZ","JSN"
            ],
            system: "http://terminology.hl7.org/CodeSystem/MVX"
        }
    }
}