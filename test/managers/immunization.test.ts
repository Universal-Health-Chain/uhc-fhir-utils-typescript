import { R4 } from '@ahryman40k/ts-fhir-types';
import { GetParamsByImmunizationFHIR4 } from "../../src/managers/Immunization";


describe('GetParamsByImmunizationFHIR4', () => {
    it('should return an array of ParameterData', () => {
        const immunization: R4.IImmunization = {
            vaccineCode: {
                coding: [
                    {
                        system: 'http://example.com',
                        code: '12345',
                    },
                ],
            },
            identifier: [
                {
                    system: 'http://example.com/identifiers',
                    value: '98765',
                },
            ],
            patient: {
                reference: 'Patient/123',
                type: 'Patient',
            },
            encounter: {
                reference: 'Encounter/456',
                type: 'Encounter',
            },
            location: {
                reference: 'Location/789',
                type: 'Location',
            },
            occurrenceDateTime: '2023-09-21',
            expirationDate: '2023-09-28',
            resourceType: 'Immunization'
        };

        const params = GetParamsByImmunizationFHIR4(immunization);

        expect(params).toEqual([
            {
                name: 'vaccine-code',
                type: 'token',
                value: '12345',
                system: 'http://example.com',
            },
            {
                name: 'identifier',
                type: 'token',
                value: '98765',
                system: 'http://example.com/identifiers',
            },
            {
                name: 'patient',
                type: 'reference',
                value: 'Patient/123',
                system: 'Patient',
            },
            {
                name: 'encounter',
                type: 'reference',
                value: 'Encounter/456',
                system: 'Encounter',
            },
            {
                name: 'location',
                type: 'reference',
                value: 'Location/789',
                system: 'Location',
            },
            {
                name: 'date',
                type: 'date',
                value: '2023-09-21',
            },
            {
                name: 'expirationDate',
                type: 'date',
                value: '2023-09-28',
            },
        ]);
    });
});