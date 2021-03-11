/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"
import { v4 } from "uuid"
import { DicomdirContentPatient, DicomdirContentStudy, DicomdirContentSerie, DicomdirContentInstance } from "../models/DicomModels"

export function createImagingStudy(subject:string, idValue?:string, idSystem?:string, series?:R4.IImagingStudy_Series[]): R4.IImagingStudy{
    let subjectReference:R4.IReference = {
        reference: subject
    }
    let fhirStudy:R4.IImagingStudy = {
        id: v4(),
        resourceType: "ImagingStudy",
        subject: subjectReference,
        numberOfSeries: 0,
        numberOfInstances: 0
    }
    
    if (idValue) {
        let identifierValue:string
        if (idSystem && idSystem == "urn:dicom:uid") identifierValue = "urn:oid:" + idValue
        else identifierValue = idValue
        fhirStudy.identifier = [{
            system: idSystem,
            value: identifierValue
        }]
    }

    if (series && series.length>0) fhirStudy = addSeriesToStudy(fhirStudy, series)
    return fhirStudy
}

export function createSerie(modalityCode:string, uid?:string, number?:number, instances?:R4.IImagingStudy_Instance[]): R4.IImagingStudy_Series{
    let modalityCoding:R4.ICoding = {
        system: "http://dicom.nema.org/resources/ontology/DCM", // "1.2.840.10008.6.1.19",
        code: modalityCode
    }
    let serie:R4.IImagingStudy_Series = {
        modality: modalityCoding
    }

    if (uid) serie.uid = uid
    else serie.uid = v4()

    if (instances && instances.length>0) serie = addInstancesToSerie(serie, instances)

    
    return serie
}

export function addSeriesToStudy(fhirStudy: R4.IImagingStudy, fhirSeries:R4.IImagingStudy_Series[]): R4.IImagingStudy{
    let result:R4.IImagingStudy = fhirStudy
    if (fhirSeries && fhirSeries.length &&fhirSeries.length>0) {
        fhirSeries.forEach( function(fhirSerie:R4.IImagingStudy_Series) {
            // result.series ? [...result.series, fhirSerie] : [fhirSerie]
            if (result.series) result.series.push(fhirSerie)
            else result.series = result.series=[fhirSerie]
            /*
            result.numberOfSeries ? result.numberOfSeries++ : result.numberOfSeries = 1 
            result.numberOfInstances
                ? result.numberOfInstances + (fhirSerie.numberOfInstances || 0)
                : result.numberOfInstances = 1
            */
        })
    }
    // //console.log("addSeries result = ", result)
    return result
}

export function createInstance(instanceUID:string, sopClassUID:string,  number?:number, title?:string): R4.IImagingStudy_Instance {
    let sopClassCoding:R4.ICoding = {
        system: "urn:ietf:rfc:3986",
        code: sopClassUID  // The SOP Classes in the Storage Service Class identify the Composite IODs
    }
    let instance:R4.IImagingStudy_Instance = {
        uid: instanceUID,
        sopClass: sopClassCoding
    }
    if (number) instance.number = number
    if (title) instance.title = title
    return instance
}

export function addInstancesToSerie(fhirSerie:R4.IImagingStudy_Series, fhirinstances:R4.IImagingStudy_Instance[]): R4.IImagingStudy_Series{
    let result:R4.IImagingStudy_Series = fhirSerie
    if (fhirinstances && fhirinstances.length && fhirinstances.length>0) {
        fhirinstances.forEach( function(fhirInstance:R4.IImagingStudy_Instance) {
            if (result.instance) result.instance.push(fhirInstance)
            else result.instance = result.instance=[fhirInstance]
            // result.instance ? result.instance.push(fhirInstance) : result.instance=[fhirInstance]
            // result.numberOfInstances ? result.numberOfInstances++ : 1
        })
    }
    // //console.log("addInstances = ", result)
    return result
}

// hierachical dicomdir structure is needed to create series and studies with recursive operations
export function createImagingStudiesByDicomdirContent(subjectId:string, dicomdirPatients:DicomdirContentPatient[]): R4.IImagingStudy[] {
    if (dicomdirPatients.length<1 || !dicomdirPatients.length) return [] as R4.IImagingStudy[]

    let fhirStudies:R4.IImagingStudy[] = []
    dicomdirPatients.forEach( function(patientObj:DicomdirContentPatient, patientIndex:number, contentArray:DicomdirContentPatient[]) {
        if (patientObj.children && patientObj.children.length && patientObj.children.length>0){
            patientObj.children.forEach( function(studyObj:DicomdirContentStudy){
                let fhirStudy:R4.IImagingStudy = createImagingStudy(subjectId, studyObj.uid) // <- caution: 'uid' but not 'id'
                studyObj.numberOfSeries=studyObj.numberOfSeries=0   // it initializes the number of series or the study
                if (studyObj.children && studyObj.children.length && studyObj.children.length>0) {
                    
                    fhirStudy.numberOfSeries = studyObj.children.length
                    let instancesInStudy:number = 0    // it initializes the number of instances in the study    
                    let fhirSeries: R4.IImagingStudy_Series[] = []
                    studyObj.children.forEach( function(serieObj:DicomdirContentSerie) {
                        let fhirSerie:R4.IImagingStudy_Series = createSerie(serieObj.value, serieObj.uid, serieObj.number)    // modality is the serieObj.value
                        if (serieObj.children && serieObj.children.length && serieObj.children.length>0) {
                            
                            let fhirInstances:R4.IImagingStudy_Instance[] = []
                            instancesInStudy = instancesInStudy + serieObj.children.length // it adds the instances in the serie
                            serieObj.children.forEach( function(objInstance:DicomdirContentInstance) {
                                // let title:string = getDicomImageViewPosition(dicomInstance.value) // View Position 0018,5101 Applied value(s): AP, LL, LLD, LLO, PA, RL, RLD, RLO
                                let fhirInstance:R4.IImagingStudy_Instance = createInstance(objInstance.uid, objInstance.sopClassUID, objInstance.number)
                                fhirInstances.push(fhirInstance)
                            })

                            fhirSerie = addInstancesToSerie(fhirSerie, fhirInstances)
                        }
                        fhirSeries.push(fhirSerie)
                    })

                    fhirStudy = addSeriesToStudy(fhirStudy, fhirSeries)
                    fhirStudy.numberOfInstances = instancesInStudy
                    // TODO: add endpoint
                    // let fhirEndpoint:R4.IEndpoint = { reference: ""}
                    // fhirStudy.endpoint = [fhirEndpoint]
                    //console.log("numberOfSeries in FHIR ImagingStudy =" + fhirStudy.numberOfSeries + " | numberOfInstancesInStudy=" + fhirStudy.numberOfInstances)    
                }
                fhirStudies.push(fhirStudy)
            })
        }
    })
    return fhirStudies
}

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
