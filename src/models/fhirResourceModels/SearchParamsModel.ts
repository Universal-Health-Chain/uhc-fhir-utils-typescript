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
export type SearchParameterType = 'number' | 'date' | 'string' | 'token' | 'reference' | 'composite' | 'quantity' | 'uri' | 'period';

// Common interface for all types
export interface SearchParameter extends ConceptReferencedDM {
  reference: string;
  system: string;
  code: string;
  prefix: string;
  name: string;
  description: string;
  base: string[]; // What kind of resources this parameter applies to
  type: SearchParameterType;
  value: any; // Value type will be overridden in derived interfaces
}

// Number Search Parameter
export interface NumberSearchParameter extends SearchParameter {
  type: 'number';
  value: number;
}

// Date Search Parameter
export interface DateSearchParameter extends SearchParameter {
  type: 'date' | 'period';
  value: string; // ISO8601 Date format
  end?:       string;     // FHIR Period.end (effectivePeriod, onsetPeriod, effectiveDateTime, onsetDateTime)
  period?:    boolean;    // true if date is a FHIR Period (effectivePeriod or onsetPeriod)
}

// String Search Parameter
export interface StringSearchParameter extends SearchParameter {
  type: 'string';
  value: string;
}

// Token Search Parameter
export interface TokenSearchParameter extends SearchParameter {
  type: 'token';
  value: string; 
  system: string; // The system in which the token is defined
}

// Reference Search Parameter
export interface ReferenceSearchParameter extends SearchParameter {
  type: 'reference';
  reference: string; // Reference to another resource
}

// Composite Search Parameter
export interface CompositeSearchParameter extends SearchParameter {
  type: 'composite';
  components: SearchParameter[]; // The components of the composite
}

// Quantity Search Parameter
export interface QuantitySearchParameter extends SearchParameter {
  type: 'quantity';
  value: number; 
  system: string; 
  code: string; // The code for the quantity
}

// URI Search Parameter
export interface URISearchParameter extends SearchParameter {
  type: 'uri';
  value: string; // URI value
}

// The collection of all search parameter types
export type FHIRSearchParameter = NumberSearchParameter | DateSearchParameter | StringSearchParameter | TokenSearchParameter | ReferenceSearchParameter | CompositeSearchParameter | QuantitySearchParameter | URISearchParameter;


export function parseTokenParameter(value: string): TokenSearchParameter {
  const parts = value.split('|');
  const parameter: TokenSearchParameter = {
    type: 'token',
    name: '',
    description: '',
    base: [],
    value: '',
    system: '',
    code: '',
    reference: '',
    prefix: ''
  };
  if (parts.length === 2) {
    parameter.system = parts[0];
    parameter.code = parts[1];
  } else if (parts.length === 1) {
    parameter.code = parts[0];
  }
  return parameter;
}

export function parseReferenceParameter(value: string): ReferenceSearchParameter {
  return {
    type: 'reference',
    name: '',
    description: '',
    base: [],
    reference: value,
    value: '',
    system: '',
    code: '',
    prefix: ''
  };
}

export function parseDateParameter(value: string): DateSearchParameter {
  const parameter: DateSearchParameter = {
    type: 'date',
    name: '',
    description: '',
    base: [],
    value: '',
    prefix: '',
    system: '',
    code: '',
    reference: value,
  };
  if (value.match(/^(eq|ne|gt|lt|ge|le|sa|eb|ap)/)) {
    parameter.prefix = value.slice(0, 2);
    parameter.value = value.slice(2);
  } else {
    parameter.value = value;
  }
  return parameter;
}

export function parseQuantityParameter(value: string): QuantitySearchParameter {
  const parts = value.split('|');
  const parameter: QuantitySearchParameter = {
    type: 'quantity',
    name: '',
    description: '',
    base: [],
    value: 2,
    system: '',
    code: '',
    prefix: '',
    reference: value,
  };
  if (parts.length === 3) {
    parameter.prefix = parts[0];
    parameter.value = parseInt(parts[1]);
    parameter.system = parts[2];
  } else if (parts.length === 2) {
    parameter.value = parseInt(parts[0]);
    parameter.system = parts[1];
  } else if (parts.length === 1) {
    parameter.value = parseInt(parts[0]);
  }
  return parameter;
}

// Continue with other parameter types if needed...
