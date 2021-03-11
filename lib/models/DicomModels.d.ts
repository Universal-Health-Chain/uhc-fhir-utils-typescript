export interface CommonDicomdirDatasetContent {
    id: string;
    uid: string;
    key: string;
    expanded?: boolean;
}
export interface DicomdirContentPatient extends CommonDicomdirDatasetContent {
    value: string;
    children?: DicomdirContentStudy[];
}
export interface DicomdirContentStudy extends CommonDicomdirDatasetContent {
    description: string;
    numberOfSeries?: number;
    numberOfInstances?: number;
    value: string;
    children?: DicomdirContentSerie[];
}
export interface DicomdirContentSerie extends CommonDicomdirDatasetContent {
    description: string;
    number: number;
    value: string;
    children?: DicomdirContentInstance[];
}
export interface DicomdirContentInstance extends CommonDicomdirDatasetContent {
    number: number;
    path: string;
    sopClassUID: string;
    value: string;
}
