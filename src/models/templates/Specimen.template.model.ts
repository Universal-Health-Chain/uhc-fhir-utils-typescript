import { SpecimenParameters } from '../params';
import { TokenSearchParameter, DateSearchParameter, ReferenceSearchParameter } from '../params/Search.params.model';

// Specimen Resource Interface
export interface SpecimenTemplateFHIR {
  [SpecimenParameters.AccessionIdentifier]?: TokenSearchParameter;
  [SpecimenParameters.CollectionDate]?: DateSearchParameter;
  [SpecimenParameters.ContainerIdentifier]?: TokenSearchParameter;
  [SpecimenParameters.Identifier]?: TokenSearchParameter;
  [SpecimenParameters.Parent]?: ReferenceSearchParameter;
  [SpecimenParameters.Patient]?: ReferenceSearchParameter;
  [SpecimenParameters.Status]?: TokenSearchParameter;
  [SpecimenParameters.Type]?: TokenSearchParameter;
}
  