import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class Quantity {
    constructor();
    createSimpleQuantityByCodeMg(number: number): void;
    createSimpleQuantityByCodeMl(number: number): R4.IQuantity;
    createSimpleQuantity(number: number, code: string): R4.IQuantity;
}
export declare function createSimpleQuantityByCodeMg(number: number): R4.IQuantity;
export declare function createSimpleQuantityByCodeMl(number: number): R4.IQuantity;
export declare function createSimpleQuantity(number: number, code: string): R4.IQuantity;
