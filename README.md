# uhc-fhir-utils-typescript

Changelog:
v1.2.0
- added "Prophylaxis" in some vaccine functions to differentiate them from vaccine "Product" (manufactured) ones.
- vaccineCodesCVX() is now vaccineProphylaxisCodesCVX()
- vaccineCodeATC() is now vaccineProphylaxisCodeATC()
- vaccineCodesCovid19() is now vaccineProphylaxisCodesGlobal()
- isCovid19Vaccine() is now isCovid19VaccineProphylaxis()
- added covid19VaccineProphylaxisCodesSNOMED()

Each time a new FHIR message is created, it SHALL be assigned an identifier (MessageHeader.id)
An incoming message contains two identifiers:
    - MessageHeader.id (the id of the message)
    - Bundle.id (works as a document id in pouchDB)

A message has 2 important timestamps:
    - Bundle.timestamp: the time the message was sent
    - Bundle.meta.lastUpdated: the last time the message was updated (either by storing, or by modification)

To receive messages, a receiver searches for all messages destined for itself, since its last check:
 GET [base]/Bundle?message.destination-uri=[rcv]&_lastUpdated=>2021-18-02T17:35:15+01:00

The receiver works through the response, processing each message.
As each message is processed, the receiver creates a response message, reversing the source and destination, and posts it back to the server.

To check for responses, the original sender searches for response messages destined for itself, since its last check:
 GET [base]/Bundle?message.destination-uri=[snd]&message.response-id:missing=false&_lastUpdated=>2015-03-03T06:03:522+01:00

MessageHeader.source.endpoint: “message source address or id” ( bundle.entry[0].resource.source.endpoint )
MessageHeader.destination.endpoint: “destination address or id”

AuditEvent can track electronic disclosures of information, but it cannot track conversations, phone calls, letters and other interactions that are not system-to-system.

AuditEvents are not considered to be "part" of the patient record, while Communication instances are.

Communication is used when a clinician or other user wants to ensure a record of a particular communication is itself maintained as part of the reviewable health record.

The hash in FHIR Attachment is SHA-1 and it is represented using base64: https://www.hl7.org/fhir/datatypes-definitions.html#Attachment.hash

IPS List of Profiles

Following are the profiles that have been defined for each section. (R) denotes a required section (i.e. must be present in an IPS), (S) denotes a recommended section, the others are optional:

Medication Summary (R) [ Medication Statement (IPS) | Medication (IPS) ]
Allergies and Intolerances (R) [ Allergy Intolerance (IPS) ]
Problem List (R) [ Condition (IPS) ]
Immunizations (S) [ Immunization (IPS) ]
History of Procedures (S) [ Procedure (IPS) | Organization (IPS) | Device (performer, observer) ]
Medical Devices (S) [ Device Use Statement (IPS) | Device (IPS) ]
Diagnostic Results (S) [ Observation (Results) | DiagnosticReport (IPS) | Organization (IPS) ]
Laboratory results [ Observation (Results: laboratory) | Specimen (IPS) | Media observation (Results: laboratory, media) ]
Radiology results [ Observation (Results: radiology) | Device (performer, observer) | Imaging Study (IPS) | Practitioner (IPS) ]
Pathology results [ Observation (Results: pathology) | Specimen (IPS) | Media observation (Results: laboratory, media) ]
Vital Signs [ Vital Signs ]
Past history of illnesses [ Condition (IPS) ]
Pregnancy (status and history summary) [ Observation (Pregnancy: EDD) | Observation (Pregnancy: outcome) | Observation (Pregnancy: status) ]
Social History [ Observation (SH: alcohol use) | Observation (SH: tobacco use) ]
Functional Status (Autonomy / Invalidity) [ Condition (IPS) | Clinical Impression ]
Plan of care [ Care Plan ]
Advance Directives [ Consent ]
