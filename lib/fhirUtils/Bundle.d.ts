import { R4 } from "@ahryman40k/ts-fhir-types";
export declare class Bundle {
    constructor();
    /** The permanent ID of a FHIR Document across any system is the ID of the Composition of resources */
    getCleanIdOfDocumentComposition: (fhirBundle: R4.IBundle | undefined) => string;
    getTimestamp(fhirBundle: R4.IBundle): string;
    /** Bundle type can be "document" but also "collection", "message", "history"... */
    getTagsInBundle(fhirBundle: R4.IBundle): string[];
    /** The first resource type in the bundle document must be a Composition of resources (the index): http://hl7.org/fhir/bundle.html */
    isIPS(bundleDocument: R4.IBundle): boolean;
    /** It adds a bundle resource including Composition or HeaderMessage and skips if already present */
    addResourceToBundle(bundle: R4.IBundle, resource: any, sectionCode?: string, sectionSystem?: string): R4.IBundle;
    /** It adds resources except 'Composition', 'MessageHeader' and also skips if empty resource.id or already exists, both for Bundle Document and Bundle Message */
    addAdditionalResourcesToBundle(bundle: R4.IBundle, resources?: any[], sectionCode?: string, sectionSystem?: string): R4.IBundle;
    createBundleDocumentWithTypeLOINC(resources?: any[], authorReferenceId?: string, typeDocumentCodeLOINC?: string): R4.IBundle;
    createEmptyIPS(authorReferenceId: string): R4.IBundle;
    addEntriesToBundle(bundle: R4.IBundle, entries: R4.IBundle_Entry[]): R4.IBundle;
    addResourcesBySection(bundleDocument: R4.IBundle, sectionCode: string, resources: any[]): R4.IBundle;
    addEntriesBySection(bundleDocument: R4.IBundle, bundleEntries: R4.IBundle_Entry[], sectionCode: string, sectionSystem: string): R4.IBundle;
    getReferencesInSection(section: R4.IComposition_Section): R4.IReference[];
    getResourcesInSection(bundleDocument: R4.IBundle, sectionCode: string): any[];
    getAllResources(bundle: R4.IBundle): any[];
    getAllResourcesWithoutCompositionOrMessageHeader(bundle: R4.IBundle): any[];
    /** It returns an arry of IDs, splitting the ID by "/" and getting the last string after the slash */
    getResourceIdsInBundle(bundle: R4.IBundle): string[];
    getResourceReferencesBySectionCodeLOINC(bundleDocumentIPS: R4.IBundle, sectionCode: string): string[];
    getResourcesByTypes(bundle: R4.IBundle, resourceTypes: string[]): any[];
    getResourceByIdInBundle(resourceId: string, bundle: R4.IBundle): any;
    /** It replaces the given resource in the right Bundle.entry without generating Bundle.entry[].fullUrl */
    replaceResourceById(resource: any, bundle: R4.IBundle): R4.IBundle;
    getMediaInBundle(bundle: R4.IBundle): R4.IMedia[];
}
export declare function getCleanIdOfDocumentComposition(fhirBundle: R4.IBundle | undefined): string;
export declare function getTimestamp(fhirBundle: R4.IBundle): string;
/** If resource is a Bundle then the different resources MUST be managed by the parent function for calling several times to this child function */
export declare function isCovid19SoleResource(resource: any): boolean;
/** Bundle type can be document, collection, message, history... */
export declare function getTagsInBundleResource(bundleDocument: R4.IBundle): string[];
export declare function addResourceToBundle(bundle: R4.IBundle, resource: any, sectionCode?: string, sectionSystem?: string): R4.IBundle;
export declare function addAdditionalResourcesToBundle(bundle: R4.IBundle, resources?: any[], sectionCode?: string, sectionSystem?: string): R4.IBundle;
export declare function createBundleDocumentWithComposition(resources?: any[], authorReferenceId?: string, typeDocumentCodeLOINC?: string): R4.IBundle;
export declare function isIPS(bundleDocument: R4.IBundle): boolean;
export declare function createEmptyIPS(authorReferenceId: string): R4.IBundle;
export declare function addEntriesToBundle(bundle: R4.IBundle, entries: R4.IBundle_Entry[]): R4.IBundle;
export declare function addResourcesBySection(bundleDocument: R4.IBundle, sectionCode: string, resources: any[]): R4.IBundle;
export declare function addEntriesBySection(bundleDocument: R4.IBundle, bundleEntries: R4.IBundle_Entry[], sectionCode: string, sectionSystem: string): R4.IBundle;
export declare function getReferencesInSection(section: R4.IComposition_Section): R4.IReference[];
export declare function getResourcesInSection(bundleDocument: R4.IBundle, loincSectionCode: string): any[];
export declare function getAllResourcesInBundleEntries(bundle: R4.IBundle): any[];
export declare function getAllResourcesWithoutCompositionOrMessageHeader(bundle: R4.IBundle): any[];
export declare function getResourceIdsInBundle(bundle: R4.IBundle): string[];
export declare function getResourceReferencesBySectionCodeLOINC(bundleDocumentIPS: R4.IBundle, sectionCode: string): string[];
export declare function getResourcesByTypes(bundle: R4.IBundle, resourceTypes: string[]): any[];
export declare function getResourceByIdInBundle(resourceId: string, bundle: R4.IBundle): any;
export declare function getObservationsByCode(bundle: R4.IBundle, code: string): any[];
export declare function replaceResourceById(resource: any, bundle: R4.IBundle): R4.IBundle;
export declare function getMediaInBundle(bundle: R4.IBundle): R4.IMedia[];
