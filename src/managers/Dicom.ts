/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import * as dicom from 'dicom-parser'
import { DicomdirContentPatient, DicomdirContentStudy, DicomdirContentSerie, DicomdirContentInstance } from '../models/DicomModels'
import { R4 } from '@ahryman40k/ts-fhir-types'
import { createFhirAttachment } from './Attachment'

const Bundle = require ("./Bundle")
// const Attachment = require ("./Attachment") // for using the method instead of another function

export function getDicomdirContent(blobFileAsUint8ArrayOfBytes:Uint8Array): DicomdirContentPatient[] {
    let dataSetSecuentialArray = buildDicomSecuentialArray(blobFileAsUint8ArrayOfBytes)
    let hierarchicalArray = buildDicomdirHierarchy(dataSetSecuentialArray)
    return hierarchicalArray
}

export function createFhirDocument(imagingStudy:R4.IImagingStudy, dcmResources?:R4.IDocumentReference[]): R4.IBundle {
    let fhirResources:any[] = []
    if (dcmResources && dcmResources.length && dcmResources.length > 0) fhirResources = [imagingStudy, ...dcmResources]
    else fhirResources = [imagingStudy]
    return Bundle.createBundleDocumentWithComposition(fhirResources)
}

// TODO: add hash SHA1
/*
function createFhirAttachmentByDCM(blobFileAsUint8ArrayOfBytes:Uint8Array): R4.IAttachment {
    let instanceDataSet:dicom.DataSet = dicom.parseDicom(blobFileAsUint8ArrayOfBytes)
    let blobBytesHash:string = sha1Base64OfUint8Array(blobFileAsUint8ArrayOfBytes)
    let blobSize:number = (blobFileAsUint8ArrayOfBytes.length + 1)
    return createFhirAttachment(instanceDataSet, blobBytesHash, blobSize)
}
*/

/*
export function createDcmFhirDocReference(blobFileAsUint8ArrayOfBytes:Uint8Array): R4.IDocumentReference {
    let contentAttachment:R4.IAttachment = createFhirAttachmentByDCM(blobFileAsUint8ArrayOfBytes)
    let fhirContent:R4.IDocumentReference_Content = { attachment: contentAttachment }
    
    let instanceDataSet:dicom.DataSet = dicom.parseDicom(blobFileAsUint8ArrayOfBytes)
    let identifiers:R4.IIdentifier[] = generateFhirIdentifiersByInstanceDataSet(instanceDataSet)
    
    // The DocumentReference.id is the DICOM's instance UID
    let id:string = this. getInstanceUidByInstanceDataSet(instanceDataSet)

    let documentReference:R4.IDocumentReference = createDocumentReference([fhirContent], id, identifiers)        
    documentReference.status = R4.DocumentReferenceStatusKind._current  // mandatory
    return documentReference
}
*/

function generateFhirIdentifiersByInstanceDataSet(instanceDataSet:dicom.DataSet): R4.IIdentifier[] {
    let studyIdentifier:R4.IIdentifier = {
        system: "urn:dicom:uid",
        type: {text: "studyId"},
        value: getDicomStudyId(instanceDataSet)
    }
    let serieIdentifier:R4.IIdentifier = {
        system: "urn:dicom:uid",
        type: {text: "seriesId"},
        value: getDicomSeriesInstanceUID(instanceDataSet)
    }
    let instanceIdentifier:R4.IIdentifier = {
        system: "urn:dicom:uid",
        type: {
            text: "studyId"
        },
        use: R4.IdentifierUseKind._official,
        value: getInstanceUidByInstanceDataSet(instanceDataSet)
    }
    let fhirIdentifiers:R4.IIdentifier[] = [instanceIdentifier, serieIdentifier, studyIdentifier]
    // console.log("fhir identifiers = ", JSON.stringify(fhirIdentifiers))
    return fhirIdentifiers 
}

function createDicomAttachment(instanceDataSet:dicom.DataSet, blobBytesHash:string, blobSize:number): R4.IAttachment {
    let url:string = getInstanceUrlPathByInstanceDataSet(instanceDataSet)
    let mimeType:string = "application/dicom"
    let pixelData:Uint8Array = getDicomPixelData(instanceDataSet)
    
    // Original creation datetime of the instance as date attachment was first created
    // let creationDateTime:string = 
    
    // The id of the attachement must be the id of the DCM file stored in the S3 service?
    // let id:string = this.getInstanceUidByInstanceDataSet(instanceDataSet)    // do not use the DICOM's UID as the id of the attachment, but of  or as the id of the DocumentReference wich contains this attachemnt
    
    return createFhirAttachment(mimeType, undefined, url, undefined, undefined, blobBytesHash, blobSize)
}

export function getStudyTextDescription(study:DicomdirContentStudy): string {
    return study.description
}

export function getStudyDateTime(study:DicomdirContentStudy): string {
    return study.value
}

export function getSerieTextDescription(serie:DicomdirContentSerie): string {
    return serie.description
}

export function getSerieModalityClass(serie:DicomdirContentSerie): string {
    return serie.value  // the modality class
}

export function getComposedUrlPathOfDCM(dcmBytes:Uint8Array): string {
    const instanceDataSet = dicom.parseDicom(dcmBytes)
    return getInstanceUrlPathByInstanceDataSet(instanceDataSet)    // Values within the DCM file
}

export function getInstanceUrlPathByInstanceDataSet(instanceDataSet:dicom.DataSet): string {    
    const studyUID:string = getDicomStudyId(instanceDataSet)
    const serieUID:string = getDicomSeriesInstanceUID(instanceDataSet)
    const instanceUID:string = getDicomMediaStorageSOPInstanceUID(instanceDataSet)
    return studyUID + "/" + serieUID + "/" + instanceUID    // It returns the values within the DCM file
}

export function getPixelDataInDCM(dcmBytes:Uint8Array): Uint8Array {
    const instanceDataSet = dicom.parseDicom(dcmBytes)
    return getDicomPixelData(instanceDataSet)
}

export function getHeightAndWidth(instanceDataSet:dicom.DataSet): number[] {
    return [getDicomRows(instanceDataSet), getDicomColumns(instanceDataSet)]
}

export function getHeightAndWidthOfDCM(dcmBytes:Uint8Array): number[] {
    const instanceDataSet = dicom.parseDicom(dcmBytes)
    return getHeightAndWidth(instanceDataSet)
}

export function getInstanceUidInDCM(dcmBytes:Uint8Array): string {
    const instanceDataSet:dicom.DataSet = dicom.parseDicom(dcmBytes)
    return getInstanceUidByInstanceDataSet(instanceDataSet)
}

export function getInstanceUidByInstanceDataSet(instanceDataSet:dicom.DataSet): string {
    return getDicomMediaStorageSOPInstanceUID(instanceDataSet)
}

export function getDicomPixelData(dataSet:dicom.DataSet): Uint8Array {
    const pixelDataElement:dicom.Element = dataSet.elements.x7fe00010 || dataSet.elements.x7fe00008
    // create a typed array on the pixel data (this example assumes 8 bit unsigned data)
    var pixelData:Uint8Array = new Uint8Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length);
    return pixelData
}

// Invoke the parseDicom function and get back a DataSet object with the contents
export function buildDicomSecuentialArray(blobByteArray:Uint8Array): any[] {
    let dataSet:dicom.DataSet
    let output = []
    try {
        dataSet = dicom.parseDicom(blobByteArray)
        output = dicomSecuentialArrayByParsedDataSet(dataSet)
    } catch(err) {
        if (typeof err.dataSet != 'undefined') console.warn("No dataset parsed")
    }
    // //console.log("dicomSecuentialArray = ", output)
    return output
}

// build secuential array (without children elements)
function dicomSecuentialArrayByParsedDataSet(dataSet:dicom.DataSet): any[] {
    if (!dataSet.elements || typeof dataSet.elements === "undefined") return []
    if (!dataSet.elements || !dataSet.elements.x00041220 || !dataSet.elements.x00041220.items) {
        console.warn("No Directory Record Sequence data was found.");
        return []
    }

    let directoryElements:dicom.Element[] = dataSet.elements.x00041220.items
    let output:any = []
    if (directoryElements.length > 0) {
        directoryElements.forEach((dicomElement:dicom.Element, index:number) => {
            const id = index.toString()
            if (dicomElement.dataSet) {
                // TODO: convert to FHIR and ISO datetime
                // It checks the Directory Record Type: http://dicom.nema.org/dicom/2013/output/chtml/part03/sect_F.3.html
                if (dicomElement.dataSet.string('x00041430') === 'PATIENT') {
                    const patientUID:string = getDicomPatientId(dicomElement.dataSet)
                    let objStudy:DicomdirContentPatient = {id: id, uid: patientUID, key: 'patient', value: getDicomPatientName(dicomElement.dataSet), expanded: true}
                    output.push( objStudy )

                } else if (dicomElement.dataSet.string('x00041430') === 'STUDY') {
                    const studyUID:string = getDicomStudyId(dicomElement.dataSet)
                    const dateTime:string = dicomDateToLocale(getDicomStudyDate(dicomElement.dataSet)) + " - " + dicomTimeToStr(getDicomStudyTime(dicomElement.dataSet))
                    const description:string = getDicomStudyDescription(dicomElement.dataSet)
                    let objStudy:DicomdirContentStudy = {id: id, uid: studyUID, key: 'study', description: description, value: dateTime, expanded: true}
                    output.push(objStudy)

                } else if (dicomElement.dataSet.string('x00041430') === 'SERIES') {
                    const serieUID:string = getDicomSeriesInstanceUID(dicomElement.dataSet)
                    const number:number = getDicomSeriesNumber(dicomElement.dataSet)
                    const modality:string = getDicomModality(dicomElement.dataSet)
                    const description:string = getDicomSeriesDescription(dicomElement.dataSet)
                    let objSerie:DicomdirContentSerie = {id: id, uid: serieUID, key: 'series', description: description, number: number, value: modality, expanded: true}
                    output.push(objSerie)

                } else if (dicomElement.dataSet.string('x00041430') === 'IMAGE') {
                    // //console.log("Instance element in directoryElements at entry = ", index) // at [3] and so on
                    const instanceUID:string = getDicomReferencedSOPInstanceUIDInFile(dicomElement.dataSet) // Use it when reading a DICOMDIR file
                    const sopClassUID:string = getDicomReferencedSOPClassUIDinFile(dicomElement.dataSet)    // Instead of getDicomImageSopClassUID <-undefined
                    const number:number = getDicomInstanceNumber(dicomElement.dataSet)
                    const filePath:string = getDicomReferencedFileIDAttribute(dicomElement.dataSet)
                    let path:string = filePath.replace(/\\/g, '/')
                    let fileName:any = filePath.split('\\').pop()   // 'any' instead of 'string' type to allow 'undefined'
                    // TODO: getDicomImageLaterality and getDicomBodyPartExamined not found in our tests, so they hadn't been added for this reason
                    let objInstance:DicomdirContentInstance = {id: id, uid: instanceUID, key: 'image', sopClassUID: sopClassUID, number: number, path: path, value: fileName, expanded: true}
                    output.push(objInstance)
                }
            }
        })
    }
    return output
}

// It creates an hierarchical object by a previously parsed and expanded array of data
export function buildDicomdirHierarchy(secuentialArray:any[], id = null): DicomdirContentPatient[] {
    // if (id && id !== null) { output[id].expanded = !output[id].expanded }
    let images:DicomdirContentInstance[] = []
    let series:DicomdirContentSerie[] = []
    let study:DicomdirContentStudy[] = []
    let patient:DicomdirContentPatient[] = []
    secuentialArray.slice().reverse().forEach((obj, i) => {
        if (obj.key === 'image') {
            let objInstance:DicomdirContentInstance = {id: obj.id, uid:obj.uid, key: obj.key, sopClassUID: obj.sopClassUID, number:obj.number, path: obj.path, value: obj.value}
            images.unshift(objInstance)
        } else if (obj.key === 'series') {
            let objSerie:DicomdirContentSerie = {id: obj.id, uid:obj.uid, key: obj.key, description: obj.description, number: obj.number, value: obj.value, expanded: obj.expanded, children: images}
            series.unshift(objSerie)
            images = [] // clears the images
        } else if (obj.key === 'study') {
            let objStudy:DicomdirContentStudy = {id: obj.id, uid:obj.uid, key: obj.key, description: obj.description, value: obj.value, expanded: obj.expanded, children: series}
            study.unshift(objStudy)
            series = [] // clears the series
        } else if (obj.key === 'patient') {
            let objPatient:DicomdirContentPatient = {id: obj.id, uid:obj.uid, key: obj.key, value: obj.value, expanded: obj.expanded, children: study}
            patient.unshift(objPatient)
            study = []  // clears the studies
        }
    })
    return putNumberOfDicomSeriesAndInstancesInStudies(patient)
}

function putNumberOfDicomSeriesAndInstancesInStudies(dicomdirPatients:DicomdirContentPatient[]): DicomdirContentPatient[]  {
    if (!dicomdirPatients.length || dicomdirPatients.length<1) return dicomdirPatients

    dicomdirPatients.forEach( function(patientObj:DicomdirContentPatient, patientIndex:number, contentArray:DicomdirContentPatient[]) {
        if (patientObj.children && patientObj.children.length && patientObj.children.length>0){
            patientObj.children.forEach( function(studyObj:DicomdirContentStudy, studyIndex:number, patientArray){
                studyObj.numberOfSeries=studyObj.numberOfSeries=0   // it initializes to 0
                if (studyObj.children && studyObj.children.length && studyObj.children.length>0) {
                    patientArray[studyIndex].numberOfSeries = studyObj.children.length
                    let numberOfInstances:number = 0    // it initializes the number of instances in the study
                    studyObj.children.forEach( function(serieObj:any, serieIndex:number){
                        if (serieObj.children && serieObj.children.length && serieObj.children.length>0) {
                            numberOfInstances = numberOfInstances + serieObj.children.length // it adds the instances in the serie
                        }
                    })
                    patientArray[studyIndex].numberOfInstances = numberOfInstances
                    // //console.log("numberOfSeriesInStudy=" + studyObj.numberOfSeries + " | numberOfInstancesInStudy=" + studyObj.numberOfInstances)
                }
            })
        }
    })
    return dicomdirPatients
}

export function getImagePathsByDicomdirStudyContent(studyContent:DicomdirContentStudy): string[] {
    let results:string[] = []
    if (studyContent.children && studyContent.children.length && studyContent.children.length>0) {
        studyContent.children.forEach( function(serieContent:DicomdirContentSerie) {
            if (serieContent.children && serieContent.children.length && serieContent.children.length>0) {
                serieContent.children.forEach( function(instanceContent:DicomdirContentInstance) {
                    if (instanceContent.path) results.push(instanceContent.path)
                })
            }
        })
    }
    return results
}

export function getContentStudies(dicomdirContent:DicomdirContentPatient[]): DicomdirContentStudy[] {
    let contentStudies:DicomdirContentStudy[] = []
    if (dicomdirContent.length && dicomdirContent.length>0) {
        //dicomdirContent.forEach( function(patientContent:DicomdirContentPatient){} )
        const patientContent:DicomdirContentPatient = dicomdirContent[0]
        if (patientContent.children && patientContent.children.length && patientContent.children.length>0) {
            patientContent.children.forEach (function (studyContent:DicomdirContentStudy) {
                contentStudies.push(studyContent)
            })
        }
    }
    return contentStudies
}

// --- Directory Content ---
export function getDicomFileSetId(dataSet:dicom.DataSet):string {
    return dataSet.string('x00041130')
}

export function getDicomTransferSyntaxUid(dataSet:dicom.DataSet):string {
    return dataSet.string('x00020010')
}

export function getDicomImplementationClassUid(dataSet:dicom.DataSet):string {
    return dataSet.string('x00020012')
}

export function getDicomImplementationVersionName(dataSet:dicom.DataSet):string {
    return dataSet.string('x00020013')
}

export function getDicomManufacturer(dataSet:dicom.DataSet):string {
    return dataSet.string('x00080070')
}

export function getDicomManufacturersModelName(dataSet:dicom.DataSet):string {
    return dataSet.string('x00081090')
}

export function getDicomDeviceSerialNumber(dataSet:dicom.DataSet):string {
    return dataSet.string('x00181000')
}

// Use as study.value instead of date - time
export function getDicomProtocolName(dataSet:dicom.DataSet):string {
    return dataSet.string('x00181030')
}

export function getDicomInstitutionName(dataSet:dicom.DataSet):string {
    return dataSet.string('x00080080')
}

export function getDicomInstitutionAddress(dataSet:dicom.DataSet):string {
    return dataSet.string('x00080081')
}

export function getDicomStationName(dataSet:dicom.DataSet):string {
    return dataSet.string('x00081010')
}

export function getDicomInstitutionalDepartmentName(dataSet:dicom.DataSet):string {
    return dataSet.string('x00081040')
}

// Physician(s) of Record: physician(s) who are responsible for overall patient care at time of Study
export function getDicomPhysicianOfRecord(dataSet:dicom.DataSet):string {
    return dataSet.string('x00081048')
}

// Name of Physician(s) Reading Study
export function getDicomSPhysicianReadingStudy(dataSet:dicom.DataSet):string {
    return dataSet.string('x00081060')
}

// Operators' Name: Name(s) of the operator(s) supporting the Series.
export function getDicomOperatorsName(dataSet:dicom.DataSet):string {
    return dataSet.string('x00081070')
}

// Use as the UID of the study, but not the StudyID (x00200010 is a number, not OID)
export function getDicomStudyInstanceUID(dataSet:dicom.DataSet):string {
    return dataSet.string('x0020000d')
}

// Instance Creation Date (0008,0012) + Instance Creation Time (0008,0013) + Timezone Offset From UTC (0008,0201)
export function getDicomInstanceCreation(dataSet:dicom.DataSet): string {
    let creationDate:string = getDicomInstanceCreationDate(dataSet)
    let creationTime:string = getDicomInstanceCreationTime(dataSet)
    let creationOffset:string = getTimezoneOffsetFromUTC(dataSet)
    let creationDateTime:string = dicomDateToLocale(creationDate)+"T"+dicomTimeToStr(creationTime)+dicomTimeToStr(creationOffset)
    return creationDateTime
}

export function getDicomInstanceCreationDate(dataSet:dicom.DataSet):string{
    return dataSet.string('x00080012')
}

export function getDicomInstanceCreationTime (dataSet:dicom.DataSet):string{
    return dataSet.string('x00080013')
}

export function getTimezoneOffsetFromUTC(dataSet:dicom.DataSet):string{
    return dataSet.string('x00080201')
}

export function getDicomReferencedSOPClassUIDinFile(dataSet:dicom.DataSet) {
    return dataSet.string('x00041510')  // Referenced SOP Class UID in File Attribute: Tag	(0004,1510)
}

export function getDicomLaterality(dataSet:dicom.DataSet) {
    return dataSet.string('x00200060')
}

export function getDicomImageLaterality(dataSet:dicom.DataSet) {
    return dataSet.string('x00200062')
}

export function getDicomBodyPartExamined(dataSet:dicom.DataSet) {
    return dataSet.string('x00080015')
}

// Some IODs support the Anatomic Region Sequence, which can provide a more comprehensive mechanism for specifying the body part being examined
export function getDicomAnatomicRegionSequence(dataSet:dicom.DataSet) {
    return dataSet.string('x00082218')
}

export function getDicomReferencedFileIDAttribute(dataSet:dicom.DataSet) {
    return dataSet.string('x00041500')
}

export function getDicomPatientId(dataSet:dicom.DataSet) {
    return dataSet.string('x00100020')
}

export function getDicomPatientName(dataSet:dicom.DataSet) {
    return dataSet.string('x00100010')
}

export function getDicomStudyId(dataSet:dicom.DataSet) {
    return dataSet.string('x00200010')
}

export function getDicomStudyDate(dataSet:dicom.DataSet) {
    return dataSet.string('x00080020')
}

export function getDicomStudyTime(dataSet:dicom.DataSet) {
    return dataSet.string('x00080030')
}

export function getDicomStudyDescription(dataSet:dicom.DataSet) {
    return dataSet.string('x00081030')
}

export function getDicomSeriesInstanceUID(dataSet:dicom.DataSet) {
    return dataSet.string('x0020000e')
}

export function getDicomSeriesDate(dataSet:dicom.DataSet) {
    return dataSet.string('x00080021')
}

export function getDicomSeriesTime(dataSet:dicom.DataSet) {
    return dataSet.string('x00080031')
}

export function getDicomPhysicianName(dataSet:dicom.DataSet) {
    return dataSet.string('x00081050')  // Name of the physician(s) administering the Series
}

export function getDicomSeriesDescription(dataSet:dicom.DataSet) {
    return dataSet.string('x0008103e')
}

export function getDicomSeriesNumber(dataSet:dicom.DataSet) {
    return parseFloat(dataSet.string('x00200011'))
}

export function getDicomModality(dataSet:dicom.DataSet) {
    return dataSet.string('x00080060')
}

export function getDicomIpp(dataSet:dicom.DataSet, index:any) {
    const value = dataSet.string('x00200032')
    const ipp = value.split('\\')
    return parseFloat(ipp[index])
}

export function getDicomFrameOfReferenceUID(dataSet:dicom.DataSet) {
    return dataSet.string('x00200052')
}

export function getDicomPixelSpacing(dataSet:dicom.DataSet, index: any) {
    const value = dataSet.string('x00280030')
    const pixelSpacing = value.split('\\')
    return pixelSpacing[index]
}

export function getDicomSpacingBetweenSlice(dataSet:dicom.DataSet) {
    return parseFloat(dataSet.string('x00180088'))
}

export function getDicomSliceThickness(dataSet:dicom.DataSet) {
    return parseFloat(dataSet.string('x00180050'))
}

export function getDicomEchoNumber(dataSet:dicom.DataSet) {
    return parseFloat(dataSet.string('x00180086'))
}

export function getDicomPatientPosition(dataSet:dicom.DataSet) {
    return dataSet.string('x00185100')
}

export function getDicomSliceLocation(dataSet:dicom.DataSet) {
    return parseFloat(dataSet.string('x00201041'))
}

export function getDicomInstanceNumber(dataSet:dicom.DataSet) {
    return parseFloat(dataSet.string('x00200013'))
}

export function getDicomRows(dataSet:dicom.DataSet) {
    return dataSet.uint16('x00280010')
}

export function getDicomColumns(dataSet:dicom.DataSet) {
    return dataSet.uint16('x00280011')
}

export function isLocalizer(dataSet:dicom.DataSet) {
    const values = dataSet.string('x00080008').split('\\')
    // //console.log('Localizer: ', values)
    return values.length === 3 && values[2] === 'LOCALIZER'
}

export function getLocalizer(dataSet:dicom.DataSet) {
    const value:string = dataSet.string('x00080008')
    if (value) {
        let values:string[] = value.split('\\')
        return values[values.length-1]  // the last value
    }
    return
}

export function getDicomImageXOnRows(dataSet:dicom.DataSet): boolean {
    const iop = dataSet.string('x00200037').split('\\').map((v: string) => parseFloat(v))
    if (iop[0] > iop[1]) return true
    else return false
}

export function getDicomImageSopClassUID(dataSet:dicom.DataSet) {
    return dataSet.string('x00080016')
}

// The following are the same UID value
// USE THIS ONE WHEN READING A DCM FILE: ReferencedSOPInstanceUIDInFile
export function getDicomMediaStorageSOPInstanceUID(dataSet:dicom.DataSet) {
    return dataSet.string('x00020003')
}

// USE THIS ONE WHEN READING THE UID OF THE INSTANCES WITHIN A DICOMDIR FILE
export function getDicomReferencedSOPInstanceUIDInFile(dataSet:dicom.DataSet) {
    return dataSet.string('x00041511')
}

export function getDicomSOPInstanceUID(dataSet:dicom.DataSet) {
    return dataSet.string('x00080018')
}

export function getDicomFailedSOPInstanceUIDList(dataSet:dicom.DataSet) {
    return dataSet.string('x00080058')
}

export function getDicomSeferencedSOPInstanceUID(dataSet:dicom.DataSet) {
    return dataSet.string('x00081155')
}

export function getDicomImageViewPosition(dataSet:dicom.DataSet) {
    return dataSet.string('x00185101')  // View Position Applied value(s): AP, LL, LLD, LLO, PA, RL, RLD, RLO
}

export function dicomDateToLocale(dcmDate:string) {
    const date = new Date(dcmDate.substring(0, 4)+'-'+dcmDate.substring(4, 6)+'-'+dcmDate.substring(6))
    const localeDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    return localeDate
}

export function dicomTimeToStr(dcmTime:string) {
    const time = dcmTime.substring(0, 2)+':'+dcmTime.substring(2, 4)+':'+dcmTime.substring(4, 6)
    return time
}

export function dicomDateTimeToLocale(dateTime:string) {
    const date = new Date(dateTime.substring(0, 4)+'-'+dateTime.substring(4, 6)+'-'+dateTime.substring(6, 8))
    const time = dateTime.substring(9, 11)+':'+dateTime.substring(11, 13)+':'+dateTime.substring(13, 15)
    const localeDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    return `${localeDate} - ${time}`
}

export function dicomDateTimeToIso(dateTime:string) {
    const date = new Date(dateTime.substring(0, 4)+'-'+dateTime.substring(4, 6)+'-'+dateTime.substring(6, 8))
    const time = dateTime.substring(9, 11)+':'+dateTime.substring(11, 13)+':'+dateTime.substring(13, 15)
    const localeDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    return `${localeDate}T${time}`
}
