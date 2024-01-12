import { MedicationAdministrationParameters, MedicationDispenseParameters, MedicationParameters, MedicationRequestParameters, MedicationStatementParameters } from '../params';
import {
  TokenSearchParameter,
  ReferenceSearchParameter,
  DateSearchParameter,
} from '../params/Search.params.model';

// Medication Resource Interface
export interface MedicationTemplateFHIR {
  [MedicationParameters.Code]?: TokenSearchParameter;
  [MedicationParameters.Identifier]?: TokenSearchParameter;
  [MedicationParameters.Manufacturer]?: ReferenceSearchParameter;
  [MedicationParameters.Status]?: TokenSearchParameter;
}

// MedicationStatement Resource Interface
export interface MedicationStatementTemplateFHIR {
  [MedicationStatementParameters.Category]?: TokenSearchParameter;
  [MedicationStatementParameters.Medication]?: ReferenceSearchParameter;
  [MedicationStatementParameters.Identifier]?: TokenSearchParameter;
  [MedicationStatementParameters.Patient]?: ReferenceSearchParameter;
  [MedicationStatementParameters.Subject]?: ReferenceSearchParameter;
  [MedicationStatementParameters.Status]?: TokenSearchParameter;
}

// MedicationDispense Resource Interface
export interface MedicationDispenseTemplateFHIR {
  [MedicationDispenseParameters.Identifier]?: TokenSearchParameter;
  [MedicationDispenseParameters.Medication]?: ReferenceSearchParameter;
  [MedicationDispenseParameters.Patient]?: ReferenceSearchParameter;
  [MedicationDispenseParameters.Status]?: TokenSearchParameter;
}

// MedicationRequest Resource Interface
export interface MedicationRequestTemplateFHIR {
  [MedicationRequestParameters.AuthoredOn]?: DateSearchParameter;
  [MedicationRequestParameters.Medication]?: ReferenceSearchParameter;
  [MedicationRequestParameters.Patient]?: ReferenceSearchParameter;
  [MedicationRequestParameters.Subject]?: ReferenceSearchParameter;
  [MedicationRequestParameters.Status]?: TokenSearchParameter;
}

// MedicationAdministration Resource Interface
export interface MedicationAdministrationTemplateFHIR {
  [MedicationAdministrationParameters.Identifier]?: TokenSearchParameter;
  [MedicationAdministrationParameters.Medication]?: ReferenceSearchParameter;
  [MedicationAdministrationParameters.Patient]?: ReferenceSearchParameter;
  [MedicationAdministrationParameters.Status]?: TokenSearchParameter;
  [MedicationAdministrationParameters.EffectiveTime]?: DateSearchParameter;
  [MedicationRequestParameters.Subject]?: ReferenceSearchParameter;
}
