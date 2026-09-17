
Unreleased
----------

New
~~~
- Added the repository-wide mandatory red-green-refactor contributor contract
  and explicit TDD contract headers to the existing test suites.
- Added FHIR API Parameters, RelatedPerson, token and telecom utilities with
  executable tests.
- Restored the Observation parameter keys required by the public template so
  the package builds cleanly.

1.2.9 (2021-08-07)
------------------

New
~~~
- Added ``isCovid19Bundle`` and ``isCovid19Resource``in ``Covid19`` [Fernando].
- Added ``getCleanIdOfDocumentComposition`` in ``Bundle``to get a clean permanent ID of a Bundle Document (without URN) across any system [Fernando].

Changes
~~~~~~~
- getTagsOfBundleDocument() is now getTagsInBundle() [Fernando].
