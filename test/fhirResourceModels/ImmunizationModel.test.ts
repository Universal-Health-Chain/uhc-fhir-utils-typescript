import { Immunization, ImmunizationParameters } from '../../src/models/fhirResourceModels/ImmunizationModel';

describe('Immunization', () => {
  it('initializes from URL parameters', () => {
    const url =
      'date=2023-01-01&identifier=identifier1|identifier2&location=location1|location2&lot-number=lot123&manufacturer=manuf1|manuf2&patient=patient1|patient2&performer=performer1|performer2&reaction=reaction1|reaction2&status=completed&vaccine-code=vaccine1|vaccine2';
    const immunization = new Immunization(url);

    expect(immunization.resourceData).toEqual({
      date: {
        type: 'date',
        name: ImmunizationParameters.Date,
        description: '',
        base: ['Immunization'],
        value: '2023-01-01',
      },
      identifier: {
        type: 'token',
        name: ImmunizationParameters.Identifier,
        description: '',
        base: ['Immunization'],
        system: 'identifier1',
        code: 'identifier2',
      },
      location: {
        type: 'reference',
        name: ImmunizationParameters.Location,
        description: '',
        base: ['Immunization'],
        reference: 'location1|location2',
      },
      'lot-number': {
        type: 'string',
        name: ImmunizationParameters.LotNumber,
        description: '',
        base: ['Immunization'],
        value: 'lot123',
      },
      manufacturer: {
        type: 'reference',
        name: ImmunizationParameters.Manufacturer,
        description: '',
        base: ['Immunization'],
        reference: 'manuf1|manuf2',
      },
      patient: {
        type: 'reference',
        name: ImmunizationParameters.Patient,
        description: '',
        base: ['Immunization'],
        reference: 'patient1|patient2',
      },
      performer: {
        type: 'reference',
        name: ImmunizationParameters.Performer,
        description: '',
        base: ['Immunization'],
        reference: 'performer1|performer2',
      },
      reaction: {
        type: 'reference',
        name: ImmunizationParameters.Reaction,
        description: '',
        base: ['Immunization'],
        reference: 'reaction1|reaction2',
      },
      status: {
        type: 'token',
        name: ImmunizationParameters.Status,
        description: '',
        base: ['Immunization'],
        system: undefined,
        code: 'completed',
      },
      'vaccine-code': {
        type: 'token',
        name: ImmunizationParameters.VaccineCode,
        description: '',
        base: ['Immunization'],
        system: 'vaccine1',
        code: 'vaccine2',
      },
    });
  });

  // Additional tests go here...
});
