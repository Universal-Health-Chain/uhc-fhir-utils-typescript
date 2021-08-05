"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodingSystem = exports.ExtensionsFHIR = void 0;
__exportStar(require("./DicomModels"), exports);
var FhirModels_1 = require("./FhirModels");
Object.defineProperty(exports, "ExtensionsFHIR", { enumerable: true, get: function () { return FhirModels_1.ExtensionsFHIR; } });
var CommonModels_1 = require("./CommonModels");
Object.defineProperty(exports, "CodingSystem", { enumerable: true, get: function () { return CommonModels_1.CodingSystem; } });
