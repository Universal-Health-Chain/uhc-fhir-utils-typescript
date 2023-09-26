import { TokenSearchParameter, DateSearchParameter, ReferenceSearchParameter } from './SearchParamsModel';

// Specimen Parameters
export enum SpecimenParameters {
    AccessionIdentifier = 'accession-identifier',
    CollectionDate = 'collection-date',
    ContainerIdentifier = 'container-identifier',
    Identifier = 'identifier',
    Parent = 'parent',
    Patient = 'patient',
    Status = 'status',
    Type = 'type',
  }
  
// Specimen Resource Interface
export interface SpecimenResource {
  [SpecimenParameters.AccessionIdentifier]?: TokenSearchParameter;
  [SpecimenParameters.CollectionDate]?: DateSearchParameter;
  [SpecimenParameters.ContainerIdentifier]?: TokenSearchParameter;
  [SpecimenParameters.Identifier]?: TokenSearchParameter;
  [SpecimenParameters.Parent]?: ReferenceSearchParameter;
  [SpecimenParameters.Patient]?: ReferenceSearchParameter;
  [SpecimenParameters.Status]?: TokenSearchParameter;
  [SpecimenParameters.Type]?: TokenSearchParameter;
}
  