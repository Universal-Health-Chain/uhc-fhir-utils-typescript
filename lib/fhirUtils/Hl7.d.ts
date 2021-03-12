import { IndexHL7 } from "../models/FhirUtilsModels";
export declare enum GroupedHL7 {
    cvx = "cvx",
    cvxCovid19 = "cvxCovid19",
    deviceSafety = "deviceSafety",
    diagnosticServiceSections = "diagnosticServiceSections",
    identifierType = "identifierType",
    organizationTypes = "organizationTypes"
}
export declare function getDisplayCodeHl7(code: string, englishCodeLabels?: any): string;
export declare function getVaccinesCovid19CVX(): string[];
export declare const GlobalIndexHL7: IndexHL7;
