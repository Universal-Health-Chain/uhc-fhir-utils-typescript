import { R4 } from "@ahryman40k/ts-fhir-types";
import { GetParamsByObservationFHIR4 } from '../../src/managers/Observation'; // Adjust the import path as needed

describe('Observation Functions', () => {
    describe('GetParamsByObservationFHIR4', () => {
        it('should return an array of ParameterData for a single Observation', () => {
            const observation: R4.IObservation = {
                resourceType: 'Observation',
                identifier: [
                    {
                        system: 'http://example.com/identifiers',
                        value: '98765',
                    },
                ],
                subject: {
                    reference: 'Patient/123',
                    type: 'Patient',
                },
                encounter: {
                    reference: 'Encounter/456',
                    type: 'Encounter',
                },
                effectiveDateTime: '2023-09-21',
                code: {
                    coding: [
                        {
                            system: 'http://example.com/codes',
                            code: '123',
                        },
                    ],
                },
                // Add other relevant properties for testing
            };

            const params = GetParamsByObservationFHIR4(observation);

            expect(params).toEqual([
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
                    name: 'effectiveDateTime',
                    type: 'date',
                    value: '2023-09-21',
                },
                {
                    name: 'code',
                    type: 'token',
                    value: '123',
                    system: 'http://example.com/codes',
                },
                // Add expectations for other properties
            ]);
        });

        // Add more test cases for different scenarios
    });
});
