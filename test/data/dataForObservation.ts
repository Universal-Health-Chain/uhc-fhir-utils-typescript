
import { ClaimsObservationContext } from '../../src/models/params/Observation.params.model';
import { ConfidentialStorageDoc } from './dataForStorage';

/**
 * Test fixtures for the Observation flat-claims contract + how it is persisted in Confidential Storage.
 *
 * Important: At-rest protection applies to the entire `content` object (whatever you store there),
 * which in this platform is typically a "data entry" envelope:
 * `body.data[i] = { type, meta: { claims }, resource?, ... }`.
 *
 * `meta.tags` (document metadata) is NOT a frontend responsibility:
 * - The client submits `meta.claims` (and optionally a `resource`) in the request payload.
 * - The backend encrypts the full `content` into `jwe` and HMAC-protects `indexed.attributes`.
 * - The backend MAY add `doc.meta.tags` after storing for routing/analytics without decrypting.
 * - If the API returns a bundle/receipt containing entries, it MAY mirror stored `doc.meta.tags`
 *   into each `body.data[i].meta.tags` so clients can display/rout without decrypting.
 */

export const TEST_OBSERVATION_IDENTIFIER_URN =
  'urn:uuid:11b2c3d4-e5f6-7890-1234-567890abcdef' as const;

export const TEST_OBSERVATION_SUBJECT_DID =
  'did:web:api.acme.org:individual:unified-health-identifier' as const;

/**
 * What the client submits as claims.
 * Keys are contextualized (because request `@context = "org.hl7.fhir.api"`).
 * No `Observation.meta-tag` is required from the frontend.
 */
export const TEST_OBSERVATION_CLAIMS_FROM_CLIENT = {
  [ClaimsObservationContext.Context]: 'org.hl7.fhir.api',
  [ClaimsObservationContext.Type]: 'Observation:SelfReported',

  [ClaimsObservationContext.Subject]: TEST_OBSERVATION_SUBJECT_DID,
  [ClaimsObservationContext.Identifier]: TEST_OBSERVATION_IDENTIFIER_URN,

  [ClaimsObservationContext.Category]:
    'http://terminology.hl7.org/CodeSystem/observation-category|vital-signs',
  [ClaimsObservationContext.Code]: 'LOINC|29463-7',
  [ClaimsObservationContext.CodeUserSelected]: true,

  [ClaimsObservationContext.Issued]: '2025-11-27T10:00:00Z',
  [ClaimsObservationContext.DatePeriod]: '2025-01-01/2025-12-31',

  [ClaimsObservationContext.ValueQuantity]:
    'ge60|http://unitsofmeasure.org|kg,le90||kg',
} as const;

/**
 * Literal JSON view (same content) to make the wire payload easy to read in docs/tests.
 * This is derived from `TEST_OBSERVATION_CLAIMS_FROM_CLIENT` but written explicitly for clarity.
 */
export const TEST_OBSERVATION_CLAIMS_FROM_CLIENT_LITERAL = {
  '@context': 'org.hl7.fhir.api',
  '@type': 'Observation:SelfReported',
  'Observation.subject': TEST_OBSERVATION_SUBJECT_DID,
  'Observation.identifier': TEST_OBSERVATION_IDENTIFIER_URN,
  'Observation.category': 'http://terminology.hl7.org/CodeSystem/observation-category|vital-signs',
  'Observation.code': 'LOINC|29463-7',
  'Observation.code-userselected': true,
  'Observation.issued': '2025-11-27T10:00:00Z',
  'Observation.date-period': '2025-01-01/2025-12-31',
  'Observation.value-quantity': 'ge60|http://unitsofmeasure.org|kg,le90||kg',
} as const;

/**
 * What the gateway receives as one entry in `body.data[]` (the batch job payload).
 * This whole object is what ends up inside `ConfidentialStorageDoc.content` before encryption.
 */
export const TEST_OBSERVATION_DATA_ENTRY_FROM_CLIENT = {
  type: 'Observation-form-v1.0',
  meta: { claims: { ...TEST_OBSERVATION_CLAIMS_FROM_CLIENT } },
  resource: {
    resourceType: 'Observation',
    id: TEST_OBSERVATION_IDENTIFIER_URN.replace('urn:uuid:', ''),
  },
} as const;

/**
 * What the backend may derive and store for non-PII routing/analytics (kept outside encrypted content).
 * These tags are intentionally short and not meant to contain free text or direct identifiers.
 */
export const TEST_OBSERVATION_DERIVED_TAGS = 'Weight,VitalSigns' as const;

/**
 * Confidential Storage document constructed for persistence before protection (encryption/HMAC).
 * - `content` still exists (plaintext in-memory) and will be encrypted into `jwe`.
 * - `indexed.attributes` values are plaintext at this stage (will be HMAC-protected later).
 * - `meta.tags` is not required; backend may add it after storing.
 */
export const TEST_CONFIDENTIAL_OBSERVATION_DOC_TO_PROTECT: ConfidentialStorageDoc = {
  id: TEST_OBSERVATION_IDENTIFIER_URN,
  status: 'active',
  sequence: 0,
  content: { ...TEST_OBSERVATION_DATA_ENTRY_FROM_CLIENT },
  indexed: {
    attributes: [
      { name: 'identifier', value: TEST_OBSERVATION_IDENTIFIER_URN, unique: true, type: 'uri' },
      { name: 'subject', value: TEST_OBSERVATION_SUBJECT_DID, type: 'uri' },
      { name: 'code', value: 'LOINC|29463-7', type: 'token' },
    ],
  },
  meta: {
    created: '2025-11-27T10:00:00Z',
    contentType: 'org.hl7.fhir.api.Observation',
  },
};

/**
 * Representative persisted form after the backend:
 * - HMAC-protects `indexed.attributes.*` for blind queries
 * - Encrypts `content` into `jwe` and removes `content`
 * - Optionally sets `meta.tags`
 */
export const TEST_CONFIDENTIAL_OBSERVATION_DOC_STORED: ConfidentialStorageDoc = {
  id: TEST_OBSERVATION_IDENTIFIER_URN,
  status: 'active',
  sequence: 0,
  indexed: {
    attributes: [
      { name: 'hmac(name:identifier)', value: 'hmac(value:urn:uuid:...)', unique: true, type: 'uri' },
      { name: 'hmac(name:subject)', value: 'hmac(value:did:web:...)', type: 'uri' },
      { name: 'hmac(name:code)', value: 'hmac(value:LOINC|29463-7)', type: 'token' },
    ],
    hmac: { id: 'did:example:kms#hmac-key-1', type: 'Sha256HmacKey2019' },
  },
  jwe: {
    protected: 'eyJ...<protected-header>...',
    iv: '...',
    ciphertext: '...',
    tag: '...',
  },
  meta: {
    created: '2025-11-27T10:00:00Z',
    contentType: 'org.hl7.fhir.api.Observation',
    jurisdiction: 'cds-es',
    yearOfBirth: '1989',
    gender: 'female',
    // sexAtBirth: 'female',
    tags: TEST_OBSERVATION_DERIVED_TAGS,
  },
};

/**
 * Optional API-level mirroring: a bundle entry MAY expose `meta.tags` without revealing content.
 * This mirrors the persisted `doc.meta.tags` for UI routing, while keeping the full content encrypted at-rest.
 */
export const TEST_OBSERVATION_BATCH_RESPONSE_ENTRY = {
  type: 'Observation:Stored',
  meta: {
    tags: TEST_OBSERVATION_DERIVED_TAGS,
    claims: { ...TEST_OBSERVATION_CLAIMS_FROM_CLIENT },
  },
} as const;
