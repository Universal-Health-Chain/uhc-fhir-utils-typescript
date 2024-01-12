import { AdverseEventParameters } from '../params';
import { TokenSearchParameter, DateSearchParameter, ReferenceSearchParameter } from '../params/Search.params.model';


  
  // Create the TypeScript interface for the AdverseEvent resource using the enumerator and the search parameter types
 export interface AdverseEventTemplateFHIR {
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
    [AdverseEventParameters.RecordedDate]?: DateSearchParameter;
    [AdverseEventParameters.ReferenceDocument]?: ReferenceSearchParameter;
  }
  

  // Create a class to store and manipulate the AdverseEvent resource
