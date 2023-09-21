/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { CodingSystem } from "../models"

export class Quantity {
    constructor() {
    }

    createSimpleQuantityByCodeMg(number:number){
        createSimpleQuantityByCodeMg(number)
    }
    
    createSimpleQuantityByCodeMl(number:number){
        return createSimpleQuantityByCodeMl(number)
    }
    
    createSimpleQuantity(number:number, code:string){
        return createSimpleQuantity(number, code)
    }

}


export function createSimpleQuantityByCodeMg(number:number){
    return createSimpleQuantity(number, "mg")
}

export function createSimpleQuantityByCodeMl(number:number){
    return createSimpleQuantity(number, "ml")
}

export function createSimpleQuantity(number:number, code:string){
    let simpleQuantityInMl:R4.IQuantity = {
        value: number,
        system: CodingSystem.ucum, // System that defines coded unit form
        code:   code  // Coded form of the unit ("mg", "ml", ...)
        // unit: "mL", // Unit string representation
    }
    return simpleQuantityInMl
}