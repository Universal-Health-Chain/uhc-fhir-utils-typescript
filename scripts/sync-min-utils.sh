#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
WORKSPACE_ROOT="$(cd "${REPO_ROOT}/.." && pwd)"
TARGET_DIR="${WORKSPACE_ROOT}/gdc-sdk-client-ts/src/uhc-fhir-utils-ts/utils"

mkdir -p "${TARGET_DIR}"

cp "${REPO_ROOT}/src/utils/fhirToken.ts" "${TARGET_DIR}/"
cp "${REPO_ROOT}/src/utils/telecom.ts" "${TARGET_DIR}/"
cp "${REPO_ROOT}/src/utils/fhirRelatedPerson.ts" "${TARGET_DIR}/"

cat <<'INDEX' > "${TARGET_DIR}/index.ts"
export * from './fhirToken';
export * from './telecom';
export * from './fhirRelatedPerson';
INDEX

echo "Synced minimal utils to ${TARGET_DIR}"
