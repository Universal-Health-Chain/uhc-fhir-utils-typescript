import { ReferenceSearchParameter, TokenSearchParameter, DateSearchParameter, QuantitySearchParameter, StringSearchParameter } from './SearchParamsModel';

// Observation Parameters
export enum ObservationParameters {
    BasedOn = 'org.hl7.fhir.http.observation.based-on',
    Category = 'org.hl7.fhir.http.observation.category',
    Code = 'org.hl7.fhir.http.observation.code',
    Date = 'org.hl7.fhir.http.observation.date',
    Encounter = 'org.hl7.fhir.http.observation.encounter',
    Identifier = 'org.hl7.fhir.http.observation.identifier',
    Method = 'org.hl7.fhir.http.observation.method',
    Patient = 'org.hl7.fhir.http.observation.patient',
    Performer = 'org.hl7.fhir.http.observation.performer',
    ValueConcept = 'org.hl7.fhir.http.observation.value-concept',
    ValueDate = 'org.hl7.fhir.http.observation.value-date',
    ValueQuantity = 'org.hl7.fhir.http.observation.value-quantity',
    ValueString = 'org.hl7.fhir.http.observation.value-string',
    Status = 'org.hl7.fhir.http.observation.status',
  }
  
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
  