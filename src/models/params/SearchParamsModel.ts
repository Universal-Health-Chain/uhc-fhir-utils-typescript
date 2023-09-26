/** ConceptReferencedDM for Data Minimization is a FHIR CodeableReference element
 *  but simplified with only a single "code" in a coding "system" and a "reference" string.
 *  (Note: SearchParameter extends ConceptReferencedDM)
 */
export interface ConceptReferencedDM {
  code?: string;
  system?: string;
  reference?: string;
}

// Define the types as a type
export type ParameterType = 'number' | 'date' | 'string' | 'token' | 'reference' | 'composite' | 'quantity' | 'uri' | 'period';

// Common interface for all types
export interface ParameterData {
  name: string;         // key name of the parameter, e.g.: '_type' (resource type) or 'vaccine-code'
  type: ParameterType;
  value: any;           // string or number (the type will be overridden in derived interfaces)
  system?: string;      // SNOMED, LOINC...
  unit?: string;        // ml, mg...
  period?: boolean;     // true if date is a FHIR Period (e.g.: effectivePeriod or onsetPeriod)
  end?: string;         // FHIR Period.end
  hint?: string;          // UI hint for the parameter
  appliesTo?: string[];   // What kind of resources this parameter applies to
  localizedText?: string;  // Localized text from FHIR CodeableConcept
  intDisplay?: string;     // International display from FHIR Coding within CodeableConcept
  prefix?: string           // optional parameter for date/
}
// Number Search Parameter
export interface NumberSearchParameter extends ParameterData {
  value: number;
}

// Date Search Parameter
export interface DateSearchParameter extends ParameterData {
  value: string; // ISO8601 Date format
  end?:       string;     // FHIR Period.end (effectivePeriod, onsetPeriod, effectiveDateTime, onsetDateTime)
  period?: boolean;    // true if date is a FHIR Period (effectivePeriod or onsetPeriod)
}

// String Search Parameter
export interface StringSearchParameter extends ParameterData {
  type: 'string';
  value: string;
}

// Token Search Parameter
export interface TokenSearchParameter extends ParameterData {
  type: 'token';
  value: string; 
  system: string; // The system in which the token is defined
}

// Reference Search Parameter
export interface ReferenceSearchParameter extends ParameterData {
  type: 'reference';
  reference: string; // Reference to another resource
}

// Composite Search Parameter
export interface CompositeSearchParameter extends ParameterData {
  type: 'composite';
  components: ParameterData[]; // The components of the composite
}

// Quantity Search Parameter
export interface QuantitySearchParameter extends ParameterData {
  type: 'quantity';
  value: number; 
  system: string; 
  unit: string;
}

// URI Search Parameter
export interface URISearchParameter extends ParameterData {
  type: 'uri';
  value: string; // URI value
}

// The collection of all search parameter types
export type FHIRSearchParameter = NumberSearchParameter | DateSearchParameter | StringSearchParameter | TokenSearchParameter | ReferenceSearchParameter | CompositeSearchParameter | QuantitySearchParameter | URISearchParameter;

export interface Reaction {
    substance: StringSearchParameter; // Replace with the correct type for substance
    manifestation: StringSearchParameter[]; // Replace with the correct type for manifestation
    severity: string; // Replace with the correct type for severity
    exposureRoute: StringSearchParameter; // Replace with the correct type for exposureRoute
    note: StringSearchParameter[]; // Replace with the correct type for note
    quantity: {
        value: number; // Replace with the correct type for value
        system: string; // Replace with the correct type for system
    };
}


export function parseTokenParameter(inputValue: string): TokenSearchParameter {
  const parts = inputValue.split('|');
  const parameter: TokenSearchParameter = {
    type: 'token',
    name: '',
    value: '',
    system: '',
  };
  if (parts.length === 2) {
    parameter.system = parts[0];
    parameter.value = parts[1];
  } else if (parts.length === 1) {
    parameter.value = parts[0];
  }
  return parameter;
}

export function parseReferenceParameter(inputValue: string): ReferenceSearchParameter {
  return {
    type: 'reference',
    name: '',
    reference: inputValue,
    value: '',
    system: '',
  };
}

export function parseDateParameter(inputValue: string): DateSearchParameter {
  const parameter: DateSearchParameter = {
    type: 'date',
    name: '',
    value: '',
    prefix: '',
    system: '',
  };
  if (inputValue.match(/^(eq|ne|gt|lt|ge|le|sa|eb|ap)/)) {
    parameter.prefix = inputValue.slice(0, 2);
    parameter.value = inputValue.slice(2);
  } else {
    parameter.value = inputValue;
  }
  return parameter;
}

export function parseQuantityParameter(inputValue: string): QuantitySearchParameter {
  const parts = inputValue.split('|');
  const parameter: QuantitySearchParameter = {
    type: 'quantity',
    name: '',
    value: 2,
    system: '',
    prefix: '',
    unit: '',
  };
  if (parts.length === 3) {
    parameter.prefix = parts[0];
    parameter.value = parseInt(parts[1]);
    parameter.system = parts[2];
    parameter.unit = parts[2]
  } else if (parts.length === 2) {
    parameter.value = parseInt(parts[0]);
    parameter.system = parts[1];
  } else if (parts.length === 1) {
    parameter.value = parseInt(parts[0]);
  }
  return parameter;
}

// Continue with other parameter types if needed...
