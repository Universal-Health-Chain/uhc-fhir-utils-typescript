/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import { R4 } from "@ahryman40k/ts-fhir-types";
const Bundle = require('./Bundle');
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
    let bundle = Bundle.createBundleDocumentWithComposition([mainBloodTypingObservation]);
    return bundle;
}
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
