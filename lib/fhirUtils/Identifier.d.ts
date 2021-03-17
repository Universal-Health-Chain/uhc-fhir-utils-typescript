import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class Identifier {
    constructor();
    createIdentifierType(code: string, system: string, customLanguageFile?: any): R4.ICodeableConcept;
    createIdentifierByType(typeCode: string, codeSystem: string, internationalDisplay: string, systemVersion?: string, userSelected?: boolean, customText?: string): R4.IIdentifier;
    addTypeToIdentifier(): void;
    createIdentifierWithoutType(): void;
    createAssigner(): void;
    addAssignerToIdentifier(): void;
    addIdentifierToResource(fhirResource: any, system: string, value: string, use?: R4.IdentifierUseKind, assignerReference?: string, period?: R4.IPeriod): any;
}
export declare function addIdentifierToResource(fhirResource: any, system: string, value: string, use?: R4.IdentifierUseKind, assignerReference?: string, period?: R4.IPeriod): any;
export declare function createIdentifierType(code: string, system: string, customLanguageFile?: any): R4.ICodeableConcept;
export declare function createIdentifierByType(typeCode: string, codeSystem: string, internationalDisplay: string, systemVersion?: string, userSelected?: boolean, customText?: string): R4.IIdentifier;
export declare function addTypeToIdentifier(): void;
export declare function createIdentifierWithoutType(value: string, system: string, use?: R4.IdentifierUseKind, periodStart?: string, periodEnd?: string): R4.IIdentifier;
export declare function createAssigner(): void;
export declare function addAssignerToIdentifier(): void;
