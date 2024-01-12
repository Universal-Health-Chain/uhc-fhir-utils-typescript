import { EncounterParameters } from '../params';
import { ReferenceSearchParameter, TokenSearchParameter } from '../params/Search.params.model';

// Encounter Resource Interface
export interface EncounterTemplateFHIR {
  [EncounterParameters.Appointment]?: ReferenceSearchParameter;
  [EncounterParameters.Class]?: TokenSearchParameter;
  [EncounterParameters.Diagnosis]?: ReferenceSearchParameter;
  [EncounterParameters.EpisodeOfCare]?: ReferenceSearchParameter;
  [EncounterParameters.Identifier]?: TokenSearchParameter;
  [EncounterParameters.Location]?: ReferenceSearchParameter;
  [EncounterParameters.Participant]?: ReferenceSearchParameter;
  [EncounterParameters.Patient]?: ReferenceSearchParameter;
  [EncounterParameters.ReasonCode]?: TokenSearchParameter;
  [EncounterParameters.ReasonReference]?: ReferenceSearchParameter;
  [EncounterParameters.ServiceProvider]?: ReferenceSearchParameter;
  [EncounterParameters.Status]?: TokenSearchParameter;
  [EncounterParameters.Type]?: TokenSearchParameter;
}
 