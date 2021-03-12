import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class Identifier {
    constructor();
    addIdentifier(fhirResource: any, system: string, value: string, use?: R4.IdentifierUseKind, assignerReference?: string, period?: R4.IPeriod): any;
}
export declare function addIdentifier(fhirResource: any, system: string, value: string, use?: R4.IdentifierUseKind, assignerReference?: string, period?: R4.IPeriod): any;
