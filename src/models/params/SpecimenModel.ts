import { TokenSearchParameter, DateSearchParameter, ReferenceSearchParameter } from './SearchParamsModel';

// Specimen Parameters
export enum SpecimenParameters {
    AccessionIdentifier = 'org.hl7.fhir.http.specimen.accession-identifier',
    CollectionDate = 'org.hl7.fhir.http.specimen.collection-date',
    ContainerIdentifier = 'org.hl7.fhir.http.specimen.container-identifier',
    Identifier = 'org.hl7.fhir.http.specimen.identifier',
    Parent = 'org.hl7.fhir.http.specimen.parent',
    Patient = 'org.hl7.fhir.http.specimen.patient',
    Status = 'org.hl7.fhir.http.specimen.status',
    Type = 'org.hl7.fhir.http.specimen.type',
  }
  
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
  