/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { IndexLOINC } from "../models"
import { getDisplayCode } from "./CommonFHIR"


export class Loinc {
    constructor(){
    }

    getDisplayCode = (code:string, englishCodeLabels?:any): string => getDisplayCodeLoinc(code, englishCodeLabels)

    healthSections = ():string[] => GlobalIndexLOINC.groupedCodes.healthSection.codes

    laboratoryTestTopCommonSI = ():string[] => GlobalIndexLOINC.groupedCodes.laboratoryTestTopCommonSI.codes

    laboratoryTestCodesSerologyLOINC = ():string[] => getFullSerologyTestCovid19LOINC()
    
    laboratoryTestCodesNaatLOINC = ():string[] => getFullNaatTestCovid19LOINC()
}

export enum medicalHistoryClassification {
    ips                 = "60591-5",
    allergies           = "48765-2",
    vitalSigns          = "8716-3",
    problemList         = "11450-4",
    pastProblems        = "11348-0",
    familyDiseases      = "10157-6",
    medication          = "10160-0",
    immunization        = "11369-6",
    procedures          = "47519-4",
    diet                = "61144-2",
    diagnosticResults   = "30954-2",
    medicalDevices      = "46264-8",
    socialHistory       = "29762-2",
    mentalStatus        = "10190-7",
    functionalStatus    = "47420-5",
    planOfCare          = "18776-5",
    pregnancy           = "82810-3",
    symptoms            = "10187-3",
    outpatient          = "46240-8",
    advanceDirectives   = "42348-3"
    // goals
    // clinicalNotes   
}

export enum covidLaboratoryTestGroups {
    serologyTestsGroup  = "LG51018-6",
    naatTestsGroup      = "LG51017-8" 
}

/** Define the sections for the indexed codes and for the JSON files with the labels of the codes in different languages*/
export enum GroupedLOINC {
    // TODO: add from IndexHL7.groupedCodes
    healthSection = "healthSection",
    documentType = "documentType",
    laboratoryTestCovid19 = "laboratoryTestCovid19",
    laboratoryTestTopCommonSI = "laboratoryTestTopCommonSI"
}

export function getDisplayCodeLoinc(code:string, englishCodeLabels?:any): string {
    if (!englishCodeLabels) englishCodeLabels = require("../../languages/en/loincUHC.json")
    return getDisplayCode(code, englishCodeLabels)
}

export function getFullSerologyTestCovid19LOINC(): string[] {
    return [
        // "LG51015-2",    // DISPLAY "SARSCoV2 antibody detection (parent group code) - by Immunoassay or pVNT"
        "LG51018-6",    // DISPLAY "SARSCoV2 antibody detection"
        ...GlobalIndexLOINC.categorization.laboratory.covid19["LG51015-2"]["LG51018-6"] 
        // GlobalIndexLOINC.Covid19SerologyTestCodes()  // It is not a function
    ]
}

export function getFullNaatTestCovid19LOINC(): string[] {
    return [
        // "LG51014-5",    // DISPLAY "SARSCoV2 antibody detection (parent group code) - by Immunoassay or pVNT"
        "LG51017-8",    // "SARSCoV2 virus detection"
        ...GlobalIndexLOINC.categorization.laboratory.covid19["LG51014-5"]["LG51017-8"]
        // GlobalIndexLOINC.Covid19NaatTestCodes()  // It is not a fuction
    ]
}

// TODO: define interface for GlobalIndex objects
// It contains all the Covid19 test codes by serum or RNA detection
export const GlobalIndexLOINC:IndexLOINC = {   // note: use https://csvjson.com/json2csv
    get healthSections():string[] { return this.groupedCodes.healthSection.codes },
    get covid19SerologyTestCodes():string[] { return this.categorization.laboratory.covid19["LG51015-2"]["LG51018-6"] },
    get covid19NaatTestCodes():string[] { return this.categorization.laboratory.covid19["LG51014-5"]["LG51017-8"] },
    // get "Category"() { return this["_Category"] },
    // set "Category"(value) { this["_Category"] = value },
    
    // some categorization classifications
    categorization: {
        // TODO: deprecate healthSection and use medicalHistoryClassification instead
        healthSection: {
            compositionIPS: "60591-5",
            allergies: "48765-2",
            vitalSigns: "8716-3",
            problemList: "11450-4",
            pastProblems: "11348-0",
            familyDiseases: "10157-6",
            medication: "10160-0",
            immunization: "11369-6",
            procedures: "47519-4",
            diet: "61144-2",
            diagnosticResults: "30954-2",
            medicalDevices: "46264-8",
            socialHistory: "29762-2",
            mentalStatus: "10190-7",
            functionalStatus: "47420-5",
            planOfCare: "18776-5",
            pregnancy: "82810-3",
            symptoms: "10187-3",
            outpatient: "46240-8",
            advanceDirectives: "42348-3"
            // goals
            // clinicalNotes
        },
        documents: { // custom classification of document codes
        },
        laboratory: {
            covid19: {  // Classified SARSCoV2 Tests by type: antibody (serum) or virus (RNA) detection
                "LG51015-2": {      // DISPLAY "SARSCoV2 antibody detection (parent group code) - by Immunoassay or pVNT"
                    "LG51018-6": [  // DISPLAY "SARSCoV2 antibody detection (group code) - by Immunoassay or pVNT"
                        "94505-5", "94506-3", "94507-1", "94508-9", "94547-7", "94562-6", "94563-4", "94564-2", "94661-6", "94720-0", "94761-4", "94762-2", "94768-9", "94769-7", "95125-1", "95410-7", "95411-5", "95416-4"
                    ]
                },
                "LG51014-5": {      // DISPLAY: "SARSCoV2 virus detection (parent group code) - Nucleic acid amplification test"
                    "LG51017-8": [  // DISPLAY: "SARSCoV2 detection (group code) - Nucleic acid amplification test"
                        "94307-6", "94308-4", "94309-2", "94311-8", "94312-6", "94314-2", "94316-7", "94500-6", "94510-5", "94511-3", "94533-7", "94534-5", "94558-4", "94559-2", "94565-9", "94639-2", "94640-0", "94641-8", "94642-6", "94643-4", "94644-2", "94645-9", "94646-7", "94660-8", "94745-7", "94746-5", "94756-4", "94757-2", "94759-8", "94760-6", "94763-0", "94764-8", "94766-3", "94767-1", "94819-0", "94822-4", "94845-5", "95406-5", "95409-9"
                    ]
                }
            }
        }
    },

    // indexed codes grouped by sections to search labels for
    groupedCodes:{
        healthSection: {
            codes: [        // single array of codes to be translated
                "48765-2",  //Allergies and intolerances
                "8716-3",   //Vital signs
                "11450-4",  //Problem list and health concerns
                "11348-0",  //History of past problems and illness
                "10157-6",  //History of family member diseases
                "10160-0",  //History of medication use
                "11369-6",  //History of immunization
                "47519-4",  //History of procedures
                "61144-2",  //Diet and nutrition
                "30954-2",  //Laboratory test results
                "46264-8",  //History of medical device use
                "29762-2",  //Social history and smoking status
                "10190-7",  //Mental status
                "47420-5",  //Functional status
                "18776-5",  //Assessment and plan of care treatment
                "82810-3",  //Pregnancy status
                "10187-3",  //Symptoms
                "46240-8",  //History of hospitalizations and outpatient visits 
                "42348-3"   //Advance directives
            ]
        },
        documentType: {
            codes:[
                "60591-5"  //"Patient summary Document"
            ]
        },
        // It includes not only official terms but parent groups, groups, panels and prerelease terms
        laboratoryTestCovid19: {
            codes: [ "LG51015-2", "LG51014-5", "LG51018-6", "LG51017-8", // parent groups and groups
                "95423-0","95971-8","95972-6","95973-4","95209-3","94763-0","94661-6","95825-6","94762-2","94769-7","94558-4","96119-3","94562-6","94768-9","95427-1","94720-0","95125-1","94761-4","94563-4","94507-1","95429-7","94505-5","94547-7","95542-7","95416-4","94564-2","94508-9","95428-9","94506-3","95521-1","94510-5","94311-8","94312-6","95522-9","94760-6","95409-9","94533-7","94756-4","94757-2","95425-5","96448-6","94766-3","94316-7","94307-6","94308-4","95411-5","95410-7","94644-2","94511-3","94559-2","95824-9","94639-2","94646-7","94645-9","96120-1","94534-5","96091-4","94314-2","96123-5","94745-7","94746-5","94819-0","94565-9","94759-8","95406-5","95608-6","94500-6","95424-8","94845-5","94822-4","94660-8","94309-2","94642-6","94643-4","94640-0","95609-4","94767-1","94641-8","96603-6","95970-0","94764-8","94313-4","94310-0","94509-7","96121-9","94758-0","95823-1","94765-5","94315-9","96122-7","94502-2","94647-5","94532-9"
            ]
        },
        laboratoryTestTopCommonSI:{
            codes: [
                "14682-9","718-7","2823-3","14749-6","2951-2","3094-0","2028-9","2075-0","789-8","786-4","785-6","2000-8","15074-8","4544-3","6690-2","1742-6","787-2","777-3","1920-8","1751-7","14631-6","2885-2","6768-6","788-0","770-8","33914-3","704-7","20570-8","48642-3","48643-1","26515-7","14647-2","26464-8","30428-7","731-0","14927-8","10466-1","14646-4","6463-4","26485-3","736-9","706-2","713-8","5905-5","26478-8","751-8","5902-2","5902-2__1","33069-6","26450-7","711-2","22637-3","742-7","6301-6","30180-4","3097-3","5802-4","26499-4","5778-6","5803-2","1759-0","26484-6","10834-0","39469-2","5770-3","5799-2","5767-9","26449-9","66126-4","14879-1","26474-7","5811-5","5794-3","22705-8","5804-0","11579-0","26511-6","3173-2","2601-3","5821-4","22702-5","4548-4","14629-0","2336-6","11555-0","47527-7","11557-6","11556-8","22636-5","5769-5","2157-6","32309-7","22748-8","630-4","2601-3__1","2713-6","22638-1","11558-4","22639-9","20454-5","13945-1","738-5","2514-8","741-9","19146-0","3016-3","6298-4","34927-4","19764-0","19767-3","19763-2","13969-1","18314-5","10839-9","19773-1","19769-9","2349-9","34928-2","33037-3","728-6","1959-6","26444-0","2965-2","23658-8","2857-1","14630-8","20409-9","14635-7","8247-9","2947-0","1994-3","600-7","6742-1","14920-3","5818-0","44915-7","764-1","4537-7","8310-5","3040-3","14798-3","9317-9","14933-6","20565-8","925-8","14921-1","13317-3","14979-9","11277-1","32623-1","14685-2","20453-7","1798-8","2276-4","1988-5","5808-1","2532-0","14800-7","5782-8","21000-5","2753-2","14683-7","20408-1","27045-4","31100-1","11580-8","5787-7","735-1","934-0","882-1","19161-9","70199-5","30167-1","20507-0","3151-8","14957-5","58448-2","26508-2","24111-7","11279-7","21613-5","14732-2","1995-0","11282-1","2106-3","933-2","737-7","2744-1","30313-1","10378-8","2324-2","25162-9","14801-5","2703-7","664-3","3879-4","3390-2","53553-4","890-4","26507-4","3050-2","30405-5","48345-3","14913-8","30934-4","2019-8","34714-6","3377-9","8061-4","11529-5","5196-1","49136-5","14959-1","48346-1","3349-8","17856-6","11253-2","33903-6","883-9","25371-6","2458-8","22753-8","32215-6","14930-2","18282-4","744-3","5195-3","1003-3","769-0","714-6","15067-2","14715-7","53927-0","60256-5","702-1","707-0","19145-2","29265-6","5796-8","5198-7","14866-8","2731-8","2465-3","53925-4","774-0","12454-5","30341-2","798-9","1250-0","22634-0","69419-0","56598-6","11572-5","19080-1","18998-5","43304-5","10331-7","43305-2","10701-1","13362-9","11125-2","15180-3","12258-0","22633-2","2472-9","31208-2","18928-2","14807-2","3255-7","3184-9","19139-5","6462-6","10501-5","19244-3","19659-2","14928-6","624-7","634-6","50387-0","50388-8","35691-5","51656-7","4679-7","22635-7","59826-8","15150-6","14338-8","15198-5","33051-4","6299-2","70204-3","2842-3","6598-7","2888-6","3393-6","9842-6","2069-3","5334-8","20569-0","42931-6","15199-3","20629-2","3397-7","779-9","35591-7","32356-8","18878-9","740-1","12851-2","31147-2","25428-4","1960-4","2111-3","2039-6","2862-1","2871-2","2865-4","2868-8","18906-8","14890-8","13950-1","28541-1","3936-2","48159-8","2874-6","31201-7","14914-6","58413-6","36903-3","580-1","2692-2","18865-6","18864-9","14771-0","635-3","547-0","5194-6","18955-5","18481-2","14754-6","12235-8","7791-7","14675-3","14611-8","8099-4","5048-4","2524-7","763-3","30522-7","11156-7","19000-9","2335-8","6824-7","24113-3","14578-9","14907-0","14877-5","14698-5","13965-9","55593-8","18893-8","18970-4","54218-3","800-3","21198-7","14719-9","22763-7","16362-6","3426-4","26487-9","11031-2","749-2","18932-4","18943-1","32673-6","22322-2","13655-6","8123-2","26498-6","19162-7","18879-7","5783-6","39797-6","4092-3","8124-0","31017-7","3150-0","1834-1","3167-4","18895-3","1925-7","1990-1","47094-8","14796-7","18993-6","17790-7","13955-0","18996-9","8101-8","13451-0","1305-2","5130-0","14581-3","14895-7","18886-2","35492-8","14946-8","34148-7","18969-6","2955-3","10381-2","18860-7","12238-2","8098-6","3773-9","26452-3","18961-3","10352-3","4073-3","1006-6","31160-5","7790-9","543-9","20564-1","8122-4","21667-1","584-3","10334-1","34713-8","26510-8","8246-1","18919-1","26455-6","4485-9","4498-2","57845-0","5176-3","16128-1","14135-8","7918-6","19312-8","18908-4","14684-5","13518-6","12179-8","6864-3","49563-0","33255-1","2708-6","5209-2","18964-7","18868-0","1863-0","19994-3","21654-9","14909-6","70200-1","19113-0","12232-5","14688-6","625-4","24475-6","30318-0","743-5","5569-9","3520-4","32693-4","48065-7","2110-5","13952-7","610-6","5403-1","803-7","33358-3","65633-0","10524-7","29247-4","739-3","2889-4","18887-0","10335-8","39778-6","30089-7","20761-3","2828-2","29891-9","19107-2","2639-3","5028-6","1922-4","48058-2","35365-6","772-4","806-0","14566-4","3181-5","3182-3","4546-8","49541-6","4576-5","2890-2","33935-8","16935-9","5193-8","20399-2","25145-4","24467-3","33762-6","48066-5","4625-0","2746-6","3376-1","546-2","21484-1","2021-4","30446-9","748-4","17898-8","673-4","5064-1","32998-7","56537-4","11011-4","12841-3","11006-4","2880-3","33944-0","3389-4","5206-8","19066-0","48803-1","4563-3","49049-0","13503-8","14725-6","21299-3","4545-0","10362-2","18862-3","14744-7","18965-4","9587-7","18390-5","10886-0","14196-0","2695-5","42481-2","13951-9","13502-0","11090-8","606-4","6561-5","47238-1","18185-9","9597-6","31418-7","17792-3","11004-9","17791-5","9593-5","9590-1","9594-3","9589-3","9591-9","9592-7","9599-2","9598-4","9595-0","9596-8","47000-5","9588-5","44357-2","6410-5","6568-0","14564-9","2164-2","43371-4","6331-3","21262-1","29374-6","9335-1","19157-7","29463-7","36916-5","15189-4","70209-2","15120-9","19993-5","6420-4","14565-6","17842-6","32515-9","7886-5","5159-9","26052-1","7885-7","5157-3","33768-3","23811-3","3013-0","6206-7","2756-5","2484-4","2118-8","18974-6","12710-0","34705-4","19254-2","4993-2","1977-8","44877-9","23641-4","14563-1","20447-9","5244-9","15064-9","19550-3","49090-4","21026-0","62292-8","2761-5","3779-6","35663-4","20506-2","19057-9","626-2","13532-7","34660-1","26454-9","10333-3","5822-2","49092-0","6276-0","6248-9","75882-1","6095-4","25160-3","33804-6","703-9","6020-2","20496-6","29541-0","6584-7","19343-3","13964-2","802-9","10704-5","5185-4","46269-7","7258-7","19554-5","10328-3","2705-2","43994-3","14334-7","41477-1","33254-4","21612-7","14639-9","43995-0","5124-3","10366-3","6096-2","26473-9","24108-3","5859-4","5774-5","49121-7","13967-5","3095-7","6025-1","21264-7","25836-8","46640-9","42216-2","48391-7","35678-2","10459-6","5793-5","6099-6","34701-3","20495-8","1761-6","8248-7","2078-4","31374-2","30083-0","47223-3","14633-2","23883-2","34468-9","2881-1","3243-3","3243-3__1","19270-8","15432-8","26466-3","21440-3","14874-2","10835-7","22330-5","38526-0","40752-8","6833-8","5813-1","6189-5","6075-6","14314-9","5332-2","12248-1","5892-5","4552-6","22314-9","46154-1","6357-8","36904-1","5862-8","45371-2","2742-5","32764-3","42247-7","11153-4","6875-9","32166-1","6741-3","7900-4","6087-1","14955-9","11259-9","38180-6","3299-5","14731-4","5370-2","6041-8","53962-7","17859-0","6212-5","22496-4","49050-8","21190-4","30457-6","34985-2","7966-5","20512-0","32198-4","6085-5","6110-1","6303-2","27811-9","47213-4","70201-9","70202-7","70203-5","49062-3","32046-5","26760-9","13183-9","29967-7","1795-4","1871-3","33716-2","14586-2","34574-4","45353-0","2064-4","792-2","29771-3","30170-5","14627-4","31204-1","14626-6","1952-1","13514-5","24012-7","5222-5","13953-5","14745-4","15205-8","29770-5","709-6","20444-6","19153-6","3209-4","7155-5","5866-9","13590-5","47528-5","6106-9","2006-5","655-1","3854-7","16131-5","13954-3","26446-5","7792-5","2529-6","41399-7","22674-6","3034-6","10900-9","3284-7","3414-0","20404-0","10998-3","10976-9","14674-6","13046-8","5351-2","6412-1","2614-6","5353-8","2915-7","27416-7","6565-6","21003-9","5639-0","6182-0","3297-9","5177-1","13516-0","4023-8","15054-0","30243-0","14995-5","4547-6","51724-3","15061-5","6152-3","6252-1","32286-7","17948-1","5199-5","17947-3","17949-9","42637-9","9327-8","14679-5","14569-8","14604-3","20513-8","48035-0","1825-9","5213-4","13440-3","6039-2","18929-0","2004-0","6034-3","5358-7","5388-4","27948-9","9439-1","2745-8","33022-5","13438-7","8117-4","38527-8","70216-7","22747-0","3665-7","14753-8","13527-7","32765-0","20563-3","51597-3","14836-1","6924-5","18983-7","14765-2","5876-8","56490-6","56491-4","14759-5","8665-2","27819-2","5076-5","26486-1","1884-6","29953-7","7291-8","22745-4","11545-1","6473-3","20460-2","14757-9","21033-6","19941-4","6073-1","12208-5","12278-8","14637-3","13519-4","3160-9","38908-0","13517-8","41016-7","13529-3","10329-1","26472-1","13508-7","11135-1","13525-1","14764-5","28008-1","6244-8","6219-0","11050-2","783-1","70207-6","11064-3","6273-7","14638-1","8191-9","13068-2","8149-7","6153-1","14756-1","26524-9","8234-7","11065-0","19141-1","19415-9","35741-8","6265-3","6233-1","39796-8","4090-7","2026-3","2714-4","22131-7","5404-9","14905-4","33718-8","8112-5","19774-9","19128-8","6281-0","24013-5","17780-8","13169-8","15210-8","4532-8","2748-2","26513-2","8130-7","11276-3","25458-1","29641-8","5034-4","773-2","35383-9","22587-0","6178-8","11266-4","22746-2","3663-2","1927-3","5247-2","5126-8","48378-4","15069-8","15218-1","28005-7","8014-3","14912-0","12230-9","27038-9","20573-2","6246-3","42176-8","19075-1","33910-1","9822-8","931-6","32140-6","53982-5","51775-5","19295-5","24011-9","5187-0","2963-7","13530-1","6082-2","6156-4","6186-1","11565-9","30376-8","35676-6","32637-1","46248-1","1721-0","9780-8","6002-0","6014-5","20475-0","33248-6","33006-8","22415-4","6476-6","49053-2","21024-5","13522-8","5274-6","5273-8","13992-3","5393-4","13990-7","801-1","14582-1","7407-0","46420-6","30471-7","40750-2","6019-4","41874-9","2466-1","6968-2","42768-2","16126-5","11258-1","667-6","1747-5","9586-9","681-7","6942-7","6969-0","6183-8","3719-2","2469-5","2467-9","2468-7","32146-3","14277-8","14278-6","12180-6","48344-6","28637-7","18500-9","13987-3","13989-9","78012-2","34661-9","41274-2","33719-6","5158-1","24476-4","14929-4","25700-6","14915-3","11878-6","14676-1","21020-3","19108-0","44525-4","2115-4","32167-9","26518-1","19076-9","33673-5","32133-1","12286-1","6263-8","5095-5","8187-7","13994-9","26523-1","6098-8","22310-7","20124-4","6107-7","6604-3","28647-6","6800-7","6718-1","5181-3","1961-2","28646-8","11051-0","32032-5","25362-5","7793-3","35668-3","47109-4","11274-8","46995-7","46994-0","6208-3","17851-7","43180-9","30166-3","9631-3","10585-8","33217-1","5218-3","27822-6","17793-1","17850-9","51916-5","31844-4","20450-3","48343-8","5160-7","29615-2","21032-8","5791-9","20423-0","8146-3","20991-6","33720-4","2483-6","34712-0","33594-3","8169-5","22663-9","17849-1","8216-4","27816-8","8116-6","7798-2","9795-6","5390-0","32218-0","46266-3","20479-2","35275-7","5781-0","26043-0","16136-4","44449-7","19296-3","14115-0","14761-1","5290-2","5817-2","46267-1","2270-7","6278-6","7369-2","8091-1","41222-1","38505-4","16135-6","44448-9","6076-4","593-4","33437-5","48683-7","20574-0","49539-0","33721-2","5127-6","33773-3","49051-6","7789-1","8338-6","5117-7","2752-4","15359-3","2077-6","41499-5","3141-9","5348-8","15761-0","2615-3","5053-4","33247-8","5183-9","29893-5","20465-1","20466-9","38404-0","27923-2","26512-4","48039-2","14665-4","5880-0","15083-9","1924-0","49573-9","15191-0","5356-1","23761-0","5297-7","5301-7","9783-2","25156-1","19839-0","13539-2","13988-1","4621-9","26471-3","46082-4","46083-2","2357-2","28645-0","39786-9","5809-9","28649-2","6825-4","20458-6","27818-4","7691-9","20474-3","28641-9","12234-1","23877-4","28644-3","2956-1","28648-4","14252-1","21108-6","44447-1","9784-0","49701-6","6891-6","11261-5","23878-2","2112-1","49047-4","28640-1","32319-6","25459-9","57804-7","32207-3","25386-4","3174-0","33393-0","9490-4","26447-3","8095-2","14712-4","6136-6","9660-2","2873-8","9668-5","9667-7","24469-9","771-6","9664-4","9661-0","9666-9","11070-0","14650-6","14603-5","13993-1","5785-1","13995-6","14854-4","5354-6","85991-8","85992-6","1869-7","33332-8","5352-0","2640-1","2998-3","38544-3","38540-1","3746-5","12195-4","15059-9","11140-1","28643-5","5057-5","6092-1","13926-1","2513-0","2518-9","6007-9","14708-2","7984-8","11039-5","32680-1","30340-4","24115-8","28642-7","25489-6","19942-2","18319-4","15530-9","3256-5","35789-7","21365-2","21441-1","14956-7","14935-1","5863-6","34524-9","23841-0","1857-2","31797-4","6379-2","16264-4","49542-4","30339-6","24114-1","32554-8","14316-4","9796-4","9802-0","2428-1","35538-8","48050-9","20593-0","25170-2","2605-4","730-2","8249-5","30427-9","19835-8","27395-3","40913-6","15212-4","3507-1","86024-7","86021-3","86064-3","86061-9","86107-0","86108-8","4575-7","30153-1","40926-8","35127-0","31156-3","4569-0","33593-5","35125-4","35126-2","13986-5","6165-5","21709-1","14833-8","13984-0","38415-6","42484-6","10863-9","3830-7","14947-6","14835-3","13499-9","49540-8","5292-8","31102-7","25157-9","33333-6","71790-0","588-4","8150-5","40287-5","17607-3","43583-4","52956-0","10704-5__1","52955-2","9428-4","31032-6","47320-7","22086-3","6164-8","33915-0","13358-7","25507-5","34519-9","28545-2","6113-5","27118-9","40905-2","12856-1","19077-7","86080-9","86081-7","25296-5","40911-0","86147-6","86148-4","86169-0","86166-6","15048-2","12187-1","15049-0","9662-8","85954-6","85955-3","26019-0","26020-8","41763-4","42483-8","12859-5","6050-9","85977-7","85974-4","21619-2","14934-4","18267-5","48560-7","33536-4","14288-5","20402-4","2333-3","11778-8","42810-2","5191-2","26458-0","14664-7","8214-9","14286-9","27939-8","16130-7","32766-8","17284-1","16268-5","7905-3","19126-2","6158-0","3282-1","32031-7","6266-1","6009-5","936-5","9820-2","11013-0","31080-5","5909-7","22296-8","575-1","5820-6","2999-1","35452-2","20449-5","6174-7","13047-6","20999-9","70206-8","15283-5","14622-5","40527-4","14573-0","70208-4","21525-1","14906-2","20112-9","8144-8","6242-2","21023-7","7983-0","30361-0","781-5","51892-8","42803-7","25631-3","32787-4","19429-0","25415-1","70210-0","32585-2","15410-4","5357-9","5036-9","40974-8","40915-1","48348-7","30173-9","9704-8","601-5","19803-6","14881-7","21695-2","38256-4","10587-4","41479-7","21260-5","35270-8","14194-5","6190-3","6222-4","27820-0","10579-1","30247-1","30165-5","12782-9","25361-7","70217-5","6151-5","5946-9","6230-7","10525-4","40692-6","11884-4","19171-8","7287-6","44528-8","12227-5","59960-5","20473-5","35732-7","19261-7","11235-9","5221-7","6109-3","10353-1","7124-1","8251-1","38996-5","15197-7","14207-5","44547-8","28543-7","6012-9","7902-0","10728-4","8118-2","38496-6","48053-3","33984-6","49839-4","14802-3","7816-2","7477-3","36913-2","13943-6","34441-6","7110-0","2464-6","6195-2","22752-0","4059-2","48051-7","19710-3","22297-6","27823-4","560-3","20427-1","48038-4","4551-8","47383-5","9557-0","41476-3","9804-6","20468-5","33242-9","27821-8","3175-7","49572-1","23301-5","5256-3","21760-4","16117-4","41475-5","21416-3","24119-0","21582-2","5255-5","13947-7","14716-5","24125-7","13948-5","25474-8","49580-4","6021-0","26451-5","5908-9","16118-2","22751-2","4057-6","30525-0","32546-4","32164-6","9811-1","10355-6","15057-3","32109-1","6270-3","7613-3","14083-0","18182-6","41279-1","7883-2","20425-5","1746-7","20424-8","26479-6","70218-3","609-8","15643-0","14869-2","5814-9","30193-7","8047-3","38476-8","5834-7","6257-0","28009-9","13349-6","1992-7","26607-2","16263-6","47387-6","698-1","14721-5","7917-8","17122-3","32786-6","25521-6","6209-1","4633-4","4821-5","22203-4","6237-2","48049-1","5202-7","12308-3","9834-3","42192-5","70215-9","30437-8","6035-0","19643-6","18325-1","47226-6","17395-5","19074-4","12598-9","17123-1","36922-3","6194-5","5170-6","26536-3","49581-2","12210-1","7041-7","7042-5","29901-6","22110-1","14251-3","26535-5","19593-3","70197-9","59417-6","59412-7","6448-5","6137-4","5644-0","3093-2","14862-7","1007-4","59841-7","19768-1","5381-9","808-6","25726-1","14862-7__1","25835-0","35051-2","7893-1","15015-1","33917-6","15013-6","24378-2","6062-4","6220-8","6873-4","47440-3","44533-8","44538-7","5877-6","49846-9","9632-1","2032-1","71791-8","47364-5","13942-8","22463-4","10622-9","19088-4","47441-1","19089-2","15174-6","5000-5","19086-8","19087-6","7558-0","29280-5","43399-5","13462-7","49295-9","43441-5","21482-5","2597-3","2669-0","70205-0","25964-8","13327-2","26517-3","3193-0","71797-5","6367-7","41480-5","31788-3","31843-6","888-8","25987-9","40464-0","13227-4","58787-3","32284-2","19287-2","17852-5","6078-0","15388-2","31036-7","23871-7","15917-8","9610-7","9609-9","3187-2","43993-5","23860-0","3096-5","6998-9","25630-5","15076-3","19098-3","12229-1","20446-1","6059-0","13337-1","21112-8","25435-9","49835-2","32632-2","70239-9","5096-3","7774-3","5052-6","29675-6","29660-8","7981-4","40658-7","32147-1","22111-9","22362-8","15093-8","3198-9","70240-7","10386-1","13589-7","70214-2","8087-9","8220-6","70213-4","23876-6","42621-3","4477-6","6138-2","14703-3","6037-6","7632-3","10580-9","6460-0","20416-4","13941-0","47252-2","41487-0","14116-8","29539-4","33630-5","21821-4","33893-9","20398-4","15114-2","5234-0","16074-7","70212-6","15014-4","20431-3","49588-7","611-4","70211-8","31112-6","25418-5","65757-7","65752-8","65751-0","65754-4","15058-1","24521-7","14853-6","25383-1","6234-9","3786-1","11060-1","20469-3","50970-3","22315-6","17713-9","19125-4","49578-8","2749-0","11559-2","7415-3","34696-5","7901-2","49700-8","13627-5","15192-8","2030-5","11034-6","5838-8","24312-1","70198-7","550-4","25148-8","14117-6","26509-0","12209-3","666-8","12215-0","19734-3","2638-5","14875-9","20643-3","20636-7","5005-4","25473-0","20661-5","3861-2","12361-2","15097-9","14121-8","46268-9","3436-3","41163-7","20648-2","20649-0","24139-8","11183-1","44607-0","8015-0","6239-8","5116-9","1777-2","22568-0","13538-4","14976-5","19201-3","18482-0","32789-0","7445-0","35670-9","50927-3","17819-4","17811-1","17813-7","17815-2","17817-8","21027-8","13088-0","34165-1","8072-1","20660-7","20401-6","533-0","20651-6","9360-9","23870-9","59408-5","14678-7","15086-2","4991-6","22070-7","6286-9","32220-6","9326-0","9361-7","20637-5","20640-9","20644-1","20656-5","20658-1","20657-3","6029-3","20642-5","20645-8","20655-7","18903-5","17788-1","14246-3","3218-5","49058-1","6061-6","20781-1","32217-2","22412-1","20652-4","6733-0","20650-8","10853-0","5869-3","7059-9","15050-8","29767-1","20638-3","12201-0","20499-0","50758-2","26927-4","16195-0","6081-4","721-1","31209-0","1779-8","2334-1","16085-3","29591-5","24103-4","6038-4","38168-1","51844-9","15568-9","43734-3","75513-2","16982-1","20420-6","6125-9","30374-3","14812-2","10526-2","7796-6","5959-2","29559-2","18743-5","25447-4","6121-8","49838-6","6090-5","30192-9","6287-7","6349-5","4635-9","46128-5","2711-0","7797-4","8277-6","765-8","1926-5","7795-8","20456-0","2716-9","5819-8","5807-3","38995-7","46138-4","5335-5","25154-6","33215-5","5788-5","2272-3","10380-4","7817-0","5062-5","5786-9","33216-3","18311-1","11281-3","30003-8","5784-4","5775-2","5789-3","5773-7","25886-3","14958-3","33647-9","716-1","5798-4","2027-1","5815-6","5766-1","30350-3","27200-5","25149-6","25158-7","18487-9","24015-0","6437-8","20457-8","5812-3","5771-1","25147-0","40729-6","53835-5","5777-8","20455-2","45068-4","33905-1","30394-1","5795-0","18312-9","5776-0","27071-0","11043-7","32033-3","20578-1","31012-8","33256-9","708-8","18309-5","5156-5","51928-0","33569-5","45142-7","43182-5","53348-9","53339-8","32854-2","38473-5","53337-2","53342-2","53182-2","53189-7","53188-9","50106-4","53171-5","53172-3","50109-8","50113-0","50121-3","50125-4","53201-0","50132-0","53196-2","50281-5","53197-0","50157-7","53152-5","53154-1","53153-3","53393-5","46733-2","53344-8","47562-4","53398-4","53062-6","53200-2","38478-4","75217-0","38479-2","38481-8","53236-6","73700-7","73697-5","54083-1","14463-4","14464-2","14465-9","45094-0","80367-6","70164-9","6351-1","45084-1","45086-6","80363-5","53926-2","57288-3","80364-3","80360-1","80361-9","80362-7","80365-0","2077-6__1","42892-0","54092-2","53157-4","53399-2","57838-5","68916-6","50410-0","6683-7","68326-8","34571-0","48022-8","75507-4","75510-8","75509-0","75506-6","75508-2","75884-7","68325-0","5894-1","53346-3","46769-6","45197-1","45198-9","45199-7","45200-3","75511-6","46735-7","46736-5","64121-7","64120-9","54085-6","33288-2","42906-8","46737-3","53183-0","53184-8","53403-2","53185-5","53186-3","67710-4","67711-2","67701-3","46740-7","64122-5","45211-0","38486-7","19111-4","45216-9","53239-0","53238-2","53401-6","53240-8","45217-7","46779-5","47700-0","53397-6","53156-6","53187-1","45222-7","53181-4","67709-6","64117-5","30099-6","688-2","693-2","697-3","80368-4","21415-5","32705-6","53879-3","57289-1","80366-8","43384-7","80369-2","54108-6","54109-4","54106-0","49544-0","77018-0","77019-8","75547-0","73967-2","53175-6","53176-4","53177-2","53202-8","46744-9","59407-7","59418-4","73696-7","53198-8","53199-6","29571-7","29573-3","35572-7","53160-8","53163-2","53162-4","53164-0","75211-3","49048-2","64118-3","46765-4","53241-6","53231-7","62320-7","53190-5","53192-1","53191-3","53193-9","53194-7","53195-4","70159-9","64119-1","47784-4","29574-1","29575-8","31145-6","38506-2","48633-2","53159-0","35571-9","47799-2","53151-7"
            ]
        }
    }

}

/*
function getIndexCodesInParentGroupCodeLOINC(customCategory:any, subCategory:any, parentGroupCode:any):string[] {
    let codes:string[] = []
    const groupCodes:string[] = Object.keys(GlobalIndexLOINC.categorization[customCategory][subCategory][parentGroupCode])
    if (groupCodes && groupCodes.length && groupCodes.length>0) {
        groupCodes.forEach( function(groupCode:string) {
            codes.push(...GlobalIndexLOINC.categorization[customCategory][subCategory][parentGroupCode][groupCode])
        })
    }
    return codes
}
*/