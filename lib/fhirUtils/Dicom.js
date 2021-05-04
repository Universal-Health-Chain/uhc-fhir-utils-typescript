/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
import * as dicom from 'dicom-parser';
import { R4 } from '@ahryman40k/ts-fhir-types';
import { createFhirAttachment } from './Attachment';
const Bundle = require("./Bundle");
// const Attachment = require ("./Attachment") // for using the method instead of another function
export function getDicomdirContent(blobFileAsUint8ArrayOfBytes) {
    let dataSetSecuentialArray = buildDicomSecuentialArray(blobFileAsUint8ArrayOfBytes);
    let hierarchicalArray = buildDicomdirHierarchy(dataSetSecuentialArray);
    return hierarchicalArray;
}
export function createFhirDocument(imagingStudy, dcmResources) {
    let fhirResources = [];
    if (dcmResources && dcmResources.length && dcmResources.length > 0)
        fhirResources = [imagingStudy, ...dcmResources];
    else
        fhirResources = [imagingStudy];
    return Bundle.createBundleDocumentWithComposition(fhirResources);
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
function generateFhirIdentifiersByInstanceDataSet(instanceDataSet) {
    let studyIdentifier = {
        system: "urn:dicom:uid",
        type: { text: "studyId" },
        value: getDicomStudyId(instanceDataSet)
    };
    let serieIdentifier = {
        system: "urn:dicom:uid",
        type: { text: "seriesId" },
        value: getDicomSeriesInstanceUID(instanceDataSet)
    };
    let instanceIdentifier = {
        system: "urn:dicom:uid",
        type: {
            text: "studyId"
        },
        use: R4.IdentifierUseKind._official,
        value: getInstanceUidByInstanceDataSet(instanceDataSet)
    };
    let fhirIdentifiers = [instanceIdentifier, serieIdentifier, studyIdentifier];
    // console.log("fhir identifiers = ", JSON.stringify(fhirIdentifiers))
    return fhirIdentifiers;
}
function createDicomAttachment(instanceDataSet, blobBytesHash, blobSize) {
    let url = getInstanceUrlPathByInstanceDataSet(instanceDataSet);
    let mimeType = "application/dicom";
    let pixelData = getDicomPixelData(instanceDataSet);
    // Original creation datetime of the instance as date attachment was first created
    // let creationDateTime:string = 
    // The id of the attachement must be the id of the DCM file stored in the S3 service?
    // let id:string = this.getInstanceUidByInstanceDataSet(instanceDataSet)    // do not use the DICOM's UID as the id of the attachment, but of  or as the id of the DocumentReference wich contains this attachemnt
    return createFhirAttachment(mimeType, undefined, url, undefined, undefined, blobBytesHash, blobSize);
}
export function getStudyTextDescription(study) {
    return study.description;
}
export function getStudyDateTime(study) {
    return study.value;
}
export function getSerieTextDescription(serie) {
    return serie.description;
}
export function getSerieModalityClass(serie) {
    return serie.value; // the modality class
}
export function getComposedUrlPathOfDCM(dcmBytes) {
    const instanceDataSet = dicom.parseDicom(dcmBytes);
    return getInstanceUrlPathByInstanceDataSet(instanceDataSet); // Values within the DCM file
}
export function getInstanceUrlPathByInstanceDataSet(instanceDataSet) {
    const studyUID = getDicomStudyId(instanceDataSet);
    const serieUID = getDicomSeriesInstanceUID(instanceDataSet);
    const instanceUID = getDicomMediaStorageSOPInstanceUID(instanceDataSet);
    return studyUID + "/" + serieUID + "/" + instanceUID; // It returns the values within the DCM file
}
export function getPixelDataInDCM(dcmBytes) {
    const instanceDataSet = dicom.parseDicom(dcmBytes);
    return getDicomPixelData(instanceDataSet);
}
export function getHeightAndWidth(instanceDataSet) {
    return [getDicomRows(instanceDataSet), getDicomColumns(instanceDataSet)];
}
export function getHeightAndWidthOfDCM(dcmBytes) {
    const instanceDataSet = dicom.parseDicom(dcmBytes);
    return getHeightAndWidth(instanceDataSet);
}
export function getInstanceUidInDCM(dcmBytes) {
    const instanceDataSet = dicom.parseDicom(dcmBytes);
    return getInstanceUidByInstanceDataSet(instanceDataSet);
}
export function getInstanceUidByInstanceDataSet(instanceDataSet) {
    return getDicomMediaStorageSOPInstanceUID(instanceDataSet);
}
export function getDicomPixelData(dataSet) {
    const pixelDataElement = dataSet.elements.x7fe00010 || dataSet.elements.x7fe00008;
    // create a typed array on the pixel data (this example assumes 8 bit unsigned data)
    var pixelData = new Uint8Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length);
    return pixelData;
}
// Invoke the parseDicom function and get back a DataSet object with the contents
export function buildDicomSecuentialArray(blobByteArray) {
    let dataSet;
    let output = [];
    try {
        dataSet = dicom.parseDicom(blobByteArray);
        output = dicomSecuentialArrayByParsedDataSet(dataSet);
    }
    catch (err) {
        if (typeof err.dataSet != 'undefined')
            console.warn("No dataset parsed");
    }
    // //console.log("dicomSecuentialArray = ", output)
    return output;
}
// build secuential array (without children elements)
function dicomSecuentialArrayByParsedDataSet(dataSet) {
    if (!dataSet.elements || typeof dataSet.elements === "undefined")
        return [];
    if (!dataSet.elements || !dataSet.elements.x00041220 || !dataSet.elements.x00041220.items) {
        console.warn("No Directory Record Sequence data was found.");
        return [];
    }
    let directoryElements = dataSet.elements.x00041220.items;
    let output = [];
    if (directoryElements.length > 0) {
        directoryElements.forEach((dicomElement, index) => {
            const id = index.toString();
            if (dicomElement.dataSet) {
                // TODO: convert to FHIR and ISO datetime
                // It checks the Directory Record Type: http://dicom.nema.org/dicom/2013/output/chtml/part03/sect_F.3.html
                if (dicomElement.dataSet.string('x00041430') === 'PATIENT') {
                    const patientUID = getDicomPatientId(dicomElement.dataSet);
                    let objStudy = { id: id, uid: patientUID, key: 'patient', value: getDicomPatientName(dicomElement.dataSet), expanded: true };
                    output.push(objStudy);
                }
                else if (dicomElement.dataSet.string('x00041430') === 'STUDY') {
                    const studyUID = getDicomStudyId(dicomElement.dataSet);
                    const dateTime = dicomDateToLocale(getDicomStudyDate(dicomElement.dataSet)) + " - " + dicomTimeToStr(getDicomStudyTime(dicomElement.dataSet));
                    const description = getDicomStudyDescription(dicomElement.dataSet);
                    let objStudy = { id: id, uid: studyUID, key: 'study', description: description, value: dateTime, expanded: true };
                    output.push(objStudy);
                }
                else if (dicomElement.dataSet.string('x00041430') === 'SERIES') {
                    const serieUID = getDicomSeriesInstanceUID(dicomElement.dataSet);
                    const number = getDicomSeriesNumber(dicomElement.dataSet);
                    const modality = getDicomModality(dicomElement.dataSet);
                    const description = getDicomSeriesDescription(dicomElement.dataSet);
                    let objSerie = { id: id, uid: serieUID, key: 'series', description: description, number: number, value: modality, expanded: true };
                    output.push(objSerie);
                }
                else if (dicomElement.dataSet.string('x00041430') === 'IMAGE') {
                    // //console.log("Instance element in directoryElements at entry = ", index) // at [3] and so on
                    const instanceUID = getDicomReferencedSOPInstanceUIDInFile(dicomElement.dataSet); // Use it when reading a DICOMDIR file
                    const sopClassUID = getDicomReferencedSOPClassUIDinFile(dicomElement.dataSet); // Instead of getDicomImageSopClassUID <-undefined
                    const number = getDicomInstanceNumber(dicomElement.dataSet);
                    const filePath = getDicomReferencedFileIDAttribute(dicomElement.dataSet);
                    let path = filePath.replace(/\\/g, '/');
                    let fileName = filePath.split('\\').pop(); // 'any' instead of 'string' type to allow 'undefined'
                    // TODO: getDicomImageLaterality and getDicomBodyPartExamined not found in our tests, so they hadn't been added for this reason
                    let objInstance = { id: id, uid: instanceUID, key: 'image', sopClassUID: sopClassUID, number: number, path: path, value: fileName, expanded: true };
                    output.push(objInstance);
                }
            }
        });
    }
    return output;
}
// It creates an hierarchical object by a previously parsed and expanded array of data
export function buildDicomdirHierarchy(secuentialArray, id = null) {
    // if (id && id !== null) { output[id].expanded = !output[id].expanded }
    let images = [];
    let series = [];
    let study = [];
    let patient = [];
    secuentialArray.slice().reverse().forEach((obj, i) => {
        if (obj.key === 'image') {
            let objInstance = { id: obj.id, uid: obj.uid, key: obj.key, sopClassUID: obj.sopClassUID, number: obj.number, path: obj.path, value: obj.value };
            images.unshift(objInstance);
        }
        else if (obj.key === 'series') {
            let objSerie = { id: obj.id, uid: obj.uid, key: obj.key, description: obj.description, number: obj.number, value: obj.value, expanded: obj.expanded, children: images };
            series.unshift(objSerie);
            images = []; // clears the images
        }
        else if (obj.key === 'study') {
            let objStudy = { id: obj.id, uid: obj.uid, key: obj.key, description: obj.description, value: obj.value, expanded: obj.expanded, children: series };
            study.unshift(objStudy);
            series = []; // clears the series
        }
        else if (obj.key === 'patient') {
            let objPatient = { id: obj.id, uid: obj.uid, key: obj.key, value: obj.value, expanded: obj.expanded, children: study };
            patient.unshift(objPatient);
            study = []; // clears the studies
        }
    });
    return putNumberOfDicomSeriesAndInstancesInStudies(patient);
}
function putNumberOfDicomSeriesAndInstancesInStudies(dicomdirPatients) {
    if (!dicomdirPatients.length || dicomdirPatients.length < 1)
        return dicomdirPatients;
    dicomdirPatients.forEach(function (patientObj, patientIndex, contentArray) {
        if (patientObj.children && patientObj.children.length && patientObj.children.length > 0) {
            patientObj.children.forEach(function (studyObj, studyIndex, patientArray) {
                studyObj.numberOfSeries = studyObj.numberOfSeries = 0; // it initializes to 0
                if (studyObj.children && studyObj.children.length && studyObj.children.length > 0) {
                    patientArray[studyIndex].numberOfSeries = studyObj.children.length;
                    let numberOfInstances = 0; // it initializes the number of instances in the study
                    studyObj.children.forEach(function (serieObj, serieIndex) {
                        if (serieObj.children && serieObj.children.length && serieObj.children.length > 0) {
                            numberOfInstances = numberOfInstances + serieObj.children.length; // it adds the instances in the serie
                        }
                    });
                    patientArray[studyIndex].numberOfInstances = numberOfInstances;
                    // //console.log("numberOfSeriesInStudy=" + studyObj.numberOfSeries + " | numberOfInstancesInStudy=" + studyObj.numberOfInstances)
                }
            });
        }
    });
    return dicomdirPatients;
}
export function getImagePathsByDicomdirStudyContent(studyContent) {
    let results = [];
    if (studyContent.children && studyContent.children.length && studyContent.children.length > 0) {
        studyContent.children.forEach(function (serieContent) {
            if (serieContent.children && serieContent.children.length && serieContent.children.length > 0) {
                serieContent.children.forEach(function (instanceContent) {
                    if (instanceContent.path)
                        results.push(instanceContent.path);
                });
            }
        });
    }
    return results;
}
export function getContentStudies(dicomdirContent) {
    let contentStudies = [];
    if (dicomdirContent.length && dicomdirContent.length > 0) {
        //dicomdirContent.forEach( function(patientContent:DicomdirContentPatient){} )
        const patientContent = dicomdirContent[0];
        if (patientContent.children && patientContent.children.length && patientContent.children.length > 0) {
            patientContent.children.forEach(function (studyContent) {
                contentStudies.push(studyContent);
            });
        }
    }
    return contentStudies;
}
// --- Directory Content ---
export function getDicomFileSetId(dataSet) {
    return dataSet.string('x00041130');
}
export function getDicomTransferSyntaxUid(dataSet) {
    return dataSet.string('x00020010');
}
export function getDicomImplementationClassUid(dataSet) {
    return dataSet.string('x00020012');
}
export function getDicomImplementationVersionName(dataSet) {
    return dataSet.string('x00020013');
}
export function getDicomManufacturer(dataSet) {
    return dataSet.string('x00080070');
}
export function getDicomManufacturersModelName(dataSet) {
    return dataSet.string('x00081090');
}
export function getDicomDeviceSerialNumber(dataSet) {
    return dataSet.string('x00181000');
}
// Use as study.value instead of date - time
export function getDicomProtocolName(dataSet) {
    return dataSet.string('x00181030');
}
export function getDicomInstitutionName(dataSet) {
    return dataSet.string('x00080080');
}
export function getDicomInstitutionAddress(dataSet) {
    return dataSet.string('x00080081');
}
export function getDicomStationName(dataSet) {
    return dataSet.string('x00081010');
}
export function getDicomInstitutionalDepartmentName(dataSet) {
    return dataSet.string('x00081040');
}
// Physician(s) of Record: physician(s) who are responsible for overall patient care at time of Study
export function getDicomPhysicianOfRecord(dataSet) {
    return dataSet.string('x00081048');
}
// Name of Physician(s) Reading Study
export function getDicomSPhysicianReadingStudy(dataSet) {
    return dataSet.string('x00081060');
}
// Operators' Name: Name(s) of the operator(s) supporting the Series.
export function getDicomOperatorsName(dataSet) {
    return dataSet.string('x00081070');
}
// Use as the UID of the study, but not the StudyID (x00200010 is a number, not OID)
export function getDicomStudyInstanceUID(dataSet) {
    return dataSet.string('x0020000d');
}
// Instance Creation Date (0008,0012) + Instance Creation Time (0008,0013) + Timezone Offset From UTC (0008,0201)
export function getDicomInstanceCreation(dataSet) {
    let creationDate = getDicomInstanceCreationDate(dataSet);
    let creationTime = getDicomInstanceCreationTime(dataSet);
    let creationOffset = getTimezoneOffsetFromUTC(dataSet);
    let creationDateTime = dicomDateToLocale(creationDate) + "T" + dicomTimeToStr(creationTime) + dicomTimeToStr(creationOffset);
    return creationDateTime;
}
export function getDicomInstanceCreationDate(dataSet) {
    return dataSet.string('x00080012');
}
export function getDicomInstanceCreationTime(dataSet) {
    return dataSet.string('x00080013');
}
export function getTimezoneOffsetFromUTC(dataSet) {
    return dataSet.string('x00080201');
}
export function getDicomReferencedSOPClassUIDinFile(dataSet) {
    return dataSet.string('x00041510'); // Referenced SOP Class UID in File Attribute: Tag	(0004,1510)
}
export function getDicomLaterality(dataSet) {
    return dataSet.string('x00200060');
}
export function getDicomImageLaterality(dataSet) {
    return dataSet.string('x00200062');
}
export function getDicomBodyPartExamined(dataSet) {
    return dataSet.string('x00080015');
}
// Some IODs support the Anatomic Region Sequence, which can provide a more comprehensive mechanism for specifying the body part being examined
export function getDicomAnatomicRegionSequence(dataSet) {
    return dataSet.string('x00082218');
}
export function getDicomReferencedFileIDAttribute(dataSet) {
    return dataSet.string('x00041500');
}
export function getDicomPatientId(dataSet) {
    return dataSet.string('x00100020');
}
export function getDicomPatientName(dataSet) {
    return dataSet.string('x00100010');
}
export function getDicomStudyId(dataSet) {
    return dataSet.string('x00200010');
}
export function getDicomStudyDate(dataSet) {
    return dataSet.string('x00080020');
}
export function getDicomStudyTime(dataSet) {
    return dataSet.string('x00080030');
}
export function getDicomStudyDescription(dataSet) {
    return dataSet.string('x00081030');
}
export function getDicomSeriesInstanceUID(dataSet) {
    return dataSet.string('x0020000e');
}
export function getDicomSeriesDate(dataSet) {
    return dataSet.string('x00080021');
}
export function getDicomSeriesTime(dataSet) {
    return dataSet.string('x00080031');
}
export function getDicomPhysicianName(dataSet) {
    return dataSet.string('x00081050'); // Name of the physician(s) administering the Series
}
export function getDicomSeriesDescription(dataSet) {
    return dataSet.string('x0008103e');
}
export function getDicomSeriesNumber(dataSet) {
    return parseFloat(dataSet.string('x00200011'));
}
export function getDicomModality(dataSet) {
    return dataSet.string('x00080060');
}
export function getDicomIpp(dataSet, index) {
    const value = dataSet.string('x00200032');
    const ipp = value.split('\\');
    return parseFloat(ipp[index]);
}
export function getDicomFrameOfReferenceUID(dataSet) {
    return dataSet.string('x00200052');
}
export function getDicomPixelSpacing(dataSet, index) {
    const value = dataSet.string('x00280030');
    const pixelSpacing = value.split('\\');
    return pixelSpacing[index];
}
export function getDicomSpacingBetweenSlice(dataSet) {
    return parseFloat(dataSet.string('x00180088'));
}
export function getDicomSliceThickness(dataSet) {
    return parseFloat(dataSet.string('x00180050'));
}
export function getDicomEchoNumber(dataSet) {
    return parseFloat(dataSet.string('x00180086'));
}
export function getDicomPatientPosition(dataSet) {
    return dataSet.string('x00185100');
}
export function getDicomSliceLocation(dataSet) {
    return parseFloat(dataSet.string('x00201041'));
}
export function getDicomInstanceNumber(dataSet) {
    return parseFloat(dataSet.string('x00200013'));
}
export function getDicomRows(dataSet) {
    return dataSet.uint16('x00280010');
}
export function getDicomColumns(dataSet) {
    return dataSet.uint16('x00280011');
}
export function isLocalizer(dataSet) {
    const values = dataSet.string('x00080008').split('\\');
    // //console.log('Localizer: ', values)
    return values.length === 3 && values[2] === 'LOCALIZER';
}
export function getLocalizer(dataSet) {
    const value = dataSet.string('x00080008');
    if (value) {
        let values = value.split('\\');
        return values[values.length - 1]; // the last value
    }
    return;
}
export function getDicomImageXOnRows(dataSet) {
    const iop = dataSet.string('x00200037').split('\\').map((v) => parseFloat(v));
    if (iop[0] > iop[1])
        return true;
    else
        return false;
}
export function getDicomImageSopClassUID(dataSet) {
    return dataSet.string('x00080016');
}
// The following are the same UID value
// USE THIS ONE WHEN READING A DCM FILE: ReferencedSOPInstanceUIDInFile
export function getDicomMediaStorageSOPInstanceUID(dataSet) {
    return dataSet.string('x00020003');
}
// USE THIS ONE WHEN READING THE UID OF THE INSTANCES WITHIN A DICOMDIR FILE
export function getDicomReferencedSOPInstanceUIDInFile(dataSet) {
    return dataSet.string('x00041511');
}
export function getDicomSOPInstanceUID(dataSet) {
    return dataSet.string('x00080018');
}
export function getDicomFailedSOPInstanceUIDList(dataSet) {
    return dataSet.string('x00080058');
}
export function getDicomSeferencedSOPInstanceUID(dataSet) {
    return dataSet.string('x00081155');
}
export function getDicomImageViewPosition(dataSet) {
    return dataSet.string('x00185101'); // View Position Applied value(s): AP, LL, LLD, LLO, PA, RL, RLD, RLO
}
export function dicomDateToLocale(dcmDate) {
    const date = new Date(dcmDate.substring(0, 4) + '-' + dcmDate.substring(4, 6) + '-' + dcmDate.substring(6));
    const localeDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    return localeDate;
}
export function dicomTimeToStr(dcmTime) {
    const time = dcmTime.substring(0, 2) + ':' + dcmTime.substring(2, 4) + ':' + dcmTime.substring(4, 6);
    return time;
}
export function dicomDateTimeToLocale(dateTime) {
    const date = new Date(dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8));
    const time = dateTime.substring(9, 11) + ':' + dateTime.substring(11, 13) + ':' + dateTime.substring(13, 15);
    const localeDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    return `${localeDate} - ${time}`;
}
export function dicomDateTimeToIso(dateTime) {
    const date = new Date(dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8));
    const time = dateTime.substring(9, 11) + ':' + dateTime.substring(11, 13) + ':' + dateTime.substring(13, 15);
    const localeDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    return `${localeDate}T${time}`;
}
