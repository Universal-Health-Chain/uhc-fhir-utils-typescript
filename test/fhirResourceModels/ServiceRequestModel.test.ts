import { ServiceRequest, ServiceRequestParameters } from '../../src/models/fhirResourceModels/ServiceRequestModel';

describe('ServiceRequest', () => {
  it('initializes from URL parameters', () => {
    const url =
      'authored-on=2023-01-01&category=cat1|cat2&code=code1|code2&encounter=enc1|enc2';
    const serviceRequest = new ServiceRequest(url);

    expect(serviceRequest.resourceData).toEqual({
      'authored-on': {
        type: 'date',
        name: ServiceRequestParameters.AuthoredOn,
        description: '',
        base: ['ServiceRequest'],
        value: '2023-01-01',
      },
      category: {
        type: 'token',
        name: ServiceRequestParameters.Category,
        description: '',
        base: ['ServiceRequest'],
        system: 'cat1',
        code: 'cat2',
      },
      code: {
        type: 'token',
        name: ServiceRequestParameters.Code,
        description: '',
        base: ['ServiceRequest'],
        system: 'code1',
        code: 'code2',
      },
      encounter: {
        type: 'reference',
        name: ServiceRequestParameters.Encounter,
        description: '',
        base: ['ServiceRequest'],
        reference: 'enc1|enc2',
      },
    });
  });

  // Additional tests go here...
});
