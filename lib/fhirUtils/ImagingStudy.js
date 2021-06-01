"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImagingStudiesByDicomdirContent = exports.addInstancesToSerie = exports.createInstance = exports.addSeriesToStudy = exports.createSerie = exports.createImagingStudy = exports.ImagingStudy = void 0;
const uuid_1 = require("uuid");
class ImagingStudy {
    constructor() {
    }
    createImagingStudy(subject, idValue, idSystem, series) {
        return createImagingStudy(subject, idValue, idSystem, series);
    }
    createSerie(modalityCode, uid, number, instances) {
        return createSerie(modalityCode, uid, number, instances);
    }
    addSeriesToStudy(fhirStudy, fhirSeries) {
        return addSeriesToStudy(fhirStudy, fhirSeries);
    }
    createInstance(instanceUID, sopClassUID, number, title) {
        return createInstance(instanceUID, sopClassUID, number, title);
    }
    addInstancesToSerie(fhirSerie, fhirinstances) {
        return addInstancesToSerie(fhirSerie, fhirinstances);
    }
    // hierachical dicomdir structure is needed to create series and studies with recursive operations
    createImagingStudiesByDicomdirContent(subjectId, dicomdirPatients) {
        return createImagingStudiesByDicomdirContent(subjectId, dicomdirPatients);
    }
}
exports.ImagingStudy = ImagingStudy;
function createImagingStudy(subject, idValue, idSystem, series) {
    let subjectReference = {
        reference: subject
    };
    let fhirStudy = {
        id: uuid_1.v4(),
        resourceType: "ImagingStudy",
        subject: subjectReference,
        numberOfSeries: 0,
        numberOfInstances: 0
    };
    if (idValue) {
        let identifierValue;
        if (idSystem && idSystem == "urn:dicom:uid")
            identifierValue = "urn:oid:" + idValue;
        else
            identifierValue = idValue;
        fhirStudy.identifier = [{
                system: idSystem,
                value: identifierValue
            }];
    }
    if (series && series.length > 0)
        fhirStudy = addSeriesToStudy(fhirStudy, series);
    return fhirStudy;
}
exports.createImagingStudy = createImagingStudy;
function createSerie(modalityCode, uid, number, instances) {
    let modalityCoding = {
        system: "http://dicom.nema.org/resources/ontology/DCM",
        code: modalityCode
    };
    let serie = {
        modality: modalityCoding
    };
    if (uid)
        serie.uid = uid;
    else
        serie.uid = uuid_1.v4();
    if (instances && instances.length > 0)
        serie = addInstancesToSerie(serie, instances);
    return serie;
}
exports.createSerie = createSerie;
function addSeriesToStudy(fhirStudy, fhirSeries) {
    let result = fhirStudy;
    if (fhirSeries && fhirSeries.length && fhirSeries.length > 0) {
        fhirSeries.forEach(function (fhirSerie) {
            // result.series ? [...result.series, fhirSerie] : [fhirSerie]
            if (result.series)
                result.series.push(fhirSerie);
            else
                result.series = result.series = [fhirSerie];
            /*
            result.numberOfSeries ? result.numberOfSeries++ : result.numberOfSeries = 1
            result.numberOfInstances
                ? result.numberOfInstances + (fhirSerie.numberOfInstances || 0)
                : result.numberOfInstances = 1
            */
        });
    }
    // //console.log("addSeries result = ", result)
    return result;
}
exports.addSeriesToStudy = addSeriesToStudy;
function createInstance(instanceUID, sopClassUID, number, title) {
    let sopClassCoding = {
        system: "urn:ietf:rfc:3986",
        code: sopClassUID // The SOP Classes in the Storage Service Class identify the Composite IODs
    };
    let instance = {
        uid: instanceUID,
        sopClass: sopClassCoding
    };
    if (number)
        instance.number = number;
    if (title)
        instance.title = title;
    return instance;
}
exports.createInstance = createInstance;
function addInstancesToSerie(fhirSerie, fhirinstances) {
    let result = fhirSerie;
    if (fhirinstances && fhirinstances.length && fhirinstances.length > 0) {
        fhirinstances.forEach(function (fhirInstance) {
            if (result.instance)
                result.instance.push(fhirInstance);
            else
                result.instance = result.instance = [fhirInstance];
            // result.instance ? result.instance.push(fhirInstance) : result.instance=[fhirInstance]
            // result.numberOfInstances ? result.numberOfInstances++ : 1
        });
    }
    // //console.log("addInstances = ", result)
    return result;
}
exports.addInstancesToSerie = addInstancesToSerie;
// hierachical dicomdir structure is needed to create series and studies with recursive operations
function createImagingStudiesByDicomdirContent(subjectId, dicomdirPatients) {
    if (dicomdirPatients.length < 1 || !dicomdirPatients.length)
        return [];
    let fhirStudies = [];
    dicomdirPatients.forEach(function (patientObj, patientIndex, contentArray) {
        if (patientObj.children && patientObj.children.length && patientObj.children.length > 0) {
            patientObj.children.forEach(function (studyObj) {
                let fhirStudy = createImagingStudy(subjectId, studyObj.uid); // <- caution: 'uid' but not 'id'
                studyObj.numberOfSeries = studyObj.numberOfSeries = 0; // it initializes the number of series or the study
                if (studyObj.children && studyObj.children.length && studyObj.children.length > 0) {
                    fhirStudy.numberOfSeries = studyObj.children.length;
                    let instancesInStudy = 0; // it initializes the number of instances in the study    
                    let fhirSeries = [];
                    studyObj.children.forEach(function (serieObj) {
                        let fhirSerie = createSerie(serieObj.value, serieObj.uid, serieObj.number); // modality is the serieObj.value
                        if (serieObj.children && serieObj.children.length && serieObj.children.length > 0) {
                            let fhirInstances = [];
                            instancesInStudy = instancesInStudy + serieObj.children.length; // it adds the instances in the serie
                            serieObj.children.forEach(function (objInstance) {
                                // let title:string = getDicomImageViewPosition(dicomInstance.value) // View Position 0018,5101 Applied value(s): AP, LL, LLD, LLO, PA, RL, RLD, RLO
                                let fhirInstance = createInstance(objInstance.uid, objInstance.sopClassUID, objInstance.number);
                                fhirInstances.push(fhirInstance);
                            });
                            fhirSerie = addInstancesToSerie(fhirSerie, fhirInstances);
                        }
                        fhirSeries.push(fhirSerie);
                    });
                    fhirStudy = addSeriesToStudy(fhirStudy, fhirSeries);
                    fhirStudy.numberOfInstances = instancesInStudy;
                    // TODO: add endpoint
                    // let fhirEndpoint:R4.IEndpoint = { reference: ""}
                    // fhirStudy.endpoint = [fhirEndpoint]
                    //console.log("numberOfSeries in FHIR ImagingStudy =" + fhirStudy.numberOfSeries + " | numberOfInstancesInStudy=" + fhirStudy.numberOfInstances)    
                }
                fhirStudies.push(fhirStudy);
            });
        }
    });
    return fhirStudies;
}
exports.createImagingStudiesByDicomdirContent = createImagingStudiesByDicomdirContent;
/* SEE EXAMPLE:
  "identifier": [
    {
      "system": "urn:dicom:uid",
      "value": "urn:oid:2.16.124.113543.6003.1154777499.30246.19789.3503430045"
    }
  ],
  "status": "available",
  "subject": {
    "reference": "Patient/dicom"
  },
  "started": "2011-01-01T11:01:20+03:00",
  "numberOfSeries": 1,
  "numberOfInstances": 1,
  "series": [
    {
      "uid": "2.16.124.113543.6003.2588828330.45298.17418.2723805630",
      "number": 3,
      "modality": {
        "system": "http://dicom.nema.org/resources/ontology/DCM",
        "code": "CT"
      },
      "description": "CT Surview 180",
      "numberOfInstances": 1,
      "bodySite": {
        "system": "http://snomed.info/sct",
        "code": "67734004",
        "display": "Upper Trunk Structure"
      },
      "instance": [
        {
          "uid": "2.16.124.113543.6003.189642796.63084.16748.2599092903",
          "sopClass": {
            "system": "urn:ietf:rfc:3986",
            "code": "urn:oid:1.2.840.10008.5.1.4.1.1.2"
          },
          "number": 1
        }
      ]
    }
]
*/
