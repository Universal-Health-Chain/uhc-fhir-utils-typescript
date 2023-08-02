import {AdverseEvent} from '../../src/models/fhirResourceModels/AdverseEventModel'

describe('AdverseEvent', () => {
    const url = "?category=AE&date=2023-07-26&subject=Patient/1";
  
    it('should create AdverseEvent from URL', () => {
      const resource = new AdverseEvent(url);
      expect(resource.resourceData).toHaveProperty('category');
      expect(resource.resourceData.category?.value).toEqual('AE');
      expect(resource.resourceData).toHaveProperty('date');
      expect(resource.resourceData.date?.value).toEqual('2023-07-26');
      expect(resource.resourceData).toHaveProperty('subject');
      expect(resource.resourceData.subject?.value).toEqual('Patient/1');
    });
  
    it('should populate AdverseEvent from URL using fromUrlParams method', () => {
      const resource = new AdverseEvent("");
      resource.fromUrlParams(url);
      expect(resource.resourceData).toHaveProperty('category');
      expect(resource.resourceData.category?.value).toEqual('AE');
      expect(resource.resourceData).toHaveProperty('date');
      expect(resource.resourceData.date?.value).toEqual('2023-07-26');
      expect(resource.resourceData).toHaveProperty('subject');
      expect(resource.resourceData.subject?.value).toEqual('Patient/1');
    });
  
    it('should throw error for unsupported FHIR version', () => {
      const resource = new AdverseEvent(url);
      expect(() => resource.toFHIRResource('stu3')).toThrow('Unsupported FHIR version: stu3');
    });
  });
  