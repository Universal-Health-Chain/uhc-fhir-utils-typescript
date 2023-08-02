import { Procedure, ProcedureParameters } from '../../src/models/fhirResourceModels/ProcedureModel';

describe('Procedure', () => {
  it('initializes from URL parameters', () => {
    const url =
      'based-on=ref1|ref2&category=cat1|cat2&code=code1|code2&date=2023-01-01&encounter=enc1|enc2';
    const procedure = new Procedure(url);

    expect(procedure.resourceData).toEqual({
      basedOn: {
        type: 'reference',
        name: ProcedureParameters.BasedOn,
        description: '',
        base: ['Procedure'],
        reference: 'ref1|ref2',
      },
      category: {
        type: 'token',
        name: ProcedureParameters.Category,
        description: '',
        base: ['Procedure'],
        system: 'cat1',
        code: 'cat2',
      },
      code: {
        type: 'token',
        name: ProcedureParameters.Code,
        description: '',
        base: ['Procedure'],
        system: 'code1',
        code: 'code2',
      },
      date: {
        type: 'date',
        name: ProcedureParameters.Date,
        description: '',
        base: ['Procedure'],
        value: '2023-01-01',
      },
      encounter: {
        type: 'reference',
        name: ProcedureParameters.Encounter,
        description: '',
        base: ['Procedure'],
        reference: 'enc1|enc2',
      },
    });
  });

});
