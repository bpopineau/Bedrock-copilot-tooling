export type VersionMatrixEntry = {
  artifactType: string;
  minimumVersion: number[];
  notes?: string;
};

export type VersionMatrix = {
  source: string;
  generatedAt: string;
  entries: VersionMatrixEntry[];
};

export function extractVersionMatrix(source: string): VersionMatrix {
  return {
    source,
    generatedAt: new Date(0).toISOString(),
    entries: []
  };
}
