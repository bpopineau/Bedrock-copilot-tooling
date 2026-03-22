import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { buildProduct } from "./build-product";

test("buildProduct creates required product contract paths deterministically", () => {
  const outputDir = mkdtempSync(path.join(tmpdir(), "bedrock-product-"));

  try {
    const createdPaths = buildProduct({ outputDir });

    assert.deepEqual(createdPaths, [
      ".github/agents",
      ".github/copilot-instructions.md",
      ".github/instructions",
      ".github/skills",
      "docs/bedrock",
      "docs/bedrock/version-matrix.json",
      "docs/bedrock/version-policy.md",
      "examples/broken",
      "examples/gold",
      "README.md",
      "tools/bedrock-mcp"
    ]);

    const readme = readFileSync(path.join(outputDir, "README.md"), "utf8");
    assert.match(readme, /Generated Bedrock Add-on Tooling/);

    const versionMatrix = readFileSync(path.join(outputDir, "docs/bedrock/version-matrix.json"), "utf8");
    assert.equal(versionMatrix, '{\n  "source": "",\n  "entries": []\n}\n');
  } finally {
    rmSync(outputDir, { recursive: true, force: true });
  }
});
