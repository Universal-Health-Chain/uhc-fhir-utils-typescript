/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

export interface CommonDicomdirDatasetContent {
    id:         string  // 'id' is the order of this DICOM's dataset within the DICOMDIR
    uid:        string  // DICOM's UID for this content
    key:        string  // Patient, Study, Serie or Instance
    expanded?:  boolean
}

export interface DicomdirContentPatient extends CommonDicomdirDatasetContent {
    value:      string          // Patient's Name
    children?:  DicomdirContentStudy[]
}

export interface DicomdirContentStudy extends CommonDicomdirDatasetContent {
    description:        string
    numberOfSeries?:    number
    numberOfInstances?: number          // Total number of instances in the study
    value:              string          // Datetime of the study
    children?:          DicomdirContentSerie[]
}

export interface DicomdirContentSerie extends CommonDicomdirDatasetContent {
    description:    string
    number:         number
    value:          string          // Class' modality in the serie
    children?:      DicomdirContentInstance[]
}

export interface DicomdirContentInstance extends CommonDicomdirDatasetContent {
    // description:    string
    number:         number
    path:           string  // relative path
    sopClassUID:    string
    value:          string  // the file name
}