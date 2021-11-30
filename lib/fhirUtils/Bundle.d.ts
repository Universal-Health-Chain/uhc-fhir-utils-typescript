import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class Bundle {
    constructor();
    getDocumentKindInComposition(bundleDocument: R4.IBundle): string | undefined;
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
    /** It adds a bundle resource including Composition or HeaderMessage and skips if already present */
    addResourceToBundle(bundle: R4.IBundle, resource: any): R4.IBundle;
    /** It adds resources except 'Composition', 'MessageHeader' and also skips if empty resource.id or already exists, both for Bundle Document and Bundle Message */
    addResourcesToBundle(bundle: R4.IBundle, resources?: any[]): R4.IBundle;
    createBundleDocumentWithTypeLOINC(resources?: any[], authorReferenceId?: string, typeDocumentCodeLOINC?: string): R4.IBundle;
    createEmptyIPS(authorReferenceId: string): R4.IBundle;
    addEntriesToBundle(bundle: R4.IBundle, entries: R4.IBundle_Entry[]): R4.IBundle;
    addResourcesBySection(bundleDocument: R4.IBundle, sectionCode: string, resources: any[]): R4.IBundle;
    addEntriesBySection(bundleDocument: R4.IBundle, bundleEntries: R4.IBundle_Entry[], sectionCode: string, sectionSystem: string): R4.IBundle;
    getReferencesInSection(section: R4.IComposition_Section): R4.IReference[];
    getResourcesInSection(bundleDocument: R4.IBundle, sectionCode: string): any[];
    getAllResources(bundle: R4.IBundle): any[];
    getAllResourcesWithoutCompositionOrMessageHeader(bundle: R4.IBundle): any[];
    getResourcesByTypes(bundle: R4.IBundle, resourceTypes: string[]): any[];
    getResourceByIdInBundle(resourceId: string, bundle: R4.IBundle): any;
    /** It returns an arry of IDs, splitting the ID by "/" and getting the last string after the slash */
    getResourceIdsInBundle(bundle: R4.IBundle): string[];
    getResourceReferencesBySectionCodeLOINC(bundleDocumentIPS: R4.IBundle, sectionCode: string): string[];
    /** It replaces the given resource in the right Bundle.entry without generating Bundle.entry[].fullUrl */
    replaceResourceById(resource: any, bundle: R4.IBundle): R4.IBundle;
    getMediaInBundle(bundle: R4.IBundle): R4.IMedia[];
}
export declare function getResourcesByTypes(fhirBundle: R4.IBundle, includeResourceTypes: string[]): any[];
/**
 * 'defaultSectionLOINC' is used in case the FHIR Bundle does not have any section in a composition resource.
 * 'defaultServiceType' is used in case the FHIR resource does not have meta.serviceType as creator healthcare service of the resource.
 */
export declare function getResourcesWithFilters(fhirBundle: R4.IBundle, defaultSectionLOINC?: string, defaultServiceType?: string, excludeResourceTypes?: string[], includeResourceTypes?: string[], withSectionsLOINC?: string[], fromServiceTypes?: string[], withCodes?: string[]): any[];
export declare function getResourcesInSection(fhirBundle: R4.IBundle, loincSectionCode: string): any[];
export declare function getAllResourcesInBundle(fhirBundle: R4.IBundle, defaultSectionLOINC?: string, defaultServiceType?: string): any[];
export declare function getResourceWithOptionalMetaData(fhirResource: any, fhirBundle: R4.IBundle, defaultSectionLOINC?: string, defaultServiceType?: string): any;
/**
 * It returns the code of the section or empty string ("") if not found.
 * Optionally, the main function can pass the composition as parameter, but it is not required.
 */
export declare function getSectionCodeForResourceIdInBundle(bundleDocument: R4.IBundle, resourceId: string | undefined, composition?: R4.IComposition): string;
export declare function getCleanIdOfDocumentComposition(fhirBundle: R4.IBundle | undefined): string;
export declare function getTimestamp(fhirBundle: R4.IBundle): string;
export declare function addResourceToBundle(bundle: R4.IBundle, resource: any): R4.IBundle;
/** It adds resources except 'Composition', 'MessageHeader' and also skips if empty resource.id or already exists, both for Bundle Document and Bundle Message */
export declare function addResourcesToBundle(bundle: R4.IBundle, resources?: any[]): R4.IBundle;
export declare function createBundleDocumentWithComposition(resources?: any[], authorReferenceId?: string, typeDocumentCodeLOINC?: string): R4.IBundle;
export declare function isIPS(bundleDocument: R4.IBundle): boolean;
export declare function getDocumentKindInComposition(bundleDocument: R4.IBundle): string | undefined;
/** It assumes the composition index it the 1st resource in the Bundle Document or will return false */
export declare function hasSections(bundleDocument: R4.IBundle): boolean;
export declare function createEmptyIPS(authorReferenceId: string): R4.IBundle;
export declare function addEntriesToBundle(bundle: R4.IBundle, entries: R4.IBundle_Entry[]): R4.IBundle;
export declare function addResourcesBySection(bundleDocument: R4.IBundle, sectionCode: string, resources: any[]): R4.IBundle;
export declare function addEntriesBySection(bundleDocument: R4.IBundle, bundleEntries: R4.IBundle_Entry[], sectionCode: string, sectionSystem: string): R4.IBundle;
export declare function getReferencesInSection(section: R4.IComposition_Section): R4.IReference[];
/** It gets all the resources excluding some resource types if provided
 * and adds meta.section if the document has sections or the default LOINC section code if given */
export declare function getResourceIdsInBundle(bundle: R4.IBundle): string[];
export declare function getResourceReferencesBySectionCodeLOINC(bundleDocumentIPS: R4.IBundle, sectionCode: string): string[];
export declare function getResourceByIdInBundle(resourceId: string, bundle: R4.IBundle): any;
export declare function replaceResourceById(resource: any, bundle: R4.IBundle): R4.IBundle;
export declare function getMediaInBundle(bundle: R4.IBundle): R4.IMedia[];
