import { Codes } from "./CommonUtilsModels";
export interface IndexATC {
    categorization: CategorizationATC;
    groupedCodes: GroupedCodesATC;
}
export interface CategorizationATC {
    fullVaccineClassification: Codes;
}
export interface GroupedCodesATC {
    vaccineGroups?: Codes;
    bacterialVaccines?: Codes;
    viralVaccines?: Codes;
    combinedBacterialAndViralVaccines?: Codes;
    otherVaccines?: Codes;
}
