import * as dicom from 'dicom-parser';
import { DicomdirContentPatient, DicomdirContentStudy, DicomdirContentSerie } from '../models/DicomModels';
import { R4 } from '@ahryman40k/ts-fhir-types';
export declare function getDicomdirContent(blobFileAsUint8ArrayOfBytes: Uint8Array): DicomdirContentPatient[];
export declare function createFhirDocument(imagingStudy: R4.IImagingStudy, dcmResources?: R4.IDocumentReference[]): R4.IBundle;
export declare function getStudyTextDescription(study: DicomdirContentStudy): string;
export declare function getStudyDateTime(study: DicomdirContentStudy): string;
export declare function getSerieTextDescription(serie: DicomdirContentSerie): string;
export declare function getSerieModalityClass(serie: DicomdirContentSerie): string;
export declare function getComposedUrlPathOfDCM(dcmBytes: Uint8Array): string;
export declare function getInstanceUrlPathByInstanceDataSet(instanceDataSet: dicom.DataSet): string;
export declare function getPixelDataInDCM(dcmBytes: Uint8Array): Uint8Array;
export declare function getHeightAndWidth(instanceDataSet: dicom.DataSet): number[];
export declare function getHeightAndWidthOfDCM(dcmBytes: Uint8Array): number[];
export declare function getInstanceUidInDCM(dcmBytes: Uint8Array): string;
export declare function getInstanceUidByInstanceDataSet(instanceDataSet: dicom.DataSet): string;
export declare function getDicomPixelData(dataSet: dicom.DataSet): Uint8Array;
export declare function buildDicomSecuentialArray(blobByteArray: Uint8Array): any[];
export declare function buildDicomdirHierarchy(secuentialArray: any[], id?: null): DicomdirContentPatient[];
export declare function getImagePathsByDicomdirStudyContent(studyContent: DicomdirContentStudy): string[];
export declare function getContentStudies(dicomdirContent: DicomdirContentPatient[]): DicomdirContentStudy[];
export declare function getDicomFileSetId(dataSet: dicom.DataSet): string;
export declare function getDicomTransferSyntaxUid(dataSet: dicom.DataSet): string;
export declare function getDicomImplementationClassUid(dataSet: dicom.DataSet): string;
export declare function getDicomImplementationVersionName(dataSet: dicom.DataSet): string;
export declare function getDicomManufacturer(dataSet: dicom.DataSet): string;
export declare function getDicomManufacturersModelName(dataSet: dicom.DataSet): string;
export declare function getDicomDeviceSerialNumber(dataSet: dicom.DataSet): string;
export declare function getDicomProtocolName(dataSet: dicom.DataSet): string;
export declare function getDicomInstitutionName(dataSet: dicom.DataSet): string;
export declare function getDicomInstitutionAddress(dataSet: dicom.DataSet): string;
export declare function getDicomStationName(dataSet: dicom.DataSet): string;
export declare function getDicomInstitutionalDepartmentName(dataSet: dicom.DataSet): string;
export declare function getDicomPhysicianOfRecord(dataSet: dicom.DataSet): string;
export declare function getDicomSPhysicianReadingStudy(dataSet: dicom.DataSet): string;
export declare function getDicomOperatorsName(dataSet: dicom.DataSet): string;
export declare function getDicomStudyInstanceUID(dataSet: dicom.DataSet): string;
export declare function getDicomInstanceCreation(dataSet: dicom.DataSet): string;
export declare function getDicomInstanceCreationDate(dataSet: dicom.DataSet): string;
export declare function getDicomInstanceCreationTime(dataSet: dicom.DataSet): string;
export declare function getTimezoneOffsetFromUTC(dataSet: dicom.DataSet): string;
export declare function getDicomReferencedSOPClassUIDinFile(dataSet: dicom.DataSet): string;
export declare function getDicomLaterality(dataSet: dicom.DataSet): string;
export declare function getDicomImageLaterality(dataSet: dicom.DataSet): string;
export declare function getDicomBodyPartExamined(dataSet: dicom.DataSet): string;
export declare function getDicomAnatomicRegionSequence(dataSet: dicom.DataSet): string;
export declare function getDicomReferencedFileIDAttribute(dataSet: dicom.DataSet): string;
export declare function getDicomPatientId(dataSet: dicom.DataSet): string;
export declare function getDicomPatientName(dataSet: dicom.DataSet): string;
export declare function getDicomStudyId(dataSet: dicom.DataSet): string;
export declare function getDicomStudyDate(dataSet: dicom.DataSet): string;
export declare function getDicomStudyTime(dataSet: dicom.DataSet): string;
export declare function getDicomStudyDescription(dataSet: dicom.DataSet): string;
export declare function getDicomSeriesInstanceUID(dataSet: dicom.DataSet): string;
export declare function getDicomSeriesDate(dataSet: dicom.DataSet): string;
export declare function getDicomSeriesTime(dataSet: dicom.DataSet): string;
export declare function getDicomPhysicianName(dataSet: dicom.DataSet): string;
export declare function getDicomSeriesDescription(dataSet: dicom.DataSet): string;
export declare function getDicomSeriesNumber(dataSet: dicom.DataSet): number;
export declare function getDicomModality(dataSet: dicom.DataSet): string;
export declare function getDicomIpp(dataSet: dicom.DataSet, index: any): number;
export declare function getDicomFrameOfReferenceUID(dataSet: dicom.DataSet): string;
export declare function getDicomPixelSpacing(dataSet: dicom.DataSet, index: any): string;
export declare function getDicomSpacingBetweenSlice(dataSet: dicom.DataSet): number;
export declare function getDicomSliceThickness(dataSet: dicom.DataSet): number;
export declare function getDicomEchoNumber(dataSet: dicom.DataSet): number;
export declare function getDicomPatientPosition(dataSet: dicom.DataSet): string;
export declare function getDicomSliceLocation(dataSet: dicom.DataSet): number;
export declare function getDicomInstanceNumber(dataSet: dicom.DataSet): number;
export declare function getDicomRows(dataSet: dicom.DataSet): number;
export declare function getDicomColumns(dataSet: dicom.DataSet): number;
export declare function isLocalizer(dataSet: dicom.DataSet): boolean;
export declare function getLocalizer(dataSet: dicom.DataSet): string | undefined;
export declare function getDicomImageXOnRows(dataSet: dicom.DataSet): boolean;
export declare function getDicomImageSopClassUID(dataSet: dicom.DataSet): string;
export declare function getDicomMediaStorageSOPInstanceUID(dataSet: dicom.DataSet): string;
export declare function getDicomReferencedSOPInstanceUIDInFile(dataSet: dicom.DataSet): string;
export declare function getDicomSOPInstanceUID(dataSet: dicom.DataSet): string;
export declare function getDicomFailedSOPInstanceUIDList(dataSet: dicom.DataSet): string;
export declare function getDicomSeferencedSOPInstanceUID(dataSet: dicom.DataSet): string;
export declare function getDicomImageViewPosition(dataSet: dicom.DataSet): string;
export declare function dicomDateToLocale(dcmDate: string): string;
export declare function dicomTimeToStr(dcmTime: string): string;
export declare function dicomDateTimeToLocale(dateTime: string): string;
export declare function dicomDateTimeToIso(dateTime: string): string;
