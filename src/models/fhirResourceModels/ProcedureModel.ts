// Procedure Parameters
export enum ProcedureParameters {
    BasedOn = 'based-on',
    Category = 'category',
    Code = 'code',
    Date = 'date',
    Encounter = 'encounter',
    Identifier = 'identifier',
    Location = 'location',
    Patient = 'patient',
    Performer = 'performer',
    ReasonCode = 'reason-code',
    ReasonReference = 'reason-reference',
    Status = 'status',
  }
  
// Procedure Resource Interface
export interface ProcedureResource {
  [ProcedureParameters.BasedOn]?: ReferenceSearchParameter;
  [ProcedureParameters.Category]?: TokenSearchParameter;
  [ProcedureParameters.Code]?: TokenSearchParameter;
  [ProcedureParameters.Date]?: DateSearchParameter;
  [ProcedureParameters.Encounter]?: ReferenceSearchParameter;
  [ProcedureParameters.Identifier]?: TokenSearchParameter;
  [ProcedureParameters.Location]?: ReferenceSearchParameter;
  [ProcedureParameters.Patient]?: ReferenceSearchParameter;
  [ProcedureParameters.Performer]?: ReferenceSearchParameter;
  [ProcedureParameters.ReasonCode]?: TokenSearchParameter;
  [ProcedureParameters.ReasonReference]?: ReferenceSearchParameter;
  [ProcedureParameters.Status]?: TokenSearchParameter;
}
  