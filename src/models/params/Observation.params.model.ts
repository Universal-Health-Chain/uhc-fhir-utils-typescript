/**
 * # Personal Observations (org.hl7.fhir.api) — Flat Claims Contract
 *
 * This file defines the canonical and contextualized flat-claim keys for collecting **self-reported**
 * Observations (non-clinical/personal data) using `@context = "org.hl7.fhir.api"`.
 *
 * ## 1) Contextualized vs Canonical keys
 *
 * When a claims object includes:
 *
 * ```json
 * { "@context": "org.hl7.fhir.api", ... }
 * ```
 *
 * clients MAY send **contextualized** keys like:
 * - `"Observation.code"`
 * - `"Observation.value-quantity"`
 *
 * The SDK/gateway MUST normalize them to **canonical** keys before storage/matching/hashing:
 * - `"org.hl7.fhir.api.Observation.code"`
 * - `"org.hl7.fhir.api.Observation.value-quantity"`
 *
 * Interoperable keys from other namespaces (e.g., `org.ilo.isco.*`) MUST NOT be prefixed.
 *
 * ## 2) Naming convention: FHIR Search Parameters style
 *
 * For values, we follow the **FHIR Search Parameters** naming whenever possible:
 * - `Observation.value-string` (string)
 * - `Observation.value-concept` (token "system|code")
 * - `Observation.value-date` (date/dateTime/period expressed as ISO strings)
 * - `Observation.value-quantity` (quantity search syntax)
 *
 * This makes the contract familiar and easy to map to FHIR R4/R5/R6 resources later.
 *
 * ## 3) Quantity encoding (FHIR search syntax)
 *
 * `Observation.value-quantity` uses the FHIR `quantity` parameter syntax:
 *
 * - `{prefix}{number}`
 * - `{prefix}{number}|{system}|{code}`
 * - `{prefix}{number}||{code}`
 *
 * Where:
 * - `prefix` is optional: `eq, ne, gt, lt, ge, le, sa, eb, ap`
 * - `system|code` is typically UCUM (`http://unitsofmeasure.org`)
 *
 * ### Repeated parameters (ranges) in flat-claims
 *
 * In URLs, FHIR often repeats a parameter for ranges, e.g.:
 * `?value-quantity=ge60|...|kg&value-quantity=le90|...|kg`
 *
 * In flat-claims (JSON), we represent repetition as a **comma-separated list**:
 *
 * ```json
 * "Observation.value-quantity": "ge60|http://unitsofmeasure.org|kg,le90|http://unitsofmeasure.org|kg"
 * ```
 *
 * Each comma-separated item MUST be a valid FHIR quantity expression.
 *
 * ### UCUM defaulting rule (platform-specific)
 *
 * This platform MAY treat missing `system` (`||kg`) as UCUM for common UCUM units:
 *
 * ```json
 * "Observation.value-quantity": "ge60|http://unitsofmeasure.org|kg,le90||kg"
 * ```
 *
 * IMPORTANT:
 * - In pure FHIR, `||kg` does NOT strictly mean UCUM; it means "match by code (or human unit)".
 * - Here, we **optionally default to UCUM** for developer convenience and interoperability.
 *
 * ## 4) Time semantics: issued vs effective (date*)
 *
 * - `Observation.issued` = when the app recorded/captured the observation (ISO dateTime).
 * - `Observation.date*` fields describe when the finding applies (effective[x]):
 *   - `Observation.date` = generic effective date/dateTime (ISO string)
 *   - `Observation.date-period` = ISO 8601 interval `start/end` (string)
 *   - `Observation.date-when` = EventTiming bucket: `MORN|AFT|EVE|NIGHT`
 *   - optional advanced schedule controls are exposed via `Observation.date-*` keys.
 *
 * ## 5) meta-tag convention (UI/AI routing)
 *
 * `Observation.meta-tag` is a comma-separated list of **short English labels** for grouping/routing:
 * - Example: `"Anxiety,Night"`
 *
 * Do NOT place numeric quantities in `meta-tag`. Use `value-*` instead.
 *
 * ## 6) Examples (contextualized claims)
 *
 * ### Example A: "Anxiety at night" (string value + tags)
 * ```json
 * {
 *   "@context": "org.hl7.fhir.api",
 *   "@type": "Observation:SelfReported",
 *   "Observation.subject": "did:web:api.acme.org:individual:<unified-health-identifier>",
 *   "Observation.category": "http://terminology.hl7.org/CodeSystem/observation-category|social-history",
 *   "Observation.code": "SNOMED|48694002",
 *   "Observation.code-userselected": true,
 *   "Observation.issued": "2025-11-27T10:00:00Z",
 *   "Observation.date-when": "NIGHT",
 *   "Observation.value-string": "Feels anxious at night.",
 *   "Observation.meta-tag": "Anxiety,Night"
 * }
 * ```
 *
 * ### Example B: "Body weight between 60 and 90 kg" (quantity list)
 * ```json
 * {
 *   "@context": "org.hl7.fhir.api",
 *   "@type": "Observation:SelfReported",
 *   "Observation.subject": "did:web:api.acme.org:individual:<unified-health-identifier>",
 *   "Observation.category": "http://terminology.hl7.org/CodeSystem/observation-category|vital-signs",
 *   "Observation.code": "LOINC|29463-7",
 *   "Observation.value-quantity": "ge60|http://unitsofmeasure.org|kg,le90||kg",
 *   "Observation.meta-tag": "Weight"
 * }
 * ```
 */

export enum ObservationParameters {
  Subject = 'org.hl7.fhir.api.Observation.subject',
  Category = 'org.hl7.fhir.api.Observation.category',
  Identifier = 'org.hl7.fhir.api.Observation.identifier',

  Code = 'org.hl7.fhir.api.Observation.code',
  CodeUserSelected = 'org.hl7.fhir.api.Observation.code-userselected',

  Issued = 'org.hl7.fhir.api.Observation.issued',

  Date = 'org.hl7.fhir.api.Observation.date',
  DatePeriod = 'org.hl7.fhir.api.Observation.date-period',

  DateWhen = 'org.hl7.fhir.api.Observation.date-when',
  DateTimeOfDay = 'org.hl7.fhir.api.Observation.date-time-of-day',
  DateDayOfWeek = 'org.hl7.fhir.api.Observation.date-day-of-week',

  DateBoundsPeriod = 'org.hl7.fhir.api.Observation.date-bounds-period',
  DateBoundsDuration = 'org.hl7.fhir.api.Observation.date-bounds-duration',
  DateBoundsRange = 'org.hl7.fhir.api.Observation.date-bounds-range',

  DateCount = 'org.hl7.fhir.api.Observation.date-count',
  DateCountMax = 'org.hl7.fhir.api.Observation.date-count-max',

  DateDuration = 'org.hl7.fhir.api.Observation.date-duration',
  DateDurationMax = 'org.hl7.fhir.api.Observation.date-duration-max',
  DateDurationUnit = 'org.hl7.fhir.api.Observation.date-duration-unit',

  DateFrequency = 'org.hl7.fhir.api.Observation.date-frequency',
  DateFrequencyMax = 'org.hl7.fhir.api.Observation.date-frequency-max',

  DatePeriodValue = 'org.hl7.fhir.api.Observation.date-period-value',
  DatePeriodMax = 'org.hl7.fhir.api.Observation.date-period-max',
  DatePeriodUnit = 'org.hl7.fhir.api.Observation.date-period-unit',

  DateOffset = 'org.hl7.fhir.api.Observation.date-offset',

  ValueConcept = 'org.hl7.fhir.api.Observation.value-concept',
  ValueDate = 'org.hl7.fhir.api.Observation.value-date',
  ValueQuantity = 'org.hl7.fhir.api.Observation.value-quantity',
  ValueString = 'org.hl7.fhir.api.Observation.value-string',

  MetaTag = 'org.hl7.fhir.api.Observation.meta-tag',
}

/**
 * When `@context` is set to `"org.hl7.fhir.api"`, claim keys MAY be sent in contextualized form
 * (e.g., `"Observation.code"`) by omitting the `@context` namespace prefix.
 * The gateway/SDK MUST normalize them to canonical form (e.g., `"org.hl7.fhir.api.Observation.code"`)
 * before storage, matching, and hashing.
 */
export enum ClaimsObservationContext {
  /** FHIR claims namespace. Must be "org.hl7.fhir.api". */
  Context = '@context',

  /** Optional discriminator. Example: "Observation:SelfReported". */
  Type = '@type',

  /** Subject DID (the individual the observation is about). */
  Subject = 'Observation.subject',

  /** Category token. Example: "http://terminology.hl7.org/CodeSystem/observation-category|social-history". */
  Category = 'Observation.category',

  /** Observation identifier (URN). Example: "urn:uuid:11b2c3d4-e5f6-7890-1234-567890abcdef". */
  Identifier = 'Observation.identifier',

  /** Observation code token. Example: "SNOMED|48694002" or "LOINC|54728-1". */
  Code = 'Observation.code',

  /** True if user explicitly selected the code (picker). */
  CodeUserSelected = 'Observation.code-userselected',

  /** Capture timestamp (ISO 8601 dateTime). */
  Issued = 'Observation.issued',

  /** Generic effective[x] date filter (ISO date/dateTime). */
  Date = 'Observation.date',

  /**
   * ISO 8601 interval "<start>/<end>" where each side is an ISO date or dateTime.
   * Examples:
   * - "2025-01-01/2025-12-31"
   * - "2025-11-27T20:00:00Z/2025-12-27T20:00:00Z"
   */
  DatePeriod = 'Observation.date-period',

  /** Time-of-day bucket (FHIR EventTiming). Allowed: MORN|AFT|EVE|NIGHT. */
  DateWhen = 'Observation.date-when',

  /** Specific time of day. Format: "HH:MM" or "HH:MM:SS". */
  DateTimeOfDay = 'Observation.date-time-of-day',

  /** Comma-separated weekdays: "mon,tue,wed,thu,fri,sat,sun". */
  DateDayOfWeek = 'Observation.date-day-of-week',

  /**
   * ISO 8601 interval "<start>/<end>" where each side is an ISO date or dateTime.
   * Examples:
   * - "2025-01-01/2025-12-31"
   * - "2025-11-27T20:00:00Z/2025-12-27T20:00:00Z"
   */
  DateBoundsPeriod = 'Observation.date-bounds-period',

  /** Timing.repeat.boundsDuration (Duration). Encode as FHIR quantity string. Example: "30|http://unitsofmeasure.org|d" */
  DateBoundsDuration = 'Observation.date-bounds-duration',

  /** Timing.repeat.boundsRange (Range). Encode as comma-separated quantity expressions. Example: "ge10|http://unitsofmeasure.org|mg,le20||mg" */
  DateBoundsRange = 'Observation.date-bounds-range',

  /** Repeat count. */
  DateCount = 'Observation.date-count',

  /** Repeat count max. */
  DateCountMax = 'Observation.date-count-max',

  /** Repeat duration (number). */
  DateDuration = 'Observation.date-duration',

  /** Repeat duration max (number). */
  DateDurationMax = 'Observation.date-duration-max',

  /** Repeat duration unit. Allowed: s|min|h|d|wk|mo|a. */
  DateDurationUnit = 'Observation.date-duration-unit',

  /** Repeat frequency (number of events per period). */
  DateFrequency = 'Observation.date-frequency',

  /** Repeat frequency max. */
  DateFrequencyMax = 'Observation.date-frequency-max',

  /** Repeat period value. */
  DatePeriodValue = 'Observation.date-period-value',

  /** Repeat period max. */
  DatePeriodMax = 'Observation.date-period-max',

  /** Repeat period unit. Allowed: s|min|h|d|wk|mo|a. */
  DatePeriodUnit = 'Observation.date-period-unit',

  /** Repeat offset in minutes. */
  DateOffset = 'Observation.date-offset',

  /**
   * Quantity value using FHIR quantity search syntax:
   * "{prefix}{number}|{system}|{code}".
   * Example: "le5.4|http://unitsofmeasure.org|mg".
   */
  ValueQuantity = 'Observation.value-quantity',

  /** String value. Example: "Feels anxious at night." */
  ValueString = 'Observation.value-string',

  /** Date/dateTime/period value as ISO string (or "<start>/<end>" if period). */
  ValueDate = 'Observation.value-date',

  /** Coded value token "system|code". Example yes/no: "http://terminology.hl7.org/CodeSystem/v2-0136|Y". */
  ValueConcept = 'Observation.value-concept',

  /** Short English classifier tags, comma-separated. Example: "Anxiety,Night". */
  MetaTag = 'Observation.meta-tag',
}

export type ObservationTemplateContextualized = {
  /** Must be exactly "org.hl7.fhir.api". Defines the contextualized prefix for claim keys. */
  [ClaimsObservationContext.Context]: 'org.hl7.fhir.api';

  /** Optional discriminator for business meaning (e.g., "Observation:SelfReported"). */
  [ClaimsObservationContext.Type]?: string;

  /** Subject (individual) DID of the observation context. */
  [ClaimsObservationContext.Subject]: string;

  /** Observation category token. Example: "http://terminology.hl7.org/CodeSystem/observation-category|social-history". */
  [ClaimsObservationContext.Category]?: string;

  /** Observation identifier (URN). Example: "urn:uuid:11b2c3d4-e5f6-7890-1234-567890abcdef". */
  [ClaimsObservationContext.Identifier]?: string;

  /** Observation code as token "system|code". Example: "SNOMED|48694002" or "LOINC|54728-1". */
  [ClaimsObservationContext.Code]?: string;

  /** True if the code was explicitly selected by the user (e.g., from a picker). */
  [ClaimsObservationContext.CodeUserSelected]?: boolean;

  /** When the Observation was captured/recorded by the app (ISO 8601 dateTime string). */
  [ClaimsObservationContext.Issued]?: string;

  /**
   * Generic effective[x] filter (FHIR search-param concept "date").
   * Use ISO date/dateTime string. Example: "2025-11-27" or "2025-11-27T10:00:00Z".
   */
  [ClaimsObservationContext.Date]?: string;

  /**
   * Convenience range for effective[x] as "<start>/<end>" (both ISO date/dateTime).
   * Example: "2025-01-01/2025-12-31".
   */
  [ClaimsObservationContext.DatePeriod]?: string;

  /**
   * Time-of-day bucket for recurring patterns (FHIR EventTiming).
   * Allowed: "MORN" | "AFT" | "EVE" | "NIGHT".
   */
  [ClaimsObservationContext.DateWhen]?: string;

  /** Specific time-of-day constraint for the pattern. Format: "HH:MM" or "HH:MM:SS". */
  [ClaimsObservationContext.DateTimeOfDay]?: string;

  /** Comma-separated weekdays for the pattern. Example: "mon,tue,wed". */
  [ClaimsObservationContext.DateDayOfWeek]?: string;

  /** Bounds period for the schedule as "<start>/<end>" (ISO date/dateTime). */
  [ClaimsObservationContext.DateBoundsPeriod]?: string;

  /** Timing.repeat.boundsDuration (string form; only needed for advanced schedules). */
  [ClaimsObservationContext.DateBoundsDuration]?: string;

  /** Timing.repeat.boundsRange (string form; only needed for advanced schedules). */
  [ClaimsObservationContext.DateBoundsRange]?: string;

  /** Timing.repeat.count (how many times to repeat). */
  [ClaimsObservationContext.DateCount]?: number;

  /** Timing.repeat.countMax (maximum repeats). */
  [ClaimsObservationContext.DateCountMax]?: number;

  /** Timing.repeat.duration (duration of each occurrence). */
  [ClaimsObservationContext.DateDuration]?: number;

  /** Timing.repeat.durationMax (max duration of each occurrence). */
  [ClaimsObservationContext.DateDurationMax]?: number;

  /** Timing.repeat.durationUnit (FHIR unitsOfTime: "s|min|h|d|wk|mo|a"). */
  [ClaimsObservationContext.DateDurationUnit]?: string;

  /** Timing.repeat.frequency (events per period). */
  [ClaimsObservationContext.DateFrequency]?: number;

  /** Timing.repeat.frequencyMax (max frequency). */
  [ClaimsObservationContext.DateFrequencyMax]?: number;

  /** Timing.repeat.period (period length). */
  [ClaimsObservationContext.DatePeriodValue]?: number;

  /** Timing.repeat.periodMax (max period length). */
  [ClaimsObservationContext.DatePeriodMax]?: number;

  /** Timing.repeat.periodUnit (FHIR unitsOfTime: "s|min|h|d|wk|mo|a"). */
  [ClaimsObservationContext.DatePeriodUnit]?: string;

  /** Timing.repeat.offset (minutes from event start). */
  [ClaimsObservationContext.DateOffset]?: number;

  /**
   * Observation value as FHIR quantity search syntax.
   * Example: "le5.4|http://unitsofmeasure.org|mg" or "5.4||mg" or "5.4".
   */
  [ClaimsObservationContext.ValueQuantity]?: string;

  /** Observation value as string (free text). */
  [ClaimsObservationContext.ValueString]?: string;

  /**
   * Observation value if it's a date/dateTime/period.
   * Use ISO strings or "<start>/<end>" if you choose to mirror DatePeriod convention.
   */
  [ClaimsObservationContext.ValueDate]?: string;

  /** Observation value as token "system|code". Example yes/no: "http://terminology.hl7.org/CodeSystem/v2-0136|Y". */
  [ClaimsObservationContext.ValueConcept]?: string;

  /**
   * Optional short English classifier tags for search/routing, comma-separated.
   * Example: "Anxiety,Night".
   */
  [ClaimsObservationContext.MetaTag]?: string;
};
