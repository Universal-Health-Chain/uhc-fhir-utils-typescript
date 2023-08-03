import { TokenSearchParameter, ReferenceSearchParameter } from './SearchParamsModel';

// Medication Parameters
export enum MedicationParameters {
    Code = 'code',
    Identifier = 'identifier',
    Manufacturer = 'manufacturer',
    Status = 'status',
}

// Medication Resource Interface
export interface MedicationResource {
[MedicationParameters.Code]?: TokenSearchParameter;
[MedicationParameters.Identifier]?: TokenSearchParameter;
[MedicationParameters.Manufacturer]?: ReferenceSearchParameter;
[MedicationParameters.Status]?: TokenSearchParameter;
}
  
