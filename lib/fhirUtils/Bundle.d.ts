import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class Bundle {
    constructor();
    /** First it checks if there is a valid 'Composition' resource (with title, type, date and status)
     * as first resource in the FHIR Bundle document, then return the type code if any or undefined */
    getTypeOfBundleDocumentComposition(fhirBundleDocument: R4.IBundle): string | undefined;
    /** it does not validate bundle document properties or Composition mandatory properties */
    getBundleDocumentComposition(fhirBundleDocument: R4.IBundle | undefined): R4.IComposition | undefined;
    /** First it checks if there is a valid 'Composition' resource (with title, type, date and status)
     * as first resource in the FHIR Bundle document, then return the type code if any or undefined */
    getBundleDocumentCompositionWithValidation(fhirBundleDocument: R4.IBundle | undefined): R4.IComposition | undefined;
    /** The first resource type in the bundle document must be a Composition of resources (the index): http://hl7.org/fhir/bundle.html */
    isIPS(bundleDocument: R4.IBundle): boolean;
    hasSections(bundleDocument: R4.IBundle): boolean;
    /**
     * It returns the code of the section or empty string ("") if not found.
     * Optionally, composition can be passed as parameter, but it is not required.
     */
    getSectionCodeForResourceId(bundleDocument: R4.IBundle, resourceId: string | undefined, composition?: R4.IComposition): string;
    /**
     * The permanent ID of a FHIR Document across any system
     * is the ID of the Composition resource as index of the document,
     * but not the bundle ID which can change across systems
     * and also is removed in canonicalizaton before signature (FHIR specifications).
     */
    getCompositionCleanID: (fhirBundle: R4.IBundle | undefined) => string;
    getTimestamp(fhirBundle: R4.IBundle): string;
    /**
     * 'defaultSectionLOINC' is used in case the FHIR Bundle does not have any section in a composition resource.
     * 'defaultServiceType' is used in case the FHIR resource does not have meta.serviceType as creator healthcare service of the resource.
     */
    getResourcesWithFilters(fhirBundle: R4.IBundle, defaultSectionLOINC?: string, defaultServiceType?: string, excludeResourceTypes?: string[], includeResourceTypes?: string[], withSectionsLOINC?: string[], fromServiceTypes?: string[], withCodes?: string[]): any[];
    getReferencesInSection(section: R4.IComposition_Section): R4.IReference[];
    getResourcesInSection(bundleDocument: R4.IBundle, sectionCode: string): any[];
    getAllResources(bundle: R4.IBundle): any[];
    getAllResourcesWithoutCompositionOrMessageHeader(bundle: R4.IBundle): any[];
    /** It gets resources with additional metadata */
    getResourcesByTypes(bundle: R4.IBundle, resourceTypes: string[]): any[];
    getResourceByIdInBundle(resourceId: string, bundle: R4.IBundle): any;
    /** It returns an arry of IDs, splitting the ID by "/" and getting the last string after the slash */
    getResourceIdsInBundle(bundle: R4.IBundle): string[];
    getResourceReferencesBySectionCodeLOINC(bundleDocumentIPS: R4.IBundle, sectionCode: string): string[];
    /** It replaces the given resource in the right Bundle.entry without generating Bundle.entry[].fullUrl */
    replaceResourceById(resource: any, bundle: R4.IBundle): R4.IBundle;
    getMediaInBundle(bundle: R4.IBundle): R4.IMedia[];
    addEntriesToBundle(bundle: R4.IBundle, entries: R4.IBundle_Entry[]): R4.IBundle;
    addEntriesBySection(bundleDocument: R4.IBundle, bundleEntries: R4.IBundle_Entry[], sectionCode: string, sectionSystem: string): R4.IBundle;
    /** It adds a bundle resource including Composition or HeaderMessage and skips if already present */
    addResourceAsBundleEntry(bundle: R4.IBundle, resource: any, fullUrl?: string): R4.IBundle;
    /** It adds resources to a given health section but excluding some resources by its type.
     * It returns error if composition does not exits in the document bundle.
     * 'fullUrlPrefix' can be passed for creating the 'fullUrl' in the bundle entries.
     * It uses addResourcesToComposition, addResourcesWithOptions and updateComposition.
     * TODO: generate reference as "resourceType/id"
     */
    addResourcesToSection(bundleDocument: R4.IBundle, resources: any[], sectionCode: string, excludeResources?: string[]): R4.IBundle;
    /** It adds the resource to the composition, updates the composition and adds the resource as bundle entry */
    addResourceToSection(bundleDocument: R4.IBundle, resource: any, sectionCode: string, fullUrl?: string): R4.IBundle;
    /** It adds resources both for Bundle document, Bundle composition and Bundle Message.
     * If sectionCodeLOINC is provided then the Bundle SHALL be a document with composition or it will throw an error */
    addResourcesWithOptions(bundle: R4.IBundle, resources?: any[], excludeResources?: string[], sectionCodeLOINC?: string, fullUrlPrefix?: string): R4.IBundle;
    /** it checks if composition exists and replace it or error. TODO: verify the ID? */
    updateComposition(bundleDocument: R4.IBundle, composition: R4.IComposition): R4.IBundle;
    /** Creates a Bundle document with all mandatory properties in the document 'Composition' resource (the index) */
    createBundleDocumentAndCompositionWithIds(bundleId: string, compositionId: string, authorReferenceId: string, date: string, title: string, status: R4.CompositionStatusKind, typeDocumentCode: string, typeDocumentSystem: string, typeDocumentDisplay: string, language?: string, resources?: any[], excludeResources?: string[]): R4.IBundle;
}
/** Creates a Bundle document with all mandatory properties in the document 'Composition' resource (the index) */
export declare function createBundleDocumentAndCompositionWithIds(bundleId: string, compositionId: string, authorReferenceId: string, date: string, title: string, status: R4.CompositionStatusKind, typeDocumentCode: string, typeDocumentSystem: string, typeDocumentDisplay: string, language?: string, resources?: any[], excludeResources?: string[]): R4.IBundle;
/** deprecated: use createBundleDocumentAndCompositionWithIds */
/** It filters resources by types adding section code LOINC from 1) Composition type, 2) given defaultCodeLOINC or 3) generic 'Medical records' */
export declare function getResourcesByTypesWithOptionalMetadata(fhirBundle: R4.IBundle, includeResourceTypes: string[], defaultCodeLOINC?: string): any[];
/**
 * 'defaultSectionLOINC' is used in case the FHIR Bundle does not have any section in a composition resource.
 * 'defaultServiceType' is used in case the FHIR resource does not have meta.serviceType as creator healthcare service of the resource.
 */
export declare function getResourcesWithFilters(fhirBundle: R4.IBundle, defaultSectionLOINC?: string, defaultServiceType?: string, excludeResourceTypes?: string[], includeResourceTypes?: string[], withSectionsLOINC?: string[], fromServiceTypes?: string[], withCodes?: string[]): any[];
export declare function getResourcesInSection(fhirBundle: R4.IBundle, loincSectionCode: string): any[];
/** It gets the section code LOINC for the resource from the Bundle document Composition, use the given 'defaultSectionLOINC' if not found or generic 'Medical records' if none */
export declare function getResourceWithOptionalMetaData(fhirResource: any, fhirBundle: R4.IBundle, defaultSectionLOINC?: string, defaultServiceType?: string): any;
/**
 * It returns the code of the section or empty string ("") if not found.
 * Optionally, the main function can pass the composition as parameter, but it is not required.
 */
export declare function getSectionCodeForResourceIdInBundle(bundleDocument: R4.IBundle, resourceId: string | undefined, composition?: R4.IComposition): string;
export declare function getCleanIdOfDocumentComposition(fhirBundle: R4.IBundle | undefined): string;
export declare function getTimestamp(fhirBundle: R4.IBundle): string;
export declare function isIPS(bundleDocument: R4.IBundle): boolean;
/** It assumes the composition index it the 1st resource in the Bundle Document or will return false */
export declare function hasSections(bundleDocument: R4.IBundle): boolean;
export declare function addEntriesToBundle(bundle: R4.IBundle, entries: R4.IBundle_Entry[]): R4.IBundle;
/** It returns error if composition does not exits in the document bundle. TODO: create and add a new composition?
 * TODO: exlude resources by resourceType
 */
export declare function addEntriesBySection(bundleDocument: R4.IBundle, bundleEntries: R4.IBundle_Entry[], sectionCode: string, sectionSystem: string): R4.IBundle;
/** It just adds a new entry (it does not update Composition or MessageHeader resources) */
export declare function addResourceAsBundleEntry(bundle: R4.IBundle, resource: any, fullUrl?: string): R4.IBundle;
/** It adds resources to a given health section but excluding some resources by its type.
 * It returns error if composition does not exits in the document bundle.
 * 'fullUrlPrefix' can be passed for creating the 'fullUrl' in the bundle entries.
 * It uses addResourcesToComposition, addResourcesWithOptions and updateComposition.
 * TODO: generate reference as "resourceType/id"
 */
export declare function addResourcesToSection(bundleDocument: R4.IBundle, resources: any[], sectionCode: string, excludeResources?: string[], fullUrlPrefix?: string): R4.IBundle;
/** It adds the resource to the composition, updates the composition and adds the resource as bundle entry */
export declare function addResourceToSection(bundleDocument: R4.IBundle, resource: any, sectionCode: string, fullUrl?: string): R4.IBundle;
/** It adds resources both for Bundle document, Bundle composition and Bundle Message.
 * If sectionCodeLOINC is provided then the Bundle SHALL be a document with composition or it will throw an error */
export declare function addResourcesWithOptions(bundle: R4.IBundle, resources?: any[], sectionCodeLOINC?: string, excludeResources?: string[], fullUrlPrefix?: string): R4.IBundle;
export declare function getReferencesInSection(section: R4.IComposition_Section): R4.IReference[];
/** It gets all the resources excluding some resource types if provided
 * and adds meta.section if the document has sections or the default LOINC section code if given */
export declare function getResourceIdsInBundle(bundle: R4.IBundle): string[];
export declare function getResourceReferencesBySectionCodeLOINC(bundleDocumentIPS: R4.IBundle, sectionCode: string): string[];
export declare function getResourceByIdInBundle(resourceId: string, bundle: R4.IBundle): any;
export declare function replaceResourceById(resource: any, bundle: R4.IBundle): R4.IBundle;
export declare function getMediaInBundle(bundle: R4.IBundle): R4.IMedia[];
/** First it checks if there is a valid 'Composition' resource (with title, type, date and status)
 * as first resource in the FHIR Bundle document, then return the type code if any or undefined */
export declare function getBundleDocumentCompositionWithValidation(fhirBundleDocument: R4.IBundle | undefined): R4.IComposition | undefined;
/** it does not validate bundle document properties or Composition mandatory properties */
export declare function getBundleDocumentComposition(fhirBundleDocument: R4.IBundle | undefined): R4.IComposition | undefined;
