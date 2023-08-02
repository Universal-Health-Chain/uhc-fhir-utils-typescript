import {Appointment} from '../../src/models/fhirResourceModels/AppointmentModel'


describe('Appointment', () => {
    const url = "?actor=Practitioner/1&date=2023-07-26&patient=Patient/1";
  
    it('should create Appointment from URL', () => {
      const resource = new Appointment(url);
      expect(resource.resourceData).toHaveProperty('actor');
      expect(resource.resourceData.actor?.value).toEqual('Practitioner/1');
      expect(resource.resourceData).toHaveProperty('date');
      expect(resource.resourceData.date?.value).toEqual('2023-07-26');
      expect(resource.resourceData).toHaveProperty('patient');
      expect(resource.resourceData.patient?.value).toEqual('Patient/1');
    });
  
    it('should populate Appointment from URL using fromUrlParams method', () => {
      const resource = new Appointment("");
      resource.fromUrlParams(url);
      expect(resource.resourceData).toHaveProperty('actor');
      expect(resource.resourceData.actor?.value).toEqual('Practitioner/1');
      expect(resource.resourceData).toHaveProperty('date');
      expect(resource.resourceData.date?.value).toEqual('2023-07-26');
      expect(resource.resourceData).toHaveProperty('patient');
      expect(resource.resourceData.patient?.value).toEqual('Patient/1');
    });
  
    it('should throw error for unsupported FHIR version', () => {
      const resource = new Appointment(url);
      expect(() => resource.toFHIRResource('stu3')).toThrow('Unsupported FHIR version: stu3');
    });
  });
  