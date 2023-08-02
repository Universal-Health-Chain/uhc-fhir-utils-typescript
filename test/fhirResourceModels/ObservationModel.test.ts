import { Observation, ObservationParameters } from '../../src/models/fhirResourceModels/ObservationModel';

describe('Observation', () => {
  it('initializes from URL parameters', () => {
    const url =
      'based-on=ref1|ref2&category=cat1|cat2&code=code1|code2&date=2023-01-01&encounter=enc1|enc2';
    const observation = new Observation(url);

    expect(observation.resourceData).toEqual({
      basedOn: {
        type: 'reference',
        name: ObservationParameters.BasedOn,
        description: '',
        base: ['Observation'],
        reference: 'ref1|ref2',
      },
      category: {
        type: 'token',
        name: ObservationParameters.Category,
        description: '',
        base: ['Observation'],
        system: 'cat1',
        code: 'cat2',
      },
      code: {
        type: 'token',
        name: ObservationParameters.Code,
        description: '',
        base: ['Observation'],
        system: 'code1',
        code: 'code2',
      },
      date: {
        type: 'date',
        name: ObservationParameters.Date,
        description: '',
        base: ['Observation'],
        value: '2023-01-01',
      },
      encounter: {
        type: 'reference',
        name: ObservationParameters.Encounter,
        description: '',
        base: ['Observation'],
        reference: 'enc1|enc2',
      },
    });
  });

  // Additional tests go here...
});
