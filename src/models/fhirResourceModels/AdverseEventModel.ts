import { TokenSearchParameter, DateSearchParameter, ReferenceSearchParameter } from './SearchParamsModel';

// Create the TypeScript enumerator for the HTTP parameters of the AdverseEvent resource
export enum AdverseEventParameters {
    Category = 'category',
    Date = 'date',
    Identifier = 'identifier',
    Location = 'location',
    Reaction = 'reaction',
    Recorder = 'recorder',
    Seriousness = 'seriousness',
    Study = 'study',
    Subject = 'subject',
    Substance = 'substance',
  }
  
  // Create the TypeScript interface for the AdverseEvent resource using the enumerator and the search parameter types
 export interface AdverseEventResource {
    [AdverseEventParameters.Category]?: TokenSearchParameter;
    [AdverseEventParameters.Date]?: DateSearchParameter;
    [AdverseEventParameters.Identifier]?: TokenSearchParameter;
    [AdverseEventParameters.Location]?: ReferenceSearchParameter;
    [AdverseEventParameters.Reaction]?: ReferenceSearchParameter;
    [AdverseEventParameters.Recorder]?: ReferenceSearchParameter;
    [AdverseEventParameters.Seriousness]?: TokenSearchParameter;
    [AdverseEventParameters.Study]?: ReferenceSearchParameter;
    [AdverseEventParameters.Subject]?: ReferenceSearchParameter;
    [AdverseEventParameters.Substance]?: ReferenceSearchParameter;
  }
  

  // Create a class to store and manipulate the AdverseEvent resource
