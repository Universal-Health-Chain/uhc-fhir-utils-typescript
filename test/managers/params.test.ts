import { R4 } from '@ahryman40k/ts-fhir-types';
import {
    fhirCodingsToParam,
    fhirCodeableConceptsToParam,
    fhirImmunizationVaccineCodeToParam,
    fhirIdentifiersToParam,
    fhirReferenceToParam,
    fhirQuantityToParam,
    fhirDateOrPeriodToParam,
} from '../../src/managers/Params'; 

describe('FHIR Functions', () => {
    describe('fhirCodingsToParam', () => {
        it('should convert FHIR codings to ParameterData', () => {
            const coding: R4.ICoding = {
                system: 'http://example.com',
                code: '12345',
            };

            const param = fhirCodingsToParam([coding], 'codingParam');
            expect(param).toEqual({
                name: 'codingParam',
                type: 'token',
                value: '12345',
                system: 'http://example.com',
            });
        });

        it('should handle empty codings array', () => {
            const param = fhirCodingsToParam([], 'codingParam');
            expect(param).toEqual({
                name: 'codingParam',
                type: 'token',
                value: '', // Expect an empty string when codings array is empty
                system: undefined,
            });
        });
    });

    describe('fhirCodeableConceptsToParam', () => {
        it('should convert FHIR codeable concepts to ParameterData', () => {
            const codeableConcept: R4.ICodeableConcept = {
                coding: [
                    {
                        system: 'http://example.com',
                        code: '12345',
                    },
                ],
            };

            const param = fhirCodeableConceptsToParam([codeableConcept], 'testParam');
            expect(param).toEqual({
                name: 'testParam',
                type: 'token',
                value: '12345',
                system: 'http://example.com',
            });
        });

        it('should handle empty codeable concepts array', () => {
            const param = fhirCodeableConceptsToParam([], 'testParam');
            expect(param).toEqual({
                name: 'testParam',
                type: 'token',
                value: undefined,
                system: undefined,
            });
        });
    });

    describe('fhirImmunizationVaccineCodeToParam', () => {
        it('should convert FHIR vaccine code to ParameterData', () => {
            const vaccineCode: R4.ICodeableConcept = {
                coding: [
                    {
                        system: 'http://example.com',
                        code: '12345',
                    },
                ],
            };

            const param = fhirImmunizationVaccineCodeToParam(vaccineCode);
            expect(param).toEqual({
                name: 'vaccine-code',
                type: 'token',
                value: '12345',
                system: 'http://example.com',
            });
        });

        it('should handle empty vaccine code', () => {
            const param = fhirImmunizationVaccineCodeToParam(undefined);
            expect(param).toEqual({
                name: 'vaccine-code',
                type: 'token',
                value: '', // Expect an empty string when vaccine code is empty
                system: undefined,
                localizedText: undefined,
            });
        });
    });

    describe('fhirIdentifiersToParam', () => {
        it('should convert FHIR identifiers to ParameterData', () => {
            const identifier: R4.IIdentifier = {
                system: 'http://example.com/identifiers',
                value: '98765',
            };

            const param = fhirIdentifiersToParam([identifier]);
            expect(param).toEqual({
                name: 'identifier',
                type: 'token',
                value: '98765',
                system: 'http://example.com/identifiers',
            });
        });

        it('should handle empty identifiers array', () => {
            const param = fhirIdentifiersToParam([]);
            expect(param).toEqual({
                name: 'identifier',
                type: 'token',
                value: undefined,
                system: undefined,
            });
        });
    });

    describe('fhirReferenceToParam', () => {
        it('should convert FHIR reference to ParameterData', () => {
            const reference: R4.IReference = {
                reference: 'Patient/123',
                type: 'Patient',
            };

            const param = fhirReferenceToParam(reference, 'testParam');
            expect(param).toEqual({
                name: 'testParam',
                type: 'reference',
                value: 'Patient/123',
                system: 'Patient',
            });
        });

        it('should handle empty reference', () => {
            const param = fhirReferenceToParam(undefined, 'testParam');
            expect(param).toEqual({
                name: 'testParam',
                type: 'reference',
                value: undefined,
                system: undefined,
            });
        });
    });

    describe('fhirQuantityToParam', () => {
        it('should convert FHIR quantity to ParameterData', () => {
            const quantity: R4.IQuantity = {
                value: 42,
                system: 'http://example.com',
                unit: 'kg',
            };

            const param = fhirQuantityToParam(quantity, 'testParam');
            expect(param).toEqual({
                name: 'testParam',
                type: 'quantity',
                value: 42,
                system: 'http://example.com',
                unit: 'kg',
            });
        });

        it('should handle empty quantity', () => {
            const param = fhirQuantityToParam(undefined, 'testParam');
            expect(param).toEqual({
                name: 'testParam',
                type: 'quantity',
                value: undefined,
                system: undefined,
                unit: undefined,
            });
        });
    });

    describe('fhirDateOrPeriodToParam', () => {
        it('should convert FHIR date to ParameterData', () => {
            const date = '2023-09-21';

            const param = fhirDateOrPeriodToParam(date, 'testParam');
            expect(param).toEqual({
                name: 'testParam',
                type: 'date',
                value: '2023-09-21',
            });
        });

        it('should convert FHIR period to ParameterData', () => {
            const period: R4.IPeriod = {
                start: '2023-09-21',
                end: '2023-09-28',
            };

            const param = fhirDateOrPeriodToParam(period, 'testParam');
            expect(param).toEqual({
                name: 'testParam',
                type: 'date',
                value: '2023-09-21',
                end: '2023-09-28',
                period: true,
            });
        });

        it('should handle empty date/period', () => {
            const param = fhirDateOrPeriodToParam(undefined, 'testParam');
            expect(param).toEqual({
                name: 'testParam',
                type: 'date',
                value: undefined,
            });
        });
    });

    
});
