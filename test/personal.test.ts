
import { R4 } from "@ahryman40k/ts-fhir-types"
import { FhirUtils } from "../src"

const fhirUtils = new FhirUtils()

const surname2 = "Apellido2"
const testPersonFHIR:R4.IPerson = {
    "address":[
       {
          "line":[
             "Dirección 1",
             "Línea adicional"
          ]
       }
    ],
    "identifier":[
       {
          "use":R4.IdentifierUseKind._official,
          "value":"DNI123456",
          "type":{
             "coding":[
                {
                   "code":"NNESP"
                }
             ]
          }
       }
    ],
    "gender":R4.PersonGenderKind._male,
    "id":"person-uuid",
    "name":[
        {
            "given":["Nombre"],
            "family":"Apellido1",
            "_family":{
                "extension":[{
                    "valueString":surname2,
                    "url":"http://hl7.org/fhir/StructureDefinition/humanname-mothers-family"
                }]
            } 
       }
    ],
    "resourceType":"Person",
    "telecom":[
       {
          "system":R4.ContactPointSystemKind._phone,
          "value":"+005554321"
       },
       {
          "system":R4.ContactPointSystemKind._email,
          "value":"user@test.com"
       }
    ]
}

describe("test Personal data", () => {

    it("test second surname", (done) => {
      let surname = testPersonFHIR && testPersonFHIR.name && testPersonFHIR.name[0]
      ? fhirUtils.personal.getSurname2(testPersonFHIR.name[0])
      : '';
      
      // console.log("surname from FHIR Person HumanName = ", surname)
      expect(surname).toBeDefined()
      expect(surname).toBe(surname2)

      done()
    })

    it("test telecom data", (done) => {
        let emails = fhirUtils.personal.getEmails(testPersonFHIR)
        // console.log("emails from FHIR Person telecoms = ", emails)
        expect(emails).toBeDefined()
        expect(emails.length).toBe(1)

        let phones = fhirUtils.personal.getPhones(testPersonFHIR)
        // console.log("phones from FHIR Person telecoms = ", phones)
        expect(phones).toBeDefined()
        expect(phones.length).toBe(1)

        done()
    })
})