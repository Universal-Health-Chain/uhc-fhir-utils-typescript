import { Condition } from '../../src/models/fhirResourceModels/ConditionModel';

describe('Condition', () => {
  it('initializes from URL parameters', () => {
    const url = 'abatement-date=2023-01-01&clinical-status=active&code=123|456&identifier=ghi|jkl';
    const condition = new Condition(url);

    expect(condition.resourceData).toEqual({
      abatementDate: {
        type: 'date',
        name: 'abatement-date',
        description: '',
        base: ['Condition'],
        value: '2023-01-01',
      },
      clinicalStatus: {
        type: 'token',
        name: 'clinical-status',
        description: '',
        base: ['Condition'],
        system: undefined,
        code: 'active',
      },
      code: {
        type: 'token',
        name: 'code',
        description: '',
        base: ['Condition'],
        system: '123',
        code: '456',
      },
      identifier: {
        type: 'token',
        name: 'identifier',
        description: '',
        base: ['Condition'],
        system: 'ghi',
        code: 'jkl',
      },
    });
  });

});
