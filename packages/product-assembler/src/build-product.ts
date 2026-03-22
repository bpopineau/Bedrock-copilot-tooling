import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

export type BuildProductOptions = {
  outputDir: string;
};

const REQUIRED_DIRECTORIES = [
  ".github/instructions",
  ".github/skills",
  ".github/agents",
  "docs/bedrock",
  "tools/bedrock-mcp",
  "examples/gold",
  "examples/broken"
] as const;

const REQUIRED_FILES: Record<string, string> = {
  ".github/copilot-instructions.md": "# Copilot Instructions\n",
  "docs/bedrock/version-policy.md": "# Bedrock Version Policy\n",
  "docs/bedrock/version-matrix.json": '{\n  "source": "",\n  "entries": []\n}\n'
};

function resolveTemplateReadme(): string {
  const templateReadmePath = path.resolve(process.cwd(), "templates/product-repo/README.md");
  return readFileSync(templateReadmePath, "utf8");
}

export function buildProduct(options: BuildProductOptions): string[] {
  const createdPaths: string[] = [];

  mkdirSync(options.outputDir, { recursive: true });

  for (const directory of REQUIRED_DIRECTORIES) {
    const directoryPath = path.join(options.outputDir, directory);
    mkdirSync(directoryPath, { recursive: true });
    createdPaths.push(directory);
  }

  const rootReadmePath = path.join(options.outputDir, "README.md");
  writeFileSync(rootReadmePath, resolveTemplateReadme(), "utf8");
  createdPaths.push("README.md");

  for (const [filePath, content] of Object.entries(REQUIRED_FILES)) {
    const absoluteFilePath = path.join(options.outputDir, filePath);
    mkdirSync(path.dirname(absoluteFilePath), { recursive: true });
    writeFileSync(absoluteFilePath, content, "utf8");
    createdPaths.push(filePath);
  }

  return createdPaths.sort((a, b) => a.localeCompare(b));
}
