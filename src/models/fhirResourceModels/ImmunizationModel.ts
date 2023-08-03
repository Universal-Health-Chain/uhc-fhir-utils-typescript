import { DateSearchParameter, TokenSearchParameter, ReferenceSearchParameter, StringSearchParameter } from './SearchParamsModel';

// Immunization Parameters
export enum ImmunizationParameters {
    Date = 'date',
    Identifier = 'identifier',
    Location = 'location',
    LotNumber = 'lot-number',
    Manufacturer = 'manufacturer',
    Patient = 'patient',
    Performer = 'performer',
    Reaction = 'reaction',
    Status = 'status',
    VaccineCode = 'vaccine-code',
    ManufacturerDisplay = 'manufacturer-display',
  }
  
// Immunization Resource Interface
export interface ImmunizationResource {
  [ImmunizationParameters.Date]?: DateSearchParameter;
  [ImmunizationParameters.Identifier]?: TokenSearchParameter;
  [ImmunizationParameters.Location]?: ReferenceSearchParameter;
  [ImmunizationParameters.LotNumber]?: StringSearchParameter;
  [ImmunizationParameters.Manufacturer]?: ReferenceSearchParameter;
  [ImmunizationParameters.Patient]?: ReferenceSearchParameter;
  [ImmunizationParameters.Performer]?: ReferenceSearchParameter;
  [ImmunizationParameters.Reaction]?: ReferenceSearchParameter;
  [ImmunizationParameters.Status]?: TokenSearchParameter;
  [ImmunizationParameters.VaccineCode]?: TokenSearchParameter;
  [ImmunizationParameters.VaccineCode]?: TokenSearchParameter;
  [ImmunizationParameters.ManufacturerDisplay]?: ReferenceSearchParameter;
}
