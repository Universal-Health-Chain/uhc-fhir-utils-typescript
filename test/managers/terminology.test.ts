import { getVaccinesCovid19CVX } from "../../src/managers/Hl7";
import { CodingSystem, TerminologyManager } from "../../src";

describe('TerminologyManager Tests', () => {
    
    // This will store the initialized instance of TerminologyManager for all tests in this block
    let terminologyTools: TerminologyManager;

    // Use the beforeAll hook to initialize TerminologyManager once for all tests
    beforeAll(async () => {
        terminologyTools = await TerminologyManager.initialize();
    });

    it("should get the label for a HL7 code", async () => {
        const testCode = getVaccinesCovid19CVX()[0]; // '207'
        expect(testCode).toBeDefined();

        const codeSystem = CodingSystem.cvxCovid19; // 'http://hl7.org/fhir/sid/cvx'
        expect(codeSystem).toBeDefined();

        const label = await terminologyTools.getValueString(testCode, 'en', codeSystem);
        expect(label).toBeDefined();
        expect(label).toBe(`COVID-19, mRNA, LNP-S, PF, 100 mcg/0.5 mL dose: SARS-COV-2 (COVID-19) vaccine, mRNA, spike protein, LNP, preservative free, 100 mcg/0.5mL dose`);
    });

    it("should lookup codes even without a coding system", async () => {
        const testCode = getVaccinesCovid19CVX()[0]; // '207'
        expect(testCode).toBeDefined();

        const results = await terminologyTools.lookupTerminologyCodes([testCode], 'en');
        expect(results).toBeDefined();
        expect(results.length).toBeGreaterThan(1); // both "Pediatric Surgery" and the COVID-19 vaccine code (CVX)
        console.log(`found ${results.length} entries for the code "${testCode}"`);
        expect(results[0].name).toBe(testCode);
    });

    // You can add more tests below...

});

