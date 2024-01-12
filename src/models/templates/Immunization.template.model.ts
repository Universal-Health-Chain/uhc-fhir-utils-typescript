import { ImmunizationParameters } from '../params';
import { MedicationParameters } from '../params/Medication.params.model';
import { DateSearchParameter, TokenSearchParameter, ReferenceSearchParameter, StringSearchParameter } from '../params/Search.params.model';

// Immunization Resource Interface
export interface ImmunizationTemplateFHIR {
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
  [ImmunizationParameters.ManufacturerDisplay]?: ReferenceSearchParameter;
  [ImmunizationParameters.TargetDisease]?: TokenSearchParameter;
  [MedicationParameters.Code]?: TokenSearchParameter;
}
