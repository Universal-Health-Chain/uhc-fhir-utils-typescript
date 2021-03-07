import { R4 } from "@ahryman40k/ts-fhir-types";
export declare const systemUCUM = "http://unitsofmeasure.org";
/** Quantity */
export declare function createSimpleQuantityByCodeMg(number: number): R4.IQuantity;
export declare function createSimpleQuantityByCodeMl(number: number): R4.IQuantity;
export declare function createSimpleQuantity(number: number, code: string): R4.IQuantity;
