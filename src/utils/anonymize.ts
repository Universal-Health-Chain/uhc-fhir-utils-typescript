/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

export const ANONYMIZATION:string[] = ["extension", "_extension", "meta", "note", "display", "_display", "text", "data", "url",
    "title", "description", "authorString", "comment", "extraDetails", "patientInstruction", "availableTime", "notAvailable", "availabilityExceptions",
    "subject", "patient", "name", "family", "_family", "given", "birthDate", "age", "address", "contact", "gender", "telecom", "maritalStatus",
     "reference", "identifier", "masterIdentifier", "id", "fullUrl"] 

// composition.section.entry will be empty in an IPS document, also observation.hasMembers (fix it?)
// TODO: remove identifier, performer should be empty
export function anonymizeResource(fhirResource: any): any {
    let keyNames:string[] = ANONYMIZATION
    // return anonymizeValuesHelper(fhirResource, keyNames)
    // let anonymizedObject:any = fhirResource

    let keys = Object.keys(fhirResource)
    keys.forEach(function(keyName){
        // if (!keyNames.includes(fhirResource[keyName])) delete fhirResource[keyName] 
        // else {
            // in case of array recursively check all the objects and save the array of anonymized objects in anonymizedObj[i]
            // if (fhirResource[keyName] instanceof Array && keyNames.includes(keyName)) delete fhirResource[keyName]
            if (fhirResource[keyName] instanceof Array && fhirResource[keyName].length && fhirResource[keyName]>0) {
                fhirResource[keyName].forEach (function (subKey:any, index:number) {
                    fhirResource[keyName][index] = anonymizeResource(fhirResource[keyName][index])
                })
            }

            // in case of object it does not remove the field, but put empty (undefined) data on it
            // if (typeof fhirResource[keyName]==="object" && keyNames.includes(keyName)) delete fhirResource[keyName]
            if ( (typeof fhirResource[keyName] == "object") ){ // && (fhirResource[keyName] !== null) ){
                let keys = Object.keys(fhirResource[keyName])
                if (keys.length && keys.length > 0){
                    keys.forEach( function(subKey:any, index:number) {
                        if (!keyNames.includes(subKey)) {
                            // it isn't a target, so search inside of the subkey
                            fhirResource[keyName][subKey] = anonymizeResource(fhirResource[keyName][subKey]) // , keyNames)
                        }
                        else {
                            // target was found
                            console.log("anonymizing ", subKey)
                            if ( fhirResource[keyName][subKey]  instanceof Array ){
                                // subKey = undefined, but not removing the subKey
                                delete fhirResource[keyName][subKey]    //  = []
                            }
                            else if ( typeof fhirResource[keyName][subKey] =="object" ){
                                // subKey = undefined, but not removing the subKey
                                delete fhirResource[keyName][subKey]    //  = {}
                            }
                            // it removes the data of the single value
                            else delete fhirResource[keyName][subKey] //.remove()
                        }
                    })
                }
            }

            else if (keyNames.includes(keyName)) delete fhirResource[keyName] // fhirResource[keyName].remove()
        // }
    })
    return fhirResource
}

// recursive function
function anonymizeValuesHelper(data:any, keyNames:string[]):any {
    let anonymized:any = []
    if (!data) return anonymized

    // in case of array recursively check all the objects and save the array of anonymized objects in anonymizedObj[i]
    if (data instanceof Array) {
      for (let i in data) {
        anonymized[i] = anonymizeValuesHelper(data[i], keyNames)
        // list = list.concat(findValuesHelper(obj[i], key, []))
      }
      // console.log("array anonymized")
      return anonymized
    }
    
    // in case of object it does not remove the field, but put empty (undefined) data on it
    if ((typeof data == "object") && (data !== null) ){
        let keys = Object.keys(data);
        if (keys.length > 0){
            for (let i:number = 0; i < keys.length; i++ ){
                let subKey = keys[i]
                // console.log("subKey = ", subKey, " | index = ", i,  " | keyNames = ", keyNames)
                if (!keyNames.includes(subKey)) {
                    // it isn't a target, so search inside of the subkey
                    anonymized[subKey] = anonymizeValuesHelper(data[subKey], keyNames)
                }
                else {
                    // target was found
                    // console.log("anonymizing ", subKey)
                    if ( data[subKey] instanceof Array ){
                        // subKey = undefined, but not removing the subKey
                        anonymized[subKey] = []
                    }
                    else if ( typeof data[subKey]=="object" ){
                        // subKey = undefined, but not removing the subKey
                        anonymized[subKey] = {}
                    }
                    // it removes the data of the single value
                    else delete anonymized[subKey] //.remove()
                }
            }
        }
        return anonymized
    }

    // it is a single value, so do not anonymize it and save the value as is
    anonymized = data
    return anonymized
}

function findValuesHelper(obj:any, key:string, list:any[]) {
    if (!obj) return list;
    if (obj instanceof Array) {
      for (var i in obj) {
          list = list.concat(findValuesHelper(obj[i], key, []));
      }
      return list;
    }
    if (obj[key]) list.push(obj[key]);
  
    if ((typeof obj == "object") && (obj !== null) ){
        var children = Object.keys(obj);
        if (children.length > 0){
            for (let i:number = 0; i < children.length; i++ ){
              list = list.concat(findValuesHelper(obj[children[i]], key, []));
            }
        }
    }
    return list;
}