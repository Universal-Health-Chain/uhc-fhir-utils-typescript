/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
export class Atc {
    constructor() {
        this.getVaccinesGroupsATC = () => getVaccinesGroupsATC();
        this.getDisplayOrTextByCodeATC = (code, atcLanguageFile) => getDisplayOrTextByCodeATC(code, atcLanguageFile);
    }
}
// display code SHALL ALWAYS BE English (international)
export function getDisplayOrTextByCodeATC(code, atcLanguageFile) {
    if (!atcLanguageFile)
        atcLanguageFile = require("../../languages/international/atc.json");
    // return getLabelsOfGroupedCodes([code], atcLanguageFile, groupedSectionName)[0]
    return atcLanguageFile[code];
}
/*
export function getLabelsOfCodesInGroupedSection(codes:string[], hl7LanguageFile?:object, groupedSectionName?:string): string[] {
    if (!hl7LanguageFile) hl7LanguageFile = require("../../languages/international/hl7UHC.json")
    return getLabelsOfGroupedCodes(codes, hl7LanguageFile, groupedSectionName)
}*/
export function getVaccinesGroupsATC() {
    return GlobalIndexATC.categorization.fullVaccineClassification.codes;
}
// TODO: export function getVaccineCodesByGroupATC(atcGroupCode:string):string[]{}
export const GlobalIndexATC = {
    // ACTIVE codes categorization (not deprecated)
    categorization: {
        fullVaccineClassification: {
            codes: [
                "J07BX03", "J07AC", "J07AD", "J07AE", "J07AF", "J07AG", "J07AH", "J07AJ", "J07AK", "J07AL", "J07AM", "J07AN", "J07AP", "J07AR", "J07BA", "J07BB", "J07BC", "J07BD", "J07BE", "J07BF", "J07BG", "J07BH", "J07BJ", "J07BK", "J07BL", "J07BM", "J07BX01", "J07BX02", "J07CA01", "J07CA02", "J07CA03", "J07CA04", "J07CA05", "J07CA06", "J07CA07", "J07CA08", "J07CA09"
            ]
        }
    },
    // indexed codes grouped by sections to search labels for
    groupedCodes: {
        vaccineGroups: {
            codes: ["J07A", "J07B", "J07C", "J07X"]
        }
        // bacterialVaccines:{}...
    }
};
