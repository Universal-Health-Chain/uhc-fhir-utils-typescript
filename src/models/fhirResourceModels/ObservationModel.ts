// Observation Parameters
export enum ObservationParameters {
    BasedOn = 'based-on',
    Category = 'category',
    Code = 'code',
    Date = 'date',
    Encounter = 'encounter',
    Identifier = 'identifier',
    Method = 'method',
    Patient = 'patient',
    Performer = 'performer',
    ValueConcept = 'value-concept',
    ValueDate = 'value-date',
    ValueQuantity = 'value-quantity',
    ValueString = 'value-string',
    Status = 'status',
  }
  
// Observation Resource Interface
export interface ObservationResource {
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
  