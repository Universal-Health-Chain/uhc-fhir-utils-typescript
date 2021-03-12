import { R4 } from "@ahryman40k/ts-fhir-types";
import { DicomdirContentPatient } from "../models/DicomModels";
export declare class ImagingStudy {
    constructor();
    createImagingStudy(subject: string, idValue?: string, idSystem?: string, series?: R4.IImagingStudy_Series[]): R4.IImagingStudy;
    createSerie(modalityCode: string, uid?: string, number?: number, instances?: R4.IImagingStudy_Instance[]): R4.IImagingStudy_Series;
    addSeriesToStudy(fhirStudy: R4.IImagingStudy, fhirSeries: R4.IImagingStudy_Series[]): R4.IImagingStudy;
    createInstance(instanceUID: string, sopClassUID: string, number?: number, title?: string): R4.IImagingStudy_Instance;
    addInstancesToSerie(fhirSerie: R4.IImagingStudy_Series, fhirinstances: R4.IImagingStudy_Instance[]): R4.IImagingStudy_Series;
    createImagingStudiesByDicomdirContent(subjectId: string, dicomdirPatients: DicomdirContentPatient[]): R4.IImagingStudy[];
}
export declare function createImagingStudy(subject: string, idValue?: string, idSystem?: string, series?: R4.IImagingStudy_Series[]): R4.IImagingStudy;
export declare function createSerie(modalityCode: string, uid?: string, number?: number, instances?: R4.IImagingStudy_Instance[]): R4.IImagingStudy_Series;
export declare function addSeriesToStudy(fhirStudy: R4.IImagingStudy, fhirSeries: R4.IImagingStudy_Series[]): R4.IImagingStudy;
export declare function createInstance(instanceUID: string, sopClassUID: string, number?: number, title?: string): R4.IImagingStudy_Instance;
export declare function addInstancesToSerie(fhirSerie: R4.IImagingStudy_Series, fhirinstances: R4.IImagingStudy_Instance[]): R4.IImagingStudy_Series;
export declare function createImagingStudiesByDicomdirContent(subjectId: string, dicomdirPatients: DicomdirContentPatient[]): R4.IImagingStudy[];
