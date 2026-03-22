import assert from "node:assert/strict";
import test from "node:test";

import { extractVersionMatrix } from "./extract-version-matrix";

test("extractVersionMatrix parses markdown table rows deterministically", () => {
  const source = `
| Artifact Type | Minimum Version | Notes |
| --- | --- | --- |
| manifest.json | 1.21.0 | Stable |
| item.json | 1.20.80.5 | Requires experiment |
`;

  const actual = extractVersionMatrix(source);

  assert.deepEqual(actual.entries, [
    {
      artifactType: "manifest.json",
      minimumVersion: [1, 21, 0],
      notes: "Stable"
    },
    {
      artifactType: "item.json",
      minimumVersion: [1, 20, 80, 5],
      notes: "Requires experiment"
    }
  ]);
});

test("extractVersionMatrix falls back to bullet lines", () => {
  const source = `
- animation_controller.json: minimum 1.21.10
- feature_rules.json: minimum 1.20.60 for N-1 compatibility
`;

  const actual = extractVersionMatrix(source);

  assert.deepEqual(actual.entries, [
    {
      artifactType: "animation_controller.json",
      minimumVersion: [1, 21, 10],
      notes: "minimum 1.21.10"
    },
    {
      artifactType: "feature_rules.json",
      minimumVersion: [1, 20, 60],
      notes: "minimum 1.20.60 for N-1 compatibility"
    }
  ]);
});

test("extractVersionMatrix fails fast when Bedrock docs are not present", () => {
  assert.throws(
    () => extractVersionMatrix(""),
    /Pin and provide BedrockVersioning\.md from vendor\/minecraft-creator-docs/
  );
});
