import { DetectedIssue, DetectedIssueParameters } from '../../src/models/fhirResourceModels/DetectedIssueModel';

describe('DetectedIssue', () => {
  it('initializes from URL parameters', () => {
    const url =
      'author=author1|author2&code=code1|code2&identified=2023-01-01&identifier=identifier1|identifier2&implicated=implicated1|implicated2&patient=patient1|patient2&status=final';
    const detectedIssue = new DetectedIssue(url);

    expect(detectedIssue.resourceData).toEqual({
      author: {
        type: 'reference',
        name: DetectedIssueParameters.Author,
        description: '',
        base: ['DetectedIssue'],
        reference: 'author1|author2',
      },
      code: {
        type: 'token',
        name: DetectedIssueParameters.Code,
        description: '',
        base: ['DetectedIssue'],
        system: 'code1',
        code: 'code2',
      },
      identified: {
        type: 'date',
        name: DetectedIssueParameters.Identified,
        description: '',
        base: ['DetectedIssue'],
        value: '2023-01-01',
      },
      identifier: {
        type: 'token',
        name: DetectedIssueParameters.Identifier,
        description: '',
        base: ['DetectedIssue'],
        system: 'identifier1',
        code: 'identifier2',
      },
      implicated: {
        type: 'reference',
        name: DetectedIssueParameters.Implicated,
        description: '',
        base: ['DetectedIssue'],
        reference: 'implicated1|implicated2',
      },
      patient: {
        type: 'reference',
        name: DetectedIssueParameters.Patient,
        description: '',
        base: ['DetectedIssue'],
        reference: 'patient1|patient2',
      },
      status: {
        type: 'token',
        name: DetectedIssueParameters.Status,
        description: '',
        base: ['DetectedIssue'],
        system: undefined,
        code: 'final',
      },
    });
  });

  // Additional tests go here...
});
