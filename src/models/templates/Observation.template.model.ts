import { ObservationParameters } from '../params';
import { ReferenceSearchParameter, TokenSearchParameter, DateSearchParameter, QuantitySearchParameter, StringSearchParameter } from '../params/Search.params.model';

// Observation Resource Interface
export interface ObservationTemplateFHIR {
  [ObservationParameters.BasedOn]?: ReferenceSearchParameter;
  [ObservationParameters.Category]?: TokenSearchParameter;
  [ObservationParameters.Code]?: TokenSearchParameter;
  [ObservationParameters.Date]?: DateSearchParameter;
  [ObservationParameters.Encounter]?: ReferenceSearchParameter;
  [ObservationParameters.Identifier]?: TokenSearchParameter;
  [ObservationParameters.Method]?: TokenSearchParameter;
  [ObservationParameters.Patient]?: ReferenceSearchParameter;
  [ObservationParameters.Performer]?: ReferenceSearchParameter;
  [ObservationParameters.ValueConcept]?: TokenSearchParameter;
  [ObservationParameters.ValueDate]?: DateSearchParameter;
  [ObservationParameters.ValueQuantity]?: QuantitySearchParameter;
  [ObservationParameters.ValueString]?: StringSearchParameter;
  [ObservationParameters.Status]?: TokenSearchParameter;
}
  