"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDicomStudyDescription = exports.getDicomStudyTime = exports.getDicomStudyDate = exports.getDicomStudyId = exports.getDicomPatientName = exports.getDicomPatientId = exports.getDicomReferencedFileIDAttribute = exports.getDicomAnatomicRegionSequence = exports.getDicomBodyPartExamined = exports.getDicomImageLaterality = exports.getDicomLaterality = exports.getDicomReferencedSOPClassUIDinFile = exports.getTimezoneOffsetFromUTC = exports.getDicomInstanceCreationTime = exports.getDicomInstanceCreationDate = exports.getDicomInstanceCreation = exports.getDicomStudyInstanceUID = exports.getDicomOperatorsName = exports.getDicomSPhysicianReadingStudy = exports.getDicomPhysicianOfRecord = exports.getDicomInstitutionalDepartmentName = exports.getDicomStationName = exports.getDicomInstitutionAddress = exports.getDicomInstitutionName = exports.getDicomProtocolName = exports.getDicomDeviceSerialNumber = exports.getDicomManufacturersModelName = exports.getDicomManufacturer = exports.getDicomImplementationVersionName = exports.getDicomImplementationClassUid = exports.getDicomTransferSyntaxUid = exports.getDicomFileSetId = exports.getContentStudies = exports.getImagePathsByDicomdirStudyContent = exports.buildDicomdirHierarchy = exports.buildDicomSecuentialArray = exports.getDicomPixelData = exports.getInstanceUidByInstanceDataSet = exports.getInstanceUidInDCM = exports.getHeightAndWidthOfDCM = exports.getHeightAndWidth = exports.getPixelDataInDCM = exports.getInstanceUrlPathByInstanceDataSet = exports.getComposedUrlPathOfDCM = exports.getSerieModalityClass = exports.getSerieTextDescription = exports.getStudyDateTime = exports.getStudyTextDescription = exports.createFhirDocument = exports.getDicomdirContent = void 0;
exports.dicomDateTimeToIso = exports.dicomDateTimeToLocale = exports.dicomTimeToStr = exports.dicomDateToLocale = exports.getDicomImageViewPosition = exports.getDicomSeferencedSOPInstanceUID = exports.getDicomFailedSOPInstanceUIDList = exports.getDicomSOPInstanceUID = exports.getDicomReferencedSOPInstanceUIDInFile = exports.getDicomMediaStorageSOPInstanceUID = exports.getDicomImageSopClassUID = exports.getDicomImageXOnRows = exports.getLocalizer = exports.isLocalizer = exports.getDicomColumns = exports.getDicomRows = exports.getDicomInstanceNumber = exports.getDicomSliceLocation = exports.getDicomPatientPosition = exports.getDicomEchoNumber = exports.getDicomSliceThickness = exports.getDicomSpacingBetweenSlice = exports.getDicomPixelSpacing = exports.getDicomFrameOfReferenceUID = exports.getDicomIpp = exports.getDicomModality = exports.getDicomSeriesNumber = exports.getDicomSeriesDescription = exports.getDicomPhysicianName = exports.getDicomSeriesTime = exports.getDicomSeriesDate = exports.getDicomSeriesInstanceUID = void 0;
const dicom = __importStar(require("dicom-parser"));
const ts_fhir_types_1 = require("@ahryman40k/ts-fhir-types");
const Attachment_1 = require("./Attachment");
const Bundle = require("./Bundle");
// const Attachment = require ("./Attachment") // for using the method instead of another function
function getDicomdirContent(blobFileAsUint8ArrayOfBytes) {
    let dataSetSecuentialArray = buildDicomSecuentialArray(blobFileAsUint8ArrayOfBytes);
    let hierarchicalArray = buildDicomdirHierarchy(dataSetSecuentialArray);
    return hierarchicalArray;
}
exports.getDicomdirContent = getDicomdirContent;
function createFhirDocument(imagingStudy, dcmResources) {
    let fhirResources = [];
    if (dcmResources && dcmResources.length && dcmResources.length > 0)
        fhirResources = [imagingStudy, ...dcmResources];
    else
        fhirResources = [imagingStudy];
    return Bundle.createBundleDocumentWithComposition(fhirResources);
}
exports.createFhirDocument = createFhirDocument;
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
        use: ts_fhir_types_1.R4.IdentifierUseKind._official,
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
    return Attachment_1.createFhirAttachment(mimeType, undefined, url, undefined, undefined, blobBytesHash, blobSize);
}
function getStudyTextDescription(study) {
    return study.description;
}
exports.getStudyTextDescription = getStudyTextDescription;
function getStudyDateTime(study) {
    return study.value;
}
exports.getStudyDateTime = getStudyDateTime;
function getSerieTextDescription(serie) {
    return serie.description;
}
exports.getSerieTextDescription = getSerieTextDescription;
function getSerieModalityClass(serie) {
    return serie.value; // the modality class
}
exports.getSerieModalityClass = getSerieModalityClass;
function getComposedUrlPathOfDCM(dcmBytes) {
    const instanceDataSet = dicom.parseDicom(dcmBytes);
    return getInstanceUrlPathByInstanceDataSet(instanceDataSet); // Values within the DCM file
}
exports.getComposedUrlPathOfDCM = getComposedUrlPathOfDCM;
function getInstanceUrlPathByInstanceDataSet(instanceDataSet) {
    const studyUID = getDicomStudyId(instanceDataSet);
    const serieUID = getDicomSeriesInstanceUID(instanceDataSet);
    const instanceUID = getDicomMediaStorageSOPInstanceUID(instanceDataSet);
    return studyUID + "/" + serieUID + "/" + instanceUID; // It returns the values within the DCM file
}
exports.getInstanceUrlPathByInstanceDataSet = getInstanceUrlPathByInstanceDataSet;
function getPixelDataInDCM(dcmBytes) {
    const instanceDataSet = dicom.parseDicom(dcmBytes);
    return getDicomPixelData(instanceDataSet);
}
exports.getPixelDataInDCM = getPixelDataInDCM;
function getHeightAndWidth(instanceDataSet) {
    return [getDicomRows(instanceDataSet), getDicomColumns(instanceDataSet)];
}
exports.getHeightAndWidth = getHeightAndWidth;
function getHeightAndWidthOfDCM(dcmBytes) {
    const instanceDataSet = dicom.parseDicom(dcmBytes);
    return getHeightAndWidth(instanceDataSet);
}
exports.getHeightAndWidthOfDCM = getHeightAndWidthOfDCM;
function getInstanceUidInDCM(dcmBytes) {
    const instanceDataSet = dicom.parseDicom(dcmBytes);
    return getInstanceUidByInstanceDataSet(instanceDataSet);
}
exports.getInstanceUidInDCM = getInstanceUidInDCM;
function getInstanceUidByInstanceDataSet(instanceDataSet) {
    return getDicomMediaStorageSOPInstanceUID(instanceDataSet);
}
exports.getInstanceUidByInstanceDataSet = getInstanceUidByInstanceDataSet;
function getDicomPixelData(dataSet) {
    const pixelDataElement = dataSet.elements.x7fe00010 || dataSet.elements.x7fe00008;
    // create a typed array on the pixel data (this example assumes 8 bit unsigned data)
    var pixelData = new Uint8Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length);
    return pixelData;
}
exports.getDicomPixelData = getDicomPixelData;
// Invoke the parseDicom function and get back a DataSet object with the contents
function buildDicomSecuentialArray(blobByteArray) {
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
exports.buildDicomSecuentialArray = buildDicomSecuentialArray;
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
function buildDicomdirHierarchy(secuentialArray, id = null) {
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
exports.buildDicomdirHierarchy = buildDicomdirHierarchy;
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
function getImagePathsByDicomdirStudyContent(studyContent) {
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
exports.getImagePathsByDicomdirStudyContent = getImagePathsByDicomdirStudyContent;
function getContentStudies(dicomdirContent) {
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
exports.getContentStudies = getContentStudies;
// --- Directory Content ---
function getDicomFileSetId(dataSet) {
    return dataSet.string('x00041130');
}
exports.getDicomFileSetId = getDicomFileSetId;
function getDicomTransferSyntaxUid(dataSet) {
    return dataSet.string('x00020010');
}
exports.getDicomTransferSyntaxUid = getDicomTransferSyntaxUid;
function getDicomImplementationClassUid(dataSet) {
    return dataSet.string('x00020012');
}
exports.getDicomImplementationClassUid = getDicomImplementationClassUid;
function getDicomImplementationVersionName(dataSet) {
    return dataSet.string('x00020013');
}
exports.getDicomImplementationVersionName = getDicomImplementationVersionName;
function getDicomManufacturer(dataSet) {
    return dataSet.string('x00080070');
}
exports.getDicomManufacturer = getDicomManufacturer;
function getDicomManufacturersModelName(dataSet) {
    return dataSet.string('x00081090');
}
exports.getDicomManufacturersModelName = getDicomManufacturersModelName;
function getDicomDeviceSerialNumber(dataSet) {
    return dataSet.string('x00181000');
}
exports.getDicomDeviceSerialNumber = getDicomDeviceSerialNumber;
// Use as study.value instead of date - time
function getDicomProtocolName(dataSet) {
    return dataSet.string('x00181030');
}
exports.getDicomProtocolName = getDicomProtocolName;
function getDicomInstitutionName(dataSet) {
    return dataSet.string('x00080080');
}
exports.getDicomInstitutionName = getDicomInstitutionName;
function getDicomInstitutionAddress(dataSet) {
    return dataSet.string('x00080081');
}
exports.getDicomInstitutionAddress = getDicomInstitutionAddress;
function getDicomStationName(dataSet) {
    return dataSet.string('x00081010');
}
exports.getDicomStationName = getDicomStationName;
function getDicomInstitutionalDepartmentName(dataSet) {
    return dataSet.string('x00081040');
}
exports.getDicomInstitutionalDepartmentName = getDicomInstitutionalDepartmentName;
// Physician(s) of Record: physician(s) who are responsible for overall patient care at time of Study
function getDicomPhysicianOfRecord(dataSet) {
    return dataSet.string('x00081048');
}
exports.getDicomPhysicianOfRecord = getDicomPhysicianOfRecord;
// Name of Physician(s) Reading Study
function getDicomSPhysicianReadingStudy(dataSet) {
    return dataSet.string('x00081060');
}
exports.getDicomSPhysicianReadingStudy = getDicomSPhysicianReadingStudy;
// Operators' Name: Name(s) of the operator(s) supporting the Series.
function getDicomOperatorsName(dataSet) {
    return dataSet.string('x00081070');
}
exports.getDicomOperatorsName = getDicomOperatorsName;
// Use as the UID of the study, but not the StudyID (x00200010 is a number, not OID)
function getDicomStudyInstanceUID(dataSet) {
    return dataSet.string('x0020000d');
}
exports.getDicomStudyInstanceUID = getDicomStudyInstanceUID;
// Instance Creation Date (0008,0012) + Instance Creation Time (0008,0013) + Timezone Offset From UTC (0008,0201)
function getDicomInstanceCreation(dataSet) {
    let creationDate = getDicomInstanceCreationDate(dataSet);
    let creationTime = getDicomInstanceCreationTime(dataSet);
    let creationOffset = getTimezoneOffsetFromUTC(dataSet);
    let creationDateTime = dicomDateToLocale(creationDate) + "T" + dicomTimeToStr(creationTime) + dicomTimeToStr(creationOffset);
    return creationDateTime;
}
exports.getDicomInstanceCreation = getDicomInstanceCreation;
function getDicomInstanceCreationDate(dataSet) {
    return dataSet.string('x00080012');
}
exports.getDicomInstanceCreationDate = getDicomInstanceCreationDate;
function getDicomInstanceCreationTime(dataSet) {
    return dataSet.string('x00080013');
}
exports.getDicomInstanceCreationTime = getDicomInstanceCreationTime;
function getTimezoneOffsetFromUTC(dataSet) {
    return dataSet.string('x00080201');
}
exports.getTimezoneOffsetFromUTC = getTimezoneOffsetFromUTC;
function getDicomReferencedSOPClassUIDinFile(dataSet) {
    return dataSet.string('x00041510'); // Referenced SOP Class UID in File Attribute: Tag	(0004,1510)
}
exports.getDicomReferencedSOPClassUIDinFile = getDicomReferencedSOPClassUIDinFile;
function getDicomLaterality(dataSet) {
    return dataSet.string('x00200060');
}
exports.getDicomLaterality = getDicomLaterality;
function getDicomImageLaterality(dataSet) {
    return dataSet.string('x00200062');
}
exports.getDicomImageLaterality = getDicomImageLaterality;
function getDicomBodyPartExamined(dataSet) {
    return dataSet.string('x00080015');
}
exports.getDicomBodyPartExamined = getDicomBodyPartExamined;
// Some IODs support the Anatomic Region Sequence, which can provide a more comprehensive mechanism for specifying the body part being examined
function getDicomAnatomicRegionSequence(dataSet) {
    return dataSet.string('x00082218');
}
exports.getDicomAnatomicRegionSequence = getDicomAnatomicRegionSequence;
function getDicomReferencedFileIDAttribute(dataSet) {
    return dataSet.string('x00041500');
}
exports.getDicomReferencedFileIDAttribute = getDicomReferencedFileIDAttribute;
function getDicomPatientId(dataSet) {
    return dataSet.string('x00100020');
}
exports.getDicomPatientId = getDicomPatientId;
function getDicomPatientName(dataSet) {
    return dataSet.string('x00100010');
}
exports.getDicomPatientName = getDicomPatientName;
function getDicomStudyId(dataSet) {
    return dataSet.string('x00200010');
}
exports.getDicomStudyId = getDicomStudyId;
function getDicomStudyDate(dataSet) {
    return dataSet.string('x00080020');
}
exports.getDicomStudyDate = getDicomStudyDate;
function getDicomStudyTime(dataSet) {
    return dataSet.string('x00080030');
}
exports.getDicomStudyTime = getDicomStudyTime;
function getDicomStudyDescription(dataSet) {
    return dataSet.string('x00081030');
}
exports.getDicomStudyDescription = getDicomStudyDescription;
function getDicomSeriesInstanceUID(dataSet) {
    return dataSet.string('x0020000e');
}
exports.getDicomSeriesInstanceUID = getDicomSeriesInstanceUID;
function getDicomSeriesDate(dataSet) {
    return dataSet.string('x00080021');
}
exports.getDicomSeriesDate = getDicomSeriesDate;
function getDicomSeriesTime(dataSet) {
    return dataSet.string('x00080031');
}
exports.getDicomSeriesTime = getDicomSeriesTime;
function getDicomPhysicianName(dataSet) {
    return dataSet.string('x00081050'); // Name of the physician(s) administering the Series
}
exports.getDicomPhysicianName = getDicomPhysicianName;
function getDicomSeriesDescription(dataSet) {
    return dataSet.string('x0008103e');
}
exports.getDicomSeriesDescription = getDicomSeriesDescription;
function getDicomSeriesNumber(dataSet) {
    return parseFloat(dataSet.string('x00200011'));
}
exports.getDicomSeriesNumber = getDicomSeriesNumber;
function getDicomModality(dataSet) {
    return dataSet.string('x00080060');
}
exports.getDicomModality = getDicomModality;
function getDicomIpp(dataSet, index) {
    const value = dataSet.string('x00200032');
    const ipp = value.split('\\');
    return parseFloat(ipp[index]);
}
exports.getDicomIpp = getDicomIpp;
function getDicomFrameOfReferenceUID(dataSet) {
    return dataSet.string('x00200052');
}
exports.getDicomFrameOfReferenceUID = getDicomFrameOfReferenceUID;
function getDicomPixelSpacing(dataSet, index) {
    const value = dataSet.string('x00280030');
    const pixelSpacing = value.split('\\');
    return pixelSpacing[index];
}
exports.getDicomPixelSpacing = getDicomPixelSpacing;
function getDicomSpacingBetweenSlice(dataSet) {
    return parseFloat(dataSet.string('x00180088'));
}
exports.getDicomSpacingBetweenSlice = getDicomSpacingBetweenSlice;
function getDicomSliceThickness(dataSet) {
    return parseFloat(dataSet.string('x00180050'));
}
exports.getDicomSliceThickness = getDicomSliceThickness;
function getDicomEchoNumber(dataSet) {
    return parseFloat(dataSet.string('x00180086'));
}
exports.getDicomEchoNumber = getDicomEchoNumber;
function getDicomPatientPosition(dataSet) {
    return dataSet.string('x00185100');
}
exports.getDicomPatientPosition = getDicomPatientPosition;
function getDicomSliceLocation(dataSet) {
    return parseFloat(dataSet.string('x00201041'));
}
exports.getDicomSliceLocation = getDicomSliceLocation;
function getDicomInstanceNumber(dataSet) {
    return parseFloat(dataSet.string('x00200013'));
}
exports.getDicomInstanceNumber = getDicomInstanceNumber;
function getDicomRows(dataSet) {
    return dataSet.uint16('x00280010');
}
exports.getDicomRows = getDicomRows;
function getDicomColumns(dataSet) {
    return dataSet.uint16('x00280011');
}
exports.getDicomColumns = getDicomColumns;
function isLocalizer(dataSet) {
    const values = dataSet.string('x00080008').split('\\');
    // //console.log('Localizer: ', values)
    return values.length === 3 && values[2] === 'LOCALIZER';
}
exports.isLocalizer = isLocalizer;
function getLocalizer(dataSet) {
    const value = dataSet.string('x00080008');
    if (value) {
        let values = value.split('\\');
        return values[values.length - 1]; // the last value
    }
    return;
}
exports.getLocalizer = getLocalizer;
function getDicomImageXOnRows(dataSet) {
    const iop = dataSet.string('x00200037').split('\\').map((v) => parseFloat(v));
    if (iop[0] > iop[1])
        return true;
    else
        return false;
}
exports.getDicomImageXOnRows = getDicomImageXOnRows;
function getDicomImageSopClassUID(dataSet) {
    return dataSet.string('x00080016');
}
exports.getDicomImageSopClassUID = getDicomImageSopClassUID;
// The following are the same UID value
// USE THIS ONE WHEN READING A DCM FILE: ReferencedSOPInstanceUIDInFile
function getDicomMediaStorageSOPInstanceUID(dataSet) {
    return dataSet.string('x00020003');
}
exports.getDicomMediaStorageSOPInstanceUID = getDicomMediaStorageSOPInstanceUID;
// USE THIS ONE WHEN READING THE UID OF THE INSTANCES WITHIN A DICOMDIR FILE
function getDicomReferencedSOPInstanceUIDInFile(dataSet) {
    return dataSet.string('x00041511');
}
exports.getDicomReferencedSOPInstanceUIDInFile = getDicomReferencedSOPInstanceUIDInFile;
function getDicomSOPInstanceUID(dataSet) {
    return dataSet.string('x00080018');
}
exports.getDicomSOPInstanceUID = getDicomSOPInstanceUID;
function getDicomFailedSOPInstanceUIDList(dataSet) {
    return dataSet.string('x00080058');
}
exports.getDicomFailedSOPInstanceUIDList = getDicomFailedSOPInstanceUIDList;
function getDicomSeferencedSOPInstanceUID(dataSet) {
    return dataSet.string('x00081155');
}
exports.getDicomSeferencedSOPInstanceUID = getDicomSeferencedSOPInstanceUID;
function getDicomImageViewPosition(dataSet) {
    return dataSet.string('x00185101'); // View Position Applied value(s): AP, LL, LLD, LLO, PA, RL, RLD, RLO
}
exports.getDicomImageViewPosition = getDicomImageViewPosition;
function dicomDateToLocale(dcmDate) {
    const date = new Date(dcmDate.substring(0, 4) + '-' + dcmDate.substring(4, 6) + '-' + dcmDate.substring(6));
    const localeDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    return localeDate;
}
exports.dicomDateToLocale = dicomDateToLocale;
function dicomTimeToStr(dcmTime) {
    const time = dcmTime.substring(0, 2) + ':' + dcmTime.substring(2, 4) + ':' + dcmTime.substring(4, 6);
    return time;
}
exports.dicomTimeToStr = dicomTimeToStr;
function dicomDateTimeToLocale(dateTime) {
    const date = new Date(dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8));
    const time = dateTime.substring(9, 11) + ':' + dateTime.substring(11, 13) + ':' + dateTime.substring(13, 15);
    const localeDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    return `${localeDate} - ${time}`;
}
exports.dicomDateTimeToLocale = dicomDateTimeToLocale;
function dicomDateTimeToIso(dateTime) {
    const date = new Date(dateTime.substring(0, 4) + '-' + dateTime.substring(4, 6) + '-' + dateTime.substring(6, 8));
    const time = dateTime.substring(9, 11) + ':' + dateTime.substring(11, 13) + ':' + dateTime.substring(13, 15);
    const localeDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    return `${localeDate}T${time}`;
}
exports.dicomDateTimeToIso = dicomDateTimeToIso;
