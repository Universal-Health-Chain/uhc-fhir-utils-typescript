import { ClinicalImpression } from '../../src/models/fhirResourceModels/ClinicalImpressionModel';

describe('ClinicalImpression', () => {
  it('initializes from URL parameters', () => {
    const url = 'assessor=123&date=2023-01-01&finding-code=abc|def&identifier=ghi|jkl';
    const clinicalImpression = new ClinicalImpression(url);

    expect(clinicalImpression.resourceData).toEqual({
      assessor: {
        type: 'reference',
        name: 'assessor',
        description: '',
        base: ['ClinicalImpression'],
        reference: '123',
      },
      date: {
        type: 'date',
        name: 'date',
        description: '',
        base: ['ClinicalImpression'],
        value: '2023-01-01',
      },
      findingCode: {
        type: 'token',
        name: 'finding-code',
        description: '',
        base: ['ClinicalImpression'],
        system: 'abc',
        code: 'def',
      },
      identifier: {
        type: 'token',
        name: 'identifier',
        description: '',
        base: ['ClinicalImpression'],
        system: 'ghi',
        code: 'jkl',
      },
    });
  });

  // Additional tests go here...
});
