
/**
 * Defines the structure of an attribute to be indexed for blind, searchable queries.
 * @see https://identity.foundation/confidential-storage/#indexed-attributes
 */
export interface IndexedAttribute {
  name: string;
  value: string;
  unique?: boolean;
  /**
   * The original data type of the `value` before it was converted to a string
   * for HMAC protection. This is essential for performing type-aware queries
   * (e.g., numerical range queries) on the indexed data.
   * If not present, the type is assumed to be 'string'.
   */
  type?: string;
}

/**
 * Defines an indexed portion of a confidential document, allowing specific attributes to be searchable.
 */
export interface IndexedData {
    attributes: IndexedAttribute[];
    hmac?: {
        id: string;
        type: string;
    };
    sequence?: number;
}

/**
 * Represents a complete Structured Document as defined by the Confidential Storage specification.
 * This is the canonical format for all documents persisted in a vault.
 * @see https://identity.foundation/confidential-storage/#structureddocument
 */
export interface ConfidentialStorageDoc {
    // 'id' is inherited from RecordBase
    id: string;
    status: string;
    versionId?: string;
    vaultId?: string;
    chunks?: number;

    /** A number that MUST be incremented each time the document is updated. */
    sequence: number;

    /** Contains an array of indexed attributes protected with HMAC for blind queries. */
    indexed?: IndexedData;
    
    /** The main, potentially encrypted, content of the document. */
    content?: Record<string, any>;

    /** The JWE representation of the encrypted content. It could be a URL in case of a bucket is used to store the JWE or chunks */
    jwe?: Record<string, any>;

    /** Metadata about the document. */
    meta?: {
        created?: string;
        contentType?: string;
        chunks?: number;
        gender?: string;
        jurisdiction?: string;
        yearOfBirth?: string;
        tags?: string; // comma-separated list of short words for big data analysis (IA)
    };
}