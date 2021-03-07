/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
// TODO: unify createFhirReferences and createReferenceLiteralURLs
export function getFhirAttachmentsInDiagnosticReport(diagnosticReport) {
    if (!diagnosticReport.presentedForm || !diagnosticReport.presentedForm.length || diagnosticReport.presentedForm.length < 1)
        return [];
    let attachments = [];
    diagnosticReport.presentedForm.forEach(function (attachment) {
        attachments.push(attachment);
    });
    return attachments;
}
