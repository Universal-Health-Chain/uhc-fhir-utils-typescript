"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createABOBloodTypeCodeableConceptFromSNOMED = exports.createBloodTypeFHIRObservationFromSNOMED = exports.addObservationAsMemberToMainObservation = exports.getChoiceNameFromValueFHIR = void 0;
const ts_fhir_types_1 = require("@ahryman40k/ts-fhir-types");
const Snomed_1 = require("./Snomed");
const Loinc_1 = require("./Loinc");
const CommonModels_1 = require("../models/CommonModels");
function getChoiceNameFromValueFHIR(fhir) {
    switch (fhir) {
        case (fhir.valueString): return "valueString";
        case (fhir.valueQuantity): return "valueQuantity";
        case (fhir.valueRatio): return "valueRatio";
        case (fhir.valueRange): return "valueRange";
        case (fhir.valueCodeableConcept): return "valueCodeableConcept";
        case (fhir.valueBoolean): return "valueBoolean";
        case (fhir.valueSampledData): return "valueSampledData";
        case (fhir.valueTime): return "valueTime";
        case (fhir.valueDateTime): return "valueDateTime";
        case (fhir.valuePeriod): return "valuePeriod";
        default: return "";
    }
}
exports.getChoiceNameFromValueFHIR = getChoiceNameFromValueFHIR;
function addObservationAsMemberToMainObservation(member, main) {
    let members = main.hasMember || [];
    members.push(...members, {
        reference: member.id
    });
    main.hasMember = members;
    return main;
}
exports.addObservationAsMemberToMainObservation = addObservationAsMemberToMainObservation;
function createBloodTypeFHIRObservationFromSNOMED(snomedCode, language) {
    let bloodTypeCodeableConcept = createABOBloodTypeCodeableConceptFromSNOMED(snomedCode);
    if (!bloodTypeCodeableConcept.coding || bloodTypeCodeableConcept.coding.length <= 0 || !bloodTypeCodeableConcept.coding[0].code || bloodTypeCodeableConcept.coding[0].code == "")
        return {};
    // TODO: createFHIRCodingFromLOINC with getDisplayFromSNOMED
    let observationTypeCoding = {
        system: CommonModels_1.CodingSystem.loinc,
        code: Loinc_1.terminologyCodesLOINC.aboRH,
        display: Loinc_1.getDisplayOrTextByCodeLOINC(Loinc_1.terminologyCodesLOINC.aboRH)
    };
    let observationTypeCode = {
        coding: [observationTypeCoding]
    };
    // TODO: put getLocaleTextFromLOINC for "882-1" into observationTypeCode.text if any
    let observationDateTime = new Date().toISOString();
    let observation = {
        resourceType: "Observation",
        language: language,
        status: ts_fhir_types_1.R4.ObservationStatusKind._final,
        code: observationTypeCode,
        valueCodeableConcept: bloodTypeCodeableConcept,
        effectiveDateTime: observationDateTime
    };
    return observation;
}
exports.createBloodTypeFHIRObservationFromSNOMED = createBloodTypeFHIRObservationFromSNOMED;
function createABOBloodTypeCodeableConceptFromSNOMED(code) {
    let text = Snomed_1.getDisplayOrTextByCodeSNOMED(code);
    if (!text || text == "")
        return {};
    let codeableConcept = {};
    codeableConcept.text = text;
    let coding = {};
    coding.code = code;
    // coding.userSelected = true   // do it in the frontend if required
    let display = Snomed_1.getDisplayOrTextByCodeSNOMED(code);
    if (display && display != "")
        coding.display = display;
    // FHIR CodeableConcept contais an array of coding objects for different CODE_SYSTEMS
    codeableConcept.coding = [coding];
    return codeableConcept;
}
exports.createABOBloodTypeCodeableConceptFromSNOMED = createABOBloodTypeCodeableConceptFromSNOMED;
/*
export function createFHIRObservationFromObservationFormUHC(form: ObservationFormUHC): R4.IObservation {
  // the right way is to use the LOINC observationCode and get both "display" and the local "text" translation from this code
  let observationCodeCoding: R4.ICoding = {
      code: form.observationCode || "",
      userSelected: form.observationCodeSelectedByUser || false ,
      display: form.observationCodeDisplay || ""  // TODO: insert display from code
  }
  let observationCodeCodeable: R4.ICodeableConcept = {
      text: form.observationCodeText || "", //TODO: insert translation from display code
      coding: [observationCodeCoding]
  }
  let observation: R4.IObservation = {
      resourceType: "Observation",
      language: "es",
      code: observationCodeCodeable
  }
  return observation
}
*/
/*
// TODO: solve Variable is used before being assigned.
export function getBloodTypingMainObservationFromBundleFHIR(bundle:R4.IBundle) : R4.IObservation{
if (!bundle.entry || bundle.entry.length < 1) return {} as R4.IObservation

let mainBloodTypingObservation:R4.IObservation
let result:boolean = bundle.entry.some(function(item){
  if (item.resource && item.resource.resourceType == 'Observation'){
    // TODO: validate the observation object
    if (item.resource.code && item.resource.code.text && item.resource.code.text==BLOOD_TYPING_MAIN_CODE_TEXT){
      // it assumes only one blood typing observation exists or none
      mainBloodTypingObservation = item.resource
      return true
    }
  }
})

// TODO: validate mainBloodTypingObservation?
if (!result) return {} as R4.IObservation
else return mainBloodTypingObservation
}
*/
/*
// TODO: solve Variable is used before being assigned.
export function getAboRhBloodTypeObservationFromBundleFHIR(bundle:R4.IBundle) : R4.IObservation{
let mainBloodTypingObservation:R4.IObservation = getBloodTypingMainObservationFromBundleFHIR(bundle)
if (!mainBloodTypingObservation.hasMember || mainBloodTypingObservation.hasMember.length<1) return {} as R4.IObservation

let aboRhBloodTypeObservation: R4.IObservation
let result:boolean = mainBloodTypingObservation.hasMember.some(function(item){
  if (item.reference) {
    let observation = getResourceByIdInBundle(item.reference, bundle)
    if (observation.code && observation.code.coding && observation.code.coding.length > 0) {
      let loincCoding:R4.ICoding = getLOINCCoding(observation.code.coding)
      if (loincCoding.code == LOINC_ABO_RH_CODE) {
        aboRhBloodTypeObservation = observation
        return true
      }
    }
  }
})

if (!result) return {} as R4.IObservation
else return aboRhBloodTypeObservation
}
*/
