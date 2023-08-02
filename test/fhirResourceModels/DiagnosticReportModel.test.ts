import { DiagnosticReport, DiagnosticReportParameters } from '../../src/models/fhirResourceModels/DiagnosticReportModel';

describe('DiagnosticReport', () => {
  it('initializes from URL parameters', () => {
    const url =
      'based-on=ref1|ref2&category=cat1|cat2&code=code1|code2&date=2023-01-01&encounter=enc1|enc2';
    const diagnosticReport = new DiagnosticReport(url);

    expect(diagnosticReport.resourceData).toEqual({
      basedOn: {
        type: 'reference',
        name: DiagnosticReportParameters.BasedOn,
        description: '',
        base: ['DiagnosticReport'],
        reference: 'ref1|ref2',
      },
      category: {
        type: 'token',
        name: DiagnosticReportParameters.Category,
        description: '',
        base: ['DiagnosticReport'],
        system: 'cat1',
        code: 'cat2',
      },
      code: {
        type: 'token',
        name: DiagnosticReportParameters.Code,
        description: '',
        base: ['DiagnosticReport'],
        system: 'code1',
        code: 'code2',
      },
      date: {
        type: 'date',
        name: DiagnosticReportParameters.Date,
        description: '',
        base: ['DiagnosticReport'],
        value: '2023-01-01',
      },
      encounter: {
        type: 'reference',
        name: DiagnosticReportParameters.Encounter,
        description: '',
        base: ['DiagnosticReport'],
        reference: 'enc1|enc2',
      },
    });
  });

  // Additional tests go here...
});
