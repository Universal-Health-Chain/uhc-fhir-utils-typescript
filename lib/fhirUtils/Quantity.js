/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { systemUCUM } from "./CommonFHIR";
/** Quantity */
export function createSimpleQuantityByCodeMg(number) {
    return createSimpleQuantity(number, "mg");
}
export function createSimpleQuantityByCodeMl(number) {
    return createSimpleQuantity(number, "ml");
}
export function createSimpleQuantity(number, code) {
    let simpleQuantityInMl = {
        value: number,
        system: systemUCUM,
        code: code // Coded form of the unit ("mg", "ml", ...)
        // unit: "mL", // Unit string representation
    };
    return simpleQuantityInMl;
}
