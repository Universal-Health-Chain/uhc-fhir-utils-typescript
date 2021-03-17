/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { R4 } from "@ahryman40k/ts-fhir-types";
import { CodingSystem } from "..";
import { getDisplayOrTextByCodeSNOMED } from "./Snomed";
import { createBundleDocumentWithComposition } from "./Bundle";
import { terminologyCodesLOINC, getDisplayOrTextByCodeLOINC } from "./Loinc";
export function getChoiceNameFromValueFHIR(fhir) {
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
export function addObservationAsMemberToMainObservation(member, main) {
    let members = main.hasMember || [];
    members.push(...members, {
        reference: member.id
    });
    main.hasMember = members;
    return main;
}
export function createBloodTypingMainBundleFHIR() {
    let mainBloodTypingObservation = {
        resourceType: 'Observation',
        code: {
        // text: BLOOD_TYPING_MAIN_CODE_TEXT
        },
        // TODO: category, effectiveDateTime, subject, ...
        status: R4.ObservationStatusKind._final
    };
    let bundle = createBundleDocumentWithComposition([mainBloodTypingObservation]);
    return bundle;
}
export function createBloodTypeFHIRObservationFromSNOMED(snomedCode, language) {
    let bloodTypeCodeableConcept = createABOBloodTypeCodeableConceptFromSNOMED(snomedCode);
    if (!bloodTypeCodeableConcept.coding || bloodTypeCodeableConcept.coding.length <= 0 || !bloodTypeCodeableConcept.coding[0].code || bloodTypeCodeableConcept.coding[0].code == "")
        return {};
    // TODO: createFHIRCodingFromLOINC with getDisplayFromSNOMED
    let observationTypeCoding = {
        system: CodingSystem.loinc,
        code: terminologyCodesLOINC.aboRH,
        display: getDisplayOrTextByCodeLOINC(terminologyCodesLOINC.aboRH)
    };
    let observationTypeCode = {
        coding: [observationTypeCoding]
    };
    // TODO: put getLocaleTextFromLOINC for "882-1" into observationTypeCode.text if any
    let observationDateTime = new Date().toISOString();
    let observation = {
        resourceType: "Observation",
        language: language,
        status: R4.ObservationStatusKind._final,
        code: observationTypeCode,
        valueCodeableConcept: bloodTypeCodeableConcept,
        effectiveDateTime: observationDateTime
    };
    return observation;
}
export function createABOBloodTypeCodeableConceptFromSNOMED(code) {
    let text = getDisplayOrTextByCodeSNOMED(code);
    if (!text || text == "")
        return {};
    let codeableConcept = {};
    codeableConcept.text = text;
    let coding = {};
    coding.code = code;
    // coding.userSelected = true   // do it in the frontend if required
    let display = getDisplayOrTextByCodeSNOMED(code);
    if (display && display != "")
        coding.display = display;
    // FHIR CodeableConcept contais an array of coding objects for different CODE_SYSTEMS
    codeableConcept.coding = [coding];
    return codeableConcept;
}
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
