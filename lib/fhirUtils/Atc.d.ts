import { IndexATC } from "../models/AtcModel";
export declare class Atc {
    constructor();
    getVaccinesGroupsATC: () => string[];
    getDisplayOrTextByCodeATC: (code: string, atcLanguageFile?: object | undefined) => string;
}
export declare function getDisplayOrTextByCodeATC(code: string, atcLanguageFile?: object): string;
export declare function getVaccinesGroupsATC(): string[];
export declare const GlobalIndexATC: IndexATC;
