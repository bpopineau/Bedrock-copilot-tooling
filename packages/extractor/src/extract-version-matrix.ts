export type VersionMatrixEntry = {
  artifactType: string;
  minimumVersion: number[];
  notes?: string;
};

export type VersionMatrix = {
  source: string;
  generatedAt?: string;
  entries: VersionMatrixEntry[];
};

const MISSING_SOURCE_ERROR =
  "Unable to extract version matrix entries. Pin and provide BedrockVersioning.md from vendor/minecraft-creator-docs before running extraction.";

function normalizeText(value: string): string {
  return value.replace(/\r\n?/g, "\n");
}

function normalizeArtifactType(value: string): string {
  return value.replace(/`/g, "").replace(/\s+/g, " ").trim();
}

function parseVersion(value: string): number[] | null {
  const match = value.match(/(\d+)\.(\d+)\.(\d+)(?:\.(\d+))?/);
  if (!match) {
    return null;
  }

  const parsed = match.slice(1).filter(Boolean).map((segment) => Number.parseInt(segment, 10));
  if (parsed.some(Number.isNaN)) {
    return null;
  }

  return parsed;
}

function isSeparatorRow(columns: string[]): boolean {
  return columns.every((column) => /^:?-{3,}:?$/.test(column));
}

function splitMarkdownRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((column) => column.trim());
}

function extractFromMarkdownTable(sourceText: string): VersionMatrixEntry[] {
  const lines = normalizeText(sourceText).split("\n");

  for (let i = 0; i < lines.length; i += 1) {
    const headerLine = lines[i]?.trim();
    if (!headerLine || !headerLine.startsWith("|")) {
      continue;
    }

    const headerColumns = splitMarkdownRow(headerLine).map((column) => column.toLowerCase());
    const artifactColumnIndex = headerColumns.findIndex(
      (column) => column.includes("artifact") || column.includes("file") || column.includes("type")
    );
    const versionColumnIndex = headerColumns.findIndex(
      (column) => column.includes("minimum") || column.includes("version")
    );

    if (artifactColumnIndex === -1 || versionColumnIndex === -1) {
      continue;
    }

    const separatorColumns = splitMarkdownRow(lines[i + 1] ?? "");
    if (!separatorColumns.length || !isSeparatorRow(separatorColumns)) {
      continue;
    }

    const entries: VersionMatrixEntry[] = [];
    const seen = new Set<string>();

    for (let rowIndex = i + 2; rowIndex < lines.length; rowIndex += 1) {
      const rowLine = lines[rowIndex]?.trim() ?? "";
      if (!rowLine.startsWith("|")) {
        break;
      }

      const columns = splitMarkdownRow(rowLine);
      const artifactType = normalizeArtifactType(columns[artifactColumnIndex] ?? "");
      const version = parseVersion(columns[versionColumnIndex] ?? "");
      if (!artifactType || !version || seen.has(artifactType)) {
        continue;
      }

      const notes = columns
        .filter((_, columnIndex) => columnIndex !== artifactColumnIndex && columnIndex !== versionColumnIndex)
        .join(" | ")
        .trim();

      entries.push({
        artifactType,
        minimumVersion: version,
        ...(notes ? { notes } : {})
      });
      seen.add(artifactType);
    }

    if (entries.length > 0) {
      return entries;
    }
  }

  return [];
}

function extractFromLooseLines(sourceText: string): VersionMatrixEntry[] {
  const lines = normalizeText(sourceText).split("\n");
  const entries: VersionMatrixEntry[] = [];
  const seen = new Set<string>();

  for (const line of lines) {
    const normalizedLine = line.trim();
    if (!normalizedLine) {
      continue;
    }

    const version = parseVersion(normalizedLine);
    if (!version) {
      continue;
    }

    const artifactMatch = normalizedLine.match(/^[-*]\s*([^:]+):/) ?? normalizedLine.match(/^([^:]+):/);
    if (!artifactMatch) {
      continue;
    }

    const artifactType = normalizeArtifactType(artifactMatch[1] ?? "");
    if (!artifactType || seen.has(artifactType)) {
      continue;
    }

    const notes = normalizedLine.slice(artifactMatch[0].length).trim();
    entries.push({
      artifactType,
      minimumVersion: version,
      ...(notes ? { notes } : {})
    });
    seen.add(artifactType);
  }

  return entries;
}

export function extractVersionMatrix(source: string): VersionMatrix {
  const tableEntries = extractFromMarkdownTable(source);
  const entries = tableEntries.length > 0 ? tableEntries : extractFromLooseLines(source);

  if (entries.length === 0) {
    throw new Error(MISSING_SOURCE_ERROR);
  }

  return {
    source,
    entries
  };
}
