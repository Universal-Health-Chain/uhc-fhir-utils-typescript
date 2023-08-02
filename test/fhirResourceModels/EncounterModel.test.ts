import { Encounter, EncounterParameters } from '../../src/models/fhirResourceModels/Encounter';

describe('Encounter', () => {
  it('initializes from URL parameters', () => {
    const url =
      'appointment=appt1|appt2&class=class1|class2&diagnosis=diag1|diag2&episode-of-care=ep1|ep2&identifier=identifier1|identifier2&location=loc1|loc2&participant=part1|part2&patient=patient1|patient2&reason-code=reason1|reason2&reason-reference=ref1|ref2&service-provider=provider1|provider2&status=in-progress&type=type1|type2';
    const encounter = new Encounter(url);

    expect(encounter.resourceData).toEqual({
      appointment: {
        type: 'reference',
        name: EncounterParameters.Appointment,
        description: '',
        base: ['Encounter'],
        reference: 'appt1|appt2',
      },
      class: {
        type: 'token',
        name: EncounterParameters.Class,
        description: '',
        base: ['Encounter'],
        system: 'class1',
        code: 'class2',
      },
      diagnosis: {
        type: 'reference',
        name: EncounterParameters.Diagnosis,
        description: '',
        base: ['Encounter'],
        reference: 'diag1|diag2',
      },
      'episode-of-care': {
        type: 'reference',
        name: EncounterParameters.EpisodeOfCare,
        description: '',
        base: ['Encounter'],
        reference: 'ep1|ep2',
      },
      identifier: {
        type: 'token',
        name: EncounterParameters.Identifier,
        description: '',
        base: ['Encounter'],
        system: 'identifier1',
        code: 'identifier2',
      },
      location: {
        type: 'reference',
        name: EncounterParameters.Location,
        description: '',
        base: ['Encounter'],
        reference: 'loc1|loc2',
      },
      participant: {
        type: 'reference',
        name: EncounterParameters.Participant,
        description: '',
        base: ['Encounter'],
        reference: 'part1|part2',
      },
      patient: {
        type: 'reference',
        name: EncounterParameters.Patient,
        description: '',
        base: ['Encounter'],
        reference: 'patient1|patient2',
      },
      'reason-code': {
        type: 'token',
        name: EncounterParameters.ReasonCode,
        description: '',
        base: ['Encounter'],
        system: 'reason1',
        code: 'reason2',
      },
      'reason-reference': {
        type: 'reference',
        name: EncounterParameters.ReasonReference,
        description: '',
        base: ['Encounter'],
        reference: 'ref1|ref2',
      },
      'service-provider': {
        type: 'reference',
        name: EncounterParameters.ServiceProvider,
        description: '',
        base: ['Encounter'],
        reference: 'provider1|provider2',
      },
      status: {
        type: 'token',
        name: EncounterParameters.Status,
        description: '',
        base: ['Encounter'],
        system: undefined,
        code: 'in-progress',
      },
      type: {
        type: 'token',
        name: EncounterParameters.Type,
        description: '',
        base: ['Encounter'],
        system: 'type1',
        code: 'type2',
      },
    });
  });

});
