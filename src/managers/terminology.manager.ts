/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { TerminologyAdapterMem, TerminologyInterface, getTerminologyDomainName } from '@universal-health-chain/uhc-common-utils-typescript'

/** initializes the default international terminologies (english) except if others are sent */
export class TerminologyManager {
    public adapter: TerminologyAdapterMem;

    // The private constructor takes an adapter and initializes this.adapter
    private constructor(adapter: TerminologyAdapterMem) {
        this.adapter = adapter;
    }

    // The static initilalize method constructs and returns a TerminologyManager instance
    public static async initialize(terminologies?: TerminologyInterface[]): Promise<TerminologyManager> {
        let adapter;
        if (!terminologies || terminologies.length < 1) {
            const defaultTerms = await this.loadDefaultTerminologies();
            adapter = new TerminologyAdapterMem(defaultTerms, true);
        } else {
            adapter = new TerminologyAdapterMem(terminologies, true);
        }
        return new TerminologyManager(adapter);
    }

    private static async loadDefaultTerminologies(): Promise<TerminologyInterface[]> {
        const [HL7_EN, LOINC_EN, SNOMED_EN] = await Promise.all([
            import('../../terminology/hl7/international/terminology.hl7.international.json'),
            import('../../terminology/loinc/international/terminology.loinc.international.json'),
            import('../../terminology/snomed/international/terminology.snomed.ips.json')
        ]);
    
        return [
            HL7_EN as unknown as TerminologyInterface,
            LOINC_EN as unknown as TerminologyInterface,
            SNOMED_EN as unknown as TerminologyInterface
        ];
    }

    /** 
     * The term 'lookup' is a recognized operation in FHIR's terminology services to find a code based on a provided set of criteria.
     * This is a generic method to convert a search result into an array of FHIR parameters.
     */
    async lookupTerminologyCodes(codes: string[], language: string, codingSystem?: string): Promise<{ name: string, valueString: string }[]> {
        const terminologyName = codingSystem ? getTerminologyDomainName(codingSystem) : undefined;
        const mapResult = await this.adapter.search(codes, language, terminologyName, codingSystem);
        
        const entries = Array.from(mapResult.entries());
        return entries.map(([name, valueString]) => ({ name, valueString }));
    }

    /** 
     * Method to get valueString for a specific code or empty string.
     * This uses the lookupTerminologyCodesHL7 method.
     */
    async getValueString(code: string, language: string, codingSystem: string): Promise<string> {
        const results = await this.lookupTerminologyCodes([code], language, codingSystem);
        
        // Assuming you want to fetch the valueString of the first result if multiple results are returned for the same code
        if (results.length > 0) {
            return results[0].valueString;
        } else {
            return '';
        }
    }
   
}
