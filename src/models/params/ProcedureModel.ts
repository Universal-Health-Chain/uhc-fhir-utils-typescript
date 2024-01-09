import { ReferenceSearchParameter, TokenSearchParameter, DateSearchParameter } from './SearchParamsModel';

// Procedure Parameters
export enum ProcedureParameters {
    BasedOn = 'org.hl7.fhir.http.procedure.based-on',
    Category = 'org.hl7.fhir.http.procedure.category',
    Code = 'org.hl7.fhir.http.procedure.code',
    Date = 'org.hl7.fhir.http.procedure.date',
    Encounter = 'org.hl7.fhir.http.procedure.encounter',
    Identifier = 'org.hl7.fhir.http.procedure.identifier',
    Location = 'org.hl7.fhir.http.procedure.location',
    Patient = 'org.hl7.fhir.http.procedure.patient',
    Performer = 'org.hl7.fhir.http.procedure.performer',
    ReasonCode = 'org.hl7.fhir.http.procedure.reason-code',
    ReasonReference = 'org.hl7.fhir.http.procedure.reason-reference',
  Status = 'org.hl7.fhir.http.procedure.status',
    Subject= 'org.hl7.fhir.http.procedure.subject'
  }
  
// Procedure Resource Interface
export interface ProcedureTemplateFHIR {
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
  [ProcedureParameters.Subject]?: ReferenceSearchParameter;
  [ProcedureParameters.Status]?: TokenSearchParameter;
}
  