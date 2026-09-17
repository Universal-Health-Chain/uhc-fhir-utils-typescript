// TDD contract: write this test red first; make it green only with the complete real behavior.
import { minifyRelatedPersonParams, readOrBuildRelatedPersonParams } from '../src/utils/fhirRelatedPerson';

describe('fhirRelatedPerson utils', () => {
  it('minifies related person params', () => {
    const rp = {
      name: [{ use: 'nickname', given: ['Gran'], family: 'Ma' }],
      relationship: [{ coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v3-RoleCode', code: 'GRANDMTH' }] }],
      telecom: [{ system: 'phone', value: '+1-555' }],
      patient: { reference: 'Patient/123' },
    };
    const params = minifyRelatedPersonParams(rp);
    expect(params.subject).toBe('Patient/123');
    expect(params.name).toBe('Gran Ma');
    expect(params.relationship).toBe('http://terminology.hl7.org/CodeSystem/v3-RoleCode|GRANDMTH');
    expect(params.telecom).toBe('phone|+1-555');
  });

  it('prefers server params when present', () => {
    const resource = {
      meta: { api: { params: { subject: 'Patient/1', name: 'Nick' } } },
    };
    expect(readOrBuildRelatedPersonParams(resource)).toEqual({ subject: 'Patient/1', name: 'Nick' });
  });
});
