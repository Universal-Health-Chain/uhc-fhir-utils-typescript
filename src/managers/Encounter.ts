import { R4 } from "@ahryman40k/ts-fhir-types";
import { ParameterData } from '../models/params/SearchParamsModel';
import { fhirCodeableConceptsToParam, fhirDateOrPeriodToParam, fhirIdentifiersToParam, fhirReferenceToParam } from "./Params";

export function GetParamsByEncounterFHIR4(encounter: R4.IEncounter): ParameterData[] {
    let parameters: ParameterData[] = [];

    if (encounter.identifier && encounter.identifier.length > 0) {
        parameters.push(fhirIdentifiersToParam(encounter.identifier));
    }
    if (encounter.subject) {
        parameters.push(fhirReferenceToParam(encounter.subject, 'patient'));
    }
    if (encounter.location && encounter.location.length > 0) {
        for (const location of encounter.location) {
            parameters.push(fhirReferenceToParam(location.location, 'location'));
        }
    }
    if (encounter.period) {
        parameters.push(fhirDateOrPeriodToParam(encounter.period, 'period'));
    }
    if (encounter.status) {
        parameters.push({
            name: 'status',
            type: 'token',
            value: encounter.status,
        });
    }
    if (encounter.serviceType) {
        parameters.push(fhirCodeableConceptsToParam([encounter.serviceType], 'service-type'));
    }
    // Add more conditions for other Encounter properties as needed

    return parameters;
}

// export function GetParamsByEncounterFHIR4Array(encounters: R4.IEncounter[]): ParameterData[] {
//     let parameters: ParameterData[] = [];
//     for (const encounter of encounters) {
//         parameters = parameters.concat(GetParamsByEncounterFHIR4(encounter));
//     }
//     return parameters;
// }
