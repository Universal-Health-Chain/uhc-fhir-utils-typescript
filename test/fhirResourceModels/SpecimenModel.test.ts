import { Specimen, SpecimenParameters } from '../../src/models/fhirResourceModels/SpecimenModel';

describe('Specimen', () => {
  it('initializes from URL parameters', () => {
    const url =
      'accession-identifier=accession1|accession2&collection-date=2023-01-01&container-identifier=container1|container2';
    const specimen = new Specimen(url);

    expect(specimen.resourceData).toEqual({
      'accession-identifier': {
        type: 'token',
        name: SpecimenParameters.AccessionIdentifier,
        description: '',
        base: ['Specimen'],
        system: 'accession1',
        code: 'accession2',
      },
      'collection-date': {
        type: 'date',
        name: SpecimenParameters.CollectionDate,
        description: '',
        base: ['Specimen'],
        value: '2023-01-01',
      },
      'container-identifier': {
        type: 'token',
        name: SpecimenParameters.ContainerIdentifier,
        description: '',
        base: ['Specimen'],
        system: 'container1',
        code: 'container2',
      },
    });
  });

  // Additional tests go here...
});
