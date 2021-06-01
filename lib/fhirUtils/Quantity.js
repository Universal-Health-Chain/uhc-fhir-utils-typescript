"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSimpleQuantity = exports.createSimpleQuantityByCodeMl = exports.createSimpleQuantityByCodeMg = exports.Quantity = void 0;
const models_1 = require("../models");
class Quantity {
    constructor() {
    }
    createSimpleQuantityByCodeMg(number) {
        createSimpleQuantityByCodeMg(number);
    }
    createSimpleQuantityByCodeMl(number) {
        return createSimpleQuantityByCodeMl(number);
    }
    createSimpleQuantity(number, code) {
        return createSimpleQuantity(number, code);
    }
}
exports.Quantity = Quantity;
function createSimpleQuantityByCodeMg(number) {
    return createSimpleQuantity(number, "mg");
}
exports.createSimpleQuantityByCodeMg = createSimpleQuantityByCodeMg;
function createSimpleQuantityByCodeMl(number) {
    return createSimpleQuantity(number, "ml");
}
exports.createSimpleQuantityByCodeMl = createSimpleQuantityByCodeMl;
function createSimpleQuantity(number, code) {
    let simpleQuantityInMl = {
        value: number,
        system: models_1.CodingSystem.ucum,
        code: code // Coded form of the unit ("mg", "ml", ...)
        // unit: "mL", // Unit string representation
    };
    return simpleQuantityInMl;
}
exports.createSimpleQuantity = createSimpleQuantity;
