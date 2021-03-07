/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */

import { R4 } from "@ahryman40k/ts-fhir-types"

// TODO: unify createFhirReferences and createReferenceLiteralURLs

export function getFhirAttachmentsInDiagnosticReport(diagnosticReport:R4.IDiagnosticReport): R4.IAttachment[] {
    if (!diagnosticReport.presentedForm || !diagnosticReport.presentedForm.length || diagnosticReport.presentedForm.length<1) return []
    let attachments:R4.IAttachment[] = []
    diagnosticReport.presentedForm.forEach (function(attachment:R4.IAttachment){
        attachments.push(attachment)
    })
    return attachments
}