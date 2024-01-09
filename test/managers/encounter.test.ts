import { R4 } from '@ahryman40k/ts-fhir-types';
import {
    GetParamsByEncounterFHIR4,
    // GetParamsByEncounterFHIR4Array,
} from '../../src/managers/Encounter'; // Adjust the import path as needed

describe('Encounter Functions', () => {
    describe('GetParamsByEncounterFHIR4', () => {
        it('should return an array of ParameterData for a single Encounter', () => {
            const encounter: R4.IEncounter = {
                resourceType: 'Encounter',
                class : 'example class' as R4.ICoding,
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
                location: [
                    {
                        location: {
                            reference: 'Location/789',
                            type: 'Location',
                        },
                    },
                ],
                period: {
                    start: '2023-09-21',
                    end: '2023-09-28',
                },
                status: 'finished' as R4.EncounterStatusKind,
                serviceType: {
                    coding: [
                        {
                            system: 'http://example.com/services',
                            code: '123',
                        },
                    ],
                },
                // Add other relevant properties for testing
            };

            const params = GetParamsByEncounterFHIR4(encounter);

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
                    name: 'location',
                    type: 'reference',
                    value: 'Location/789',
                    system: 'Location',
                },
                {
                    name: 'period',
                    type: 'date',
                    value: '2023-09-21',
                    end: '2023-09-28',
                    period: true,
                },
                {
                    name: 'status',
                    type: 'token',
                    value: 'finished',
                },
                {
                    name: 'service-type',
                    type: 'token',
                    value: '123',
                    system: 'http://example.com/services',
                },
                // Add expectations for other properties
            ]);
        });

        // Add more test cases for different scenarios
    });

    // describe('GetParamsByEncounterFHIR4Array', () => {
    //     it('should return an array of ParameterData for an array of Encounters', () => {
    //         const encounters: R4.IEncounter[] = [
    //             // Create multiple Encounter objects for testing
    //         ];

    //         const params = GetParamsByEncounterFHIR4Array(encounters);

    //         // Add expectations for the combined parameters
    //     });
    // });
});
