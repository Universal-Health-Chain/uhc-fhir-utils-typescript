import { URLSearchParams } from 'url';

// Create the TypeScript enumerator for the HTTP parameters of the Appointment resource
enum AppointmentParameters {
    Actor = 'actor',
    Date = 'date',
    Identifier = 'identifier',
    Location = 'location',
    PartStatus = 'part-status',
    Patient = 'patient',
    Practitioner = 'practitioner',
    ServiceType = 'service-type',
    Status = 'status',
  }
  
  // Create the TypeScript interface for the Appointment resource using the enumerator and the search parameter types
  interface AppointmentResource {
    [AppointmentParameters.Actor]?: ReferenceSearchParameter;
    [AppointmentParameters.Date]?: DateSearchParameter;
    [AppointmentParameters.Identifier]?: TokenSearchParameter;
    [AppointmentParameters.Location]?: ReferenceSearchParameter;
    [AppointmentParameters.PartStatus]?: TokenSearchParameter;
    [AppointmentParameters.Patient]?: ReferenceSearchParameter;
    [AppointmentParameters.Practitioner]?: ReferenceSearchParameter;
    [AppointmentParameters.ServiceType]?: TokenSearchParameter;
    [AppointmentParameters.Status]?: TokenSearchParameter;
  }
  

  // Create a class to store and manipulate the Appointment resource
export class Appointment {
    resourceData: AppointmentResource = {};
    fhirRelease: string = 'r4';
  
    constructor(url: string, fhirRelease?: string) {
      this.fhirRelease = fhirRelease || this.fhirRelease;
      this.fromUrlParams(url);
    }
  
    fromUrlParams(url: string) {
        const urlParams = new URLSearchParams(url);
        for (const [key, value] of urlParams.entries()) {
          if (key in AppointmentParameters) {
            let parameter: SearchParameter;
            switch (key) {
              case AppointmentParameters.Actor:
              case AppointmentParameters.Location:
              case AppointmentParameters.Patient:
              case AppointmentParameters.Practitioner:
                parameter = parseReferenceParameter(value);
                break;
              case AppointmentParameters.Identifier:
              case AppointmentParameters.PartStatus:
              case AppointmentParameters.ServiceType:
              case AppointmentParameters.Status:
                parameter = parseTokenParameter(value);
                break;
              case AppointmentParameters.Date:
                parameter = parseDateParameter(value);
                break;
              default:
                throw new Error(`Unsupported parameter: ${key}`);
            }
            parameter.name = key;
            parameter.base = ['Appointment'];
            this.resourceData[key as keyof AppointmentResource] = parameter;
          }
        }
      }
      
      
  
    updateResourceData(newData: AppointmentResource) {
      this.resourceData = { ...this.resourceData, ...newData };
    }
  
    toFHIRResource(fhirRelease?: string): any {
      fhirRelease = fhirRelease || this.fhirRelease;
      // Check FHIR release
      if (fhirRelease !== 'r4') {
        throw new Error(`Unsupported FHIR version: ${fhirRelease}`);
      }
      // Convert to a FHIR resource format
      // This is a placeholder implementation
      // You will need to map the AppointmentResource to the actual FHIR resource format
      return this.resourceData;
    }
  }
  