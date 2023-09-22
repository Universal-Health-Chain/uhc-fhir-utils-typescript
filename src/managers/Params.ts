import { R4 } from '@ahryman40k/ts-fhir-types';
import { ParameterData } from '../models/params/SearchParamsModel';


export function fhirCodingsToParam(conceptCodings: R4.ICoding[], paramName: string): ParameterData {
    return {
        name: paramName,
        type: 'token',
        value: conceptCodings[0]?.code || '',
        system: conceptCodings[0]?.system || undefined
    };
}

export function fhirCodeableConceptsToParam(codeableConcepts: R4.ICodeableConcept[] | undefined, paramName: string): ParameterData {
    let result: ParameterData = {
        name: paramName,
        type: 'token',
        value: undefined,
        localizedText: undefined,
    };

    if (codeableConcepts && codeableConcepts.length > 0) {
        const codingParam = fhirCodingsToParam(codeableConcepts[0].coding || [], paramName);
        result.value = codingParam.value;
        result.system = codingParam.system;
        result.localizedText = codeableConcepts[0].text || undefined;
    }

    return result;
}

export function fhirIdentifiersToParam(identifiers: R4.IIdentifier[] | undefined): ParameterData {
    let result: ParameterData = {
        name: 'identifier',
        type: 'token',
        value: undefined,
        system: undefined,
    };

    if (identifiers && identifiers.length > 0) {
        result.value = identifiers[0].value || undefined;
        result.system = identifiers[0].system || undefined;
    }

    return result;
}

export function fhirImmunizationVaccineCodeToParam(vaccineCode: R4.ICodeableConcept | undefined): ParameterData {
    return fhirCodeableConceptsToParam([vaccineCode || {}], 'vaccine-code');
}

export function fhirReferenceToParam(reference: R4.IReference | undefined, paramName: string): ParameterData {
    let result: ParameterData = {
        name: paramName,
        type: 'reference',
        value: undefined,
        system: undefined,
    };

    if (reference) {
        result.value = reference.reference || undefined;
        result.system = reference.type || undefined;
    }

    return result;
}

export function fhirQuantityToParam(quantity: R4.IQuantity | undefined, paramName: string): ParameterData {
    let result: ParameterData = {
        name: paramName,
        type: 'quantity',
        value: undefined,
        system: undefined,
        unit: undefined,
    };

    if (quantity) {
        result.value = quantity.value || undefined;
        result.system = quantity.system || undefined;
        result.unit = quantity.unit || undefined;
    }

    return result;
}

export function fhirDateOrPeriodToParam(dateOrPeriod: string | R4.IPeriod | undefined, paramName: string): ParameterData {
    let result: ParameterData = {
        name: paramName,
        type: 'date',
        value: undefined,
    };

    if (typeof dateOrPeriod === 'string') {
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateOrPeriod)) {
            result.value = dateOrPeriod;
        } else {
            try {
                let parsedDate = new Date(dateOrPeriod);
                result.value = parsedDate.toISOString().split('T')[0];
            } catch (error) {
                console.warn('Invalid FHIR DateTime format:', error);
            }
        }
    } else if (dateOrPeriod) {
        result.period = true;
        result.value = dateOrPeriod.start || undefined;
        result.end = dateOrPeriod.end || undefined;
    }

    return result;
}
