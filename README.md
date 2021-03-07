# uhc-fhir-utils-typescript

Each time a new message is created, it SHALL be assigned an identifier (MessageHeader.id)
An incoming message contains two identifiers:
    - MessageHeader.id (the id of the message)
    - Bundle.id (works as a document id in pouchDB)

A message has 2 important timestamps:
    - Bundle.timestamp: the time the message was sent
    - Bundle.meta.lastUpdated: the last time the message was updated (either by storing, or by modification)

To receive messages, a receiver searches for all messages destined for itself, since its last check:
 GET [base]/Bundle?message.destination-uri=[rcv]&_lastUpdated=>2015-03-01T02:00:02+01:00

The receiver works through the response, processing each message.
As each message is processed, the receiver creates a response message, reversing the source and destination, and posts it back to the server.

To check for responses, the original sender searches for response messages destined for itself, since its last check:
 GET [base]/Bundle?message.destination-uri=[snd]&message.response-id:missing=false&_lastUpdated=>2015-03-03T06:03:522+01:00

MessageHeader.source.endpoint: “message source address or id” ( bundle.entry[0].resource.source.endpoint )
MessageHeader.destination.endpoint: “destination address or id”

AuditEvent can track electronic disclosures of information, but it cannot track conversations, phone calls, letters and other interactions that are not system-to-system.

AuditEvents are not considered to be "part" of the patient record, while Communication instances are.

Communication is used when a clinician or other user wants to ensure a record of a particular communication is itself maintained as part of the reviewable health record.

A same connection can be used for different senders (parents, guardians) about the same subject (children, dependant)

nacl.secretbox uses symmetrical crypto, a single key for encrypting and decrypting.

nacl.box uses asymmetric public key encryption. A secret and public key pair are generated twice (pairA, pairB) for end-to-end communication and both parts will derive the same shared key (Diffie–Hellman logic) with the own secret key (private) and with the peer's public key.

Also signing and box keys are different. To use only one key for both, see https://github.com/dchest/ed2curve-js.

To work like RSA, generate a random ephemeral key pair (one time use), use its secret key to box, and send the public key along with ciphertext.

Receiver will then combine this public key with their secret key to open the box (the secret ephemeral key is not needed anymore)

NOTE: the @stablelib/utf8 encodeUTF8 and encodeUTF8 functions work the other way around as in the examples with nacl-util but in the same way as encodeBase64 and decodeBase64 do (more clear).
An example: https://github.com/dchest/tweetnacl-js/wiki/Examples

jsSHA is a JavaScript/TypeScript implementation of the entire family of SHA hashes as defined in FIPS PUB 180-4, FIPS PUB 202, and SP 800-185 as well as HMAC as defined in FIPS PUB 198-1.

The FHIR hash of the data uses SHA-1 and it is represented using base64: https://www.hl7.org/fhir/datatypes-definitions.html#Attachment.hash

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
