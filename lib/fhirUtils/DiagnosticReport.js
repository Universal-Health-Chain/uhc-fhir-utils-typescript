"use strict";
/* Copyright 2020-2021 FUNDACION UNID. Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFhirAttachmentsInDiagnosticReport = exports.DiagnosticReport = void 0;
// TODO: unify createFhirReferences and createReferenceLiteralURLs
class DiagnosticReport {
    constructor() {
    }
    getFhirAttachmentsInDiagnosticReport(diagnosticReport) {
        return getFhirAttachmentsInDiagnosticReport(diagnosticReport);
    }
}
exports.DiagnosticReport = DiagnosticReport;
function getFhirAttachmentsInDiagnosticReport(diagnosticReport) {
    if (!diagnosticReport.presentedForm || !diagnosticReport.presentedForm.length || diagnosticReport.presentedForm.length < 1)
        return [];
    let attachments = [];
    diagnosticReport.presentedForm.forEach(function (attachment) {
        attachments.push(attachment);
    });
    return attachments;
}
exports.getFhirAttachmentsInDiagnosticReport = getFhirAttachmentsInDiagnosticReport;
